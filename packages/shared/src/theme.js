/**
 * Theme store. `dark` is the brand default; `light` is opt-in or follows the
 * OS when the visitor has never chosen.
 *
 * The attribute lives on <html> rather than <body> so the inline bootstrap in
 * each index.html can set it before first paint — see THEME_BOOTSTRAP below.
 * Without that, a light-mode visitor gets a dark flash on every page load.
 */
import { writable } from 'svelte/store';

const KEY = 'ls-theme';
export const THEMES = ['dark', 'light'];

function initial() {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.dataset.theme;
  if (THEMES.includes(attr)) return attr;
  try {
    const saved = localStorage.getItem(KEY);
    if (THEMES.includes(saved)) return saved;
  } catch {
    /* private mode */
  }
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export const theme = writable(initial());

theme.subscribe((value) => {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = value;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode */
  }
});

export function toggleTheme() {
  theme.update((t) => (t === 'light' ? 'dark' : 'light'));
}

/**
 * Inline <script> for index.html. Runs before the bundle and before paint, so
 * the correct background is there from the first frame. Kept in sync with
 * initial() above — deliberately duplicated rather than imported, because an
 * imported module would already be too late.
 */
export const THEME_BOOTSTRAP = `try{var t=localStorage.getItem('ls-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){}`;
