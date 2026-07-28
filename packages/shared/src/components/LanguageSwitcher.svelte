<script>
  /**
   * Fixed top-right language switcher with real SVG flags (DE / EN).
   * SVG instead of emoji flags so it renders consistently on every OS.
   *
   * These are links, not buttons: each language has its own URL (`/` and
   * `/de/`), so switching has to navigate. It also gives crawlers a followable
   * path to the other language version, which a click handler never would.
   */
  import { locale, localePath } from '../i18n.js';
  import ThemeToggle from './ThemeToggle.svelte';

  const langs = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' }
  ];
</script>

<div class="lang-switcher" role="group" aria-label="Sprache / Language">
  {#each langs as l (l.code)}
    <a
      class="flag"
      class:active={$locale === l.code}
      href={localePath(l.code)}
      hreflang={l.code}
      aria-current={$locale === l.code ? 'true' : undefined}
      aria-label={l.label}
      title={l.label}
    >
      {#if l.code === 'de'}
        <svg viewBox="0 0 5 3" aria-hidden="true">
          <rect width="5" height="1" y="0" fill="#000000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      {:else}
        <svg viewBox="0 0 60 30" aria-hidden="true">
          <clipPath id="ls-uk-clip"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
          <clipPath id="ls-uk-tri">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <g clip-path="url(#ls-uk-clip)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" stroke-width="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#ls-uk-tri)" stroke="#C8102E" stroke-width="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" stroke-width="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
          </g>
        </svg>
      {/if}
    </a>
  {/each}
  <span class="sep" aria-hidden="true"></span>
  <ThemeToggle />
</div>

<style>
  .sep {
    width: 1px;
    align-self: stretch;
    margin: 2px 1px;
    background: var(--ls-card-border);
  }

  /* The pill is the whole top-right control cluster: languages plus theme. */
  .lang-switcher {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1000;
    display: flex;
    gap: 6px;
    padding: 5px;
    background: color-mix(in srgb, var(--ls-bg-2) 80%, transparent);
    border: 1px solid var(--ls-card-border);
    border-radius: 999px;
    backdrop-filter: blur(8px);
  }

  .flag {
    width: 30px;
    height: 20px;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 4px;
    background: none;
    cursor: pointer;
    /* now an <a>, so undo the link defaults the button never had */
    text-decoration: none;
    line-height: 0;
    opacity: 0.45;
    overflow: hidden;
    display: flex;
    transition: opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .flag svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .flag:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }

  .flag.active {
    opacity: 1;
    border-color: var(--ls-accent);
    box-shadow: 0 0 0 1px var(--ls-accent);
  }
</style>
