# Ansprache

## Grundhaltung

Nico ist Entwickler und schreibt an Entwickler und Technikverantwortliche. Der Vorteil
gegenüber jeder Agentur ist Substanz: offene Repos, laufende Demos, npm-Pakete, ehrliche
Reifegrade. Der Nachteil ist Größe — ein Zwei-Personen-Anbieter. Beides gehört offen
angesprochen, statt es zu kaschieren.

**Bitte:** kurze Sätze, Ich-Form, konkrete Technik, ehrliche Reifegrade, genau eine Frage
am Ende. Der Erstkontakt verkauft nichts — er erbittet 20 Minuten.

**Nie:** „innovativ", „ganzheitlich", „Game Changer", „revolutioniert", Feature-Listen,
erfundene Referenzkunden, Blockchain-Vokabular. Und keine Zahl, die nicht belegt ist.

## Der Erstkontakt in vier Zügen

1. **Beobachtung über ihr Produkt** — belegt, spezifisch, in einem Satz. Das ist der
   Beweis, dass die Nachricht nicht an 200 andere ging.
2. **Das Problem hinter der Beobachtung** — was ihre Lösung sie kostet. Als Frage
   formuliert, nicht als Behauptung; wir wissen es ja nicht sicher.
3. **Was wir gebaut haben** — ein Satz, ein Link, kein Katalog.
4. **Eine kleine, konkrete Bitte** — 20 Minuten, kein Verkaufsgespräch.

120–160 Wörter. Länger wird nicht gelesen.

---

## Vorlage A · Branchen-Softwarehaus mit Offline-Feature

> **Betreff:** Offline-Sync in \<Produkt\> — kurze Frage
>
> Hallo \<Name\>,
>
> ich bin über \<Produkt\> gestolpert, weil Sie damit werben, dass die App auch ohne
> Netz funktioniert. Das ist bei \<Branchen-Szenario\> auch zwingend — und meist der
> Teil, der intern am meisten Wartung kostet.
>
> Ich baue seit einigen Jahren an einem Stack, bei dem Geräte am selben Ort direkt
> miteinander synchronisieren, ohne den Umweg über einen Server: lokale Datenbank,
> konfliktfreie Zusammenführung, Signatur pro Eintrag über den Passkey des Nutzers.
> Alles offen, alles lauffähig — hier ist eine Demo, die man in 30 Sekunden zu zweit
> ausprobieren kann: \<Demo-Link\>
>
> Was ich wissen will: Wie lösen Sie heute den Fall, dass zwei Geräte gleichzeitig
> offline denselben Vorgang bearbeiten?
>
> Hätten Sie 20 Minuten? Kein Verkaufsgespräch — ich will verstehen, wo es bei Ihnen
> in der Praxis klemmt.
>
> Viele Grüße
> Nico Krause

---

## Vorlage B · CouchDB/PouchDB-Haus (kürzeste Distanz)

> **Betreff:** Offline-first ohne CouchDB-Cluster
>
> Hallo \<Name\>,
>
> Sie arbeiten mit CouchDB-Replikation — dann muss ich Ihnen lokale Datenbanken und
> Konfliktauflösung nicht erklären. Ich baue seit einigen Jahren an derselben Idee ohne
> den Server dahinter: OrbitDB im Browser, Sync über libp2p direkt zwischen den Geräten,
> Relays als austauschbare Infrastruktur auf Knopfdruck statt als Backend.
>
> Für Sie interessant wäre vermutlich weniger die Technik als die Betriebsrechnung —
> was der Cluster kostet, den es dann nicht mehr braucht.
>
> Ich würde das gern einmal an einem echten Feature von Ihnen durchrechnen, in drei bis
> vier Wochen, mit Zahlen am Ende — auch wenn die gegen mich ausgehen.
>
> 20 Minuten unter Entwicklern?
>
> Viele Grüße
> Nico Krause

---

## Vorlage C · Community-Kontakt (warm, Konferenz/GitHub)

