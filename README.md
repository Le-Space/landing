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

## Deployment

`.github/workflows/deploy.yml` — matrix over both sites:
build → publish to Aleph IPFS (`@le-space/node`, pinned) → link domain.
Requires the `ALEPH_PRIVATE_KEY` repository/organization secret.

## Roadmap

See [STRATEGY.md](./STRATEGY.md). Phase 2 adds `@le-space/orbitdb-live-todos`,
a read-only P2P widget streaming live todos from OrbitDB relays into the page.
