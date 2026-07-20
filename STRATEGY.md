# Le-Space Web-Strategie & Implementierungsplan

**Repo:** `le-space/landing` (Monorepo, zwei Builds)
**Domains:** `local-first.le-space.de` (Portfolio) · `le-space.de` / `www.le-space.de` (Minimal-Page)
**Stack:** Svelte 5 + Vite 7, browser-only (statisch), pnpm Workspaces, Deploy via Aleph IPFS (`@le-space/node`, wie simple-todo)

---

## 1. Positionierung

Die Portfolio-Seite erzählt genau die Geschichte, die STF- und NLnet-Proposals erzählen:
**„Software, die dir gehört"** — ein kompletter Local-First-Stack, in dem jede Schicht
Server-frei funktioniert. Die Seite ist selbst der Beweis: statisch gebaut, auf IPFS
deployt (Aleph), Domain dezentral verlinkt — und in Phase 2 zeigt sie live P2P-Daten
direkt vom OrbitDB-Relay im Browser.

Damit ist die Seite gleichzeitig:

1. **Portfolio** — jedes Projekt mit Screenshot, Video, Demo-Link, GitHub, npm.
2. **Proposal-Begleitmaterial** — Gutachter von STF/NLnet sehen das Gesamtwerk
   visualisiert (Stack-Diagramm = Tabelle aus Abschnitt 2.1 des STF-Antrags).
3. **Live-Demo der eigenen Technologie** (Phase 2: read-only OrbitDB-Widget).

## 2. Die zwei Seiten

### 2.1 local-first.le-space.de — Portfolio One-Pager

Sektionen (eine Seite, Scroll):

1. **Hero** — Le-Space-Logo, Claim „Local-First Peer-to-Peer Software.
   No servers. No accounts. No passwords." + animierte **P2P-Netzwerk-Visualisierung**
   (Canvas: Browser-Peers verbinden sich direkt und über einen Relay-Knoten,
   Datenpakete pulsieren zwischen Peers). Space-Theme: dunkel, Particles, wie gewohnt.
2. **Der Stack** — interaktives Schichten-Diagramm:
   Identity (WebAuthn/Passkey/DID) → Data (OrbitDB, lokal) → Sync (libp2p, P2P) →
   Infrastructure (Relay Button, on-demand Relays auf Aleph/Akash) →
   Archive (Storacha/Filecoin). Hover auf eine Schicht hebt die zugehörigen
   Projekte im Portfolio hervor.
3. **Portfolio-Grid** — Projektkarten, datengetrieben aus `projects.js`:

   | Projekt | Rolle im Stack | Demo |
   |---|---|---|
   | relay-button | Infrastruktur-Toolchain (Kern) | Docs/GitHub Pages |
   | simple-todo | Local-First PWA Referenz | simple-todo.le-space.de |
   | universal-connectivity (uc-chat) | libp2p Cross-Language Showcase | Demo |
   | ucan-store | Local-First Storage (UCAN, Storacha-Fork → 1.0-Upgrade) | IPFS-Demo |
   | orbitdb-relay | Relay & Pinning Service | — |
   | orbitdb-identity-provider-webauthn-did | Identity-Schicht (NLnet Priorität 1) | Demo |
   | p2pass | P2P-Passkey-Recovery | Demo |
   | akash-deploy-pwa | Akash-Deployment (Konsolidierung mit relay-button geplant) | Demo |
   | orbit-blog | Dezentrales Bloggen (optional) | Demo |
   | orbitdb-storacha-bridge | Archiv-Schicht | — |

   Jede Karte: Screenshot (Video on hover/click), Stack-Layer-Badge, Links
   Demo/GitHub/npm, Status-Badge (stable/beta/prototype).
4. **Live-Todos (Phase 2)** — read-only OrbitDB-Widget, siehe §4.
5. **Funding/Roadmap** (optional, ausblendbar) — „Supported by / applying to" STF, NLnet.
6. **Footer** — Social Icons im **Le-Space-Modus** (github.com/le-space,
   kontakt@le-space.de, etc. — Mapping aus `convert-to-personal.js` übernommen,
   aber als Konfiguration statt Textersetzung), Impressum, Datenschutz.

### 2.2 le-space.de — Minimal-Page

Nur: Le-Space-Logo (animiert, Particles-Hintergrund), ein Satz, und Produkt-Links —
primär → local-first.le-space.de, sekundär erweiterbar (Blog, weitere Produkte).
Gleiche Design-Tokens, gleicher Footer/Impressum. Bewusst leer gehalten.

