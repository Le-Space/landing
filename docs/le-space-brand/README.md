# Le-Space Brand-Paket

Neues Logo („Der erste Knoten") und aufgefrischtes Brand-System für le-space.de / local-first.le-space.de.
Vollständige Regeln: **Le-Space-Brand-Style-Guide.pdf**

## Struktur

```
le-space-brand/
├── Le-Space-Brand-Style-Guide.pdf
├── logo/
│   ├── svg/    Quelldateien (Wortmarke als Pfade, keine Font-Abhängigkeit)
│   └── png/    Exporte @1024/@2048 + og-image-1200x630.png
├── favicon/    favicon.ico, PNGs 16–512, apple-touch-icon
├── visitenkarten/  6 Varianten (CEO, Research, AI Guide × DE/EN)
│                   beidseitig, 85×55 mm + 3 mm Beschnitt, druckfertig
└── briefkopf/      briefkopf-*.pdf (Design) + brief-vorlage-*.docx (beschreibbar)
```

## Visitenkarten & Briefkopf

Kontakt auf allen Varianten: Nico Krause · +49 174 9 89 19 49 ·
nico.krause@le-space.de · le-space.de · Germany (ohne Ort/Straße).

| Variante | Titel |
|---|---|
| ceo-de / ceo-en | Geschäftsführer / CEO |
| research-de / research-en | Research- & Incubation-Engineer (P2P & Local-First) |
| ai-guide-de / ai-guide-en | AI Walking & Coding Guide |

Karten-PDFs enthalten 3 mm Beschnitt umlaufend (Endformat 85×55 mm),
Seite 1 = Vorderseite, Seite 2 = Rückseite. Rückseiten-Tagline: DE „Daten und
Software, die dir gehören." / EN "Software you can keep."

## Kernpalette

| Farbe | Hex | Verwendung |
|---|---|---|
| Deep Space | `#0B0E15` | Hintergrund |
| Nebula | `#141926` | Cards, Panels |
| Horizon | `#232B3D` | Borders |
| Starlight | `#EDF1F8` | Überschriften |
| Stardust | `#A8B3C7` | Fließtext |
| Signal Coral | `#FF6B5B` | Primärakzent, lokaler Knoten |
| Sync Cyan | `#58C7F3` | Links, Peers, Sync |

Layer: Identität `#3EDC97` · Daten `#FFC24B` · Sync `#58C7F3` · Infrastruktur `#A78BFA` · Archiv `#FF6B5B`
Light-Mode: Ink `#141B2E`, Coral `#E8503F`, Cyan `#0E86C4`

## Fonts

- **JetBrains Mono** (Wortmarke, Code, Labels): https://www.jetbrains.com/lp/mono/
- **Inter** (Headlines, Fließtext, UI): https://rsms.me/inter/

Die SVG-Wortmarke ist in Pfade konvertiert — Fonts werden nur für neue Texte benötigt.

## Einbindung

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/le-space-favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:image" content="https://le-space.de/og-image-1200x630.png">
```

`site.webmanifest` liegt im favicon-Ordner.
