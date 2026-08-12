<script>
  /**
   * Conference detail modal. Opened by click from the footer line, matching the
   * imprint/privacy modals next to it.
   *
   * Deliberately not hover-triggered: a hover has no equivalent on touch, so the
   * whole section would be dead on phones, and it cannot be reached from the
   * keyboard. Click works everywhere and is what the neighbouring footer buttons
   * already do.
   *
   * The FOSDEM recording is a plain file on video.fosdem.org, so it plays in a
   * native <video> element. No third-party player means no tracker — which
   * matters on a page whose headline claim is that it does not carry any.
   */
  import { locale } from '../i18n.js';

  let { talk = $bindable(null) } = $props();

  const close = () => (talk = null);
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) close();
  };
  const onKeydown = (e) => {
    if (e.key === 'Escape') close();
  };

  const t = (value) => (typeof value === 'string' ? value : (value?.[$locale] ?? value?.en ?? ''));
</script>

<svelte:window onkeydown={onKeydown} />

{#if talk}
  <div class="overlay" onclick={onOverlayClick} role="presentation">
    <div class="modal" role="dialog" aria-modal="true" aria-label={talk.name} tabindex="-1">
      <header>
        <div>
          <h3>{talk.name}</h3>
          <p class="where">
            {t(talk.city)}, {t(talk.country)} · {t(talk.when)}
            {#if talk.role === 'talk'}
              <span class="badge">{$locale === 'de' ? 'Vortrag' : 'Talk'}</span>
            {/if}
          </p>
        </div>
        <button class="x" onclick={close} aria-label={$locale === 'de' ? 'Schließen' : 'Close'}
          >×</button
        >
      </header>

      <div class="body">
        {#if talk.talk}
          <p class="talk-title">„{talk.talk.title}"</p>
          <p class="talk-meta">
            {talk.talk.speaker} · {talk.talk.room}
          </p>
          <!-- svelte-ignore a11y_media_has_caption -->
          <video controls preload="metadata" playsinline>
            <source src={talk.talk.video.webm} type="video/webm" />
            <source src={talk.talk.video.mp4} type="video/mp4" />
            <track kind="captions" src={talk.talk.video.captions} srclang="en" label="English" />
          </video>
        {/if}

        <p class="desc">{t(talk.desc)}</p>

        <a class="link" href={talk.url} target="_blank" rel="noopener noreferrer">
          {talk.talk
            ? $locale === 'de'
              ? 'Session bei FOSDEM'
              : 'Session on FOSDEM'
            : $locale === 'de'
              ? 'Zur Konferenz-Website'
              : 'Conference website'} ↗
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal {
    width: min(720px, 100%);
    max-height: 88vh;
    overflow-y: auto;
    background: var(--ls-bg-2);
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px 12px;
    border-bottom: 1px solid var(--ls-card-border);
  }

  h3 {
    margin: 0;
    font-size: 1.15rem;
  }

  .where {
    margin: 4px 0 0;
    font-size: 0.82rem;
    color: var(--ls-text-dim);
  }

  .badge {
    margin-left: 6px;
    border: 1px solid var(--ls-green);
    color: var(--ls-green);
    border-radius: 999px;
    padding: 1px 8px;
    font-family: var(--ls-font-mono);
    font-size: 0.68rem;
  }

  .x {
    background: none;
    border: none;
    color: var(--ls-text-dim);
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    padding: 0 4px;
  }

  .x:hover {
    color: var(--ls-text);
  }

  .body {
    padding: 16px 20px 20px;
  }

  .talk-title {
    margin: 0;
    font-weight: 600;
    color: var(--ls-text);
  }

  .talk-meta {
    margin: 2px 0 12px;
    font-family: var(--ls-font-mono);
    font-size: 0.72rem;
    color: var(--ls-text-faint);
  }

  video {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--ls-radius-sm);
    background: #000;
    display: block;
  }

  .desc {
    margin: 14px 0 0;
    font-size: 0.9rem;
    color: var(--ls-text-dim);
  }

  .link {
    display: inline-block;
    margin-top: 14px;
    font-size: 0.85rem;
    color: var(--ls-accent);
  }
</style>
