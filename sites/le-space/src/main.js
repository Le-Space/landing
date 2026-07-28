import { mount } from 'svelte';
import '@le-space/landing-shared/tokens.css';
import { initI18n } from '@le-space/landing-shared/i18n';
import App from './App.svelte';

initI18n({
  en: { tagline: 'The Local-First Peer-to-Peer Stack', explore: 'Explore our work' },
  de: { tagline: 'Der Local-First Peer-to-Peer Stack', explore: 'Unsere Arbeit entdecken' }
});

const target = document.getElementById('app');
// tools/postbuild.mjs bakes a prerendered copy of the app into #app so crawlers
// that do not run JavaScript still see the content. Svelte 5's mount() appends
// rather than replaces, so that copy has to go before mounting — otherwise the
// page renders twice. It is scraped DOM, not Svelte SSR output, so hydrate()
// cannot adopt it.
target.innerHTML = '';

export default mount(App, { target });
