<script>
  /**
   * Dark/light toggle, shown next to the language flags. A button rather than a
   * link: unlike the language, the theme is not part of the URL.
   */
  import { theme, toggleTheme } from '../theme.js';
  import { t } from '../i18n.js';

  const label = $derived(
    $theme === 'light'
      ? $t('theme.toDark', 'Switch to dark mode')
      : $t('theme.toLight', 'Switch to light mode')
  );
</script>

<button
  type="button"
  class="theme"
  onclick={toggleTheme}
  aria-label={label}
  title={label}
  aria-pressed={$theme === 'light'}
>
  {#if $theme === 'light'}
    <!-- currently light → offer dark: moon -->
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
    </svg>
  {:else}
    <!-- currently dark → offer light: sun -->
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
      <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2" />
        <path d="M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
      </g>
    </svg>
  {/if}
</button>

<style>
  .theme {
    width: 30px;
    height: 20px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 4px;
    background: none;
    color: var(--ls-text-dim);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
  }

  .theme svg {
    width: 15px;
    height: 15px;
    display: block;
  }

  .theme:hover {
    opacity: 1;
    color: var(--ls-text);
    transform: translateY(-1px);
  }

  .theme:focus-visible {
    outline: 2px solid var(--ls-accent);
    outline-offset: 2px;
  }
</style>
