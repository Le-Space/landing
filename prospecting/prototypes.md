# Prototyp-Katalog

Sieben vorgedachte Prototypen. Zweck: In einem Erstgespräch nicht über „Local-First"
reden, sondern über eine Sache, die in vier bis acht Wochen läuft und die man anfassen kann.
**P7 ist die Ausnahme — den gibt es schon** (`yoga-p2p`), er lässt sich vorführen statt
beschreiben. P6 ist kein Prototyp, sondern der bezahlte Einstieg davor.

Jeder Prototyp folgt derselben Logik: **Er nutzt fast nur, was schon existiert.** Das ist
das eigentliche Verkaufsargument — nicht „wir könnten", sondern „vier von fünf Bausteinen
liegen als npm-Paket vor, gebaut wird die Domäne."

Preisrahmen sind Verhandlungsanker für Rahmenprojekte, keine Angebote. Der Scope bestimmt
den Preis, immer als Spanne kommunizieren.

---

## Vorab: was „ohne Netz" bei uns wirklich heißt

Vor jedem Kundengespräch lesen. Wer hier zu großzügig formuliert, verliert das erste
technische Gespräch — und mit ihm den Kunden.

| | Ohne Internet? |
|---|---|
| App starten (statisches Bundle, als PWA gecacht) | **ja** |
| Lokal lesen und schreiben (OrbitDB/IndexedDB) | **ja** |
| Eintrag mit Passkey signieren | **ja** — braucht nie eine Verbindung |
| Zwei Geräte im selben Raum finden sich und synchronisieren | **nein, nicht von allein** |

Der letzte Punkt ist die Grenze — aber sie verläuft anders, als es zunächst aussieht.
`packages/shared/src/lib/p2p/network.js` fährt `webSockets`, `webRTC`,
`circuitRelayTransport` und `pubsubPeerDiscovery` über Bootstrap-Adressen: **es gibt kein
mDNS, Browser können sich nicht von allein im lokalen Netz finden.** Die entscheidende
Frage ist deshalb nicht „Relay oder nicht", sondern:

> **Peer-Discovery braucht entweder ein Relay — oder einen Menschen, der am selben Ort
> steht.** Wo jemand ohnehin persönlich erscheint, ist gar keine Infrastruktur nötig.

`yoga-p2p` (siehe P7) beweist die zweite Hälfte: Der Check-in an der Rezeption koppelt
per QR-Scan, ganz ohne Relay, Broker oder Konto — gossipsub läuft ausschließlich
*innerhalb* der so ausgehandelten WebRTC-Verbindung. Dasselbe Muster trägt bei der
Wachablösung, der Objektübergabe, dem Crew-Briefing und der Ordersession im Showroom:
überall dort, wo Kopplung ein **Ereignis** ist und kein Dauerzustand.

Ein Relay braucht es erst, wenn Geräte einander *kontinuierlich* sehen müssen, ohne dass
jemand vorbeikommt. Dann gibt es zwei Wege, beide mit Preis:

- **Relay im lokalen Netz** (relay-button auf einem Mini-PC — im Fahrzeug, am Objekt,
  im Backstage). Dann funktioniert „ohne Internet", aber nicht „ohne Infrastruktur".
  Konkreter Haken, der in jede Aufwandsschätzung gehört: Browser dialen nur `wss` oder
  WebTransport, das verlangt ein **gültiges TLS-Zertifikat** — für eine LAN-IP oder einen
  Gerätenamen ist das echte Arbeit, keine Fußnote.
- **`libp2p-webrtc-qr`** — der einzige Weg wirklich ohne jede Infrastruktur. Aber Status
  `prototype`, und es koppelt **1:1 per Bildschirm-Scan**, kein Mesh aus acht Geräten.

**Konsequenz für die Ansprache:** „mehrere Geräte synchronisieren ohne Netz" ist nicht
unser leichter Sieg, sondern unser schwieriger Fall — und ausgerechnet der, den
Wettbewerber offen als Lücke stehen lassen. Was ohne jede Einschränkung trägt, ist die
**Signatur beim Schreiben**: die Beweiskette hängt am Eintrag statt am Server, im dritten
Untergeschoss ohne Verbindung. Das ist das Argument, mit dem man einsteigt. Der
Mehrgeräte-Sync kommt danach — mit dem Relay vor Ort und dem ehrlichen Aufwand dafür.

---

## P1 · Einsatzprotokoll ohne Netz *(Sicherheit)*

**Problem.** Zwei Kräfte am selben Objekt dokumentieren einen Vorfall. Kein Empfang.
Beide schreiben in ihr Gerät, keiner sieht den anderen, die Zusammenführung ist später
Handarbeit — und ob ein Eintrag nachträglich geändert wurde, weiß am Ende nur der Server.