> **Betreff:** \<Vortrag/Repo\> — und eine Frage
>
> Hallo \<Name\>,
>
> dein \<Vortrag im Local-First-Devroom / Beitrag zu \<repo\>\> zu \<Thema\> hat bei mir
> einen wunden Punkt getroffen: \<konkreter Punkt\>.
>
> Ich arbeite an derselben Ecke von der Infrastrukturseite her — libp2p-Relays auf
> Knopfdruck, OrbitDB mit Passkey-Identitäten, das Ganze offen: \<Link\>.
>
> \<Konkrete fachliche Frage zu ihrer Arbeit.\>
>
> Und falls du in eurem Umfeld jemanden kennst, der ein echtes Offline-Problem hat und
> es loswerden will — ich suche gerade Partner für einen gemeinsam finanzierten
> Prototyp.
>
> Viele Grüße
> Nico

---

## Follow-up (8–10 Tage später, ~60 Wörter)

Regel: **neuer Inhalt statt Erinnerung.** „Ich wollte nochmal nachfassen" ist eine
Nachricht ohne Anlass und wird zu Recht ignoriert.

> Hallo \<Name\>,
>
> kurzer Nachtrag: \<neuer Anlass — Demo online gestellt, Paket veröffentlicht,
> Artikel gelesen, der zu ihrem Fall passt\>.
>
> \<Ein Satz, warum das für sie relevant ist.\>
>
> Falls das Thema bei Ihnen gerade keine Priorität hat, sagen Sie einfach kurz Bescheid —
> dann höre ich auf zu schreiben.
>
> Viele Grüße
> Nico Krause

Der letzte Satz ist ernst gemeint. Zwei Nachrichten ohne Antwort heißt: Lead auf `lost`,
mit Grund. Kein dritter Versuch.

---

## Der richtige Demo-Link

Ein Link, passend zum Schmerz. Nie die Portfolio-Startseite — die ist eine Übersicht,
kein Beweis. Quelle: `packages/shared/src/data/projects.js`.

| Ihr Schmerz | Link | Was sie in 30 Sekunden sehen |
|---|---|---|
| Mehrere Geräte, gemeinsamer Vorgang | `simple-todo.le-space.de` | Zwei Browser, dieselbe Liste, ohne Anmeldung |
| Rechte und private Daten | `acl01.le-space.de` | Schreibrechte pro Identität, zur Laufzeit vergeben |
| Wer hat was geschrieben (Revision) | `passkey01.le-space.de` | Jeder Eintrag mit Passkey signiert, Autor sichtbar |
| Gar keine Infrastruktur vorhanden | `webrtc-qr.le-space.de` | Zwei Browser verbinden sich per QR-Code, ohne Server |
| Betriebskosten der Infrastruktur | Relay-Button-Doku | Relay an, Relay aus — Infrastruktur auf Zeit |

---

## Die drei Einwände, die immer kommen

**„Ist das Blockchain?"** Nein. Kein Konsens, keine Token, keine Kette, keine Miner.
Eine lokale Datenbank pro Gerät, die sich mit anderen abgleicht — näher an git als an
Bitcoin. Wichtig: aktiv abgrenzen, bevor die Frage kommt. Wer sie erst am Ende stellt,
hat das Gespräch schon halb abgeschrieben.

**„Was, wenn Sie morgen nicht mehr da sind?"** Berechtigt — bei zwei Leuten. Antwort:
Alles ist Open Source, die Bausteine sind einzeln auf npm, und Ihre Entwickler arbeiten
im Projekt mit, statt zuzusehen. Das Ergebnis läuft ohne uns weiter. Nicht wegdiskutieren,
sondern konkret beantworten.

**„Unsere Kunden wollen doch eine zentrale Auswertung."** Richtig, und die bleibt.
Local-First heißt nicht serverlos um jeden Preis — es heißt, dass der Server nicht mehr
die Voraussetzung fürs Arbeiten ist. Auswertung, Abrechnung, Reporting laufen weiter
zentral. Wer hier absolut argumentiert, verliert.

## Kanalwahl

E-Mail an eine benannte technische Person schlägt alles. `info@` ist der letzte Ausweg.
Ein GitHub-Issue oder eine fachliche Antwort in einer Community ist wärmer als jede Mail —
aber nur, wenn der Beitrag für sich stehen kann und nicht als Vertriebsmasche lesbar ist.

Und: Kaltakquise per Mail ist in Deutschland rechtlich heikel (`channels.md`, „Recht &
Daten"). Einzeln geschriebene Nachrichten mit erkennbarem Sachbezug, keine Serien.
