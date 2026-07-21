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

const isBrowserDialable = (a) => /\/wss?(\/|$)|\/tls\/ws(\/|$)/.test(a);

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
          ...(useWebRTC ? [webRTC()] : []),
          circuitRelayTransport({ discoverRelays: 1 })
        ],
        connectionEncrypters: [noise()],
        streamMuxers: [yamux()],
        connectionGater: { denyDialMultiaddr: () => false },
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

      emit('status', 'started');
    } catch (err) {
      emit('error', err);
      emit('status', 'error');
    }
  }

  async function stop() {
    stopped = true;
    try { if (node) await node.stop(); } catch { /* noop */ }
    node = null;
    emit('status', 'stopped');
  }

  return { start, stop, on, get peers() { return node ? node.getPeers().map((p) => p.toString()) : []; } };
}
