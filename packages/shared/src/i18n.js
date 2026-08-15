/**
 * Minimal dependency-free i18n for browser-only Svelte sites.
 * Usage:
 *   import { locale, t, initI18n } from '@le-space/landing-shared/i18n';
 *   initI18n({ en, de });
 *   $t('hero.title')
 */
import { writable, derived, get } from 'svelte/store';

const dictionaries = {};

export const locale = writable('de');

/**
 * Language lives in the URL: `/` is English, `/de/` is German. Crawlers need one
 * URL per language — a single URL whose content depends on navigator.language
 * gets indexed in whichever language the crawler happens to request.
 * See docs/seo-plan.md.
 */
export const LOCALES = ['en', 'de'];
export const DEFAULT_LOCALE = 'en';

export function localeFromPath(pathname = typeof location !== 'undefined' ? location.pathname : '/') {
  const first = pathname.split('/').filter(Boolean)[0];
  return LOCALES.includes(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/**
 * Strip the locale prefix, leaving the page: `/de/history/` → `/history/`.
 * Used to look up per-page metadata and to keep the language switcher on the
 * page the reader is actually on.
 */
export function pagePath(pathname = typeof location !== 'undefined' ? location.pathname : '/') {
  const segments = pathname.split('/').filter(Boolean);
  if (LOCALES.includes(segments[0]) && segments[0] !== DEFAULT_LOCALE) segments.shift();
  return segments.length ? `/${segments.join('/')}/` : '/';
}

/**
 * URL for a locale, staying on the current page. Switching language on
 * `/de/history/` has to land on `/history/`, not back on the front page.
 */
export function localePath(code, pathname) {
  const page = pagePath(pathname);
  return code === DEFAULT_LOCALE ? page : `/${code}${page}`;
}

/**
 * Detect the visitor's preferred language from the browser: German for a German
 * browser, English for everyone else. English is the fallback rather than
 * German because it is the language more visitors can read, and because `/` is
 * the English URL — an unrecognised language then needs no redirect at all.
 */
export function detectLocale() {
  const langs =
    typeof navigator !== 'undefined'
      ? navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      : [];

  for (const l of langs) {
    if (typeof l !== 'string') continue;
    const lang = l.toLowerCase();
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('en')) return 'en';
  }
  return DEFAULT_LOCALE;
}

/**
 * Send a first-time visitor to the language their browser asks for.
 *
 * Deliberately client-side only, and deliberately not a server redirect: the
 * language lives in the URL so that each version is indexed as itself
 * (docs/seo-plan.md). Crawlers do not run this, so `/` stays canonically
 * English and `/de/` German no matter who fetches them.
 *
 * Three guards, so it only ever fires when it should:
 *  - only on a path without a locale prefix, so a link to `/de/history/` and a
 *    deliberate `/` are both left alone in the sense that only the bare
 *    English path can be upgraded
 *  - never against a stored choice: clicking EN has to stick, otherwise a
 *    German browser bounces the reader back on every visit
 *  - `location.replace`, so the back button does not land on the page that
 *    immediately redirects again
 *
 * @returns {boolean} true when a redirect was started — the caller should stop.
 */
export function redirectToPreferredLocale() {
  if (typeof location === 'undefined') return false;
  // Already on a localized URL: the visitor asked for that language.
  if (localeFromPath() !== DEFAULT_LOCALE) return false;

  let saved = null;
  try {
    saved = localStorage.getItem('ls-locale');
  } catch {
    /* private browsing can throw on read */
  }
  if (saved) return false;

  const preferred = detectLocale();
  if (preferred === DEFAULT_LOCALE) return false;

  location.replace(`/${preferred}${pagePath()}${location.search}${location.hash}`);
  return true;
}

export function initI18n(dicts, initial) {
  Object.assign(dictionaries, dicts);
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('ls-locale') : null;
  // One detection for both callers: this and redirectToPreferredLocale must not
  // disagree about what the browser asked for.
  const detected = detectLocale();
  // `initial` is the URL's language and must win: a visitor who follows a link
  // to /de/ gets German even if they once clicked the EN flag on this device.
  locale.set(initial || saved || detected);
  locale.subscribe((l) => {
    try { localStorage.setItem('ls-locale', l); } catch { /* private mode */ }
  });
}

function lookup(dict, key) {
  return key.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), dict);
}

export const t = derived(locale, (l) => (key, fallback) => {
  const v = lookup(dictionaries[l] || {}, key) ?? lookup(dictionaries.en || {}, key);
  return v ?? fallback ?? key;
});

export function toggleLocale() {
  locale.set(get(locale) === 'en' ? 'de' : 'en');
}
