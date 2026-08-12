<script>
  /**
   * The history page: a year rail on desktop, a plain list on phones.
   *
   * Every station stays in the DOM and is only hidden, exactly like the FAQ
   * answers on the other site — a station that is never rendered is invisible
   * to crawlers too, and this page is the company's story in full text.
   *
   * Images are reserved but not yet delivered; `image: null` renders a framed
   * placeholder of the same aspect ratio, so dropping the photographs in later
   * shifts nothing on the page.
   */
  import { t, locale } from '@le-space/landing-shared/i18n';
  import { history } from '@le-space/landing-shared/history';
  import { siteConfig } from '@le-space/landing-shared/site-config';
  import { buildStamp } from '@le-space/landing-shared/build-info';
  import ParticlesBackground from '@le-space/landing-shared/components/ParticlesBackground.svelte';
  import LanguageSwitcher from '@le-space/landing-shared/components/LanguageSwitcher.svelte';
  import LeSpaceLogo from '@le-space/landing-shared/components/LeSpaceLogo.svelte';
  import LegalModals from '@le-space/landing-shared/components/LegalModals.svelte';

  let showImprint = $state(false);
  let showPrivacy = $state(false);
  let active = $state(history[0].year);

  const pick = (field) => field[$locale] || field.en;
</script>

<ParticlesBackground density={90} />
<LanguageSwitcher site="le-space" />

