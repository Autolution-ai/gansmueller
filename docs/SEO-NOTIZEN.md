# SEO-NOTIZEN

**Nicht deployen. Unsichtbar für den Kunden.** Diese Datei liegt nur im Repo
als Startpunkt, falls aus der Demo ein echtes Projekt wird.

Zwei Teile, zwei Herkünfte:

- **Befund zur bestehenden Seite** – aus dem Scrape (Phase 1), also belegt.
  Füllt der `site-analyst`.
- **Keywords je Sektion** – **vermutet, nicht recherchiert.** Füllt der
  `copywriter` in Phase 3. Die echte Keyword-Recherche passiert erst im
  Produktionsprojekt.

Das Handwerk dazu steht im Skill `seo-basis`. **Keine erfundenen Zahlen:** kein
Suchvolumen, kein Ranking, keine „X verlorene Anfragen pro Monat".

---

## Befund zur bestehenden Seite

Nachgetragen in Phase 4 (Bau) am 2026-09-28, nur aus `quellen/scrape-website.md`
und `quellen/scrape-google.md`.

| Punkt | Befund auf der Altseite | Quelle |
|---|---|---|
| Anzahl H1 | Startseite ohne H1 (Begrüßung als h2/h3); H1 nur auf Kontakt und Impressum | Scrape, Text je Seite |
| Überschriftenhierarchie | Seiten beginnen mit h2 („Mein Leistungsangebot“, „Referenzen“), Unterpunkte h3 | Scrape |
| `<title>` (Länge, Inhalt) | Auf allen Seiten gleiches Muster „Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Home“ (57 Zeichen auf der Startseite), ohne Umlaute, ohne Leistung, ohne Ort | Scrape, Tabelle Unterseiten |
| `<meta description>` | Auf allen Seiten identisch: „Ingenieurbüro Rene Gansmüller, Bauingenieur“ (43 Zeichen), ohne Leistung, ohne Ort | Scrape, Meta |
| Bilder ohne Alt-Text | Alle sechs Inhaltsbilder ohne `alt` | Scrape, Bilder |
| Ort im sichtbaren Text | „Berlin“ im Begrüßungstext der Startseite und im Footer | Scrape |
| Strukturierte Daten (JSON-LD) | keine | Scrape, Meta |
| NAP-Konsistenz (Name/Adresse/Telefon) | Website und Google-Eintrag stimmen in Name, Adresse, Telefon überein; Fax nur auf der Website | Scrape, scrape-google.md |
| Teilen-Vorschau (Open Graph) | keine; außerdem kein Viewport-Meta, kein `lang` | Scrape, Meta |

**Widersprüche, die aufgefallen sind:** keine bei NAP. Offen bleibt die
Schreibweise der Berliner Straßennamen (Referenzliste gegen Bildunterschrift,
siehe `docs/COPY.md`, offene Punkte 2).

**Umsetzung in der Demo (Phase 4):** eine H1, Title 58 und Description 154
Zeichen laut `docs/COPY.md`, Alt-Texte an allen Fotos, Open Graph mit
lokalem Bild, JSON-LD `ProfessionalService` nur mit Name, Adresse, Telefon,
E-Mail und der bestehenden Domain als `url` (kein `aggregateRating`, keine
`openingHours`, kein `priceRange`, kein `sameAs`, kein `areaServed`).

---

## Keywords je Sektion

**Alles in diesem Abschnitt ist vermutet, nicht recherchiert.** Keine
Suchvolumina, keine Rankings, keine Wettbewerbsdaten. Grundlage sind nur die
Begriffe des Kunden (Briefing, Transkript, Altseite) und die Nebenbefunde der
Branchendatei `bauueberwachung-projektsteuerung.md`. Eingetragen vom
copywriter in Phase 3 am 2026-09-27. Die echte Recherche passiert erst im
Produktionsprojekt.

### Meta (Title, Description)
- vermutet: Bauüberwachung Berlin, Projektsteuerung Berlin, Bauingenieur Berlin
- Title und Description tragen „Berlin" je genau einmal (Skill `seo-basis` 4).

### Hero (H1 beim hero-specialist)
- vermutet: Bauüberwachung Berlin, Projektsteuerung Berlin, Ingenieurbüro Bauüberwachung
- Branchendatei: Die Zielgruppe in der Hero-Zeile nennt keiner der acht
  ausgewerteten Wettbewerber, das ist ein Suchbegriff und ein Unterschied.

### Für wen ich arbeite
- vermutet: Bauüberwachung für Bauträger, Bauüberwachung für Architekten,
  externe Bauüberwachung Planungsbüro, Bauherrenvertretung Wohnungsunternehmen,
  Projektsteuerung Projektentwickler

### Leistungen: Projektsteuerung und Bauüberwachung
- vermutet: Projektsteuerung, Projektsteuerer Bauherr, Bauüberwachung,
  Objektüberwachung, HOAI Leistungsphase 8, Bauüberwachung Leistungsphase 8,
  Vergabe Leistungsverzeichnis, Rechnungsprüfung Bau, Gewährleistungsabnahme,
  Baubetreuung, Bauberatung, Bestandsaufnahme Altbau
