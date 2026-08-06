/**
 * Renders every generated pitch deck to PDF — one file per language.
 *
 *   node tools/render-decks.mjs            # all decks
 *   node tools/render-decks.mjs orbitdb-relay webrtc-qr-map
 *
 * Input:  sites/local-first/public/use-cases/<id>/index.html
 *         (run tools/build-decks.mjs first)
 * Output: sites/local-first/public/use-cases/<id>/<id>-pitch-<lang>.pdf
 *
 * The decks are served over loopback rather than opened as file:// URLs so the
 * absolute asset paths (/favicon.svg) resolve exactly as they do on the
 * deployed site. Page geometry is 1280×720 — 16:9, the shape every projector
 * and every slide viewer expects — and matches the @media print block in
 * tools/build-decks.mjs.
 *
 * Playwright is not a dependency of this workspace (same reasoning as
 * tools/postbuild.mjs): resolve it from the repo if present, otherwise from
 * PLAYWRIGHT_DIR.
 */
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, extname, join } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = resolve(root, 'sites/local-first/public/use-cases');
const publicRoot = resolve(root, 'sites/local-first/public');

const LOCALES = ['de', 'en'];
const PAGE = { width: '1280px', height: '720px' };

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

const MIME = {
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.css': 'text/css',
  '.js': 'text/javascript'
};

function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = join(publicRoot, path.endsWith('/') ? `${path}index.html` : path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) =>
    server.listen(0, '127.0.0.1', () => ok({ server, port: server.address().port }))
  );
}

const { decks } = await import(resolve(root, 'packages/shared/src/data/use-cases.js'));
const drafts = new Set(decks.filter((d) => d.draft).map((d) => d.id));

const wanted = process.argv.slice(2);
const ids = (await readdir(outRoot, { withFileTypes: true }))
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  // Drafts are placeholder slides; rendering them would commit a megabyte of
  // PDFs nobody sends. Name one explicitly to render it anyway.
  .filter((id) => (wanted.length ? wanted.includes(id) : !drafts.has(id)))
  .sort();

if (!ids.length) {
  console.error(`no decks found in ${outRoot} — run tools/build-decks.mjs first`);
  process.exit(1);
}

const chromium = await loadChromium();
const { server, port } = await serve();
const browser = await chromium.launch();

for (const id of ids) {
  for (const lang of LOCALES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(`http://127.0.0.1:${port}/use-cases/${id}/?lang=${lang}`, {
      waitUntil: 'networkidle',
      timeout: 60_000
    });
    // The language switch runs in an inline script on load; wait for it to
    // settle, otherwise both language variants are still visible and the PDF
    // comes out with twice the pages.
    await page.waitForFunction((l) => document.documentElement.lang === l, lang, { timeout: 10_000 });
    const out = resolve(outRoot, id, `${id}-pitch-${lang}.pdf`);
    await page.pdf({ path: out, printBackground: true, ...PAGE });
    await page.close();
    const { size } = await stat(out);
    console.log(`✓ ${id}-pitch-${lang}.pdf (${Math.round(size / 1024)} KB)`);
  }
}

await browser.close();
server.close();
