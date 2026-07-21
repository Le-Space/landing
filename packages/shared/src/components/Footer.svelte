<script>
  import { siteConfig } from '../site-config.js';
  import { t, locale } from '../i18n.js';
  import SocialIcons from './SocialIcons.svelte';
  import LegalModals from './LegalModals.svelte';

  let showImprint = $state(false);
  let showPrivacy = $state(false);

  const email = $derived($locale === 'de' ? siteConfig.email.contact : siteConfig.email.contactEn);
</script>

<footer class="footer">
  <div class="ls-container inner">
    <div class="left">
      <strong>Le-Space</strong>
      <span class="dim">Local-first peer-to-peer software</span>
      <a href="mailto:{email}">{email}</a>
      <span class="dim small">
        {siteConfig.legal.registerCourt} · {siteConfig.legal.register} · USt-ID {siteConfig.legal.vatId}
      </span>
    </div>
    <div class="right">
      <SocialIcons />
      <div class="links">
        <button class="legal" onclick={() => (showImprint = true)}>{$t('footer.imprint', 'Impressum')}</button>
        <button class="legal" onclick={() => (showPrivacy = true)}>{$t('footer.privacy', 'Datenschutz')}</button>
      </div>
    </div>
  </div>
</footer>

<LegalModals bind:showImprint bind:showPrivacy />

<style>
  .footer {
    border-top: 1px solid var(--ls-card-border);
    padding: 40px 0;
    position: relative;
    z-index: 1;
    background: var(--ls-bg-1);
  }

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.9rem;
  }

  .dim {
    color: var(--ls-text-dim);
  }

  .small {
    font-size: 0.75rem;
    color: var(--ls-text-faint);
  }

  .legal {
    background: none;
    border: none;
    color: var(--ls-accent);
    cursor: pointer;
    font-size: 0.85rem;
    font-family: var(--ls-font);
    padding: 0;
  }

  .legal:hover {
    text-decoration: underline;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .links {
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 0.85rem;
  }

</style>
