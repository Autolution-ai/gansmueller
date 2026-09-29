# STRUKTUR – Ingenieurbüro René Gansmüller

**Nicht deployen.** Ergebnis Phase 2a (structure-architect), von Bruno an
Station 1 freigegeben am 2026-09-27 (Beleg: `quellen/gespraech-2026-09-27-bruno.md`).
Grundlage: `docs/DEMO-SPEC.md`, `quellen/*`,
`.claude/skills/branchen-wissen/references/bauueberwachung-projektsteuerung.md`.

## Sektionen

| # | Sektion | Zweck |
|---|---|---|
| 0 | Header | Logo (SVG-Nachbau). Menü: Leistungen · Referenzen · Über mich · Ablauf. Dauerhafter CTA „Projekt unverbindlich prüfen lassen“ → `#anfrage` |
| 1 | Hero | Desktop: Hero + Bauherren-Band = erster Bildschirm, Band unten bündig (Überarbeitung 3). Person, Leistung, Zielgruppe (kein Wettbewerber nennt die Zielgruppe im Hero). Seit 2026-09-29: H1 „Ihr Partner für Bauüberwachung und Projektsteuerung in Berlin, Brandenburg und Sachsen“, Unterclaim mit vier Zielgruppen, Kennzahlen zählen hoch |
| 2 | Für wen | Zwei getrennte Wege (§9). A „Sie bauen selbst“: Bauträger · Projektentwickler · Wohnungsunternehmen · Gewerbliche Auftraggeber. B „Sie planen und brauchen die Bauüberwachung“: Architektur-/Planungsbüros · Generalplaner. Seit Überarbeitung 3: zwei Wege nebeneinander mit großem Gruppenkopf, Rollen als Tabs, darunter Beschreibung und CTA „Projekt prüfen lassen“ (?auftraggeber=), keine Karten. Projektrahmen „Passt gut“ (grüner Haken) / „Passt weniger“ (rotes Kreuz) nur aus Belegen, keine Untergrenze. Jede Profilkarte belegt Funnel-Schritt 1 vor |
| 3 | Leistungen | Projektsteuerung und Bauüberwachung (HOAI Leistungsphase 8) groß, je mit Rollenerklärung; Vergabe unter Bauüberwachung (ohne LPH 6/7). Seit 2026-09-29: Projektsteuerung (01) und Bauüberwachung (02) als zwei große randlose Kacheln mit Verlauf (Unsplash-Symbolbilder, `quellen/bilder-unsplash.md`), Darunter (Überarbeitung 3) zwei Spalten bündig mit den Kacheln: links „Mit Planung“ (Partner), rechts vier Aufgaben + eine Zeile Vergabe/Gewährleistung; Baubetreuung (Entwurf markiert) und Bauberatung nebeneinander. Partnerzeile: Planer, Architekt, Statiker, Brandschutz (4 Rollen, nie zu 3 zusammenziehen). Je Leistung CTA mit `?leistung=` |
| 4 | Bauherren-Band | Seit 2026-09-29 direkt unter dem Hero (Sektion 1a) als endlos laufendes Band, Label „Bauherren aus meiner Referenzliste“ (Demo-Hinweis auf Brunos Wunsch entfernt). Fünf Logos (HOWOGE von deren Website, vier von Bruno geliefert und vektorisiert), Ortus als Wortmarke (`quellen/logos.md`). Im Ruhezustand einfarbig in `--color-text-muted`, bei Hover Originalfarben; optische Höhen abgeglichen. Langsam (rund 21 px/s, JS), Abstand dynamisch: dieselbe Marke nie zweimal gleichzeitig sichtbar (390 bis 2560 gemessen); bei Hover sanftes Abbremsen auf Kriechtempo statt Stopp; vier Listen; kein Knopf (Brunos Wunsch); bei reduzierter Bewegung statische Reihe. Das frühere Raster in den Referenzen entfällt, die Objektzahlen stehen in den Gruppenköpfen des Registers |
| 5 | Referenzen | „Auszug aus der Referenzliste“: alle 20 Objekte als Register nach Bauherr (Objekt, Ort, Umfang, Leistung, Bauvolumen, Objektzahl im Gruppenkopf), Schreibweise nach PDF, keine Jahreszahlen. Register eingeklappt auf 6 Objektzeilen mit Auslauf, Knopf „Alle 20 Objekte anzeigen“, ohne JS offen. Abschluss-CTA „Ähnliches Vorhaben? Projekt prüfen lassen“. 2–3 Objekte mit eigenem Foto hervorgehoben. Denkmal/Altbau hier hervorheben. Einleitung seit Überarbeitung 2: „Seit über 30 Jahren … HOWOGE mbH, BauBeCon Wohnen GmbH, Kaufland Ladenbau GmbH“. Projektbereiche als eine unauffällige Zeile unter dem Register, einzeiliger Hinweis zu Industrie, Arztpraxen, Krankenhäusern |
| 6 | Über mich & Arbeitsweise | Über 30 Jahre in der Branche, Stammkunden seit 20–30 Jahren, objektbezogen beauftragbar, direkter Ansprechpartner „auf Augenhöhe“ (Mitarbeiter-Satz auf Brunos Wunsch entfernt). Steckbrief: Dipl.-Ing. (FH) Bauwesen, Büro Schwedenstraße 13 mit Google-Maps-Link, Berlin seit 2007, zuvor Raum Dresden. Seit 2026-09-29 beginnt der Text mit der Expertise, dann direkter Ansprechpartner. Porträt: gekennzeichneter Bildplatz |
| 7 | Ablauf | Nummern erlaubt (echte Reihenfolge). Anfrage → Erstgespräch → objektbezogene Beauftragung (Entwurf markiert) → Bestandsaufnahme/Beratung → Vergabe → Objektüberwachung → Gewährleistungsabnahme & Dokumentation. Je Station das Ergebnis für den Auftraggeber. Seit 2026-09-29 Zeitstrahl: ab 900 px Tabs mit einem Detailfeld, CTA daneben mit „In unter zwei Minuten angefragt.“; mobil senkrecht, Beschreibung aufklappbar. Phasen getrennt über Linienfarbe, Klammer-Labels, Ring- vs. gefüllte Punkte und getönte Fläche (ohne Strichelungen, ohne Rahmen); Autoplay 6,5 bis 9 s je Station ohne Schalter, Pause bei Hover/Fokus, 15 s Ruhe nach Auswahl von Hand, nicht bei reduzierter Bewegung. Keine Dauern |
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
| 2 Für wen | Profil-Wähler (Liste + Aussage), Projektrahmen mit Haken/Kreuz | Panel (full, eingerückt) | getönt | groß |
| 3 Leistungen | zwei große Fotokacheln randlos, Aufgabenliste, Zeilen 03/04, Partnerzeile mit Linie | full + breakout | Fotos auf hell | groß |
| 5 Referenzen | Einleitungssatz, Denkmal-Text + 2 Fotos ohne Karte, Register als Karte (eingeklappt), Bereichszeile, CTA | breakout | hell | groß |
| 6 Über mich | Porträt-Karte, Text, Steckbrief-Karte | Panel | getönt | mittel |
| 7 Ablauf | Zeitstrahl in zwei Phasenflächen, 7 Stationen als Tabs + ein Detailfeld (Schatten 8/8), Autoplay, CTA daneben; mobil senkrecht | breakout | hell, eine getönte Phase | mittel |
| 8 Funnel | Kontaktzeilen + Formular-Karte (Schatten 12/12) | Panel | getönt | mittel |
| 9 Footer | drei Spalten | full | dunkel | klein |

- Randlose Elemente: das Bauherren-Band, die Leistungskacheln, die drei Panels (1888 von 1920 px) und der Footer.
- Überarbeitung 2 (Bruno: „boxenbelastet“): Rahmen und Karten nur noch bei Formular, Plankopf-Karte im Hero und Register-Tabelle. Sonst Weißraum, Typografie, Haarlinien, Nummern, Bilder. Demo-Hinweise als Zeile mit Malve-Linie links statt Kasten.
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
