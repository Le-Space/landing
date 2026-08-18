/**
 * "What does reach cost?" — the three rungs of the connectivity ladder.
 *
 * This is the strategy picture, not a feature list: each rung buys reach and
 * pays for it in privacy, and the paid products sit exactly on the rungs
 * people climb voluntarily. The left rung is genuinely free and genuinely
 * private, which is what makes the other two honest conveniences rather than
 * gates — an investor should be able to see that in one glance.
 *
 * It lives here as a string builder rather than in the Svelte component
 * because it is needed in two places that cannot share a component: the FAQ,
 * which is a Svelte app, and the pitch decks, which are static HTML written by
 * tools/build-decks.mjs and have to print to PDF with no network and no
 * runtime. One source, two callers.
 *
 * `sells` is the difference between them. The bottom row names what Le Space
 * sells on each rung; that belongs in a deck and not on the open site, so the
 * FAQ asks for the diagram without it and the columns close up behind it.
 *
 * The <style> is inside the SVG so a caller only has to place the markup.
 * Every selector is under .reach-ladder — an unscoped `text {}` here would
 * reach every other SVG on the page. Colours are brand tokens, so the picture
 * follows the light/dark toggle in the FAQ and the print stylesheet in a deck.
 */

export const REACH_TEXT = {
  de: {
    axis: 'mehr Reichweite  →  mehr Dritte im Spiel',
    cols: [
      {
        head: 'Im selben Raum',
        how: 'QR-Code · eigener Hotspot',
        eval: 'BLE, NFC in Evaluierung',
        third: 'keine Dritten',
        sells: '—',
        note: 'kein Internet, keine Infrastruktur'
      },
      {
        head: 'Nicht im selben Raum',
        how: 'SDP-Link · oder ein Relay',
        eval: 'Relay = bequem, aber sichtbar',
        third: 'ein Relaybetreiber',
        sells: 'Relay Button',
        note: 'Hosting auf Aleph, Akash — auch als Aggregator'
      },
      {
        head: 'Es soll bleiben',
        how: 'Replikation · Pinning',
        eval: 'jemand muss die Daten halten',
        third: 'ein Speicheranbieter',
        sells: 'OrbitDB Relay',
        note: 'Filecoin und andere — auch als Aggregator'
      }
    ],
    thirdLabel: 'Wer sieht mit',
    sellsLabel: 'Le Space verkauft',
    free: 'kostenlos und vollständig privat',
    alt: 'Drei Stufen: im selben Raum ohne Dritte, außerhalb über SDP-Link oder Relay, und dauerhaft über Speicheranbieter. Mit jeder Stufe wächst die Reichweite und die Zahl der Beteiligten.'
  },
  en: {
    axis: 'more reach  →  more third parties',
    cols: [
      {
        head: 'Same room',
        how: 'QR code · your own hotspot',
        eval: 'BLE, NFC under evaluation',
        third: 'nobody',
        sells: '—',
        note: 'no internet, no infrastructure'
      },
      {
        head: 'Not the same room',
        how: 'SDP link · or a relay',
        eval: 'a relay is easy, and visible',
        third: 'one relay operator',
        sells: 'Relay Button',
        note: 'hosting on Aleph, Akash — or as an aggregator'
      },
      {
        head: 'It should persist',
        how: 'replication · pinning',
        eval: 'someone has to hold the data',
        third: 'a storage provider',
        sells: 'OrbitDB Relay',
        note: 'Filecoin and others — or as an aggregator'
      }
    ],
    thirdLabel: 'Who can see',
    sellsLabel: 'Le Space sells',
    free: 'free, and private all the way',
    alt: 'Three rungs: same room with no third party, elsewhere over an SDP link or a relay, and persistence through a storage provider. Each rung adds reach and adds participants.'
  }
};

// Without the sells row the two rows below it move up by exactly its height,
// so the same numbers describe both variants.
function layout(sells) {
  const y = { head: 46, how: 70, eval: 90, rule: 112, thirdLabel: 136, third: 158 };
  let last = y.third;
  if (sells) {
    y.sellsLabel = 192;
    y.sells = 216;
    last = y.sells;
  }
  y.note = last + 32;
  y.free = y.note + 22;
  y.boxH = y.free;
  y.axisLine = y.free + 52;
  y.axisText = y.axisLine + 26;
  y.height = y.axisText + 24;
  return y;
}

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const X = [16, 300, 584];
const W = 260;

