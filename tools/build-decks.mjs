/**
 * Generates one standalone pitch deck per spin-off project.
 *
 *   node tools/build-decks.mjs
 *
 * Source of truth: packages/shared/src/data/use-cases.js
 * Output:          sites/local-first/public/use-cases/<id>/index.html
 *                  sites/local-first/public/use-cases/index.html (overview)
 *
 * Each deck is a single self-contained file — CSS and the handful of lines of
 * navigation JS are inlined, both languages are embedded, and nothing is
 * fetched at runtime. That is deliberate: a deck has to survive being mailed
 * around as a file, opened from a USB stick and served from IPFS, and it has to
 * print to PDF (see tools/render-decks.mjs) without a network.
 *
 * The output is committed. `pnpm build` regenerates it first, so a change to
 * use-cases.js can never ship a stale deck; if git reports a diff after a build,
 * the generated files were simply out of date.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = resolve(root, 'sites/local-first/public/use-cases');

const { decks, DECK_TAGS, DECK_STATUS } = await import(
  resolve(root, 'packages/shared/src/data/use-cases.js')
);
const { siteConfig } = await import(resolve(root, 'packages/shared/src/site-config.js'));

const LOCALES = ['de', 'en'];
const DEFAULT_LOCALE = 'de';

/** Escape for attribute/text positions. Slide copy itself is trusted HTML. */
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Pick a language out of a { de, en } pair; tolerate plain strings. */
const pick = (v, lang) => (v && typeof v === 'object' ? (v[lang] ?? v.de ?? v.en ?? '') : (v ?? ''));

/** Strip the trusted inline HTML for use in meta descriptions. */
const plain = (html) =>
  String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const UI = {
  de: {
    source: 'Quellcode',
    demo: 'Demo',
    docs: 'Doku',
    npm: 'npm',
    hint: 'Pfeiltasten oder scrollen · P für PDF-Druck',
    draft: 'Entwurf — Inhalte folgen',
    overviewTitle: 'Use-Cases',
    overviewLead:
      'Pitch-Decks zu den Spin-Off-Projekten aus dem Local-First-Stack. Jedes Deck gibt es als Seite und als PDF.',
    openDeck: 'Deck öffnen',
    backHome: 'Zurück zu local-first.le-space.de'
  },
  en: {
    source: 'Source',
    demo: 'Demo',
    docs: 'Docs',
    npm: 'npm',
    hint: 'Arrow keys or scroll · P to print as PDF',
    draft: 'Draft — content to come',
    overviewTitle: 'Use cases',
    overviewLead:
      'Pitch decks for the spin-off projects growing out of the local-first stack. Every deck comes as a page and as a PDF.',
    openDeck: 'Open deck',
    backHome: 'Back to local-first.le-space.de'
  }
};

// The logo mark, kept byte-identical to packages/shared/src/components/LeSpaceLogo.svelte.
const LOGO = `<svg class="mark" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Le-Space">
<line x1="42.7" y1="49.96" x2="58.56" y2="34.94" stroke="#58C7F3" stroke-width="4" stroke-linecap="round"/>
<line x1="47.43" y1="63.58" x2="62.8" y2="64.98" stroke="#58C7F3" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 8"/>
<line x1="69.85" y1="38.36" x2="72.41" y2="55.37" stroke="#58C7F3" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6" opacity="0.65"/>
<circle cx="30" cy="62" r="15" fill="#FF6B5B"/>
<circle cx="68" cy="26" r="8" fill="none" stroke="#58C7F3" stroke-width="5"/>
<circle cx="74" cy="66" r="6.5" fill="none" stroke="#58C7F3" stroke-width="4.5"/>
<circle cx="17" cy="21" r="2.6" fill="#58C7F3" opacity="0.55"/>
</svg>`;

/*
 * Decks are dark only. The landing page has a light theme because visitors
 * bring their own preference; a deck is a document that gets printed and
 * screenshotted, and it should look the same wherever it lands.
 *
 * Sizing: everything inside a slide is in `em`, and the slide sets the em.
 * On screen that em scales with the viewport, in print it is fixed — so one
 * declaration keeps the proportions identical on a phone, on a beamer and on
 * a PDF page.
 */
