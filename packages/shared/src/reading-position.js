/**
 * Keep the reader's place across a re-render that changes text length.
 *
 * Switching language re-renders every string on the page. German runs longer
 * than English, so everything below the switch point shifts by a few hundred
 * pixels — keeping `scrollY` alone would hold the scrollbar still while the
 * paragraph being read slides away. Instead we remember *which element* the
 * reader is looking at and where it sat in the viewport, then put it back
 * there afterwards.
 */

/** Probe a quarter down the viewport: roughly where the eye sits while reading. */
const PROBE_RATIO = 0.25;

/**
 * @returns {{ id: string, top: number } | null} null when nothing identifiable
 * is under the probe — the caller then simply leaves the scroll position alone,
 * which is already correct for a page whose height did not change.
 */
export function captureReadingAnchor() {
  if (typeof document === 'undefined') return null;

  const x = Math.floor(window.innerWidth / 2);
  const y = Math.floor(window.innerHeight * PROBE_RATIO);

  let el = document.elementFromPoint(x, y);
  while (el && !el.id) el = el.parentElement;
  if (!el?.id) return null;

  return { id: el.id, top: el.getBoundingClientRect().top };
}

/**
 * Scroll so the captured element sits at its old viewport offset again. Must be
 * called after the DOM has updated (`await tick()`), or it measures the old
 * layout and does nothing useful.
 *
 * @param {{ id: string, top: number } | null} anchor
 */
export function restoreReadingAnchor(anchor) {
  if (!anchor || typeof document === 'undefined') return;

  const el = document.getElementById(anchor.id);
  if (!el) return;

  const delta = el.getBoundingClientRect().top - anchor.top;
  if (Math.abs(delta) < 1) return;

  // Instant, not smooth: this is a correction the reader should never perceive
  // as movement, and a smooth scroll here reads as the page jumping on its own.
  window.scrollBy({ top: delta, behavior: 'instant' });
}
