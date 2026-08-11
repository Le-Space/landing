/**
 * Single source of truth for the portfolio.
 * media: put screenshots at sites/local-first/public/media/<id>.png
 *        and demo videos at sites/local-first/public/media/<id>.mp4 (or webm).
 * Set `screenshot`/`video` to null while assets are missing — the card
 * renders a stack-colored placeholder instead.
 */

export const LAYERS = {
  identity: { id: 'identity', color: 'var(--ls-green)', label: { en: 'Identity', de: 'Identität' } },
  data: { id: 'data', color: 'var(--ls-amber)', label: { en: 'Data', de: 'Daten' } },
  sync: { id: 'sync', color: 'var(--ls-accent)', label: { en: 'Sync', de: 'Sync' } },
  infra: { id: 'infra', color: 'var(--ls-accent-2)', label: { en: 'Infrastructure', de: 'Infrastruktur' } },
  archive: { id: 'archive', color: 'var(--ls-red-bright)', label: { en: 'Archive', de: 'Archiv' } }
};

/**
 * Status badge labels. The badge used to print the raw status key, so the
 * German page said "beta" and "prototype" too.
 */
export const STATUS = {
  stable: { en: 'stable', de: 'stabil' },
  beta: { en: 'beta', de: 'beta' },
  'in-development': { en: 'in development', de: 'in Entwicklung' },
  prototype: { en: 'prototype', de: 'Prototyp' },
  tutorial: { en: 'tutorial', de: 'Tutorial' }
};

