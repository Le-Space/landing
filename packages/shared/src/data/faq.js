/**
 * FAQ content for local-first.le-space.de.
 * Answers may contain simple HTML (<p>, <ol>, <ul>, <li>, <a>, <strong>, <em>);
 * they are rendered with {@html}. Keep content trusted (this file only).
 * Source of topics: ROADMAP.md → "Website-Inhalte: FAQ & Roadmap".
 */

export const faq = [
  {
    id: "what-is-local-first",
    q: {
      en: 'What does "local-first" mean?',
      de: 'Was heißt „local-first"?',
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
</ol>`,
    },
  },
  {
    id: "local-first-p2p",
    q: {
      en: 'What does "local-first peer-to-peer" mean at Le-Space?',
      de: 'Was heißt bei uns „local-first peer-to-peer"?',
    },
    a: {
      en: `<p>We take local-first one step further: <strong>there is no hosting server at all</strong>. The app itself is a static JavaScript/HTML bundle, published as a PWA on IPFS — it starts on any desktop or mobile device even entirely without a server: via an IPFS gateway, as a download, or from a USB stick.</p>
<p>Sync happens browser-to-browser via libp2p. Relays are optional, replaceable peers that anyone can start — they are never the app's backend.</p>
<p><strong>You can cut out the gateway entirely.</strong> Loading this page over a domain like <em>local-first.le-space.de</em> still routes the request through a public IPFS gateway, and that gateway's operator sees your IP address and which pages you fetch — exactly the log a conventional web server would keep. Run your own IPFS node instead (IPFS Desktop or Kubo) and add the <a href="https://docs.ipfs.tech/install/ipfs-companion/" target="_blank" rel="noopener noreferrer">IPFS Companion</a> browser extension: it detects the local node and serves IPFS addresses from it, so no request reaches the gateway at all.</p>
<p>To be precise about what this buys you: no single operator holds a log of your visits any more. Your node still talks to other peers to fetch the content, and those peers can see which CIDs you ask for — so this is a real gain in privacy over a hosting provider, not anonymity.</p>`,
      de: `<p>Wir gehen einen Schritt weiter: <strong>Es gibt gar keinen Hosting-Server</strong>. Die App selbst ist ein statisches JavaScript/HTML-Bundle, als PWA auf IPFS publiziert — sie startet auf jedem Desktop- oder Mobilgerät auch ganz ohne Server: über ein IPFS-Gateway, als Download oder vom USB-Stick.</p>
<p>Der Sync läuft Browser-zu-Browser über libp2p. Relays sind optionale, austauschbare Peers, die jeder starten kann — nie das Backend der App.</p>
<p><strong>Das Gateway lässt sich ganz weglassen.</strong> Wer diese Seite über eine Domain wie <em>local-first.le-space.de</em> aufruft, läuft weiterhin über ein öffentliches IPFS-Gateway — dessen Betreiber sieht deine IP-Adresse und welche Seiten du abrufst, also genau das Protokoll, das auch ein herkömmlicher Webserver führt. Wer stattdessen einen <strong>eigenen IPFS-Node</strong> betreibt (IPFS Desktop oder Kubo) und die Browser-Erweiterung <a href="https://docs.ipfs.tech/install/ipfs-companion/" target="_blank" rel="noopener noreferrer">IPFS Companion</a> installiert, bekommt IPFS-Adressen direkt vom lokalen Node ausgeliefert — beim Gateway landet gar keine Anfrage mehr.</p>
<p>Damit klar ist, was das genau bringt: Es gibt keinen Betreiber mehr, bei dem ein Protokoll deiner Besuche zusammenläuft. Dein Node spricht aber weiterhin mit anderen Peers, um die Inhalte zu holen, und die sehen, welche CIDs du anfragst — ein echter Gewinn an Privatsphäre gegenüber einem Hosting-Anbieter also, aber keine Anonymität.</p>`,
    },
  },
  {
    id: "encryption",
    // Rendered below the answer by FaqSection; see components/Diagram*.svelte
    diagram: "encryption",
    q: {
      en: "Is my OrbitDB data encrypted?",
      de: "Sind meine OrbitDB-Daten verschlüsselt?",
    },
    a: {
      en: `<p><strong>In transit: yes.</strong> All libp2p connections are encrypted (<a href="https://docs.libp2p.io/concepts/secure-comm/noise/" target="_blank" rel="noopener noreferrer">noise protocol</a>) — relays and networks only forward ciphertext streams.</p>
<p><strong>At rest: not by default.</strong> Oplog entries stored on relays or pinning services are readable unless payload encryption is enabled.</p>
<p><strong>Payload encryption works today</strong> with <a href="https://github.com/orbitdb/simple-encryption" target="_blank" rel="noopener noreferrer">orbitdb/simple-encryption</a> (at 0.0.2 — early, but it works): entries are encrypted while replication keeps working. Our prototype <a href="https://github.com/NiKrause/de2do" target="_blank" rel="noopener noreferrer">de2do</a> went further and derived the encryption key from a passkey via <strong>WebAuthn PRF</strong> — no password, key never stored (currently being revived). Encrypted backups are on the <a href="https://github.com/NiKrause/orbitdb-storacha-bridge" target="_blank" rel="noopener noreferrer">storacha-bridge</a> roadmap.</p>`,
      de: `<p><strong>Beim Transport: ja.</strong> Alle libp2p-Verbindungen sind verschlüsselt (<a href="https://docs.libp2p.io/concepts/secure-comm/noise/" target="_blank" rel="noopener noreferrer">Noise-Protokoll</a>) — Relays und Netze leiten nur Ciphertext weiter.</p>
<p><strong>At rest: standardmäßig nein.</strong> Oplog-Einträge auf Relays oder Pinning-Diensten sind lesbar, solange keine Payload-Verschlüsselung aktiviert ist.</p>
<p><strong>Payload-Verschlüsselung geht heute schon</strong> mit <a href="https://github.com/orbitdb/simple-encryption" target="_blank" rel="noopener noreferrer">orbitdb/simple-encryption</a> (Stand 0.0.2 — früh, aber funktionsfähig): Einträge werden verschlüsselt, die Replikation funktioniert weiter. Unser Prototyp <a href="https://github.com/NiKrause/de2do" target="_blank" rel="noopener noreferrer">de2do</a> ging weiter und leitete den Schlüssel per <strong>WebAuthn PRF</strong> aus einem Passkey ab — kein Passwort, Schlüssel wird nie gespeichert (wird derzeit wiederbelebt). Verschlüsselte Backups stehen auf der Roadmap der <a href="https://github.com/NiKrause/orbitdb-storacha-bridge" target="_blank" rel="noopener noreferrer">storacha-bridge</a>.</p>`,
    },
  },
  {
    id: "metadata",
    q: {
      en: "What metadata does the network see?",
      de: "Welche Metadaten sieht das Netzwerk?",
    },
    a: {
      en: `<p>Peer-to-peer doesn't mean invisible. Depending on your setup, the following metadata exists: <strong>PeerIDs</strong> (pseudonymous public keys), <strong>database addresses and pubsub topics</strong> (visible to peers on the same topics), and <strong>IP addresses</strong> (visible to the relays you connect to — as with any internet connection).</p>
<p>How we minimize it: run your own relay (then no third party sees your IPs), start relays on demand and stop them after use, and enable payload encryption so relays only ever see ciphertext. Content of direct browser-to-browser connections is end-to-end encrypted anyway.</p>`,
      de: `<p>Peer-to-peer heißt nicht unsichtbar. Je nach Setup fallen an: <strong>PeerIDs</strong> (pseudonyme öffentliche Schlüssel), <strong>Datenbank-Adressen und Pubsub-Topics</strong> (sichtbar für Peers in denselben Topics) sowie <strong>IP-Adressen</strong> (sichtbar für die Relays, mit denen du dich verbindest — wie bei jeder Internetverbindung).</p>
<p>So minimieren wir sie: eigenen Relay betreiben (dann sieht kein Dritter deine IPs), Relays on demand starten und danach stoppen, und Payload-Verschlüsselung aktivieren, sodass Relays nur Ciphertext sehen. Direkte Browser-zu-Browser-Verbindungen sind ohnehin Ende-zu-Ende verschlüsselt.</p>`,
    },
  },
  {
    id: "aleph-lock-in",
    q: {
      en: "Are you locked into Aleph Cloud?",
      de: "Seid ihr fest an Aleph Cloud gebunden?",
    },
    a: {
      en: `<p>No. Aleph Cloud is our <strong>first</strong> deployment target, not the only one. <a href="https://github.com/NiKrause/akash-deploy-pwa" target="_blank" rel="noopener noreferrer">akash-deploy-pwa</a> already runs relay-button-style deployments on Akash Network, and support for further providers is planned — decentralized as well as deliberately centralized ones, because provider independence includes the freedom to choose centralized hosting.</p>
<p>Making the deployment layer fully platform-agnostic (an abstract provider interface in <code>@le-space/core</code>) is a core work package of our funding roadmap. The principle: the app never depends on a specific provider — infrastructure is replaceable.</p>`,
      de: `<p>Nein. Aleph Cloud ist unser <strong>erstes</strong> Deployment-Target, nicht das einzige. <a href="https://github.com/NiKrause/akash-deploy-pwa" target="_blank" rel="noopener noreferrer">akash-deploy-pwa</a> macht Relay-Button-artige Deployments bereits auf dem Akash Network, und weitere Anbieter sind geplant — dezentrale ebenso wie bewusst zentrale, denn Provider-Unabhängigkeit schließt die Freiheit ein, zentrales Hosting zu wählen.</p>
<p>Die vollständige Plattform-Abstraktion des Deployment-Layers (abstraktes Provider-Interface in <code>@le-space/core</code>) ist ein Kern-Arbeitspaket unserer Funding-Roadmap. Das Prinzip: Die App hängt nie von einem bestimmten Anbieter ab — Infrastruktur ist austauschbar.</p>`,
    },
  },
  {
    id: "aleph-security",
    q: {
      en: "How secure are Aleph Cloud instances? Who could read the data on a relay?",
      de: "Wie sicher sind Aleph-Cloud-Instanzen? Wer könnte die Daten auf einem Relay lesen?",
    },
    a: {
      en: `<p>Aleph Cloud VMs run on Compute Resource Nodes operated by independent node operators. As with any hosting — centralized or decentralized — the operator of the physical machine could in principle inspect the memory and disk of a <em>regular</em> VM. The difference to a classic cloud: it isn't one corporation, but many independent operators, and you can choose or run the node yourself.</p>
<p>Why this matters less in our architecture: a relay is <strong>forwarding and pinning infrastructure, not a data custodian</strong>. Transport is end-to-end encrypted (libp2p/noise), keys live in the users' browsers and authenticators — never on the VM. With payload encryption enabled (see the encryption question), a relay only ever stores and forwards ciphertext; a curious node operator sees nothing usable.</p>
<p>For deployments where even that isn't enough, there are <strong>Confidential VMs (TEE)</strong>: <a href="https://docs.aleph.cloud" target="_blank" rel="noopener noreferrer">Aleph Cloud</a> supports confidential computing based on AMD SEV — the VM's memory is hardware-encrypted, so even the node operator cannot inspect it. Evaluating TEE-backed relays for sensitive use cases is on our roadmap.</p>`,
      de: `<p>Aleph-Cloud-VMs laufen auf Compute Resource Nodes, die von unabhängigen Node-Betreibern betrieben werden. Wie bei jedem Hosting — zentral oder dezentral — könnte der Betreiber der physischen Maschine bei einer <em>normalen</em> VM prinzipiell Arbeitsspeicher und Disk einsehen. Der Unterschied zur klassischen Cloud: Es ist nicht ein Konzern, sondern viele unabhängige Betreiber — und man kann den Node wählen oder selbst betreiben.</p>
<p>Warum das in unserer Architektur weniger wiegt: Ein Relay ist <strong>Weiterleitungs- und Pinning-Infrastruktur, kein Daten-Treuhänder</strong>. Der Transport ist Ende-zu-Ende verschlüsselt (libp2p/Noise), Schlüssel leben in den Browsern und Authenticatoren der Nutzer — nie auf der VM. Mit aktivierter Payload-Verschlüsselung (siehe Verschlüsselungs-Frage) speichert und leitet ein Relay ausschließlich Ciphertext weiter — ein neugieriger Node-Betreiber sieht nichts Verwertbares.</p>
<p>Für Deployments, denen selbst das nicht genügt, gibt es <strong>Confidential VMs (TEE)</strong>: <a href="https://docs.aleph.cloud" target="_blank" rel="noopener noreferrer">Aleph Cloud</a> unterstützt Confidential Computing auf Basis von AMD SEV — der Arbeitsspeicher der VM ist hardwareverschlüsselt, sodass selbst der Node-Betreiber nicht hineinschauen kann. Die Evaluierung TEE-gestützter Relays für sensible Anwendungsfälle steht auf unserer Roadmap.</p>`,
    },
  },
  {
    id: "peers-offline",
    q: {
      en: "What happens when all peers are offline?",
      de: "Was passiert, wenn alle Peers offline sind?",
    },
    a: {
      en: `<p>Nothing is lost: your data lives on your device and every app keeps working offline. If collaborators are offline at the same time, changes simply sync the next time any two peers meet.</p>
<p>For teams that want availability around the clock, a relay with pinning (like <a href="https://github.com/NiKrause/orbitdb-relay" target="_blank" rel="noopener noreferrer">orbitdb-relay</a>) keeps the shared database online while everyone sleeps — and for data that must outlive devices and relays, the archive layer (Storacha/Filecoin) provides durable backups.</p>`,
      de: `<p>Nichts geht verloren: Deine Daten liegen auf deinem Gerät, und jede App funktioniert offline weiter. Sind Kollaborateure gleichzeitig offline, synchronisieren sich Änderungen einfach beim nächsten Treffen zweier Peers.</p>
<p>Teams, die Verfügbarkeit rund um die Uhr wollen, halten die gemeinsame Datenbank mit einem Relay samt Pinning (z. B. <a href="https://github.com/NiKrause/orbitdb-relay" target="_blank" rel="noopener noreferrer">orbitdb-relay</a>) online, während alle schlafen — und für Daten, die Geräte und Relays überleben sollen, gibt es die Archiv-Schicht (Storacha/Filecoin) mit dauerhaften Backups.</p>`,
    },
  },
  {
    id: "who-owns-db",
    // Rendered below the answer by FaqSection; see components/Diagram*.svelte
    diagram: "access",
    q: {
      en: 'Who "owns" a database? Who is allowed to write?',
      de: 'Wem „gehört" eine Datenbank? Wer darf schreiben?',
    },
    a: {
      en: `<p>Every OrbitDB database has an <a href="https://github.com/orbitdb/orbitdb/blob/main/docs/ACCESS_CONTROLLERS.md" target="_blank" rel="noopener noreferrer"><strong>access controller</strong></a>: a list of cryptographic identities that are allowed to write. Writes are signed; every peer verifies signatures independently — no server decides.</p>
<p>With our <a href="https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did" target="_blank" rel="noopener noreferrer">WebAuthn identity provider</a>, that identity is your passkey (Face ID, Touch ID, security key) — no account, no password. Reading is governed by replication and, if enabled, payload encryption.</p>
<p><strong>See it work:</strong> the <a href="https://acl01.le-space.de" target="_blank" rel="noopener noreferrer">acl01 tutorial chapter</a> creates an owner-only list, shares it by address and grants a second DID write access at runtime — the address never changes. For token-based delegation instead of a list, there is <a href="https://github.com/Le-Space/orbitdb-access-controller-delegated-todo" target="_blank" rel="noopener noreferrer">orbitdb-access-controller-delegated-todo</a>.</p>`,
      de: `<p>Jede OrbitDB-Datenbank hat einen <a href="https://github.com/orbitdb/orbitdb/blob/main/docs/ACCESS_CONTROLLERS.md" target="_blank" rel="noopener noreferrer"><strong>Access Controller</strong></a>: eine Liste kryptografischer Identitäten, die schreiben dürfen. Schreibzugriffe sind signiert; jeder Peer prüft die Signaturen selbst — kein Server entscheidet.</p>
<p>Mit unserem <a href="https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did" target="_blank" rel="noopener noreferrer">WebAuthn-Identity-Provider</a> ist diese Identität dein Passkey (Face ID, Touch ID, Security Key) — kein Account, kein Passwort. Lesen regelt die Replikation und, falls aktiviert, die Payload-Verschlüsselung.</p>
<p><strong>Zum Ausprobieren:</strong> Das <a href="https://acl01.le-space.de" target="_blank" rel="noopener noreferrer">Tutorial-Kapitel acl01</a> legt eine Liste an, die nur dem Owner gehört, teilt sie per Adresse und vergibt zur Laufzeit Schreibrecht an eine zweite DID — die Adresse bleibt dabei gleich. Für Delegation per Token statt per Liste gibt es <a href="https://github.com/Le-Space/orbitdb-access-controller-delegated-todo" target="_blank" rel="noopener noreferrer">orbitdb-access-controller-delegated-todo</a>.</p>`,
    },
  },
  {
    id: "vs-blockchain",
    q: {
      en: "How is this different from a blockchain?",
      de: "Wie unterscheidet sich das von einer Blockchain?",
    },
    a: {
      en: `<p>No tokens, no mining, no global consensus. OrbitDB is a <strong>local-first database</strong>: each database belongs to the people using it, replicates only between their peers, and merges concurrent changes (CRDT-based op-log) instead of requiring the whole world to agree on one chain.</p>
<p>That makes it fast, free to use and private by scope. We do use adjacent decentralized networks where they help: IPFS for app distribution, Filecoin for archival, and decentralized compute (Aleph, Akash) for relays — but your data never sits on a public chain.</p>`,
      de: `<p>Keine Tokens, kein Mining, kein globaler Konsens. OrbitDB ist eine <strong>Local-First-Datenbank</strong>: Jede Datenbank gehört den Menschen, die sie nutzen, repliziert nur zwischen deren Peers und führt parallele Änderungen zusammen (CRDT-basierter Oplog) — statt dass sich die ganze Welt auf eine Kette einigen muss.</p>
<p>Das macht sie schnell, kostenlos nutzbar und privat im Geltungsbereich. Benachbarte dezentrale Netze nutzen wir dort, wo sie helfen: IPFS für die App-Verteilung, Filecoin fürs Archiv, dezentrales Compute (Aleph, Akash) für Relays — aber deine Daten liegen nie auf einer öffentlichen Chain.</p>`,
    },
  },
  {
    id: "mesh-without-relays",
    q: {
      en: "Can devices form a mesh with no relay at all?",
      de: "Geht ein Mesh auch ganz ohne Relay?",
    },
    a: {
      en: `<p>Yes, and it costs nothing to run. With <a href="https://github.com/NiKrause/libp2p-webrtc-qr" target="_blank" rel="noopener noreferrer">libp2p-webrtc-qr</a> two devices exchange the WebRTC handshake themselves — as a scanned QR code when they are in the same room, or as an invite link sent through any messenger. Once the connection is up it is an ordinary libp2p connection: gossipsub forms its mesh across it, OrbitDB replicates over it, and a third device joining any member joins the same mesh.</p>
<p>The handshake travels in the <strong>fragment</strong> of the link, the part after the <code>#</code>, which browsers never send to a server. No signalling server sees it — and there is none to see it.</p>
<p>That makes it two things at once. It is the <strong>free default</strong>: an app can ship without any infrastructure behind it and still let people work together. And it is the <strong>fallback</strong> that holds when every relay is down, unreachable or blocked — because there is nothing at a fixed address left to block. What an attacker would have to interfere with is a QR code held up to a camera.</p>
<p>What it asks for in return is a human moment. Someone scans, or sends a link, and the other side opens it. A relay spares you that: it is reachable around the clock and peers find each other without anybody doing anything. Once a mesh exists, a dropped connection can be repaired through the peers that are still connected — but the first introduction is always made by a person.</p>
<p>Two honest limits. Devices on different networks still need STUN to discover their own public address; that is a single UDP question to a public server, carries no data, and can be switched off if both devices share a network. And a QR code holds a bounded amount, so a handshake with many candidates is split across an animated sequence rather than one still image.</p>`,
      de: `<p>Ja — und der Betrieb kostet nichts. Mit <a href="https://github.com/NiKrause/libp2p-webrtc-qr" target="_blank" rel="noopener noreferrer">libp2p-webrtc-qr</a> tauschen zwei Geräte den WebRTC-Handshake selbst aus: als gescannten QR-Code, wenn sie im selben Raum sind, oder als Einladungslink über einen beliebigen Messenger. Steht die Verbindung, ist sie eine ganz normale libp2p-Verbindung — gossipsub bildet sein Mesh darüber, OrbitDB repliziert darüber, und ein drittes Gerät, das sich mit einem beliebigen Mitglied verbindet, ist im selben Mesh.</p>
<p>Der Handshake steht im <strong>Fragment</strong> des Links, dem Teil hinter dem <code>#</code>, den Browser grundsätzlich nicht an einen Server schicken. Kein Signalisierungsserver sieht ihn — es gibt auch keinen, der ihn sehen könnte.</p>
<p>Damit ist es zweierlei zugleich. Es ist der <strong>kostenlose Normalfall</strong>: Eine App kann ohne jede Infrastruktur ausgeliefert werden und Menschen trotzdem zusammenarbeiten lassen. Und es ist der <strong>Rückfallweg</strong>, der trägt, wenn jedes Relay ausfällt, unerreichbar oder blockiert ist — weil nichts mehr an einer festen Adresse steht, das man blockieren könnte. Stören müsste man einen QR-Code, den jemand vor eine Kamera hält.</p>
<p>Verlangt wird dafür ein menschlicher Moment. Jemand scannt oder verschickt einen Link, die andere Seite öffnet ihn. Ein Relay erspart genau das: Es ist rund um die Uhr erreichbar, und Peers finden einander, ohne dass jemand etwas tut. Besteht ein Mesh erst einmal, lässt sich eine abgerissene Verbindung über die verbliebenen Peers wiederherstellen — die erste Vorstellung macht aber immer ein Mensch.</p>
<p>Zwei ehrliche Grenzen. Geräte in verschiedenen Netzen brauchen weiterhin STUN, um ihre eigene öffentliche Adresse zu erfahren; das ist eine einzelne UDP-Frage an einen öffentlichen Server, transportiert keine Daten und lässt sich abschalten, wenn beide Geräte im selben Netz sind. Und ein QR-Code fasst eine begrenzte Menge, weshalb ein Handshake mit vielen Kandidaten als animierte Folge statt als einzelnes Standbild läuft.</p>`,
    },
  },
  {
    id: "relay-cost",
    q: {
      en: "What does a relay cost — and who pays for it?",
      de: "Was kostet ein Relay — und wer bezahlt ihn?",
    },
    a: {
      en: `<p>A relay is a small VM — on decentralized compute (Aleph, Akash) typically a few euros per month, and with on-demand deployments you only pay while it runs. Stop it, and the apps keep working; they just lose the always-on meeting point.</p>
<p>Crucially, <strong>anyone can sponsor a relay</strong>: the app developer, a community, a university, a company — or you yourself for your own devices. The relay is replaceable infrastructure, not a vendor's backend.</p>`,
      de: `<p>Ein Relay ist eine kleine VM — auf dezentralem Compute (Aleph, Akash) typischerweise wenige Euro pro Monat, und bei On-Demand-Deployments zahlst du nur, solange er läuft. Stoppst du ihn, funktionieren die Apps weiter; es fehlt nur der immer erreichbare Treffpunkt.</p>
<p>Entscheidend: <strong>Jeder kann einen Relay sponsern</strong> — der App-Entwickler, eine Community, eine Universität, eine Firma — oder du selbst für deine eigenen Geräte. Der Relay ist austauschbare Infrastruktur, nicht das Backend eines Anbieters.</p>`,
    },
  },
];
