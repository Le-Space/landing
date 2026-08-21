<script>
  /**
   * The announcement above the fold, one item at a time.
   *
   * **Rolls vertically, and stops.** Not a marquee: text sliding sideways
   * cannot be read while it moves, so a reader either catches it or does not.
   * This works like the split-flap boards in old railway stations - the line
   * rolls up, settles with a small overshoot, and then holds long enough to be
   * read before the next one comes round.
   *
   * Three things that a rotating announcement gets wrong unless they are
   * deliberate:
   *
   * - **It stops when somebody is reading it.** Hover or focus holds the
   *   current item, so a link never moves out from under the pointer.
   * - **Only the visible item is reachable.** The others are `aria-hidden` and
   *   out of the tab order; otherwise a keyboard user tabs into links they
   *   cannot see and a screen reader announces the whole list as one sentence.
   * - **`prefers-reduced-motion` turns it into a list.** Motion somebody has
   *   asked not to see is not worth the cleverness, and the content is short
   *   enough to simply show.
   */
  import { onMount } from 'svelte';
  import { locale } from '../i18n.js';
  import { news, formatNewsDate } from '../data/news.js';

  /**
   * `align` because the two sites lay out differently: local-first stacks the
   * hero to the left, le-space.de centres everything. A component that decided
   * this for itself would be right on one of them.
   */
  let { dwell = 7000, label = 'News', align = 'start' } = $props();

  const alignment = $derived(align === 'center' ? 'center' : 'flex-start');

  let index = $state(0);
  let paused = $state(false);
  let still = $state(false);
  /** The tallest item, so the roll moves by exactly one line-block. */
  let height = $state(0);
  let items = $state([]);

  const current = $derived(news[index]);

  onMount(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const readMotion = () => { still = motion.matches; };

    readMotion();
    motion.addEventListener('change', readMotion);

    // Measured rather than guessed: the two languages wrap differently, and so
    // does a phone. A fixed height would clip German or leave a gap in English.
    const measure = () => {
      // `scrollHeight`, not `offsetHeight`: once the board is clipping to the
      // measured height, every slot *is* that height and the measurement can
      // never grow again. The first attempt measured 75px - one item's worth of
      // a two-line box that wanted three - and then locked itself there,
      // showing the date and cutting the sentence off.
      height = Math.max(0, ...items.filter(Boolean).map(el => el.scrollHeight));
    };

    measure();

    // Fonts land after the first measurement and change how the sentence wraps.
    document.fonts?.ready.then(measure).catch(() => {});

    const observer = new ResizeObserver(measure);
    for (const el of items) if (el) observer.observe(el);

    return () => {
      motion.removeEventListener('change', readMotion);
      observer.disconnect();
    };
  });

  $effect(() => {
    // `index` is read here on purpose. Setting it inside the timeout does not
    // make it a dependency - the effect would run once, advance to the second
    // item and never schedule again, which is exactly what the first version
    // did: it rolled one line and stopped there.
    index;

    if (still || paused || news.length < 2) return;

    const timer = setTimeout(() => { index = (index + 1) % news.length; }, dwell);
    return () => clearTimeout(timer);
  });
</script>

{#if still}
  <!-- No motion asked for, so none: both lines, plainly. -->
  <ul class="stack" aria-label={label} style:align-self={alignment}>
    {#each news as item (item.id)}
      <li>
        <a class="whatsnew" href={item.href}>
          <span class="date">{formatNewsDate(item.date, $locale)}</span>
          <span class="what">{item.text[$locale] ?? item.text.en}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="board"
    role="region"
    aria-label={label}
    style:align-self={alignment}
    style:height={height ? `${height}px` : null}
    onmouseenter={() => { paused = true; }}
    onmouseleave={() => { paused = false; }}
    onfocusin={() => { paused = true; }}
    onfocusout={() => { paused = false; }}
  >
    <div class="track" style:transform={height ? `translateY(-${index * height}px)` : null}>
      {#each news as item, i (item.id)}
        <div class="slot" bind:this={items[i]} aria-hidden={i === index ? null : 'true'}>
          <a class="whatsnew" href={item.href} tabindex={i === index ? null : -1}>
            <span class="date">{formatNewsDate(item.date, $locale)}</span>
            <span class="what">{item.text[$locale] ?? item.text.en}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .board {
    overflow: hidden;
    margin-bottom: 18px;
    /* Until the first measurement lands there is no height to clip to, and a
       zero-height board would flash empty. One line is close enough for the
       frame it takes. */
    min-height: 2.6rem;
  }

  .track {
    display: flex;
    flex-direction: column;
    /* The overshoot is the point: it arrives, goes a little past, and settles -
       which is what a mechanical board does and what makes it read as arriving
       rather than as sliding. */
    transition: transform 620ms cubic-bezier(0.22, 0.9, 0.3, 1.12);
  }

  .slot {
    display: flex;
    align-items: flex-start;
    /* Never shrink to the track's height: a flex column would compress the
       taller item to fit, and then it is measured at the compressed size. */
    flex: none;
  }

  .stack {
    list-style: none;
    margin: 0 0 18px;
    padding: 0;
    display: grid;
    gap: 8px;
    justify-items: center;
  }

  .whatsnew {
    display: inline-flex;
    /* The sentence is long enough to wrap; the date then stays on the first
       line with the text rather than floating beside a two-line block. */
    align-items: flex-start;
    gap: 10px;
    max-width: 640px;
    padding: 7px 16px 7px 10px;
    line-height: 1.45;
    border: 1px solid color-mix(in srgb, var(--ls-green) 45%, transparent);
    border-radius: 16px;
    background: color-mix(in srgb, var(--ls-green) 10%, transparent);
    color: var(--ls-text-dim);
    font-size: 0.85rem;
    width: fit-content;
    /* The box may be centred on the page; the sentence inside it is still a
       sentence. Inherited centring leaves the last line floating under the
       others, which reads as a poster rather than as a line of news. */
    text-align: left;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .whatsnew:hover {
    text-decoration: none;
    border-color: var(--ls-green);
    background: color-mix(in srgb, var(--ls-green) 16%, transparent);
  }

  .date {
    flex: none;
    padding: 1px 9px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--ls-green) 22%, transparent);
    color: var(--ls-green);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .arrow {
    flex: none;
    color: var(--ls-green);
  }

  .whatsnew:hover .what {
    color: var(--ls-text);
  }

  @media (max-width: 640px) {
    .whatsnew {
      /* A long date and a long sentence do not share a line on a phone. */
      flex-direction: column;
      gap: 6px;
    }
  }
</style>
