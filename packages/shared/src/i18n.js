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

export function initI18n(dicts, initial) {
  Object.assign(dictionaries, dicts);
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('ls-locale') : null;
  // Auto-detect from browser language preferences (in order): first match of
  // de → de or en → en wins; any other language falls back to de.
  // A saved choice (via the switcher) always wins over detection.
  const browserLangs = typeof navigator !== 'undefined'
    ? (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])
    : [];
  let detected = 'de';
  for (const l of browserLangs) {
    if (typeof l !== 'string') continue;
    const lang = l.toLowerCase();
    if (lang.startsWith('de')) { detected = 'de'; break; }
    if (lang.startsWith('en')) { detected = 'en'; break; }
  }
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
