# Le-Space Landing — Roadmap & Backlog

Lebendes Dokument. Status + offene Punkte. Details zur Gesamtstrategie in `STRATEGY.md`.

## Status (2026-07-21)

| Bereich | Stand |
|---|---|
| Repo / Build / Deploy (Aleph IPFS) | ✅ läuft (Publish + Domain-Link, gehärtet) |
| Org-Secret `ALEPH_PRIVATE_KEY` | ✅ gesetzt (Wallet `0x0E69…888f`) |
| **le-space.de** (Minimal) | ✅ live |
| **local-first.le-space.de** (Portfolio) | ✅ live, mit Live-NetworkViz (libp2p) |
| **www.le-space.de** | ✅ 301 → le-space.de (Cloudflare-Redirect) |

## ✅ Erledigt (diese Session)

- DNS + Deploy für beide Domains live (Apex via Aleph-Wizard, local-first via CF-API)
- Deploy-Workflow gehärtet: `fail-fast: false` + Domain-Link nur bei erfolgreichem Publish
- Texte: Tagline/H1 „Der Local-First Peer-to-Peer (Software) Stack", „zwischen Geräten",
  „Datenarchivierung auf dezentralem Storage", „Demos und Prototypen statt Folien"
- **Deutsch als Default** + **Flaggen-Umschalter DE/EN** (beide Seiten)
- Favicons NK → LS
- SEO/Social: `<title>` + OG/Twitter-Tags + generierte OG-Bilder (beide Seiten)
- `projects.js`: verifizierte Links ergänzt (orbitdb-relay npm, webauthn-did demo,
  p2pass npm, orbit-blog demo)
- **NetworkViz**: Relay-Mesh (3 Relays) + Hover-Labels, dann **Live-Modus** —
  echtes browser-libp2p (Aleph-Bootstrap + pubsub peer discovery), entdeckte Peers
  erscheinen/verschwinden. Wiederverwendbar: Core `packages/shared/src/lib/p2p/network.js`,
  Komponente `packages/shared/src/components/NetworkViz.svelte`

## Sofort / offen

- [x] **www.le-space.de** — 301-Redirect → le-space.de (Cloudflare, erledigt 2026-07-21).
- [ ] **GITHUB_PAT_LE_SPACE widerrufen** — Push erledigt, Token noch gültig (Developer settings → Fine-grained tokens).
- [ ] **Cloudflare-Token rotieren** — der im Chat eingefügte `cfat_…`-Token sollte gelöscht/neu erstellt werden.

## NetworkViz — nächste Ausbaustufen

- [x] **pubsub-Topics als Linien** — erledigt: farbcodiertes Topic-Web (chat/sync/identity …),
  synthetisch immer sichtbar + echte Live-Topics via `peer:topics`.
- [ ] **libp2p on-demand starten** (niedrigere Prio) — statt sofort: erst bei Hover/Touch auf die
  Grafik einen Button „Live-View aktivieren" zeigen, der dann libp2p startet. Abwägung: sofortiges
  Erscheinen der Live-Nodes ist auch cool → später entscheiden. (`live`-Prop ist schon parametrierbar.)

## M2 — Design & Inhalte

- [ ] **Echtes Le-Space-Logo** statt Platzhalter `LeSpaceLogo.svelte` (+ ggf. Favicon daraus).
- [ ] **Screenshots/Videos** je Projekt nach `sites/local-first/public/media/<id>.png|mp4` (fehlen → Karten zeigen Platzhalter).
- [ ] Restliche Demo-Links: `uc-chat`, `ucan-store`, `simple-todo` (IPFS-Mirrors liefern aktuell 504 — nicht verlinkbar); ggf. eigene Mirrors/Screens.
- [ ] Texte DE/EN feinschleifen.

## Website-Inhalte: FAQ & Roadmap (hohe Prio, muss)

