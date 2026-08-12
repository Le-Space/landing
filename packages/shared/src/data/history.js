/**
 * Sixteen years of Le Space, as stations on a timeline.
 *
 * Written in the third person throughout: the work belongs to the company, not
 * to one person, and an About page that says "I" reads smaller than it is.
 *
 * Each station carries a line of contemporary context (`era`) next to what Le
 * Space did that year. Without it a company timeline reads as self-absorbed;
 * with it the decisions look like responses to something, which they were.
 *
 * `image` is null until the photographs arrive. The layout reserves the space,
 * so filling them in later changes nothing structurally — see History.svelte.
 */
export const history = [
  {
    year: '2010',
    image: null,
    era: {
      en: 'Coworking had barely arrived in Germany — a handful of spaces in the whole country.',
      de: 'Coworking war in Deutschland gerade angekommen — eine Handvoll Spaces im ganzen Land.'
    },
    title: { en: 'A room in Leipzig', de: 'Ein Raum in Leipzig' },
    body: {
      en: `<p>Le Space opened <strong>Leipzig’s first coworking space</strong>: 112 square metres in the Tapetenwerk, room for ten to fifteen people, a shared breakfast on Friday mornings before work started.</p>
<p>The space lasted a year, until May 2011. The community that formed there still exists.</p>
<p>Software followed almost immediately — an application to run the space, written the same year.</p>`,
      de: `<p>Le Space eröffnete den <strong>ersten Coworking Space Leipzigs</strong>: 112 Quadratmeter im Tapetenwerk, Platz für zehn bis fünfzehn Menschen, freitags gemeinsames Frühstück vor der Arbeit.</p>
<p>Der Raum bestand ein Jahr, bis Mai 2011. Die Community, die sich dort bildete, gibt es bis heute.</p>
<p>Software folgte fast sofort — eine eigene Anwendung zur Verwaltung des Space, im selben Jahr geschrieben.</p>`
    }
  },
  {
    year: '2016',
    image: null,
    era: {
      en: 'WebRTC had reached the major browsers, but was years away from being a standard.',
      de: 'WebRTC war in den großen Browsern angekommen, von einem Standard aber noch Jahre entfernt.'
    },
    title: { en: 'Working together without a room', de: 'Zusammenarbeit ohne Raum' },
    body: {
      en: `<p>If a coworking space is about people working alongside each other, does it need the room? Le Space built <strong>virtual coworking over WebRTC</strong>, video calling as native apps for iOS and Android, and a first attempt at teaching yoga across a distance.</p>
<p>The technology was already peer-to-peer. But it needed signalling and media servers to get two browsers connected at all. The dependency stayed.</p>`,
      de: `<p>Wenn es beim Coworking darum geht, dass Menschen nebeneinander arbeiten — braucht es dann den Raum? Le Space baute <strong>virtuelles Coworking über WebRTC</strong>, Videotelefonie als native Apps für iOS und Android, und einen ersten Anlauf für Yogaunterricht über Distanz.</p>
<p>Die Technik war schon damals Peer-to-Peer. Aber sie brauchte Signalisierungs- und Medienserver, um zwei Browser überhaupt zu verbinden. Die Abhängigkeit blieb.</p>`
    }
  },
  {
    year: '2017',
    image: null,
    era: {
      en: 'The ICO boom: nearly every project financed itself by selling tokens.',
      de: 'Der ICO-Boom: Praktisch jedes Projekt finanzierte sich über den Verkauf von Token.'
    },
    title: { en: 'Proof without a middleman', de: 'Nachweis ohne Mittelsmann' },
    body: {
      en: `<p><strong>Doichain</strong>, a fork of Namecoin: unforgeable records of email double opt-in, written to a blockchain instead of held by a service provider. Prototype in 2018, a non-profit to carry it, workshops with the eco association.</p>
<p>The project was <strong>deliberately sunset in 2023</strong>.</p>`,
      de: `<p><strong>Doichain</strong>, ein Fork von Namecoin: fälschungssichere Nachweise über das Double-Opt-In im E-Mail-Marketing, dokumentiert in einer Blockchain statt bei einem Dienstleister. Prototyp 2018, ein Non-Profit als Träger, Workshops mit dem eco-Verband.</p>
<p>Das Projekt wurde <strong>2023 bewusst ausgelaufen</strong>.</p>`
    }
  },
  {
    year: '2022',
    image: null,
    era: {
      en: 'FTX and Terra-Luna collapse. Trust goes with them — among developers, founders and investors alike.',
      de: 'FTX und Terra-Luna brechen zusammen. Das Vertrauen geht mit — bei Entwicklern, Gründern und Investoren gleichermaßen.'
    },
    title: { en: 'The break', de: 'Der Bruch' },
    body: {
      en: `<p>Le Space asked the question again, with two conditions attached: <strong>peer-to-peer without a blockchain, and without selling tokens to pay for it.</strong></p>
<p>The answer turned up the same year — OrbitDB, libp2p and IPFS. Since then there has been a continuous run of local-first peer-to-peer web apps: task lists, a blog, an address book, class booking for yoga studios.</p>`,
      de: `<p>Le Space stellte die Frage neu, mit zwei Bedingungen: <strong>Peer-to-Peer ohne Blockchain, und ohne Tokenverkauf als Geschäftsmodell.</strong></p>
<p>Die Antwort fand sich im selben Jahr — OrbitDB, libp2p und IPFS. Seitdem entsteht laufend Neues: local-first Peer-to-Peer als Web-Apps, von Aufgabenlisten über einen Blog und ein Adressbuch bis zur Kursbuchung für Yogastudios.</p>`
    }
  },
  {
    year: '2025',
    image: null,
    era: {
      en: 'Passkeys begin replacing passwords for everyone, not just early adopters.',
      de: 'Passkeys lösen Passwörter im Massenmarkt ab, nicht mehr nur bei Frühnutzern.'
    },
    title: { en: 'First place, from libp2p itself', de: 'Erster Platz, von libp2p selbst' },
    body: {
      en: `<p>Le Space won the <a href="https://github.com/libp2p/universal-connectivity-workshop/discussions/12" target="_blank" rel="noopener noreferrer">Universal Connectivity Hackathon</a> run by the libp2p project, in December 2025.</p>
<p>The winning entry, the <strong>Universal Connectivity Extension Protocol</strong>, extends libp2p with service discovery between peers: applications find and use each other’s capabilities directly, with no central registry. A specification and several working implementations — among them a peer-to-peer spreadsheet with chat.</p>`,
      de: `<p>Le Space gewann im Dezember 2025 den <a href="https://github.com/libp2p/universal-connectivity-workshop/discussions/12" target="_blank" rel="noopener noreferrer">Universal Connectivity Hackathon</a> des libp2p-Projekts.</p>
<p>Der prämierte Beitrag, das <strong>Universal Connectivity Extension Protocol</strong>, erweitert libp2p um Diensterkennung zwischen Peers: Anwendungen finden und nutzen die Funktionen anderer Anwendungen direkt, ohne zentrale Registrierung. Eine Spezifikation und mehrere lauffähige Umsetzungen — darunter eine Peer-to-Peer-Tabellenkalkulation mit Chat.</p>`
    }
  },
  {
    year: '2026',
    image: null,
    era: {
      en: 'Local-first turns from a niche term into a movement.',
      de: 'Local-first wird vom Nischenbegriff zur Bewegung.'
    },
    title: { en: 'The stack', de: 'Der Stack' },
    body: {
      en: `<p>Identity from passkeys instead of passwords. Relays anyone can start in minutes. Two devices connecting over a QR code with no relay at all. A talk at <a href="https://fosdem.org/2026/schedule/event/8PD9LQ-local-first-peer-to-peer-with-orbit-db/" target="_blank" rel="noopener noreferrer">FOSDEM</a>. And Yogasūcī, in use.</p>
<p>That last piece closes a circle: <strong>the problem the WebRTC work ran into in 2016 — you cannot reach each other without someone else’s servers — is the one that is now solved.</strong> And the yoga of back then runs as an application that replicates between devices, without a server and without an account.</p>
<p>Sixteen years, the same question three times over: <strong>who owns the thing we work with — the room, the record, the data?</strong> Only the answers got better.</p>`,
      de: `<p>Identität über Passkeys statt Passwörter. Relays, die jeder in Minuten selbst startet. Zwei Geräte, die sich über einen QR-Code finden, ganz ohne Relay. Ein Vortrag auf der <a href="https://fosdem.org/2026/schedule/event/8PD9LQ-local-first-peer-to-peer-with-orbit-db/" target="_blank" rel="noopener noreferrer">FOSDEM</a>. Und Yogasūcī, im Einsatz.</p>
<p>Der letzte Punkt schließt einen Kreis: <strong>Das Problem, an dem die WebRTC-Arbeit 2016 hängen blieb — man kommt ohne fremde Server nicht zueinander — ist genau das, was heute gelöst ist.</strong> Und das Yoga von damals läuft inzwischen als Anwendung, die zwischen Geräten repliziert, ohne Server und ohne Konto.</p>
<p>Sechzehn Jahre, dreimal dieselbe Frage: <strong>Wem gehört das, womit wir arbeiten — der Raum, der Nachweis, die Daten?</strong> Nur die Antworten wurden besser.</p>`
    }
  }
];
