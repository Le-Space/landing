/**
 * Per-language document title and description for each site.
 *
 * Two consumers, deliberately one source: tools/postbuild.mjs bakes these into
 * the static head of each language's page, and LanguageSwitcher re-applies them
 * when the language is switched without a reload. Keeping a second copy in the
 * switcher would drift the moment either is edited.
 *
 * Crawlers need distinct titles per language — otherwise both URLs compete for
 * the same queries in the wrong language (docs/seo-plan.md).
 */
export const SITE_META = {
  'local-first': {
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
      ogDescription: 'Keine Server. Keine Accounts. Keine Passwörter. Der Open-Source-Local-First-Stack.'
    }
  },
  'le-space': {
    en: {
      title: 'Le-Space — The Local-First Peer-to-Peer Stack',
      description:
        'Le-Space — the local-first peer-to-peer stack. No servers. No accounts. No passwords.',
      ogDescription: 'The local-first peer-to-peer stack. No servers. No accounts. No passwords.'
    },
    de: {
      title: 'Le-Space — Der Local-First Peer-to-Peer Stack',
      description:
        'Le-Space — der Local-First Peer-to-Peer Stack. Keine Server. Keine Accounts. Keine Passwörter.',
      ogDescription: 'Der Local-First Peer-to-Peer Stack. Keine Server. Keine Accounts. Keine Passwörter.'
    }
  }
};
