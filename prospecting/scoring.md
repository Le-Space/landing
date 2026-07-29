# Bewertungsrubrik

Sechs Dimensionen, je 0–5 Punkte, maximal 30. Jede Dimension braucht **einen Satz
Begründung mit Quelle**. Ohne Quelle sind höchstens 2 Punkte erlaubt — Unwissen ist
kein Pluspunkt.

## 1. Offline-/Konnektivitäts-Schmerz (×2 — wichtigste Dimension)

| P | Bedeutung |
|---|---|
| 0 | Alle Nutzer sitzen am Schreibtisch im Firmennetz. |
| 1–2 | Mobile Nutzung existiert, Netz ist aber selten das Problem. |
| 3 | Offline wird beworben, die Lösung ist erkennbar selbstgebaut. |
| 4 | Netzausfall stört den Kernprozess; Support-/Wartungskosten sind sichtbar. |
| 5 | Ohne Offline ist das Produkt in der Kernsituation unbrauchbar (Tunnel, Alm, Halle, Einsatz). |

Zählt doppelt, weil ohne echten Schmerz kein Budget entsteht — alles andere ist Kosmetik.

## 2. Souveränitäts-/Compliance-Druck

| P | Bedeutung |
|---|---|
| 0 | Kein Thema, US-Cloud ohne Diskussion. |
| 1–2 | DSGVO wird erwähnt, aber nur als Pflichtübung. |
| 3 | „Server in Deutschland" ist ein aktives Verkaufsargument. |
| 4 | Auftragsverarbeitung blockiert nachweislich Deals; NIS2/KRITIS/BSI im Spiel. |
| 5 | Öffentlicher Auftraggeber oder regulierter Sektor verlangt, dass Daten das Gerät nicht verlassen. |

## 3. Technischer Fit

| P | Bedeutung |
|---|---|
| 0 | Native-Only oder Desktop-Legacy, kein Web-Know-how. |
| 1–2 | Web vorhanden, aber klassisch serverseitig gerendert. |
| 3 | JS/TS im Einsatz, SPA oder PWA. |
| 4 | PWA mit lokaler Persistenz (IndexedDB, SQLite, Realm, WatermelonDB). |
| 5 | Setzt bereits CRDT/Sync-Bibliotheken ein (Yjs, Automerge, ElectricSQL, PowerSync, RxDB, PouchDB). |

## 4. F&E-Fähigkeit und Budget

| P | Bedeutung |
|---|---|
| 0 | Reines Projektgeschäft, jede Stunde ist verkauft. |
| 1–2 | Gelegentlich eigene Experimente, kein Budget dafür. |
| 3 | Erkennbares Produktbudget, eigene Roadmap. |
| 4 | Innovations-/Labs-Einheit oder eigene Konferenzvorträge. |
| 5 | Nachweisliche Fördererfahrung (ZIM, BMBF, EU) — sie können Anträge. |

## 5. Erreichbarkeit

| P | Bedeutung |
|---|---|
| 0 | Nur Kontaktformular, keine Namen, keine Technik nach außen. |
| 1–2 | Impressum und Karriereseite, aber niemand spricht öffentlich. |
| 3 | Technische Leute mit öffentlichem Profil (Blog, GitHub, Konferenz). |
| 4 | Aktiv in einer Community, in der wir ohnehin sind (libp2p, IPFS, CouchDB, FOSDEM). |
| 5 | Warme Kante: gemeinsame Kontakte, gemeinsames Projekt, schon einmal geschrieben. |

## 6. Referenz- und Hebelwert

| P | Bedeutung |
|---|---|
| 0 | Unbekannt, kleiner Einzelkunde. |
| 1–2 | Solider Mittelständler ohne Strahlkraft. |
| 3 | In seiner Branche bekannt. |
| 4 | Vielen Kunden gegenüber Multiplikator (Plattform, viele Mandanten). |
| 5 | Markenname, den man in jedem weiteren Gespräch nennen kann. |

## Einstufung

| Tier | Punkte | Bedeutung | Nächster Schritt |
|---|---|---|---|
| **A** | ≥ 22 | Jetzt ansprechen. | `prospect-pitch`, individuelles Anschreiben |
| **B** | 15–21 | Wert, aber Timing fehlt. | Merkliste mit konkretem Trigger |
| **C** | < 15 | Nicht verfolgen. | Mit Begründung schließen |

**Sperrregel:** Weniger als 3 Punkte in Dimension 1 (Offline-Schmerz) → nie Tier A,
unabhängig von der Gesamtpunktzahl. Ein Interessent ohne Problem ist kein Kunde.

Bei Gleichstand entscheidet Dimension 5. Ein etwas schwächerer Lead, den wir wirklich
erreichen, schlägt einen perfekten, an den wir nicht herankommen.

## Beispielrechnung

Branchen-Softwarehaus für Sicherheitsdienste, 40 Mitarbeiter, bewirbt „App funktioniert
auch offline", Server in Deutschland, sucht laut Stellenanzeige einen PWA-Entwickler,
kein Förderprojekt auffindbar, technischer Geschäftsführer bloggt gelegentlich, in der
Branche bekannt:

`(4×2) + 3 + 4 + 2 + 3 + 3 = 23` → **Tier A**, Sperrregel greift nicht.

Der Aufhänger ergibt sich aus der schwächsten *relevanten* Stelle: F&E-Budget ist dünn
(2 Punkte) → Finanzierungsvorschlag muss die Förderschiene mitliefern, nicht den
Festpreis allein.
