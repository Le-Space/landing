import { mount } from 'svelte';
import '@le-space/landing-shared/tokens.css';
import { initI18n, localeFromPath, redirectToPreferredLocale } from '@le-space/landing-shared/i18n';
import { dictionaries } from './locales.js';
import History from './History.svelte';

// A first-time visitor on a bare English URL goes to their browser's language
// before anything renders; see redirectToPreferredLocale.
const redirecting = redirectToPreferredLocale();

initI18n(dictionaries, localeFromPath());


let app = null;

const target = document.getElementById('app');
// See main.js: tools/postbuild.mjs bakes a prerendered copy into #app, and
// Svelte 5's mount() appends rather than replaces.
if (!redirecting) {
  target.innerHTML = '';
  app = mount(History, { target });
}

export default app;