function css(id) {
  return `
    .reach-ladder { width: 100%; height: auto; display: block; }
    .reach-ladder text { font-family: var(--ls-font); }
    #${id} .box { fill: none; stroke: var(--ls-card-border); stroke-width: 1.5; }
    #${id} .box.free { stroke: var(--ls-green); }
    #${id} .rule, #${id} .axis-line { stroke: var(--ls-card-border); stroke-width: 1; }
    #${id} .arrow { fill: none; stroke: var(--ls-text-faint); stroke-width: 1.5; }
    #${id} .tip { fill: var(--ls-text-faint); }
    #${id} .head { font-size: 14px; font-weight: 700; fill: var(--ls-text); }
    #${id} .how { font-size: 12px; fill: var(--ls-text); }
    #${id} .label { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; fill: var(--ls-text-faint); }
    #${id} .value { font-size: 13px; font-weight: 600; fill: var(--ls-text); }
    #${id} .sub { font-size: 11px; fill: var(--ls-text-dim); }
    #${id} .dim { fill: var(--ls-text-faint); }
    #${id} .ok-fill { fill: var(--ls-green); }
    #${id} .warn-fill { fill: var(--ls-amber); }
    #${id} .accent-fill { fill: var(--ls-accent); }
    #${id} .axis { font-size: 11px; fill: var(--ls-text-faint); }
    #${id} .mid { text-anchor: middle; }`;
}

/**
 * @param lang       'de' | 'en'
 * @param sells      name what Le Space sells on each rung (decks only)
 * @param id         unique per SVG on a page — a deck carries both languages,
 *                   and two elements answering to #reach-tip is one too many
 */
export function reachSvg(lang, { sells = false, id = 'reach-ladder' } = {}) {
  const t = REACH_TEXT[lang] ?? REACH_TEXT.en;
  const y = layout(sells);

  const cols = t.cols
    .map((col, i) => {
      const x = X[i] + 18;
      const sellsRow = sells
        ? `
    <text x="${x}" y="${y.sellsLabel}" class="label">${esc(t.sellsLabel)}</text>
    <text x="${x}" y="${y.sells}" class="value ${i === 0 ? 'dim' : 'accent-fill'}">${esc(col.sells)}</text>`
        : '';
      const freeLine =
        i === 0 ? `\n    <text x="${x}" y="${y.free}" class="sub ok-fill">${esc(t.free)}</text>` : '';
      const arrow =
        i < 2
          ? `\n  <path d="M${X[i] + W + 6} 150 H${X[i + 1] - 6}" class="arrow" marker-end="url(#${id}-tip)" />`
          : '';

      return `  <g>
    <rect x="${X[i]}" y="16" width="${W}" height="${y.boxH}" rx="10" class="box${i === 0 ? ' free' : ''}" />
    <text x="${x}" y="${y.head}" class="head">${esc(col.head)}</text>
    <text x="${x}" y="${y.how}" class="how">${esc(col.how)}</text>
    <text x="${x}" y="${y.eval}" class="sub">${esc(col.eval)}</text>
    <line x1="${x}" y1="${y.rule}" x2="${X[i] + W - 18}" y2="${y.rule}" class="rule" />
    <text x="${x}" y="${y.thirdLabel}" class="label">${esc(t.thirdLabel)}</text>
    <text x="${x}" y="${y.third}" class="value ${i === 0 ? 'ok-fill' : 'warn-fill'}">${esc(col.third)}</text>${sellsRow}
    <text x="${x}" y="${y.note}" class="sub">${esc(col.note)}</text>${freeLine}
  </g>${arrow}`;
    })
    .join('\n');

  return `<svg id="${id}" class="reach-ladder" viewBox="0 0 860 ${y.height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(t.alt)}">
  <style>${css(id)}
  </style>
  <defs>
    <marker id="${id}-tip" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="tip" />
    </marker>
  </defs>
${cols}
  <path d="M16 ${y.axisLine} H844" class="axis-line" />
  <text x="430" y="${y.axisText}" class="axis mid">${esc(t.axis)}</text>
</svg>`;
}
