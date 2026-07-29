# Prospecting — Kunden für den Local-First-Stack

Ziel: **Partner finden, die einen Prototyp mitfinanzieren.** Nicht Lizenzen verkaufen,
nicht Endkunden gewinnen. Ein Softwarehaus, eine Agentur oder eine Marken-IT bringt
Domäne, Kunden und Geld — Le-Space bringt den Stack und baut mit.

## Was hier liegt

| Datei | Inhalt |
|---|---|
| `icp.md` | Wen wir suchen, wen ausdrücklich nicht, welche Kaufauslöser zählen |
| `industries.md` | Branchenthesen: Sicherheit, Mode, Gesundheit, Freizeit/Tourismus, Softwarehäuser |
| `prototypes.md` | **P1–P6** — sechs vorgedachte Prototypen mit Scope, Dauer, Preisrahmen |
| `scoring.md` | Bewertungsrubrik, 6 Dimensionen, Tier A/B/C |
| `channels.md` | Was automatisch geht, was nicht (X/LinkedIn), Rückkanal, Recht & Daten |
| `queries.md` | Query-Bibliothek je Kanal und Branche, zum Kopieren |
| `funding.md` | Förderwege und Deal-Formate D1–D5, IP-Frage |
| `outreach.md` | Anschreiben-Vorlagen, Demo-Link-Matrix, die drei Standardeinwände |
| `seed-list.md` | Ergebnis des ersten Rechercheduchlaufs (2026-07-29), unbewertet |
| `prospects.schema.json` | Datenformat der Pipeline |
| `data/` | **gitignored** — Pipeline, Dossiers, Pitches, Kontaktdaten |

## Die Agenten

Drei Subagenten unter `.claude/agents/`, orchestriert von der Skill `prospecting`
(`.claude/skills/prospecting/SKILL.md`):

- **`prospect-scout`** — Breitensuche über Web, GitHub, Stellenanzeigen, Konferenzen.
  Liefert rohe, quellenbelegte Kandidaten.
- **`prospect-analyst`** — recherchiert eine Firma tief, bewertet nach Rubrik, schreibt
  ein Dossier, wählt den Prototyp-Aufhänger.
- **`prospect-pitch`** — macht daraus Anschreiben, Prototyp-Einseiter,
  Finanzierungsvorschlag und Gesprächsleitfaden.

## Benutzung

```
Prospecting-Runde für die Sicherheitsbranche, 10 Kandidaten
Qualifiziere LiteLog
Schreib den Pitch für prodress
Wie steht die Pipeline?
```

Die Skill greift bei solchen Formulierungen. Die Agenten laufen **nur auf ausdrückliche
Anweisung** — ohne Auftrag wird direkt recherchiert, ohne Subagenten zu starten.

## Ablauf einer Runde

1. **Eine** Achse festlegen (eine Branche oder ein Signal) — nicht alles gleichzeitig.
2. Scout ansetzen, 8–15 Kandidaten.
3. Triage nach `icp.md`. Die Hälfte fällt hier raus, das ist normal.
4. Analyst auf den Rest, einer pro Aufruf.
5. Tier A → Pitch. Tier B → Merkliste mit Trigger. Tier C → begründet schließen.
6. Runde in `data/log.md` protokollieren, `queries.md` nachpflegen.

## Grenzen

- **Nichts wird automatisch verschickt.** Der Agent schreibt Entwürfe. Senden ist
  Menschenarbeit — und Kaltakquise per Mail ist in Deutschland rechtlich heikel
  (`channels.md`).
- **X und LinkedIn sind automatisch nicht erreichbar** (403 bzw. kaum indexiert, und
  ToS-seitig tabu). Dafür gibt es den Rückkanal: Der Agent erzeugt fertige Such-Strings,
  Nico führt sie eingeloggt aus und pastet die Ergebnisse zurück. Zehn Minuten pro Runde.
- **Keine erfundenen Firmen, Personen, Zitate oder Referenzkunden.** Jede Behauptung
  braucht eine tatsächlich geöffnete Quelle.
- **Datensparsam.** Firmendaten ja, Personendossiers nein. Rolle und öffentlicher
  Firmenkanal genügen. `data/` ist gitignored — dieses Repo ist öffentlich.

## Der ehrliche Teil

Die Werkzeuge hier sind der kleinere Hebel. Was tatsächlich über den ersten Auftrag
entscheidet:

- **Ein Prototyp, den man in 30 Sekunden zu zweit ausprobieren kann**, schlägt jede
  Präsentation. Die Demo-Kapitel von `simple-todo` sind schon das stärkste
  Vertriebsmaterial, das existiert — sie gehören in jedes Anschreiben, nicht die
  Portfolio-Startseite.
- **Der warme Weg schlägt den kalten um Größenordnungen.** FOSDEM-Devroom, CouchDB-Umfeld,
  libp2p-Community. Die Startliste beginnt genau deshalb dort.
- **Der Ein-Tages-Workshop (P6) ist die wichtigste Erfindung im Katalog.** Er verwandelt
  ein unverbindliches Gespräch in einen bezahlten Termin — und qualifiziert beide Seiten,
  bevor jemand 40 k€ riskiert.
- **Der Satz „ein Teil davon ist förderfähig, und ich weiß wie"** macht aus einer
  Budgetfrage eine Terminfrage. Siehe `funding.md`.
