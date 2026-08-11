<script>
  /**
   * "What can a relay actually read?" — the diagram for the encryption FAQ.
   *
   * The answer people get wrong is not whether the transport is encrypted (it
   * always is) but what sits *at rest* on a relay: by default, readable oplog
   * entries. Prose says this in three sentences and readers skim past it, so
   * the two boxes at the bottom show the same todo twice — once readable, once
   * as ciphertext.
   *
   * Colours come from the brand tokens, so it follows the light/dark toggle.
   */
  import { locale } from '../i18n.js';

  const T = {
    de: {
      you: 'Dein Browser',
      plain: 'Klartext, lokal',
      other: 'Anderer Browser',
      direct: 'direkt · Ende-zu-Ende',
      relay: 'Relay',
      relaySub: 'leitet weiter, pinnt',
      relayIp: 'sieht deine IP',
      transport: 'Transport: Noise',
      atRest: 'Was auf dem Relay liegt:',
      defaultTitle: 'Standard',
      defaultBody: '„Milch kaufen"',
      defaultNote: 'lesbar für den Betreiber',
      encTitle: 'Mit Payload-Verschlüsselung',
      encNote: 'nur Ciphertext',
      alt: 'Der Transport ist immer verschlüsselt. Auf dem Relay liegen Einträge standardmäßig lesbar; mit Payload-Verschlüsselung nur als Ciphertext.'
    },
    en: {
      you: 'Your browser',
      plain: 'plaintext, local',
      other: 'Other browser',
      direct: 'direct · end-to-end',
      relay: 'Relay',
      relaySub: 'forwards, pins',
      relayIp: 'sees your IP',
      transport: 'transport: noise',
      atRest: 'What sits on the relay:',
      defaultTitle: 'Default',
      defaultBody: '"buy milk"',
      defaultNote: 'readable by the operator',
      encTitle: 'With payload encryption',
      encNote: 'ciphertext only',
      alt: 'The transport is always encrypted. Entries sit readable on a relay by default; with payload encryption only as ciphertext.'
    }
  };

  const t = $derived(T[$locale] ?? T.en);
</script>

<figure class="wrap">
  <svg viewBox="0 0 760 396" role="img" aria-label={t.alt}>
    <!-- browsers -->
    <rect x="16" y="44" width="150" height="62" rx="8" class="box" />
    <text x="91" y="70" class="lbl mid">{t.you}</text>
    <text x="91" y="89" class="sub mid">{t.plain}</text>

    <rect x="594" y="44" width="150" height="62" rx="8" class="box" />
    <text x="669" y="70" class="lbl mid">{t.other}</text>
    <text x="669" y="89" class="sub mid">{t.plain}</text>

    <!-- direct, end-to-end -->
    <path d="M166 62 H594" class="line accent" stroke-dasharray="6 4" />
    <rect x="316" y="44" width="128" height="18" rx="4" class="chip" />
    <text x="380" y="57" class="tiny mid accent-fill">{t.direct}</text>

    <!-- relay -->
    <rect x="300" y="142" width="160" height="86" rx="8" class="box relay" />
    <text x="380" y="168" class="lbl mid">{t.relay}</text>
    <text x="380" y="187" class="sub mid">{t.relaySub}</text>
    <text x="380" y="208" class="sub mid">{t.relayIp}</text>

    <path d="M91 106 V185 H300" class="line relay-stroke" />
    <path d="M669 106 V185 H460" class="line relay-stroke" />
    <text x="188" y="178" class="tiny relay-fill">{t.transport}</text>
    <text x="470" y="178" class="tiny relay-fill">{t.transport}</text>

    <!-- at rest — the point -->
    <text x="16" y="272" class="lbl">{t.atRest}</text>

    <rect x="16" y="286" width="352" height="80" rx="8" class="box" />
    <text x="32" y="308" class="lbl">{t.defaultTitle}</text>
    <text x="32" y="330" class="mono">{t.defaultBody}</text>
    <text x="32" y="350" class="sub">{t.defaultNote}</text>

    <rect x="392" y="286" width="352" height="80" rx="8" class="box accent-box" />
    <text x="408" y="308" class="lbl accent-fill">{t.encTitle}</text>
    <text x="408" y="330" class="mono sub-fill">8f3a91c2 7e04bb15 d9…</text>
    <text x="408" y="350" class="sub">{t.encNote}</text>
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

  .box.relay,
  .accent-box {
    stroke: var(--ls-accent-2);
  }

  .accent-box {
    stroke: var(--ls-accent);
  }

  .chip {
    fill: var(--ls-bg-2);
  }

  .line {
    fill: none;
    stroke-width: 2;
  }

  .accent {
    stroke: var(--ls-accent);
  }

  .relay-stroke {
    stroke: var(--ls-accent-2);
  }

  .accent-fill {
    fill: var(--ls-accent);
  }

  .relay-fill {
    fill: var(--ls-accent-2);
  }

  .sub-fill {
    fill: var(--ls-text-dim);
  }

  text {
    font-family: var(--ls-font);
  }

  .lbl {
    font-size: 12px;
    font-weight: 600;
    fill: var(--ls-text);
  }

  .sub {
    font-size: 11px;
    fill: var(--ls-text-dim);
  }

  .tiny {
    font-size: 10.5px;
  }

  .mono {
    font-family: var(--ls-font-mono);
    font-size: 11px;
    fill: var(--ls-text);
  }

  .mid {
    text-anchor: middle;
  }
</style>
