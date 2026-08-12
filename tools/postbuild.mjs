/**
 * Post-build pass for SEO. See docs/seo-plan.md.
 *
 *   node tools/postbuild.mjs <site>          # local-first | le-space
 *
 * Does two things to dist/index.html:
 *
 *  1. Prerender. The sites are plain Vite SPAs served from IPFS through the
 *     Aleph gateway, so there is no origin that could render on request — a
 *     crawler gets literally `<div id="app"></div>`. Rendering the built app
 *     once in headless Chromium and writing the resulting DOM back into the
 *     artifact is what puts the ~4,000 words of FAQ and project copy in front
 *     of crawlers that do not run JavaScript. Svelte hydrates over it on load.
 *
 *  2. JSON-LD. Organization on both sites, plus FAQPage and per-project
 *     SoftwareSourceCode on local-first, generated from the same data files the
 *     UI renders so the markup cannot drift from the visible content.
 *
 * Requires playwright (see docs/seo-plan.md for the CI wiring).
 */
import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, join } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Playwright is not a dependency of this workspace — adding it would touch the
// lockfile for a step only CI and maintainers run. Resolve it from the repo if
// present, otherwise from PLAYWRIGHT_DIR (an out-of-tree `npm install --prefix`).
// ESM ignores NODE_PATH, so the fallback has to be an explicit path import.
async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch (error) {
    const dir = process.env.PLAYWRIGHT_DIR;
    if (!dir) {
      console.error('playwright not found. Install it, or set PLAYWRIGHT_DIR to a node_modules dir.');
      throw error;
    }
    return (await import(pathToFileURL(resolve(dir, 'playwright/index.mjs')).href)).chromium;
  }
}
const site = process.argv[2];
if (!['local-first', 'le-space'].includes(site)) {
  console.error('usage: node tools/postbuild.mjs <local-first|le-space>');
  process.exit(1);
}

const dist = resolve(root, `sites/${site}/dist`);
const ORIGIN = site === 'local-first' ? 'https://local-first.le-space.de' : 'https://le-space.de';

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

/** Serve dist over loopback so the built app runs exactly as deployed. */
function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = join(dist, path === '/' ? 'index.html' : path);
    try {
      // A directory has to resolve to its own index.html before the SPA
      // fallback runs, or /history/ silently gets served the front page — and
      // the prerendered subpage would then contain the wrong content.
      const target = extname(file) ? file : join(file, 'index.html');
      const body = await readFile(target);
      res.writeHead(200, { 'content-type': MIME[extname(target)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      // Language fallback: /de/history/ is rendered before dist/de/history/
      // exists, so serve that page's own shell and let the app read the
      // language from location.pathname. Falling back to the root index.html
      // would hand every localized subpage the front page's entry script.
      if (!extname(file)) {
        const withoutLocale = path.replace(/^\/(de)(?=\/|$)/, '') || '/';
        for (const candidate of [join(dist, withoutLocale, 'index.html'), join(dist, 'index.html')]) {
          try {
            const body = await readFile(candidate);
            res.writeHead(200, { 'content-type': 'text/html' });
            return res.end(body);
          } catch {
            /* try the next one */
          }
        }
      }
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok({ server, port: server.address().port })));
}

const ORGANIZATION_DESCRIPTION = {
  en: 'The local-first peer-to-peer stack. No servers. No accounts. No passwords.',
  de: 'Der Local-First Peer-to-Peer Stack. Keine Server. Keine Accounts. Keine Passwörter.'
};

const organization = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Le-Space',
  url: 'https://le-space.de',
  logo: 'https://le-space.de/android-chrome-512x512.png',
  description: ORGANIZATION_DESCRIPTION[lang] ?? ORGANIZATION_DESCRIPTION.en,
  sameAs: ['https://github.com/Le-Space', 'https://github.com/NiKrause']
});

/** Strip the trusted inline HTML from FAQ answers — schema.org wants text. */
const toText = (html) =>
  html
    .replace(/<li>/g, '• ')
    .replace(/<\/(p|li|ol|ul)>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Built per language, not once: structured data has to match the visible text
 * of the page carrying it, and /de/ shows German answers. Emitting the English
 * copy there is a mismatch search engines are entitled to distrust — and it
 * silently cost the German page its FAQ rich results.
 *
 * @param {'en'|'de'} lang
 */
async function buildJsonLd(lang) {
  const org = organization(lang);
  if (site !== 'local-first') return [org];

  const { faq } = await import(resolve(root, 'packages/shared/src/data/faq.js'));
  const { projects } = await import(resolve(root, 'packages/shared/src/data/projects.js'));

  // Falling back to English keeps a half-translated entry indexable rather than
  // emitting `undefined`; today every entry carries both.
  const pick = (field) => field?.[lang] ?? field?.en ?? '';

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: pick(entry.q),
      acceptedAnswer: { '@type': 'Answer', text: toText(pick(entry.a)) }
    }))
  };

  const software = projects.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: p.name,
    description: toText(pick(p.tagline)),
    inLanguage: lang,
    codeRepository: p.github,
    ...(p.demo || p.demos?.[0]?.url ? { url: p.demo ?? p.demos[0].url } : {}),
    programmingLanguage: 'JavaScript',
    author: { '@type': 'Organization', name: 'Le-Space' }
  }));

  return [org, faqPage, ...software];
}

