import { mount } from 'svelte';
import '@le-space/landing-shared/tokens.css';
import { initI18n } from '@le-space/landing-shared/i18n';
import App from './App.svelte';

initI18n({
  en: { tagline: 'The Local-First Peer-to-Peer Stack', explore: 'Explore our work' },
  de: { tagline: 'Der Local-First Peer-to-Peer Stack', explore: 'Unsere Arbeit entdecken' }
});

export default mount(App, { target: document.getElementById('app') });
