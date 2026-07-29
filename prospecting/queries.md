# Query-Bibliothek

Lebende Datei. Was Treffer bringt, wandert nach oben; was leer läuft, wird mit Datum
markiert und irgendwann gelöscht. Der Scout ergänzt nach jeder Runde.

**Zwei Regeln.** Jede Suche in deutscher *und* englischer Variante fahren — die Websuche
ist US-lastig, deutsche Treffer brauchen explizite Ortsbegriffe („Deutschland", „DACH",
„Anbieter", „Softwarehaus"). Und: nie nur Websuche, immer mindestens drei Kanäle
(siehe `channels.md`).

---

## A · GitHub — das stärkste Signal

Über `ToolSearch` → `select:mcp__github__search_code,mcp__github__search_repositories,mcp__github__search_users`.

Wer diese Pakete in `package.json` stehen hat, hat nachweislich ein Sync-Problem:

```
"yjs"            in:file filename:package.json
"@automerge/automerge" in:file filename:package.json
"pouchdb"        in:file filename:package.json
"@electric-sql/client" in:file filename:package.json
"@powersync/web" in:file filename:package.json
"rxdb"           in:file filename:package.json
"libp2p"         in:file filename:package.json
"@orbitdb/core"  in:file filename:package.json
"@journeyapps/react-native-quick-sqlite" in:file filename:package.json
```

Anschließend die Org hinter dem Repo prüfen: Firmenprofil, Standort, Website. Interessant
sind Orgs mit Firmenseite — nicht Einzelpersonen.

Verwandte Suchen:
- `org-Standort Deutschland` + `language:TypeScript` + Thema `offline-first`
- Contributors der einschlägigen Repos (`yjs`, `automerge`, `orbitdb`, `libp2p`) —
  wo arbeiten die hauptberuflich?
- Forks von `pouchdb`/`couchdb`-nahen Projekten mit Firmenaccount

---

## B · Stellenanzeigen — der Schmerz, öffentlich beschrieben

```
"offline-fähig" Entwickler Stellenanzeige Deutschland
"offline-first" Entwickler Stellenangebot Deutschland
Stellenanzeige PWA IndexedDB Synchronisation Entwickler Deutschland
job "CRDT" OR "conflict-free replicated" developer Germany
Stellenanzeige "Datensynchronisation" mobile App Außendienst Entwickler
site:stepstone.de "offline" Synchronisation Softwareentwickler
site:join.com "offline-first"
```

Gefunden wird nicht die Stelle, sondern **die Firma**. Die Anzeige verrät den echten
Stack, die Teamgröße und das aktuelle Problem — dreimal mehr als jede Über-uns-Seite.

---

## C · Produktseiten der Zielbranchen

Wer „auch offline" bewirbt, hat das Problem bereits gelöst und kennt die Kosten seiner
Lösung. Das ist ein besserer Gesprächseinstieg als ein unbeschriebenes Blatt.

**Sicherheit**
```
digitales Wachbuch Software Anbieter offline revisionssicher
Wächterkontrollsystem App offline Synchronisation Anbieter
Einsatzdokumentation Software Feuerwehr offline Anbieter Deutschland
Werkschutz Software Rundgang NFC offline DSGVO
```

**Mode**
```
Order App Fashion iPad Showroom offline Ordererfassung Anbieter
Fashion ERP Wholesale Showroom Messe Ordererfassung DACH
Inventur App Filiale mehrere Geräte offline Einzelhandel Software
```

**Gesundheit**
```
Pflegedokumentation App offline ambulante Pflege Anbieter Deutschland
Tourenplanung ambulante Pflege mobile Doku offline DSGVO Software
Praxissoftware "Daten bleiben" Server Deutschland Anbieter
```

**Freizeit/Tourismus**
```
Destinationsmanagement Software Gästeapp offline Karten Anbieter DACH
Bergbahn Software Ticketing Gästeapp Anbieter Österreich
Festival Crew App Schichtplanung Vorfallmeldung Software
Campingplatz Software App offline Gäste Anbieter
```

---

## D · Community & Konferenzen (warm, höchste Trefferqualität)

```
FOSDEM local-first devroom speakers <jahr>
openlocalfirst.org schedule
"Local-First Conf" speakers companies
"awesome-local-first" companies using
local-first meetup Berlin OR München OR Wien
CouchDB PouchDB Beratung Deutschland Agentur
libp2p OR IPFS Beratung Dienstleister Deutschland
```

Diese Quellen liefern Firma **und** namentlich einen technischen Ansprechpartner **und**
einen legitimen Gesprächsanlass. Drei Fliegen — deshalb vor allen anderen abarbeiten.

---

## E · Souveränität & Compliance als Auslöser

```
NIS2 Softwarehersteller Anforderungen Kunden Deutschland 2026
"digitale Souveränität" Branchensoftware Anbieter Deutschland
"Auftragsverarbeitung" Hindernis Vertrieb Gesundheitssoftware
KRITIS Software Anbieter Ausfallsicherheit offline
openDesk OR ZenDiS Partner Softwarehaus
```

---

## F · Fördererfahrung (Reibung halbieren)

```
ZIM Projekt Softwarehaus <branche> abgeschlossen
Förderkatalog Bund Verbundprojekt Software offline Synchronisation
BMBF Projekt KMU Software mobile Datenerfassung
```

Wer schon einmal gefördert entwickelt hat, kann den Ablauf. Das ist in `scoring.md`
fünf Punkte wert.

---

## G · Manuell — LinkedIn & X

Automatisch nicht erreichbar (`channels.md`). Der Agent erzeugt Such-Strings, Nico führt
sie eingeloggt aus und pastet die Ergebnisse zurück.

**LinkedIn, Personen**
```
("offline-first" OR "offline-fähig" OR "Synchronisation" OR "CRDT")
  AND (CTO OR "Head of Engineering" OR "Technischer Leiter" OR "Software-Architekt")
  — Standort DACH, Branche Softwareentwicklung, 11–200 Mitarbeitende
```

**LinkedIn, Firmen**
```
Branchensoftware + <Pflege|Sicherheitsdienst|Fashion|Destination>
  — 11–200 Mitarbeitende, DACH, „aktiv einstellend" als Zusatzfilter
```

**X, Beobachtungsliste statt Suche**
Handles rund um `local-first`, `libp2p`, `automerge`, `yjs`, `orbitdb` sowie die
Sprecherinnen und Sprecher des FOSDEM-Devrooms. Wer dort öffentlich über Sync schreibt,
ist der technische Fürsprecher, den wir in einer Zielfirma brauchen — und der Anlass
zum Schreiben ergibt sich von selbst.

---

## Wirksamkeit

| Kanal | Trefferquote | Aufwand | Priorität |
|---|---|---|---|
| D · Community/Konferenz | hoch | niedrig | **1** |
| A · GitHub | hoch | mittel | **2** |
| B · Stellenanzeigen | mittel-hoch | niedrig | **3** |
| C · Produktseiten | mittel | niedrig | 4 |
| F · Fördererfahrung | mittel | mittel | 5 |
| E · Compliance | niedrig-mittel | niedrig | 6 |
| G · manuell | hoch | hoch (Nicos Zeit) | gezielt |

Nach jeder Runde aktualisieren — die Tabelle ist eine Beobachtung, keine Setzung.
