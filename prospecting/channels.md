# Kanäle: was wirklich geht

Getestet am 2026-07-29 in der Claude-Code-Umgebung dieses Repos. Diese Liste ist der
Realitätsabgleich — sie verhindert, dass Agenten Zeit in Kanäle stecken, die geschlossen sind.

## Funktioniert automatisch

| Kanal | Werkzeug | Wert | Einschränkung |
|---|---|---|---|
| Websuche | `WebSearch` | hoch | US-lastig. Deutsche Treffer nur mit expliziten Ortsbegriffen („Deutschland", „DACH", „Anbieter"). Deutsche *und* englische Variante jeder Query fahren. |
| Firmen-Websites | `WebSearch` mit `site:firma.de` | hoch | **Nicht `WebFetch`** — siehe unten. Gezielte `site:`-Suchen liefern Snippets von echten Unterseiten; das ist der Beleg, den wir bekommen können. |
| GitHub | `mcp__github__search_code`, `search_repositories`, `search_users` | **sehr hoch** | Bestes Signal überhaupt: wer `libp2p`, `yjs`, `automerge`, `pouchdb`, `orbitdb` in `package.json` hat, kämpft nachweislich mit Sync. Code-Suche braucht meist einen Sprach- oder Pfadfilter. |
| Stellenanzeigen | `WebSearch` mit `site:`-Filter | hoch | Verrät den echten Stack und den aktuellen Schmerz besser als jede Marketingseite. |
| Konferenzen/Community | `WebSearch` + `WebFetch` | hoch | FOSDEM Local-First Devroom, openlocalfirst.org, Local-First Conf, „awesome-local-first", Podcast-Gästelisten. Warmes Netzwerk statt Kaltakquise. |
| Anbieter-Verzeichnisse | `WebSearch` | mittel | Capterra/OMR/Branchenportale liefern schnell eine Marktkarte einer Zielbranche. |

## Funktioniert **nicht** automatisch

| Kanal | Status | Warum |
|---|---|---|
| **Jeder Seitenabruf** (`WebFetch` *und* `curl`) | gesperrt (HTTP 403) | Netzwerk-Policy der Umgebung, nicht seitenspezifisch und nicht werkzeugspezifisch — auch `example.com` liefert 403. Nicht umgehen: TLS-Prüfung nicht abschalten, `HTTPS_PROXY` nicht entfernen. Diagnose und Abhilfe unten. Bestätigt 2026-07-29. |
| **X / Twitter** | gesperrt | Kein Zugriff ohne Login; Scraping verstößt gegen die Nutzungsbedingungen. |
| **LinkedIn** | praktisch gesperrt | Personenprofile sind kaum indexiert, `site:linkedin.com/in`-Suchen laufen ins Leere; automatisiertes Auslesen verstößt gegen die Nutzungsbedingungen. |
| Handelsregister / Bonitätsdaten | nicht angebunden | Kostenpflichtig, teils personenbezogen. |

### Die Sperre erkennen — 30 Sekunden vor jedem Lauf

```bash
curl -sS -o /dev/null -w '%{http_code}\n' --max-time 20 https://example.com/
curl -sS "$HTTPS_PROXY/__agentproxy/status"
```

`200` → alles offen, der starke Belegstandard gilt, diesen Abschnitt ignorieren.
`000` mit `CONNECT tunnel failed, response 403` → gesperrt. Der Status-Endpunkt
protokolliert es als `connect_rejected — gateway answered 403 to CONNECT (policy denial)`.

**Warum WebSearch trotzdem funktioniert:** Es läuft nicht über diesen Proxy. Deshalb ist
Suchen möglich, Nachlesen nicht — die eigentümlichste Eigenschaft dieser Umgebung.

### Die Sperre auflösen (nicht umgehen)

Die Standardeinstellung von Claude Code on the web erlaubt nur Paketmanager. Man erkennt
sie an der `no_proxy`-Liste: `registry.npmjs.org`, `pypi.org`, `index.crates.io`,
`proxy.golang.org` sind erreichbar, damit `pnpm install` läuft — alles andere nicht.
Drei Auswege, nach Aufwand sortiert:

1. **Rückkanal** (sofort, kein Setup): Nico öffnet die Seiten im Browser und pastet den
   Text zurück, Ablage unter `data/inbox/`. Derselbe Mechanismus wie für LinkedIn und X.
   Für eine Handvoll bekannter Firmen der schnellste Weg.
2. **Claude Code lokal** auf dem Rechner statt im Web (CLI oder Desktop-App im geklonten
   Repo): kein Egress-Proxy, Seitenabruf funktioniert normal.
3. **Netzwerk-Policy der Umgebung ändern** ([Doku](https://code.claude.com/docs/en/network-config)):
   kein Netz · nur Paketmanager (Standard) · Paketmanager plus eigene Domain-Allowlist ·
   voller Zugriff. Für Prospecting taugt die Allowlist kaum — der Zweck ist ja, Firmen zu
   finden, deren Domains vorher niemand kennt. Also voller Zugriff, und zwar bewusst in
   einer **eigenen Umgebung nur für Prospecting**: Der Container hat Schreibzugriff aufs
   Repo, und der Agent liest dann beliebige fremde Seiten. Das ist für Recherche
   vertretbar, aber nichts, was man pauschal für Sessions anschaltet, in denen Code
   committet wird.

### Was die Sperre für die Belegqualität bedeutet

Der Standard „Firmenseite geöffnet und gelesen" ist in dieser Umgebung **nicht erreichbar**.
Der ersatzweise Standard lautet:

- Verifikation per `WebSearch` mit `site:<domain>` plus gezielten Begriffen. Mehrere Suchen
  pro Firma, bis sich die Aussagen decken.
- Als Beleg zählt ein **Snippet von einer echten Unterseite der Firmendomain** — nicht die
  Zusammenfassung der Suchmaschine, und erst recht nicht ein Drittanbieter-Verzeichnis.
- Jeder so gewonnene `evidence`-Eintrag wird als **Snippet, nicht geöffnete Seite**
  gekennzeichnet. Im Dossier steht das einmal deutlich am Kopf.
- Praktische Folge fürs Scoring: Angaben zu **Firmengröße, Tech-Stack und
  Entscheidungswegen sind auf Snippet-Basis schwach belegt.** Wo die Punktzahl daran
  hängt, gehört das in „Offene Fragen" und wird im Erstgespräch geklärt — nicht
  hochgeschätzt.

Sobald der Seitenabruf funktioniert (lokale Ausführung oder geänderte Policy), gilt wieder
der stärkere Standard „geöffnet und gelesen" — dann fallen die Snippet-Warnkästen in
Dossiers und Pitches weg, und die Belegqualität der ganzen Pipeline steigt um eine Stufe.
Deshalb steht der Test oben am Anfang jedes Laufs.

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
