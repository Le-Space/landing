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

export const projects = [
  {
    id: 'relay-button',
    name: 'Relay Button',
    layers: ['infra'],
    status: 'beta',
    featured: true,
    github: 'https://github.com/NiKrause/relay-button',
    demo: 'https://nikrause.github.io/relay-button/',
    npm: '@le-space/core',
    screenshot: '/media/relay-button.png',
    video: null,
    tagline: {
      en: 'Deploy libp2p relay infrastructure on demand — the toolchain at the core of the local-first stack.',
      de: 'Libp2p-Relay-Infrastruktur auf Knopfdruck — die Toolchain im Zentrum des Local-First-Stacks.'
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
      { url: 'https://simple-todo.le-space.de', label: 'simple-todo' },
      { url: 'https://collab01.le-space.de', label: 'collab01' }
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
      en: "libp2p's official cross-language showcase — chat between Go, Rust, TypeScript and Nim peers in the browser.",
      de: 'Offizieller Cross-Language-Showcase von libp2p — Chat zwischen Go-, Rust-, TypeScript- und Nim-Peers im Browser.'
    }
  },
  {
    id: 'ucan-store',
    name: 'UCAN Store',
    layers: ['identity', 'archive'],
    status: 'beta',
    featured: true,
    github: 'https://github.com/NomadKids/ucan-store',
    demo: 'https://ucan.nicokrause.com',
    npm: null,
    screenshot: '/media/ucan-store.png',
    video: null,
    note: { en: 'Storacha upload-service fork — 1.0 upgrade planned', de: 'Storacha-Upload-Service-Fork — Upgrade auf 1.0 geplant' },
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
    demo: 'https://le-space.github.io/orbitdb-identity-provider-webauthn-did/',
    npm: '@le-space/orbitdb-identity-provider-webauthn-did',
    screenshot: '/media/webauthn-did.png',
    video: null,
    tagline: {
      en: 'Passkey-based identity for OrbitDB oplog signing and UCAN signing — hardware-backed keys, no extensions, just your browser and a biometric sensor.',
      de: 'Passkey-basierte Identität für OrbitDB-Oplog-Signierung und UCAN-Signing — hardwaregestützte Schlüssel, keine Extensions, nur Browser und Biometrie.'
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
