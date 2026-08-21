/**
 * Strings for le-space.de. Small enough to live here rather than in JSON files
 * — but shared between the entry points, so the front page and the history page
 * cannot drift apart on the words they have in common.
 */
export const dictionaries = {
  en: {
    tagline: 'The Local-First Peer-to-Peer Stack',
    news_label: 'News',
    explore: 'Explore our work',
    footer: { imprint: 'Imprint', privacy: 'Privacy' },
    history: {
      link: 'Our history',
      title: 'Sixteen years of Le Space',
      lead: 'From Leipzig’s first coworking space to a stack that runs without servers.',
      years: 'Years',
      playNote: 'Click to play — loads from YouTube',
      illustrations:
        'The early years were not photographed, only remembered. The pictures are illustrations.'
    }
  },
  de: {
    tagline: 'Der Local-First Peer-to-Peer Stack',
    news_label: 'Neuigkeiten',
    explore: 'Unsere Arbeit entdecken',
    footer: { imprint: 'Impressum', privacy: 'Datenschutz' },
    history: {
      link: 'Unsere Geschichte',
      title: 'Sechzehn Jahre Le Space',
      lead: 'Vom ersten Coworking Space Leipzigs zu einem Stack, der ohne Server auskommt.',
      years: 'Jahre',
      playNote: 'Klicken zum Abspielen — lädt von YouTube',
      illustrations:
        'Die frühen Jahre wurden nicht fotografiert, sondern erinnert. Die Bilder sind Illustrationen.'
    }
  }
};
