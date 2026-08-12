/**
 * Per-page, per-language document title and description.
 *
 * Two consumers, deliberately one source: tools/postbuild.mjs bakes these into
 * the static head of every page and language, and LanguageSwitcher re-applies
 * them when the language is switched without a reload. Keeping a second copy in
 * the switcher would drift the moment either is edited.
 *
 * Crawlers need distinct titles per language — otherwise both URLs compete for
 * the same queries in the wrong language (docs/seo-plan.md).
 *
 * `noindex: true` keeps a page out of the sitemap and asks crawlers to skip it.
 * It is reachable by URL, but not advertised — the same treatment the pitch
 * decks get in tools/build-decks.mjs.
 */
export const SITE_META = {
  'local-first': {
    '/': {
      en: {
        title: 'Le-Space — The Local-First Peer-to-Peer Stack',
        description:
          'Software you can keep: local-first peer-to-peer applications with no servers, no accounts, no passwords. The Le-Space open-source stack.',
        ogDescription: 'No servers. No accounts. No passwords. The open-source local-first stack.'
      },
      de: {
        title: 'Le-Space — Der Local-First Peer-to-Peer Stack',
        description:
          'Software, die dir bleibt: local-first Peer-to-Peer-Anwendungen ohne Server, ohne Accounts, ohne Passwörter. Der Open-Source-Stack von Le-Space.',
        ogDescription:
          'Keine Server. Keine Accounts. Keine Passwörter. Der Open-Source-Local-First-Stack.'
      }
    }
  },
  'le-space': {
    '/': {
      en: {
        title: 'Le-Space — The Local-First Peer-to-Peer Stack',
        description:
          'Le-Space — the local-first peer-to-peer stack. No servers. No accounts. No passwords.',
        ogDescription:
          'The local-first peer-to-peer stack. No servers. No accounts. No passwords.'
      },
      de: {
        title: 'Le-Space — Der Local-First Peer-to-Peer Stack',
        description:
          'Le-Space — der Local-First Peer-to-Peer Stack. Keine Server. Keine Accounts. Keine Passwörter.',
        ogDescription:
          'Der Local-First Peer-to-Peer Stack. Keine Server. Keine Accounts. Keine Passwörter.'
      }
    },
    '/history/': {
      en: {
        title: 'Sixteen years of Le-Space — from a coworking space to a peer-to-peer stack',
        description:
          'Le-Space opened Leipzig’s first coworking space in 2010, built peer-to-peer video over WebRTC in 2016, ran a blockchain notarisation project until 2023, and has built local-first peer-to-peer software since 2022.',
        ogDescription:
          'From Leipzig’s first coworking space to a local-first peer-to-peer stack — sixteen years, one question.'
      },
      de: {
        title: 'Sechzehn Jahre Le-Space — vom Coworking Space zum Peer-to-Peer-Stack',
        description:
          'Le Space eröffnete 2010 den ersten Coworking Space Leipzigs, baute 2016 Peer-to-Peer-Video über WebRTC, führte bis 2023 ein Blockchain-Projekt zur Nachweisführung und entwickelt seit 2022 local-first Peer-to-Peer-Software.',
        ogDescription:
          'Vom ersten Coworking Space Leipzigs zum Local-First-Peer-to-Peer-Stack — sechzehn Jahre, eine Frage.'
      }
    },
    // '/join/' follows once its copy is agreed. It will carry `noindex: true`:
    // reachable by URL, absent from the sitemap, not advertised — the treatment
    // the pitch decks get. Every page listed here must have a built shell, or
    // the prerender step fails loudly rather than shipping a page that is only
    // half there.
  }
};

/** Pages a site builds, in sitemap order. */
export const sitePages = (site) => Object.keys(SITE_META[site] ?? {});

/**
 * @param {string} site
 * @param {string} page  e.g. '/' or '/history/'
 * @param {'en'|'de'} lang
 */
export function metaFor(site, page, lang) {
  const pages = SITE_META[site] ?? {};
  const entry = pages[page] ?? pages['/'] ?? {};
  return entry[lang] ?? entry.en ?? null;
}

export const isNoindex = (site, page) => Boolean(SITE_META[site]?.[page]?.noindex);
