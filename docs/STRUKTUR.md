# STRUKTUR – Ingenieurbüro René Gansmüller

**Nicht deployen.** Ergebnis Phase 2a (structure-architect), von Bruno an
Station 1 freigegeben am 2026-09-27 (Beleg: `quellen/gespraech-2026-09-27-bruno.md`).
Grundlage: `docs/DEMO-SPEC.md`, `quellen/*`,
`.claude/skills/branchen-wissen/references/bauueberwachung-projektsteuerung.md`.

## Sektionen

| # | Sektion | Zweck |
|---|---|---|
| 0 | Header | Logo (SVG-Nachbau). Menü: Leistungen · Referenzen · Über mich · Ablauf. Dauerhafter CTA „Projekt unverbindlich prüfen lassen“ → `#anfrage` |
| 1 | Hero | Person, Leistung, Zielgruppe (kein Wettbewerber nennt die Zielgruppe im Hero). Seit 2026-09-29: H1 „Ihr Partner für Bauüberwachung und Projektsteuerung in Berlin, Brandenburg und Sachsen“, Unterclaim mit vier Zielgruppen, Kennzahlen zählen hoch |
| 2 | Für wen | Zwei getrennte Wege (§9). A „Sie bauen selbst“: Bauträger · Projektentwickler · Wohnungsunternehmen · Gewerbliche Auftraggeber. B „Sie planen und brauchen die Bauüberwachung“: Architektur-/Planungsbüros · Generalplaner. Seit 2026-09-29 als Kundenprofile („Sie …“, keine Leistungsdetails), Gruppe B dunkel. Projektrahmen „Passt gut / Passt weniger“ nur aus Belegen, keine Untergrenze. Jede Profilkarte belegt Funnel-Schritt 1 vor |
| 3 | Leistungen | Projektsteuerung und Bauüberwachung (HOAI Leistungsphase 8) groß, je mit Rollenerklärung; Vergabe unter Bauüberwachung (ohne LPH 6/7). Seit 2026-09-29: Projektsteuerung (01) und Bauüberwachung (02) als zwei große randlose Kacheln mit Verlauf (Fotos: Bildplatz, `quellen/bilder-unsplash.md`), Aufgaben und Vergabe als Schlagworte, Baubetreuung (Entwurf markiert) und Bauberatung als kleine Kacheln. Partnerzeile: Planer, Architekt, Statiker, Brandschutz (4 Rollen, nie zu 3 zusammenziehen). Je Leistung CTA mit `?leistung=` |
| 4 | Bauherren-Band | Seit 2026-09-29 direkt unter dem Hero (Sektion 1a) als endlos laufendes Band, Label „Bauherren aus meiner Referenzliste“ (Demo-Hinweis auf Brunos Wunsch entfernt). Fünf Logos (HOWOGE von deren Website, vier von Bruno geliefert und vektorisiert), Ortus als Wortmarke (`quellen/logos.md`). Im Ruhezustand einfarbig in `--color-text-muted`, bei Hover Originalfarben; optische Höhen abgeglichen. Langsam (rund 21 px/s), vier Listen für ein lückenloses Band, Pause bei Hover, kein Knopf (Brunos Wunsch), bei reduzierter Bewegung statische Reihe. Das frühere Raster in den Referenzen entfällt, die Objektzahlen stehen in den Gruppenköpfen des Registers |
| 5 | Referenzen | „Auszug aus der Referenzliste“: alle 20 Objekte als Register nach Bauherr (Objekt, Ort, Umfang, Leistung, Bauvolumen, Objektzahl im Gruppenkopf), Schreibweise nach PDF, keine Jahreszahlen. Register eingeklappt auf 6 Objektzeilen mit Auslauf, Knopf „Alle 20 Objekte anzeigen“, ohne JS offen. Abschluss-CTA „Ähnliches Vorhaben? Projekt prüfen lassen“. 2–3 Objekte mit eigenem Foto hervorgehoben. Denkmal/Altbau hier hervorheben. Projektbereiche als großer typografischer Streifen (full); Wohnungsbau und Gewerbe verweisen ins Register, Industrie, Arztpraxen, Krankenhäuser nur als Bereich mit einzeiligem Hinweis |
| 6 | Über mich & Arbeitsweise | Über 30 Jahre in der Branche, Stammkunden seit 20–30 Jahren, objektbezogen beauftragbar, Präsenz bedingt formuliert (Mitarbeiter täglich vor Ort, wo ein Projekt das braucht). Steckbrief: Dipl.-Ing. (FH) Bauwesen, Büro Schwedenstraße 13 mit Google-Maps-Link, Berlin seit 2007, zuvor Raum Dresden. Seit 2026-09-29 beginnt der Text mit der Expertise, dann direkter Ansprechpartner. Porträt: gekennzeichneter Bildplatz |
| 7 | Ablauf | Nummern erlaubt (echte Reihenfolge). Anfrage → Erstgespräch → objektbezogene Beauftragung (Entwurf markiert) → Bestandsaufnahme/Beratung → Vergabe → Objektüberwachung → Gewährleistungsabnahme & Dokumentation. Je Station das Ergebnis für den Auftraggeber. Seit 2026-09-29 Zeitstrahl: ab 900 px Tabs mit einem Detailfeld, CTA daneben mit „In unter zwei Minuten angefragt.“; mobil senkrecht, Beschreibung aufklappbar. Phasen getrennt (gestrichelt / getönt und durchgezogen), Autoplay 6,5 bis 9 s je Station mit Schalter, Pause bei Hover/Fokus, 15 s Ruhe nach Auswahl von Hand, nicht bei reduzierter Bewegung. Keine Dauern |
| 8 | Anfrage-Funnel | Eigener gerahmter Abschnitt `#anfrage`, 3 Schritte laut DEMO-SPEC, Schrittzähler. Seit 2026-09-29 ohne Einleitungstext unter der Überschrift |
| 9 | Footer | Adresse, Telefon, Mobil, E-Mail (Scrape). Kein Fax. Impressum/Datenschutz als Platzhalter |

