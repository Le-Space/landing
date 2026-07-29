# Prototyp-Katalog

Sechs vorgedachte Prototypen. Zweck: In einem Erstgespräch nicht über „Local-First"
reden, sondern über eine Sache, die in vier bis acht Wochen läuft und die man anfassen kann.

Jeder Prototyp folgt derselben Logik: **Er nutzt fast nur, was schon existiert.** Das ist
das eigentliche Verkaufsargument — nicht „wir könnten", sondern „vier von fünf Bausteinen
liegen als npm-Paket vor, gebaut wird die Domäne."

Preisrahmen sind Verhandlungsanker für Rahmenprojekte, keine Angebote. Der Scope bestimmt
den Preis, immer als Spanne kommunizieren.

---

## P1 · Einsatzprotokoll ohne Netz *(Sicherheit)*

**Problem.** Zwei Kräfte am selben Objekt dokumentieren einen Vorfall. Kein Empfang.
Beide schreiben in ihr Gerät, keiner sieht den anderen, die Zusammenführung ist später
Handarbeit — und ob ein Eintrag nachträglich geändert wurde, weiß am Ende nur der Server.

**Was gebaut wird.** PWA-Schichtbuch. Geräte am selben Objekt finden sich direkt
(libp2p; ohne jede Infrastruktur per QR-Handshake). Jeder Eintrag wird beim Schreiben mit
dem Passkey des Mitarbeiters signiert — der Schlüssel bleibt in der Secure Enclave.
Optional ein Relay im Fahrzeug für Objektübergreifendes. Nach Schichtende Export ins
bestehende System und Archivierung.

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
sehen dieselbe Order in Echtzeit, ohne Uplink; Positionen, Mengen, Größenläufe mergen
konfliktfrei. Am Ende ein bewusster Übergabeschritt ins ERP, mit Vorschau und Freigabe
statt Dauersynchronisation.

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
2. Wie oft, wie viele Nutzer, wie viel Nacharbeit im Monat?
3. Blockiert der Datenschutz gerade Deals?
4. Wer hat die Sync-Schicht gebaut, und arbeitet die Person noch bei Ihnen?

Antwort 1 wählt die Branche und damit P1–P4. Fällt Antwort 4 unangenehm aus, ist es P5.
Ist noch nichts davon scharf, ist es P6.