const CSS = `
:root {
  --ls-red: #ff6b5b;
  --ls-red-bright: #ff8577;
  --ls-accent: #58c7f3;
  --ls-accent-2: #a78bfa;
  --ls-green: #3edc97;
  --ls-amber: #ffc24b;
  --ls-bg-0: #0b0e15;
  --ls-bg-1: #10141f;
  --ls-bg-2: #141926;
  --ls-bg-3: #232b3d;
  --ls-text: #edf1f8;
  --ls-text-dim: #a8b3c7;
  --ls-text-faint: #5c677a;
  --ls-card: rgba(255,255,255,0.04);
  --ls-card-border: rgba(255,255,255,0.09);
  --ls-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --ls-font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  --accent: var(--ls-accent);
  color-scheme: dark;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--ls-bg-0);
  color: var(--ls-text);
  font-family: var(--ls-font);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--ls-accent); text-decoration: none; }
a:hover { text-decoration: underline; }
code {
  font-family: var(--ls-font-mono);
  font-size: 0.88em;
  background: var(--ls-card);
  border: 1px solid var(--ls-card-border);
  border-radius: 4px;
  padding: 0.05em 0.35em;
}
strong { color: var(--ls-text); font-weight: 650; }

html[lang='de'] .lang-en, html[lang='en'] .lang-de { display: none; }

.deck { scroll-snap-type: y mandatory; }
.slide {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7vh 6vw 9vh;
  font-size: clamp(14px, 1.15vw, 19px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
}
.slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 80% at 78% 8%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 60%);
  pointer-events: none;
}
.slide > * { position: relative; }

.kicker {
  font-family: var(--ls-font-mono);
  font-size: 0.82em;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 1.1em;
}
/*
 * Solid, deliberately not the gradient-clipped headline the landing page hero
 * uses. background-clip:text with transparent glyphs is one failed clip away
 * from painting the raw gradient box across the slide — reported in the wild on
 * the cover of the WebRTC deck, not reproducible headless, and unacceptable in
 * a document that gets projected and mailed to strangers. The accent lives in
 * the kicker and the claim rule instead.
 */
h1 {
  font-size: 3.4em;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 0.25em;
  color: var(--ls-text);
}
h2 {
  font-size: 2.2em;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 0.4em;
}
.subtitle { font-size: 1.35em; color: var(--ls-text-dim); margin: 0 0 1.4em; max-width: 24em; }
.claim {
  font-size: 1.15em;
  color: var(--ls-text);
  border-left: 3px solid var(--accent);
  padding-left: 0.9em;
  margin: 0 0 1.8em;
  max-width: 30em;
}
.lead { font-size: 1.12em; color: var(--ls-text-dim); margin: 0 0 1.8em; max-width: 42em; }

.cover-top { display: flex; align-items: center; gap: 0.8em; margin-bottom: 2.4em; }
.mark { width: 3.4em; height: 3.4em; filter: drop-shadow(0 0 1em rgba(255,107,91,0.45)); }
.brand { font-size: 1.1em; font-weight: 700; letter-spacing: 0.07em; }

.bullets { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.05em; max-width: 46em; }
.bullets li { padding-left: 1.15em; position: relative; }
.bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 0.42em;
  height: 0.42em;
  border-radius: 50%;
  background: var(--accent);
}
.bullets b { display: inline; font-size: 1.06em; font-weight: 650; }
.bullets p { margin: 0.2em 0 0; color: var(--ls-text-dim); max-width: 40em; }

.cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(13em, 1fr)); gap: 1.1em; }
.col {
  background: var(--ls-card);
  border: 1px solid var(--ls-card-border);
  border-radius: 14px;
  padding: 1.2em 1.3em;
}
.col h3 {
  font-size: 1.02em;
  margin: 0 0 0.7em;
  color: var(--accent);
  letter-spacing: 0.01em;
}
.col ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.55em; }
.col li { color: var(--ls-text-dim); font-size: 0.97em; padding-left: 0.9em; position: relative; }
.col li::before { content: '–'; position: absolute; left: 0; color: var(--ls-text-faint); }

.note {
  margin: 1.6em 0 0;
  padding: 0.9em 1.1em;
  border: 1px solid var(--ls-card-border);
  border-left: 3px solid var(--ls-amber);
  border-radius: 10px;
  background: rgba(255,194,75,0.06);
  color: var(--ls-text-dim);
  font-size: 0.97em;
  max-width: 46em;
}

.badge {
  display: inline-block;
  font-family: var(--ls-font-mono);
  font-size: 0.68em;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 0.15em 0.6em;
  border-radius: 999px;
  border: 1px solid var(--ls-card-border);
  color: var(--ls-text-dim);
  vertical-align: 0.18em;
  margin-left: 0.55em;
  white-space: nowrap;
}
.badge.now { color: var(--ls-green); border-color: color-mix(in srgb, var(--ls-green) 45%, transparent); }
.badge.next { color: var(--ls-amber); border-color: color-mix(in srgb, var(--ls-amber) 45%, transparent); }
.badge.planned { color: var(--ls-text-faint); }

.links { display: flex; flex-wrap: wrap; gap: 0.7em; margin-top: 1.6em; }
.links a {
  padding: 0.5em 1.1em;
  border-radius: 8px;
  border: 1px solid var(--ls-card-border);
  color: var(--ls-text);
  font-weight: 600;
  font-size: 0.95em;
}
.links a:hover { text-decoration: none; background: rgba(255,255,255,0.07); }
.links a.primary { background: var(--ls-red); border-color: var(--ls-red); color: #fff; }

.contact { margin-top: 1.8em; font-size: 1.02em; color: var(--ls-text-dim); }
.contact div { margin-bottom: 0.2em; }

.foot {
  position: absolute;
  left: 6vw;
  right: 6vw;
  bottom: 3vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--ls-font-mono);
  font-size: 0.72em;
  color: var(--ls-text-faint);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 0.7em;
}

.chrome {
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 10;
  display: flex;
  gap: 6px;
  font-family: var(--ls-font-mono);
  font-size: 12px;
}
.chrome button, .chrome a {
  background: rgba(20,25,38,0.85);
  border: 1px solid var(--ls-card-border);
  color: var(--ls-text-dim);
  border-radius: 7px;
  padding: 5px 10px;
  cursor: pointer;
  font: inherit;
  backdrop-filter: blur(6px);
}
.chrome button:hover, .chrome a:hover { color: var(--ls-text); text-decoration: none; }
.chrome button[aria-pressed='true'] { color: var(--ls-text); border-color: var(--accent); }
.hint {
  position: fixed;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  font-family: var(--ls-font-mono);
  font-size: 11px;
  color: var(--ls-text-faint);
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.4s;
}

.draft-banner {
  background: rgba(255,194,75,0.12);
  border-bottom: 1px solid rgba(255,194,75,0.3);
  color: var(--ls-amber);
  font-family: var(--ls-font-mono);
  font-size: 12px;
  text-align: center;
  padding: 7px;
}

/* Overview page */
.page { max-width: 1120px; margin: 0 auto; padding: 8vh 24px 12vh; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 2.5rem; }
.card {
  background: var(--ls-card);
  border: 1px solid var(--ls-card-border);
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
}
.card h3 { margin: 0.5rem 0 0.3rem; font-size: 1.25rem; }
.card p { color: var(--ls-text-dim); margin: 0 0 1.2rem; flex: 1; }
.card .links { margin-top: auto; }

@media (max-width: 640px) {
  .slide { padding: 6vh 7vw 11vh; font-size: 15px; }
  h1 { font-size: 2.5em; }
  .foot { left: 7vw; right: 7vw; }
}

@media print {
  @page { size: 1280px 720px; margin: 0; }
  html, body { background: var(--ls-bg-0); }
  .chrome, .hint, .draft-banner { display: none !important; }
  .deck { scroll-snap-type: none; }
  .slide {
    width: 1280px;
    height: 720px;
    min-height: 0;
    padding: 58px 76px 80px;
    /* Smaller than the 17px a 1280px-wide screen would pick. The page height is
       fixed, German runs longer than English, and the densest slides overflowed
       at 16px — this leaves headroom for the copy still to be written.
       tools/render-decks.mjs fails the build if a slide exceeds the page. */
    font-size: 15px;
    border-bottom: none;
    break-after: page;
    page-break-after: always;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  /* Without this the last slide emits a trailing blank page. */
  .slide:last-child { break-after: auto; page-break-after: auto; }
  .foot { left: 76px; right: 76px; bottom: 34px; }
}
`;

