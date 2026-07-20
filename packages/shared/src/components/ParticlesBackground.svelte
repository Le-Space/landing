<script>
  import { onMount } from 'svelte';

  let { density = 90 } = $props();

  let canvas = $state();

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const stars = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function init() {
      stars.length = 0;
      for (let i = 0; i < density; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          vy: Math.random() * 0.08 + 0.02,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y -= s.vy;
        if (s.y < -2) s.y = h + 2;
        const alpha = 0.35 + 0.35 * Math.sin(t / 900 + s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 236, 244, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    init();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', () => { resize(); init(); });

    return () => cancelAnimationFrame(raf);
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