- Branchendatei: Projektsteuerung und Bauüberwachung stehen auf 7 von 8
  Wettbewerberseiten, „Objektüberwachung" nur auf einer. Beide Varianten im
  Text, Hauptbegriff in H2/H3 ist „Bauüberwachung".
- Die Altseite führte in `meta keywords` zusätzlich „Bauleiter, Bauleitung"
  [Scrape]. Im Entwurf nicht als Überschrift verwendet, weil der Kunde sich
  selbst über Bauüberwachung und Projektsteuerung beschreibt [Transkript].
  Fürs Projekt prüfen, ob „Bauleitung" als Suchbegriff mitgenommen wird.

### Referenzen (Auszug aus der Referenzliste)
- vermutet: Altbausanierung Denkmal Bauüberwachung, Sanierung Einzeldenkmal
  Dresden, Plattenbausanierung Berlin, Schwammsanierung, Holzbalkendecken
  Sanierung, Denkmalsanierung Radebeul
- Ortsnamen der Objekte (Berlin, Dresden, Radebeul, Coswig, Kreischa,
  Strausberg, Brandenburg) stehen im Register als Daten, nicht als
  Keyword-Liste.

### Über mich
- vermutet: Bauingenieur Berlin, Dipl.-Ing. Bauwesen Bauüberwachung,
  Ingenieurbüro Berlin Mitte (Stadtteil nur aus dem nicht beanspruchten
  Google-Eintrag, deshalb nicht im Seitentext)

### Ablauf der Zusammenarbeit
- vermutet: Ablauf Bauüberwachung, Ablauf Projektsteuerung, Kosten
  Bauüberwachung (Einwand „Was kostet das?" steht in der Branchendatei, auf der
  Seite aber bewusst keine Honorarangabe)

### Anfrage
- vermutet: Bauüberwachung anfragen, Projektsteuerung Angebot

---

## Lokale Signale (belegt)

- **Name:** Ingenieurbüro René Gansmüller [Scrape Impressum, Google-Eintrag]
- **Adresse:** Schwedenstraße 13, 13357 Berlin [Scrape Impressum, Footer aller Seiten, Google-Eintrag]
- **Telefon:** 030/ 69 520 364 [Scrape], im Google-Eintrag +49 30 69520364; auf der Seite als „030 69 520 364", im Link `tel:+493069520364`
- **Mobil:** 0173/ 57 31 045 [Scrape], auf der Seite „0173 57 31 045", `tel:+491735731045`
- **E-Mail:** rene.gansmueller@online.de [Scrape]
- **schema.org-Typ:** `LocalBusiness` (kein passenderer Handwerkstyp; Google-Kategorie „Ingenieur" [scrape-google.md]). Keine `openingHours`, kein `aggregateRating`: Im Google-Eintrag gibt es weder Öffnungszeiten noch Bewertungen, das Profil ist nicht beansprucht.
- **Einzugsgebiet:** vorläufig Berlin, Brandenburg, Sachsen [Bruno, Station 1, abgeleitet aus den Orten der Referenzliste], bis der Kunde es bestätigt. Auf der Seite steht es deshalb nicht als Liste, sondern nur über die Referenzorte. Für `areaServed` im JSON-LD erst nach Bestätigung.

---

## Hinweise fürs echte Projekt
<!-- Auffälligkeiten, die für die spätere Recherche relevant sein könnten:
     Nische, Wettbewerbsbegriffe, Begriffe, die der Kunde selbst benutzt. -->

- **Begriffe des Kunden:** „Metier", „Bauüberwachung", „Projektsteuerung",
  „Leistungsphase 8", „überschaubar", „objektbezogen" [Transkript];
  „Objektüberwachung", „Qualitätscontrolling", „Behördenabstimmungen",
  „Schwammsanierung", „Holzbalkendecken" [Scrape].
- **Suchumfeld:** Laut Branchendatei liefert „Ingenieurbüro Bauüberwachung"
  viel Bahn-Bauüberwachung, Verzeichnisse und HOAI-Ratgeber. Für die echte
  Recherche lohnt der Vergleich „Bauüberwachung Hochbau Berlin" gegen
  „Bauüberwachung Berlin".
- **Nische mit Beleg:** Altbau und Einzeldenkmal (11 von 20 Objekten der
  Referenzliste als Einzeldenkmal ausgewiesen, dazu eine denkmalgeschützte
  Villa [Scrape PDF]). Suchbegriffe dazu im Projekt gezielt prüfen.
- **Unterseiten-Kandidaten** (Upsell laut Briefing): eigene Seiten für
  Projektsteuerung und Bauüberwachung. Die H3-Anker `#projektsteuerung` und
  `#bauueberwachung` sind die Vorarbeit.
