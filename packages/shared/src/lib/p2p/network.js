/**
 * Framework-agnostic browser libp2p node for live peer visualisation.
 *
 * Reusable + dependency-injectable: give it bootstrap multiaddrs and pubsub
 * topics, call start(), and subscribe to events. It never throws to the caller
 * (errors are emitted), so a UI can treat it as a best-effort enhancement.
 *
 *   import { createP2PNetwork } from '@le-space/landing-shared/lib/p2p/network.js';
 *   const net = createP2PNetwork({ topics: ['my-topic'] });
 *   net.on('peer:add', (p) => ...); net.on('peer:remove', (p) => ...);
 *   await net.start();  // later: await net.stop();
 *
 * Config mirrors the proven simple-todo browser setup.
 */
import { createLibp2p } from 'libp2p';
import { webSockets } from '@libp2p/websockets';
import { webRTC } from '@libp2p/webrtc';
import { webTransport } from '@libp2p/webtransport';
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { identify, identifyPush } from '@libp2p/identify';
import { ping } from '@libp2p/ping';
import { dcutr } from '@libp2p/dcutr';
import { autoNAT } from '@libp2p/autonat';
import { gossipsub } from '@libp2p/gossipsub';
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery';
import { bootstrap } from '@libp2p/bootstrap';

// pubsub-peer-discovery default topic, plus a Le-Space-specific one.
export const DEFAULT_TOPICS = [
  'le-space._peer-discovery._p2p._pubsub',
  '_peer-discovery._p2p._pubsub'
];

// Last-resort bootstrap if Aleph discovery yields nothing (the simple-todo prod relay).
export const FALLBACK_BOOTSTRAP = [
  '/dns4/pill-execute-neither-suspect.2n6.me/tcp/443/tls/ws/p2p/12D3KooWSc3Sqr3Q7RGJAFBz5i7WTTC5kzunnm2tvXVcSwTEtUTP'
];

/**
 * True when dialing this multiaddr would open an insecure WebSocket from a page
 * the browser serves over HTTPS — which Chrome blocks as mixed content.
 *
 * Secure means the address carries `/tls/` (covering `/tls/ws` and the AutoTLS
 * `/tls/sni/<host>/ws` form) or `/wss`. On an http:// origin — local dev —
 * mixed content does not apply, so plain `/ws` stays dialable there.
 *
 * The bootstrap filter below is not enough on its own: it only sees the list we
 * hand in. Peers found over pubsub and identify announce their own addresses,
 * internal `/ws` ports included, and those reach the dialer without passing it.
 * libp2p used to filter this inside the websockets transport and removed it in
 * favour of exactly this hook (libp2p/js-libp2p#2838, #2983).
 *
 * @param {{ toString: () => string }} multiaddr
 * @param {string} [pageProtocol]
 */
export function isInsecureWebSocketDial(
  multiaddr,
  pageProtocol = typeof location === 'undefined' ? '' : location.protocol
) {
  if (pageProtocol !== 'https:') return false;

  const address = String(multiaddr).toLowerCase();
  if (!/\/wss?(\/|$)/.test(address)) return false;

  return !address.includes('/tls/') && !/\/wss(\/|$)/.test(address);
}

// A WebSocket this browser can actually open, defined as the inverse of the
// dial gate below rather than as a second regex — two spellings of "secure"
// drift apart, and the first attempt here did: it demanded `/tls/ws` adjacent
// and so dropped the AutoTLS form `/tls/sni/<host>/ws`, which is encrypted and
// was working before.
//
// WebTransport counts too, now that the transport is configured. It carries no
// mixed-content risk: QUIC is TLS 1.3 throughout and `certhash` pins the
// certificate, which is what lets a relay offer it without a CA-issued one.
// Browsers without support just never match the address.
const isWebTransport = (a) => /\/webtransport(\/|$)/.test(a);

const isBrowserDialable = (a) =>
  isWebTransport(a) || (/\/wss?(\/|$)/.test(a) && !isInsecureWebSocketDial(a));

/** Resolve current Aleph relay bootstrap multiaddrs (browser-dialable only). */
export async function resolveAlephBootstrap() {
  try {
    const mod = await import('@le-space/aleph-bootstrap');
    const fn = mod.discoverAlephBootstrapMultiaddrs || mod.default;
    const addrs = typeof fn === 'function' ? await fn() : [];
    return (addrs || []).map(String).filter(isBrowserDialable);
  } catch {
    return [];
  }
}

