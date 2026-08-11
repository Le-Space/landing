<script>
  /**
   * "Write is gated, read is not" — the diagram for the access-control FAQ.
   *
   * The access controller limits *appends*, not reads: anyone who knows the
   * address can replicate. Mallory therefore appears with a cross on the left
   * and a tick on the right, which is the whole point of the picture. Getting
   * this backwards is how a "private" list leaks — the same trap that shaped
   * the registry design in simple-todo#114.
   */
  import { locale } from '../i18n.js';

  const T = {
    de: {
      write: 'Schreiben',
      writeSub: 'signiert, jeder Peer prüft selbst',
      read: 'Lesen',
      readSub: 'wer die Adresse kennt',
      db: 'OrbitDB-Datenbank',
      ac: 'Access Controller',
      alice: 'Alice · in der Liste',
      bob: 'Bob · nachträglich erlaubt',
      mallory: 'Mallory · nicht in der Liste',
      readers: 'Alice, Bob',
      relay: 'Relay, Pinner',
      warnTitle: 'Der Punkt, den fast alle falsch erwarten',
      warn1: 'Der Access Controller regelt nur das Anhängen — nicht das Lesen.',
      warn2: '„Privat" heißt: nur du darfst schreiben. Lesen begrenzt erst die Payload-Verschlüsselung.',
      alt: 'Der Access Controller begrenzt das Schreiben auf eine Liste von DIDs. Lesen begrenzt er nicht — wer die Adresse kennt, kann replizieren.'
    },
    en: {
      write: 'Writing',
      writeSub: 'signed, every peer verifies',
      read: 'Reading',
      readSub: 'anyone with the address',
      db: 'OrbitDB database',
      ac: 'access controller',
      alice: 'Alice · on the list',
      bob: 'Bob · granted later',
      mallory: 'Mallory · not on the list',
      readers: 'Alice, Bob',
      relay: 'Relay, pinner',
      warnTitle: 'The part almost everyone expects wrong',
      warn1: 'The access controller governs appends — not reads.',
      warn2: '"Private" means only you may write. Reading is limited by payload encryption, nothing else.',
      alt: 'The access controller limits writing to a list of DIDs. It does not limit reading — anyone who knows the address can replicate.'
    }
  };

  const t = $derived(T[$locale] ?? T.en);
</script>

<figure class="wrap">
  <svg viewBox="0 0 760 376" role="img" aria-label={t.alt}>
    <!-- database -->
    <rect x="300" y="112" width="160" height="96" rx="8" class="box" />
    <text x="380" y="142" class="lbl mid">{t.db}</text>
    <text x="380" y="162" class="mono mid dim">/orbitdb/zdpu…</text>
    <text x="380" y="186" class="sub mid">{t.ac}</text>

    <!-- writers -->
    <text x="16" y="52" class="lbl">{t.write}</text>
    <text x="16" y="70" class="sub">{t.writeSub}</text>

    <rect x="16" y="88" width="196" height="34" rx="6" class="box ok" />
    <text x="30" y="109" class="row">{t.alice}</text>
    <text x="196" y="110" class="mark ok-fill end">✓</text>

    <rect x="16" y="132" width="196" height="34" rx="6" class="box ok" />
    <text x="30" y="153" class="row">{t.bob}</text>
    <text x="196" y="154" class="mark ok-fill end">✓</text>

    <rect x="16" y="176" width="196" height="34" rx="6" class="box muted" stroke-dasharray="5 3" />
    <text x="30" y="197" class="row dim">{t.mallory}</text>
    <text x="196" y="198" class="mark dim end">✕</text>

    <path d="M212 105 H300" class="line ok-stroke" />
    <path d="M212 149 H300" class="line ok-stroke" />
    <path d="M212 193 H272" class="line muted-stroke" stroke-dasharray="5 3" />
    <path d="M266 187 L278 199 M278 187 L266 199" class="line muted-stroke" />

    <!-- readers -->
    <text x="548" y="52" class="lbl">{t.read}</text>
    <text x="548" y="70" class="sub">{t.readSub}</text>

    <rect x="548" y="88" width="196" height="34" rx="6" class="box" />
    <text x="562" y="109" class="row">{t.readers}</text>
    <text x="730" y="110" class="mark end">✓</text>

    <rect x="548" y="132" width="196" height="34" rx="6" class="box warn" />
    <text x="562" y="153" class="row">Mallory</text>
    <text x="730" y="154" class="mark warn-fill end">✓</text>

    <rect x="548" y="176" width="196" height="34" rx="6" class="box" />
    <text x="562" y="197" class="row">{t.relay}</text>
    <text x="730" y="198" class="mark end">✓</text>

    <path d="M460 105 H548" class="line muted-stroke" />
    <path d="M460 149 H548" class="line warn-stroke" />
    <path d="M460 193 H548" class="line muted-stroke" />

    <!-- the correction -->
    <rect x="16" y="258" width="728" height="86" rx="8" class="box warn" />
    <text x="32" y="284" class="lbl warn-fill">{t.warnTitle}</text>
    <text x="32" y="306" class="row">{t.warn1}</text>
    <text x="32" y="326" class="sub">{t.warn2}</text>
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

  .ok {
    stroke: var(--ls-accent);
  }

  .warn {
    stroke: var(--ls-red);
  }

  .muted {
    stroke: var(--ls-text-faint);
  }

  .line {
    fill: none;
    stroke-width: 2;
  }

  .ok-stroke {
    stroke: var(--ls-accent);
  }

  .warn-stroke {
    stroke: var(--ls-red);
  }

  .muted-stroke {
    stroke: var(--ls-text-faint);
  }

  .ok-fill {
    fill: var(--ls-accent);
  }

  .warn-fill {
    fill: var(--ls-red);
  }

  text {
    font-family: var(--ls-font);
  }

  .lbl {
    font-size: 12px;
    font-weight: 600;
    fill: var(--ls-text);
  }

  .row {
    font-size: 11.5px;
    fill: var(--ls-text);
  }

  .sub {
    font-size: 10.5px;
    fill: var(--ls-text-dim);
  }

  .dim {
    fill: var(--ls-text-dim);
  }

  .mono {
    font-family: var(--ls-font-mono);
    font-size: 10px;
  }

  .mark {
    font-size: 13px;
    fill: var(--ls-text);
  }

  .mid {
    text-anchor: middle;
  }

  .end {
    text-anchor: end;
  }
</style>
