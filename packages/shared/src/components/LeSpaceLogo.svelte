<script>
  /**
   * Official Le-Space logo mark — "Der erste Knoten" (the first node):
   * a solid coral local node, cyan peer rings and dashed sync links.
   * Source: docs/le-space-brand/logo/svg/le-space-mark-dark.svg
   */
  let { size = 72, glow = true } = $props();
</script>

<div class="logo" style="width:{size}px;height:{size}px" class:glow>
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Le-Space">
    <line x1="42.7" y1="49.96" x2="58.56" y2="34.94" stroke="#58C7F3" stroke-width="4" stroke-linecap="round" />
    <line x1="47.43" y1="63.58" x2="62.8" y2="64.98" stroke="#58C7F3" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 8" />
    <line x1="69.85" y1="38.36" x2="72.41" y2="55.37" stroke="#58C7F3" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6" opacity="0.65" />
    <circle cx="30" cy="62" r="15" fill="#FF6B5B" />
    <circle cx="68" cy="26" r="8" fill="none" stroke="#58C7F3" stroke-width="5" />
    <circle cx="74" cy="66" r="6.5" fill="none" stroke="#58C7F3" stroke-width="4.5" />
    <circle cx="17" cy="21" r="2.6" fill="#58C7F3" opacity="0.55" />
  </svg>
</div>

<style>
  .logo :global(svg) {
    width: 100%;
    height: 100%;
  }

  .glow {
    filter: drop-shadow(0 0 18px rgba(255, 107, 91, 0.45));
  }
</style>
