# STRUKTUR – Ingenieurbüro René Gansmüller

**Nicht deployen.** Ergebnis Phase 2a (structure-architect), von Bruno an
Station 1 freigegeben am 2026-09-27 (Beleg: `quellen/gespraech-2026-09-27-bruno.md`).
Grundlage: `docs/DEMO-SPEC.md`, `quellen/*`,
`.claude/skills/branchen-wissen/references/bauueberwachung-projektsteuerung.md`.

## Sektionen

| # | Sektion | Zweck |
|---|---|---|
| 0 | Header | Logo (SVG-Nachbau). Menü: Leistungen · Referenzen · Über mich · Ablauf. Dauerhafter CTA „Projekt unverbindlich prüfen lassen“ → `#anfrage` |
| 1 | Hero | Person, Leistung, Zielgruppe (kein Wettbewerber nennt die Zielgruppe im Hero). Entscheidung Phase 2b |
| 2 | Für wen | Zwei getrennte Wege (§9). A „Sie bauen selbst“: Bauträger · Projektentwickler · Wohnungsunternehmen · Gewerbliche Auftraggeber. B „Sie planen und brauchen die Bauüberwachung“: Architektur-/Planungsbüros · Generalplaner. Projektrahmen als Nutzen. Jede Zielgruppe belegt Funnel-Schritt 1 vor |
| 3 | Leistungen | Projektsteuerung und Bauüberwachung (HOAI Leistungsphase 8) groß, je mit Rollenerklärung; Vergabe unter Bauüberwachung (ohne LPH 6/7). Baubetreuung (Entwurf markiert) und Bauberatung je eine Zeile. Partnerzeile: Planer, Architekt, Statiker, Brandschutz (4 Rollen, nie zu 3 zusammenziehen). Je Leistung CTA mit `?leistung=` |
| 4 | Bauherren-Streifen | Seit Stilumbau hell als festes Raster mit Objektzahl je Bauherr (vorher randlos, dunkel): HOWOGE mbH · Argentum GmbH & Co. KG · Ortus GmbH & Co. KG · BauBeCon Wohnen GmbH · GVC mbH · Kaufland Ladenbau GmbH. Kopf der Referenzen |
| 5 | Referenzen | „Auszug aus der Referenzliste“: alle 20 Objekte als Register nach Bauherr (Objekt, Ort, Umfang, Leistung, Bauvolumen), Schreibweise nach PDF, keine Jahreszahlen. 2–3 Objekte mit eigenem Foto hervorgehoben. Denkmal/Altbau hier hervorheben. Industrie, Arztpraxen, Krankenhäuser nur als Bereich mit Hinweiskasten |
| 6 | Über mich & Arbeitsweise | Über 30 Jahre in der Branche, Stammkunden seit 20–30 Jahren, objektbezogen beauftragbar, Präsenz bedingt formuliert (Mitarbeiter täglich vor Ort, wo ein Projekt das braucht). Steckbrief: Dipl.-Ing. (FH) Bauwesen, Büro Berlin, zuvor Raum Dresden. Porträt: gekennzeichneter Bildplatz |
| 7 | Ablauf | Nummern erlaubt (echte Reihenfolge). Anfrage → Erstgespräch → objektbezogene Beauftragung (Entwurf markiert) → Bestandsaufnahme/Beratung → Vergabe → Objektüberwachung → Gewährleistungsabnahme & Dokumentation. Je Station das Ergebnis für den Auftraggeber. Letzte Station führt in den Funnel |
| 8 | Anfrage-Funnel | Eigener gerahmter Abschnitt `#anfrage`, 3 Schritte laut DEMO-SPEC, Schrittzähler |
| 9 | Footer | Adresse, Telefon, Mobil, E-Mail (Scrape). Kein Fax. Impressum/Datenschutz als Platzhalter |

## Rhythmusplan

Stand nach dem Stilumbau (2026-09-28, `docs/REFERENZ-ANALYSE.md`): heller
Grund, abgesetzte Flächen (Panel, Radius 40 px, 16 px vom Rand) im Wechsel
mit weißen Sektionen, dunkel nur der Footer. Kontrast über 2-px-Linien und
harte Schatten statt Hell/Dunkel-Wechsel.

| # | Muster | Breite | Grund | Höhe |
|---|---|---|---|---|
| 1 Hero | Zweispalter: Text + Plankopf-Karte (Schatten 12/12) | breakout | hell | mittel |
| 2 Für wen | Gegenüberstellung, zwei Karten | Panel (full, eingerückt) | getönt | mittel |
| 3 Leistungen | gewichtete Liste (2 Karten, Zeilen, Partnerzeile) | breakout | hell | groß |
| 4 Bauherren | festes Raster, 6 Namen mit Objektzahl | breakout | hell, 2-px-Linien | klein |
| 5 Referenzen | Denkmal-Text + 2 Fotokarten, Register als Karte | breakout | hell | groß |
| 6 Über mich | Porträt-Karte, Text, Steckbrief-Karte | Panel | getönt | mittel |
| 7 Ablauf | 7 Stationskarten mit Ziffer + Abschlusskarte (4 + 4) | breakout | hell | groß |
| 8 Funnel | Kontaktzeilen + Formular-Karte (Schatten 12/12) | Panel | getönt | mittel |
| 9 Footer | drei Spalten | full | dunkel | klein |

- Randlose Elemente: die drei Panels (1888 von 1920 px) und der Footer.
- Referenzfotos nicht randlos (zu klein), nicht hochskalieren.
- Dreiergruppen: 1 (Kontaktzeilen im Funnel). Hero-Kennzahlen sind 2. Maximal 2 pro Seite.

## CTA-Hierarchie

- Header: „Projekt prüfen lassen“ (Kurzfassung, Station 2; unter 1100 px „Projekt prüfen“) → `#anfrage`. Der lange Wortlaut „Projekt unverbindlich prüfen lassen“ bleibt für Funnel-H2, Ablauf und Footer
- Hero primär: „Bauüberwachung anfragen“ (auch in Leistungen, ein Label je Ziel) → `#anfrage`, `leistung=bauueberwachung`; sekundär Textlink „Referenzliste ansehen“ → `#referenzen`
- Für wen: Zielgruppen-Links belegen Schritt 1 vor
- Leistungen: je CTA mit `?leistung=`
- Ablauf: letzte Station → Funnel

## Asset-Bedarf

| Sektion | Bedarf | Stand |
|---|---|---|
| Header/Footer | Logo SVG-Nachbau aus 215×40-JPEG | offen |
| Hero | Motiv | ungedeckt, Phase 2b |
| Referenzen | 6–7 Objektfotos 2008 | Download läuft |
| Referenzen | Projekte nach 2008, Industrie/Arztpraxen/Krankenhäuser | ungedeckt → Hinweiskasten |
| Über mich | Porträt | ungedeckt → gekennzeichneter Bildplatz |
| Funnel | Reaktionszeit Danke-Screen | ungedeckt → keine Zeitangabe |