## 3. Architektur

```
landing/
├── pnpm-workspace.yaml
├── packages/shared/          # @le-space/landing-shared
│   ├── src/tokens.css        # Farben, Typo, Spacing (Space-Theme, Dark/Light)
│   ├── src/components/       # SocialIcons, Footer, ParticlesBackground, SEOHead, LogoCarousel
│   ├── src/site-config.js    # Le-Space-Modus-Daten (Socials, Kontakt, Impressum)
│   └── src/data/projects.js  # Portfolio-Daten (eine Quelle für alles)
├── sites/local-first/        # Portfolio One-Pager (Svelte 5 + Vite)
├── sites/le-space/           # Minimal-Page (Svelte 5 + Vite)
└── .github/workflows/deploy.yml   # Matrix: 2 Sites → Aleph IPFS + Domain-Link
```

Prinzipien: kein Server, kein SvelteKit (plain Vite wie Referenz-Site), i18n de/en
(svelte-i18n), Dark/Light-Mode, Assets (Screenshots/Videos) unter `public/media/`.
Das alte `convert-to-personal.js`-Muster entfällt — Branding ist Konfiguration.

## 4. Phase 2: `@le-space/orbitdb-live-todos` (read-only P2P-Widget)

Eigenes npm-Paket (im relay-button- oder eigenen Repo), Svelte-Component +
framework-agnostischer Core:

- Startet js-libp2p im Browser (WebTransport/WebRTC/WSS), verbindet zu
  konfigurierten `orbitdb-relay`-Bootstrap-Adressen.
- Öffnet eine oder mehrere Todo-DB-Adressen **read-only** (keine Identity nötig,
  kein Schreiben), repliziert den Oplog und rendert live die aktuellen Todos.
- Fallback: Wenn kein Peer erreichbar → statischer Snapshot (beim Build via
  Relay-HTTP-Endpoint gezogen) + Status „connecting…".
- Props: `addresses[]`, `bootstrap[]`, `maxItems`, `showPeers`.

Strategischer Wert: erfüllt wörtlich NLnets „shared building blocks", zeigt
relay-button-Infrastruktur produktiv, und die Landing Page wird zur Live-Demo.
Kandidat für Erwähnung in der Restack-Bewerbung.

## 5. Deployment

Workflow wie simple-todo (`@le-space/node`, `ALEPH_VM_MODE: site-publish`):

- Job-Matrix `site: [local-first, le-space]` → Build → Publish zu Aleph IPFS
  (Pin) → `site-domain-link` auf `local-first.le-space.de` bzw. `le-space.de`.
- `www.le-space.de` → per DNS/Redirect auf `le-space.de` (oder zweiter Domain-Link).
- Secrets: `ALEPH_PRIVATE_KEY` (Org-Secret in le-space).
- DNS: CNAME `local-first` + `www` gemäß Aleph-Domain-Anleitung setzen.
- PRs bauen nur (kein Publish); später E2E (Playwright: Seiten rendern, Links ok).

## 6. Meilensteine

| # | Meilenstein | Inhalt | Aufwand |
|---|---|---|---|
| M1 | Skeleton & Repo | Monorepo, beide Sites bauen, Deploy-Workflow, dieses Dokument | heute |
| M2 | Design & Inhalte | Netzwerk-Viz verfeinern, Stack-Sektion, echte Screenshots/Videos/Demo-Links in `projects.js`, Texte de/en | 1–2 Tage |
| M3 | Launch | DNS, Aleph-Secrets, erster Deploy beider Domains, OG-Images, Lighthouse-Check | 0,5 Tag |
| M4 | Live-Widget | `@le-space/orbitdb-live-todos` Paket + Integration + Relay-Pinning der Demo-DB | 3–5 Tage |
| M5 | Ausbau | Funding-Sektion nach Proposal-Einreichung, orbit-blog-Karte, Blog-Verlinkung | laufend |

## 7. Offene Punkte

- Screenshots/Videos je Projekt sammeln (Platzhalter sind im Skeleton vorgesehen).
- Entscheidung `www.le-space.de`: Redirect oder eigener Domain-Link.
- ucan-store: Upgrade auf upload-service 1.0 ist unabhängig, aber Karte vermerkt es.
- Impressum/Datenschutz-Texte aus der bestehenden Site übernehmen (Footer vorhanden).
