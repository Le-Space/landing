<script>
  import { t } from '@le-space/landing-shared/i18n';
  import { siteConfig } from '@le-space/landing-shared/site-config';
  import ParticlesBackground from '@le-space/landing-shared/components/ParticlesBackground.svelte';
  import LeSpaceLogo from '@le-space/landing-shared/components/LeSpaceLogo.svelte';
  import SocialIcons from '@le-space/landing-shared/components/SocialIcons.svelte';
  import LegalModals from '@le-space/landing-shared/components/LegalModals.svelte';

  let showImprint = $state(false);
  let showPrivacy = $state(false);

  // Extend this list as more products go live
  const products = [
    { name: 'local-first', url: siteConfig.urls.localFirst, desc: 'Local-First P2P Stack' }
  ];
</script>

<ParticlesBackground density={130} />

<main>
  <div class="center">
    <LeSpaceLogo size={140} />
    <h1>Le-Space</h1>
    <p class="tagline">{$t('tagline')}</p>

    <nav class="products">
      {#each products as p (p.name)}
        <a class="product" href={p.url}>
          <span class="name">{p.name}.le-space.de</span>
          <span class="desc">{p.desc}</span>
        </a>
      {/each}
    </nav>

    <div class="socials">
      <SocialIcons />
    </div>
  </div>

  <footer>
    <a href="mailto:{siteConfig.email.contact}">{siteConfig.email.contact}</a>
    <button class="legal" onclick={() => (showImprint = true)}>Impressum</button>
    <button class="legal" onclick={() => (showPrivacy = true)}>Datenschutz</button>
  </footer>
</main>

<LegalModals bind:showImprint bind:showPrivacy />

<style>
  main {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  h1 {
    font-size: clamp(2.4rem, 6vw, 3.6rem);
    margin: 12px 0 0;
    letter-spacing: 0.12em;
  }

  .tagline {
    color: var(--ls-text-dim);
    font-family: var(--ls-font-mono);
    margin: 0 0 28px;
  }

  .products {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(420px, 90vw);
  }

  .product {
    display: flex;
    flex-direction: column;
    padding: 16px 22px;
    background: var(--ls-card);
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    color: var(--ls-text);
    transition: all 0.25s ease;
  }

  .product:hover {
    text-decoration: none;
    transform: translateY(-2px);
    border-color: var(--ls-accent);
    box-shadow: var(--ls-glow-accent);
  }

  .product .name {
    font-weight: 700;
    font-family: var(--ls-font-mono);
  }

  .product .desc {
    color: var(--ls-text-dim);
    font-size: 0.88rem;
  }

  .socials {
    margin-top: 32px;
  }

  footer {
    position: absolute;
    bottom: 20px;
    display: flex;
    gap: 20px;
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
</style>
