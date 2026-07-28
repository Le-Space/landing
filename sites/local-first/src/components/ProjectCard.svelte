<script>
  import { onMount } from 'svelte';
  import { t, locale } from '@le-space/landing-shared/i18n';
  import { LAYERS, STATUS } from '@le-space/landing-shared/projects';

  let { project, dimmed = false } = $props();

  let showVideo = $state(false);
  let imgFailed = $state(false);

  // Chapter slideshow: demos that ship a screenshot are cross-faded in the
  // media box. Hovering (or long-pressing) a chapter link pins its frame, so
  // the picture answers "what does this chapter look like?" on demand. This is
  // why these are four images and not one animated GIF — a GIF can neither be
  // paused nor seeked to a given frame from script.
  const shots = $derived((project.demos ?? []).filter((d) => d.shot));
  let slide = $state(0);
  let pinned = $state(null);
  const shown = $derived(pinned ?? slide);
  let pressTimer;

  const SLIDE_MS = 3600;

  $effect(() => {
    if (shots.length < 2 || pinned !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => (slide = (slide + 1) % shots.length), SLIDE_MS);
    return () => clearInterval(id);
  });

  /** Pin a frame and make it the point the rotation resumes from. */
  function pin(i) {
    pinned = i;
    slide = i;
  }

  function unpin() {
    clearTimeout(pressTimer);
    pinned = null;
  }

  // Touch has no hover, so a long press stands in for it.
  function longPressStart(i) {
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => pin(i), 350);
  }

  // Address shown in the frame's chrome: the demo the picture actually shows,
  // falling back to whatever URL the card leads to.
  const host = (url) => {
    try {
      return new URL(url).host;
    } catch {
      return '';
    }
  };
  const hasShot = $derived(shots.length > 0 || (!!project.screenshot && !imgFailed));
  // `shotHost` exists for pictures taken somewhere other than the project's own
  // URL — the Relay Button shot is the panel embedded in Simple Todo, and
  // labelling it with the docs domain would be simply wrong.
  const addr = $derived(
    shots.length
      ? host(shots[shown].url)
      : (project.shotHost ??
        host(project.demo ?? project.docs ?? project.demos?.[0]?.url ?? project.github ?? ''))
  );

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
  <!-- The screenshots use the same palette as this page, so without a frame it
       is unclear where the card stops and the pictured app begins. The browser
       chrome says "this is a different site" and shows which one. -->
  <div class="media" class:missing={imgFailed} style="--layer-color: {LAYERS[project.layers[0]].color}">
    {#if hasShot}
      <div class="chrome" aria-hidden="true">
        <span class="tl"><i></i><i></i><i></i></span>
        <span class="addr">{addr}</span>
      </div>
    {/if}
    <div class="frame" class:framed={hasShot}>
    {#if shots.length}
      {#each shots as d, i (d.url)}
        <img
          class="shot"
          class:visible={i === shown}
          src={d.shot}
          alt="{project.name} — {d.label}"
          loading="lazy"
        />
      {/each}
      <div class="dots" aria-hidden="true">
        {#each shots as d, i (d.url)}
          <span class="dot" class:on={i === shown}></span>
        {/each}
      </div>
      <span class="shot-label" class:pinned={pinned !== null}>{shots[shown].label}</span>
    {:else if project.video && showVideo}
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
  </div>

  <div class="body">
    <header>
      <h3>{project.name}</h3>
      <span class="ls-badge status-{project.status}">
        {STATUS[project.status]?.[$locale] ?? STATUS[project.status]?.en ?? project.status}
      </span>
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
            <p
              onmouseenter={() => d.shot && pin(shots.indexOf(d))}
              onmouseleave={unpin}
              ontouchstart={() => d.shot && longPressStart(shots.indexOf(d))}
              ontouchend={unpin}
              ontouchcancel={unpin}
            >
              <span class="dlabel">▶ {d.label}</span> — {d.desc[$locale] || d.desc.en}
            </p>
          {/each}
        </div>
      {/if}
    </div>

    <footer>
      {#if project.demos}
        {#each project.demos as d, i (d.url)}
          <a
            class="link demo"
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            onmouseenter={() => d.shot && pin(shots.indexOf(d))}
            onmouseleave={unpin}
            onfocus={() => d.shot && pin(shots.indexOf(d))}
            onblur={unpin}
            ontouchstart={() => d.shot && longPressStart(shots.indexOf(d))}
            ontouchend={unpin}
            ontouchcancel={unpin}
          >▶ {d.label}</a>
        {/each}
      {:else if project.demo}
        <a class="link demo" href={project.demo} target="_blank" rel="noopener noreferrer">▶ {$t('projects.demo')}</a>
      {/if}
      {#if project.docs}
        <a class="link docs" href={project.docs} target="_blank" rel="noopener noreferrer">{$t('projects.docs')}</a>
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
    display: flex;
    flex-direction: column;
    padding: 12px 12px 0;
    background:
      radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--layer-color) 22%, transparent), transparent 60%),
      var(--ls-bg-2);
  }

  /* Fake browser chrome. Purely a separator between this page and the pictured
     app — the screenshots share this site's palette and otherwise bleed into it. */
  .chrome {
    flex: none;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 22px;
    padding: 0 9px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: none;
    border-radius: 7px 7px 0 0;
    background: rgba(255, 255, 255, 0.055);
  }

  .tl {
    display: flex;
    gap: 4px;
    flex: none;
  }

  .tl i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
  }

  .addr {
    font-family: var(--ls-font-mono);
    font-size: 0.6rem;
    color: var(--ls-text-faint);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .frame {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  .frame.framed {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0 0 7px 7px;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.55);
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

  .shot {
    opacity: 0;
    transition: opacity 0.55s ease;
    z-index: 1;
  }

  .shot.visible {
    opacity: 1;
    z-index: 2;
  }

  .dots {
    position: absolute;
    z-index: 3;
    left: 10px;
    bottom: 10px;
    display: flex;
    gap: 5px;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.28);
    transition: background 0.3s ease;
  }

  .dot.on {
    background: var(--ls-green);
  }

  .shot-label {
    position: absolute;
    z-index: 3;
    right: 10px;
    bottom: 8px;
    font-family: var(--ls-font-mono);
    font-size: 0.68rem;
    color: var(--ls-text-faint);
    background: rgba(11, 14, 21, 0.72);
    border-radius: 4px;
    padding: 2px 6px;
    transition: color 0.3s ease;
  }

  .shot-label.pinned {
    color: var(--ls-green);
  }

  @media (prefers-reduced-motion: reduce) {
    .shot {
      transition: none;
    }
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
  .status-in-development { color: var(--ls-accent); border-color: var(--ls-accent); }
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

  .tagline :global(code) {
    font-family: var(--ls-font-mono);
    font-size: 0.85em;
    color: var(--ls-text);
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
    flex-wrap: wrap;
    gap: 8px 16px;
    font-size: 0.9rem;
    padding-top: 4px;
  }

  .link.demo {
    color: var(--ls-green);
    font-weight: 600;
  }

  .link.docs {
    color: var(--ls-accent);
    font-weight: 600;
  }

</style>
