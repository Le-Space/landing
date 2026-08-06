/**
 * Spin-off pitch decks — single source of truth.
 *
 * Same idea as projects.js: the data lives here once and is rendered twice —
 * as the "Use-Cases" section on local-first.le-space.de and, via
 * `node tools/build-decks.mjs`, as a standalone HTML deck per spin-off under
 * sites/local-first/public/use-cases/<slug>/. `node tools/render-decks.mjs`
 * turns those into PDFs next to them, so a deck can be sent as a link or as a
 * file without the two ever drifting apart.
 *
 * Every string is { de, en }. Inline HTML is allowed and trusted (this file is
 * hand-written, never user input) — keep it to <strong>, <em>, <code>, <a>.
 *
 * Slide kinds understood by the generator:
 *   title    — cover: name, claim, links
 *   bullets  — heading + lead + bullet list
 *   columns  — heading + lead + 2–3 columns, each with its own list
 *   closing  — call to action: heading, lead, links, contact
 *
 * A bullet may carry a `tag`, rendered as a small badge, so a deck can promise
 * a roadmap without pretending it already shipped:
 *   now     — works today
 *   next    — being built now
 *   planned — on the roadmap, not started
 */

export const DECK_TAGS = {
  now: { de: 'heute', en: 'today' },
  next: { de: 'in Arbeit', en: 'in progress' },
  planned: { de: 'geplant', en: 'planned' }
};

export const DECK_STATUS = {
  beta: { de: 'Beta', en: 'beta' },
  prototype: { de: 'Prototyp', en: 'prototype' },
  concept: { de: 'Konzept', en: 'concept' },
  draft: { de: 'Entwurf', en: 'draft' }
};

