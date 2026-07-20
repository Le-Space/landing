<script>
  /**
   * Placeholder logo mark — swap the inner SVG with the official
   * Le-Space logo asset when available.
   */
  let { size = 72, glow = true } = $props();
</script>

<div class="logo" style="width:{size}px;height:{size}px" class:glow>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Le-Space">
    <circle cx="50" cy="50" r="34" fill="none" stroke="var(--ls-red)" stroke-width="5" />
    <ellipse cx="50" cy="50" rx="48" ry="16" fill="none" stroke="var(--ls-accent)" stroke-width="2.5" transform="rotate(-18 50 50)" />
    <circle cx="50" cy="50" r="9" fill="var(--ls-red)" />
    <circle cx="88" cy="36" r="4" fill="var(--ls-accent)" />
  </svg>
</div>

<style>
  .logo :global(svg) {
    width: 100%;
    height: 100%;
  }

  .glow {
    filter: drop-shadow(0 0 18px rgba(230, 57, 70, 0.45));
  }
</style>
