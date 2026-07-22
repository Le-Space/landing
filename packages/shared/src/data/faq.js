/**
 * FAQ content for local-first.le-space.de.
 * Answers may contain simple HTML (<p>, <ol>, <ul>, <li>, <a>, <strong>, <em>);
 * they are rendered with {@html}. Keep content trusted (this file only).
 * Source of topics: ROADMAP.md → "Website-Inhalte: FAQ & Roadmap".
 */

export const faq = [
  {
    id: 'what-is-local-first',
    q: {
      en: 'What does "local-first" mean?',
      de: 'Was heißt „local-first"?'
    },
    a: {
      en: `<p>The term was coined by <a href="https://www.inkandswitch.com/local-first/" target="_blank" rel="noopener noreferrer">Ink &amp; Switch (Kleppmann et al.)</a> and describes software that follows seven ideals:</p>
<ol>
<li><strong>No spinners</strong> — fast, because it works with local data</li>
<li><strong>Multi-device</strong> — seamless sync across all your devices</li>
<li><strong>Offline</strong> — full read/write functionality without internet access</li>
<li><strong>Collaboration</strong> — real-time collaborative editing for multiple users</li>
<li><strong>Longevity</strong> — access and edit your data for decades, outliving any server</li>
<li><strong>Privacy</strong> — encrypted data that service providers cannot read</li>
<li><strong>User control</strong> — full ownership: copy, modify, delete</li>
</ol>`,
      de: `<p>Der Begriff stammt von <a href="https://www.inkandswitch.com/local-first/" target="_blank" rel="noopener noreferrer">Ink &amp; Switch (Kleppmann et al.)</a> und beschreibt Software, die sieben Idealen folgt:</p>
<ol>
<li><strong>No spinners</strong> — schnell, weil mit lokalen Daten gearbeitet wird</li>
<li><strong>Multi-device</strong> — nahtloser Sync über alle Geräte</li>
<li><strong>Offline</strong> — voller Lese- und Schreibzugriff ohne Internet</li>
<li><strong>Collaboration</strong> — Echtzeit-Zusammenarbeit mehrerer Nutzer</li>
<li><strong>Longevity</strong> — Daten bleiben über Jahrzehnte nutzbar und überleben jeden Server</li>
<li><strong>Privacy</strong> — verschlüsselte Daten, die Service-Provider nicht lesen können</li>
<li><strong>User control</strong> — volle Datenhoheit: kopieren, ändern, löschen</li>
</ol>`
    }
  },
  {
    id: 'local-first-p2p',
    q: {
      en: 'What does "local-first peer-to-peer" mean at Le-Space?',
      de: 'Was heißt bei uns „local-first peer-to-peer"?'
    },
    a: {
      en: `<p>We take local-first one step further: <strong>there is no hosting server at all</strong>. The app itself is a static JavaScript/HTML bundle, published as a PWA on IPFS — it starts on any desktop or mobile device even entirely without a server: via an IPFS gateway, as a download, or from a USB stick.</p>
<p>Sync happens browser-to-browser via libp2p. Relays are optional, replaceable infrastructure started on demand — they are never the app's backend.</p>`,
      de: `<p>Wir gehen einen Schritt weiter: <strong>Es gibt gar keinen Hosting-Server</strong>. Die App selbst ist ein statisches JavaScript/HTML-Bundle, als PWA auf IPFS publiziert — sie startet auf jedem Desktop- oder Mobilgerät auch ganz ohne Server: über ein IPFS-Gateway, als Download oder vom USB-Stick.</p>
<p>Der Sync läuft Browser-zu-Browser über libp2p. Relays sind optionale, austauschbare Infrastruktur auf Knopfdruck — nie das Backend der App.</p>`
    }
  },
  {
    id: 'encryption',
    q: {
      en: 'Is my OrbitDB data encrypted?',
      de: 'Sind meine OrbitDB-Daten verschlüsselt?'
    },
    a: {
      en: `<p><strong>In transit: yes.</strong> All libp2p connections are encrypted (noise protocol) — relays and networks only forward ciphertext streams.</p>
<p><strong>At rest: not by default.</strong> Oplog entries stored on relays or pinning services are readable unless payload encryption is enabled.</p>
<p><strong>Payload encryption works today</strong> with <a href="https://github.com/orbitdb/simple-encryption" target="_blank" rel="noopener noreferrer">orbitdb/simple-encryption</a>: entries are encrypted while replication keeps working. Our prototype <a href="https://github.com/NiKrause/de2do" target="_blank" rel="noopener noreferrer">de2do</a> went further and derived the encryption key from a passkey via <strong>WebAuthn PRF</strong> — no password, key never stored (currently being revived). Encrypted backups are on the <a href="https://github.com/NiKrause/orbitdb-storacha-bridge" target="_blank" rel="noopener noreferrer">storacha-bridge</a> roadmap.</p>`,
      de: `<p><strong>Beim Transport: ja.</strong> Alle libp2p-Verbindungen sind verschlüsselt (Noise-Protokoll) — Relays und Netze leiten nur Ciphertext weiter.</p>
<p><strong>At rest: standardmäßig nein.</strong> Oplog-Einträge auf Relays oder Pinning-Diensten sind lesbar, solange keine Payload-Verschlüsselung aktiviert ist.</p>
<p><strong>Payload-Verschlüsselung geht heute schon</strong> mit <a href="https://github.com/orbitdb/simple-encryption" target="_blank" rel="noopener noreferrer">orbitdb/simple-encryption</a>: Einträge werden verschlüsselt, die Replikation funktioniert weiter. Unser Prototyp <a href="https://github.com/NiKrause/de2do" target="_blank" rel="noopener noreferrer">de2do</a> ging weiter und leitete den Schlüssel per <strong>WebAuthn PRF</strong> aus einem Passkey ab — kein Passwort, Schlüssel wird nie gespeichert (wird derzeit wiederbelebt). Verschlüsselte Backups stehen auf der Roadmap der <a href="https://github.com/NiKrause/orbitdb-storacha-bridge" target="_blank" rel="noopener noreferrer">storacha-bridge</a>.</p>`
    }
  },
  {
    id: 'metadata',
    q: {
      en: 'What metadata does the network see?',
      de: 'Welche Metadaten sieht das Netzwerk?'
    },
    a: {
      en: `<p>Peer-to-peer doesn't mean invisible. Depending on your setup, the following metadata exists: <strong>PeerIDs</strong> (pseudonymous public keys), <strong>database addresses and pubsub topics</strong> (visible to peers on the same topics), and <strong>IP addresses</strong> (visible to the relays you connect to — as with any internet connection).</p>
<p>How we minimize it: run your own relay (then no third party sees your IPs), start relays on demand and stop them after use, and enable payload encryption so relays only ever see ciphertext. Content of direct browser-to-browser connections is end-to-end encrypted anyway.</p>`,
      de: `<p>Peer-to-peer heißt nicht unsichtbar. Je nach Setup fallen an: <strong>PeerIDs</strong> (pseudonyme öffentliche Schlüssel), <strong>Datenbank-Adressen und Pubsub-Topics</strong> (sichtbar für Peers in denselben Topics) sowie <strong>IP-Adressen</strong> (sichtbar für die Relays, mit denen du dich verbindest — wie bei jeder Internetverbindung).</p>
<p>So minimieren wir sie: eigenen Relay betreiben (dann sieht kein Dritter deine IPs), Relays on demand starten und danach stoppen, und Payload-Verschlüsselung aktivieren, sodass Relays nur Ciphertext sehen. Direkte Browser-zu-Browser-Verbindungen sind ohnehin Ende-zu-Ende verschlüsselt.</p>`
    }
  },
  {
    id: 'aleph-lock-in',
    q: {
      en: 'Are you locked into Aleph Cloud?',
      de: 'Seid ihr fest an Aleph Cloud gebunden?'
    },
    a: {
      en: `<p>No. Aleph Cloud is our <strong>first</strong> deployment target, not the only one. <a href="https://github.com/NiKrause/akash-deploy-pwa" target="_blank" rel="noopener noreferrer">akash-deploy-pwa</a> already runs relay-button-style deployments on Akash Network, and <a href="https://github.com/NomadKids/ucan-store" target="_blank" rel="noopener noreferrer">ucan-store</a> additionally targets Fly.io — a deliberately centralized option, because provider independence includes the freedom to choose centralized hosting.</p>
<p>Making the deployment layer fully platform-agnostic (an abstract provider interface in <code>@le-space/core</code>) is a core work package of our funding roadmap. The principle: the app never depends on a specific provider — infrastructure is replaceable.</p>`,
      de: `<p>Nein. Aleph Cloud ist unser <strong>erstes</strong> Deployment-Target, nicht das einzige. <a href="https://github.com/NiKrause/akash-deploy-pwa" target="_blank" rel="noopener noreferrer">akash-deploy-pwa</a> macht Relay-Button-artige Deployments bereits auf dem Akash Network, und <a href="https://github.com/NomadKids/ucan-store" target="_blank" rel="noopener noreferrer">ucan-store</a> zielt zusätzlich auf Fly.io — bewusst auch eine zentralisierte Option, denn Provider-Unabhängigkeit schließt die Freiheit ein, zentrales Hosting zu wählen.</p>
<p>Die vollständige Plattform-Abstraktion des Deployment-Layers (abstraktes Provider-Interface in <code>@le-space/core</code>) ist ein Kern-Arbeitspaket unserer Funding-Roadmap. Das Prinzip: Die App hängt nie von einem bestimmten Anbieter ab — Infrastruktur ist austauschbar.</p>`
    }
  },
  {
    id: 'peers-offline',
    q: {
      en: 'What happens when all peers are offline?',
      de: 'Was passiert, wenn alle Peers offline sind?'
    },
    a: {
      en: `<p>Nothing is lost: your data lives on your device and every app keeps working offline. If collaborators are offline at the same time, changes simply sync the next time any two peers meet.</p>
<p>For teams that want availability around the clock, a relay with pinning (like <a href="https://github.com/NiKrause/orbitdb-relay" target="_blank" rel="noopener noreferrer">orbitdb-relay</a>) keeps the shared database online while everyone sleeps — and for data that must outlive devices and relays, the archive layer (Storacha/Filecoin) provides durable backups.</p>`,
      de: `<p>Nichts geht verloren: Deine Daten liegen auf deinem Gerät, und jede App funktioniert offline weiter. Sind Kollaborateure gleichzeitig offline, synchronisieren sich Änderungen einfach beim nächsten Treffen zweier Peers.</p>
<p>Teams, die Verfügbarkeit rund um die Uhr wollen, halten die gemeinsame Datenbank mit einem Relay samt Pinning (z. B. <a href="https://github.com/NiKrause/orbitdb-relay" target="_blank" rel="noopener noreferrer">orbitdb-relay</a>) online, während alle schlafen — und für Daten, die Geräte und Relays überleben sollen, gibt es die Archiv-Schicht (Storacha/Filecoin) mit dauerhaften Backups.</p>`
    }
  },
  {
    id: 'who-owns-db',
    q: {
      en: 'Who "owns" a database? Who is allowed to write?',
      de: 'Wem „gehört" eine Datenbank? Wer darf schreiben?'
    },
    a: {
      en: `<p>Every OrbitDB database has an <strong>access controller</strong>: a list of cryptographic identities that are allowed to write. Writes are signed; every peer verifies signatures independently — no server decides.</p>
<p>With our <a href="https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did" target="_blank" rel="noopener noreferrer">WebAuthn identity provider</a>, that identity is your passkey (Face ID, Touch ID, security key) — no account, no password. Reading is governed by replication and, if enabled, payload encryption.</p>`,
      de: `<p>Jede OrbitDB-Datenbank hat einen <strong>Access Controller</strong>: eine Liste kryptografischer Identitäten, die schreiben dürfen. Schreibzugriffe sind signiert; jeder Peer prüft die Signaturen selbst — kein Server entscheidet.</p>
<p>Mit unserem <a href="https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did" target="_blank" rel="noopener noreferrer">WebAuthn-Identity-Provider</a> ist diese Identität dein Passkey (Face ID, Touch ID, Security Key) — kein Account, kein Passwort. Lesen regelt die Replikation und, falls aktiviert, die Payload-Verschlüsselung.</p>`
    }
  },
  {
    id: 'vs-blockchain',
    q: {
      en: 'How is this different from a blockchain?',
      de: 'Wie unterscheidet sich das von einer Blockchain?'
    },
    a: {
      en: `<p>No tokens, no mining, no global consensus. OrbitDB is a <strong>local-first database</strong>: each database belongs to the people using it, replicates only between their peers, and merges concurrent changes (CRDT-based op-log) instead of requiring the whole world to agree on one chain.</p>
<p>That makes it fast, free to use and private by scope. We do use adjacent decentralized networks where they help: IPFS for app distribution, Filecoin for archival, and decentralized compute (Aleph, Akash) for relays — but your data never sits on a public chain.</p>`,
      de: `<p>Keine Tokens, kein Mining, kein globaler Konsens. OrbitDB ist eine <strong>Local-First-Datenbank</strong>: Jede Datenbank gehört den Menschen, die sie nutzen, repliziert nur zwischen deren Peers und führt parallele Änderungen zusammen (CRDT-basierter Oplog) — statt dass sich die ganze Welt auf eine Kette einigen muss.</p>
<p>Das macht sie schnell, kostenlos nutzbar und privat im Geltungsbereich. Benachbarte dezentrale Netze nutzen wir dort, wo sie helfen: IPFS für die App-Verteilung, Filecoin fürs Archiv, dezentrales Compute (Aleph, Akash) für Relays — aber deine Daten liegen nie auf einer öffentlichen Chain.</p>`
    }
  },
  {
    id: 'relay-cost',
    q: {
      en: 'What does a relay cost — and who pays for it?',
      de: 'Was kostet ein Relay — und wer bezahlt ihn?'
    },
    a: {
      en: `<p>A relay is a small VM — on decentralized compute (Aleph, Akash) typically a few euros per month, and with on-demand deployments you only pay while it runs. Stop it, and the apps keep working; they just lose the always-on meeting point.</p>
<p>Crucially, <strong>anyone can sponsor a relay</strong>: the app developer, a community, a university, a company — or you yourself for your own devices. The relay is replaceable infrastructure, not a vendor's backend.</p>`,
      de: `<p>Ein Relay ist eine kleine VM — auf dezentralem Compute (Aleph, Akash) typischerweise wenige Euro pro Monat, und bei On-Demand-Deployments zahlst du nur, solange er läuft. Stoppst du ihn, funktionieren die Apps weiter; es fehlt nur der immer erreichbare Treffpunkt.</p>
<p>Entscheidend: <strong>Jeder kann einen Relay sponsern</strong> — der App-Entwickler, eine Community, eine Universität, eine Firma — oder du selbst für deine eigenen Geräte. Der Relay ist austauschbare Infrastruktur, nicht das Backend eines Anbieters.</p>`
    }
  }
];
