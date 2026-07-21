# Le-Space Landing — Roadmap & Backlog

Lebendes Dokument. Status + offene Punkte. Details zur Gesamtstrategie in `STRATEGY.md`.

## Status (Stand 2026-07-21)

| Bereich | Stand |
|---|---|
| Repo `Le-Space/landing` | ✅ gepusht, volle Historie |
| Build (Svelte 5 + Vite 7, pnpm) | ✅ beide Sites bauen sauber in CI |
| Deploy-Workflow (Aleph IPFS) | ✅ läuft (Publish + Domain-Link) |
| Org-Secret `ALEPH_PRIVATE_KEY` | ✅ gesetzt (Wallet `0x0E69…888f`) |
| **le-space.de** (Minimal) | ✅ live, HTTP 200 |
| **local-first.le-space.de** (Portfolio) | ✅ live, HTTP 200 |
| **www.le-space.de** | ❌ kaputt (HTTP 000, hängt am alten Server) |

## Sofort / offen

- [ ] **www.le-space.de fixen** — Cloudflare Redirect-Rule `www → https://le-space.de` (301), oder eigene 3 Aleph-Records.
- [ ] **GITHUB_PAT_LE_SPACE widerrufen** — Push ist erledigt, Token noch ~6 Tage gültig (Developer settings → Fine-grained tokens).
- [ ] **Cloudflare-Token rotieren** — der im Chat eingefügte `cfat_…`-Token sollte gelöscht/neu erstellt werden (im Klartext geteilt).

## M2 — Design & Inhalte

- [ ] **Echtes Le-Space-Logo** statt Platzhalter `packages/shared/src/components/LeSpaceLogo.svelte`.
- [ ] **Screenshots/Videos** je Projekt nach `sites/local-first/public/media/<id>.png|mp4` (Ordner existiert noch nicht → Karten zeigen aktuell farbige Platzhalter).
- [ ] **Demo-URLs / npm-Links** in `packages/shared/src/data/projects.js` ergänzen — offene TODOs: `uc-chat` (demo), `ucan-store` (IPFS-Demo), `orbitdb-relay`, `webauthn-did`, u. a.
- [ ] **OG-Images** erstellen (`og-image.png` / `og-le-image.png`, in `index.html` referenziert, fehlen noch).
- [ ] Texte DE/EN feinschleifen.

## M3 — Launch-Politur

- [ ] Lighthouse-Check (Performance/A11y/SEO).
- [ ] Favicon evtl. durch echtes Logo-Favicon ersetzen (aktuell „LS"-Text-SVG).
- [ ] Workflow-Härtung: `site-domain-link` erst bei `store_processed == true` (wie simple-todo), damit ein halb-fehlgeschlagener Publish keine kaputte CID verlinkt; ggf. `fail-fast: false` in der Matrix, damit ein Site-Fehler nicht den anderen abbricht.

## M4 — Live-Widget

- [ ] `@le-space/orbitdb-live-todos` (read-only P2P-Widget) — eigenes npm-Paket, Integration in Portfolio (Sektion „Live-Todos"). Siehe STRATEGY.md §4.

## M5 — Ausbau

- [ ] Funding/Roadmap-Sektion nach Proposal-Einreichung (STF/NLnet).
- [ ] orbit-blog-Karte / Blog-Verlinkung.

## Notizen / Ideen (Sammelbecken — noch nicht eingeplant)

<!-- Hinweise vom Nutzer landen hier, bis sie einsortiert sind. -->

- **Sichtbarer DE/EN-Umschalter** (evtl. wie nicokrause.com).
  - Ist-Zustand: Umschalter existiert nur im Footer (`Footer.svelte`, `toggleLocale`);
    i18n ist eine eigene, dependency-freie Mini-Lösung (`packages/shared/src/i18n.js`).
  - Wunsch: prominenter Umschalter (Header/Hero), analog `LanguageSwitcher.svelte`
    auf nicokrause.com.
  - Zu entscheiden: eigene Mini-i18n behalten (0 Deps, reicht für statische Seite) **oder**
    auf `svelte-i18n` (^3.7.4, wie nicokrause.com) wechseln — Letzteres bringt
    Interpolation/Plural/Datums-Formate, aber mehr Gewicht. Empfehlung offen.

- **GitHub-Org `Le-Space` aufräumen & neu sortieren.**
  - Repos ordnen/kategorisieren; Portfolio-Projekte konsolidieren.
  - Für die im Portfolio gelisteten Projekte ggf. **frische Forks in die Org** ziehen
    (z. B. aus `NiKrause/*` → `Le-Space/*`), damit `projects.js`-Links konsistent auf
    `github.com/le-space` zeigen. Betroffen u. a. simple-todo, relay-button, ucan-store,
    orbitdb-relay, webauthn-did (Liste aus `packages/shared/src/data/projects.js` ableiten).
  - Aus Link-Recherche (2026-07-21): `Le-Space/universal-connectivity` existiert **bereits**
    (aktiv) — bei Konsolidierung uc-chat-github darauf umstellen. `webauthn-did` ist schon
    `Le-Space/…`. Für die übrigen (simple-todo, relay-button, orbitdb-relay, ucan-store,
    orbit-blog, storacha-bridge, akash-deploy-pwa) gibt es **noch keine** Le-Space-Forks (404).

- **Branding/Umbenennungen `seidenwege` → `le-space`.**
  - GitHub-Repo/Projekt **`bitsocial`** (unter `seidenwege`) in `le-space` umbenennen/konsolidieren.
  - **Discord `seidenwege`** ebenfalls in `le-space` umbenennen.
  - Danach `site-config.js` prüfen (Social-Handles/Discord-Link zeigen aktuell noch auf `seidenwege`).
