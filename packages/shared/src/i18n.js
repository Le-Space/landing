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