## Rhythmusplan

Stand nach dem Stilumbau (2026-09-28, `docs/REFERENZ-ANALYSE.md`): heller
Grund, abgesetzte Flächen (Panel, Radius 40 px, 16 px vom Rand) im Wechsel
mit weißen Sektionen, dunkel nur der Footer. Kontrast über 2-px-Linien und
harte Schatten statt Hell/Dunkel-Wechsel.

| # | Muster | Breite | Grund | Höhe |
|---|---|---|---|---|
| 1 Hero | Zweispalter: Text + Plankopf-Karte (Schatten 12/12) | breakout | hell | mittel |
| 1a Bauherren-Band | laufendes Band, 5 Logos + 1 Wortmarke | full (randlos) | hell, 2-px-Linien | klein |
| 2 Für wen | Kundenprofile in zwei Gruppen (4 hell, 2 dunkel), Projektrahmen | Panel (full, eingerückt) | getönt, eine dunkle Fläche | groß |
| 3 Leistungen | zwei große Bildkacheln randlos, Schlagworte, zwei kleine Kacheln, Partnerzeile | full + breakout | dunkle Kacheln auf hell | groß |
| 5 Referenzen | Denkmal-Text + 2 Fotokarten, Register als Karte (eingeklappt), typografischer Bereichsstreifen, CTA | breakout + full | hell | groß |
| 6 Über mich | Porträt-Karte, Text, Steckbrief-Karte | Panel | getönt | mittel |
| 7 Ablauf | Zeitstrahl in zwei Phasenflächen, 7 Stationen als Tabs + ein Detailfeld (Schatten 8/8), Autoplay, CTA daneben; mobil senkrecht | breakout | hell, eine getönte Phase | mittel |
| 8 Funnel | Kontaktzeilen + Formular-Karte (Schatten 12/12) | Panel | getönt | mittel |
| 9 Footer | drei Spalten | full | dunkel | klein |

- Randlose Elemente: das Bauherren-Band, die Leistungskacheln, der Bereichsstreifen, die drei Panels (1888 von 1920 px) und der Footer.
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
