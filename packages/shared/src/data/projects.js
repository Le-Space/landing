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
      en: `Deploy libp2p relay infrastructure on demand — the toolchain at the core of the local-first stack.
<ul>
<li><strong>One click, one relay:</strong> deploys a libp2p/OrbitDB relay (signaling, bootstrap, IPFS pinning) — run it for a meeting, a project or years, then stop it.</li>
<li><strong>Full automation:</strong> build qcow2 RootFS images, publish to IPFS, manage VM lifecycle &amp; retention via CLI and GitHub Actions.</li>
<li><strong>Embeddable UI:</strong> React &amp; Svelte components — the actual "Relay Button" — for any app.</li>
<li><strong>Bootstrap discovery:</strong> relays register themselves; apps discover them automatically.</li>
<li><strong>New — remote browser replication:</strong> CI spins up a real browser on a fresh VM in another network and verifies true cross-network P2P replication end-to-end — replacing services like testingbot.com for local-first P2P apps.</li>
<li><strong>Runs on <a href="https://aleph.cloud" target="_blank" rel="noopener noreferrer">Aleph Cloud</a>:</strong> decentralized compute, VMs without a cloud account; further providers — decentralized and centralized — planned.</li>
</ul>`,
      de: `Libp2p-Relay-Infrastruktur auf Knopfdruck — die Toolchain im Zentrum des Local-First-Stacks.
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
    screenshot: '/media/simple-todo.png',
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
    demo: 'https://connect.nicokrause.com',
    npm: null,
    screenshot: '/media/uc-chat.png',
    video: null,
    tagline: {
      en: 'Our fork of the <a href="https://github.com/libp2p/universal-connectivity" target="_blank" rel="noopener noreferrer">official libp2p project</a> with the Relay Button built in: the cross-language showcase — chat between Go, Rust, TypeScript and Nim peers in the browser — extended so anyone can deploy their own relay on demand.',
      de: 'Unser Fork des <a href="https://github.com/libp2p/universal-connectivity" target="_blank" rel="noopener noreferrer">offiziellen libp2p-Projekts</a> mit eingebautem Relay-Button: der Cross-Language-Showcase — Chat zwischen Go-, Rust-, TypeScript- und Nim-Peers im Browser — erweitert, sodass jeder auf Knopfdruck einen eigenen Relay deployen kann.'
    }
  },
  {
    id: 'libp2p-webrtc-qr',
    name: 'libp2p WebRTC over QR',
    layers: ['sync'],
    status: 'beta',
    featured: false,
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
    id: 'ucan-store',
    name: 'UCAN Store',
    layers: ['identity', 'archive'],
    status: 'in-development',
    featured: true,
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
    id: 'orbitdb-relay',
    name: 'OrbitDB Relay',
    layers: ['infra', 'data'],
    status: 'beta',
    featured: false,
    github: 'https://github.com/NiKrause/orbitdb-relay',
    demo: null,
    docs: 'https://nikrause.github.io/orbitdb-relay/',
    npm: 'orbitdb-relay',
    screenshot: null,
    video: null,
    tagline: {
      en: 'Relay and pinning service keeping OrbitDB databases available while peers are offline.',
      de: 'Relay- und Pinning-Service, der OrbitDB-Datenbanken verfügbar hält, während Peers offline sind.'
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
    github: 'https://github.com/asabya/p2pass',
    demo: null,
    npm: 'p2pass',
    screenshot: null,
    video: null,
    tagline: {
      en: 'Peer-to-peer distribution of passkey credentials — recover your identity when a device is lost.',
      de: 'Peer-to-Peer-Verteilung von Passkey-Credentials — Identitäts-Wiederherstellung bei Geräteverlust.'
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
    layers: ['data', 'sync'],
    status: 'beta',
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
