<script>
  import { t, locale } from '@le-space/landing-shared/i18n';
  import { LAYERS } from '@le-space/landing-shared/projects';

  let { project, dimmed = false } = $props();

  let showVideo = $state(false);
  let imgFailed = $state(false);
</script>

<article class="card" class:dimmed>
  <div class="media" class:missing={imgFailed} style="--layer-color: {LAYERS[project.layers[0]].color}">
    {#if project.video && showVideo}
      <!-- svelte-ignore a11y_media_has_caption -->
      <video src={project.video} autoplay loop muted playsinline></video>
    {:else if project.screenshot}
      <img
        src={project.screenshot}
        alt="{project.name} screenshot"
        loading="lazy"
        onmouseenter={() => project.video && (showVideo = true)}
        onerror={() => (imgFailed = true)}
      />
    {/if}
    <div class="placeholder" aria-hidden="true">{project.name}</div>
  </div>

  <div class="body">
    <header>
      <h3>{project.name}</h3>
      <span class="ls-badge status-{project.status}">{project.status}</span>
    </header>

    <div class="layers">
      {#each project.layers as id (id)}
        <span class="ls-badge" style="border-color: {LAYERS[id].color}; color: {LAYERS[id].color}">
          {LAYERS[id].label[$locale] || LAYERS[id].label.en}
        </span>
      {/each}
    </div>

    <!-- Taglines are trusted content from packages/shared/src/data/projects.js (may contain links) -->
    <p class="tagline">{@html project.tagline[$locale] || project.tagline.en}</p>

    {#if project.note}
      <p class="note">→ {project.note[$locale] || project.note.en}</p>
    {/if}

    {#if project.demos && project.demos.some((d) => d.desc)}
      <div class="demo-notes">
        {#each project.demos.filter((d) => d.desc) as d (d.url)}
          <p><span class="dlabel">▶ {d.label}</span> — {d.desc[$locale] || d.desc.en}</p>
        {/each}
      </div>
    {/if}

    <footer>
      {#if project.demos}
        {#each project.demos as d (d.url)}
          <a class="link demo" href={d.url} target="_blank" rel="noopener noreferrer">▶ {d.label}</a>
        {/each}
      {:else if project.demo}
        <a class="link demo" href={project.demo} target="_blank" rel="noopener noreferrer">▶ {$t('projects.demo')}</a>
      {/if}
      <a class="link" href={project.github} target="_blank" rel="noopener noreferrer">{$t('projects.source')}</a>
    </footer>
  </div>
</article>

<style>
  .card {
    background: var(--ls-card);
    border: 1px solid var(--ls-card-border);
    border-radius: var(--ls-radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  .card.dimmed {
    opacity: 0.25;
  }

  .media {
    aspect-ratio: 16 / 9;
    position: relative;
    background:
      radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--layer-color) 22%, transparent), transparent 60%),
      var(--ls-bg-2);
  }

  .media img,
  .media video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .media.missing img {
    display: none;
  }

  .placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--ls-font-mono);
    color: var(--ls-text-faint);
    font-size: 0.9rem;
  }

  .body {
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .status-stable { color: var(--ls-green); border-color: var(--ls-green); }
  .status-beta { color: var(--ls-amber); border-color: var(--ls-amber); }
  .status-prototype { color: var(--ls-text-dim); }
  .status-tutorial { color: var(--ls-accent-2); border-color: var(--ls-accent-2); }

  .layers {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tagline {
    color: var(--ls-text-dim);
    font-size: 0.92rem;
    margin: 0;
    flex: 1;
  }

  .demo-notes {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .demo-notes p {
    margin: 0;
    font-size: 0.82rem;
    color: var(--ls-text-faint);
  }

  .demo-notes .dlabel {
    color: var(--ls-green);
    font-weight: 600;
    white-space: nowrap;
  }

  .tagline :global(a) {
    color: var(--ls-accent);
    text-decoration: underline;
    text-decoration-color: rgba(77, 216, 255, 0.4);
  }

  .note {
    font-size: 0.8rem;
    color: var(--ls-amber);
    margin: 0;
    font-family: var(--ls-font-mono);
  }

  footer {
    display: flex;
    gap: 16px;
    font-size: 0.9rem;
    padding-top: 4px;
  }

  .link.demo {
    color: var(--ls-green);
    font-weight: 600;
  }

</style>
