# Branchenthesen

Pro Branche: wo der Schmerz sitzt, welche Schicht unseres Stacks ihn adressiert, wer
tatsächlich unterschreibt, und woran man einen guten Kandidaten erkennt. Die Firmennamen
sind Rechercheergebnisse (siehe `seed-list.md`) — Marktkarte, noch keine Bewertung.

---

## 1. Sicherheit (Werkschutz, Sicherheitsdienste, BOS, KRITIS)

**Schmerz.** Der Einsatzort ist genau dort, wo kein Netz ist: Tiefgarage, Serverraum,
Werksgelände, Tunnel, Messehalle, Stadion. Gleichzeitig ist die Dokumentation der
eigentliche Wert des Produkts — ein Wachbuch muss revisionssicher sein. Heutige Lösungen
puffern lokal und schieben später hoch; damit ist die Beweiskette an einen Server
gebunden, dem alle vertrauen müssen, und mehrere Kräfte am selben Objekt sehen sich
gegenseitig nicht.

**Warum unser Stack passt.** Passkey-signierte Oplog-Einträge
(`orbitdb-identity-provider-webauthn-did`, Varsig/Hardware-Schlüssel) machen die
Beweiskette an den *Eintrag* fest statt an den Server: wer, wann, was — kryptografisch,
auch wenn der Eintrag drei Stunden im Funkloch lag. Mehrere Geräte am selben Objekt
syncen direkt (libp2p, notfalls per QR-Pairing ganz ohne Infrastruktur). Ein Relay im
Einsatzfahrzeug oder am Objekt ist auf Knopfdruck da und danach wieder weg.

**Wer unterschreibt.** Hersteller von Wachbuch-/Wächterkontroll- und
Einsatzführungssoftware (S1). Sekundär: Werkschutz großer Industriebetriebe, Betreiber
von Messen und Stadien (S3).

**Signale.** „revisionssicher", „auch offline", NFC/QR-Checkpoints, DSGVO-Betonung,
BOS-Kundenreferenzen, NIS2/KRITIS in den Texten.

**Fallen.** BOS-Beschaffung ist zäh und formalisiert. Einstieg über den privaten
Sicherheitsdienstleistungsmarkt, nicht über die Behörde. Und: „manipulationssicher"
ist ein juristisch aufgeladener Begriff — wir sagen, was die Signatur beweist, und was
nicht (sie beweist Autorschaft und Unversehrtheit, nicht die Wahrheit des Inhalts).

**Prototyp:** P1

---

## 2. Mode / Fashion (Wholesale, Showroom, Filiale)

**Schmerz.** Die Order-Saison entscheidet den Jahresumsatz und findet an genau den Orten
statt, an denen das WLAN nichts taugt: Messehallen, Showrooms, beim Kunden im Laden.
Mehrere Tablets erfassen dieselbe Order, Vertreter arbeiten parallel, und danach muss
alles konfliktfrei ins ERP. Zweiter Fall: Inventur mit acht Scannern im Lager.

**Warum unser Stack passt.** Genau der Fall, für den P2P gebaut ist: mehrere Geräte
*am selben Ort*, die sich gegenseitig sehen, aber gemeinsam keinen Uplink haben. Heute
läuft jede Änderung von Tablet zu Frankfurt und zurück — oder eben gar nicht. Mit
libp2p-Sync im Raum ist die gemeinsame Order sofort auf allen Geräten, und die
ERP-Übergabe wird ein einziger bewusster Schritt am Ende statt einer Dauerabhängigkeit.

**Wer unterschreibt.** Fashion-ERP- und Order-Software-Häuser (S1), Retail-Digitalagenturen
(S2), IT-Abteilungen von Marken mit eigenem Wholesale (S3).

**Signale.** iPad-Order-App im Angebot, „Messe/Showroom", „offline erfassbar",
B2B-Orderportale, Anbindung an gängige Fashion-ERPs.

**Fallen.** Die Branche kauft Prozess, nicht Architektur. „Peer-to-Peer" ist kein
Verkaufsargument — „die Order ist auf allen Tablets, auch wenn die Halle das WLAN
frisst" schon.

**Prototyp:** P2

---

## 3. Gesundheit & Pflege

**Schmerz.** Doppelt gebunden: die Tour der ambulanten Pflege führt durch Funklöcher,
und gleichzeitig ist jeder Cloud-Anbieter ein Auftragsverarbeiter, über den mit jedem
Kunden neu verhandelt wird. Fast alle Anbieter werben deshalb schon heute mit
„funktioniert auch ohne Netz" — die Lösung ist aber jedes Mal derselbe lokale Puffer mit
Server-Wahrheit dahinter, und die Datenschutzdiskussion bleibt trotzdem.

