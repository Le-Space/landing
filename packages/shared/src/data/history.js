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
 * The images are generated illustrations, not photographs — no usable pictures
 * exist for 2010 to 2014. History.svelte says so once, in the intro. A reader
 * who works that out later rather than being told loses trust in everything
 * else on the page, which is the opposite of what an About page is for.
 * Stations from 2025 on stay empty until real screenshots exist: illustrated
 * past, documented present.
 */
export const history = [
  {
    year: '2009',
    image: {
      src: '/history/2010-coworking-leipzig.webp',
      alt: {
        en: 'Illustration: an open workspace with long shared desks and people working side by side.',
        de: 'Illustration: ein offener Arbeitsraum mit langen gemeinsamen Tischen und Menschen, die nebeneinander arbeiten.'
      }
    },
    era: {
      en: 'Coworking had barely arrived in Germany — a handful of spaces in the whole country.',
      de: 'Coworking war in Deutschland gerade angekommen — eine Handvoll Spaces im ganzen Land.'
    },
    title: { en: 'A room in Leipzig', de: 'Ein Raum in Leipzig' },
    body: {
      en: `<p>Le Space opened <strong>Leipzig’s first coworking space</strong>, in the Tapetenwerk: a shared breakfast on Friday mornings before work started, and room for freelancers, founders, employees and students alike.</p>
<p>The beta project ran from May 2009 to June 2011. <strong>The community and its spirit are still there</strong>, kept alive by people who were part of it from the beginning.</p>
<p>One lesson from those years has outlasted the room: <strong>being able to have lunch together — a canteen, somewhere to sit down — is a foundation a living community is built on</strong>, not a perk.</p>
<p>Software followed almost immediately, an application to run the space.</p>`,
      de: `<p>Le Space eröffnete den <strong>ersten Coworking Space Leipzigs</strong>, im Tapetenwerk: freitags gemeinsames Frühstück vor der Arbeit, und Platz für Freiberufler, Gründerinnen, Angestellte und Studenten gleichermaßen.</p>
<p>Das Beta-Projekt lief von Mai 2009 bis Juni 2011. <strong>Die Community und ihr Geist bestehen bis heute</strong> — getragen von Menschen, die von Anfang an dabei waren.</p>
<p>Eine Erkenntnis aus dieser Zeit hat den Raum überdauert: <strong>Die Möglichkeit, gemeinsam Mittag zu essen — eine Kantine, ein Ort zum Hinsetzen — ist ein Grundbaustein lebendiger Community</strong>, keine Annehmlichkeit nebenbei.</p>
<p>Software folgte fast sofort, eine eigene Anwendung zur Verwaltung des Space.</p>`
    }
  },
  {
    year: '2011',
    images: [
      {
        src: '/history/2011-karakorum.webp',
        alt: {
          en: 'Illustration: working on a laptop in the wide mountain landscape of the Karakoram.',
          de: 'Illustration: Arbeit am Laptop in der weiten Berglandschaft des Karakorum.'
        }
      },
      {
        src: '/history/2012-loft38.webp',
        alt: {
          en: 'Illustration: a desk with two screens at Loft 38 in Portixol, the sea outside the window.',
          de: 'Illustration: ein Schreibtisch mit zwei Bildschirmen im Loft 38 in Portixol, davor das Meer.'
        }
      }
    ],
    era: {
      en: 'Desktop clients were moving into the browser across the enterprise world.',
      de: 'In der Unternehmenswelt wanderten Desktop-Anwendungen reihenweise in den Browser.'
    },
    title: { en: 'Work in finance', de: 'Arbeit in der Finanzbranche' },
    body: {
      en: `<p>Work for <strong>Fondskonzept / Maklerservicecenter in Munich</strong>: porting a <strong>Java Swing client application</strong> for brokers to a Google Web Toolkit version — a regulated industry and a large existing application.</p>
<p>In between, a journey through the <strong>Karakoram in Pakistan</strong> in October and November 2011. The work itself carried on from <strong>Loft 38 in Portixol, Palma de Mallorca</strong>, in 2012.</p>
<p>The WebRTC work started after that.</p>`,
      de: `<p>Arbeit für <strong>Fondskonzept / Maklerservicecenter in München</strong>: die Portierung einer <strong>Java-Swing-Client-Anwendung</strong> für Makler auf eine Google-Web-Toolkit-Variante — regulierte Branche, große bestehende Anwendung.</p>
<p>Dazwischen eine Reise durch den <strong>Karakorum in Pakistan</strong>, Oktober und November 2011. Gearbeitet wurde 2012 weiter aus dem <strong>Loft 38 in Portixol, Palma de Mallorca</strong>.</p>
<p>Erst danach begann die Arbeit mit WebRTC.</p>`
    }
  },
  {
    year: '2013',
    image: {
      src: '/history/2013-goa.webp',
      alt: {
        en: 'Illustration: people working on laptops and practising yoga on a beach at sunset.',
        de: 'Illustration: Menschen arbeiten an Laptops und praktizieren Yoga an einem Strand bei Sonnenuntergang.'
      }
    },
    era: {
      en: 'Video in the browser was new, and every provider wanted you on their platform to use it.',
      de: 'Video im Browser war neu, und jeder Anbieter wollte einen dafür auf seiner Plattform haben.'
    },
    title: { en: 'Remote.Yoga', de: 'Remote.Yoga' },
    body: {
      en: `<p>A startup for yoga studios and their students, from 2012 — and the first attempt at something that turns up again much later: <strong>making WebRTC video and audio usable for a yoga class, one teacher to many students.</strong></p>
<p>Parts of it were built in Goa, India, in 2013 and 2014 — as one of the first true digital nomads in the country.</p>`,
      de: `<p>Ein Startup für Yogastudios und ihre Schüler, ab 2012 — und der erste Anlauf zu etwas, das sehr viel später wiederkehrt: <strong>WebRTC-Video und -Audio für eine Yogastunde nutzbar machen, ein Lehrer zu vielen Schülern.</strong></p>
<p>Teile davon entstanden 2013 und 2014 in Goa, Indien — als einer der ersten echten digitalen Nomaden im Land.</p>`
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
      en: `<p>If a coworking space is about people working alongside each other, does it need the room? Le Space built <strong>virtual coworking over WebRTC</strong>, and video calling as native apps for iOS and Android.</p>
<p>The technology was already peer-to-peer. But it needed signalling and media servers to get two browsers connected at all. The dependency stayed.</p>`,
      de: `<p>Wenn es beim Coworking darum geht, dass Menschen nebeneinander arbeiten — braucht es dann den Raum? Le Space baute <strong>virtuelles Coworking über WebRTC</strong> und Videotelefonie als native Apps für iOS und Android.</p>
<p>Die Technik war schon damals Peer-to-Peer. Aber sie brauchte Signalisierungs- und Medienserver, um zwei Browser überhaupt zu verbinden. Die Abhängigkeit blieb.</p>`
    }
  },
  {
    year: '2017',
    image: {
      src: '/history/2017-doichain.webp',
      alt: {
        en: 'Illustration: a workstation showing blockchain node software.',
        de: 'Illustration: ein Arbeitsplatz mit Blockchain-Node-Software auf dem Bildschirm.'
      }
    },
    era: {
      en: 'The ICO boom: an idea, a whitepaper, and a coin to go with it.',
      de: 'Der ICO-Boom: eine Idee, ein Whitepaper, und ein Coin dazu.'
    },
    title: { en: 'Proof without a middleman', de: 'Nachweis ohne Mittelsmann' },
    body: {
      en: `<p><strong><a href="https://web.archive.org/web/20240104/https://www.doichain.org/" target="_blank" rel="noopener noreferrer">Doichain</a></strong>, a fork of Namecoin: unforgeable records of email double opt-in, written to a blockchain instead of held by a service provider. Prototype in 2018, a non-profit to carry it, workshops with the eco association.</p>
<p><strong>Early in 2025 the project was no longer carried on.</strong> The link goes to the archived site — the domain is no longer ours.</p>`,
      de: `<p><strong><a href="https://web.archive.org/web/20240104/https://www.doichain.org/" target="_blank" rel="noopener noreferrer">Doichain</a></strong>, ein Fork von Namecoin: fälschungssichere Nachweise über das Double-Opt-In im E-Mail-Marketing, dokumentiert in einer Blockchain statt bei einem Dienstleister. Prototyp 2018, ein Non-Profit als Träger, Workshops mit dem eco-Verband.</p>
<p><strong>Anfang 2025 wurde das Projekt nicht mehr weitergeführt.</strong> Der Verweis führt ins Archiv — die Domain gehört nicht mehr zu uns.</p>`
    }
  },
  {
    year: '2022',
    image: {
      src: '/history/2022-orbitdb.webp',
      alt: {
        en: 'Illustration: working on a laptop at a remote desk, distributed database code on screen.',
        de: 'Illustration: Arbeit am Laptop an einem abgelegenen Schreibtisch, Code einer verteilten Datenbank auf dem Bildschirm.'
      }
    },
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
    year: '2023',
    images: [
      {
        src: '/history/2023-labweek.webp',
        alt: {
          en: 'Illustration: developers around laptops at a conference week.',
          de: 'Illustration: Entwicklerinnen und Entwickler mit Laptops während einer Konferenzwoche.'
        }
      },
      {
        src: '/history/2023-vienna.webp',
        alt: {
          en: 'Illustration: a workplace in Vienna, a web application on screen.',
          de: 'Illustration: ein Arbeitsplatz in Wien, eine Webanwendung auf dem Bildschirm.'
        }
      }
    ],
    era: {
      en: 'IPFS and libp2p had grown past the crypto crowd into a research community of their own.',
      de: 'IPFS und libp2p waren der Kryptoszene entwachsen und zu einer eigenen Forschungsgemeinde geworden.'
    },
    title: { en: 'Two rooms', de: 'Zwei Räume' },
    body: {
      en: `<p><strong>LabWeek in Istanbul</strong> brought the first direct contact with developers from Protocol Labs — the people behind IPFS and libp2p. That contact is why Le Space is embedded in this community today rather than merely using its software.</p>
<p>In parallel, a <strong>SvelteKit project for a pharmaceutical company in Vienna</strong>: another regulated industry, and the framework that carries the local-first prototypes.</p>`,
      de: `<p>Die <strong>LabWeek in Istanbul</strong> brachte den ersten direkten Kontakt zu Entwicklern von Protocol Labs — den Leuten hinter IPFS und libp2p. Auf diesen Kontakt geht zurück, dass Le Space heute in dieser Community steckt und ihre Software nicht bloß benutzt.</p>
<p>Parallel dazu ein <strong>SvelteKit-Auftrag für ein Unternehmen der Pharmabranche in Wien</strong>: erneut eine regulierte Branche, und zugleich das Framework, auf dem die local-first-Prototypen laufen.</p>`
    }
  },
  {
    year: '2025',
    image: null,
    video: {
      id: 'CtKYDoA6A7I',
      poster: '/history/2025-hackathon-video.webp',
      title: {
        en: 'Universal Connectivity Extension Protocol — hackathon submission',
        de: 'Universal Connectivity Extension Protocol — Hackathon-Beitrag'
      }
    },
    era: {
      en: 'Passkeys begin replacing passwords for everyone, not just early adopters.',
      de: 'Passkeys lösen Passwörter im Massenmarkt ab, nicht mehr nur bei Frühnutzern.'
    },
    title: { en: 'First place, from libp2p itself', de: 'Erster Platz, von libp2p selbst' },
    body: {
      en: `<p>Le Space won the <a href="https://github.com/libp2p/universal-connectivity-workshop/discussions/12" target="_blank" rel="noopener noreferrer">Universal Connectivity Hackathon</a> run by the libp2p project, in December 2025.</p>
<p>The entry has two halves. One made a <a href="https://github.com/NiKrause/js-libp2p-examples/tree/uc-extensions-service/examples/js-libp2p-example-yjs-libp2p" target="_blank" rel="noopener noreferrer">peer-to-peer spreadsheet</a> speak Universal Connectivity, so it could talk to the UC chat. The other taught <a href="https://github.com/Le-Space/universal-connectivity/commit/5d8272c" target="_blank" rel="noopener noreferrer">the chat itself</a> to discover and install what another peer offers.</p>
<p>Between them sits the <a href="https://github.com/NiKrause/js-libp2p-examples/blob/uc-extensions-service/examples/js-libp2p-example-yjs-libp2p/UC-EXTENSION-PROTOCOL.md" target="_blank" rel="noopener noreferrer"><strong>Universal Connectivity Extension Protocol</strong></a>: applications announce their capabilities as extensions and find each other’s over libp2p, with no central registry. An app stops being a silo and becomes something other apps can use.</p>
<p>Both halves run: <a href="https://bafybeickgnhfz6p6pupwg26b64os5tfklvaben6m4ypmxcwaid6iapseyq.ipfs.dweb.link/" target="_blank" rel="noopener noreferrer">the spreadsheet</a> and <a href="https://bafybeiasqhynvpbdojrttbunfnhb4qbggtbg427ne3rwphe5y3jhvr5pj4.ipfs.dweb.link/" target="_blank" rel="noopener noreferrer">the chat</a>, rebuilt from the hackathon commits and pinned on IPFS.</p>`,
      de: `<p>Le Space gewann im Dezember 2025 den <a href="https://github.com/libp2p/universal-connectivity-workshop/discussions/12" target="_blank" rel="noopener noreferrer">Universal Connectivity Hackathon</a> des libp2p-Projekts.</p>
<p>Der Beitrag hat zwei Hälften. Die eine brachte einer <a href="https://github.com/NiKrause/js-libp2p-examples/tree/uc-extensions-service/examples/js-libp2p-example-yjs-libp2p" target="_blank" rel="noopener noreferrer">Peer-to-Peer-Tabellenkalkulation</a> Universal Connectivity bei, damit sie mit dem UC-Chat sprechen kann. Die andere brachte <a href="https://github.com/Le-Space/universal-connectivity/commit/5d8272c" target="_blank" rel="noopener noreferrer">dem Chat selbst</a> bei, das Angebot eines anderen Peers zu erkennen und zu installieren.</p>
<p>Dazwischen steht das <a href="https://github.com/NiKrause/js-libp2p-examples/blob/uc-extensions-service/examples/js-libp2p-example-yjs-libp2p/UC-EXTENSION-PROTOCOL.md" target="_blank" rel="noopener noreferrer"><strong>Universal Connectivity Extension Protocol</strong></a>: Anwendungen melden ihre Fähigkeiten als Erweiterungen an und finden die der anderen über libp2p, ohne zentrale Registrierung. Eine Anwendung hört damit auf, ein Silo zu sein.</p>
<p>Beide Hälften laufen: <a href="https://bafybeickgnhfz6p6pupwg26b64os5tfklvaben6m4ypmxcwaid6iapseyq.ipfs.dweb.link/" target="_blank" rel="noopener noreferrer">die Tabellenkalkulation</a> und <a href="https://bafybeiasqhynvpbdojrttbunfnhb4qbggtbg427ne3rwphe5y3jhvr5pj4.ipfs.dweb.link/" target="_blank" rel="noopener noreferrer">der Chat</a>, neu gebaut aus den Hackathon-Commits und auf IPFS gepinnt.</p>`
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
<p>That last piece closes a circle. <strong>The problem the WebRTC work ran into — you cannot reach each other without someone else’s servers — is the one that is now solved.</strong> And the yoga of 2012 runs as an application that replicates between devices, without a server and without an account.</p>
<p>Sixteen years, the same question three times over: <strong>who owns the thing we work with — the room, the record, the data?</strong> Only the answers got better.</p>`,
      de: `<p>Identität über Passkeys statt Passwörter. Relays, die jeder in Minuten selbst startet. Zwei Geräte, die sich über einen QR-Code finden, ganz ohne Relay. Ein Vortrag auf der <a href="https://fosdem.org/2026/schedule/event/8PD9LQ-local-first-peer-to-peer-with-orbit-db/" target="_blank" rel="noopener noreferrer">FOSDEM</a>. Und Yogasūcī, im Einsatz.</p>
<p>Der letzte Punkt schließt einen Kreis. <strong>Das Problem, an dem die WebRTC-Arbeit hängen blieb — man kommt ohne fremde Server nicht zueinander — ist genau das, was heute gelöst ist.</strong> Und das Yoga von 2012 läuft inzwischen als Anwendung, die zwischen Geräten repliziert, ohne Server und ohne Konto.</p>
<p>Sechzehn Jahre, dreimal dieselbe Frage: <strong>Wem gehört das, womit wir arbeiten — der Raum, der Nachweis, die Daten?</strong> Nur die Antworten wurden besser.</p>`
    }
  }
];
