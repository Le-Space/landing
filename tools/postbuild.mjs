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
import { readFile, writeFile } from 'node:fs/promises';
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
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok({ server, port: server.address().port })));
}

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Le-Space',
  url: 'https://le-space.de',
  logo: 'https://le-space.de/android-chrome-512x512.png',
  description: 'The local-first peer-to-peer stack. No servers. No accounts. No passwords.',
  sameAs: ['https://github.com/Le-Space', 'https://github.com/NiKrause']
};

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

async function buildJsonLd() {
  if (site !== 'local-first') return [ORGANIZATION];

  const { faq } = await import(resolve(root, 'packages/shared/src/data/faq.js'));
  const { projects } = await import(resolve(root, 'packages/shared/src/data/projects.js'));

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q.en,
      acceptedAnswer: { '@type': 'Answer', text: toText(entry.a.en) }
    }))
  };

  const software = projects.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: p.name,
    description: toText(p.tagline.en),
    codeRepository: p.github,
    ...(p.demo || p.demos?.[0]?.url ? { url: p.demo ?? p.demos[0].url } : {}),
    programmingLanguage: 'JavaScript',
    author: { '@type': 'Organization', name: 'Le-Space' }
  }));

  return [ORGANIZATION, faqPage, ...software];
}

const chromium = await loadChromium();
const { server, port } = await serve();
const browser = await chromium.launch();
// Pin the locale: i18n picks DE or EN from navigator.language at runtime, so an
// unpinned run would bake whichever language the build agent happens to report.
// English is the crawler-visible language the meta tags already commit to.
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, locale: 'en-US' });
await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle', timeout: 60_000 });
// The projects/FAQ sections render from static data, so one frame after load is
// enough; the network visualisation animates forever and must not be waited on.
await page.waitForSelector('#projects article', { timeout: 30_000 }).catch(() => {});
await page.waitForTimeout(1200);

const bodyHtml = await page.evaluate(() => document.getElementById('app').innerHTML);
await browser.close();
server.close();

const indexPath = resolve(dist, 'index.html');
let html = await readFile(indexPath, 'utf8');

// Idempotent: running twice over the same dist must not stack up a second
// canonical (which is an outright SEO error) or another set of JSON-LD blocks.
const START = '<!-- seo:start -->';
const END = '<!-- seo:end -->';
html = html.replace(new RegExp(`\\s*${START}[\\s\\S]*?${END}`), '');
html = html.replace(/<div id="app">[\s\S]*?<\/div>\s*(?=<script)/, '<div id="app"></div>\n    ');

const jsonLd = await buildJsonLd();
const head = [
  START,
  `<link rel="canonical" href="${ORIGIN}/" />`,
  ...jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`),
  END
].join('\n    ');

html = html.replace('</head>', `  ${head}\n  </head>`);
html = html.replace('<div id="app"></div>', `<div id="app">${bodyHtml}</div>`);

await writeFile(indexPath, html);

const words = bodyHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`${site}: prerendered ${words} words, ${jsonLd.length} JSON-LD blocks, canonical ${ORIGIN}/`);
