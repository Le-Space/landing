<script>
  /**
   * Animated P2P network: browser peers connect via a relay,
   * then form direct browser-to-browser connections (hole punch),
   * with data packets pulsing along the edges.
   */
  import { onMount } from 'svelte';

  let { height = 420 } = $props();

  let canvas = $state();

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, raf;

    const css = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const COLORS = {
      relay: css('--ls-accent-2') || '#9d7bff',
      peer: css('--ls-accent') || '#4dd8ff',
      direct: css('--ls-green') || '#3ddc97',
      text: css('--ls-text-dim') || '#9aa5b8'
    };

    let peers = [];
    let relay;
    let packets = [];
    let directLinks = [];

    function layout() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      relay = { x: w / 2, y: h * 0.42, r: 16 };
      const n = w < 600 ? 5 : 7;
      peers = Array.from({ length: n }, (_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const rx = Math.min(w * 0.38, 340);
        const ry = h * 0.34;
        return {
          x: relay.x + Math.cos(angle) * rx,
          y: relay.y + Math.sin(angle) * ry,
          r: 10,
          phase: Math.random() * Math.PI * 2
        };
      });
      directLinks = [];
      packets = [];
    }

    function spawnPacket() {
      // via relay, or direct if a direct link exists
      if (directLinks.length && Math.random() < 0.5) {
        const [a, b] = directLinks[Math.floor(Math.random() * directLinks.length)];
        packets.push({ from: peers[a], to: peers[b], t: 0, color: COLORS.direct });
      } else {
        const a = peers[Math.floor(Math.random() * peers.length)];
        let b = peers[Math.floor(Math.random() * peers.length)];
        if (a === b) b = peers[(peers.indexOf(a) + 1) % peers.length];
        packets.push({ from: a, to: relay, next: b, t: 0, color: COLORS.peer });
      }
    }

    function maybeHolePunch() {
      if (directLinks.length >= Math.floor(peers.length / 2)) return;
      const a = Math.floor(Math.random() * peers.length);
      const b = (a + 1 + Math.floor(Math.random() * (peers.length - 1))) % peers.length;
      if (!directLinks.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
        directLinks.push([a, b]);
      }
    }

    function line(a, b, color, alpha, dash = []) {
      ctx.beginPath();
      ctx.setLineDash(dash);
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
    }

    function node(p, color, t, browser = true) {
      const pulse = 1 + 0.08 * Math.sin(t / 600 + (p.phase || 0));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.18;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.55 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (!browser) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    let lastPacket = 0;
    let lastPunch = 0;

    function frame(t) {
      ctx.clearRect(0, 0, w, h);

      // relay links
      for (const p of peers) line(p, relay, COLORS.peer, 0.22);
      // direct links
      for (const [a, b] of directLinks) line(peers[a], peers[b], COLORS.direct, 0.5, [4, 4]);

      // packets
      for (const pk of packets) {
        pk.t += 0.016;
        const seg = pk.t;
        if (seg >= 1) {
          if (pk.next) {
            pk.from = pk.to;
            pk.to = pk.next;
            pk.next = null;
            pk.t = 0;
          } else {
            pk.done = true;
            continue;
          }
        }
        const x = pk.from.x + (pk.to.x - pk.from.x) * pk.t;
        const y = pk.from.y + (pk.to.y - pk.from.y) * pk.t;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = pk.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = pk.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      packets = packets.filter((p) => !p.done);

      node(relay, COLORS.relay, t, false);
      for (const p of peers) node(p, COLORS.peer, t);

      // labels
      ctx.font = '11px monospace';
      ctx.fillStyle = COLORS.text;
      ctx.textAlign = 'center';
      ctx.fillText('relay (on demand)', relay.x, relay.y + 38);

      if (t - lastPacket > 500) { spawnPacket(); lastPacket = t; }
      if (t - lastPunch > 2600) { maybeHolePunch(); lastPunch = t; }

      raf = requestAnimationFrame(frame);
    }

    layout();
    raf = requestAnimationFrame(frame);
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<canvas bind:this={canvas} class="viz" aria-hidden="true"></canvas>

<style>
  .viz {
    width: 100%;
    display: block;
  }
</style>
