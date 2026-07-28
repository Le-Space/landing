# SEO plan — local-first.le-space.de & le-space.de

Audited 2026-07-27 against the live deployments and the built output.

## The finding that dominates everything else

Both sites ship this as their entire indexable body:

```html
<body>
  <div id="app"></div>
</body>
```

Verified live: `curl https://local-first.le-space.de/` returns exactly that. Roughly
**4,000 words** of real content — 10 FAQ answers, 11 project descriptions, the stack
layers — exist only after Svelte renders them client-side.

Consequences, in order of how much they cost:

- **Non-rendering crawlers see an empty page.** Bing, DuckDuckGo, Yandex, and most
  LLM/answer-engine crawlers do not execute JavaScript reliably. For them the sites
  have no content at all — only the `<title>` and `<meta description>`.
- **Google renders, but on a deferred queue.** Indexing is delayed and the rendered
  result is not guaranteed. Ranking signals derived from content are weakened.
- **Nothing else on this list matters much until this is fixed.** Structured data,
  sitemaps and hreflang all describe content a crawler cannot currently read.

The hosting makes this worse than for a typical SPA: the sites are served from
IPFS/IPNS through the Aleph gateway (`x-ipfs-path: /ipns/local-first.le-space.de/`),
so there is no origin server that could render on demand. Whatever a crawler gets
must be in the published artifact — which means **build-time prerendering**, not SSR.

## Priority 1 — make the content exist in the HTML

Prerender the app to static HTML at build time and let Svelte hydrate it. Three
routes, in rough order of effort:

1. **`vite-plugin-prerender` / puppeteer-style post-build pass.** Render the built
   SPA in headless Chromium during CI, write the resulting DOM back into
   `dist/index.html`. Smallest change: no framework migration, the app keeps working
   exactly as now. Playwright is already used elsewhere in this org's CI.
2. **Migrate to SvelteKit with `adapter-static` and `prerender = true`.** The proper
   long-term answer, gives per-route HTML and a natural place for per-language URLs.
   Costs a real migration of both sites.
3. **Hand-write a static content fallback** inside `<div id="app">` that Svelte
   replaces on mount. Cheap and ugly; duplicates content and drifts. Only worth it
   as a stopgap.

Recommendation: **(1) now, (2) when a route structure is needed anyway.**

## Priority 2 — the language problem — DONE

Implemented: `/` serves English, `/de/` serves German, each prerendered with its
own `<html lang>`, title, description, OG tags, canonical and the full hreflang
set (`en`, `de`, `x-default`). The switcher is now `<a href>` rather than a click
handler, so crawlers can follow it. `localeFromPath()` makes the URL win over the
stored preference — a link to `/de/` shows German even for a visitor who once
picked EN on that device.

Original analysis kept below for context.

## Priority 2 — the language problem (original)

`initI18n` picks DE or EN from `navigator.language` at runtime and stores the choice
in `localStorage`. One URL therefore serves two languages, and which one a crawler
sees is undefined. `<html lang="en">` is hardcoded while the default detection falls
back to `de`.

There is no `hreflang` and no canonical link on either site.

Fix, once prerendering exists:

- Publish both languages at distinct paths — `/` (EN) and `/de/`, or `/en/` and `/de/`.
- Emit `<link rel="alternate" hreflang="en|de|x-default">` on both.
- Set `<html lang>` per prerendered page.
- Add `<link rel="canonical">` to each.

Until then, the current state (English metadata, English as the crawler-visible
language) is the right compromise and should not be reverted.

## Priority 3 — the cheap wins

These are small, independent, and can land before the prerender work.

- **`robots.txt`** — currently 404 on both domains. Should allow everything and point
  at the sitemap.
- **`sitemap.xml`** — currently 404. With a single route it is nearly trivial; it
  becomes genuinely useful once the language paths from Priority 2 exist.
- **Structured data (JSON-LD)** — nothing is emitted today. Three schemas fit the
  existing content with no new copy required:
  - `Organization` for Le-Space (logo, url, sameAs → GitHub).
  - `FAQPage` from the 10 entries in `packages/shared/src/data/faq.js` — this is the
    single highest-yield item after prerendering, since FAQ answers are exactly what
    answer engines quote.
  - `SoftwareSourceCode` / `SoftwareApplication` per project card.
- **Image alt text** — the two `<img>` tags in the components do carry `alt`, but the
  project screenshots describe themselves only as "<name> screenshot". Worth making
  them descriptive.
- **`og:image:alt`, `twitter:image:alt`** — absent on both sites.

## Priority 4 — measurement

None of this is observable today.

- Register both domains in Google Search Console and Bing Webmaster Tools; submit the
  sitemaps. Verification via DNS TXT works with the current IPFS hosting.
- Watch "Crawled – currently not indexed" and the rendered-HTML view in the URL
  Inspection tool; that is where a prerender regression will show up first.
- Privacy-respecting analytics is a separate decision — the site's own claim is "no
  tracking", so any analytics choice should be one that honours that.

## Explicitly not recommended

- **Keyword stuffing the hero copy.** The brand claim is deliberate and short; the
  FAQ is where the long-tail terms belong, and it already has them.
- **Dynamic-rendering / user-agent sniffing for crawlers.** Fragile, and Google has
  deprecated it as a workaround.
- **Chasing Core Web Vitals before prerendering.** The largest bundle is the network
  visualisation at ~664 kB; that hurts, but an unindexed page ranks nowhere regardless
  of its LCP.

## Suggested sequence

| Step | Effort | Unblocks |
|---|---|---|
| robots.txt + sitemap.xml | minutes | Search Console submission |
| Search Console + Bing registration | minutes | any measurement at all |
| Prerender pass in CI | half a day | everything below |
| JSON-LD: Organization + FAQPage | hours | answer-engine citations |
| Language paths + hreflang + canonical | day | correct language targeting |
| Per-project JSON-LD, image alts | hours | project-level discovery |