export const projects = [
  {
    id: 'yogasuci',
    name: 'Yogasūcī (योगसूची)',
    layers: ['identity', 'data', 'sync'],
    status: 'in-development',
    featured: true,
    github: 'https://github.com/Le-Space/yogasuci',
    demo: 'https://yogasuci.le-space.de',
    npm: null,
    screenshot: '/media/yogasuci.png',
    video: null,
    note: {
      en: 'Showcase for OrbitDB and WebRTC over QR — a real application, not a demo',
      de: 'Showcase für OrbitDB und WebRTC über QR — eine echte Anwendung, keine Demo'
    },
    tagline: {
      en: `Class booking for yoga studios with more than one location, built to show what the stack does when an application actually depends on it.
<ul>
<li><strong>No relay at all:</strong> devices meet by scanning a QR code or opening an invite link — <a href="https://github.com/NiKrause/libp2p-webrtc-qr" target="_blank" rel="noopener noreferrer">libp2p-webrtc-qr</a> as the only transport, which makes it the working proof that the free path is enough.</li>
<li><strong>No account, no password:</strong> a passkey is the identity, and a second device is approved by the first.</li>
<li><strong>Passes are an append-only log:</strong> the balance is folded from the events and never stored, so two counters in different places can sell and redeem without asking anyone for permission.</li>
<li><strong>Where it stops being comfortable is written down:</strong> the handbook has a chapter on what the app cannot do, and the repository documents the limits it ran into rather than the features it hoped for.</li>
</ul>`,
      de: `Kursbuchung für Yogastudios mit mehreren Standorten — gebaut, um zu zeigen, was der Stack leistet, wenn eine Anwendung tatsächlich davon abhängt.
<ul>
<li><strong>Ganz ohne Relay:</strong> Geräte finden sich per gescanntem QR-Code oder Einladungslink — <a href="https://github.com/NiKrause/libp2p-webrtc-qr" target="_blank" rel="noopener noreferrer">libp2p-webrtc-qr</a> als einziger Transport, und damit der laufende Beweis, dass der kostenlose Weg genügt.</li>
<li><strong>Kein Konto, kein Passwort:</strong> Ein Passkey ist die Identität, ein zweites Gerät wird vom ersten freigegeben.</li>
<li><strong>Karten sind ein Append-only-Log:</strong> Das Guthaben wird aus den Ereignissen gefaltet und nie gespeichert — zwei Theken an verschiedenen Orten können verkaufen und entwerten, ohne jemanden um Erlaubnis zu fragen.</li>
<li><strong>Wo es unbequem wird, steht geschrieben:</strong> Das Handbuch hat ein Kapitel darüber, was die App nicht kann, und das Repository dokumentiert die Grenzen, an die sie gestoßen ist, statt der Funktionen, die man sich erhofft hatte.</li>
</ul>`
    }
  },
  {
    id: 'relay-button',
    name: 'Relay Button',
    layers: ['infra'],
    status: 'beta',
    featured: true,
    github: 'https://github.com/NiKrause/relay-button',
    demo: null,
    docs: 'https://nikrause.github.io/relay-button/',
    npm: '@le-space/core',
    screenshot: '/media/relay-button.webp',
    // The shot is the Relay Button panel embedded in Simple Todo, not the docs site.
    shotHost: 'simple-todo.le-space.de',
    video: null,
    tagline: {
      en: `Deploy libp2p relay nodes on demand — the toolchain at the core of the local-first stack.
<ul>
<li><strong>One click, one relay:</strong> deploys a libp2p/OrbitDB relay (signaling, bootstrap, IPFS pinning) — run it for a meeting, a project or years, then stop it.</li>
<li><strong>Full automation:</strong> build qcow2 RootFS images, publish to IPFS, manage VM lifecycle &amp; retention via CLI and GitHub Actions.</li>
<li><strong>Embeddable UI:</strong> React &amp; Svelte components — the actual "Relay Button" — for any app.</li>
<li><strong>Bootstrap discovery:</strong> relays register themselves; apps discover them automatically.</li>
<li><strong>New — remote browser replication:</strong> CI spins up a real browser on a fresh VM in another network and verifies true cross-network P2P replication end-to-end — replacing services like testingbot.com for local-first P2P apps.</li>
<li><strong>Runs on <a href="https://aleph.cloud" target="_blank" rel="noopener noreferrer">Aleph Cloud</a>:</strong> decentralized compute, VMs without a cloud account; further providers — decentralized and centralized — planned.</li>
</ul>`,
      de: `Libp2p-Relay-Nodes auf Knopfdruck — die Toolchain im Zentrum des Local-First-Stacks.
<ul>
<li><strong>Ein Klick, ein Relay:</strong> deployt einen libp2p/OrbitDB-Relay (Signaling, Bootstrap, IPFS-Pinning) — läuft für ein Meeting, ein Projekt oder Jahre, danach wird er gestoppt.</li>
<li><strong>Volle Automatisierung:</strong> qcow2-RootFS-Images bauen, auf IPFS publizieren, VM-Lifecycle &amp; Retention per CLI und GitHub Actions.</li>
<li><strong>Einbettbare UI:</strong> React- &amp; Svelte-Komponenten — der eigentliche „Relay Button" — für jede App.</li>
<li><strong>Bootstrap-Discovery:</strong> Relays registrieren sich selbst; Apps finden sie automatisch.</li>
<li><strong>Neu — Remote-Browser-Replication:</strong> Die CI startet einen echten Browser auf einer frischen VM in einem anderen Netz und verifiziert echte Cross-Network-P2P-Replikation Ende-zu-Ende — ersetzt Dienste wie testingbot.com für Local-First-P2P-Apps.</li>
<li><strong>Läuft auf <a href="https://aleph.cloud" target="_blank" rel="noopener noreferrer">Aleph Cloud</a>:</strong> dezentrales Compute, VMs ohne Cloud-Account; weitere Anbieter — dezentrale wie zentrale — geplant.</li>
</ul>`
    }
  },
  {
    id: 'libp2p-webrtc-qr',
    name: 'libp2p WebRTC over QR',
    layers: ['sync'],
    status: 'beta',
    featured: true,
    github: 'https://github.com/NiKrause/libp2p-webrtc-qr',
    demo: 'https://webrtc-qr.le-space.de',
    npm: '@le-space/libp2p-webrtc-qr',
    screenshot: '/media/libp2p-webrtc-qr.png',
    video: null,
    note: {
      en: 'New — released on npm as @le-space/libp2p-webrtc-qr',
      de: 'Neu — auf npm veröffentlicht als @le-space/libp2p-webrtc-qr'
    },
    tagline: {
      en: `Two browsers connect directly as libp2p peers — no relay, no signaling server. One phone scans the WebRTC handshake off the other screen.
<ul>
<li><strong>Signaling as a QR code:</strong> offer and answer travel out-of-band as signed, deflate-compressed payloads instead of through a circuit relay. A text field is the copy/paste fallback.</li>
<li><strong>Signed, not just scanned:</strong> the SDP carries the DTLS fingerprint, so signing it with the libp2p key binds the WebRTC session to the peer id — the same idea <code>certhash</code> uses in WebRTC-Direct. That is what makes it safe to skip the usual encryption handshake.</li>
<li><strong>Tampering fails closed:</strong> a modified payload is rejected before any dial happens, and a browser refuses its own offer instead of self-dialing.</li>
<li><strong>Works without infrastructure:</strong> useful where there is no relay to reach — the same room, the same LAN, an air-gapped network.</li>
</ul>`,
      de: `Zwei Browser verbinden sich direkt als libp2p-Peers — ohne Relay, ohne Signaling-Server. Ein Handy scannt den WebRTC-Handshake vom Bildschirm des anderen.
<ul>
<li><strong>Signaling als QR-Code:</strong> Offer und Answer laufen out-of-band als signierte, deflate-komprimierte Payloads statt über ein Circuit-Relay. Ein Textfeld dient als Copy/Paste-Fallback.</li>
<li><strong>Signiert, nicht nur gescannt:</strong> das SDP enthält den DTLS-Fingerprint — wird es mit dem libp2p-Schlüssel signiert, ist die WebRTC-Session an die Peer-ID gebunden. Dasselbe Prinzip wie <code>certhash</code> bei WebRTC-Direct, und genau deshalb darf der übliche Verschlüsselungs-Handshake entfallen.</li>
<li><strong>Manipulation scheitert sicher:</strong> eine veränderte Payload wird vor jedem Verbindungsversuch abgelehnt, und ein Browser verweigert sein eigenes Offer statt sich selbst zu dialen.</li>
<li><strong>Funktioniert ohne Infrastruktur:</strong> nützlich, wo kein Relay erreichbar ist — derselbe Raum, dasselbe LAN, ein abgeschottetes Netz.</li>
</ul>`
    }
  },
  {
    id: 'simple-todo',
    name: 'Simple Todo',
    layers: ['identity', 'data', 'sync'],
    status: 'tutorial',
    featured: true,
    github: 'https://github.com/NiKrause/simple-todo',
    demos: [
      {
        url: 'https://simple-todo.le-space.de',
        label: 'simple-todo',
        shot: '/media/simple-todo-main.webp',
        desc: {
          en: 'chapter "main" — every visitor automatically joins the same shared todo list; just open the URL.',
          de: 'Kapitel „main" — alle Besucher teilen automatisch dieselbe gemeinsame Todo-Liste; URL öffnen genügt.'
        }
      },
      {
        url: 'https://collab01.le-space.de',
        label: 'collab01',
        shot: '/media/simple-todo-collab01.webp',
        desc: {
          en: 'chapter "collab01" — create your own lists and share them with chosen peers via their OrbitDB address.',
          de: 'Kapitel „collab01" — eigene Listen erstellen und gezielt per OrbitDB-Adresse mit anderen Peers teilen.'
        }
      },
      {
        url: 'https://passkey01.le-space.de',
        label: 'passkey01',
        shot: '/media/simple-todo-passkey01.webp',
        desc: {
          en: 'chapter "passkey01" — sign in with a passkey instead of a throwaway key. Your WebAuthn DID signs every entry and is shown as its author.',
          de: 'Kapitel „passkey01" — Anmeldung per Passkey statt Wegwerf-Schlüssel. Die WebAuthn-DID signiert jeden Eintrag und wird als Autor angezeigt.'
        }
      },
      {
        url: 'https://acl01.le-space.de',
        label: 'acl01',
        shot: '/media/simple-todo-acl01.webp',
        desc: {
          en: 'chapter "acl01" — private, owner-only lists with per-DID write permissions. Grant or revoke access at runtime, without the list address changing.',
          de: 'Kapitel „acl01" — private Listen nur für den Owner, mit Schreibrechten pro DID. Rechte zur Laufzeit vergeben oder entziehen, ohne dass sich die Listen-Adresse ändert.'
        }
      }
    ],
    npm: null,
    // The card renders demos[].shot; this pointed at a file that never existed.
    screenshot: null,
    video: null,
    tagline: {
      en: 'Tutorial for local-first P2P PWAs: WebAuthn/Passkey identity, OrbitDB data, browser-to-browser sync. No server, no accounts, no passwords.',
      de: 'Tutorial für local-first P2P-PWAs: WebAuthn/Passkey-Identität, OrbitDB-Daten, Browser-zu-Browser-Sync. Kein Server, keine Accounts, keine Passwörter.'
    }
  },
  {
    id: 'uc-chat',
    name: 'Universal Connectivity',
    layers: ['sync'],
    status: 'stable',
    featured: true,
    github: 'https://github.com/NiKrause/universal-connectivity',
    demos: [
      {
        url: 'https://connect.nicokrause.com',
        label: 'chat',
        shot: '/media/uc-chat-peers.webp',
        desc: {
          en: 'the public room with the peers currently connected — discovery takes about half a minute after you open it.',
          de: 'der öffentliche Raum mit den gerade verbundenen Peers — die Discovery braucht nach dem Öffnen etwa eine halbe Minute.'
        }
      },
      {
        url: 'https://connect.nicokrause.com',
        label: 'relay button',
        shot: '/media/uc-chat-relay.webp',
        desc: {
          en: 'the embedded Relay Button: pick a tier and deploy your own relay without leaving the chat.',
          de: 'der eingebettete Relay-Button: Tier wählen und einen eigenen Relay deployen, ohne den Chat zu verlassen.'
        }
      }
    ],
    npm: null,
    screenshot: null,
    video: null,
    tagline: {
      en: 'Our fork of the <a href="https://github.com/libp2p/universal-connectivity" target="_blank" rel="noopener noreferrer">official libp2p project</a> with the Relay Button built in: the cross-language showcase — chat between Go, Rust, TypeScript and Nim peers in the browser — extended so anyone can deploy their own relay on demand.',
      de: 'Unser Fork des <a href="https://github.com/libp2p/universal-connectivity" target="_blank" rel="noopener noreferrer">offiziellen libp2p-Projekts</a> mit eingebautem Relay-Button: der Cross-Language-Showcase — Chat zwischen Go-, Rust-, TypeScript- und Nim-Peers im Browser — erweitert, sodass jeder auf Knopfdruck einen eigenen Relay deployen kann.'
    }
  },
  {
    id: 'orbitdb-relay',
    name: 'OrbitDB Relay',
    layers: ['infra', 'data'],
    status: 'beta',
    featured: true,
    github: 'https://github.com/NiKrause/orbitdb-relay',
    demo: null,
    docs: 'https://nikrause.github.io/orbitdb-relay/',
    npm: 'orbitdb-relay',
    screenshot: '/media/orbitdb-relay.webp',
    video: null,
    tagline: {
      en: 'Relay and pinning service keeping OrbitDB databases available while peers are offline.',
      de: 'Relay- und Pinning-Service, der OrbitDB-Datenbanken verfügbar hält, während Peers offline sind.'
    }
  },
  {
    id: 'ucan-store',
    name: 'UCAN Store',
    layers: ['identity', 'archive'],
    status: 'in-development',
    featured: false,
    github: 'https://github.com/NomadKids/ucan-store',
    demo: 'https://ucan.nicokrause.com',
    npm: null,
    screenshot: '/media/ucan-store.png',
    video: null,
    note: { en: 'Storacha upload-service fork — UCAN 1.0 upgrade planned', de: 'Storacha-Upload-Service-Fork — Upgrade auf UCAN 1.0 geplant' },
    tagline: {
      en: 'Browser-based storage with WebAuthn/Passkey DIDs and UCAN delegations — upload to Filecoin (planned) without accounts or passwords.',
      de: 'Browser basierter Storage mit WebAuthn/Passkey-DIDs und UCAN-Delegationen — Upload nach Filecoin (geplant) ohne Accounts oder Passwörter.'
    }
  },
  {
    id: 'webauthn-did',
    name: 'OrbitDB WebAuthn DID',
    layers: ['identity'],
    status: 'beta',
    featured: true,
    github: 'https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did',
    demos: [
      {
        url: 'https://le-space.github.io/orbitdb-identity-provider-webauthn-did/webauthn-todo-demo/',
        label: 'webauthn-did',
        shot: '/media/webauthn-did-identity.webp',
        desc: {
          en: 'a passkey becomes your OrbitDB identity — the DID is derived from the credential, no keystore involved.',
          de: 'ein Passkey wird zur OrbitDB-Identität — die DID leitet sich aus dem Credential ab, ganz ohne Keystore.'
        }
      },
      {
        url: 'https://le-space.github.io/orbitdb-identity-provider-webauthn-did/ed25519-encrypted-keystore-demo/',
        label: 'encrypted-keystore',
        shot: '/media/webauthn-did-keystore.webp',
        desc: {
          en: 'an Ed25519 keystore encrypted at rest, unlocked once per session by WebAuthn — the pragmatic default.',
          de: 'ein Ed25519-Keystore, at rest verschlüsselt und einmal pro Session per WebAuthn entsperrt — der pragmatische Default.'
        }
      },
      {
        url: 'https://le-space.github.io/orbitdb-identity-provider-webauthn-did/webauthn-varsig-demo/',
        label: 'varsig',
        shot: '/media/webauthn-did-varsig.webp',
        desc: {
          en: 'no keystore at all — the authenticator signs every entry itself, one passkey prompt per write.',
          de: 'gar kein Keystore — der Authenticator signiert jeden Eintrag selbst, ein Passkey-Prompt pro Schreibvorgang.'
        }
      }
    ],
    npm: '@le-space/orbitdb-identity-provider-webauthn-did',
    screenshot: null,
    video: null,
    tagline: {
      en: `Passkey-based identity for OrbitDB — no extensions, just your browser and a biometric sensor. Every oplog entry has to be signed, so the real question is <strong>where the signing key lives</strong>:
<ul>
<li><strong>Plain keystore (OrbitDB default):</strong> the Ed25519 key sits unencrypted in the browser's IndexedDB. Anything that runs script on your origin can copy your identity and write as you — permanently.</li>
<li><strong>WebAuthn-encrypted keystore:</strong> same key, AES-GCM-encrypted at rest, rehydrated into memory only after a WebAuthn unlock (PRF, largeBlob or hmac-secret). One prompt per session, writes stay fast; safe at rest, in memory while the tab is open. The pragmatic default — <a href="https://le-space.github.io/orbitdb-identity-provider-webauthn-did/ed25519-encrypted-keystore-demo/" target="_blank" rel="noopener noreferrer">demo</a>.</li>
<li><strong>Hardware-backed keys (varsig):</strong> no OrbitDB keystore at all. The key is generated inside the authenticator — Secure Enclave, TPM, security key — and never leaves it. One passkey prompt per write, and nothing in the browser left to steal — <a href="https://le-space.github.io/orbitdb-identity-provider-webauthn-did/webauthn-varsig-demo/" target="_blank" rel="noopener noreferrer">demo</a>.</li>
<li><strong>Why varsig:</strong> an authenticator never hands you a plain signature over your payload — it signs its own authenticatorData + clientDataJSON-hash structure. The algorithm varies on top of that: Apple, Android and Windows platform authenticators sign with ES256 (P-256), while EdDSA/Ed25519 (COSE <code>-8</code>) is in the spec and works on a handful of security keys — so a passkey DID cannot assume either curve. Varsig is the self-describing envelope carrying structure and algorithm together, so the assertion verifies as an OrbitDB oplog signature and, via <code>toUcantoSigner()</code>, as a UCAN delegation signature. Without it a hardware key cannot be the signer of either, whichever curve it happens to use.</li>
</ul>`,
      de: `Passkey-basierte Identität für OrbitDB — keine Extensions, nur Browser und Biometrie. Jeder Oplog-Eintrag muss signiert werden; die eigentliche Frage ist, <strong>wo der Signaturschlüssel liegt</strong>:
<ul>
<li><strong>Klartext-Keystore (OrbitDB-Default):</strong> der Ed25519-Schlüssel liegt unverschlüsselt in der IndexedDB des Browsers. Alles, was auf deinem Origin Skript ausführt, kann die Identität kopieren und dauerhaft in deinem Namen schreiben.</li>
<li><strong>WebAuthn-verschlüsselter Keystore:</strong> derselbe Schlüssel, per AES-GCM at rest verschlüsselt und erst nach einem WebAuthn-Unlock (PRF, largeBlob oder hmac-secret) in den Speicher geholt. Ein Prompt pro Session, Schreibvorgänge bleiben schnell; sicher at rest, im Speicher solange der Tab offen ist. Der pragmatische Default — <a href="https://le-space.github.io/orbitdb-identity-provider-webauthn-did/ed25519-encrypted-keystore-demo/" target="_blank" rel="noopener noreferrer">Demo</a>.</li>
<li><strong>Hardwaregestützte Schlüssel (Varsig):</strong> gar kein OrbitDB-Keystore. Der Schlüssel entsteht im Authenticator — Secure Enclave, TPM, Security Key — und verlässt ihn nie. Ein Passkey-Prompt pro Schreibvorgang, dafür bleibt im Browser nichts zu stehlen — <a href="https://le-space.github.io/orbitdb-identity-provider-webauthn-did/webauthn-varsig-demo/" target="_blank" rel="noopener noreferrer">Demo</a>.</li>
<li><strong>Wozu Varsig:</strong> ein Authenticator liefert nie eine schlichte Signatur über deine Payload — er signiert seine eigene Struktur aus authenticatorData + clientDataJSON-Hash. Dazu kommt, dass das Verfahren variiert: die Plattform-Authenticator von Apple, Android und Windows signieren mit ES256 (P-256), während EdDSA/Ed25519 (COSE <code>-8</code>) zwar im Standard steht und auf einigen Security Keys funktioniert — eine Passkey-DID kann also weder die eine noch die andere Kurve voraussetzen. Varsig ist der selbstbeschreibende Envelope, der Struktur und Verfahren gemeinsam transportiert, sodass die Assertion als OrbitDB-Oplog-Signatur und über <code>toUcantoSigner()</code> auch als UCAN-Delegation-Signatur verifizierbar ist. Ohne Varsig kann ein Hardware-Schlüssel für beides nicht der Signierer sein — ganz gleich, welche Kurve er verwendet.</li>
</ul>`
    }
  },
  {
    id: 'p2pass',
    name: 'p2pass',
    layers: ['identity', 'sync'],
    status: 'prototype',
    featured: false,
    github: 'https://github.com/Le-Space/p2pass',
    demo: 'https://asabya.github.io/p2pass/',
    docs: 'https://asabya.github.io/p2pass/guide/',
    npm: 'p2pass',
    screenshot: null,
    video: null,
    note: {
      en: 'developed with @asabya — upstream at github.com/asabya/p2pass',
      de: 'entwickelt mit @asabya — Upstream unter github.com/asabya/p2pass'
    },
    tagline: {
      en: `A drop-in component that gives an app a passkey identity across several devices, built on our <a href="https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did" target="_blank" rel="noopener noreferrer">WebAuthn identity provider</a>. Nothing about a credential ever leaves the device it was created on:
<ul>
<li><strong>Every device brings its own passkey</strong> and its own OrbitDB identity. Linking device two means device one granting it write access by name in an <code>OrbitDBAccessController</code> — no wildcards, no shared secret, no credential copied across.</li>
<li><strong>Pairing runs over libp2p</strong>, not over a server: device two dials device one on a dedicated protocol, a human approves the request, and only then does the registry address come back.</li>
<li><strong>Recovery without a second device:</strong> the passkey's PRF output derives an IPNS key that resolves a manifest pointing at the Ed25519 archive — encrypted, on IPFS. Clear your browser storage and the same identity comes back from a public gateway, with nothing to log into.</li>
<li><strong>Where it is not finished is written down:</strong> the pairing request is not yet signed, and the roadmap out of that — along with the move to libp2p 3, Helia 7 and OrbitDB 4 — is <a href="https://github.com/Le-Space/p2pass/issues" target="_blank" rel="noopener noreferrer">tracked in the open</a>.</li>
</ul>`,
      de: `Eine Komponente zum Einsetzen, die einer Anwendung eine Passkey-Identität über mehrere Geräte hinweg gibt — auf Basis unseres <a href="https://github.com/Le-Space/orbitdb-identity-provider-webauthn-did" target="_blank" rel="noopener noreferrer">WebAuthn-Identity-Providers</a>. Kein Credential verlässt je das Gerät, auf dem es entstanden ist:
<ul>
<li><strong>Jedes Gerät bringt seinen eigenen Passkey</strong> und seine eigene OrbitDB-Identität mit. Ein zweites Gerät zu verbinden heißt, dass das erste ihm namentlich Schreibrechte in einem <code>OrbitDBAccessController</code> erteilt — keine Wildcards, kein geteiltes Geheimnis, kein kopiertes Credential.</li>
<li><strong>Das Pairing läuft über libp2p</strong>, nicht über einen Server: Gerät zwei wählt Gerät eins über ein eigenes Protokoll an, ein Mensch bestätigt die Anfrage, und erst danach kommt die Registry-Adresse zurück.</li>
<li><strong>Wiederherstellung ohne zweites Gerät:</strong> Aus dem PRF-Output des Passkeys entsteht ein IPNS-Schlüssel, der ein Manifest auflöst, das auf das Ed25519-Archiv zeigt — verschlüsselt, auf IPFS. Browser-Speicher gelöscht, und dieselbe Identität kommt über ein öffentliches Gateway zurück, ganz ohne Anmeldung.</li>
<li><strong>Wo es noch nicht fertig ist, steht geschrieben:</strong> Die Pairing-Anfrage ist noch nicht signiert, und der Weg dort heraus — zusammen mit dem Umstieg auf libp2p 3, Helia 7 und OrbitDB 4 — wird <a href="https://github.com/Le-Space/p2pass/issues" target="_blank" rel="noopener noreferrer">offen nachgehalten</a>.</li>
</ul>`
    }
  },
  {
    id: 'akash-deploy-pwa',
    name: 'Akash Deploy PWA',
    layers: ['infra'],
    status: 'prototype',
    featured: false,
    github: 'https://github.com/NiKrause/akash-deploy-pwa',
    demo: null,
    npm: null,
    screenshot: null,
    video: null,
    note: { en: 'Consolidation with Relay Button planned', de: 'Konsolidierung mit Relay Button geplant' },
    tagline: {
      en: 'Relay-Button-style deployments on Akash Network — a second decentralized compute target.',
      de: 'Relay-Button-artige Deployments auf dem Akash Network — zweites dezentrales Compute-Target.'
    }
  },
  {
    id: 'orbit-blog',
    name: 'Orbit Blog',
    layers: ['data', 'sync', 'archive'],
    status: 'prototype',
    featured: false,
    github: 'https://github.com/NiKrause/orbit-blog',
    demo: 'https://blog.le-space.de',
    npm: null,
    screenshot: null,
    video: null,
    tagline: {
      en: 'Decentralized blogging that replicates between browsers — publish without a hosting provider.',
      de: 'Dezentrales Bloggen mit Replikation zwischen Browsern — publizieren ohne Hosting-Anbieter.'
    }
  },
  {
    id: 'orbitdb-storacha-bridge',
    name: 'OrbitDB ⇄ Storacha Bridge',
    layers: ['archive'],
    status: 'beta',
    featured: false,
    github: 'https://github.com/NiKrause/orbitdb-storacha-bridge',
    demo: null,
    npm: 'orbitdb-storacha-bridge',
    screenshot: null,
    video: null,
    tagline: {
      en: 'Backup and restore local-first data to Filecoin/Storacha with full hash and identity preservation.',
      de: 'Backup und Restore von Local-First-Daten nach Filecoin/Storacha — mit vollständiger Hash- und Identitätserhaltung.'
    }
  }
];