**Was gebaut wird.** PWA-Schichtbuch. Kern ist die **Signatur beim Schreiben**: jeder
Eintrag wird mit dem Passkey des Mitarbeiters signiert, der Schlüssel bleibt in der
Secure Enclave — das funktioniert ohne jede Verbindung. Für den Mehrgeräte-Fall am
selben Objekt läuft ein **Relay im Einsatzfahrzeug** (relay-button auf einem Mini-PC);
für die 1:1-Kopplung ohne jede Infrastruktur gibt es den QR-Handshake. Nach Schichtende
Export ins bestehende System und Archivierung.

**Nicht drin, und das gehört ins Angebot:** Geräte finden sich *nicht* von allein im
lokalen Netz (siehe oben — kein mDNS im Browser). Das Fahrzeug-Relay ist Teil der
Lösung, nicht Beiwerk, und sein TLS-Setup steckt im Aufwand.

**Vorhandene Bausteine.** `orbitdb-identity-provider-webauthn-did` (Varsig,
Hardware-Signatur) · `libp2p-webrtc-qr` (Pairing ohne Relay) · `relay-button`
(Fahrzeug-Relay) · `orbitdb-storacha-bridge` (Archiv) · `simple-todo` als Referenz-PWA
inklusive ACL-Kapitel

**Neu.** Domänenmodell Schichtbuch, Export ins Zielsystem, Bedienung mit Handschuhen.

**Umfang.** 6–8 Wochen · 35–60 k€ · Abnahme: zwei Geräte, Flugmodus, getrennte Einträge,
danach Zusammenführung ohne Konflikt, Signaturprüfung besteht, ein manipulierter Eintrag
fällt auf.

**Was der Partner beistellt.** Ein reales Objekt zum Testen, zwei Mitarbeiter für je einen
halben Tag, das Zielformat des Exports.

---

## P2 · Showroom-Order auf mehreren Tablets *(Mode)*

**Problem.** Ordertermin im Showroom, drei Tablets, Messe-WLAN. Heute erfasst jeder
für sich und hofft, dass am Abend nichts doppelt ist.

**Was gebaut wird.** Order-Session als geteilte lokale Datenbank. Alle Tablets im Raum
sehen dieselbe Order in Echtzeit **ohne Uplink ins Internet** — über ein kleines Relay im
Showroom, nicht über das Messe-WLAN nach Frankfurt und zurück. Positionen, Mengen,
Größenläufe mergen konfliktfrei. Am Ende ein bewusster Übergabeschritt ins ERP, mit
Vorschau und Freigabe statt Dauersynchronisation.

**Ehrlich dazu:** „ohne Uplink" heißt nicht „ohne alles". Das Showroom-Relay (ein
Mini-PC oder ein Laptop) ist Teil des Aufbaus; ohne es finden sich die Tablets nicht.

**Vorhandene Bausteine.** `simple-todo` Kapitel `collab01` (geteilte Listen per Adresse)
und `acl01` (Schreibrechte pro DID) · `relay-button` für ein Showroom-Relay ·
`orbitdb-relay` als Zwischenspeicher, solange kein Gerät online ist

**Neu.** Order-Datenmodell, Größenlauf-Logik, ERP-Export, Konfliktdarstellung für
kaufmännische Nutzer (die wichtigste offene Designfrage).

**Umfang.** 4–6 Wochen · 30–50 k€ · Abnahme: drei Tablets ohne Uplink erfassen 30 Minuten
lang gemeinsam eine Order; Ergebnis stimmt mit dem Protokoll überein, ERP-Import läuft
fehlerfrei.

---

## P3 · Pflegedoku, die der Betreiber nicht lesen kann *(Gesundheit)*

**Problem.** Nicht das Offline-Feature — das haben alle. Der Engpass ist die
Auftragsverarbeitung: Jeder Kunde verhandelt neu darüber, dass Gesundheitsdaten beim
Softwarehaus liegen.

**Was gebaut wird.** Mobile Tourendoku, deren Einträge mit einem aus dem Passkey
abgeleiteten Schlüssel verschlüsselt sind (WebAuthn-PRF). Relay und Backup sehen nur
Chiffrat; Freigabe an Kolleginnen und Leitung läuft über Delegation, nicht über einen
Admin-Zugang. Nachweis am Ende: ein Dump des Relays, in dem nichts Lesbares steht.

**Vorhandene Bausteine.** `orbitdb-identity-provider-webauthn-did` (PRF-verschlüsselter
Keystore) · `NiKrause/de2do` (PRF-Prototyp, muss repariert werden — im Angebot ehrlich
als Vorarbeit ausweisen) · `orbitdb/simple-encryption` · `ucan-store` und
`orbitdb-storacha-bridge` für verschlüsseltes Backup

