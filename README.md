# Le-Space Landing Pages

Monorepo for the Le-Space web presence — two browser-only Svelte 5 sites,
deployed to Aleph IPFS (same pipeline as [simple-todo](https://github.com/NiKrause/simple-todo)).

| Site | Domain | Purpose |
|---|---|---|
| `sites/local-first` | [local-first.le-space.de](https://local-first.le-space.de) | Portfolio of the local-first P2P stack (relay-button, simple-todo, uc-chat, ucan-store, …) |
| `sites/le-space` | [le-space.de](https://le-space.de) | Minimal brand page: logo + product links |

## Structure

```
packages/shared/   # @le-space/landing-shared: design tokens, i18n, components, project data
sites/local-first/ # portfolio one-pager
sites/le-space/    # minimal page
```

Portfolio content lives in a single file: `packages/shared/src/data/projects.js`.
Screenshots/videos go to `sites/local-first/public/media/<id>.png|mp4`.

## Development

```bash
pnpm install
pnpm dev:local-first   # http://localhost:5173
pnpm dev:le-space
pnpm build             # builds both sites to sites/*/dist
```

## Pitch decks (Use-Cases)

One deck per spin-off project, generated from
`packages/shared/src/data/use-cases.js` — the same file the "Use-Cases" section
of the portfolio page renders from, so page and deck cannot drift apart.

```bash
pnpm decks       # data → sites/local-first/public/use-cases/<id>/index.html
pnpm decks:pdf   # the same, plus <id>-pitch-de.pdf / -en.pdf (needs playwright)
```

`pnpm build` runs `pnpm decks` first, so a deck is never built from stale data.
The generated HTML and the PDFs are committed: the deck is the deliverable and
gets mailed around, and CI has no playwright step.

| | |
|---|---|
| Deck page | `https://local-first.le-space.de/use-cases/<id>/` |
| Overview | `https://local-first.le-space.de/use-cases/` |
| PDF | `…/use-cases/<id>/<id>-pitch-de.pdf` (and `-en.pdf`) |

Each deck is one self-contained file: inlined CSS, both languages embedded
(`?lang=de` / `?lang=en`, DE/EN buttons top right), arrow-key navigation, and a
print stylesheet that puts one slide on one 1280×720 page. It works from a USB
stick and over IPFS alike.

Adding a spin-off means adding an entry to `use-cases.js` — slide kinds are
`title`, `bullets`, `columns`, `closing`; bullets may carry a `now` / `next` /
`planned` badge so a roadmap does not read as a shipped feature. Entries marked
`draft: true` still generate a deck (folder, URL, PDF) but stay off the landing
page and out of the sitemap. Slots C–F are reserved that way.

If a slide overflows its page, the print check is:

```bash
node tools/render-decks.mjs <id>   # then look at the PDF
```

## Deployment

`.github/workflows/deploy.yml` — matrix over both sites:
build → publish to Aleph IPFS (`@le-space/node`, pinned) → link domain.
Requires the `ALEPH_PRIVATE_KEY` repository/organization secret.

## Roadmap

See [STRATEGY.md](./STRATEGY.md). Phase 2 adds `@le-space/orbitdb-live-todos`,
a read-only P2P widget streaming live todos from OrbitDB relays into the page.
