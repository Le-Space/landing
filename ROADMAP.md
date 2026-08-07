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

## M2 — Design & Inhalte

- [ ] **Echtes Le-Space-Logo** statt Platzhalter `LeSpaceLogo.svelte` (+ ggf. Favicon daraus).
- [ ] **Screenshots/Videos** je Projekt nach `sites/local-first/public/media/<id>.png|mp4` (fehlen → Karten zeigen Platzhalter).
- [ ] Restliche Demo-Links: `uc-chat`, `ucan-store`, `simple-todo` (IPFS-Mirrors liefern aktuell 504 — nicht verlinkbar); ggf. eigene Mirrors/Screens.
- [ ] Texte DE/EN feinschleifen.

## Website-Inhalte: FAQ & Roadmap (hohe Prio, muss)

- [x] **FAQ-Sektion auf local-first.le-space.de** — implementiert (faq.js + FaqSection.svelte, 9 Fragen DE/EN; Build-Verifikation via CI/lokal ausstehend) (DE/EN, eigene Sektion oder ausklappbare
  Accordion-Karten). Muss-Themen:
  - **Was heißt „local-first"?** — die 7 Ideale nach Ink & Switch
    ([Kleppmann et al.](https://www.inkandswitch.com/local-first/)):
    1. No spinners — schnell, weil mit lokalen Daten gearbeitet wird
    2. Multi-device — nahtloser Sync über alle Geräte
    3. Offline — voller Lese-/Schreibzugriff ohne Internet
    4. Collaboration — Echtzeit-Zusammenarbeit mehrerer Nutzer
    5. Longevity — Daten über Jahrzehnte nutzbar, überleben jeden Server
    6. Privacy — verschlüsselte Daten, für Service-Provider nicht lesbar
    7. User control — volle Datenhoheit: kopieren, ändern, löschen
  - **Was heißt bei uns „local-first *peer-to-peer*"?** — wir gehen einen Schritt weiter:
    Es gibt keinen Hosting-Server. Die App selbst ist ein statisches JS/HTML-Bundle,
    als PWA auf IPFS publiziert — sie startet auf jedem Desktop- oder Mobilgerät
    auch ganz ohne Server (IPFS-Gateway, Download oder USB-Stick). Sync läuft
    Browser-zu-Browser über libp2p; Relays sind optionale, austauschbare
    Infrastruktur auf Knopfdruck — nicht das Backend der App.
  - **OrbitDB & Verschlüsselung** — was ist heute verschlüsselt (Transport via libp2p/noise),
    was nicht (Oplog-Einträge at rest auf Relays/Pinning), was ist geplant
    (Payload-Verschlüsselung, WebAuthn-PRF-basierte Keys, encrypted backups via
    storacha-bridge-Roadmap). Konkrete Bausteine:
    - [orbitdb/simple-encryption](https://github.com/orbitdb/simple-encryption) —
      offizielles OrbitDB-Modul für Payload-Verschlüsselung (Einträge verschlüsselt,
      Replikation bleibt möglich) → Basis für die FAQ-Antwort „geht heute schon".
    - [NiKrause/de2do](https://github.com/NiKrause/de2do) — unser Prototyp mit
      **WebAuthn-PRF-Key-Verschlüsselung** (Schlüssel aus Passkey-PRF abgeleitet,
      derzeit broken) → reparieren und als Referenz-Demo für PRF-verschlüsselte
      OrbitDB-Payloads wiederbeleben; Kandidat für Portfolio-Karte + NLnet-Material.
  - **Metadaten** — welche Metadaten fallen an (PeerIDs, DB-Adressen, Topics, IPs gegenüber
    Relays), wer kann sie sehen, wie minimieren wir sie (eigene Relays, kurze Relay-Laufzeiten).
  - **Aleph-Bindung / Provider-Unabhängigkeit** — sind wir fest an Aleph gebunden? Antwort:
    Aleph ist das erste Deployment-Target, nicht das einzige. Akash läuft als Prototyp
    (akash-deploy-pwa), ucan-store zielt zusätzlich auf Fly.io (zentralisiert);
    die Abstraktion des Deployment-Layers ist Kernbestandteil der STF-Phase-1-Arbeit
    (`@le-space/core` v2, plattform-agnostischer Provider-Interface).
  - Weitere Kandidaten: Was passiert, wenn alle Peers offline
    sind? Wem „gehört" die Datenbank (Access Controller)? Wie unterscheidet sich das von
    Blockchain? Kosten eines Relays?
- [ ] **Roadmap-Sektion auf local-first.le-space.de** (öffentliche Produkt-Roadmap, DE/EN) —
  speist sich aus dieser Datei + STRATEGY.md-Meilensteinen; zeigt Stack-Reifegrad je Schicht
  (Identity/Data/Sync/Infra/Archive) und die geplanten Schritte (Multi-Provider, UCAN 1.0,
  Live-Widget, Multi-Device-Recovery). Datengetrieben wie `projects.js`
  (z. B. `packages/shared/src/data/roadmap.js`), damit Proposals und Website synchron bleiben.

## Use-Cases / Spin-Off-Pitch-Decks

Sechs identifizierte Spin-Off-Projekte bekommen je ein Pitch-Deck (HTML + PDF)
unter `/pitchdeck/`. **Bewusst unverlinkt:** kein Button, keine Sektion, nicht in
der Sitemap, `noindex` auf jeder Seite — ein Deck bekommt man geschickt, man
stolpert nicht hinein. Quelle: `packages/shared/src/data/use-cases.js`,
Generator `tools/build-decks.mjs`, PDF `tools/render-decks.mjs`. Details im README.

- [x] Gerüst: Generator, PDF-Rendering, Übersichtsseite
- [x] Von der Landingpage entkoppelt: Sektion und Hero-Button entfernt,
      `/use-cases/` → `/pitchdeck/`, unverlinkt und noindex
- [x] **A · OrbitDB Relay** — Storage/Backup/Pinning + Hydration/Dehydration (8 Folien)
- [x] **B · WebRTC Public Data Map** — Karte des Relay-Bedarfs aus QR-Verbindungen;
      Messung als Matrix (Ort × Browser × IP-Familie), Gegenstelle zugewiesen (10 Folien)
- [x] **C · Yoga Suci** — P2P-Kursverwaltung für Yogastudios, Erlöse über
      Fiat-Terminal + Fernberatung, Kryptozahlung pro Transaktion und
      Speicher-Provision aus Spin-Off A (9 Folien)
- [x] **D · Local-First Consulting** — Beratung/Umsetzung als Spin-Off: Workshop,
      Projekt, Retainer; zieht Infrastruktur aus A nach (9 Folien)
- [x] **E · Relay Button on-chain** — Relay-Deployments über einen Prepaid-Vault
      (deposit/reserve/consume/refund, an `intentHash` gebunden), Gebühr pro
      gestartetem Node (9 Folien)
- [ ] **F** — Platzhalter-Deck steht (`draft: true`), Inhalt fehlt noch
- [ ] Decks vertiefen: Zahlen (Marktgröße, Preise), Wettbewerb, Team, Finanzbedarf
- [ ] Offen bei E: Der Vault-**Client** ist veröffentlicht (`@le-space/browser`,
      Selektoren für approve/deposit/reserve/consume/refund + Reads, Base/AVAX/ETH),
      der **Vertrag selbst liegt nicht im Repo**. Vor dem ersten echten Guthaben:
      Solidity-Quelle + Adressen veröffentlichen, Gebührenlogik einbauen, Audit,
      Kette festlegen (Gas pro Start), Haftungsfrage für den gestarteten Node.
      Hinweis: `feat/rootfs-contract-reader` in `aleph-libp2p-relay` ist *kein*
      Smart Contract — dort meint „contract" eine JSON-Bauvorschrift für Rootfs-Images.
- [ ] Offen bei D: die „Offene Fragen"-Folie nennt Bus-Faktor und
      Auslastungsfalle — für ein öffentlich verlinktes Deck prüfen, ob das so
      bleiben soll (siehe Notiz im Chat). Außerdem fehlen Preise im Angebotsblatt.
- [ ] Offen bei C: Kassensicherungsverordnung/TSE beim Barverkauf, ZAG-Bewertung
      des Krypto-Wegs (nicht-verwahrend bleiben), DSGVO-Zuschnitt der
      Buchungs-DBs — alles vor dem ersten zahlenden Studio.
- [ ] Offen bei B: DSGVO-Bewertung der Messdaten (Ortsgranularität + unverkettbarer
      Ausweis an der Kasse), der Startpool (ab wie vielen unabhängigen
      Kreuzungspunkten wird bewertet?) und das Auftragsmodell — Daten sind frei,
      bezahlt wird per Krypto-Budget eine beauftragte Messkampagne. Zu klären:
      Verwahrung des Budgets (nicht-verwahrend halten!) und Auszahlungslogik.
- [ ] Zu B gehört ein Entwurfsdokument im `libp2p-webrtc-qr`-Repo (analog zu
      Yoga Sucis PLAN.md/LIMITS.md): Zuweisung der Gegenstelle, Schwellwerte,
      Auszahlungsdeckel, Attributionslogik der Kreuztabelle. Das Deck trägt nur
      das Prinzip, nicht das Verfahren.

## News, Social & Konferenzen

- [ ] **News-/Signale-Bereich.** Die Seite zeigt heute nur Dauerhaftes (Bausteine, Use-Cases,
  FAQ) — nichts, woran man sieht, dass hier gerade gearbeitet wird. Idee: X-Posts als Ticker
  von rechts nach links durchlaufen lassen und von dort auf die Medium-Artikel verweisen.
  - Offen zu klären, bevor gebaut wird:
    - **X-Einbindung.** Kein offizielles kostenloses Widget mehr; die API kostet. Entweder
      Posts von Hand in eine Datei pflegen (wie `projects.js`) oder ein Drittanbieter-Embed —
      Letzteres wäre ein Tracker auf einer Seite, die mit „keine Tracking-Cookies" wirbt.
      Diesen Widerspruch vorher entscheiden, nicht nachträglich.
    - **Laufband ja/nein.** Bewegte Marquees sind schlecht lesbar und ein
      Barrierefreiheits-Problem; wenn, dann pausierbar und mit `prefers-reduced-motion` aus.
    - Medium hat einen RSS-Feed — der ist die verlässlichere Quelle als X.

- [ ] **Conferences & Talks.** Bisher nur im Lebenslauf, nicht auf der Seite. Bestand:
  FOSDEM 2026 (Vortrag), Blockchain Life 2025, TUM Blockchain Conference 2025, LabWeek 2025,
  Devcon 7 & LabWeek 2024, Devconnect & LabWeek 2023.
  - **Der FOSDEM-Vortrag ist aufgezeichnet und öffentlich** —
    „Local-First Peer-to-Peer apps with js-libp2p, IPFS and OrbitDB", 01.02.2026, K.3.201:
    <https://video.fosdem.org/2026/k3201/8PD9LQ-local-first-peer-to-peer-with-orbit-db.mp4>
    (Seite: <https://fosdem.org/2026/schedule/event/8PD9LQ-local-first-peer-to-peer-with-orbit-db/>).
    Das Video ist der eigentliche Wert; eine reine Namensliste besuchter Konferenzen ist schwach.
  - Vorschläge zur Umsetzung siehe Chat-Protokoll (Weltkarte, Kartenraster, Zeitleiste).

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