- [ ] **FAQ-Sektion auf local-first.le-space.de** (DE/EN, eigene Sektion oder ausklappbare
  Accordion-Karten). Muss-Themen:
  - **OrbitDB & Verschlüsselung** — was ist heute verschlüsselt (Transport via libp2p/noise),
    was nicht (Oplog-Einträge at rest auf Relays/Pinning), was ist geplant
    (Payload-Verschlüsselung, WebAuthn-PRF-basierte Keys, encrypted backups via
    storacha-bridge-Roadmap).
  - **Metadaten** — welche Metadaten fallen an (PeerIDs, DB-Adressen, Topics, IPs gegenüber
    Relays), wer kann sie sehen, wie minimieren wir sie (eigene Relays, kurze Relay-Laufzeiten).
  - **Aleph-Bindung / Provider-Unabhängigkeit** — sind wir fest an Aleph gebunden? Antwort:
    Aleph ist das erste Deployment-Target, nicht das einzige. Akash läuft als Prototyp
    (akash-deploy-pwa), ucan-store zielt zusätzlich auf Fly.io (zentralisiert);
    die Abstraktion des Deployment-Layers ist Kernbestandteil der STF-Phase-1-Arbeit
    (`@le-space/core` v2, plattform-agnostischer Provider-Interface).
  - Weitere Kandidaten: Was heißt local-first konkret? Was passiert, wenn alle Peers offline
    sind? Wem „gehört" die Datenbank (Access Controller)? Wie unterscheidet sich das von
    Blockchain? Kosten eines Relays?
- [ ] **Roadmap-Sektion auf local-first.le-space.de** (öffentliche Produkt-Roadmap, DE/EN) —
  speist sich aus dieser Datei + STRATEGY.md-Meilensteinen; zeigt Stack-Reifegrad je Schicht
  (Identity/Data/Sync/Infra/Archive) und die geplanten Schritte (Multi-Provider, UCAN 1.0,
  Live-Widget, Multi-Device-Recovery). Datengetrieben wie `projects.js`
  (z. B. `packages/shared/src/data/roadmap.js`), damit Proposals und Website synchron bleiben.

## M3 — Launch-Politur

- [ ] Lighthouse-Check (Performance/A11y/SEO).
- [ ] Favicon evtl. durch echtes Logo-Favicon ersetzen (aktuell „LS"-Text-SVG).
- [ ] libp2p-Chunk (~192 KB gzip) ggf. weiter code-splitten / `chunkSizeWarningLimit`.

## M4 — Live-Widget

- [ ] `@le-space/orbitdb-live-todos` (read-only P2P-Widget) — eigenes npm-Paket, Sektion „Live-Todos" im Portfolio. Siehe STRATEGY.md §4. (NetworkViz-Live ist ein erster Schritt in die Richtung.)

## M5 — Ausbau

- [ ] Funding/Roadmap-Sektion nach Proposal-Einreichung (STF/NLnet).
- [ ] orbit-blog-Karte / Blog-Verlinkung.

## Notizen / Ideen (Sammelbecken)

- **i18n-Bibliothek** — aktuell eigene Mini-i18n (`packages/shared/src/i18n.js`, 0 Deps).
  Umschalter (Flaggen) ist erledigt. Offen: evtl. auf `svelte-i18n` (^3.7.4, wie nicokrause.com)
  wechseln für Interpolation/Plural/Datums-Formate — mehr Gewicht, später entscheiden.

- **GitHub-Org `Le-Space` aufräumen & neu sortieren.**
  - Portfolio-Projekte konsolidieren; frische Forks `NiKrause/*` → `Le-Space/*`, damit
    `projects.js`-Links auf `github.com/le-space` zeigen.
  - `Le-Space/universal-connectivity` existiert **bereits** (bei Konsolidierung uc-chat darauf
    umstellen). `webauthn-did` ist schon `Le-Space/…`. Für die übrigen (simple-todo, relay-button,
    orbitdb-relay, ucan-store, orbit-blog, storacha-bridge, akash-deploy-pwa) noch keine Forks (404).

- **Branding/Umbenennungen `seidenwege` → `le-space`.**
  - GitHub-Repo/Projekt **`bitsocial`** (unter `seidenwege`) in `le-space` umbenennen/konsolidieren.
  - **Discord `seidenwege`** ebenfalls in `le-space` umbenennen.
  - Danach `site-config.js` prüfen (Social-Handles/Discord-Link zeigen noch auf `seidenwege`).