export const decks = [
  {
    id: 'orbitdb-relay',
    letter: 'A',
    name: 'OrbitDB Relay',
    status: 'beta',
    draft: false,
    accent: 'var(--ls-accent-2)',
    subtitle: {
      de: 'Backup, Pinning und Wiederherstellung für Local-First-Daten',
      en: 'Backup, pinning and recovery for local-first data'
    },
    claim: {
      de: 'Die Daten gehören dir — wir sorgen dafür, dass sie nicht verschwinden.',
      en: 'The data is yours — we make sure it does not disappear.'
    },
    teaser: {
      de: 'Der Knoten, der OrbitDB-Datenbanken erreichbar hält, sie auf dezentralem Speicher archiviert und eine komplette Kollaborationsumgebung — Daten, Identitäten, Berechtigungen — wiederherstellen kann.',
      en: 'The node that keeps OrbitDB databases reachable, archives them on decentralized storage and can restore an entire collaboration environment — data, identities, permissions.'
    },
    links: {
      github: 'https://github.com/NiKrause/orbitdb-relay',
      docs: 'https://nikrause.github.io/orbitdb-relay/',
      npm: 'https://www.npmjs.com/package/orbitdb-relay'
    },
    slides: [
      {
        kind: 'title',
        title: { de: 'OrbitDB Relay', en: 'OrbitDB Relay' }
      },
      {
        kind: 'bullets',
        title: { de: 'Das Problem', en: 'The problem' },
        lead: {
          de: 'Local-First heißt: die Daten liegen auf dem Gerät. Genau da sind sie auch verloren.',
          en: 'Local-first means the data lives on the device. Which is exactly where it gets lost.'
        },
        bullets: [
          {
            t: { de: 'Kein Server, kein Backup', en: 'No server, no backup' },
            s: {
              de: 'Browser-Storage gelöscht, Handy verloren, Laptop kaputt — und die Datenbank ist weg. Ohne Backend gibt es niemanden, der sie noch hat.',
              en: 'Clear the browser storage, lose the phone, break the laptop — and the database is gone. Without a backend, nobody else is holding a copy.'
            }
          },
          {
            t: { de: 'Alle Peers offline = niemand erreichbar', en: 'All peers offline = nobody reachable' },
            s: {
              de: 'Eine geteilte Liste, ein Projekt, ein Chat: solange kein Peer online ist, ist die Datenbank für neue Teilnehmer schlicht nicht abrufbar.',
              en: 'A shared list, a project, a chat: while no peer is online, the database is simply not retrievable for anyone joining.'
            }
          },
          {
            t: { de: 'Identität ist gerätegebunden', en: 'Identity is bound to the device' },
            s: {
              de: 'Passkeys leben im Secure Element eines Geräts. Ist das Gerät weg, ist die Identität weg — und damit der Schreibzugriff auf die eigenen Daten.',
              en: 'Passkeys live in one device\'s secure element. Lose the device and you lose the identity — and with it write access to your own data.'
            }
          },
          {
            t: { de: 'Berechtigungen verschwinden mit', en: 'Permissions vanish with it' },
            s: {
              de: 'UCAN-Delegationen und Access-Control-Listen sind selbst Daten. Gehen sie verloren, bricht die Zusammenarbeit — auch wenn die Inhalte noch existieren.',
              en: 'UCAN delegations and access-control lists are data themselves. Lose them and collaboration breaks, even if the content still exists.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Die Lösung', en: 'The solution' },
        lead: {
          de: 'Ein Knoten, den man mieten, selbst hosten oder für ein Meeting starten und danach wieder wegwerfen kann. Er ersetzt kein Backend — er hält aus, was Browser nicht können.',
          en: 'One node you can rent, self-host, or spin up for a meeting and throw away afterwards. It does not replace a backend — it endures what browsers cannot.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Verbinden', en: 'Connect' },
            s: {
              de: 'libp2p-Relay mit WebSocket, WebRTC-Direct und QUIC, automatischem TLS und Bootstrap-Discovery — Browser finden sich auch durch NATs hindurch.',
              en: 'libp2p relay with WebSocket, WebRTC-Direct and QUIC, automatic TLS and bootstrap discovery — browsers find each other through NATs.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Verfügbar halten', en: 'Keep available' },
            s: {
              de: 'Repliziert OrbitDB-Oplogs und pinnt die zugehörigen IPFS-Blöcke samt Medien, solange kein Peer online ist.',
              en: 'Replicates OrbitDB oplogs and pins the corresponding IPFS blocks including media while no peer is online.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Archivieren', en: 'Archive' },
            s: {
              de: 'Dehydration: der Datenbestand wandert über die <strong>OrbitDB ⇄ Storacha Bridge</strong> auf Filecoin oder Aleph IPFS — hash- und identitätserhaltend, also verifizierbar derselbe Datenbestand.',
              en: 'Dehydration: the database is pushed to Filecoin or Aleph IPFS through the <strong>OrbitDB ⇄ Storacha Bridge</strong> — hash- and identity-preserving, so it is verifiably the same data.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Wiederherstellen', en: 'Restore' },
            s: {
              de: 'Hydration: ein neues Gerät weist per UCAN-Delegation nach, dass es darf — und bekommt Oplog, Blöcke, Datenbankadressen und Berechtigungen zurück.',
              en: 'Hydration: a new device proves its right via a UCAN delegation — and gets back the oplog, the blocks, the database addresses and the permissions.'
            }
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'Was gesichert wird', en: 'What gets protected' },
        lead: {
          de: 'Nicht nur Dateien. Eine Kollaborationsumgebung besteht aus vier Dingen — fehlt eines, ist die Wiederherstellung wertlos.',
          en: 'Not just files. A collaboration environment is four things — miss one and the restore is worthless.'
        },
        columns: [
          {
            h: { de: 'Daten', en: 'Data' },
            items: [
              { de: 'OrbitDB-Oplog (alle Einträge, signiert)', en: 'OrbitDB oplog (every entry, signed)' },
              { de: 'IPFS-Blöcke und Manifeste', en: 'IPFS blocks and manifests' },
              { de: 'Medien: Bilder, Anhänge', en: 'Media: images, attachments' }
            ]
          },
          {
            h: { de: 'Identität', en: 'Identity' },
            items: [
              { de: 'Passkey-<em>Public-Keys</em> und DID-Dokumente', en: 'Passkey <em>public keys</em> and DID documents' },
              { de: 'Über <strong>p2pass</strong> und <strong>UCAN Store</strong>', en: 'Via <strong>p2pass</strong> and <strong>UCAN Store</strong>' },
              { de: 'Private Schlüssel verlassen den Authenticator nie', en: 'Private keys never leave the authenticator' }
            ]
          },
          {
            h: { de: 'Berechtigungen', en: 'Permissions' },
            items: [
              { de: 'UCAN-Delegationen', en: 'UCAN delegations' },
              { de: 'Access-Controller / ACLs pro DID', en: 'Access controllers / per-DID ACLs' },
              { de: 'Wer darf schreiben, wer nur lesen', en: 'Who may write, who may only read' }
            ]
          },
          {
            h: { de: 'Umgebung', en: 'Environment' },
            items: [
              { de: 'Datenbankadressen der Gruppe', en: 'The group\'s database addresses' },
              { de: 'Peer- und Topic-Hinweise', en: 'Peer and topic hints' },
              { de: 'Bootstrap-Adressen für den Wiedereinstieg', en: 'Bootstrap addresses to rejoin' }
            ]
          }
        ],
        note: {
          de: 'Der Relay sieht öffentliche Schlüssel, nie private. Wiederherstellung heißt nie „jemand anderes kann in deinem Namen schreiben".',
          en: 'The relay sees public keys, never private ones. Recovery never means "somebody else can now write as you".'
        }
      },
      {
        kind: 'columns',
        title: { de: 'Für wen', en: 'Who it is for' },
        lead: {
          de: 'Überall dort, wo Daten wichtig genug sind, um sie nicht bei einem Anbieter zu parken — und wichtig genug, um sie nicht zu verlieren.',
          en: 'Wherever data matters too much to park it at a provider — and too much to lose.'
        },
        columns: [
          {
            h: { de: 'Teams ohne IT', en: 'Teams without IT' },
            items: [
              { de: 'Vereine, Praxen, Kanzleien, kleine Betriebe', en: 'Clubs, practices, law firms, small businesses' },
              { de: 'Wollen kein SaaS-Abo und keinen Server', en: 'Want neither a SaaS subscription nor a server' },
              { de: 'Brauchen trotzdem ein Backup, das jemand verantwortet', en: 'Still need a backup somebody is accountable for' }
            ]
          },
          {
            h: { de: 'NGOs und Redaktionen', en: 'NGOs and newsrooms' },
            items: [
              { de: 'Arbeiten in Umgebungen, in denen Anbieter abschalten', en: 'Work where providers get shut down' },
              { de: 'Archiv auf Filecoin überdauert Geräte und Firmen', en: 'A Filecoin archive outlives devices and companies' },
              { de: 'Zugriff über Delegationen statt Accounts', en: 'Access via delegations instead of accounts' }
            ]
          },
          {
            h: { de: 'App-Hersteller', en: 'App vendors' },
            items: [
              { de: 'Bauen Local-First und stolpern über die Backup-Frage', en: 'Build local-first and trip over the backup question' },
              { de: 'Wollen Pinning und Recovery einkaufen statt bauen', en: 'Want to buy pinning and recovery instead of building it' },
              { de: 'Einbindbar als Dienst oder als Bibliothek', en: 'Embeddable as a service or as a library' }
            ]
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Geschäftsmodell', en: 'Business model' },
        lead: {
          de: 'Der Kern bleibt Open Source. Bezahlt wird für Betrieb, Speicher und Verantwortung — nicht für Zugang zum Code.',
          en: 'The core stays open source. People pay for operation, storage and accountability — not for access to the code.'
        },
        bullets: [
          {
            t: { de: 'Managed Relay', en: 'Managed relay' },
            s: {
              de: 'Ein Klick über den Relay Button, Abrechnung pro Laufzeit — für ein Meeting, ein Projekt oder dauerhaft.',
              en: 'One click through the Relay Button, billed by runtime — for a meeting, a project or permanently.'
            }
          },
          {
            t: { de: 'Archiv-Kontingente', en: 'Archive quotas' },
            s: {
              de: 'Speicherpakete auf Filecoin/Aleph mit garantierter Wiederherstellung; die Storage-Kosten werden durchgereicht, die Marge liegt im Betrieb.',
              en: 'Storage packages on Filecoin/Aleph with guaranteed restore; storage cost is passed through, the margin sits in operations.'
            }
          },
          {
            t: { de: 'Recovery-Service', en: 'Recovery service' },
            s: {
              de: 'Der eigentliche Verkaufsmoment: „Gerät weg, Daten zurück." Als Selbstbedienung kostenlos, als begleiteter Fall bezahlt.',
              en: 'The actual moment of sale: "device gone, data back." Free as self-service, paid when we walk you through it.'
            }
          },
          {
            t: { de: 'White-Label / SLA', en: 'White label / SLA' },
            s: {
              de: 'App-Hersteller und Firmen kaufen Pinning, Aufbewahrungsfristen und Support unter eigenem Namen ein.',
              en: 'App vendors and companies buy pinning, retention windows and support under their own brand.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Stand & nächste Schritte', en: 'Status & next steps' },
        lead: {
          de: 'Der Relay läuft heute unter unseren eigenen Demos. Was fehlt, ist der Weg von „hält verfügbar" zu „stellt wieder her".',
          en: 'The relay runs under our own demos today. What is missing is the path from "keeps it available" to "brings it back".'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Beta auf npm, Doku online', en: 'Beta on npm, docs online' },
            s: {
              de: '<code>npm i -g orbitdb-relay</code> — Replikation, Pinning, HTTP-API, Access-Controller und WebAuthn-Identitäten inklusive.',
              en: '<code>npm i -g orbitdb-relay</code> — replication, pinning, HTTP API, access controllers and WebAuthn identities included.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Archiv-Pipeline', en: 'Archive pipeline' },
            s: {
              de: 'Storacha-Bridge fest verdrahten: geplante Dehydration, Prüfsummen, Wiederherstellungs-Tests in der CI.',
              en: 'Wire in the Storacha bridge: scheduled dehydration, checksums, restore tests in CI.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Hydration mit UCAN', en: 'UCAN-based hydration' },
            s: {
              de: 'Wiederherstellung gegen Delegation statt gegen Account — zusammen mit p2pass und UCAN Store.',
              en: 'Restore against a delegation instead of an account — together with p2pass and UCAN Store.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Verschlüsselte Archive', en: 'Encrypted archives' },
            s: {
              de: 'Payload-Verschlüsselung, damit auch der Betreiber des Relays die Inhalte nicht lesen kann.',
              en: 'Payload encryption, so even the operator of the relay cannot read the content.'
            }
          }
        ]
      },
      {
        kind: 'closing',
        title: { de: 'Gespräch?', en: 'Let\'s talk' },
        lead: {
          de: 'Wir suchen Pilotkunden mit echten Daten und echtem Verlustrisiko — und Partner, die Local-First-Apps bauen und die Backup-Frage lösen müssen.',
          en: 'We are looking for pilot customers with real data and real risk of loss — and partners building local-first apps who need to answer the backup question.'
        }
      }
    ]
  },

  {
    id: 'webrtc-qr-map',
    letter: 'B',
    name: 'WebRTC Public Data Map',
    status: 'concept',
    draft: false,
    accent: 'var(--ls-accent)',
    subtitle: {
      de: 'Die Karte der Netze, die Peer-to-Peer wirklich zulassen',
      en: 'The map of networks that really allow peer-to-peer'
    },
    claim: {
      de: 'Jede Verbindung ist eine Messung. Millionen Messungen sind eine Karte.',
      en: 'Every connection is a measurement. Millions of measurements are a map.'
    },
    teaser: {
      de: 'Nutzer verbinden Geräte per QR-Code direkt miteinander — und erzeugen dabei nebenbei den Datensatz, der zeigt, welches WLAN, welcher Mobilfunkanbieter und welcher Browser Peer-to-Peer erlaubt. Rot, orange, grün, weltweit.',
      en: 'Users connect devices directly via QR code — and in passing produce the dataset showing which Wi-Fi, which carrier and which browser allows peer-to-peer. Red, amber, green, worldwide.'
    },
    links: {
      github: 'https://github.com/NiKrause/libp2p-webrtc-qr',
      demo: 'https://webrtc-qr.le-space.de',
      npm: 'https://www.npmjs.com/package/@le-space/libp2p-webrtc-qr'
    },
    slides: [
      {
        kind: 'title',
        title: { de: 'WebRTC Public Data Map', en: 'WebRTC Public Data Map' }
      },
      {
        kind: 'bullets',
        title: { de: 'Das Problem', en: 'The problem' },
        lead: {
          de: 'Peer-to-Peer im Browser funktioniert — oder eben nicht. Vorher weiß es niemand, hinterher weiß niemand, warum.',
          en: 'Peer-to-peer in the browser works — or it does not. Nobody knows beforehand, and afterwards nobody knows why.'
        },
        bullets: [
          {
            t: { de: 'Netze blockieren unterschiedlich', en: 'Networks block differently' },
            s: {
              de: 'Hotel- und Konferenz-WLANs sperren UDP, Firmen-Firewalls lassen nur 443 durch, Mobilfunk hängt hinter Carrier-Grade-NAT.',
              en: 'Hotel and conference Wi-Fi blocks UDP, corporate firewalls only allow 443, mobile networks sit behind carrier-grade NAT.'
            }
          },
          {
            t: { de: 'Browser sind nicht gleich', en: 'Browsers are not equal' },
            s: {
              de: 'Chromium, Firefox und WebKit unterscheiden sich in WebRTC-Details; auf iOS gilt ohnehin, was Safari erlaubt.',
              en: 'Chromium, Firefox and WebKit differ in WebRTC details; on iOS whatever Safari allows is the whole story.'
            }
          },
          {
            t: { de: 'IPv6 rettet — manchmal', en: 'IPv6 saves the day — sometimes' },
            s: {
              de: 'Ohne TURN-Server scheitern Peers hinter restriktiven NATs auf IPv4, während dieselbe Verbindung über IPv6 zuverlässig steht.',
              en: 'Without a TURN server, peers behind restrictive NATs fail over IPv4, while the same connection over IPv6 is reliable.'
            }
          },
          {
            t: { de: 'Niemand misst das flächendeckend', en: 'Nobody measures this at scale' },
            s: {
              de: 'Es gibt Speedtests für Bandbreite. Es gibt keine Karte für „lässt dieses Netz direkte Verbindungen zu".',
              en: 'There are speed tests for bandwidth. There is no map for "does this network allow direct connections".'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Die Einsicht', en: 'The insight' },
        lead: {
          de: 'Wenn zwei Geräte sich out-of-band per QR-Code verbinden — ohne Relay, ohne Signaling-Server — misst der Verbindungsaufbau exakt die Fähigkeit des Netzes.',
          en: 'When two devices connect out-of-band via QR code — no relay, no signaling server — the connection attempt measures exactly what the network is capable of.'
        },
        bullets: [
          {
            t: { de: 'Das Messgerät ist schon gebaut', en: 'The instrument already exists' },
            s: {
              de: '<strong>libp2p-webrtc-qr</strong> tauscht signierte SDP-Payloads per QR-Code oder Link aus. Die Demo zeigt heute schon an, welche IP-Familien beide Seiten haben.',
              en: '<strong>libp2p-webrtc-qr</strong> exchanges signed SDP payloads via QR code or link. The demo already reports which IP families both sides have.'
            }
          },
          {
            t: { de: 'Ein Versuch, ein Datenpunkt', en: 'One attempt, one data point' },
            s: {
              de: 'Erfolg oder Fehlschlag, Kandidatentypen (host/srflx/relay), IPv4 vs. IPv6, Aufbauzeit, Browser, Netztyp, Provider (ASN), grober Ort.',
              en: 'Success or failure, candidate types (host/srflx/relay), IPv4 vs IPv6, setup time, browser, network type, provider (ASN), coarse location.'
            }
          },
          {
            t: { de: 'Die Messung kostet nichts extra', en: 'The measurement costs nothing extra' },
            s: {
              de: 'Sie fällt bei etwas an, das der Nutzer ohnehin tun will: zwei Geräte verbinden. Kein separater Test, keine eigene App.',
              en: 'It falls out of something the user wants to do anyway: connect two devices. No separate test, no extra app.'
            }
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'So funktioniert es', en: 'How it works' },
        lead: {
          de: 'Vier Schritte, alle auf unserem eigenen Stack — vom Messpunkt im Browser bis zur öffentlichen Karte.',
          en: 'Four steps, all on our own stack — from the measurement in the browser to the public map.'
        },
        columns: [
          {
            h: { de: '1 · Messen', en: '1 · Measure' },
            items: [
              { de: 'Beim QR-Verbindungsaufbau, opt-in', en: 'During the QR handshake, opt-in' },
              { de: 'Lokal signiert mit der WebAuthn-DID des Nutzers', en: 'Signed locally with the user\'s WebAuthn DID' },
              { de: 'Keine SSIDs, keine MAC-Adressen, kein GPS-Punkt', en: 'No SSIDs, no MAC addresses, no GPS point' }
            ]
          },
          {
            h: { de: '2 · Sammeln', en: '2 · Collect' },
            items: [
              { de: 'Messpunkte landen in einer OrbitDB', en: 'Measurements land in an OrbitDB' },
              { de: 'Relay pinnt und archiviert (Spin-Off A)', en: 'The relay pins and archives (spin-off A)' },
              { de: 'Der Nutzer behält eine Kopie seiner Daten', en: 'The user keeps a copy of their own data' }
            ]
          },
          {
            h: { de: '3 · Aggregieren', en: '3 · Aggregate' },
            items: [
              { de: 'Zusammenfassung je Netz, Zelle und Provider', en: 'Summary per network, cell and provider' },
              { de: 'Ampel: grün / orange / rot mit Konfidenz', en: 'Traffic light: green / amber / red with confidence' },
              { de: 'Erst ab genügend unabhängigen Messungen', en: 'Only above enough independent measurements' }
            ]
          },
          {
            h: { de: '4 · Handeln', en: '4 · Trade' },
            items: [
              { de: 'Karte öffentlich und kostenlos', en: 'Map public and free' },
              { de: 'Rohdaten über UCAN-Delegation verkaufbar', en: 'Raw data sellable via UCAN delegation' },
              { de: 'Erlösanteil an die messenden Nutzer', en: 'Revenue share to the users who measured' }
            ]
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'Wer dafür zahlt', en: 'Who pays for it' },
        lead: {
          de: 'Die Karte ist das Schaufenster. Verkauft werden Genauigkeit, Historie und Zuschnitt.',
          en: 'The map is the shop window. What sells is accuracy, history and scope.'
        },
        columns: [
          {
            h: { de: 'Entwickler & Plattformen', en: 'Developers & platforms' },
            items: [
              { de: 'Video-, Gaming- und P2P-Anbieter', en: 'Video, gaming and P2P providers' },
              { de: 'Wollen wissen, wo TURN nötig ist — und wo nicht', en: 'Want to know where TURN is needed — and where not' },
              { de: 'API/SDK-Abo, Abfrage nach Provider und Region', en: 'API/SDK subscription, queried by provider and region' }
            ]
          },
          {
            h: { de: 'Netzbetreiber', en: 'Network operators' },
            items: [
              { de: 'Hotels, Kommunen, Campus, Coworking, ISPs', en: 'Hotels, municipalities, campuses, coworking, ISPs' },
              { de: 'Report über das eigene Netz und die Nachbarschaft', en: 'A report on their own network and the neighbourhood' },
              { de: 'Bezahlte Re-Verifizierung nach dem Fix, mit Siegel „P2P-ready"', en: 'Paid re-verification after the fix, with a "P2P-ready" seal' }
            ]
          },
          {
            h: { de: 'Forschung & Regulierung', en: 'Research & regulation' },
            items: [
              { de: 'Netzneutralität ist ohne Messdaten nicht prüfbar', en: 'Net neutrality is unverifiable without measurements' },
              { de: 'Universitäten, NGOs, Aufsichtsbehörden', en: 'Universities, NGOs, regulators' },
              { de: 'Datensatz-Lizenz, offene Auszüge für die Öffentlichkeit', en: 'Dataset licence, open extracts for the public' }
            ]
          }
        ],
        note: {
          de: 'Der Eintrag in die Karte selbst ist immer kostenlos und wird nie gegen Geld entfernt — bezahlt wird ausschließlich die erneute Messung. Alles andere wäre erpressbar und rechtlich angreifbar.',
          en: 'Being listed on the map is always free and is never removed for money — the only thing paid for is a fresh measurement. Anything else would be extortionate and legally indefensible.'
        }
      },
      {
        kind: 'bullets',
        title: { de: 'Warum wir', en: 'Why us' },
        lead: {
          de: 'Der Datensatz entsteht als Nebenprodukt von Technik, die wir ohnehin bauen und betreiben.',
          en: 'The dataset is a by-product of technology we build and operate anyway.'
        },
        bullets: [
          {
            t: { de: 'Das Messgerät gehört uns', en: 'We own the instrument' },
            s: {
              de: '<code>@le-space/libp2p-webrtc-qr</code> ist veröffentlicht, in Beta und läuft als Demo — inklusive signierter Payloads und Copy/Paste-Fallback.',
              en: '<code>@le-space/libp2p-webrtc-qr</code> is published, in beta and running as a demo — including signed payloads and a copy/paste fallback.'
            }
          },
          {
            t: { de: 'Die Infrastruktur steht', en: 'The infrastructure is in place' },
            s: {
              de: 'Relay, Pinning und Archiv aus Spin-Off A; Identität und Delegationen aus dem bestehenden Passkey/UCAN-Stack.',
              en: 'Relay, pinning and archive from spin-off A; identity and delegations from the existing passkey/UCAN stack.'
            }
          },
          {
            t: { de: 'Glaubwürdigkeit beim Datenschutz', en: 'Credibility on privacy' },
            s: {
              de: 'Ein Datenmarkt funktioniert nur, wenn die Nutzer der Sammelstelle trauen. Wir bauen seit Jahren Systeme, die absichtlich wenig wissen.',
              en: 'A data market only works if users trust the collector. We have spent years building systems that deliberately know little.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Stand & nächste Schritte', en: 'Status & next steps' },
        lead: {
          de: 'Der Client existiert, die Karte noch nicht. Die nächsten Schritte sind klein und einzeln überprüfbar.',
          en: 'The client exists, the map does not. The next steps are small and individually verifiable.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Client in Beta', en: 'Client in beta' },
            s: {
              de: 'QR- und Link-Verbindung zwischen Browsern, signierte SDPs, Dateiübertragung via Helia, Live-Demo online.',
              en: 'QR and link connections between browsers, signed SDPs, file transfer via Helia, live demo online.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Messschema & Opt-in', en: 'Measurement schema & opt-in' },
            s: {
              de: 'Festlegen, welche Felder erhoben werden, und eine Zustimmung, die man in einem Satz versteht.',
              en: 'Define which fields are collected, and a consent dialog you can understand in one sentence.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Erste Karte', en: 'First map' },
            s: {
              de: 'Aggregation und eine öffentliche Karte mit den Messungen aus unseren eigenen Tests und Konferenzen.',
              en: 'Aggregation and a public map from the measurements of our own tests and conferences.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Marktplatz-Pilot', en: 'Marketplace pilot' },
            s: {
              de: 'Ein zahlender Erstkunde, Erlösbeteiligung der Nutzer, Anti-Manipulation gegen gefälschte Messungen.',
              en: 'One paying first customer, revenue share for users, anti-manipulation against forged measurements.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Offene Fragen', en: 'Open questions' },
        lead: {
          de: 'Bewusst auf einer eigenen Folie: an diesen vier Punkten entscheidet sich, ob das Modell trägt.',
          en: 'Deliberately on their own slide: these four points decide whether the model holds.'
        },
        bullets: [
          {
            t: { de: 'Datenschutz', en: 'Privacy' },
            s: {
              de: 'Wie grob muss der Ort sein, damit aus „dieses Netz" nicht „diese Wohnung" wird? DSGVO-Bewertung vor der ersten Messung.',
              en: 'How coarse must the location be so "this network" never becomes "this flat"? GDPR assessment before the first measurement.'
            }
          },
          {
            t: { de: 'Rechtliches zur Bewertung', en: 'Legal side of rating' },
            s: {
              de: 'Öffentliche Netzbewertungen sind zulässig, wenn sie belegbar sind. Die Gebühr darf nie für das Entfernen eines Eintrags erhoben werden, nur für die neue Messung.',
              en: 'Public network ratings are lawful when they are evidenced. The fee must never buy removal of an entry, only a fresh measurement.'
            }
          },
          {
            t: { de: 'Manipulation', en: 'Manipulation' },
            s: {
              de: 'Was hindert einen Anbieter daran, sich grün zu messen? Signierte Messungen, Reputation, Ausreißererkennung.',
              en: 'What stops a provider from measuring itself green? Signed measurements, reputation, outlier detection.'
            }
          },
          {
            t: { de: 'Kritische Masse', en: 'Critical mass' },
            s: {
              de: 'Der Datensatz ist erst ab einer gewissen Dichte verkäuflich. Wie kommen die ersten hunderttausend Messungen zustande?',
              en: 'The dataset only sells above a certain density. Where do the first hundred thousand measurements come from?'
            }
          }
        ]
      },
      {
        kind: 'closing',
        title: { de: 'Gespräch?', en: 'Let\'s talk' },
        lead: {
          de: 'Gesucht: Partner mit Netzen zum Messen — Konferenzen, Campus, Kommunen — und Erstkunden, die heute schon raten müssen, ob eine Verbindung zustande kommt.',
          en: 'Wanted: partners with networks to measure — conferences, campuses, municipalities — and first customers who today have to guess whether a connection will succeed.'
        }
      }
    ]
  },

  {
    id: 'yogasuci',
    letter: 'C',
    name: 'Yoga Suci',
    status: 'beta',
    draft: false,
    accent: 'var(--ls-green)',
    subtitle: {
      de: 'Kursverwaltung für Yogastudios — ohne Server, ohne Abo, ohne Konto',
      en: 'Class management for yoga studios — no server, no subscription, no account'
    },
    claim: {
      de: 'Der Schüler trägt die Daten von Standort zu Standort. Wir verdienen an dem, was um die Buchung herum passiert: Zahlung und Archiv.',
      en: 'The student carries the data from location to location. We earn on what happens around the booking: payment and archive.'
    },
    teaser: {
      de: 'Die erste vollständige Anwendung auf dem Local-First-Stack: Programm, Karten, Kasse und Check-in laufen direkt zwischen den Geräten eines Studios. Verkauft wird nicht die App, sondern die Zahlungsanbindung und der Archivspeicher darunter.',
      en: 'The first complete application on the local-first stack: programme, passes, till and check-in run directly between a studio\'s devices. What sells is not the app but the payment integration and the archive storage underneath.'
    },
    links: {
      github: 'https://github.com/Le-Space/yogasuci',
      demo: 'https://yogasuci.le-space.de',
      docs: 'https://le-space.github.io/yogasuci/'
    },
    slides: [
      {
        kind: 'title',
        title: { de: 'Yoga Suci', en: 'Yoga Suci' }
      },
      {
        kind: 'bullets',
        title: { de: 'Das Problem', en: 'The problem' },
        lead: {
          de: 'Ein Studio mit zwei Standorten zahlt heute für Software, die genau das nicht kann, was es braucht.',
          en: 'A studio with two locations pays for software that cannot do the one thing it needs.'
        },
        bullets: [
          {
            t: { de: 'Abo pro Standort, Daten beim Anbieter', en: 'Subscription per location, data at the vendor' },
            s: {
              de: 'Monatliche Gebühren für jeden Standort und jeden Mitarbeiter — und wenn der Anbieter zumacht oder die Preise verdoppelt, sind Kundenkartei und Kartenguthaben in seiner Hand.',
              en: 'Monthly fees per location and per staff member — and when the vendor shuts down or doubles its prices, the customer records and pass balances sit in their hands.'
            }
          },
          {
            t: { de: 'Zehnerkarten enden am Standort', en: 'Passes stop at the location' },
            s: {
              de: 'Eine Karte, die überall gilt, verlangt eine ständige Abstimmung zwischen den Kassen. Genau die fällt aus, sobald das WLAN im Studio hakt.',
              en: 'A pass valid everywhere requires the tills to stay in constant agreement. That is exactly what fails the moment the studio Wi-Fi does.'
            }
          },
          {
            t: { de: 'Der Empfang ist keine IT-Abteilung', en: 'The front desk is not an IT department' },
            s: {
              de: 'Anmeldungen, Passwörter, Rollen, Schulungen: jede Hürde am Tresen kostet den Kurs zwei Minuten und die Aushilfe den Nerv.',
              en: 'Logins, passwords, roles, training: every hurdle at the desk costs the class two minutes and the temp their patience.'
            }
          },
          {
            t: { de: 'Belege müssen Jahre halten', en: 'Records have to last years' },
            s: {
              de: 'Wer wann welches Geld genommen hat, muss auch nach einem Geräte- oder Anbieterwechsel noch prüfbar sein.',
              en: 'Who took which money when has to stay verifiable across a change of device — or of vendor.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Die Anwendung', en: 'The application' },
        lead: {
          de: 'Yoga Suci ist die erste vollständige Anwendung auf unserem Stack — und der Beweis, dass Local-First nicht nur für Demos reicht.',
          en: 'Yoga Suci is the first complete application on our stack — and the proof that local-first is not just demo material.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Der Kartenstand wird gerechnet, nicht gespeichert', en: 'The balance is computed, never stored' },
            s: {
              de: 'Jede Karte ist ein append-only Log aus signierten <code>issue</code>-, <code>redeem</code>- und <code>void</code>-Ereignissen. Zwei Standorte kommen unabhängig zum selben Ergebnis, ohne miteinander zu reden.',
              en: 'Every pass is an append-only log of signed <code>issue</code>, <code>redeem</code> and <code>void</code> events. Two locations arrive at the same answer independently, without talking to each other.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Der Schüler ist der Sync-Kurier', en: 'The student is the sync courier' },
            s: {
              de: 'Sein Telefon trägt den eigenen Ledger von Standort zu Standort. Der Check-in holt vor dem Einlösen die neuesten Stände — Standort B sieht die Einlösung von Standort A, sobald derselbe Mensch auftaucht.',
              en: 'Their phone carries their own ledger between locations. Check-in pulls the latest heads before redeeming — location B sees location A\'s redemption as soon as the same person shows up.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Ein gescannter Code statt eines Servers', en: 'A scanned code instead of a server' },
            s: {
              de: 'Die Geräte verbinden sich per QR-Code direkt über WebRTC — dieselbe Technik wie in Spin-Off B. Kein Relay, kein Signaling-Dienst, kein Konto.',
              en: 'Devices connect directly over WebRTC via QR code — the same technique as spin-off B. No relay, no signaling service, no account.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Manipulation wird sichtbar, nicht verhindert', en: 'Tampering is made evident, not prevented' },
            s: {
              de: 'Laufende Nummer, Vorgänger-Hash und Gerätesignatur machen jeden zurückgesetzten Ledger beim nächsten Sync zum sichtbaren Fork — mit beiden signierten Ereignissen als Beweis.',
              en: 'A monotonic sequence, the previous hash and a device signature turn any rolled-back ledger into a visible fork at the next sync — with both signed events as evidence.'
            }
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'Womit wir Geld verdienen', en: 'How we make money' },
        lead: {
          de: 'Nicht mit der Software. Die Anwendung ist Open Source und kostenlos — sie bringt die Kunden, an denen drei Erlösströme hängen.',
          en: 'Not with the software. The application is open source and free — it brings the customers the three revenue streams hang on.'
        },
        columns: [
          {
            h: { de: 'A · Fiat-Terminal + Beratung', en: 'A · Fiat terminal + consulting' },
            items: [
              { de: 'Anbindung des Kartenterminals an die Kasse', en: 'Wiring the card terminal into the till' },
              { de: 'Einrichtung und Schulung per Fernwartung', en: 'Setup and training done remotely' },
              { de: 'Einmalpreis pro Standort, danach Wartung', en: 'One-off per location, maintenance after' },
              { de: 'Skaliert ohne Anreise — das Studio bleibt allein handlungsfähig', en: 'Scales without travel — the studio stays self-sufficient' }
            ]
          },
          {
            h: { de: 'B · Kryptozahlung pro Transaktion', en: 'B · Crypto payment per transaction' },
            items: [
              { de: 'Bitcoin, Ethereum und weitere direkt an der Kasse', en: 'Bitcoin, Ethereum and more, right at the till' },
              { de: 'Abrechnung als Anteil je Transaktion', en: 'Billed as a share per transaction' },
              { de: 'Nicht-verwahrend: das Geld fließt an das Studio, nie über uns', en: 'Non-custodial: the money goes to the studio, never through us' },
              { de: 'Für Retreats und internationale Gäste der einfachere Weg', en: 'The easier route for retreats and international guests' }
            ]
          },
          {
            h: { de: 'C · Speicher-Provision', en: 'C · Storage commission' },
            items: [
              { de: 'Archiv und Backup über Spin-Off A (OrbitDB Relay)', en: 'Archive and backup via spin-off A (OrbitDB Relay)' },
              { de: 'Aufschlag auf das Speicherkontingent', en: 'Markup on the storage quota' },
              { de: 'Alternativ Vertreterprovision statt Eigenverkauf', en: 'Or an agent commission instead of reselling' },
              { de: 'Wiederkehrend, solange die Belege aufbewahrt werden', en: 'Recurring for as long as the records are kept' }
            ]
          }
        ],
        note: {
          de: 'Die drei Ströme greifen ineinander: die kostenlose App bringt den Standort, das Terminal bringt den ersten Umsatz, das Archiv den wiederkehrenden.',
          en: 'The three streams interlock: the free app brings the location, the terminal brings the first revenue, the archive the recurring one.'
        }
      },
      {
        kind: 'bullets',
        title: { de: 'Wie die Zahlung andockt', en: 'How payment plugs in' },
        lead: {
          de: 'Der Platz dafür ist im Datenmodell schon vorgesehen — das ist kein Umbau, sondern ein weiterer Wert im Feld <code>payment.method</code>.',
          en: 'The data model already reserves the space — this is not a rebuild, just another value in the <code>payment.method</code> field.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Heute: bar, und ehrlich so benannt', en: 'Today: cash, and honestly labelled' },
            s: {
              de: '„Bar erhalten" schreibt ein signiertes <code>issue</code>-Ereignis. Die Rechtstexte der App sagen ausdrücklich, dass keine Zahlung über die Software läuft — das bleibt wahr, bis es das nicht mehr ist.',
              en: '"Cash received" writes a signed <code>issue</code> event. The app\'s legal texts state plainly that no payment runs through the software — that stays true until it no longer is.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Terminal: derselbe Beleg, andere Quelle', en: 'Terminal: same record, different source' },
            s: {
              de: 'Die Terminal-Quittung wird zur Referenz im selben signierten Ereignis. Kassenbericht und Abgleich pro Standort und Gerät funktionieren unverändert weiter.',
              en: 'The terminal receipt becomes the reference inside the same signed event. The cash report and per-location reconciliation keep working unchanged.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Krypto: die Kette ist der Beleg', en: 'Crypto: the chain is the receipt' },
            s: {
              de: 'Die bestätigte Transaktion wird als Referenz eingetragen. Wir verwahren keine Schlüssel und halten keine Kundengelder — das hält uns aus der Erlaubnispflicht heraus.',
              en: 'The confirmed transaction is recorded as the reference. We hold no keys and no customer funds — which keeps us out of licensing territory.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Archiv: ein Knopf, kein Projekt', en: 'Archive: a button, not a project' },
            s: {
              de: 'Export und Wiederherstellung gibt es bereits lokal. Der Relay aus Spin-Off A macht daraus ein laufendes Backup auf dezentralem Speicher.',
              en: 'Export and restore already exist locally. The relay from spin-off A turns that into a running backup on decentralized storage.'
            }
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'Der Markt', en: 'The market' },
        lead: {
          de: 'Yogastudios sind der Anfang, nicht die Grenze. Dasselbe Muster — Karten, Termine, Kasse, mehrere Standorte — trägt weiter.',
          en: 'Yoga studios are the start, not the boundary. The same pattern — passes, appointments, till, several locations — carries further.'
        },
        columns: [
          {
            h: { de: 'Zuerst', en: 'First' },
            items: [
              { de: 'Yoga- und Pilatesstudios mit zwei bis fünf Standorten', en: 'Yoga and pilates studios with two to five locations' },
              { de: 'Retreats und Workshop-Reihen', en: 'Retreats and workshop series' },
              { de: 'Präventionskurse mit Kassenabrechnung', en: 'Prevention courses billed to health insurers' }
            ]
          },
          {
            h: { de: 'Danach', en: 'Next' },
            items: [
              { de: 'Kampfsport, Kletterhallen, Tanzschulen', en: 'Martial arts, climbing gyms, dance schools' },
              { de: 'Musik- und Nachhilfeunterricht', en: 'Music and tutoring lessons' },
              { de: 'Alles mit Zehnerkarte und Anwesenheit', en: 'Anything with a punch card and attendance' }
            ]
          },
          {
            h: { de: 'Warum sie wechseln', en: 'Why they switch' },
            items: [
              { de: 'Kein Abo pro Standort und pro Mitarbeiter', en: 'No subscription per location and per employee' },
              { de: 'Funktioniert, wenn das WLAN nicht funktioniert', en: 'Works when the Wi-Fi does not' },
              { de: 'Die Kundenkartei bleibt im Haus', en: 'The customer records stay in the house' }
            ]
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Stand & nächste Schritte', en: 'Status & next steps' },
        lead: {
          de: 'Die Anwendung ist gebaut und getestet. Was fehlt, ist genau das, womit sie Geld verdient.',
          en: 'The application is built and tested. What is missing is precisely the part that earns.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'M1–M5 umgesetzt', en: 'M1–M5 implemented' },
            s: {
              de: 'Registry, Programm-Editor, Buchungen, Barverkauf, Check-in mit Kurier-Umlauf, Fork-Alarm, Export und Wiederherstellung, Abgleich und Kassenbericht — mit End-to-End-Tests über drei echte Geräte-Kontexte.',
              en: 'Registry, programme editor, bookings, cash sales, check-in with the courier roundtrip, fork alarm, export and recovery, reconciliation and cash report — with end-to-end tests across three real device contexts.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Handbuch und Demo öffentlich', en: 'Handbook and demo public' },
            s: {
              de: 'Anleitungen für Inhaberinnen, Empfang und Schüler auf Deutsch und Englisch, dazu die laufende App unter yogasuci.le-space.de.',
              en: 'Guides for owners, front desk and students in German and English, plus the running app at yogasuci.le-space.de.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Erstes Studio als Pilot', en: 'First studio as a pilot' },
            s: {
              de: 'Ein echtes Studio mit zwei Standorten, echtem Geld und echten Aushilfen am Tresen — vor jeder weiteren Funktion.',
              en: 'A real studio with two locations, real money and real temps at the desk — before any further feature.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Terminal-Anbindung', en: 'Terminal integration' },
            s: {
              de: 'Ein Anbieter, ein Standort, ein Beleg, der durch den Kassenabgleich läuft. Danach der zweite Anbieter.',
              en: 'One provider, one location, one receipt that survives reconciliation. The second provider after that.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Offene Fragen', en: 'Open questions' },
        lead: {
          de: 'Vier Punkte, die vor dem ersten zahlenden Studio geklärt sein müssen — keiner davon ist ein Software-Problem.',
          en: 'Four points to settle before the first paying studio — none of them a software problem.'
        },
        bullets: [
          {
            t: { de: 'Kassenrecht', en: 'Till regulation' },
            s: {
              de: 'Sobald Bargeld elektronisch aufgezeichnet wird, stellt sich in Deutschland die Frage nach Kassensicherungsverordnung, TSE und Belegausgabepflicht. Das gehört geprüft, bevor ein Studio damit abrechnet.',
              en: 'The moment cash is recorded electronically, German till-security rules, the certified security module and receipt obligations come into play. That needs a legal check before a studio bills with it.'
            }
          },
          {
            t: { de: 'Zahlungsdienste-Aufsicht', en: 'Payment-services supervision' },
            s: {
              de: 'Nicht-verwahrend zu bleiben ist die Voraussetzung dafür, keine Erlaubnis nach ZAG zu brauchen. Beim Krypto-Weg muss das im Entwurf verankert sein, nicht in den AGB.',
              en: 'Staying non-custodial is what keeps a payment-services licence unnecessary. On the crypto path that has to sit in the design, not in the terms of service.'
            }
          },
          {
            t: { de: 'Datenschutz durch Voll-Replikation', en: 'Privacy through full replication' },
            s: {
              de: 'OrbitDB repliziert ganze Datenbanken und kennt keine Leserechte. Der Zuschnitt der Buchungs-Datenbanken — pro Standort oder pro Schüler — ist eine offene DSGVO-Entscheidung.',
              en: 'OrbitDB replicates whole databases and has no read permissions. How the booking databases are cut — per location or per student — is an open GDPR decision.'
            }
          },
          {
            t: { de: 'Preis pro Standort', en: 'Price per location' },
            s: {
              de: 'Was ist die Terminal-Einrichtung wert, wenn die Software nichts kostet? Der Pilot muss diese Zahl liefern, nicht die Tabelle.',
              en: 'What is the terminal setup worth when the software is free? The pilot has to produce that number, not the spreadsheet.'
            }
          }
        ]
      },
      {
        kind: 'closing',
        title: { de: 'Gespräch?', en: 'Let\'s talk' },
        lead: {
          de: 'Gesucht: ein Pilotstudio mit mehreren Standorten, ein Terminal-Anbieter mit offener Schnittstelle — und Partner, die Studios beraten und die Anbindung mitverkaufen wollen.',
          en: 'Wanted: a pilot studio with several locations, a terminal provider with an open interface — and partners who advise studios and want to sell the integration alongside.'
        }
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // D–F: reserved slots. They render as decks so the folder, the URL and the PDF
  // already exist, but `draft: true` keeps them off the public landing page and
  // out of the sitemap until the content is written.
  // ---------------------------------------------------------------------------
  ...['D', 'E', 'F'].map((letter) => ({
    id: `spin-off-${letter.toLowerCase()}`,
    letter,
    name: `Spin-Off ${letter}`,
    status: 'draft',
    draft: true,
    accent: 'var(--ls-text-faint)',
    subtitle: { de: 'Arbeitstitel — Inhalte folgen', en: 'Working title — content to come' },
    claim: {
      de: 'Platzhalter. Sobald das Projekt benannt ist, wird dieser Eintrag in use-cases.js gefüllt.',
      en: 'Placeholder. As soon as the project is named, this entry in use-cases.js gets filled in.'
    },
    teaser: {
      de: 'Reservierter Platz für eines der sechs identifizierten Spin-Off-Projekte.',
      en: 'Reserved slot for one of the six identified spin-off projects.'
    },
    links: {},
    slides: [
      { kind: 'title', title: { de: `Spin-Off ${letter}`, en: `Spin-off ${letter}` } },
      {
        kind: 'bullets',
        title: { de: 'Noch nichts zu sehen', en: 'Nothing here yet' },
        lead: {
          de: 'Dieses Deck ist ein Gerüst. Es bekommt dieselben Folien wie A und B, sobald das Projekt beschrieben ist.',
          en: 'This deck is a scaffold. It gets the same slides as A and B as soon as the project is described.'
        },
        bullets: [
          { t: { de: 'Problem', en: 'Problem' }, s: { de: 'Was geht heute schief?', en: 'What goes wrong today?' } },
          { t: { de: 'Lösung', en: 'Solution' }, s: { de: 'Was bauen wir dagegen?', en: 'What do we build against it?' } },
          { t: { de: 'Für wen', en: 'Who for' }, s: { de: 'Wer hat das Problem und zahlt dafür?', en: 'Who has the problem and pays for it?' } },
          { t: { de: 'Geschäftsmodell', en: 'Business model' }, s: { de: 'Womit verdient das Projekt Geld?', en: 'How does the project make money?' } },
          { t: { de: 'Stand', en: 'Status' }, s: { de: 'Was läuft, was fehlt?', en: 'What runs, what is missing?' } }
        ]
      },
      {
        kind: 'closing',
        title: { de: 'Gespräch?', en: 'Let\'s talk' },
        lead: {
          de: 'Bis das Deck steht: Kontakt über die üblichen Kanäle.',
          en: 'Until this deck exists: reach us through the usual channels.'
        }
      }
    ]
  }))
];

/** Decks that may be shown publicly (landing page, sitemap). */
export const publicDecks = decks.filter((d) => !d.draft);
