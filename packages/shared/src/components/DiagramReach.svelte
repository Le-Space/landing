<script>
  /**
   * The connectivity ladder, as the FAQ shows it: without the row naming what
   * Le Space sells on each rung. That row is for the pitch decks.
   *
   * The picture itself lives in ../diagrams/reach-svg.js, because the decks are
   * static HTML built by a node script and cannot mount a component. This is
   * the thin end of that shared source.
   */
  import { locale } from '../i18n.js';
  import { reachSvg } from '../diagrams/reach-svg.js';

  const svg = $derived(reachSvg($locale));
</script>

<figure class="wrap">
  <!-- The markup carries its own <style>, all of it scoped to the svg id. -->
  {@html svg}
</figure>

<style>
  .wrap {
    margin: 16px 0 0;
  }
</style>
