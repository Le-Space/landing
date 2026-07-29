---
name: prospecting
description: Kundengewinnung für den Le-Space Local-First-Stack — Kandidaten finden, bewerten, Prototyp-Angebot und Erstkontakt vorbereiten, Pipeline pflegen. Nutzen bei Anfragen wie "neue Leads suchen", "Prospecting-Runde", "wer könnte einen Prototyp mitfinanzieren", "Pipeline-Stand", "Anschreiben für Firma X", oder wenn nach Kunden/Partnern für den P2P-Stack gefragt wird.
---

# Prospecting für den Le-Space Local-First-Stack

Ziel: Softwarehäuser, Agenturen und Marken-IT finden, die einen **gemeinsam finanzierten
Prototyp** auf dem Local-First-P2P-Stack bauen wollen. Nicht: Endkunden-Lizenzverkauf.

Alle Grundlagen liegen unter `prospecting/`. **Vor dem ersten Schritt lesen:**
`prospecting/README.md` (Betriebsanleitung), `prospecting/icp.md` (wen wir suchen),
`prospecting/channels.md` (was technisch/rechtlich geht).

## Die drei Agenten

| Agent | Aufgabe | Wann |
|---|---|---|
| `prospect-scout` | Breitensuche, rohe Kandidaten mit Quellen | Pipeline füllen |
| `prospect-analyst` | eine Firma tief recherchieren, scoren, Dossier | Lead qualifizieren |
| `prospect-pitch` | Anschreiben, Prototyp-Einseiter, Finanzierungsweg | Tier A/B ansprechen |

Sie laufen **nur auf ausdrückliche Anweisung** des Nutzers. Ohne Auftrag: recherchier
selbst, ohne Subagenten zu starten.

## Ablauf einer Prospecting-Runde

1. **Achse festlegen.** Eine Branche oder ein Signal pro Runde
   (z. B. „Sicherheitsbranche DACH" oder „Firmen mit Yjs im package.json").
   Nicht alles gleichzeitig — sonst wird jede Spur flach.
2. **Scout** auf die Achse ansetzen, Zielmenge 8–15 Kandidaten.
3. **Triage** (das machst du selbst, ohne Agent): offensichtliche Fehltreffer nach
   `icp.md` raus. Erwartung: die Hälfte fällt hier.
4. **Analyst** auf die verbliebenen, einen pro Aufruf. Bei mehreren parallel starten.
5. **Priorisieren** nach Score. Tier A → Pitch. Tier B → Merkliste mit Trigger
   („wenn sie eine Offline-Stelle ausschreiben"). Tier C → begründet schließen.
6. **Pitch** für Tier A. Ergebnis geht an Nico zur Freigabe — **nie selbst versenden.**
7. **Runde protokollieren** in `prospecting/data/log.md`: Datum, Achse, Zahlen
   (gefunden / qualifiziert / Tier A), was funktioniert hat, welche Queries leer liefen.
   Erfolgreiche Queries wandern in `prospecting/queries.md`.

## Pipeline-Stand berichten

`prospecting/data/prospects.ndjson` lesen und nach `status` gruppieren. Immer nennen:
Anzahl je Stufe, die Tier-A-Leads namentlich mit nächster Aktion, überfällige Follow-ups
(> 10 Tage in `contacted` ohne Antwort), und die dünnste Stelle der Pipeline.

## Grenzen — nicht verhandelbar

- **Nichts wird eigenmächtig verschickt.** Kein Mailversand, kein Kontaktformular, kein
  Post auf einer Plattform. Der Agent schreibt Entwürfe, Nico entscheidet und sendet.
- **Kein Login-Scraping.** LinkedIn und X sind hier gesperrt und ToS-seitig tabu. Für diese
  Kanäle werden fertige Such-Strings zum manuellen Ausführen erzeugt; Ergebnisse kann Nico
  zurückpasten (siehe `channels.md`, „Rückkanal").
- **Keine erfundenen Firmen, Personen, Zitate oder Referenzkunden.** Jede Behauptung
  braucht eine tatsächlich geöffnete Quelle.
- **Datensparsam.** Firmendaten ja, Personendossiers nein. Rolle und öffentlicher
  Firmenkanal genügen. `prospecting/data/` ist bewusst gitignored — dort liegende
  Kontaktdaten gehören nicht in ein öffentliches Repo.
