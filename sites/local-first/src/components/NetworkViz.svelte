<script>
  /**
   * Animated P2P network: browser peers connect through a small mesh of
   * relays, then form direct browser-to-browser links (hole punch), with
   * data packets pulsing along the edges. Hover a node to see its name.
   */
  import { onMount } from 'svelte';

  let { height = 440 } = $props();

  let canvas = $state();

  // Names shown on hover (ecosystem nodes)
  const RELAY_NAMES = ['orbitdb-relay', 'relay-button', 'aleph relay'];
  const PEER_NAMES = [
    'uc-go-peer',
    'ucan-store',
    'simple-todo',
    'uc-rust-peer',
    'orbit-blog',
    'p2pass',
    'webauthn-did'
  ];

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
      text: css('--ls-text-dim') || '#9aa5b8',
      tipText: css('--ls-text') || '#e8ecf4',
      tipBg: css('--ls-bg-2') || '#111827',
      tipBorder: css('--ls-card-border') || 'rgba(255,255,255,.14)'
    };

    let relays = [];
    let peers = [];
    let packets = [];
    let directLinks = [];
    const mouse = { x: -1, y: -1, node: null };

    function layout() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w / 2;
      const cy = h * 0.44;
      const spread = Math.min(w * 0.17, 135);

      // A small relay mesh: one in the middle + two flanking below.
      relays = [
        { x: cx, y: cy - h * 0.05, r: 15 },
        { x: cx - spread, y: cy + h * 0.12, r: 14 },
        { x: cx + spread, y: cy + h * 0.12, r: 14 }
      ].map((rel, i) => ({ ...rel, kind: 'relay', name: RELAY_NAMES[i] }));

      const n = w < 600 ? 5 : 7;
      const rx = Math.min(w * 0.4, 360);
      const ry = h * 0.4;
      peers = Array.from({ length: n }, (_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const p = {
          x: cx + Math.cos(angle) * rx,
          y: cy + Math.sin(angle) * ry * 0.9,
          r: 10,
          phase: Math.random() * Math.PI * 2,
          kind: 'peer',
          name: PEER_NAMES[i % PEER_NAMES.length]
        };
        // assign each peer to its nearest relay
        p.relay = relays.reduce((best, rel) =>
          dist(p, rel) < dist(p, best) ? rel : best, relays[0]);
        return p;
      });
      directLinks = [];
      packets = [];
    }

    function dist(a, b) {
      return Math.hypot(a.x - b.x, a.y - b.y);
    }

    function spawnPacket() {
      const r = Math.random();
      if (directLinks.length && r < 0.35) {
        const [a, b] = directLinks[Math.floor(Math.random() * directLinks.length)];
        packets.push({ path: [peers[a], peers[b]], seg: 0, t: 0, color: COLORS.direct });
      } else if (r < 0.5) {
        // relay <-> relay chatter
        const i = Math.floor(Math.random() * relays.length);
        let j = Math.floor(Math.random() * relays.length);
        if (j === i) j = (i + 1) % relays.length;
        packets.push({ path: [relays[i], relays[j]], seg: 0, t: 0, color: COLORS.relay });
      } else {
        // peer -> relay(s) -> peer (multi-hop across the mesh if relays differ)
        const a = peers[Math.floor(Math.random() * peers.length)];
        let b = peers[Math.floor(Math.random() * peers.length)];
        if (a === b) b = peers[(peers.indexOf(a) + 1) % peers.length];
        const path = a.relay === b.relay
          ? [a, a.relay, b]
          : [a, a.relay, b.relay, b];
        packets.push({ path, seg: 0, t: 0, color: COLORS.peer });
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

    function line(a, b, color, alpha, dash = [], width = 1.2) {
      ctx.beginPath();
      ctx.setLineDash(dash);
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
    }

    function node(p, color, t, isRelay = false) {
      const hovered = mouse.node === p;
      const pulse = 1 + 0.08 * Math.sin(t / 600 + (p.phase || 0));
      const r = p.r * pulse * (hovered ? 1.15 : 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = hovered ? 0.32 : 0.18;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (isRelay) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = hovered ? 0.7 : 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    function tooltip(p) {
      const label = p.kind === 'relay' ? `${p.name} · relay` : p.name;
      ctx.font = '600 12px ui-monospace, Menlo, monospace';
      const padX = 9;
      const tw = ctx.measureText(label).width;
      const bw = tw + padX * 2;
      const bh = 24;
      let bx = p.x - bw / 2;
      let by = p.y - p.r - bh - 10;
      bx = Math.max(6, Math.min(w - bw - 6, bx));
      if (by < 6) by = p.y + p.r + 10;

      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 7);
      else ctx.rect(bx, by, bw, bh);
      ctx.fillStyle = COLORS.tipBg;
      ctx.globalAlpha = 0.96;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      ctx.strokeStyle = p.kind === 'relay' ? COLORS.relay : COLORS.peer;
      ctx.stroke();

      ctx.fillStyle = COLORS.tipText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, bx + bw / 2, by + bh / 2 + 1);
      ctx.textBaseline = 'alphabetic';
    }

    function hitTest() {
      let found = null;
      for (const p of [...relays, ...peers]) {
        if (dist(mouse, p) <= p.r + 8) { found = p; break; }
      }
      mouse.node = found;
      canvas.style.cursor = found ? 'pointer' : 'default';
    }

    let lastPacket = 0;
    let lastPunch = 0;

    function frame(t) {
      ctx.clearRect(0, 0, w, h);

      // relay mesh
      for (let i = 0; i < relays.length; i++)
        for (let j = i + 1; j < relays.length; j++)
          line(relays[i], relays[j], COLORS.relay, 0.3, [], 1.6);
      // peer -> relay links
      for (const p of peers) line(p, p.relay, COLORS.peer, 0.2);
      // direct links
      for (const [a, b] of directLinks) line(peers[a], peers[b], COLORS.direct, 0.5, [4, 4]);

      // packets
      for (const pk of packets) {
        pk.t += 0.02;
        if (pk.t >= 1) {
          pk.seg += 1;
          pk.t = 0;
          if (pk.seg >= pk.path.length - 1) { pk.done = true; continue; }
        }
        const a = pk.path[pk.seg];
        const b = pk.path[pk.seg + 1];
        const x = a.x + (b.x - a.x) * pk.t;
        const y = a.y + (b.y - a.y) * pk.t;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = pk.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = pk.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      packets = packets.filter((p) => !p.done);

      for (const rel of relays) node(rel, COLORS.relay, t, true);
      for (const p of peers) node(p, COLORS.peer, t);

      // static label under the mesh
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillStyle = COLORS.text;
      ctx.textAlign = 'center';
      ctx.fillText('relay mesh — on demand', w / 2, h * 0.44 + h * 0.12 + 34);

      // hover tooltip on top
      if (mouse.node) tooltip(mouse.node);

      if (t - lastPacket > 480) { spawnPacket(); lastPacket = t; }
      if (t - lastPunch > 2600) { maybeHolePunch(); lastPunch = t; }

      raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      hitTest();
    }
    function onLeave() {
      mouse.x = mouse.y = -1;
      mouse.node = null;
      canvas.style.cursor = 'default';
    }

    layout();
    raf = requestAnimationFrame(frame);
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
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