**Neu.** Schlüsselwechsel bei Geräteverlust (mit `p2pass` als Ansatz), Freigabelogik im
Team, Doku-Datenmodell.

**Umfang.** 8–10 Wochen · 45–70 k€ · Abnahme: ein Relay-Dump enthält keine Klardaten;
Geräteverlust und Wiederherstellung funktionieren; ein Datenschutzbeauftragter zeichnet
das Konzept ab.

**Achtung.** Bewusst außerhalb der MDR — Leistungsnachweis und Organisation, keine
Diagnose- oder Therapieunterstützung. Das gehört in den ersten Satz des Angebots, nicht
ins Kleingedruckte.

---

## P4 · Gelände-Mesh für Crew und Gäste *(Freizeit/Tourismus)*

**Problem.** Bei 20.000 Gästen bricht das Mobilfunknetz zusammen. Genau dann braucht die
Crew Schichtpläne, Vorfallmeldungen und Checklisten.

**Was gebaut wird.** Crew-PWA plus ein Relay auf einem kleinen Rechner am Gelände.
Alles läuft über das lokale Netz; die App ist ein IPFS-Bundle, das auch ohne Uplink
startet. Nach der Veranstaltung wird das Relay gestoppt und der Verlauf archiviert —
Infrastruktur nur für die Dauer des Events.

**Der Aufwand steckt im Relay, nicht in der App.** Es muss vom Browser dialbar sein, also
`wss` mit gültigem Zertifikat auf einem Gerät im Netz des Geländes. Das ist der Teil, den
man beim Testlauf zuerst probt — und der Grund, warum P4 fünf bis sieben Wochen dauert
und nicht zwei.

**Vorhandene Bausteine.** `relay-button` (genau dieses Ein-/Ausschalt-Muster) ·
`uc-chat` (Gruppenkommunikation über libp2p) · `simple-todo` als PWA-Grundlage ·
IPFS-Deployment wie bei dieser Website

**Neu.** Schicht-/Aufgabenmodell, Eskalationswege, Betrieb auf Kleinrechner-Hardware,
Gästemodus (lesend).

**Umfang.** 5–7 Wochen · 30–50 k€ · Abnahme: Testlauf auf echtem Gelände mit
abgeschaltetem Uplink, 20 Geräte, eine Stunde.

---

## P5 · Sync-Schicht ersetzen *(Softwarehäuser, das Kern-ICP)*

**Problem.** Die Firma hat vor Jahren eine eigene Replikation gebaut oder auf
CouchDB/PouchDB gesetzt. Sie funktioniert halbwegs, aber niemand fasst sie gern an, und
der Serverbetrieb kostet jeden Monat Geld.

**Was gebaut wird.** Ein echtes Feature aus ihrem Produkt — kein Spielzeug — auf unserem
Stack nachgebaut, parallel zum Bestand. Danach ein Vergleich mit Zahlen: Sync-Dauer,
Konfliktverhalten, Serverkosten, Codezeilen, Verhalten im echten Funkloch.

**Vorhandene Bausteine.** praktisch der ganze Stack; das Ergebnis ist eine Bewertung,
keine Migration.

**Neu.** Der Nachbau ihres Features und ein belastbarer Vergleich — inklusive der
ehrlichen Antwort, wo unser Stack heute *schlechter* ist (Volltextsuche über große
Datenmengen, serverseitige Auswertungen, Reporting).

**Umfang.** 3–4 Wochen · 18–30 k€ · Abnahme: ein Bericht, mit dem die Geschäftsführung
eine Investitionsentscheidung treffen kann.

**Warum das der beste Einstieg ist.** Kleinster Betrag, kürzeste Entscheidung, kein
Produktrisiko — und wenn der Vergleich für uns ausgeht, ist das Folgeprojekt praktisch
schon verkauft. Wenn nicht, wissen es beide früh und billig.

---

## P6 · Der Ein-Tages-Einstieg

**Problem.** Kein Erstgespräch trägt 40 k€.

**Was passiert.** Ein bezahlter Workshop-Tag beim Kunden: Wo genau tut Konnektivität weh,
was kostet das im Jahr, welche zwei Prozesse wären Kandidaten, was ginge mit vorhandenen
Bausteinen. Ergebnis ist eine zweiseitige Skizze mit Aufwandsschätzung — die dem Kunden
gehört, auch wenn er nicht weitermacht.

**Umfang.** 1 Tag vor Ort plus 1 Tag Nachbereitung · 1.500–2.500 € · wird bei Beauftragung
eines Prototyps voll angerechnet.

