<script>
  import { t } from '@le-space/landing-shared/i18n';
  import { siteConfig } from '@le-space/landing-shared/site-config';
  import LeSpaceLogo from '@le-space/landing-shared/components/LeSpaceLogo.svelte';
  import NetworkViz from '@le-space/landing-shared/components/NetworkViz.svelte';
  import NewsTicker from '@le-space/landing-shared/components/NewsTicker.svelte';
</script>

<section class="hero">
  <div class="ls-container">
    <!-- The mark is the way back to the company site. It reads as a logo, so
         people try clicking it; leaving it inert makes the two sites feel
         unrelated. -->
    <a class="top" href={siteConfig.urls.home} aria-label="Le-Space">
      <LeSpaceLogo size={64} />
      <span class="brand">Le-Space</span>
    </a>
    <!-- Announcements, above everything else, and removable later without
         leaving a gap. Green because that is already the colour of a working
         demo on the project cards.

         A list now rather than one line: it used to be a pair of translation
         keys overwritten whenever something newer happened, which is why
         nothing here ever said *when*. The entries and their dates live in
         `data/news.js`. -->
    <NewsTicker label={$t('hero.news_label')} />

    <p class="kicker">{$t('hero.kicker')}</p>
    <h1>{$t('hero.title')}</h1>
    <p class="subtitle">{$t('hero.subtitle')}</p>
    <div class="ctas">
      <a class="btn primary" href="#projects">{$t('hero.cta_projects')}</a>
      <a class="btn" href="#faq">{$t('hero.cta_faq')}</a>
      <!-- Was a GitHub link, which the footer icons and every project card
           already offer. A way to reach a person did not exist above the fold. -->
      <a class="btn" href="#contact">{$t('hero.cta_contact', 'Kontakt')}</a>
    </div>
  </div>
  <NetworkViz live />
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    padding-top: 48px;
  }

  .top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
    width: fit-content;
    color: var(--ls-text);
    transition: opacity 0.2s ease;
  }

  .top:hover {
    text-decoration: none;
    opacity: 0.82;
  }

  .brand {
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .kicker {
    font-family: var(--ls-font-mono);
    color: var(--ls-red-bright);
    margin: 0 0 12px;
    font-size: 0.95rem;
  }

  h1 {
    font-size: clamp(2.2rem, 6vw, 4rem);
    margin: 0 0 20px;
    background: linear-gradient(120deg, var(--ls-text), var(--ls-accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    max-width: 640px;
    color: var(--ls-text-dim);
    font-size: 1.1rem;
    margin: 0 0 32px;
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  .btn {
    padding: 10px 22px;
    border-radius: var(--ls-radius-sm);
    border: 1px solid var(--ls-card-border);
    color: var(--ls-text);
    font-weight: 600;
    transition: all 0.25s ease;
  }

  .btn:hover {
    text-decoration: none;
    transform: translateY(-2px);
    background: var(--ls-card-hover);
  }

  .btn.primary {
    background: var(--ls-red);
    border-color: var(--ls-red);
  }

  .btn.primary:hover {
    box-shadow: var(--ls-glow-red);
  }
</style>