<main>
  <header class="top">
    <a class="home" href="/" aria-label="Le-Space">
      <LeSpaceLogo size={44} />
      <span>Le-Space</span>
    </a>
  </header>

  <div class="intro">
    <h1>{$t('history.title', 'Sechzehn Jahre Le Space')}</h1>
    <p class="lead">
      {$t(
        'history.lead',
        'Vom ersten Coworking Space Leipzigs zu einem Stack, der ohne Server auskommt.'
      )}
    </p>
    <!-- Said once, plainly. A reader who works out on their own that the
         pictures are generated stops trusting the text too. -->
    <p class="note">{$t('history.illustrations')}</p>
  </div>

  <!-- The rail is navigation on wide screens and a plain heading list on
       phones, where a horizontal timeline has never worked. -->
  <nav class="rail" aria-label={$t('history.years', 'Jahre')}>
    {#each history as station (station.year)}
      <a
        class="year"
        class:active={active === station.year}
        href="#year-{station.year}"
        onclick={() => (active = station.year)}
      >
        {station.year}
      </a>
    {/each}
  </nav>

  <ol class="stations">
    {#each history as station (station.year)}
      <!-- A station can carry two pictures when one year holds two threads;
           they then share the row rather than stacking, so the timeline keeps
           one visual block per year. -->
      {@const shots = station.image ? [station.image] : (station.images ?? [])}
      <li class="station" id="year-{station.year}">
        <div class="marker" aria-hidden="true">{station.year}</div>

        <div class="shots" class:pair={shots.length > 1}>
          {#if shots.length}
            {#each shots as shot (shot.src)}
              <figure class="shot">
                <img src={shot.src} alt={pick(shot.alt)} loading="lazy" />
              </figure>
            {/each}
          {:else}
            <figure class="shot">
              <div class="placeholder">{station.year}</div>
            </figure>
          {/if}
        </div>

        <div class="text">
          <p class="era">{pick(station.era)}</p>
          <h2>{pick(station.title)}</h2>
          <div class="body">{@html pick(station.body)}</div>
        </div>
      </li>
    {/each}
  </ol>

  <footer>
    <a href="/">le-space.de</a>
    <a href={siteConfig.urls.localFirst}>local-first.le-space.de</a>
    <button class="legal" onclick={() => (showImprint = true)}>Impressum</button>
    <button class="legal" onclick={() => (showPrivacy = true)}>Datenschutz</button>
    <span class="build" title="Version · commit · build date">{buildStamp}</span>
  </footer>
</main>

<LegalModals bind:showImprint bind:showPrivacy />

<style>
  main {
    position: relative;
    z-index: 1;
    max-width: 940px;
    margin: 0 auto;
    padding: 24px 24px 80px;
  }

  .top {
    padding: 8px 0 40px;
  }

  .home {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--ls-text);
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .home:hover {
    text-decoration: none;
    color: var(--ls-accent);
  }

  .intro {
    max-width: 640px;
    margin-bottom: 40px;
  }

  h1 {
    font-size: clamp(1.9rem, 5vw, 3rem);
    margin: 0 0 12px;
  }

  .lead {
    color: var(--ls-text-dim);
    font-size: 1.05rem;
    margin: 0;
  }

  .note {
    margin: 12px 0 0;
    font-size: 0.82rem;
    color: var(--ls-text-faint);
  }

  .rail {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 10px;
    padding: 10px 0 34px;
    border-bottom: 1px solid var(--ls-card-border);
    margin-bottom: 44px;
  }

  .year {
    font-family: var(--ls-font-mono);
    font-size: 0.85rem;
    color: var(--ls-text-faint);
    padding: 4px 12px;
    border: 1px solid transparent;
    border-radius: 999px;
    scroll-margin-top: 80px;
  }

  .year:hover,
  .year.active {
    text-decoration: none;
    color: var(--ls-text);
    border-color: var(--ls-card-border);
    background: var(--ls-card);
  }

  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 72px;
  }

  .station {
    display: grid;
    grid-template-columns: 88px 1fr;
    gap: 8px 28px;
    scroll-margin-top: 80px;
  }

  .marker {
    font-family: var(--ls-font-mono);
    font-size: 1.05rem;
    color: var(--ls-accent);
    padding-top: 2px;
  }

  .shots {
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .shots.pair {
    grid-template-columns: 1fr 1fr;
  }

  .shot {
    margin: 0;
    aspect-ratio: 16 / 9;
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    overflow: hidden;
    background: var(--ls-bg-2);
  }

  .shot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Reserved, not hidden: the page should look the same shape before and after
     the photographs arrive. */
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--ls-font-mono);
    font-size: 2.2rem;
    color: var(--ls-text-faint);
    opacity: 0.35;
    background: radial-gradient(
      ellipse at 30% 20%,
      color-mix(in srgb, var(--ls-accent) 12%, transparent),
      transparent 62%
    );
  }

  .text {
    grid-column: 2;
  }

  .era {
    margin: 0 0 10px;
    font-size: 0.82rem;
    color: var(--ls-text-faint);
    border-left: 2px solid var(--ls-card-border);
    padding-left: 12px;
  }

  h2 {
    margin: 0 0 12px;
    font-size: 1.4rem;
  }

  .body {
    color: var(--ls-text-dim);
  }

  .body :global(p) {
    margin: 0 0 12px;
  }

  .body :global(strong) {
    color: var(--ls-text);
  }

  footer {
    margin-top: 80px;
    padding-top: 24px;
    border-top: 1px solid var(--ls-card-border);
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    font-size: 0.82rem;
  }

  footer a {
    color: var(--ls-text-faint);
  }

  .legal {
    background: none;
    border: none;
    color: var(--ls-text-faint);
    cursor: pointer;
    font-size: 0.82rem;
    font-family: var(--ls-font);
    padding: 0;
  }

  .legal:hover {
    color: var(--ls-text);
  }

  .build {
    font-family: var(--ls-font-mono);
    font-size: 0.7rem;
    color: var(--ls-text-faint);
    opacity: 0.75;
  }

  @media (max-width: 640px) {
    .station {
      grid-template-columns: 1fr;
      gap: 6px;
    }

    .shots,
    .text {
      grid-column: 1;
    }

    /* Two pictures side by side are unreadable at phone width. */
    .shots.pair {
      grid-template-columns: 1fr;
    }

    .stations {
      gap: 56px;
    }
  }
</style>