/**
 * @param {{ bootstrap?: string[], topics?: string[], webrtc?: boolean }} [opts]
 */
export function createP2PNetwork(opts = {}) {
  /** @type {Record<string, Function[]>} */
  const listeners = {};
  const on = (ev, cb) => {
    (listeners[ev] ||= []).push(cb);
    return () => { listeners[ev] = (listeners[ev] || []).filter((f) => f !== cb); };
  };
  const emit = (ev, data) => (listeners[ev] || []).forEach((cb) => { try { cb(data); } catch { /* noop */ } });

  let node = null;
  let stopped = false;
  let pingTimer = null;

  async function start() {
    emit('status', 'starting');
    try {
      let list = opts.bootstrap?.length ? opts.bootstrap : await resolveAlephBootstrap();
      if (!list.length) list = FALLBACK_BOOTSTRAP;
      if (!list.length) { emit('status', 'no-bootstrap'); return; }

      const topics = opts.topics?.length ? opts.topics : DEFAULT_TOPICS;
      const useWebRTC = opts.webrtc !== false;

      node = await createLibp2p({
        addresses: { listen: useWebRTC ? ['/p2p-circuit', '/webrtc'] : ['/p2p-circuit'] },
        transports: [
          webSockets(),
          // Encrypted by construction — QUIC with TLS 1.3, and `certhash` pins
          // the certificate, so a relay needs no CA-issued one. Chromium only;
          // where it is missing the transport simply never matches an address.
          webTransport(),
          ...(useWebRTC ? [webRTC()] : []),
          circuitRelayTransport({ discoverRelays: 1 })
        ],
        connectionEncrypters: [noise()],
        streamMuxers: [yamux()],
        // Everything was allowed here, which left the door open for the dials
        // the bootstrap filter never sees. See isInsecureWebSocketDial.
        connectionGater: { denyDialMultiaddr: (ma) => isInsecureWebSocketDial(ma) },
        peerDiscovery: [
          bootstrap({ list }),
          pubsubPeerDiscovery({ interval: 5000, topics, listenOnly: false })
        ],
        services: {
          identify: identify(),
          identifyPush: identifyPush(),
          ping: ping(),
          dcutr: dcutr(),
          autoNAT: autoNAT(),
          pubsub: gossipsub({ allowPublishToZeroTopicPeers: true, emitSelf: false })
        }
      });

      if (stopped) { await node.stop().catch(() => {}); return; }

      emit('self', { id: node.peerId.toString() });

      node.addEventListener('peer:discovery', (evt) => {
        emit('peer:add', { id: evt.detail.id.toString(), state: 'discovered' });
      });
      node.addEventListener('peer:connect', (evt) => {
        emit('peer:add', { id: evt.detail.toString(), state: 'connected' });
      });
      node.addEventListener('peer:disconnect', (evt) => {
        emit('peer:remove', { id: evt.detail.toString() });
      });

      // gossipsub subscription changes → which topics each peer shares
      try {
        node.services.pubsub?.addEventListener('subscription-change', (evt) => {
          const id = evt.detail?.peerId?.toString?.();
          const subs = evt.detail?.subscriptions || [];
          if (id) {
            emit('peer:topics', {
              id,
              subscriptions: subs.map((s) => ({ topic: s.topic, subscribe: !!s.subscribe }))
            });
          }
        });
      } catch { /* pubsub may be unavailable */ }

      // Own gossipsub subscriptions (e.g. the peer-discovery topics)
      try {
        const own = node.services.pubsub?.getTopics?.() || [];
        emit('self:topics', { topics: own.map(String) });
      } catch { /* pubsub may be unavailable */ }

      // Periodic ping to connected peers → emit('peer:ping', { id, rtt }) per result.
      pingTimer = setInterval(async () => {
        if (!node) return;
        const peers = node.getPeers().slice(0, 12);
        for (const p of peers) {
          try {
            const rtt = await node.services.ping.ping(p);
            emit('peer:ping', { id: p.toString(), rtt: Number(rtt) });
          } catch { /* peer gone or ping unsupported */ }
        }
      }, 4000);

      emit('status', 'started');
    } catch (err) {
      emit('error', err);
      emit('status', 'error');
    }
  }

  async function stop() {
    stopped = true;
    if (pingTimer) { clearInterval(pingTimer); pingTimer = null; }
    try { if (node) await node.stop(); } catch { /* noop */ }
    node = null;
    emit('status', 'stopped');
  }

  return { start, stop, on, get peers() { return node ? node.getPeers().map((p) => p.toString()) : []; } };
}
