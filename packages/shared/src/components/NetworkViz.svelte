<script>
  /**
   * Reusable animated P2P network visualisation.
   *
   * Baseline: a synthetic relay-mesh animation (peers, relays, packets, hover
   * labels). Optional live mode starts a real browser libp2p node (Aleph
   * bootstrap + pubsub peer discovery) and overlays actually-discovered peers,
   * fading them in on discovery and out on disconnect.
   *
   * Props:
   *   height    number   canvas height in px (default 440)
   *   live      boolean  start libp2p and show real peers (default false)
   *   bootstrap string[] override bootstrap multiaddrs (default: Aleph discovery)
   *   topics    string[] pubsub discovery topics (default: DEFAULT_TOPICS)
   *   maxPeers  number   max real peers drawn (default 10)
   *   webrtc    boolean  enable webRTC transport (default true)
   */
  import { onMount } from 'svelte';

  let {
    height = 440,
    live = false,
    bootstrap = [],
    topics = [],
    maxPeers = 10,
    webrtc = true
  } = $props();

  let canvas = $state();

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

  // Illustrative topics per synthetic peer → a colourful "topic web".
  // Real live peers contribute their actual gossipsub topics on top of this.
  const PEER_TOPICS = {
    'uc-go-peer': ['chat', 'sync'],
    'uc-rust-peer': ['chat', 'sync'],
    'simple-todo': ['todos', 'sync'],
    'ucan-store': ['storage', 'identity'],
    'orbit-blog': ['blog', 'sync'],
    'p2pass': ['identity'],
    'webauthn-did': ['identity']
  };
  const TOPIC_COLORS = ['#4dd8ff', '#9d7bff', '#3ddc97', '#ffb454', '#ff6ac1', '#35d0ba'];
  // Fixed, clearly-distinct colours for the illustrative topics (avoid the
  // relay purple / peer cyan). Unknown live topics fall back to the palette.
  const TOPIC_COLOR_MAP = {
    chat: '#ff6ac1', sync: '#ffb454', identity: '#35d0ba',
    todos: '#4dd8ff', storage: '#9d7bff', blog: '#3ddc97'
  };

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, cx, cy, raf;

    const css = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const COLORS = {
      relay: css('--ls-accent-2') || '#9d7bff',
      peer: css('--ls-accent') || '#4dd8ff',
      direct: css('--ls-green') || '#3ddc97',
      live: css('--ls-green') || '#3ddc97',
      self: css('--ls-red-bright') || '#ff5a5f',
      text: css('--ls-text-dim') || '#9aa5b8',
      tipText: css('--ls-text') || '#e8ecf4',
      tipBg: css('--ls-bg-2') || '#111827'
    };

    // Long protocol topic names → short display labels.
    const shortTopic = (topic) =>
      /_peer-discovery\./.test(topic) ? 'discovery' : topic.length > 14 ? `${topic.slice(0, 12)}…` : topic;

    const topicColorCache = {};
    const topicColor = (topic) => {
      if (TOPIC_COLOR_MAP[topic]) return TOPIC_COLOR_MAP[topic];
      if (topicColorCache[topic]) return topicColorCache[topic];
      let hash = 0;
      for (let i = 0; i < topic.length; i++) hash = (hash * 31 + topic.charCodeAt(i)) | 0;
      return (topicColorCache[topic] = TOPIC_COLORS[Math.abs(hash) % TOPIC_COLORS.length]);
    };

    let relays = [];
    let peers = [];
    let packets = [];
    let directLinks = [];
    // live peers: { id, slot, x, y, r, alpha, dir, phase, name, kind:'live', rtt?, rttUntil? }
    let livePeers = [];
    // our own browser libp2p node (live mode): { id, x, y, r, kind:'self', topics }
    let selfNode = null;
    // ping round-trips in flight: { to, t (0..1), dir (1 out, -1 back) }
    let pingPulses = [];
    let liveStatus = ''; // '', 'connecting', 'live', 'error'
    const mouse = { x: -1, y: -1, node: null };

    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    function slotPos(slot) {
      const angle = (slot / maxPeers) * Math.PI * 2 - Math.PI / 2;
      const rx = Math.min(w * 0.47, 430);
      const ry = h * 0.47;
      return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
    }

    function layout() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = w / 2;
      cy = h * 0.44;
      const spread = Math.min(w * 0.17, 135);

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
        p.topics = new Set(PEER_TOPICS[p.name] || []);
        p.relay = relays.reduce((best, rel) => (dist(p, rel) < dist(p, best) ? rel : best), relays[0]);
        return p;
      });
      directLinks = [];
      packets = [];
      pingPulses = [];
      // reposition live peers onto their slots
      for (const lp of livePeers) Object.assign(lp, slotPos(lp.slot));
      // our own node sits bottom-centre, visually "in front of" the mesh
      if (selfNode) positionSelf();
    }

    function positionSelf() {
      selfNode.x = cx;
      selfNode.y = h - 46;
      selfNode.relay = relays.reduce(
        (best, rel) => (dist(selfNode, rel) < dist(selfNode, best) ? rel : best),
        relays[0]
      );
    }

    // ---- live peer management ----
    function nextSlot() {
      const used = new Set(livePeers.map((p) => p.slot));
      for (let s = 0; s < maxPeers; s++) if (!used.has(s)) return s;
      return -1;
    }
    function addLivePeer(id) {
      if (livePeers.some((p) => p.id === id)) {
        const p = livePeers.find((x) => x.id === id);
        p.dir = 1; // was fading out, keep it
        return;
      }
      const slot = nextSlot();
      if (slot < 0) return; // at capacity
      const pos = slotPos(slot);
      livePeers.push({
        id,
        slot,
        ...pos,
        r: 9,
        alpha: 0,
        dir: 1,
        phase: Math.random() * Math.PI * 2,
        kind: 'live',
        name: `${id.slice(0, 4)}…${id.slice(-4)}`,
        topics: new Set(),
        relay: relays.reduce((best, rel) => (dist(pos, rel) < dist(pos, best) ? rel : best), relays[0])
      });
    }
    function removeLivePeer(id) {
      const p = livePeers.find((x) => x.id === id);
      if (p) p.dir = -1; // fade out, removed when alpha hits 0
    }

    async function startLive() {
      liveStatus = 'connecting';
      try {
        const { createP2PNetwork } = await import('../lib/p2p/network.js');
        const net = createP2PNetwork({ bootstrap, topics, webrtc });
        net.on('self', ({ id }) => {
          selfNode = {
            id,
            kind: 'self',
            name: 'you — this browser',
            r: 11,
            phase: 0,
            alpha: 1,
            topics: new Set()
          };
          positionSelf();
        });
        net.on('self:topics', ({ topics: own }) => {
          if (selfNode) selfNode.topics = new Set(own.map(shortTopic));
        });
        net.on('peer:add', (p) => addLivePeer(p.id));
        net.on('peer:remove', (p) => removeLivePeer(p.id));
        net.on('peer:topics', ({ id, subscriptions }) => {
          const lp = livePeers.find((p) => p.id === id);
          if (!lp) return;
          for (const s of subscriptions) {
            const label = shortTopic(s.topic);
            if (s.subscribe) lp.topics.add(label);
            else lp.topics.delete(label);
          }
        });
        net.on('peer:ping', ({ id, rtt }) => {
          const lp = livePeers.find((p) => p.id === id);
          if (!lp || !selfNode) return;
          lp.rtt = rtt;
          lp.rttUntil = performance.now() + 4200;
          if (pingPulses.length < 8) pingPulses.push({ to: lp, t: 0, dir: 1 });
        });
        net.on('status', (s) => {
          if (s === 'started') liveStatus = 'live';
          else if (s === 'error' || s === 'no-bootstrap') liveStatus = 'error';
        });
        net.on('error', () => { liveStatus = 'error'; });
        await net.start();
        return net;
      } catch {
        liveStatus = 'error';
        return null;
      }
    }

    // ---- drawing ----
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

    // Curved, colour-per-topic lines between any two nodes that share a topic.
    function drawTopicLines(t) {
      const all = [...peers, ...livePeers, ...(selfNode ? [selfNode] : [])];
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const a = all[i];
          const b = all[j];
          if (!a.topics || !b.topics || !a.topics.size || !b.topics.size) continue;
          const ea = a.alpha ?? 1;
          const eb = b.alpha ?? 1;
          if (ea < 0.05 || eb < 0.05) continue;
          let k = 0;
          for (const topic of a.topics) {
            if (!b.topics.has(topic)) continue;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;
            const off = ((k % 3) - 1) * 22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo((a.x + b.x) / 2 + nx * off, (a.y + b.y) / 2 + ny * off, b.x, b.y);
            ctx.strokeStyle = topicColor(topic);
            ctx.globalAlpha = 0.5 * Math.min(ea, eb);
            ctx.lineWidth = 1.9;
            ctx.setLineDash([6, 6]);
            ctx.lineDashOffset = -((t / 55) % 12);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            k++;
          }
        }
      }
    }

    function node(p, color, t, isRelay = false, baseAlpha = 1) {
      const hovered = mouse.node === p;
      const pulse = 1 + 0.08 * Math.sin(t / 600 + (p.phase || 0));
      const r = p.r * pulse * (hovered ? 1.15 : 1);
      ctx.globalAlpha = (hovered ? 0.32 : 0.18) * baseAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = baseAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (isRelay) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = (hovered ? 0.7 : 0.4) * baseAlpha;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function tooltip(p) {
      const rttInfo = p.kind === 'live' && p.rtt != null ? ` · ${Math.round(p.rtt)} ms` : '';
      const label =
        p.kind === 'relay' ? `${p.name} · relay`
        : p.kind === 'live' ? `peer · ${p.name}${rttInfo}`
        : p.kind === 'self' ? p.name
        : p.name;
      ctx.font = '600 12px ui-monospace, Menlo, monospace';
      const padX = 9;
      const bw = ctx.measureText(label).width + padX * 2;
      const bh = 24;
      let bx = Math.max(6, Math.min(w - bw - 6, p.x - bw / 2));
      let by = p.y - p.r - bh - 10;
      if (by < 6) by = p.y + p.r + 10;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 7);
      else ctx.rect(bx, by, bw, bh);
      ctx.fillStyle = COLORS.tipBg;
      ctx.globalAlpha = 0.96;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      ctx.strokeStyle =
        p.kind === 'relay' ? COLORS.relay
        : p.kind === 'live' ? COLORS.live
        : p.kind === 'self' ? COLORS.self
        : COLORS.peer;
      ctx.stroke();
      ctx.fillStyle = COLORS.tipText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, bx + bw / 2, by + bh / 2 + 1);
      ctx.textBaseline = 'alphabetic';
    }

    function hitTest() {
      let found = null;
      for (const p of [...relays, ...peers, ...livePeers, ...(selfNode ? [selfNode] : [])]) {
        if (p.alpha !== undefined && p.alpha < 0.4) continue;
        if (dist(mouse, p) <= p.r + 8) { found = p; break; }
      }
      mouse.node = found;
      canvas.style.cursor = found ? 'pointer' : 'default';
    }

    function spawnPacket() {
      const r = Math.random();
      if (directLinks.length && r < 0.35) {
        const [a, b] = directLinks[Math.floor(Math.random() * directLinks.length)];
        packets.push({ path: [peers[a], peers[b]], seg: 0, t: 0, color: COLORS.direct });
      } else if (r < 0.5) {
        const i = Math.floor(Math.random() * relays.length);
        let j = Math.floor(Math.random() * relays.length);
        if (j === i) j = (i + 1) % relays.length;
        packets.push({ path: [relays[i], relays[j]], seg: 0, t: 0, color: COLORS.relay });
      } else {
        const a = peers[Math.floor(Math.random() * peers.length)];
        let b = peers[Math.floor(Math.random() * peers.length)];
        if (a === b) b = peers[(peers.indexOf(a) + 1) % peers.length];
        const path = a.relay === b.relay ? [a, a.relay, b] : [a, a.relay, b.relay, b];
        packets.push({ path, seg: 0, t: 0, color: COLORS.peer });
      }
    }

    function maybeHolePunch() {
      if (directLinks.length >= Math.floor(peers.length / 2)) return;
      const a = Math.floor(Math.random() * peers.length);
      const b = (a + 1 + Math.floor(Math.random() * (peers.length - 1))) % peers.length;
      if (!directLinks.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) directLinks.push([a, b]);
    }

    let lastPacket = 0;
    let lastPunch = 0;

    function frame(t) {
      ctx.clearRect(0, 0, w, h);

      // relay mesh
      for (let i = 0; i < relays.length; i++)
        for (let j = i + 1; j < relays.length; j++)
          line(relays[i], relays[j], COLORS.relay, 0.3, [], 1.6);
      for (const p of peers) line(p, p.relay, COLORS.peer, 0.2);
      for (const [a, b] of directLinks) line(peers[a], peers[b], COLORS.direct, 0.5, [4, 4]);

      // live peer links (fade with the node)
      for (const lp of livePeers) line(lp, lp.relay, COLORS.live, 0.35 * lp.alpha, [2, 3]);

      // our own node: link to its relay + a line to every live peer we ping
      if (selfNode) {
        line(selfNode, selfNode.relay, COLORS.self, 0.4, [], 1.4);
        for (const lp of livePeers) {
          if (lp.alpha < 0.3) continue;
          line(selfNode, lp, COLORS.self, 0.18 * lp.alpha, [2, 5]);
          // rtt label near the peer while a fresh measurement exists
          if (lp.rtt != null && performance.now() < (lp.rttUntil || 0)) {
            const mx = selfNode.x + (lp.x - selfNode.x) * 0.72;
            const my = selfNode.y + (lp.y - selfNode.y) * 0.72;
            ctx.font = '10px ui-monospace, Menlo, monospace';
            ctx.fillStyle = COLORS.self;
            ctx.globalAlpha = 0.9 * lp.alpha;
            ctx.textAlign = 'center';
            ctx.fillText(`${Math.round(lp.rtt)} ms`, mx, my - 6);
            ctx.globalAlpha = 1;
          }
        }
      }

      // pubsub topic web (shared topics between nodes)
      drawTopicLines(t);

      // ping round-trips: pulse travels self → peer → self
      for (const pp of pingPulses) {
        if (!selfNode || pp.to.alpha < 0.1) { pp.done = true; continue; }
        pp.t += 0.035;
        if (pp.t >= 1) {
          if (pp.dir > 0) { pp.dir = -1; pp.t = 0; }
          else { pp.done = true; continue; }
        }
        const from = pp.dir > 0 ? selfNode : pp.to;
        const to = pp.dir > 0 ? pp.to : selfNode;
        const x = from.x + (to.x - from.x) * pp.t;
        const y = from.y + (to.y - from.y) * pp.t;
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.self;
        ctx.shadowBlur = 10;
        ctx.shadowColor = COLORS.self;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      pingPulses = pingPulses.filter((p) => !p.done);

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

      // live peers: animate alpha then draw
      for (const lp of livePeers) {
        lp.alpha = Math.max(0, Math.min(1, lp.alpha + lp.dir * 0.04));
        if (lp.alpha > 0.02) {
          ctx.shadowBlur = 10 * lp.alpha;
          ctx.shadowColor = COLORS.live;
          node(lp, COLORS.live, t, true, lp.alpha);
          ctx.shadowBlur = 0;
        }
      }
      livePeers = livePeers.filter((lp) => !(lp.dir < 0 && lp.alpha <= 0));

      // our own node, drawn last (in front), with a distinct ring + label
      if (selfNode) {
        ctx.shadowBlur = 14;
        ctx.shadowColor = COLORS.self;
        node(selfNode, COLORS.self, t, true);
        ctx.shadowBlur = 0;
        ctx.font = '600 11px ui-monospace, Menlo, monospace';
        ctx.fillStyle = COLORS.self;
        ctx.textAlign = 'center';
        ctx.fillText('your browser', selfNode.x, selfNode.y + selfNode.r + 20);
      }

      // static label
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillStyle = COLORS.text;
      ctx.textAlign = 'center';
      ctx.fillText('relay mesh — on demand', cx, cy + h * 0.12 + 34);

      // topic legend (bottom-right): every topic currently drawn in the web
      {
        const active = new Map();
        for (const n of [...peers, ...livePeers, ...(selfNode ? [selfNode] : [])]) {
          if ((n.alpha ?? 1) < 0.5 || !n.topics) continue;
          for (const topic of n.topics) if (!active.has(topic)) active.set(topic, topicColor(topic));
        }
        if (active.size) {
          ctx.font = '10px ui-monospace, Menlo, monospace';
          ctx.textAlign = 'right';
          let ly = h - 14;
          let shown = 0;
          for (const [topic, color] of active) {
            if (shown++ >= 7) break;
            ctx.fillStyle = COLORS.text;
            ctx.fillText(topic, w - 24, ly);
            ctx.beginPath();
            ctx.arc(w - 14, ly - 3.5, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ly -= 16;
          }
        }
      }

      // live status (bottom-left)
      if (live) {
        const count = livePeers.filter((p) => p.dir > 0).length;
        const label =
          liveStatus === 'live' ? `● live · ${count} peer${count === 1 ? '' : 's'}`
          : liveStatus === 'connecting' ? '○ connecting…'
          : liveStatus === 'error' ? '○ live unavailable'
          : '';
        if (label) {
          ctx.textAlign = 'left';
          ctx.font = '11px ui-monospace, Menlo, monospace';
          ctx.fillStyle = liveStatus === 'live' ? COLORS.live : COLORS.text;
          ctx.fillText(label, 14, h - 14);
        }
      }

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

    let netPromise = live ? startLive() : null;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      if (netPromise) netPromise.then((net) => net && net.stop());
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