const SCRIPT = `
(function () {
  var root = document.documentElement;
  var q = new URLSearchParams(location.search);
  var saved = null;
  try { saved = localStorage.getItem('ls-locale'); } catch (e) {}
  var nav = (navigator.language || 'de').toLowerCase().slice(0, 2);
  var lang = q.get('lang') || saved || (nav === 'en' ? 'en' : 'de');
  setLang(lang === 'en' ? 'en' : 'de');

  function setLang(l) {
    root.lang = l;
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === l));
    });
    try { localStorage.setItem('ls-locale', l); } catch (e) {}
    count();
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  var printBtn = document.querySelector('[data-print]');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  function slides() {
    return Array.prototype.filter.call(document.querySelectorAll('.slide'), function (s) {
      return s.offsetParent !== null;
    });
  }
  function current() {
    var list = slides();
    var mid = window.scrollY + window.innerHeight / 2;
    for (var i = 0; i < list.length; i++) {
      if (list[i].offsetTop <= mid && list[i].offsetTop + list[i].offsetHeight > mid) return i;
    }
    return 0;
  }
  function go(i) {
    var list = slides();
    var t = Math.max(0, Math.min(list.length - 1, i));
    window.scrollTo({ top: list[t].offsetTop, behavior: 'smooth' });
  }
  function count() {
    var list = slides();
    list.forEach(function (s, i) {
      var el = s.querySelector('[data-n]');
      if (el) el.textContent = (i + 1) + ' / ' + list.length;
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); go(current() + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(current() - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(slides().length - 1); }
    else if (k === 'p' || k === 'P') { e.preventDefault(); window.print(); }
  });

  var hint = document.querySelector('.hint');
  if (hint) setTimeout(function () { hint.style.opacity = '0'; }, 6000);
})();
`;

