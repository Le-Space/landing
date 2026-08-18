<script>
  /**
   * "What does reach cost?" — the three rungs of the connectivity ladder.
   *
   * This is the strategy picture, not a feature list: each rung buys reach and
   * pays for it in privacy, and the paid products sit exactly on the rungs
   * people climb voluntarily. The left rung is genuinely free and genuinely
   * private, which is what makes the other two honest conveniences rather than
   * gates — an investor should be able to see that in one glance.
   *
   * Brand tokens throughout, so it follows the light/dark toggle.
   */
  import { locale } from '../i18n.js';

  const T = {
    de: {
      axis: 'mehr Reichweite  →  mehr Dritte im Spiel',
      cols: [
        {
          head: 'Im selben Raum',
          how: 'QR-Code · eigener Hotspot',
          eval: 'BLE, NFC in Evaluierung',
          third: 'keine Dritten',
          note: 'kein Internet, keine Infrastruktur'
        },
        {
          head: 'Nicht im selben Raum',
          how: 'SDP-Link · oder ein Relay',
          eval: 'Relay = bequem, aber sichtbar',
          third: 'ein Relaybetreiber',
          note: 'Hosting z. B. auf Aleph oder Akash'
        },
        {
          head: 'Es soll bleiben',
          how: 'Replikation · Pinning',
          eval: 'jemand muss die Daten halten',
          third: 'ein Speicheranbieter',
          note: 'Filecoin und andere Anbieter'
        }
      ],
      thirdLabel: 'Wer sieht mit',
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
          note: 'no internet, no infrastructure'
        },
        {
          head: 'Not the same room',
          how: 'SDP link · or a relay',
          eval: 'a relay is easy, and visible',
          third: 'one relay operator',
          note: 'hosting on Aleph, Akash and others'
        },
        {
          head: 'It should persist',
          how: 'replication · pinning',
          eval: 'someone has to hold the data',
          third: 'a storage provider',
          note: 'Filecoin and other providers'
        }
      ],
      thirdLabel: 'Who can see',
      free: 'free, and private all the way',
      alt: 'Three rungs: same room with no third party, elsewhere over an SDP link or a relay, and persistence through a storage provider. Each rung adds reach and adds participants.'
    }
  };

  const t = $derived(T[$locale] ?? T.en);
  const X = [16, 300, 584];
  const W = 260;
</script>

<figure class="wrap">
  <svg viewBox="0 0 860 314" role="img" aria-label={t.alt}>
    {#each t.cols as col, i (col.head)}
      <g>
        <rect x={X[i]} y="16" width={W} height="212" rx="10" class={i === 0 ? 'box free' : 'box'} />

        <text x={X[i] + 18} y="46" class="head">{col.head}</text>
        <text x={X[i] + 18} y="70" class="how">{col.how}</text>
        <text x={X[i] + 18} y="90" class="sub">{col.eval}</text>

        <line x1={X[i] + 18} y1="112" x2={X[i] + W - 18} y2="112" class="rule" />

        <text x={X[i] + 18} y="136" class="label">{t.thirdLabel}</text>
        <text x={X[i] + 18} y="158" class={i === 0 ? 'value ok-fill' : 'value warn-fill'}>{col.third}</text>

        <text x={X[i] + 18} y="190" class="sub">{col.note}</text>
        {#if i === 0}
          <text x={X[i] + 18} y="212" class="sub ok-fill">{t.free}</text>
        {/if}
      </g>
      {#if i < 2}
        <path d="M{X[i] + W + 6} 150 H{X[i + 1] - 6}" class="arrow" marker-end="url(#reach-tip)" />
      {/if}
    {/each}

    <defs>
      <marker id="reach-tip" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L8 4 L0 8 z" class="tip" />
      </marker>
    </defs>

    <path d="M16 264 H844" class="axis-line" />
    <text x="430" y="290" class="axis mid">{t.axis}</text>
  </svg>
</figure>

<style>
  .wrap {
    margin: 16px 0 0;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .box {
    fill: none;
    stroke: var(--ls-card-border);
    stroke-width: 1.5;
  }

  .box.free {
    stroke: var(--ls-green);
  }

  .rule,
  .axis-line {
    stroke: var(--ls-card-border);
    stroke-width: 1;
  }

  .arrow {
    fill: none;
    stroke: var(--ls-text-faint);
    stroke-width: 1.5;
  }

  .tip {
    fill: var(--ls-text-faint);
  }

  text {
    font-family: var(--ls-font);
  }

  .head {
    font-size: 14px;
    font-weight: 700;
    fill: var(--ls-text);
  }

  .how {
    font-size: 12px;
    fill: var(--ls-text);
  }

  .label {
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    fill: var(--ls-text-faint);
  }

  .value {
    font-size: 13px;
    font-weight: 600;
    fill: var(--ls-text);
  }

  .sub {
    font-size: 11px;
    fill: var(--ls-text-dim);
  }

  .ok-fill {
    fill: var(--ls-green);
  }

  .warn-fill {
    fill: var(--ls-amber);
  }

  .axis {
    font-size: 11px;
    fill: var(--ls-text-faint);
  }

  .mid {
    text-anchor: middle;
  }
</style>
