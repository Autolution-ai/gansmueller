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
| 4 | Bauherren-Streifen | Randlos, dunkel: HOWOGE mbH · Argentum GmbH & Co. KG · Ortus GmbH & Co. KG · BauBeCon Wohnen GmbH · GVC mbH · Kaufland Ladenbau GmbH. Kopf der Referenzen |
| 5 | Referenzen | „Auszug aus der Referenzliste“: alle 20 Objekte als Register nach Bauherr (Objekt, Ort, Umfang, Leistung, Bauvolumen), Schreibweise nach PDF, keine Jahreszahlen. 2–3 Objekte mit eigenem Foto hervorgehoben. Denkmal/Altbau hier hervorheben. Industrie, Arztpraxen, Krankenhäuser nur als Bereich mit Hinweiskasten |
| 6 | Über mich & Arbeitsweise | Über 30 Jahre in der Branche, Stammkunden seit 20–30 Jahren, objektbezogen beauftragbar, Präsenz bedingt formuliert (Mitarbeiter täglich vor Ort, wo ein Projekt das braucht). Steckbrief: Dipl.-Ing. (FH) Bauwesen, Büro Berlin, zuvor Raum Dresden. Porträt: gekennzeichneter Bildplatz |
| 7 | Ablauf | Nummern erlaubt (echte Reihenfolge). Anfrage → Erstgespräch → objektbezogene Beauftragung (Entwurf markiert) → Bestandsaufnahme/Beratung → Vergabe → Objektüberwachung → Gewährleistungsabnahme & Dokumentation. Je Station das Ergebnis für den Auftraggeber. Letzte Station führt in den Funnel |
| 8 | Anfrage-Funnel | Eigener gerahmter Abschnitt `#anfrage`, 3 Schritte laut DEMO-SPEC, Schrittzähler |
| 9 | Footer | Adresse, Telefon, Mobil, E-Mail (Scrape). Kein Fax. Impressum/Datenschutz als Platzhalter |

## Rhythmusplan

| # | Muster | Breite | Grund | Höhe |
|---|---|---|---|---|
| 1 Hero | hero-craft | full | dunkel/Bild | groß |
| 2 Für wen | Gegenüberstellung | breakout | hell | klein |
| 3 Leistungen | gewichtete Liste (2 groß, 2 Zeilen) | breakout | getönt | groß |
| 4 Bauherren | Zäsur mit Inhalt | **full** | dunkel | klein |
| 5 Referenzen | Register + asymmetrisch hervorgehobene Objekte | breakout | hell | groß |
| 6 Über mich | asymmetrischer Zweispalter, `align-items: center` | text, Steckbrief bricht aus | getönt | mittel |
| 7 Ablauf | Stationen | breakout | hell | mittel |
| 8 Funnel | Formular | full-Band, Formular breakout | getönt | groß |
| 9 Footer | – | full | dunkel | klein |

- Randlose Elemente: Hero und Bauherren-Streifen (sicheres randloses Element).
- Referenzfotos nicht randlos (zu klein), nicht hochskalieren.
- Dreiergruppen: aktuell 0 fest verplant (Seite A hat durch Wohnungsunternehmen jetzt 4). Maximal 2 pro Seite.

## CTA-Hierarchie

- Header: „Projekt unverbindlich prüfen lassen“ → `#anfrage`
- Hero primär (Vorschlag): „Bauüberwachung für Ihr Projekt anfragen“ → `#anfrage`, `leistung=bauueberwachung`; sekundär Textlink „Referenzliste ansehen“ → `#referenzen`
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