**Warum unser Stack passt.** Verschlüsselung mit einem Schlüssel aus dem Passkey
(WebAuthn-PRF) heißt: der Betreiber kann die Daten nicht lesen. Das verkürzt die
AV-Diskussion von einer Vertragsfrage zu einer technischen Tatsache — und ist für ein
Softwarehaus im Vertrieb mehr wert als jedes Offline-Feature.

**Wer unterschreibt.** Hersteller von Pflege- und Praxissoftware (S1), Klinik-IT-Dienstleister,
HealthTech-Startups mit Souveränitätsversprechen.

**Signale.** „Daten bleiben in Deutschland", „offline-fähig", Tourenplanung, mobile
Doku-Apps, TI-/gematik-Kontext, GoBD/DSGVO prominent.

**Fallen.** **MDR.** Alles, was Diagnose oder Therapie berührt, ist ein Medizinprodukt und
sprengt jeden Prototyp-Rahmen. Der Prototyp gehört bewusst in den nicht-regulierten
Nachbarbereich: Leistungsnachweis, Tourenplanung, Dienstplan, interne Übergabe.
Zweite Falle: Erlösmodell hängt an Abrechnungsschnittstellen — die bleiben zentral,
das ist in Ordnung und muss offen gesagt werden.

**Prototyp:** P3

---

## 4. Freizeit & Tourismus (Destination, Bergbahn, Festival, Camping)

**Schmerz.** Gäste haben Roaming-Kosten oder gar kein Netz; die Crew koordiniert sich
über ein Gelände, auf dem das Mobilfunknetz bei 20.000 Gästen zusammenbricht. Gerade
dann, wenn es darauf ankommt — Wetterumschwung, Vermisstenmeldung, Schichtwechsel —
ist die Cloud-App am unzuverlässigsten.

**Warum unser Stack passt.** Zwei Dinge, die sonst niemand liefert: Die App selbst ist
ein statisches Bundle auf IPFS, das ohne Hosting startet und offline weiterläuft.
Und ein Relay auf einem kleinen Rechner im Backstage-Bereich oder in der Bergstation
macht das Gelände zum eigenen Netz — für die Dauer der Veranstaltung, danach wieder aus.
Genau das Nutzungsmuster, für das der Relay Button gebaut ist: saisonal, nicht dauerhaft.

**Wer unterschreibt.** Destinationsmanagement- und Bergbahn-Software (S1), Event- und
Festivaldienstleister, Betreiber von Freizeitparks und Campingplätzen (S3).

**Signale.** Gäste-Apps mit Offline-Karten, Skigebiets-/Regions-Apps, Crew-/Schichttools,
saisonale Lastspitzen, Ticketing-Anbindung.

**Fallen.** Saisonales Budget — Ansprache im Frühjahr für den Winter, nicht mitten in der
Saison. Und der Gästefall ist hübsch, aber der Crew-Fall zahlt: dort hängt Sicherheit dran.

**Prototyp:** P4

---

## 5. Softwarehäuser & Agenturen als solche (das Kern-ICP)

Kein Endmarkt, sondern der Weg in alle vier oberen. Die These: Diese Firmen haben das
Problem ihrer Kunden längst erkannt und eine halbgare Sync-Schicht gebaut, die sie seit
Jahren wartet. Was ihnen fehlt, sind Leute, die libp2p, CRDTs und Passkey-Identitäten
beherrschen — und dafür stellen sie niemanden ein, weil es für ein Feature nicht reicht.

**Das Angebot an sie.** Wir bringen die Bausteine (Relay-Infrastruktur, OrbitDB-Identität,
Sync, Archiv) und die Erfahrung; sie bringen Domäne, Kunden und Kofinanzierung. Ergebnis
ist ein lauffähiger Prototyp bei *ihrem* Kunden, kein Whitepaper. Wenn es trägt, wird
daraus ein Produktbaustein; wenn nicht, haben beide Seiten günstig gelernt.

**Der stärkste Sonderfall: CouchDB/PouchDB-Häuser.** Wer offline-first mit
CouchDB-Replikation gebaut hat, hat die Denkweise bereits — lokale Datenbank,
Konfliktauflösung, Replikation als Normalzustand. Ihm muss man nichts erklären, nur
zeigen, dass es den Server-Cluster nicht mehr braucht. Kürzester Weg vom Erstkontakt
zum technischen Gespräch.

**Prototyp:** P5 oder der Branchenprototyp ihres Kunden.
