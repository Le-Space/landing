<script>
  /**
   * The starfield behind every page.
   *
   * It existed before, but drifted at 0.02–0.1 px per frame — three to six
   * pixels a second, so a star needed two to five minutes to cross the screen
   * and the field read as frozen. It now moves fast enough to be seen.
   *
   * Two things it did not do, and now does:
   *  - honour prefers-reduced-motion: drifting specks can make motion-sensitive
   *    readers ill, so that setting gets one static frame and no timer at all
   *  - follow the theme: the colour was hard-coded to near-white, invisible on
   *    the light background. It comes from --ls-text and is re-read when the
   *    theme changes.
   *
   * `comets` is off by default. On local-first the hero already runs the
   * network visualisation, and two competing animations on one screen is one
   * too many.
   */
  import { onMount } from 'svelte';

  let { density = 90, comets = false } = $props();

  let canvas = $state();

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let w;
    let h;
    let raf;
    let stars = [];
    let comet = null;
    let nextComet = 0;
    let ink = '232, 236, 244';

    /** Star colour from the active theme, as an "r, g, b" string. */
    function readInk() {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--ls-text')
        .trim()
        .replace('#', '');
      if (hex.length !== 6) return ink;
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
      return `${r}, ${g}, ${b}`;
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function init() {
      stars = Array.from({ length: density }, () => {
        // Bigger stars drift slower. That parallax is what makes a flat field
        // read as depth, and it costs nothing.
        const r = Math.random() * 1.4 + 0.3;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vy: (1.6 - r * 0.6) * (Math.random() * 0.35 + 0.25),
          drift: (Math.random() - 0.5) * 0.12,
          tw: Math.random() * Math.PI * 2
        };
      });
    }

    function spawnComet() {
      // Always heading down-right, entering from the top or the left. One that
      // appears from a random edge reads as a glitch rather than an event.
      const fromTop = Math.random() > 0.4;
      comet = {
        x: fromTop ? Math.random() * w * 0.7 : -60,
        y: fromTop ? -40 : Math.random() * h * 0.5,
        vx: 7 + Math.random() * 4,
        vy: 3 + Math.random() * 2
      };
    }

    function drawStars(t) {
      for (const s of stars) {
        const alpha = 0.35 + 0.35 * Math.sin(t / 900 + s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ink}, ${alpha})`;
        ctx.fill();
      }
    }

    function drawComet() {
      comet.x += comet.vx;
      comet.y += comet.vy;

      const tail = 26;
      const grad = ctx.createLinearGradient(
        comet.x,
        comet.y,
        comet.x - comet.vx * tail,
        comet.y - comet.vy * tail
      );
      grad.addColorStop(0, `rgba(${ink}, 0.85)`);
      grad.addColorStop(1, `rgba(${ink}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(comet.x, comet.y);
      ctx.lineTo(comet.x - comet.vx * tail, comet.y - comet.vy * tail);
      ctx.stroke();
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.y -= s.vy;
        s.x += s.drift;
        if (s.y < -2) {
          s.y = h + 2;
          s.x = Math.random() * w;
        }
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;
      }
      drawStars(t);

      if (comets) {
        if (!comet && t > nextComet) spawnComet();
        if (comet) {
          drawComet();
          if (comet.x > w + 200 || comet.y > h + 200) {
            comet = null;
            // Rare on purpose. Constant motion is tuned out; something that
            // happens now and then is what a reader actually notices.
            nextComet = t + 20000 + Math.random() * 20000;
          }
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      ink = readInk();
      resize();
      init();

      if (reduced.matches) {
        // One frame, then nothing: the field is decoration, not information.
        drawStars(0);
        return;
      }
      nextComet = performance.now() + 4000;
      raf = requestAnimationFrame(frame);
    }

    start();

    const onResize = () => start();
    window.addEventListener('resize', onResize);
    reduced.addEventListener('change', start);

    // The theme toggle rewrites data-theme on <html>; the stars have to follow
    // or they disappear into the background they were drawn for.
    const themeWatcher = new MutationObserver(() => {
      ink = readInk();
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      reduced.removeEventListener('change', start);
      themeWatcher.disconnect();
    };
  });
</script>

<canvas bind:this={canvas} class="particles" aria-hidden="true"></canvas>

<style>
  .particles {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
</style>
