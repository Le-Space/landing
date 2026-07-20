<script>
  import { siteConfig } from '../site-config.js';
  import { t, toggleLocale, locale } from '../i18n.js';
  import SocialIcons from './SocialIcons.svelte';
</script>

<footer class="footer">
  <div class="ls-container inner">
    <div class="left">
      <strong>Le-Space</strong>
      <span class="dim">Local-first peer-to-peer software</span>
      <a href="mailto:{siteConfig.email.contact}">{siteConfig.email.contact}</a>
    </div>
    <div class="right">
      <SocialIcons />
      <div class="links">
        <a href={siteConfig.legal.imprintUrl}>{$t('footer.imprint', 'Impressum')}</a>
        <a href={siteConfig.legal.privacyUrl}>{$t('footer.privacy', 'Datenschutz')}</a>
        <button class="lang" onclick={toggleLocale}>{$locale === 'en' ? 'DE' : 'EN'}</button>
      </div>
    </div>
  </div>
</footer>

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

  .lang {
    background: none;
    border: 1px solid var(--ls-card-border);
    color: var(--ls-text-dim);
    border-radius: 6px;
    padding: 2px 8px;
    cursor: pointer;
    font-family: var(--ls-font-mono);
  }

  .lang:hover {
    color: var(--ls-text);
  }
</style>
