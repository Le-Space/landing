<script>
  import { t, locale } from '@le-space/landing-shared/i18n';
  import { LAYERS } from '@le-space/landing-shared/projects';

  let { activeLayer = $bindable(null) } = $props();

  const order = ['identity', 'data', 'sync', 'infra', 'archive'];
</script>

<section id="stack" class="ls-section">
  <div class="ls-container">
    <h2 class="ls-section-title">{$t('stack.title')}</h2>
    <p class="ls-section-sub">{$t('stack.sub')}</p>

    <div class="layers">
      {#each order as id (id)}
        {@const layer = LAYERS[id]}
        <button
          class="layer"
          class:active={activeLayer === id}
          style="--layer-color: {layer.color}"
          onmouseenter={() => (activeLayer = id)}
          onmouseleave={() => (activeLayer = null)}
          onclick={() => (activeLayer = activeLayer === id ? null : id)}
        >
          <span class="dot"></span>
          <span class="name">{$t(`stack.${id}.name`, layer.label[$locale] || layer.label.en)}</span>
          <span class="desc">{$t(`stack.${id}.desc`)}</span>
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  .layers {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .layer {
    display: grid;
    grid-template-columns: 20px 160px 1fr;
    align-items: center;
    gap: 16px;
    text-align: left;
    padding: 18px 22px;
    background: var(--ls-card);
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    color: var(--ls-text);
    cursor: pointer;
    font-family: var(--ls-font);
    font-size: 1rem;
    transition: all 0.25s ease;
  }

  .layer:hover,
  .layer.active {
    border-color: var(--layer-color);
    background: var(--ls-card-hover);
    transform: translateX(6px);
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--layer-color);
    box-shadow: 0 0 12px var(--layer-color);
  }

  .name {
    font-weight: 700;
  }

  .desc {
    color: var(--ls-text-dim);
    font-size: 0.92rem;
  }

  @media (max-width: 640px) {
    .layer {
      grid-template-columns: 16px 1fr;
    }

    .desc {
      grid-column: 2;
    }
  }
</style>
