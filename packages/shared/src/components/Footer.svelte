<script>
  import { siteConfig } from '../site-config.js';
  import { buildStamp } from '../build-info.js';
  import { t, locale } from '../i18n.js';
  import SocialIcons from './SocialIcons.svelte';
  import LegalModals from './LegalModals.svelte';
  import TalksModal from './TalksModal.svelte';
  import { talks } from '../data/talks.js';

  let showImprint = $state(false);
  let showPrivacy = $state(false);
  /** The conference whose details are open, or null. */
  let openTalk = $state(null);

  const email = $derived($locale === 'de' ? siteConfig.email.contact : siteConfig.email.contactEn);
</script>

<footer class="footer">
  <div class="ls-container inner">
    <div class="left">
      <strong>Le-Space</strong>
      <span class="dim">Local-first peer-to-peer stack</span>
      <a href="mailto:{email}">{email}</a>
      <span class="dim small">
        {siteConfig.legal.registerCourt} · {siteConfig.legal.register} · USt-ID {siteConfig.legal.vatId}
      </span>

      <!-- Where we have shown up. One line, because five of the six are
           attendances; the FOSDEM entry is the one with a recording. -->
      <div class="talks">
        <span class="dim small">{$t('footer.talks', 'Conferences & talks')}</span>
        <span class="talk-list">
          {#each talks as entry, i (entry.id)}
            <button
              class="talk"
              class:has-video={!!entry.talk}
              onclick={() => (openTalk = entry)}
              title={`${entry.city} · ${entry.when[$locale] || entry.when.en}`}
            >
              {entry.name}{#if entry.talk}<span class="play" aria-hidden="true">▶</span>{/if}
            </button>{#if i < talks.length - 1}<span class="sep" aria-hidden="true">·</span>{/if}
          {/each}
        </span>
      </div>
    </div>
    <div class="right">
      <SocialIcons />
      <div class="links">
        <button class="legal" onclick={() => (showImprint = true)}>{$t('footer.imprint', 'Impressum')}</button>
        <button class="legal" onclick={() => (showPrivacy = true)}>{$t('footer.privacy', 'Datenschutz')}</button>
      </div>
      <!-- Version, commit and build date: enough to tell whether the page you
           are looking at is the deploy you just pushed. -->
      <span class="build" title="Version · commit · build date">{buildStamp}</span>
    </div>
  </div>
</footer>

<LegalModals bind:showImprint bind:showPrivacy />
<TalksModal bind:talk={openTalk} />

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

  .talks {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .talk-list {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 6px;
    font-size: 0.78rem;
  }

  .talk {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: var(--ls-text-dim);
    cursor: pointer;
    border-bottom: 1px dotted transparent;
  }

  .talk:hover,
  .talk:focus-visible {
    color: var(--ls-text);
    border-bottom-color: var(--ls-card-border);
  }

  /* The one with a recording earns the accent; the rest are appearances. */
  .talk.has-video {
    color: var(--ls-accent);
  }

  .talk.has-video:hover,
  .talk.has-video:focus-visible {
    color: var(--ls-accent);
    border-bottom-color: var(--ls-accent);
  }

  .play {
    margin-left: 4px;
    font-size: 0.62rem;
  }

  .sep {
    color: var(--ls-text-faint);
  }

  .build {
    font-family: var(--ls-font-mono);
    font-size: 0.7rem;
    color: var(--ls-text-faint);
    letter-spacing: 0.02em;
  }

</style>