/** Both language variants of a fragment, each wrapped so CSS can hide one. */
const bilingual = (fn) => LOCALES.map((l) => `<div class="lang-${l}">${fn(l)}</div>`).join('\n');

function renderLinks(deck, lang, { primary = null } = {}) {
  const ui = UI[lang];
  const order = [
    ['demo', ui.demo],
    ['docs', ui.docs],
    ['github', ui.source],
    ['npm', ui.npm]
  ];
  const present = order.filter(([k]) => deck.links?.[k]);
  // Fall back to the first available link when the preferred one is missing —
  // a cover slide without a demo should still have one highlighted button.
  const lead = present.some(([k]) => k === primary) ? primary : present[0]?.[0];
  const items = present.map(
    ([k, label]) =>
      `<a href="${esc(deck.links[k])}" target="_blank" rel="noopener noreferrer"${
        k === lead ? ' class="primary"' : ''
      }>${esc(label)}</a>`
  );
  return items.length ? `<div class="links">${items.join('')}</div>` : '';
}

function renderSlide(deck, slide, lang, i, total) {
  // The number is rendered here rather than left to the script, so it is right
  // in the printed PDF and in the prerendered HTML even with JS disabled.
  const foot = `<div class="foot"><span>Le-Space · ${esc(deck.name)}</span><span data-n>${i + 1} / ${total}</span></div>`;

  if (slide.kind === 'title') {
    const status = DECK_STATUS[deck.status] ? pick(DECK_STATUS[deck.status], lang) : '';
    return `<section class="slide">
  <div class="cover-top">${LOGO}<span class="brand">Le-Space</span></div>
  <p class="kicker">Spin-Off ${esc(deck.letter)}${status ? ` · ${esc(status)}` : ''}</p>
  <h1>${pick(slide.title, lang) || esc(deck.name)}</h1>
  <p class="subtitle">${pick(deck.subtitle, lang)}</p>
  <p class="claim">${pick(deck.claim, lang)}</p>
  ${renderLinks(deck, lang, { primary: 'demo' })}
  ${foot}
</section>`;
  }

  if (slide.kind === 'closing') {
    const mail = lang === 'de' ? siteConfig.email.contact : siteConfig.email.contactEn;
    return `<section class="slide">
  <p class="kicker">${esc(deck.name)}</p>
  <h2>${pick(slide.title, lang)}</h2>
  ${slide.lead ? `<p class="lead">${pick(slide.lead, lang)}</p>` : ''}
  <div class="contact">
    <div><strong>${esc(siteConfig.legalName)}</strong> · ${esc(siteConfig.legal.representative)}</div>
    <div><a href="mailto:${esc(mail)}">${esc(mail)}</a> · <a href="${esc(siteConfig.urls.localFirst)}">local-first.le-space.de</a></div>
    <div>${esc(siteConfig.legal.phone)}</div>
  </div>
  ${renderLinks(deck, lang, { primary: 'github' })}
  ${foot}
</section>`;
  }

  const head = `<p class="kicker">${esc(deck.name)}</p>
  <h2>${pick(slide.title, lang)}</h2>
  ${slide.lead ? `<p class="lead">${pick(slide.lead, lang)}</p>` : ''}`;

  if (slide.kind === 'columns') {
    const cols = (slide.columns ?? [])
      .map(
        (c) => `<div class="col">
      <h3>${pick(c.h, lang)}</h3>
      <ul>${(c.items ?? []).map((i) => `<li>${pick(i, lang)}</li>`).join('')}</ul>
    </div>`
      )
      .join('\n    ');
    return `<section class="slide">
  ${head}
  <div class="cols">
    ${cols}
  </div>
  ${slide.note ? `<p class="note">${pick(slide.note, lang)}</p>` : ''}
  ${foot}
</section>`;
  }

  const items = (slide.bullets ?? [])
    .map((b) => {
      const badge = b.tag
        ? `<span class="badge ${esc(b.tag)}">${esc(pick(DECK_TAGS[b.tag], lang))}</span>`
        : '';
      const sub = b.s ? `<p>${pick(b.s, lang)}</p>` : '';
      return `<li><b>${pick(b.t, lang)}</b>${badge}${sub}</li>`;
    })
    .join('\n    ');

  return `<section class="slide">
  ${head}
  <ul class="bullets">
    ${items}
  </ul>
  ${slide.note ? `<p class="note">${pick(slide.note, lang)}</p>` : ''}
  ${foot}
</section>`;
}

