import { mount } from 'svelte';
import '@le-space/landing-shared/tokens.css';
import { initI18n, localeFromPath } from '@le-space/landing-shared/i18n';
import { dictionaries } from './locales.js';
import History from './History.svelte';

initI18n(dictionaries, localeFromPath());

const target = document.getElementById('app');
// See main.js: tools/postbuild.mjs bakes a prerendered copy into #app, and
// Svelte 5's mount() appends rather than replaces.
target.innerHTML = '';

export default mount(History, { target });