**Warum das fast immer der erste Schritt ist.** Es qualifiziert beide Seiten, es kostet
den Kunden wenig genug für eine Bauchentscheidung, und ein bezahlter Termin ist ein
völlig anderes Gespräch als ein kostenloser.

---

## Auswahl im Gespräch

1. Wo verlieren Ihre Nutzer heute das Netz — und was passiert dann?
0. Kommen Ihre Kunden persönlich vorbei? Wenn ja, ist P7 der kürzeste Weg — dort koppelt ein Mensch mit einem QR-Code, und es braucht gar keine Infrastruktur.
2. Wie oft, wie viele Nutzer, wie viel Nacharbeit im Monat?
3. Blockiert der Datenschutz gerade Deals?
4. Wer hat die Sync-Schicht gebaut, und arbeitet die Person noch bei Ihnen?

Antwort 1 wählt die Branche und damit P1–P4. Fällt Antwort 4 unangenehm aus, ist es P5.
Ist noch nichts davon scharf, ist es P6.

## P7 · Guthaben ohne Server *(Kursbetrieb, Wellness, Freizeit)*

**Sonderstellung: Dieser Prototyp existiert bereits** — [`yoga-p2p`](https://github.com/Le-Space/yoga-p2p),
Kursbuchung für Yogastudios mit mehreren Standorten. Ledger und Verbindungs-Assistent
stehen und sind getestet, Registry, Programm-Editor, Buchungen und Barkauf sind M1–M4.
Er ist damit weniger ein Angebot als ein **Beweisstück**: das einzige Stück im Katalog,
das man vorführen statt beschreiben kann.

**Problem.** Ein Studio mit drei Standorten verkauft Zehnerkarten. Damit Standort B weiß,
was Standort A entwertet hat, braucht es heute ein Buchungs-SaaS — monatlich pro Mitglied,
bei Margen, die das kaum hergeben, und mit den Daten aller Kundinnen beim Anbieter. Fällt
das Netz oder der Dienst aus, steht die Rezeption.

**Was gebaut ist.** Jede Karte ist ein append-only Log aus `issue`/`redeem`/`void`,
jedes Event vom schreibenden Gerät signiert. Guthaben wird nie gespeichert, immer
gefaltet — deshalb kommen zwei Standorte, die dieselbe Karte unabhängig entwerten, ohne
Abstimmung zum selben Ergebnis. Gekoppelt wird per QR an der Rezeption. **Der Kunde ist
der Sync-Kurier:** sein Gerät trägt den eigenen Ledger von Standort zu Standort, und weil
der Check-in die neuesten Stände *vor* dem Entwerten zieht, sieht Standort B die
Entwertung von Standort A, sobald dieselbe Person auftaucht.

**Verwendete Bausteine.** `@le-space/libp2p-webrtc-qr` (Signalisierung) ·
Passkey-DID/WebAuthn (Identität) · OrbitDB (Ledger) · Le-Space-Design-Tokens ·
IPFS-Deployment. Kein Relay, kein Server, kein Konto.

**Ehrlich dazu — steht so in `docs/LIMITS.md` und gehört in jedes Gespräch:**
- **Double-Spend wird erkannt, nicht verhindert.** Ohne Server oder Trusted Hardware ist
  das unlösbar (klassisches Offline-E-Cash-Problem). Schaden pro Vorfall: eine Yogastunde.
  Der Reducer erzeugt bei mehrdeutigem Log nie Guthaben.
- **OrbitDB kennt keine Leserechte.** Wer eine DB-Adresse kennt und einen Peer erreicht,
  liest sie vollständig. „Jeder repliziert nur seinen eigenen Ledger" ist eine
  Verteilungs-Konvention, keine durchgesetzte Grenze — der Zuschnitt pro Schüler ist die
  Antwort darauf, nicht Verschlüsselung. **Das ist der größte Einwand in jedem
  DSGVO-Gespräch; wer ihn nicht selbst anspricht, verliert das Gespräch später.**
- **Kein TURN.** Symmetrische NATs auf beiden Seiten verbinden nicht. Betrifft den
  Remote-Pfad (Copy & Paste per Messenger), nicht den Studio-Pfad (QR, gleiches Netz).

**Übertragbar auf** alles mit Guthaben, Check-in vor Ort und mehreren Standorten:
Kletterhallen, Fitness, Tanzschulen, Physio und Massage, Musikschulen, Saunen und Thermen,
Coworking, Kinderkurse, Verleih. Die Yoga-Domäne ist austauschbar, das Ledger-Muster nicht.

**Umfang für eine Adaption.** 4–6 Wochen · 25–45 k€ (Domänenmodell, Oberfläche, Import
des Bestands) — deutlich unter den anderen Prototypen, weil der Kern steht.

---
