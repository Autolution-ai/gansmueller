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
| 4 | Bauherren-Band | Seit 2026-09-29 direkt unter dem Hero (Sektion 1a) als endlos laufendes Band, Label „Bauherren aus meiner Referenzliste“, Demo-Hinweis darüber. HOWOGE als Logo, die übrigen fünf als Wortmarke (`quellen/logos.md`). Pause bei Hover/Fokus und per Knopf, bei reduzierter Bewegung statische Reihe. Das frühere Raster in den Referenzen entfällt, die Objektzahlen stehen in den Gruppenköpfen des Registers |
| 5 | Referenzen | „Auszug aus der Referenzliste“: alle 20 Objekte als Register nach Bauherr (Objekt, Ort, Umfang, Leistung, Bauvolumen, Objektzahl im Gruppenkopf), Schreibweise nach PDF, keine Jahreszahlen. Register eingeklappt auf 6 Objektzeilen mit Auslauf, Knopf „Alle 20 Objekte anzeigen“, ohne JS offen. Abschluss-CTA „Ähnliches Vorhaben? Projekt prüfen lassen“. 2–3 Objekte mit eigenem Foto hervorgehoben. Denkmal/Altbau hier hervorheben. Industrie, Arztpraxen, Krankenhäuser nur als Bereich mit Hinweiskasten |
| 6 | Über mich & Arbeitsweise | Über 30 Jahre in der Branche, Stammkunden seit 20–30 Jahren, objektbezogen beauftragbar, Präsenz bedingt formuliert (Mitarbeiter täglich vor Ort, wo ein Projekt das braucht). Steckbrief: Dipl.-Ing. (FH) Bauwesen, Büro Berlin, zuvor Raum Dresden. Porträt: gekennzeichneter Bildplatz |
| 7 | Ablauf | Nummern erlaubt (echte Reihenfolge). Anfrage → Erstgespräch → objektbezogene Beauftragung (Entwurf markiert) → Bestandsaufnahme/Beratung → Vergabe → Objektüberwachung → Gewährleistungsabnahme & Dokumentation. Je Station das Ergebnis für den Auftraggeber. Seit 2026-09-29 Zeitstrahl: ab 900 px Tabs mit einem Detailfeld, CTA und Telefon daneben; mobil senkrecht, Beschreibung aufklappbar. Keine Dauern |
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
| 1a Bauherren-Band | laufendes Band, Logo + Wortmarken | full (randlos) | hell, 2-px-Linien | klein |
| 2 Für wen | Gegenüberstellung, zwei Karten | Panel (full, eingerückt) | getönt | mittel |
| 3 Leistungen | gewichtete Liste (2 Karten, Zeilen, Partnerzeile) | breakout | hell | groß |
| 5 Referenzen | Denkmal-Text + 2 Fotokarten, Register als Karte (eingeklappt), CTA | breakout | hell | groß |
| 6 Über mich | Porträt-Karte, Text, Steckbrief-Karte | Panel | getönt | mittel |
| 7 Ablauf | Zeitstrahl: 7 Stationen als Tabs + ein Detailfeld (Schatten 8/8), CTA daneben; mobil senkrecht | breakout | hell | mittel (989 px auf 1440, 1.290 px auf 390) |
| 8 Funnel | Kontaktzeilen + Formular-Karte (Schatten 12/12) | Panel | getönt | mittel |
| 9 Footer | drei Spalten | full | dunkel | klein |

- Randlose Elemente: das Bauherren-Band, die drei Panels (1888 von 1920 px) und der Footer.
- Referenzfotos nicht randlos (zu klein), nicht hochskalieren.
- Dreiergruppen: 2 (Kontaktzeilen im Funnel, Stationen „Bevor es losgeht“). Hero-Kennzahlen sind 2. Maximal 2 pro Seite, damit ausgeschöpft.

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