// Shared with LanguageSwitcher, which re-applies the same strings when the
// language is switched client-side. See packages/shared/src/data/site-meta.js.
const { metaFor, sitePages, isNoindex } = await import(
  resolve(root, 'packages/shared/src/data/site-meta.js')
);

const LOCALES = ['en', 'de'];
/** `('de', '/history/')` → `/de/history/`; English keeps the bare page path. */
const localePath = (code, page = '/') => (code === 'en' ? page : `/${code}${page}`);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const chromium = await loadChromium();
const { server, port } = await serve();
const browser = await chromium.launch();

const PAGES = sitePages(site);

// Idempotency markers: re-running over the same dist must not stack up a second
// canonical (an outright SEO error) or another set of JSON-LD blocks.
const START = '<!-- seo:start -->';
const END = '<!-- seo:end -->';

for (const pagePath of PAGES) {
  // Each page has its own built shell; rendering the front page's template for
  // /history/ would ship the wrong entry script.
  const templatePath =
    pagePath === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${pagePath}index.html`);
  const template = await readFile(templatePath, 'utf8');

  for (const lang of LOCALES) {
    const path = localePath(lang, pagePath);
    // The locale comes from the URL, but pin navigator.language too so a build
    // agent reporting something else cannot change what gets baked.
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      locale: lang === 'de' ? 'de-DE' : 'en-US'
    });
    await page.goto(`http://127.0.0.1:${port}${path}`, {
      waitUntil: 'networkidle',
      timeout: 60_000
    });
    // The projects/FAQ sections render from static data, so one frame after load
    // is enough; the network visualisation animates forever and must not be awaited.
    await page.waitForSelector('#projects article', { timeout: 30_000 }).catch(() => {});
    await page.waitForTimeout(1200);
    const bodyHtml = await page.evaluate(() => document.getElementById('app').innerHTML);
    await page.close();

    const meta = metaFor(site, pagePath, lang);
    // Structured data describes the front page's content; repeating the FAQ and
    // project markup on every subpage would claim it belongs there too.
    const jsonLd = pagePath === '/' ? await buildJsonLd(lang) : [];
    let html = template;

    html = html.replace(new RegExp(`\\s*${START}[\\s\\S]*?${END}`), '');
    html = html.replace(/<div id="app">[\s\S]*?<\/div>\s*(?=<script)/, '<div id="app"></div>\n    ');

    // Rewrite the language-dependent parts of the static head.
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
    html = html.replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${esc(meta.description)}$2`
    );
    for (const attr of ['property="og:title"', 'name="twitter:title"']) {
      html = html.replace(new RegExp(`(<meta ${attr} content=")[^"]*(")`), `$1${esc(meta.title)}$2`);
    }
    for (const attr of ['property="og:description"', 'name="twitter:description"']) {
      html = html.replace(
        new RegExp(`(<meta ${attr} content=")[^"]*(")`),
        `$1${esc(meta.ogDescription)}$2`
      );
    }
    html = html.replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      `$1${ORIGIN}${path}$2`
    );

    const alternates = LOCALES.map(
      (l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${localePath(l, pagePath)}" />`
    );
    const head = [
      START,
      `<link rel="canonical" href="${ORIGIN}${path}" />`,
      ...alternates,
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pagePath}" />`,
      `<meta property="og:locale" content="${lang === 'de' ? 'de_DE' : 'en_US'}" />`,
      // Reachable by URL, but not advertised — see site-meta.js.
      ...(isNoindex(site, pagePath) ? ['<meta name="robots" content="noindex, follow" />'] : []),
      ...jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`),
      END
    ].join('\n    ');

    html = html.replace('</head>', `  ${head}\n  </head>`);
    html = html.replace('<div id="app"></div>', `<div id="app">${bodyHtml}</div>`);

    // Assets are referenced absolutely (/assets/…), so a nested page needs no
    // rewriting — only its own directory.
    const outPath = resolve(dist, `.${path}index.html`);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html);

    const words = bodyHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const flag = isNoindex(site, pagePath) ? ' [noindex]' : '';
    console.log(
      `${site} ${lang} ${pagePath}: ${words} words → ${ORIGIN}${path} (${jsonLd.length} JSON-LD)${flag}`
    );
  }
}

// The sitemap is generated rather than kept by hand: a static file drifts the
// moment a page is added, and a page that exists but is unlisted is
// indistinguishable from one that was forgotten. Pages marked `noindex` stay
// out of it by construction.
const indexable = PAGES.filter((p) => !isNoindex(site, p));
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset',
  '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '  xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...indexable.flatMap((p) =>
    LOCALES.map((lang) =>
      [
        '  <url>',
        `    <loc>${ORIGIN}${localePath(lang, p)}</loc>`,
        ...LOCALES.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${localePath(l, p)}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${p}" />`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${p === '/' ? (lang === 'en' ? '1.0' : '0.9') : '0.7'}</priority>`,
        '  </url>'
      ].join('\n')
    )
  ),
  '</urlset>',
  ''
].join('\n');
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
console.log(
  `${site}: sitemap.xml → ${indexable.length * LOCALES.length} URLs` +
    (PAGES.length > indexable.length ? ` (${PAGES.length - indexable.length} noindex ausgelassen)` : '')
);

await browser.close();
server.close();
