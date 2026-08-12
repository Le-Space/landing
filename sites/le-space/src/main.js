import { mount } from 'svelte';
import '@le-space/landing-shared/tokens.css';
import { initI18n, localeFromPath } from '@le-space/landing-shared/i18n';
import { dictionaries } from './locales.js';
import App from './App.svelte';

initI18n(dictionaries, localeFromPath());

const target = document.getElementById('app');
// tools/postbuild.mjs bakes a prerendered copy of the app into #app so crawlers
// that do not run JavaScript still see the content. Svelte 5's mount() appends
// rather than replaces, so that copy has to go before mounting — otherwise the
// page renders twice. It is scraped DOM, not Svelte SSR output, so hydrate()
// cannot adopt it.
target.innerHTML = '';

export default mount(App, { target });
