/**
 * Minimal dependency-free i18n for browser-only Svelte sites.
 * Usage:
 *   import { locale, t, initI18n } from '@le-space/landing-shared/i18n';
 *   initI18n({ en, de });
 *   $t('hero.title')
 */
import { writable, derived, get } from 'svelte/store';

const dictionaries = {};

export const locale = writable('en');

export function initI18n(dicts, initial) {
  Object.assign(dictionaries, dicts);
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('ls-locale') : null;
  const browser = typeof navigator !== 'undefined' && navigator.language?.startsWith('de') ? 'de' : 'en';
  locale.set(initial || saved || browser);
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
