<script>
  import { onMount } from 'svelte';
  import { t, locale } from '@le-space/landing-shared/i18n';
  import { LAYERS } from '@le-space/landing-shared/projects';

  let { project, dimmed = false } = $props();

  let showVideo = $state(false);
  let imgFailed = $state(false);

  // Overflowing card bodies get a capped height with a soft scrollbar and a
  // slow film-credits auto-scroll (ping-pong, paused while the pointer is over it).
  let scrollEl = $state();
  let autoPaused = $state(false);

  onMount(() => {
    const el = scrollEl;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SPEED = 12; // px/s downwards, credits-style
    const EDGE_PAUSE = 2600; // ms rest at top/bottom
    let raf;
    let dir = 1;
    let wait = EDGE_PAUSE; // initial rest before scrolling starts
    let carry = 0;
    let last = performance.now();

    const step = (t) => {
      const dt = Math.min(t - last, 100);
      last = t;
      const max = el.scrollHeight - el.clientHeight;
      if (max > 8 && !autoPaused) {
        if (wait > 0) {
          wait -= dt;
        } else {
          carry += ((SPEED * dt) / 1000) * dir * (dir < 0 ? 2 : 1);
          if (Math.abs(carry) >= 0.5) {
            el.scrollTop += carry;
            carry = 0;
          }
          if (dir > 0 && el.scrollTop >= max - 1) { dir = -1; wait = EDGE_PAUSE; }
          else if (dir < 0 && el.scrollTop <= 1) { dir = 1; wait = EDGE_PAUSE; }
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });
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

    <div
      class="scrollbody"
      bind:this={scrollEl}
      onpointerenter={() => (autoPaused = true)}
      onpointerleave={() => (autoPaused = false)}
      ontouchstart={() => (autoPaused = true)}
    >
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
    </div>

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

  .scrollbody {
    flex: 1;
    max-height: 260px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* top/bottom padding >= fade height, so resting text sits fully outside the fade */
    padding: 18px 6px 22px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
    /* soft fade at both edges so scrolling text glides out gently */
    mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 18px), transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 16px, #000 calc(100% - 18px), transparent 100%);
  }

  .scrollbody::-webkit-scrollbar {
    width: 5px;
  }

  .scrollbody::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.18);
    border-radius: 999px;
  }

  .scrollbody::-webkit-scrollbar-track {
    background: transparent;
  }

  .tagline {
    color: var(--ls-text-dim);
    font-size: 0.92rem;
    margin: 0;
  }

  .tagline :global(ul) {
    margin: 8px 0 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .tagline :global(li) {
    font-size: 0.88rem;
  }

  .tagline :global(strong) {
    color: var(--ls-text);
    font-weight: 600;
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
