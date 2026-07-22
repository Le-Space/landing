<script>
  import { t, locale } from '@le-space/landing-shared/i18n';
  import { faq } from '@le-space/landing-shared/faq';

  let open = $state(null);

  function toggle(id) {
    open = open === id ? null : id;
  }
</script>

<section id="faq" class="ls-section">
  <div class="ls-container">
    <h2 class="ls-section-title">{$t('faq.title')}</h2>
    <p class="ls-section-sub">{$t('faq.sub')}</p>

    <div class="items">
      {#each faq as item (item.id)}
        <div class="item" class:open={open === item.id}>
          <button
            class="question"
            onclick={() => toggle(item.id)}
            aria-expanded={open === item.id}
            aria-controls="faq-{item.id}"
          >
            <span>{item.q[$locale] || item.q.en}</span>
            <span class="chevron" aria-hidden="true">{open === item.id ? '−' : '+'}</span>
          </button>
          {#if open === item.id}
            <div class="answer" id="faq-{item.id}">
              {@html item.a[$locale] || item.a.en}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 820px;
  }

  .item {
    background: var(--ls-card);
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    transition: border-color 0.25s ease, background 0.25s ease;
  }

  .item:hover,
  .item.open {
    border-color: var(--ls-accent);
    background: var(--ls-card-hover);
  }

  .question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px 22px;
    background: none;
    border: none;
    color: var(--ls-text);
    font-family: var(--ls-font);
    font-size: 1.02rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
  }

  .chevron {
    color: var(--ls-accent);
    font-size: 1.3rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .answer {
    padding: 0 22px 18px;
    color: var(--ls-text-dim);
    font-size: 0.95rem;
  }

  .answer :global(p) {
    margin: 0 0 10px;
  }

  .answer :global(ol),
  .answer :global(ul) {
    margin: 0 0 10px;
    padding-left: 22px;
  }

  .answer :global(li) {
    margin-bottom: 4px;
  }

  .answer :global(strong) {
    color: var(--ls-text);
  }

  .answer :global(code) {
    font-family: var(--ls-font-mono);
    font-size: 0.85em;
    background: rgba(255, 255, 255, 0.07);
    padding: 1px 5px;
    border-radius: 4px;
  }

  .answer :global(a) {
    word-break: break-word;
  }
</style>