function renderDeck(deck) {
  const title = `${deck.name} — Le-Space Spin-Off ${deck.letter}`;
  const description = plain(pick(deck.teaser, DEFAULT_LOCALE));
  const chrome = `<div class="chrome">
  <button type="button" data-lang="de">DE</button>
  <button type="button" data-lang="en">EN</button>
  <button type="button" data-print>PDF</button>
</div>
<div class="hint"><span class="lang-de">${esc(UI.de.hint)}</span><span class="lang-en">${esc(UI.en.hint)}</span></div>`;

  const banner = deck.draft
    ? `<div class="draft-banner"><span class="lang-de">${esc(UI.de.draft)}</span><span class="lang-en">${esc(UI.en.draft)}</span></div>`
    : '';

  const body = bilingual(
    (lang) =>
      `<div class="deck">\n${deck.slides
        .map((s, i) => renderSlide(deck, s, lang, i, deck.slides.length))
        .join('\n')}\n</div>`
  );

  return `<!doctype html>
<html lang="${DEFAULT_LOCALE}" style="--accent:${esc(deck.accent)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${deck.draft ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="https://local-first.le-space.de/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${CSS}</style>
</head>
<body>
${banner}${chrome}
${body}
<script>${SCRIPT}</script>
</body>
</html>
`;
}

function renderOverview(list) {
  const cards = (lang) =>
    list
      .map(
        (d) => `<article class="card" style="--accent:${esc(d.accent)}">
      <p class="kicker">Spin-Off ${esc(d.letter)}</p>
      <h3>${esc(d.name)}</h3>
      <p>${pick(d.teaser, lang)}</p>
      <div class="links">
        <a class="primary" href="./${esc(d.id)}/">${esc(UI[lang].openDeck)}</a>
        <a href="./${esc(d.id)}/${esc(d.id)}-pitch-${lang}.pdf">PDF</a>
      </div>
    </article>`
      )
      .join('\n    ');

  const body = bilingual(
    (lang) => `<div class="page">
    <div class="cover-top">${LOGO}<span class="brand">Le-Space</span></div>
    <h2>${esc(UI[lang].overviewTitle)}</h2>
    <p class="lead">${esc(UI[lang].overviewLead)}</p>
    <div class="cards">
    ${cards(lang)}
    </div>
    <p style="margin-top:3rem"><a href="${esc(siteConfig.urls.localFirst)}">← ${esc(UI[lang].backHome)}</a></p>
  </div>`
  );

  return `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Le-Space — Use-Cases</title>
<meta name="description" content="${esc(UI.de.overviewLead)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${CSS}</style>
</head>
<body>
<div class="chrome">
  <button type="button" data-lang="de">DE</button>
  <button type="button" data-lang="en">EN</button>
</div>
${body}
<script>${SCRIPT}</script>
</body>
</html>
`;
}

// Rebuild from scratch so a renamed or removed deck cannot leave an orphan
// folder behind — but keep the PDFs, which are produced by render-decks.mjs and
// would otherwise vanish on every build.
const keep = new Map();
for (const deck of decks) {
  for (const lang of LOCALES) {
    const rel = `${deck.id}/${deck.id}-pitch-${lang}.pdf`;
    try {
      keep.set(rel, await readFile(resolve(outRoot, rel)));
    } catch {
      /* not rendered yet */
    }
  }
}
await rm(outRoot, { recursive: true, force: true });

for (const deck of decks) {
  const dir = resolve(outRoot, deck.id);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), renderDeck(deck));
  console.log(`${deck.draft ? '· ' : '✓ '}${deck.id} (${deck.slides.length} slides)${deck.draft ? ' [draft]' : ''}`);
}

await writeFile(resolve(outRoot, 'index.html'), renderOverview(decks.filter((d) => !d.draft)));

for (const [rel, buf] of keep) {
  await writeFile(resolve(outRoot, rel), buf);
}

console.log(
  `\n${decks.length} decks → sites/local-first/public/use-cases/ ` +
    `(${keep.size} PDFs kept; run tools/render-decks.mjs to refresh them)`
);
