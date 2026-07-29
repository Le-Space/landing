# Kanäle: was wirklich geht

Getestet am 2026-07-29 in der Claude-Code-Umgebung dieses Repos. Diese Liste ist der
Realitätsabgleich — sie verhindert, dass Agenten Zeit in Kanäle stecken, die geschlossen sind.

## Funktioniert automatisch

| Kanal | Werkzeug | Wert | Einschränkung |
|---|---|---|---|
| Websuche | `WebSearch` | hoch | US-lastig. Deutsche Treffer nur mit expliziten Ortsbegriffen („Deutschland", „DACH", „Anbieter"). Deutsche *und* englische Variante jeder Query fahren. |
| Firmen-Websites | `WebFetch` | hoch | Einzelne Seiten blocken (403). Dann Google-Cache-Treffer oder Unterseite versuchen. |
| GitHub | `mcp__github__search_code`, `search_repositories`, `search_users` | **sehr hoch** | Bestes Signal überhaupt: wer `libp2p`, `yjs`, `automerge`, `pouchdb`, `orbitdb` in `package.json` hat, kämpft nachweislich mit Sync. Code-Suche braucht meist einen Sprach- oder Pfadfilter. |
| Stellenanzeigen | `WebSearch` mit `site:`-Filter | hoch | Verrät den echten Stack und den aktuellen Schmerz besser als jede Marketingseite. |
| Konferenzen/Community | `WebSearch` + `WebFetch` | hoch | FOSDEM Local-First Devroom, openlocalfirst.org, Local-First Conf, „awesome-local-first", Podcast-Gästelisten. Warmes Netzwerk statt Kaltakquise. |
| Anbieter-Verzeichnisse | `WebSearch` | mittel | Capterra/OMR/Branchenportale liefern schnell eine Marktkarte einer Zielbranche. |

## Funktioniert **nicht** automatisch

| Kanal | Status | Warum |
|---|---|---|
| **X / Twitter** | gesperrt (HTTP 403) | Kein Zugriff ohne Login; Scraping verstößt gegen die Nutzungsbedingungen. |
| **LinkedIn** | praktisch gesperrt | Personenprofile sind kaum indexiert, `site:linkedin.com/in`-Suchen laufen ins Leere; automatisiertes Auslesen verstößt gegen die Nutzungsbedingungen. |
| Handelsregister / Bonitätsdaten | nicht angebunden | Kostenpflichtig, teils personenbezogen. |

**Wichtig:** Das ist kein Werkzeugproblem, das man mit einem anderen Agenten umgeht. Es ist
eine rechtliche und technische Grenze. Der Agent versucht es gar nicht erst — er bereitet
diese Kanäle für die manuelle Nutzung vor.

## Der Rückkanal (so werden X und LinkedIn trotzdem nutzbar)

Zweistufig, mit Nico als der Stelle, die eingeloggt ist:

**Hinweg — der Agent erzeugt fertige Such-Strings.** Zum Beispiel für die LinkedIn-Suche:

```
("offline-first" OR "offline fähig" OR "Synchronisation") AND (Software OR Entwicklung)
  AND (CTO OR "Head of Engineering" OR "Technischer Leiter" OR Geschäftsführer)
  — Filter: Standort DACH, Branche Softwareentwicklung, 11–200 Mitarbeiter
```

Für X: Handles und Listen statt Volltextsuche — `local-first`, `libp2p`, `automerge`,
`yjs`, FOSDEM-Devroom-Sprecher. Wer dort schreibt, ist der technische Fürsprecher, den wir
in einer Zielfirma brauchen.

**Rückweg — Nico pastet Ergebnisse zurück.** Eine Liste Firmennamen, ein Screenshot-Text,
ein CSV-Export aus Sales Navigator, ein paar X-Handles. Der Agent nimmt das als Saat,
verifiziert jede Firma über ihre eigene Website und legt sie regulär an. Damit ist die
Recherchetiefe dieselbe wie bei automatisch gefundenen Leads — nur der erste Schritt ist
manuell, und der dauert zehn Minuten pro Runde.

Ablage für Rohmaterial: `prospecting/data/inbox/<datum>-<quelle>.txt` (gitignored).

## Was statt X/LinkedIn tatsächlich besser trägt

Die Reihenfolge ist nach beobachteter Trefferqualität sortiert, nicht nach Bequemlichkeit:

1. **GitHub-Abhängigkeiten** — der ehrlichste Indikator. Niemand hat `automerge` im
   `package.json`, ohne ein Sync-Problem zu haben.
2. **Stellenanzeigen** — die Firma beschreibt ihren Schmerz selbst und öffentlich.
3. **Konferenz-Programme** — liefern Firma *und* namentlichen technischen Ansprechpartner,
   plus einen legitimen Gesprächsanlass („dein Vortrag zu …").
4. **Wettbewerbs-Produktseiten der Zielbranche** — wer „auch offline" bewirbt, hat das
   Problem gelöst und kennt die Kosten der eigenen Lösung.
5. **Förderprojekt-Datenbanken** (Förderkatalog des Bundes, ZIM-Projektlisten) — beweisen,
   dass eine Firma Förderanträge kann. Das halbiert die Reibung bei der Finanzierung.

## Recht & Daten

- **Nur Firmendaten sammeln.** Rolle („CTO") und öffentlicher Firmenkanal reichen.
  Keine privaten Mailadressen, keine Handynummern, keine zusammengetragenen
  Personenprofile. Ein Personendossier ist ein DSGVO-Problem, kein Vertriebsvorteil.
- **`prospecting/data/` ist gitignored.** Dieses Repo ist öffentlich. Kontaktdaten,
  Gesprächsnotizen und Pipeline-Stände gehören dort hinein und nirgendwo sonst.
- **Kaltakquise B2B in Deutschland:** E-Mail-Werbung ohne Einwilligung ist heikel
  (§ 7 UWG). Praktisch heißt das: keine Massenmails, sondern einzeln geschriebene,
  erkennbar individuelle Nachrichten mit sachlichem Bezug zum Produkt des Empfängers —
  und beim ersten „nein danke" endet der Kontakt. Der sicherste Weg bleibt der warme:
  Konferenz, Community, Empfehlung, offene Repos.
- **Nichts wird automatisch versendet.** Der Agent schreibt Entwürfe. Senden ist
  Menschenarbeit.
