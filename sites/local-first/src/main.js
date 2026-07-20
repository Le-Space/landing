import { mount } from 'svelte';
import '@le-space/landing-shared/tokens.css';
import { initI18n } from '@le-space/landing-shared/i18n';
import en from './locales/en.json';
import de from './locales/de.json';
import App from './App.svelte';

initI18n({ en, de });

export default mount(App, { target: document.getElementById('app') });
