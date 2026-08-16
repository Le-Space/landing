<script>
  import { t } from '@le-space/landing-shared/i18n';
  import { siteConfig } from '@le-space/landing-shared/site-config';
  import LeSpaceLogo from '@le-space/landing-shared/components/LeSpaceLogo.svelte';
  import NetworkViz from '@le-space/landing-shared/components/NetworkViz.svelte';
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
    <!-- Announces one thing, above everything else, and can be removed later
         without leaving a gap. Green because that is already the colour of a
         working demo on the project cards. -->
    <a class="whatsnew" href="https://qr01.le-space.de">
      <span class="tag">{$t('hero.badge_new')}</span>
      <span class="what">{$t('hero.badge_text')}</span>
      <span class="arrow" aria-hidden="true">→</span>
    </a>

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

  .whatsnew {
    display: inline-flex;
    /* The sentence is long enough to wrap; the tag then stays on the first
       line with the text rather than floating beside a two-line block. */
    align-items: flex-start;
    gap: 10px;
    align-self: flex-start;
    max-width: 640px;
    margin-bottom: 18px;
    padding: 7px 16px 7px 7px;
    line-height: 1.45;
    border: 1px solid color-mix(in srgb, var(--ls-green) 45%, transparent);
    border-radius: 16px;
    background: color-mix(in srgb, var(--ls-green) 10%, transparent);
    color: var(--ls-text-dim);
    font-size: 0.85rem;
    width: fit-content;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .whatsnew:hover {
    text-decoration: none;
    border-color: var(--ls-green);
    background: color-mix(in srgb, var(--ls-green) 16%, transparent);
  }

  .whatsnew .tag {
    flex: none;
    background: var(--ls-green);
    color: var(--ls-bg-0);
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    padding: 2px 9px;
    border-radius: 999px;
  }

  .whatsnew .arrow {
    flex: none;
    color: var(--ls-green);
  }

  .whatsnew:hover .what {
    color: var(--ls-text);
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
