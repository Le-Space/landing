<script>
  import { t } from '@le-space/landing-shared/i18n';
  import LeSpaceLogo from '@le-space/landing-shared/components/LeSpaceLogo.svelte';
  import NetworkViz from '@le-space/landing-shared/components/NetworkViz.svelte';
</script>

<section class="hero">
  <div class="ls-container">
    <div class="top">
      <LeSpaceLogo size={64} />
      <span class="brand">Le-Space</span>
    </div>
    <p class="kicker">{$t('hero.kicker')}</p>
    <h1>{$t('hero.title')}</h1>
    <p class="subtitle">{$t('hero.subtitle')}</p>
    <div class="ctas">
      <a class="btn primary" href="#projects">{$t('hero.cta_projects')}</a>
      <a class="btn" href="#faq">{$t('hero.cta_faq')}</a>
      <a class="btn" href="https://github.com/le-space" target="_blank" rel="noopener noreferrer">{$t('hero.cta_github')}</a>
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
