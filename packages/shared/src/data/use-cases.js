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
      de: 'Wo direkte Verbindungen tragen — und wo ein Relay einspringen muss',
      en: 'Where direct connections hold — and where a relay has to step in'
    },
    claim: {
      de: 'Jede Verbindung ist eine Messung. Millionen Messungen sagen dir, wo du ein Relay brauchst.',
      en: 'Every connection is a measurement. Millions of measurements tell you where you need a relay.'
    },
    teaser: {
      de: 'Nutzer verbinden Geräte per QR-Code direkt miteinander — und erzeugen dabei nebenbei die Karte, die zeigt, in welchem WLAN und welchem Mobilfunknetz WebRTC trägt und wo es hakt. Genau dort verkauft sich ein Relay.',
      en: 'Users connect devices directly via QR code — and in passing produce the map showing in which Wi-Fi and which mobile network WebRTC holds up and where it struggles. That is exactly where a relay sells itself.'
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
          de: 'Direkte Verbindungen sind schneller, billiger und privater als jeder Umweg — nur weiß vorher niemand, wo sie tragen.',
          en: 'Direct connections are faster, cheaper and more private than any detour — but nobody knows in advance where they hold up.'
        },
        bullets: [
          {
            t: { de: 'Jedes Netz kann etwas anderes', en: 'Every network is capable of something else' },
            s: {
              de: 'Das eine WLAN lässt alles durch, das nächste nur Port 443; im Mobilfunk entscheidet das Carrier-Grade-NAT. Dieselbe App ist an einem Ort direkt verbunden und am anderen auf einen Umweg angewiesen.',
              en: 'One Wi-Fi lets everything through, the next only port 443; on mobile the carrier-grade NAT decides. The same app is directly connected in one place and needs a detour in the next.'
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
              de: 'Es gibt Speedtests für Bandbreite. Es gibt keine Karte für die Frage, die jede P2P-Anwendung stellen muss: reicht hier direkt, oder brauche ich ein Relay?',
              en: 'There are speed tests for bandwidth. There is no map for the question every P2P application has to ask: is direct enough here, or do I need a relay?'
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
              { de: 'Drei Stufen: direkt tragfähig · wechselhaft · Relay nötig', en: 'Three levels: direct works · mixed · relay needed' },
              { de: 'Erst ab genügend unabhängigen Messungen', en: 'Only above enough independent measurements' }
            ]
          },
          {
            h: { de: '4 · Nutzen', en: '4 · Use' },
            items: [
              { de: 'Karte und Rohdaten für alle kostenlos', en: 'Map and raw data free for everyone' },
              { de: 'Konkrete Empfehlung: hier reicht direkt, dort ein Relay', en: 'A concrete recommendation: direct is enough here, a relay there' },
              { de: 'Jeder kann eine Nachmessung beauftragen und mit Budget hinterlegen', en: 'Anyone can commission a re-measurement and fund it with a budget' },
              { de: 'Das Budget geht an die messenden Geräte, ein Anteil an uns', en: 'The budget goes to the devices that measure, a share to us' }
            ]
          }
        ],
        note: {
          de: 'Schritt 1 macht der heutige Client bereits — er zeigt die IP-Familien beider Seiten an. Alles ab Schritt 2 ist Entwurf.',
          en: 'Step one is what today\'s client already does — it reports the IP families of both sides. Everything from step two is design, not code.'
        }
      },
      {
        kind: 'bullets',
        title: { de: 'Was eine Messung wirklich sagt', en: 'What a measurement actually says' },
        lead: {
          de: 'Eine Verbindung liefert vier Befunde. Keiner darf die anderen einfärben.',
          en: 'One connection yields four findings. None may colour the others.'
        },
        bullets: [
          {
            t: { de: 'Vier Achsen statt einer Ampel', en: 'Four axes, not one traffic light' },
            s: {
              de: 'Ort × Browser × IP-Familie × Kandidatentyp. Baut Chrome kein IPv6 auf, ist das ein Minuspunkt für Chrome — nicht für das WLAN, das IPv4 sauber liefert.',
              en: 'Place × browser × IP family × candidate type. If Chrome fails at IPv6, that is a mark against Chrome — not against the Wi-Fi serving IPv4 fine.'
            }
          },
          {
            t: { de: 'Die Ursachen trennen sich von selbst', en: 'The causes separate on their own' },
            s: {
              de: 'Ein Fehler bei einem Browser über viele Orte gehört dem Browser, einer an einem Ort über viele Browser dem Netz. Nur mit Chrome rot heißt: nicht rot.',
              en: 'A fault with one browser across many places belongs to the browser; one in a place across many browsers to the network. A place red only with Chrome is not red.'
            }
          },
          {
            t: { de: 'Das Netz wird beobachtet, nicht behauptet', en: 'The network is observed, not claimed' },
            s: {
              de: 'Die Gegenstelle sieht die öffentliche IP und damit Provider und ASN. Wer ein Hotel-WLAN grün messen will, muss darin sitzen — GPS braucht es nirgends.',
              en: 'The far end sees the public IP, and with it provider and ASN. To measure a hotel Wi-Fi green you have to sit in it — no GPS needed anywhere.'
            }
          },
          {
            t: { de: 'Erfolg braucht einen Zeugen', en: 'Success needs a witness' },
            s: {
              de: 'Die Gegenstelle wird zugewiesen, nicht gewählt, und bestätigt unabhängig. Misserfolg zu behaupten wäre billig — nur redet niemand sein eigenes Netz schlecht.',
              en: 'The far end is assigned, not chosen, and confirms independently. Claiming failure is cheap — but nobody wants to talk their own network down.'
            }
          }
        ],
        note: {
          de: 'Identität nur an der Kasse: Messungen laufen pseudonym, ein Ausweis wie die EUDI-Wallet erst bei Auszahlung und Audit. Wer dort falsch misst, wird nicht gehindert — aber zurechenbar.',
          en: 'Identity only at the till: measurements stay pseudonymous, a credential such as the EUDI wallet appears only at payout and audit. Measuring falsely there is not prevented — but it is attributable.'
        }
      },
      {
        kind: 'columns',
        title: { de: 'Wer die Messungen bezahlt', en: 'Who pays for the measurements' },
        lead: {
          de: 'Die Daten sind für alle kostenlos. Bezahlt wird nicht der Zugriff, sondern der Auftrag: wer eine Antwort für ein bestimmtes Netz braucht, hinterlegt ein Budget.',
          en: 'The data is free for everyone. What is paid for is not access but the commission: whoever needs an answer for a particular network puts up a budget.'
        },
        columns: [
          {
            h: { de: 'Plattformen & Apps', en: 'Platforms & apps' },
            items: [
              { de: 'Spiele, Messenger, Video- und P2P-Anbieter', en: 'Games, messengers, video and P2P providers' },
              { de: '„Warum hängen unsere Nutzer bei Provider X?“ — Kampagne für Netz, Region oder Browser', en: '“Why do our users stall at provider X?” — a campaign per network, region or browser' },
              { de: 'Antwort: wo direkt reicht und wo Relay-Kapazität eingeplant werden muss', en: 'The answer: where direct is enough and where relay capacity must be budgeted' }
            ]
          },
          {
            h: { de: 'Netzbetreiber — vom Mobilfunk bis zum Café', en: 'Operators — from carriers to cafés' },
            items: [
              { de: 'Mobilfunk, ISPs, Hotels, Kommunen, Coworking, Cafés', en: 'Carriers, ISPs, hotels, municipalities, coworking, cafés' },
              { de: 'Wollen wissen, ob das eigene Netz Direktverbindungen trägt', en: 'Want to know whether their own network carries direct connections' },
              { de: 'Nachmessung nach dem Fix, mit Beleg „hier trägt direkt"', en: 'A re-measurement after the fix, evidencing "direct works here"' }
            ]
          },
          {
            h: { de: 'Forschung & Regulierung', en: 'Research & regulation' },
            items: [
              { de: 'Netzneutralität ist ohne Messdaten nicht prüfbar', en: 'Net neutrality is unverifiable without measurements' },
              { de: 'Universitäten, NGOs, Aufsichtsbehörden', en: 'Universities, NGOs, regulators' },
              { de: 'Beauftragen gezielte Kampagnen — die Daten selbst sind ohnehin offen', en: 'Commission targeted campaigns — the data itself is open anyway' }
            ]
          }
        ],
        note: {
          de: 'Der Hebel bleibt derselbe: Wo die Karte „Relay nötig“ sagt, verkauft sich ein Relay aus Spin-Off A. Am Auftrag verdienen wir einmal, am Relay dauerhaft.',
          en: 'The lever is unchanged: where the map says “relay needed”, a relay from spin-off A sells itself. The commission earns once, the relay keeps earning.'
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
            t: { de: 'Die Antwort haben wir auch schon', en: 'We already have the answer too' },
            s: {
              de: 'Wo die Karte „Relay nötig" sagt, steht der Relay aus Spin-Off A auf Knopfdruck bereit. Kein anderer Messdienst kann den Bedarf, den er misst, im selben Atemzug decken.',
              en: 'Where the map says "relay needed", the relay from spin-off A is one click away. No other measurement service can cover the demand it measures in the same breath.'
            }
          },
          {
            t: { de: 'Kein Datenhandel, kein Interessenkonflikt', en: 'No data trade, no conflict of interest' },
            s: {
              de: 'Wir verkaufen die Daten nicht — sie sind offen. Damit gibt es keinen Anreiz, Messungen zu schönen, und keinen Grund, mehr zu sammeln als nötig.',
              en: 'We do not sell the data — it is open. So there is no incentive to flatter a measurement, and no reason to collect more than necessary.'
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
            t: { de: 'Erste Karte mit Empfehlung', en: 'First map with a recommendation' },
            s: {
              de: 'Aggregation, öffentliche Karte und die daraus abgeleitete Aussage pro Ort: reicht direkt, oder Relay einplanen? Beginnend mit unseren eigenen Tests und Konferenzen.',
              en: 'Aggregation, a public map and the conclusion it produces per place: is direct enough, or budget a relay? Starting with our own tests and conferences.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Erster bezahlter Auftrag', en: 'First paid commission' },
            s: {
              de: 'Ein hinterlegtes Budget, eine ausgeführte Kampagne, Auszahlung an die messenden Geräte — der ganze Kreislauf einmal komplett.',
              en: 'One funded budget, one executed campaign, payout to the measuring devices — the whole loop once, end to end.'
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
              de: 'Wie grob muss der Ort sein, damit aus „dieses Netz" nicht „diese Wohnung" wird — und wie bleibt ein Ausweis an der Kasse unverkettbar, damit kein Bewegungsprofil entsteht? DSGVO-Bewertung vor der ersten Messung.',
              en: 'How coarse must the location be so "this network" never becomes "this flat" — and how does a credential at the till stay unlinkable, so no movement profile appears? GDPR assessment before the first measurement.'
            }
          },
          {
            t: { de: 'Rechtliches zur Bewertung', en: 'Legal side of rating' },
            s: {
              de: 'Öffentliche Netzbewertungen sind zulässig, solange sie belegbar sind und als Messung auftreten, nicht als Urteil. Eine Gebühr darf immer nur die neue Messung bezahlen, nie das Verschwinden eines Eintrags.',
              en: 'Public network ratings are lawful as long as they are evidenced and presented as a measurement rather than a verdict. A fee may only ever pay for a fresh measurement, never for an entry to disappear.'
            }
          },
          {
            t: { de: 'Der Startpool', en: 'The starting pool' },
            s: {
              de: 'Der Schutz skaliert mit der Zahl unabhängiger Messpunkte — am Anfang ist sie klein und der Anteil eines Angreifers groß. Ab wie vielen Kreuzungspunkten bewerten wir ein Netz überhaupt?',
              en: 'The protection scales with the number of independent vantage points — early on that number is small and an attacker\'s share is large. Above how many crossing points do we rate a network at all?'
            }
          },
          {
            t: { de: 'Henne und Ei', en: 'Chicken and egg' },
            s: {
              de: 'Aufträge kommen erst, wenn die Karte für den eigenen Fall etwas hergibt — und die Karte wächst erst durch Messungen. Wie kommen die ersten hunderttausend zustande?',
              en: 'Commissions only come once the map says something about your own case — and the map only grows through measurements. Where do the first hundred thousand come from?'
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

  {
    id: 'local-first-consulting',
    letter: 'D',
    name: 'Local-First Consulting',
    status: 'concept',
    draft: false,
    accent: 'var(--ls-amber)',
    subtitle: {
      de: 'Beratung und Umsetzung für Local-First- und Peer-to-Peer-Software',
      en: 'Consulting and delivery for local-first and peer-to-peer software'
    },
    claim: {
      de: 'Wir verkaufen nicht die Idee, dass es geht. Wir zeigen die Systeme, in denen es läuft.',
      en: 'We do not sell the idea that it works. We show the systems where it does.'
    },
    teaser: {
      de: 'Immer mehr Unternehmen wollen weg von der Cloud-Abhängigkeit — und finden niemanden, der Local-First tatsächlich gebaut hat. Wir haben den kompletten Stack gebaut, betreiben ihn und geben ihn als Beratung, Prototyp oder fertiges Produkt weiter.',
      en: 'More and more companies want out of cloud dependency — and find nobody who has actually built local-first. We built the whole stack, we run it, and we pass it on as consulting, a prototype or a finished product.'
    },
    links: {
      github: 'https://github.com/le-space'
    },
    slides: [
      {
        kind: 'title',
        title: { de: 'Local-First Consulting', en: 'Local-First Consulting' }
      },
      {
        kind: 'bullets',
        title: { de: 'Warum jetzt', en: 'Why now' },
        lead: {
          de: 'Die Nachfrage entsteht nicht aus Technikbegeisterung, sondern aus vier sehr konkreten Zwängen.',
          en: 'The demand does not come from enthusiasm for technology but from four very concrete pressures.'
        },
        bullets: [
          {
            t: { de: 'Datenschutz ist keine Meinung mehr', en: 'Privacy is no longer an opinion' },
            s: {
              de: 'Praxen, Kanzleien, Schulen und Behörden müssen begründen, warum personenbezogene Daten bei einem US-Anbieter liegen. „Bleibt auf dem Gerät" ist die kürzeste Begründung, die es gibt.',
              en: 'Practices, law firms, schools and public bodies have to justify why personal data sits with a US provider. "It stays on the device" is the shortest justification there is.'
            }
          },
          {
            t: { de: 'Die Cloud-Rechnung wächst schneller als das Produkt', en: 'The cloud bill grows faster than the product' },
            s: {
              de: 'Jeder Nutzer kostet monatlich, jeder Standort kostet monatlich. Software, die zwischen Geräten läuft, hat diese Kurve nicht.',
              en: 'Every user costs monthly, every location costs monthly. Software that runs between devices does not have that curve.'
            }
          },
          {
            t: { de: 'Offline ist Alltag, nicht Ausnahme', en: 'Offline is normal, not exceptional' },
            s: {
              de: 'Baustelle, Außendienst, Klinikkeller, Landstraße, Schiff, Messehalle. Anwendungen, die dort stehenbleiben, kosten Arbeitszeit — jeden Tag.',
              en: 'Building sites, field service, hospital basements, country roads, ships, trade-fair halls. Applications that stall there cost working time — every day.'
            }
          },
          {
            t: { de: 'Es fehlen die Leute', en: 'The people are missing' },
            s: {
              de: 'CRDTs, libp2p, NAT-Traversal, WebAuthn, IPFS: einzeln bekannt, zusammen selten. Genau diese Kombination ist unser Alltag.',
              en: 'CRDTs, libp2p, NAT traversal, WebAuthn, IPFS: each is known, the combination is rare. That combination is our daily work.'
            }
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'Was wir anbieten', en: 'What we offer' },
        lead: {
          de: 'Drei Stufen, die aufeinander aufbauen. Jede ist einzeln buchbar — niemand muss mit dem großen Projekt anfangen.',
          en: 'Three stages that build on each other. Each can be booked on its own — nobody has to start with the big project.'
        },
        columns: [
          {
            h: { de: '1 · Orientierung', en: '1 · Orientation' },
            items: [
              { de: 'Architektur-Workshop, ein bis zwei Tage', en: 'Architecture workshop, one to two days' },
              { de: 'Machbarkeit: geht Local-First für diesen Fall — und wo nicht?', en: 'Feasibility: does local-first fit this case — and where does it not?' },
              { de: 'Schriftliches Ergebnis mit Grenzen, nicht nur mit Versprechen', en: 'A written result stating the limits, not just the promises' },
              { de: 'Festpreis', en: 'Fixed price' }
            ]
          },
          {
            h: { de: '2 · Umsetzung', en: '2 · Delivery' },
            items: [
              { de: 'Prototyp in Wochen, nicht Quartalen', en: 'A prototype in weeks, not quarters' },
              { de: 'Gebaut aus vorhandenen Bausteinen statt von null', en: 'Built from existing blocks instead of from scratch' },
              { de: 'Anbindung an das, was schon läuft', en: 'Integration with what already runs' },
              { de: 'Projekt oder Tagessatz', en: 'Project or day rate' }
            ]
          },
          {
            h: { de: '3 · Betrieb & Team', en: '3 · Operations & team' },
            items: [
              { de: 'Relays, Pinning und Archiv aus Spin-Off A', en: 'Relays, pinning and archive from spin-off A' },
              { de: 'Schulung, damit das Team ohne uns weiterkommt', en: 'Training so the team can continue without us' },
              { de: 'Code-Reviews und Bereitschaft', en: 'Code reviews and standby' },
              { de: 'Retainer', en: 'Retainer' }
            ]
          }
        ],
        note: {
          de: 'Stufe 1 ist bewusst klein und billig. Wer nach dem Workshop „nein" sagt, hat trotzdem etwas bekommen — und wir haben nichts verkauft, das nicht passt.',
          en: 'Stage one is deliberately small and cheap. Whoever says "no" after the workshop still got something — and we sold nothing that did not fit.'
        }
      },
      {
        kind: 'bullets',
        title: { de: 'Warum wir', en: 'Why us' },
        lead: {
          de: 'Local-First-Beratung gibt es kaum, weil kaum jemand die Systeme dazu gebaut hat. Wir zeigen im Termin, was läuft.',
          en: 'Local-first consulting barely exists because barely anybody has built the systems. In the meeting we show what runs.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Der ganze Stack, offen einsehbar', en: 'The whole stack, open to inspect' },
            s: {
              de: 'Identität, Daten, Sync, Infrastruktur, Archiv — jede Schicht als Open-Source-Baustein, mehrere davon als npm-Paket veröffentlicht.',
              en: 'Identity, data, sync, infrastructure, archive — every layer an open-source block, several of them published as npm packages.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Eine vollständige Anwendung als Beweis', en: 'A complete application as proof' },
            s: {
              de: 'Yoga Suci (Spin-Off C): Kasse, Karten, Check-in über mehrere Standorte, ohne Server — mit End-to-End-Tests über echte Geräte-Kontexte.',
              en: 'Yoga Suci (spin-off C): till, passes, check-in across locations, without a server — with end-to-end tests across real device contexts.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Beiträge dort, wo der Standard entsteht', en: 'Contributions where the standard is made' },
            s: {
              de: 'Unser Fork des offiziellen libp2p-Showcase läuft öffentlich; die WebRTC-über-QR-Transportschicht ist als eigenes Paket veröffentlicht.',
              en: 'Our fork of the official libp2p showcase runs publicly; the WebRTC-over-QR transport is published as its own package.'
            }
          },
          {
            tag: 'now',
            t: { de: 'Wir sagen, was nicht geht', en: 'We say what does not work' },
            s: {
              de: 'Jedes Projekt hat ein dokumentiertes Grenzen-Kapitel. Wer im Erstgespräch hört, wo die Technik aufhört, glaubt auch den Rest.',
              en: 'Every project has a documented limits chapter. Anyone who hears in the first meeting where the technology ends will believe the rest too.'
            }
          }
        ]
      },
      {
        kind: 'columns',
        title: { de: 'Für wen', en: 'Who for' },
        lead: {
          de: 'Nicht für alle. Local-First lohnt dort, wo Datenhoheit, Offline-Betrieb oder laufende Kosten wirklich wehtun.',
          en: 'Not for everyone. Local-first pays off where data sovereignty, offline operation or running costs genuinely hurt.'
        },
        columns: [
          {
            h: { de: 'Mittelstand', en: 'Mid-sized business' },
            items: [
              { de: 'Außendienst, Handwerk, Logistik, Landwirtschaft', en: 'Field service, trades, logistics, agriculture' },
              { de: 'Arbeitet dort, wo das Netz nicht arbeitet', en: 'Works where the network does not' },
              { de: 'Zahlt heute pro Nutzer für Software, die dann steht', en: 'Pays per user today for software that then stalls' }
            ]
          },
          {
            h: { de: 'Regulierte Bereiche', en: 'Regulated fields' },
            items: [
              { de: 'Gesundheit, Recht, Bildung, öffentliche Hand', en: 'Health, law, education, public sector' },
              { de: 'Muss den Verbleib jedes Datensatzes begründen', en: 'Must account for where every record ends up' },
              { de: 'Sucht Alternativen zur US-Cloud, nicht Ausreden', en: 'Wants alternatives to the US cloud, not excuses' }
            ]
          },
          {
            h: { de: 'Produkt-Teams & Agenturen', en: 'Product teams & agencies' },
            items: [
              { de: 'Haben die Idee, nicht die Erfahrung mit P2P', en: 'Have the idea, not the P2P experience' },
              { de: 'Wollen einen Prototyp, bevor sie umbauen', en: 'Want a prototype before they rebuild' },
              { de: 'Buchen uns als Unterauftrag oder White-Label', en: 'Book us as a subcontractor or white label' }
            ]
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Geschäftsmodell', en: 'Business model' },
        lead: {
          de: 'Beratung verdient sofort Geld — und ist gleichzeitig der Vertriebskanal für alles andere, was wir bauen.',
          en: 'Consulting earns money immediately — and is at the same time the sales channel for everything else we build.'
        },
        bullets: [
          {
            t: { de: 'Workshop zum Festpreis', en: 'Fixed-price workshop' },
            s: {
              de: 'Die niedrige Einstiegsschwelle. Kalkulierbar für den Kunden, qualifizierend für uns: nach zwei Tagen wissen beide Seiten, ob es passt.',
              en: 'The low barrier to entry. Predictable for the client, qualifying for us: after two days both sides know whether it fits.'
            }
          },
          {
            t: { de: 'Projekt oder Tagessatz', en: 'Project or day rate' },
            s: {
              de: 'Der Hauptumsatz. Weil wir aus eigenen Bausteinen bauen, ist derselbe Umfang schneller fertig als bei einer Neuentwicklung.',
              en: 'The main revenue. Because we build from our own blocks, the same scope is finished faster than a from-scratch build.'
            }
          },
          {
            t: { de: 'Retainer für Betrieb und Bereitschaft', en: 'Retainer for operations and standby' },
            s: {
              de: 'Wiederkehrend und planbar. Relay- und Archivbetrieb laufen über Spin-Off A und werden mit abgerechnet.',
              en: 'Recurring and predictable. Relay and archive operation run through spin-off A and are billed along with it.'
            }
          },
          {
            t: { de: 'Der eigentliche Hebel: Sog statt Druck', en: 'The real lever: pull, not push' },
            s: {
              de: 'Jedes Beratungsprojekt zieht Infrastruktur, Speicher und Lizenzen nach — und liefert die Referenz, die das nächste Projekt verkauft.',
              en: 'Every consulting project pulls infrastructure, storage and licences behind it — and produces the reference that sells the next one.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Stand & nächste Schritte', en: 'Status & next steps' },
        lead: {
          de: 'Die Substanz ist da, das Angebot noch nicht. Was fehlt, ist Verpackung — nicht Können.',
          en: 'The substance exists, the offer does not. What is missing is packaging, not capability.'
        },
        bullets: [
          {
            tag: 'now',
            t: { de: 'Referenzen laufen öffentlich', en: 'References run in public' },
            s: {
              de: 'Portfolio, Demos, Doku und Quellcode sind erreichbar — jedes Gespräch kann am lebenden System geführt werden statt an Folien.',
              en: 'Portfolio, demos, docs and source are reachable — every conversation can be held on a live system instead of slides.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Angebotsblatt mit Preisen', en: 'An offer sheet with prices' },
            s: {
              de: 'Drei Pakete, drei Zahlen, eine Seite. Ohne genannten Preis wird aus einem Interessenten kein Termin.',
              en: 'Three packages, three numbers, one page. Without a stated price, an interested party never becomes a meeting.'
            }
          },
          {
            tag: 'next',
            t: { de: 'Ein Kunden-Fall zum Vorzeigen', en: 'One customer case to show' },
            s: {
              de: 'Yoga Suci als Fallstudie: Ausgangslage, Entscheidung, Ergebnis, Grenzen. Eine geschriebene Geschichte verkauft besser als zehn Repositories.',
              en: 'Yoga Suci as a case study: situation, decision, outcome, limits. One written story sells better than ten repositories.'
            }
          },
          {
            tag: 'planned',
            t: { de: 'Ein zweiter Kopf', en: 'A second head' },
            s: {
              de: 'Beratung skaliert mit Menschen. Der erste zusätzliche Entwickler entscheidet, ob daraus ein Geschäft oder eine Auslastungsfalle wird.',
              en: 'Consulting scales with people. The first additional developer decides whether this becomes a business or a utilisation trap.'
            }
          }
        ]
      },
      {
        kind: 'bullets',
        title: { de: 'Offene Fragen', en: 'Open questions' },
        lead: {
          de: 'Die Risiken dieses Spin-Offs liegen nicht in der Technik. Sie liegen im Kalender.',
          en: 'The risks of this spin-off are not technical. They are in the calendar.'
        },
        bullets: [
          {
            t: { de: 'Beratung frisst Produktentwicklung', en: 'Consulting eats product development' },
            s: {
              de: 'Jeder verkaufte Tag fehlt bei A, B und C. Es braucht eine feste Regel — etwa eine Obergrenze an Kundentagen pro Monat —, bevor der erste große Auftrag kommt.',
              en: 'Every day sold is a day missing from A, B and C. A firm rule is needed — a cap on client days per month — before the first big contract arrives.'
            }
          },
          {
            t: { de: 'Erklärungsbedürftige Kategorie', en: 'A category that needs explaining' },
            s: {
              de: 'Niemand sucht nach „Local-First-Beratung". Gesucht wird nach „Software, die offline funktioniert" oder „DSGVO-konforme Ablösung von Anbieter X". Danach muss die Ansprache klingen.',
              en: 'Nobody searches for "local-first consulting". They search for "software that works offline" or "GDPR-compliant replacement for vendor X". The pitch has to sound like that.'
            }
          },
          {
            t: { de: 'Abhängigkeit von wenigen Köpfen', en: 'Dependence on very few heads' },
            s: {
              de: 'Das Wissen sitzt heute in ein bis zwei Personen. Ohne Dokumentation und Einarbeitung ist jeder Krankheitsfall ein Projektrisiko.',
              en: 'The knowledge sits in one or two people today. Without documentation and onboarding, any illness is a project risk.'
            }
          },
          {
            t: { de: 'Preis gegen die Gewohnheit', en: 'Price against habit' },
            s: {
              de: 'Ein Projekt kostet einmal viel, ein SaaS-Abo monatlich wenig. Der Vergleich über fünf Jahre muss auf die erste Seite des Angebots.',
              en: 'A project costs a lot once, a SaaS subscription little each month. The five-year comparison belongs on page one of the offer.'
            }
          }
        ]
      },
      {
        kind: 'closing',
        title: { de: 'Gespräch?', en: 'Let\'s talk' },
        lead: {
          de: 'Der erste Schritt ist ein Workshop, kein Vertrag. Bringen Sie einen Anwendungsfall mit — wir sagen Ihnen ehrlich, ob Local-First dafür der richtige Weg ist.',
          en: 'The first step is a workshop, not a contract. Bring a use case — we will tell you honestly whether local-first is the right route for it.'
        }
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // E–F: reserved slots. They render as decks so the folder, the URL and the PDF
  // already exist, but `draft: true` keeps them off the public landing page and
  // out of the sitemap until the content is written.
  // ---------------------------------------------------------------------------
  ...['E', 'F'].map((letter) => ({
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
