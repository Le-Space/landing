/**
 * Conferences and talks, newest first.
 *
 * Only one of these is a talk; the rest are appearances. The FOSDEM session is
 * recorded and the recording is served as a plain file from video.fosdem.org,
 * so it can be embedded with a native <video> element — no third-party player,
 * no tracker on a page that advertises exactly that.
 *
 * `city` is localized because the footer shows it now: Brussels/Brüssel and
 * Munich/München read as sloppy the other way round on a bilingual page.
 */
export const talks = [
  {
    id: "fosdem-2026",
    name: "FOSDEM 2026",
    role: "talk",
    city: { en: "Brussels", de: "Brüssel" },
    country: { en: "Belgium", de: "Belgien" },
    date: "2026-02-01",
    when: { en: "February 2026", de: "Februar 2026" },
    url: "https://fosdem.org/2026/schedule/event/8PD9LQ-local-first-peer-to-peer-with-orbit-db/",
    talk: {
      title: "Local-First Peer-to-Peer apps with js-libp2p, IPFS and OrbitDB",
      speaker: "Nico Krause",
      room: "K.3.201",
      // FOSDEM publishes both; AV1 first, MP4 as the fallback for older systems.
      video: {
        webm: "https://video.fosdem.org/2026/k3201/8PD9LQ-local-first-peer-to-peer-with-orbit-db.av1.webm",
        mp4: "https://video.fosdem.org/2026/k3201/8PD9LQ-local-first-peer-to-peer-with-orbit-db.mp4",
        captions:
          "https://video.fosdem.org/2026/k3201/8PD9LQ-local-first-peer-to-peer-with-orbit-db.vtt",
      },
    },
    desc: {
      en: "What building peer-to-peer apps with CRDTs in OrbitDB actually looks like from a web developer’s seat — passkeys and DIDs, UCANs, decentralized storage, pinning, and where the sharp edges are.",
      de: "Wie sich Peer-to-Peer-Apps mit CRDTs in OrbitDB aus Sicht eines Webentwicklers wirklich bauen — Passkeys und DIDs, UCANs, dezentraler Speicher, Pinning, und wo die scharfen Kanten sind.",
    },
  },
  {
    id: "blockchain-life-2025",
    name: "Blockchain Life 2025",
    role: "attended",
    city: { en: "Moscow", de: "Moskau" },
    country: { en: "Russia", de: "Russland" },
    date: "2025-10-01",
    when: { en: "October 2025", de: "Oktober 2025" },
    url: "https://blockchain-life.com/",
    desc: {
      en: "One of the larger Web3 industry gatherings, spanning exchanges, mining and infrastructure.",
      de: "Eine der größeren Web3-Branchenveranstaltungen, von Börsen über Mining bis Infrastruktur.",
    },
  },
  {
    id: "tum-blockchain-2025",
    name: "TUM Blockchain Conference",
    role: "attended",
    city: { en: "Munich", de: "München" },
    country: { en: "Germany", de: "Deutschland" },
    date: "2025-09-01",
    when: { en: "2025", de: "2025" },
    url: "https://conference.tum-blockchain.com/",
    desc: {
      en: "The Technical University of Munich’s conference, where academic research meets protocol engineering.",
      de: "Die Konferenz der TU München, auf der akademische Forschung und Protokollentwicklung zusammenkommen.",
    },
  },
  {
    id: "labweek-2025",
    name: "LabWeek",
    role: "attended",
    city: { en: "Brussels", de: "Brüssel" },
    country: { en: "Belgium", de: "Belgien" },
    date: "2025-02-01",
    when: { en: "2025", de: "2025" },
    url: "https://labweek.io/",
    desc: {
      en: "Protocol Labs’ distributed event week around IPFS, libp2p and Filecoin — the stack this site is built on.",
      de: "Die verteilte Veranstaltungswoche von Protocol Labs rund um IPFS, libp2p und Filecoin — der Stack, auf dem diese Seite läuft.",
    },
  },
  {
    id: "devcon-7-2024",
    name: "Devcon 7 & LabWeek",
    role: "attended",
    city: { en: "Bangkok", de: "Bangkok" },
    country: { en: "Thailand", de: "Thailand" },
    date: "2024-11-01",
    when: { en: "November 2024", de: "November 2024" },
    url: "https://devcon.org/",
    desc: {
      en: "The Ethereum Foundation’s developer conference, alongside LabWeek in the same week.",
      de: "Die Entwicklerkonferenz der Ethereum Foundation, zeitgleich mit der LabWeek.",
    },
  },
  {
    id: "devconnect-2023",
    name: "Devconnect & LabWeek",
    role: "attended",
    city: { en: "Istanbul", de: "Istanbul" },
    country: { en: "Turkey", de: "Türkei" },
    date: "2023-11-01",
    when: { en: "November 2023", de: "November 2023" },
    url: "https://devconnect.org/",
    desc: {
      en: "A week of independent Ethereum ecosystem events, again overlapping with LabWeek.",
      de: "Eine Woche unabhängiger Veranstaltungen im Ethereum-Ökosystem, erneut parallel zur LabWeek.",
    },
  },
];
