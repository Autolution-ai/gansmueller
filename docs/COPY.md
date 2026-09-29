# COPY – Ingenieurbüro René Gansmüller

**Nicht deployen. Unsichtbar für den Kunden.** Ergebnis Phase 3 (copywriter),
Entwurf vom 2026-09-27, vorgezogen wegen des Termins am 29.09.2026. Grundlage:
`docs/STRUKTUR.md` (freigegeben), `docs/DEMO-SPEC.md`, `docs/FUNNEL.md`,
`quellen/*`, Verbotsliste in
`.claude/skills/branchen-wissen/references/bauueberwachung-projektsteuerung.md`.
Skills: `website-copy`, `anti-slop` (Zwei-Pass), `seo-basis`, `branchen-wissen`.
Status: **wartet auf qa-reviewer, dann Freigabe durch Bruno.**

**Nachtrag 2026-09-28 (Phase 5c, Befunde qa-reviewer, im Bau umgesetzt):**
LPH-9-Punkt aus der LPH-8-Liste als eigener Satz „Danach:“ · ein Label
„Bauüberwachung anfragen“ für Hero und Leistungen · Header-Kurzfassung
„Projekt prüfen lassen“ (mobil „Projekt prüfen“) · Steckbrief ohne „über 30
Jahre“ (steht im Hero-Kicker) · „450“ aus der Referenz-Einleitung · Ablauf-
Hinweis ehrlicher · Bildunterschrift Berliner Foto wie auf der Altseite ·
„Mein Büro ist klein, und …“ · Hinweis über 15 Mio. ohne „wir“ (Perspektive
ich) · H2 „Aus meiner Referenzliste“.

## Lesehilfe für den Bau

- Alles in **eckigen Klammern** ist ein Quellenvermerk und kommt **nicht** auf
  die Seite: [Scrape] = `quellen/scrape-website.md` (Seitentext),
  [PDF] = Referenzliste.pdf im selben Scrape, [Transkript] =
  `quellen/gespraech-2026-09-16-setting-transkript.md` (nie wörtlich zitiert),
  [Briefing] = `quellen/briefing.md`, [Bruno] =
  `quellen/gespraech-2026-09-27-bruno.md`, [Spec] / [Struktur] = die Dateien
  unter `docs/`.
- Sichtbarer Text steht als Zitatblock (`>`). Hinweise an den Bau stehen als
  normaler Text darunter.
- Perspektive **ich**. Kein „wir" auf der ganzen Seite (auch nicht für
  „Sie und ich"), damit `copy-check --perspektive ich` sauber durchläuft.
  Demo-Hinweiskästen stehen in dritter Person (CLAUDE.md §6).
- Demo-Hinweise stehen im Markup **direkt über** dem betroffenen Inhalt
  (§11), nie als Band über der Seite. Einheitliches Präfix: „Demo-Stand:".
- Zahlen sind aus der Quelle übernommen, Bauvolumen ohne „,00", sonst
  unverändert, damit `beleg-check` sie findet.

---

## Überschriften-Plan

```
H1  Gebaut wird, was geplant ist.   (Hero, Station 2; Akzent auf „geplant ist.“)
H2  Für wen ich arbeite                                   #fuer-wen
  H3  Sie bauen selbst
  H3  Sie planen und brauchen die Bauüberwachung
H2  Projektsteuerung und Bauüberwachung                   #leistungen
  H3  Projektsteuerung                                    #projektsteuerung
  H3  Bauüberwachung (darunter Kicker „HOAI Leistungsphase 8“)  #bauueberwachung
  H3  Baubetreuung                                        #baubetreuung
  H3  Bauberatung                                         #bauberatung
H2  Aus meiner Referenzliste                           #referenzen  (seit Stilumbau hell, Bauherren-Raster)
  H3  Altbau und Denkmal
  H3  Alle Objekte nach Bauherr
  H3  Projektbereiche
H2  René Gansmüller, Bauingenieur  (Kicker „Über mich“)  #ueber-mich
H2  Ablauf der Zusammenarbeit                             #ablauf
  H3  (sieben Stationen, je eine H3)
H2  Lassen Sie Ihr Projekt unverbindlich prüfen           #anfrage
  H3  Danke-Screen: „Danke, Ihre Anfrage ist angekommen."
Footer: keine Überschriften (Kicker als <p>)
```

Keine Sprünge: Jede H3 hängt unter einer H2, keine H4 auf der Seite. Kicker
über den H2 sind `<p>`, keine Überschriften (Skill `seo-basis` 1).

**Bauherren-Streifen und Referenzen sind eine `<section id="referenzen">`**
mit zwei Flächen: oben das randlose dunkle Band (Kicker, H2, Bauherren),
darunter der helle Teil (Register). So bekommt das Band eine Überschrift, ohne
dass „Referenzliste" zweimal als H2 steht, und der Menüpunkt „Referenzen"
landet am Kopf des Bandes. Rhythmusplan (Zeile 4 full/dunkel, Zeile 5
breakout/hell) bleibt unverändert.

---

## Meta

| Feld | Text | Länge |
|---|---|---|
| `<title>` | Bauüberwachung und Projektsteuerung in Berlin \| Gansmüller | 58 |
| `<meta name="description">` | Bauüberwachung und Projektsteuerung für Bauherren und Planungsbüros: René Gansmüller, Bauingenieur in Berlin. Lassen Sie Ihr Projekt unverbindlich prüfen. | 154 |
| `og:title` | René Gansmüller · Bauüberwachung und Projektsteuerung | – |
| `og:description` | Bauingenieur in Berlin. Bauüberwachung und Projektsteuerung für Bauherren und Planungsbüros, objektbezogen beauftragt. | – |
| `og:image` | offen, entscheidet sich mit dem Hero (1200×630, lokal unter `site/assets/images/`) | – |

Ort je Feld genau einmal. Belege: Leistungen [Transkript, Briefing], Berlin
[Scrape Impressum], „Bauingenieur" [Transkript, Scrape], „unverbindlich prüfen
lassen" [Briefing], objektbezogen [Transkript].

---

## 0 · Header

> Logo: SVG-Nachbau, `alt`/`aria-label`: **Ingenieurbüro René Gansmüller, zur Startseite**
>
> Menü: **Leistungen** (#leistungen) · **Referenzen** (#referenzen) · **Über mich** (#ueber-mich) · **Ablauf** (#ablauf)
>
> Dauerhafter CTA: **Projekt prüfen lassen** (Kurzfassung, Station 2; unter 1100 px „Projekt prüfen“) → `#anfrage`
>
> Mobil: Knopf **Menü** / **Menü schließen** · Sprunglink (nur bei Fokus sichtbar): **Zum Inhalt springen**

[Menü und CTA: Struktur; CTA-Wortlaut: Briefing]

---

## Nachtrag Stilumbau (2026-09-28, Referenz maler-heusser.de)

Grundlage: `docs/REFERENZ-ANALYSE.md`, Umsetzung in `site/` (Commits 9ae2b5a,
b3f26ff). **Neue sichtbare Texte, von Bruno noch zu bestätigen:**

| Stelle | Text | Beleg / Grund |
|---|---|---|
| Hero, Plakette | Dipl.-Ing. (FH) Bauwesen | Scrape Impressum; Plakette ersetzt das Bewertungs-Badge der Referenz (keine Bewertung belegt, §3) |
| Hero, Kicker | Ingenieurbüro in Berlin | Station 2 (unverändert) |
| Hero, Knöpfe | Bauüberwachung anfragen · Referenzliste ansehen | Station 2 / STRUKTUR (sekundär) |
| Hero, Kennzahl 1 | über 30 · Jahre in der Branche | Transkript; steht nur hier (Steckbrief-Zeile gestrichen) |
| Hero, Kennzahl 2 | 450 · Wohneinheiten in der größten Sanierung der Liste | PDF, Rostocker Str./Woldecker Str., größte Zeile nach WE und Bauvolumen |
| Hero, Plankopf-Karte | Referenzliste (Link) · Referenz · Königswinterstr./ Andernacher Str./ Ehrenfelsstraße, Berlin · Bauherr HOWOGE mbH · Umfang Komplexe Altbausanierung, 85 WE · Leistung Bauüberwachung, Qualitätscontrolling · Bearbeitung René Gansmüller | Bildunterschrift Altseite 4.html, übrige Felder PDF |
| Leistungen | H3 „Bauüberwachung“, darunter Kicker „HOAI Leistungsphase 8“ | Wortlaut unverändert, nur getrennt |
| Leistungen | Vergabe als eigene Zeile: Titel „Vergabe“, Text „Auf Wunsch liegt vorher auch die Vergabe bei mir: …“ | Text unverändert, „Vergabe:“ wird Zeilentitel |
| Referenzen | Label „Bauherren“, je Bauherr Objektzahl: HOWOGE 2 · Argentum 10 · Ortus 2 · BauBeCon 3 · GVC 1 Objekt · Kaufland 2 | gezählt aus den 20 Registerzeilen (PDF) |
| Referenzen | Altbau und Denkmal mit zwei Fotos (Loisenstraße, Augustusweg), Bildunterschrift Objekt, Ort und Bauherr | Königswinter-Foto steht jetzt im Hero |
| Über mich | Kicker „Über mich“, H2 „René Gansmüller, Bauingenieur“ | Name: Bruno; „Bauingenieur“: Transkript, Scrape |
| Ablauf | Kicker „Ablauf“; je Station Label „Ergebnis“ (statt „Ergebnis:“) | Stil |
| Ablauf | Abschlusskarte: Knopf „Projekt unverbindlich prüfen lassen“, darunter Label „Telefon“ und 030/ 69 520 364 | CTA aus Station 7, Nummer Scrape |
| Anfrage | Kontaktzeilen: Telefon (030/ 69 520 364, 0173/ 57 31 045) · E-Mail (rene.gansmueller@online.de) · Büro (Schwedenstraße 13, 13357 Berlin) | Scrape Kontakt/Impressum |
| Footer | Spalten „Leistungen“ (Projektsteuerung, Bauüberwachung, Baubetreuung, Bauberatung) und „Kontakt“; „Telefon“/„Mobil“ vor den Nummern; fett gesetzter Name unter dem Logo gestrichen (steht im Logo) | Stil, visual-critic |

Weitere Änderungen ohne neuen Text: In „Für wen“ steht der Absatz jetzt vor
den Zielgruppen-Links, der Projektrahmen-Satz neben der H2.

## 1 · Hero

**Nicht Teil dieses Entwurfs.** Text, H1 und CTA liefert der
`hero-specialist`, entschieden in Station 2. Vorschlag laut Struktur:
primär „Bauüberwachung anfragen" (`?leistung=bauueberwachung`, freigegeben Station 2),
sekundär Textlink „Referenzliste ansehen" (#referenzen).

**Abstimmung mit dem Hero (bitte an den hero-specialist):**
- „über 30 Jahre in der Branche" steht in diesem Entwurf **einmal**, im
  Steckbrief unter „Über mich". Nimmt der Hero die Zahl auf, fliegt die
  Steckbrief-Zeile raus (Ein-Nennung, jede Zahl einmal pro Seite).
- Kernbegriffe, die dieser Entwurf bewusst **nicht** benutzt, damit der Hero sie
  hat: „Erfahrung" (0×), „persönlich" (0×).
- Dreiergruppen: Dieser Entwurf verbraucht **eine** (Funnel, drei Schritte).
  Der Hero hat höchstens noch eine.

---

## 2 · Für wen ich arbeite  `#fuer-wen`

Muster: Gegenüberstellung, zwei getrennte Wege (§9). Psychologie:
Wiedererkennung der eigenen Lage (Stufe 2 der Konkretheits-Leiter).

> ## Für wen ich arbeite

**Weg A**

> ### Sie bauen selbst
>
> Bauträger · Projektentwickler · Wohnungsunternehmen · Gewerbliche Auftraggeber
>
> Sie haben ein Bauvorhaben und brauchen jemanden, der es auf Ihrer Seite steuert oder überwacht. Vielleicht ist Ihre eigene Bauleitung gerade ausgelastet, vielleicht haben Sie keine. Sie beauftragen mich für dieses eine Objekt, und mit dem Objekt endet auch Ihre Verpflichtung.

[Zielgruppen: Briefing, Transkript, Wohnungsunternehmen: Bruno Station 1 ·
eigene Bauleiter beim Stammkunden: Transkript · objektbezogen, keine
Verpflichtung danach: Transkript]

**Weg B**

> ### Sie planen und brauchen die Bauüberwachung
>
> Architektur- und Planungsbüros · Generalplaner
>
> Die Planung liegt bei Ihnen, auf der Baustelle fehlt gerade jemand. Die Bauüberwachung für Ihr Projekt können Sie an mich abgeben. Sie behalten die Planung und haben vor Ort jemanden, der die Ausführung an Ihren Plänen misst.

[Zielgruppen: Briefing, Transkript („arbeite für Architektur- oder
Planungsbüros … die Bauüberwachung") · Überwachung auf Übereinstimmung mit
den Ausführungsplänen: Scrape Leistungen]

**Unter beiden Spalten (Projektrahmen als Nutzen):**

> Vorhaben bis etwa 15 Mio. € Bauvolumen sind der Rahmen, in dem ich arbeite. In dieser Größe bleibt ein Projekt überschaubar, und ich behalte Ihres selbst im Blick.

[Obergrenze: Transkript „maximal 10 oder 15 Millionen", Briefing
„idealerweise bis ca. 10–15 Mio. €" · „überschaubar": Kundenwort, Transkript]

**Links (belegen Funnel-Schritt 1 vor und springen auf Schritt 2):**

| Linktext (sichtbar) | `aria-label` | Ziel |
|---|---|---|
| Bauträger | Anfrage als Bauträger beginnen | `?auftraggeber=bautraeger#anfrage` |
| Projektentwickler | Anfrage als Projektentwickler beginnen | `?auftraggeber=projektentwickler#anfrage` |
| Wohnungsunternehmen | Anfrage als Wohnungsunternehmen beginnen | `?auftraggeber=wohnungsunternehmen#anfrage` |
| Gewerbliche Auftraggeber | Anfrage als gewerblicher Auftraggeber beginnen | `?auftraggeber=gewerblich#anfrage` |
| Architektur- und Planungsbüros | Anfrage als Architektur- oder Planungsbüro beginnen | `?auftraggeber=planungsbuero#anfrage` |
| Generalplaner | Anfrage als Generalplaner beginnen | `?auftraggeber=generalplaner#anfrage` |

Die Zielgruppennamen sind die Links selbst (mit Pfeil und Hover), kein
zusätzlicher Button je Spalte.

---

## 3 · Leistungen  `#leistungen`

Muster: gewichtete Liste, zwei groß, zwei als Zeile, Partnerzeile.
Psychologie: Einwand „Was macht ihr eigentlich genau?" (stärkster Einwand der
Branche, Branchendatei) wird mit der Rolle beantwortet, nicht mit einer
Begriffsliste.

> *Kicker (p):* Leistungen
>
> ## Projektsteuerung und Bauüberwachung
>
> Das ist mein Metier. Welche der beiden Sie brauchen, hängt davon ab, in welcher Phase Ihr Vorhaben gerade steckt.

[„Metier": Kundenwort, Transkript · Leistungen: Briefing, Transkript]

### Groß 1

> ### Projektsteuerung
>
> Mit einer Projektsteuerung haben Sie schon in der Planungsphase einen Bauingenieur auf Ihrer Seite, also früher als bei einer reinen Bauüberwachung. Zwischen Ihnen und dem Generalunternehmer oder Generalübernehmer vertrete ich Ihre Interessen, solange geplant und gebaut wird.
>
> Das passt, wenn Sie Bauherr sind und Ihr Vorhaben nicht selbst durch Planung und Bau führen möchten.
>
> **CTA:** Projektsteuerung anfragen → `?leistung=projektsteuerung#anfrage`

[Rolle zwischen Auftraggeber und GU/GÜ, in der Planungsphase dabei, als
Bauüberwacher dort nicht: Transkript. Bewusst **nicht** genannt:
„alle Leistungsphasen" (nur mit Partnern freigegeben), Abrechnung nach HU/AHO
(A5, ungeklärt).]

### Groß 2

> ### Bauüberwachung (HOAI Leistungsphase 8)
>
> Während gebaut wird, überwache ich die Baustelle in Ihrem Auftrag. Dazu gehören:
>
> - die Kontrolle, ob nach den Ausführungsplänen und nach den Regeln der Technik gebaut wird
> - die Koordination der Gewerke und Handwerker
> - ein Ablaufplan für die Bauzeit und die Überwachung der Termine
> - Kostenkontrolle sowie Aufmaß- und Rechnungsprüfung, bevor Sie zahlen
>
> **Vergabe:** Auf Wunsch liegt vorher auch die Vergabe bei mir: Leistungsverzeichnisse mit genauer Mengenermittlung, Ausschreibungsunterlagen, Angebotsauswertung und Bieterverhandlungen.
>
> **Danach:** Auf Wunsch nehme ich vor Ablauf der Gewährleistungsfrist die Leistungen noch einmal ab und übergebe Ihnen die Revisionsunterlagen.
>
> **CTA:** Bauüberwachung anfragen → `?leistung=bauueberwachung#anfrage`

[Nachtrag qa-reviewer 28.09.: Gewährleistungsabnahme und Revisionsunterlagen
sind Leistungsphase 9, deshalb aus der LPH-8-Liste genommen und ohne
LPH-Nummer als eigener Satz. Liste jetzt vier Punkte.]

[„HOAI Leistungsphase 8": Transkript, Freigabe Bruno · „Ablaufplan für die Bauzeit" = „Erstellung der Ablaufpläne" · alle fünf Punkte:
Scrape Leistungen, Abschnitte „Objektüberwachung" und „Objektbetreuung und
Dokumentation" · Vergabe: Scrape, Abschnitte „Vorbereitung der Vergabe" und
„Mitwirkung bei der Vergabe", **ohne** Leistungsphasen-Nummer (Bruno,
Station 1) · CTA-Wortlaut = Hero-Vorschlag, ein Label pro Ziel]

Liste mit fünf Punkten, keine Dreiergruppe. Vergabe als Absatz mit fettem
Auftakt, keine H4.

### Zeile 1

**Demo-Hinweis direkt über dieser Zeile:**

> **Demo-Stand:** Die Leistung Baubetreuung stammt aus dem Vorgespräch, eine Beschreibung dazu gab es noch nicht. Der Text ist ein Entwurf. Im Projekt steht hier, was René Gansmüller als Baubetreuer übernimmt, in seinen eigenen Worten.

> ### Baubetreuung
>
> Ich vertrete Ihr Vorhaben gegenüber Behörden und Baufirmen und halte die Abstimmungen für Sie zusammen.
>
> **CTA:** Baubetreuung anfragen → `?leistung=baubetreuung#anfrage`

[Leistungsname: Briefing, Transkript · Behördenabstimmungen als Leistung:
PDF · Rest ist Entwurf, deshalb der Hinweis]

### Zeile 2

> ### Bauberatung
>
> Bei Sanierung und Modernisierung ermittle ich den Zustand der Bausubstanz und schätze die Kosten, bevor Sie planen oder ausschreiben.
>
> **CTA:** Bauberatung anfragen → `?leistung=bauberatung#anfrage`

[Scrape Leistungen: „Beratung", „Bestandsaufnahme: Zustandsermittlung der
Bausubstanz bei Sanierungs- und Modernisierungsvorhaben, Kostenschätzung"]

### Partnerzeile

> Brauchen Sie auch die Planung, decke ich gemeinsam mit Partnern alle Leistungsphasen ab. Dann arbeiten Planer, Architekt, Statiker und Brandschutzexperte an Ihrem Vorhaben mit.
>
> **Textlink:** Vorhaben mit Planung anfragen → `?leistung=alle-leistungsphasen#anfrage`

[Satz „gemeinsam mit Partnern alle Leistungsphasen": Transkript, Freigabe
Bruno · vier Rollen: Transkript („einen Planer, einen Architekten …
Brandschutzexperten … Statiker"), Struktur: nie zu drei zusammenziehen ·
keine Partnernamen, keine Logos]

---

## 4 + 5 · Referenzen  `#referenzen`

### Bauherren-Band (direkt unter dem Hero, seit 2026-09-29)

Eigene Sektion zwischen Hero und „Für wen", randlos laufendes Band. Kicker
und H2 „Aus meiner Referenzliste" stehen seitdem am Kopf der Referenzen.

**Demo-Hinweis direkt über dem Band (dritte Person):**

> **Demo-Stand:** Die Namen stammen aus der Referenzliste der bisherigen Website, das HOWOGE-Logo von der eigenen Website der HOWOGE. Vor dem Live-Gang klärt René Gansmüller, wer genannt werden darf.

> *H2 als Label:* Bauherren aus meiner Referenzliste
>
> HOWOGE mbH (Logo) · Argentum GmbH & Co. KG · Ortus GmbH & Co. KG · BauBeCon Wohnen GmbH · GVC mbH · Kaufland Ladenbau GmbH
>
> *Knopf:* Band anhalten / Band abspielen

[Namen exakt nach PDF, Spalte „Bauherr" · Logo nur HOWOGE, Datei und
Herkunft in `quellen/logos.md` · alle anderen als Wortmarke (kein
eindeutiges Logo oder nicht geprüft, Begründung dort) · Alt-Text des Logos
„HOWOGE mbH", im Duplikat leer (aria-hidden)]

### Kopf der Referenzen

> *Kicker (p):* Referenzen
>
> ## Aus meiner Referenzliste

### Heller Teil: Einleitung

> Zwanzig Objekte, sortiert nach Bauherr. Zu jedem Objekt stehen Umfang und Bauvolumen, zu jedem Bauherrn meine Leistung. Die Spanne reicht vom Umbau eines Parkdecks bis zur Plattenbausanierung für die HOWOGE.

[20 Zeilen, Parkdeck, 450 WE Plattenbausanierung: PDF. Keine Summe, keine
Jahreszahl (Bruno, Station 1).]

### Altbau und Denkmal (hervorgehoben, zwei Objekte mit Foto)

> ### Altbau und Denkmal
>
> Die meisten Objekte dieser Liste sind Einzeldenkmale in und um Dresden. Wer dort saniert, muss die alten Bauweisen kennen. Sonst schadet eine gut gemeinte Maßnahme der Substanz, und die Folgen sind teuer zu beheben. Holzbalkendecken fachgerecht zu sanieren oder Hausschwamm zu beseitigen, gehört auf solchen Baustellen dazu.

[„Die meisten": 11 von 20 Zeilen „Einzeldenkmal", dazu die denkmalgeschützte
Villa in Radebeul, PDF · Dresden, Radebeul, Coswig = „in und um Dresden" ·
alte Techniken, Laienfehler, teure Folgen, Holzbalkendecken,
Schwammsanierung: Scrape Referenzen (neu formuliert)]

**Objekt 1** · Foto `BlnK$C3$B6nigswinter.jpg` (Download laut Commit
8820686 noch ausstehend; Ersatz bei Ausfall: Bundschuhstraße 1, liegt schon
unter `site/assets/images/original/ref-dresden-bundschuhstrasse.jpg`)

> **Königswinterstr./ Andernacher Str./ Ehrenfelsstraße, Berlin** (Bildunterschrift exakt wie Altseite 4.html; Register behält PDF-Schreibweise, Klärung im Termin)
> Komplexe Altbausanierung mit Strangsanierung, Fassade, Dach, Keller, Treppenhäusern und Außenanlagen, 85 WE
> Bauherr: HOWOGE mbH · Leistung: Bauüberwachung, Qualitätscontrolling · Bauvolumen: 3.600.000 €

**Objekt 2** · Foto `site/assets/images/original/ref-dresden-loisenstrasse.jpg` (167 × 251, Hochformat)

> **Loisenstraße 10, Dresden**
> Komplexe Altbausanierung, 24 WE, Einzeldenkmal
> Bauherr: Argentum GmbH & Co. KG · Leistung: Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung · Bauvolumen: 950.000 €

[Alle Angaben: PDF. Auswahl: ein Berliner Wohnungsunternehmen, ein
Einzeldenkmal in Dresden. Zwei statt drei Objekte: hält die
Dreiergruppen-Grenze frei.]

### Alle Objekte nach Bauherr (Register)

> ### Alle Objekte nach Bauherr
>
> *Legende (p):* WE = Wohneinheiten
>
> *Gruppenkopf je Bauherr:* Objektzahl („2 Objekte", „10 Objekte", „1 Objekt"), übernommen aus dem entfallenen Bauherren-Raster
>
> *Knopf unter der Tabelle:* Alle 20 Objekte anzeigen / Weniger anzeigen

Umsetzung als `<table>` mit `<caption>` „Referenzobjekte nach Bauherr",
Spalten **Objekt · Ort · Umfang · Bauvolumen**. Je Bauherr eine
Gruppenzeile (`<th scope="rowgroup">`) mit Bauherr und Leistung, weil die
Leistung innerhalb jedes Bauherrn identisch ist. Mobil: Zeilen als
gestapelte Einträge, Gruppenzeile bleibt Kopf.

**HOWOGE mbH** · Leistung: Bauüberwachung, Qualitätscontrolling

| Objekt | Ort | Umfang | Bauvolumen |
|---|---|---|---|
| Rostocker Str./Woldecker Str. | Berlin | Plattenbausanierung (Strangsanierung, Treppenhäuser, Keller, Hauseingänge, Dach), 450 WE | 4.500.000 € |
| Andenacher Str./Winterfelsstr. Königswinterstr. | Berlin | Komplexe Altbausanierung (Strangsanierung, Fassade, Dach, Keller, Treppenhäuser, Außenanlagen), 85 WE | 3.600.000 € |

**Argentum GmbH & Co. KG** · Leistung: Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung

| Objekt | Ort | Umfang | Bauvolumen |
|---|---|---|---|
| Loisenstraße 10 | Dresden | Komplexe Altbausanierung, 24 WE (Einzeldenkmal) | 950.000 € |
| Heynathsstraße 16 | Dresden | Komplexe Altbausanierung, 16 WE (Einzeldenkmal) | 650.000 € |
| Moritzburger Str. 15 | Dresden | Komplexe Altbausanierung, 22 WE (Einzeldenkmal) | 850.000 € |
| Moritzburger Straße 67 | Dresden | Komplexe Altbausanierung, 8 WE (Einzeldenkmal) | 350.000 € |
| Bundschuhstraße 1 | Dresden | Komplexe Altbausanierung, 22 WE (Einzeldenkmal) | 750.000 € |
| Lindenstraße 9 | Coswig | Komplexe Altbausanierung, 7 WE (Einzeldenkmal) | 300.000 € |
| Lenbachstraße 3/5 | Dresden | Komplexe Altbausanierung, 36 WE (Einzeldenkmal) | 1.350.000 € |
| Augustusweg 114 | Radebeul | Komplexe Altbausanierung, 10 WE (Einzeldenkmal) | 1.200.000 € |
| Wöhlerstraße 1/1a | Dresden | Komplexe Altbausanierung, 32 WE (Einzeldenkmal) | 950.000 € |
| Eduard-Bilz-Str. 49 | Radebeul | Komplexe Sanierung einer denkmalgeschützten Villa | 1.350.000 € |

**Ortus GmbH & Co. KG** · Leistung: Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung

| Objekt | Ort | Umfang | Bauvolumen |
|---|---|---|---|
| Weimarische Str. 12 | Dresden | Komplexe Altbausanierung, 12 WE (Einzeldenkmal) | 650.000 € |
| Zwickauer Str. 128 | Dresden | Komplexe Altbausanierung, 16 WE (Einzeldenkmal) | 750.000 € |

**BauBeCon Wohnen GmbH** · Leistung: Ausschreibung, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling

| Objekt | Ort | Umfang | Bauvolumen |
|---|---|---|---|
| 120 WE im Stadtgebiet Berlin | Berlin | Teilsanierung einzelner Leer-WE, verteilt im Stadtgebiet | 1.350.000 € |
| 24 Liegenschaften im Stadtgebiet Berlin | Berlin | Teilsanierung von Dächern, Fassaden, Treppenhäusern, Kellern, Heizungsanlagen | 1.500.000 € |
| Linienstraße 56 | Brandenburg | Teilsanierung von 6 Leer-WE | 140.000 € |

**GVC mbH** · Leistung: Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung

| Objekt | Ort | Umfang | Bauvolumen |
|---|---|---|---|
| Dresdner Str. 36 | Kreischa | Neubau eines Edeka Lebensmittelmarktes | 650.000 € |

**Kaufland Ladenbau GmbH** · Leistung: Bauüberwachung, Qualitätscontrolling

| Objekt | Ort | Umfang | Bauvolumen |
|---|---|---|---|
| Kaufland Schönerberger Str. 7 | Berlin | Umbau eines Parkdecks | 45.000 € |
| Kaufland Strausberg | Strausberg | Neubau von 2 Werbeanlagen | 55.000 € |

[Alle 20 Zeilen: PDF. **Objekt, Ort, Bauherr und Leistungsbegriffe in
PDF-Schreibweise.** Geglättet wurden nur offensichtliche Tipp- und
Umbruchfehler im Beschreibungs- und Leistungstext: „Albausanierung" →
„Altbausanierung", „KomplexeAlbausanierung" → „Komplexe Altbausanierung",
„Auschreibung" → „Ausschreibung", „denkmalsgeschützen" → „denkmalgeschützten",
„Eduard-Bilz- Str." → „Eduard-Bilz-Str.", Silbentrennungen („Treppen-
häuser", „Leer- WE") zusammengezogen. Straßennamen **nicht** korrigiert,
siehe offene Punkte.]

### Projektbereiche

**Demo-Hinweis direkt über der Bereichszeile:**

> **Demo-Stand:** Industriebau sowie Arztpraxen und Krankenhäuser nennt René Gansmüller selbst als Bereiche seiner Arbeit. Die Referenzliste der bisherigen Website enthält dazu noch keine Objekte. Im Projekt stehen hier seine Beispiele mit Foto und Leistung.

> ### Projektbereiche
>
> Wohnungsbau · Gewerbe · Industrie · Arztpraxen · Krankenhäuser

[Bereiche: Transkript („nicht bloß sozialer Wohnungsbau … Gewerbe …
Industrie … Arztpraxen, Krankenhäuser"), Briefing · Wohnungsbau und Gewerbe
durch PDF belegt · Formulierung im Hinweis „Industriebau sowie Arztpraxen und
Krankenhäuser" als 1 + 2 gesetzt, damit keine Dreiergruppe entsteht ·
Keine Aussage, dass es dort keine Projekte gibt (§3, Abwesenheit ≠
Nichtexistenz)]

### Abschluss der Referenzen

> **CTA:** Ähnliches Vorhaben? Projekt prüfen lassen → `#anfrage`

[Vorgabe Koordination 2026-09-29. Bewusst mit Bezug auf die Referenzliste,
Ziel identisch mit dem Hauptziel.]

### Alt-Texte der Referenzfotos

Nur Objekt und Ort laut Referenzliste, ergänzt um die sichtbare Ansicht. Keine
Wertung, kein Vorher/Nachher, kein Jahr.

| Datei (`site/assets/images/original/`) | `alt` | Stand |
|---|---|---|
| ref-dresden-loisenstrasse.jpg | Wohnhaus Loisenstraße 10 in Dresden, Straßenansicht | liegt vor |
| ref-dresden-bundschuhstrasse.jpg | Wohnhaus Bundschuhstraße 1 in Dresden, Straßenansicht | liegt vor |
| ref-dresden-woehlerstrasse.jpg | Eckhaus Wöhlerstraße 1/1a in Dresden | liegt vor, **Datumsstempel im Bild**, siehe offene Punkte |
| (Augustusweg, ausstehend) | Wohnhaus Augustusweg 114 in Radebeul | Download ausstehend |
| (Königswinter, ausstehend) | Wohngebäude an der Königswinterstraße in Berlin | Download ausstehend |
| (Diska Kreischa, ausstehend) | **nicht verwenden**, bis geklärt, siehe offene Punkte | Download ausstehend |

[Objekt und Ort: PDF, Bildzuordnung: Bildunterschriften der Altseite
(Scrape 4.html) · „Straßenansicht", „Eckhaus": visuelle Prüfung im Scrape
(Commit 8820686)]

---

## 6 · Über mich  `#ueber-mich`

Muster: asymmetrischer Zweispalter, Steckbrief bricht aus. Psychologie:
Vertrauen über prüfbare Angaben, Stammkunden als Beweis.

**Demo-Hinweis direkt über dem Bildplatz:**

> **Demo-Stand:** Hier steht im Projekt ein aktuelles Porträt von René Gansmüller.

Bildplatz: gerahmte Fläche im Seitenverhältnis des späteren Porträts, `alt=""`
solange leer, `role="img"` mit `aria-label="Platz für das Porträt von René
Gansmüller"`. Das Porträt im alten Titelbild wird **nicht** verwendet: Wer
darauf zu sehen ist, steht nirgends (Scrape).

> ## Über mich
>
> Mein Büro ist klein, und Sie sprechen deshalb mit dem, der Ihr Projekt auch verantwortet.
>
> Wo ein Projekt tägliche Betreuung braucht, ist mein Mitarbeiter jeden Tag vor Ort, und ich komme zu den Baubesprechungen. Wenn Sie anrufen, erreichen Sie mich direkt.
>
> Die meisten neuen Auftraggeber kommen über Empfehlungen. Mit einigen arbeite ich seit 20 bis 30 Jahren zusammen.

[Klein, persönlich statt großes Ingenieurbüro: Briefing (Positionierung),
Transkript („begrenzt in meiner Größe") · ein Mitarbeiter, täglich vor Ort,
er selbst in der Baubesprechung: Transkript, **bedingt** formuliert (Bruno,
Station 1) · Büro- und Mobilnummer: Scrape · Empfehlungen: Briefing
(„hauptsächlich über Empfehlungen"), Transkript · 20 bis 30 Jahre: Briefing
(„teilweise seit 20–30 Jahren"), Transkript]

**Steckbrief (bricht aus, drei Zeilen; „über 30 Jahre“ steht im Hero-Kicker, Ein-Nennung):**

> **Abschluss** · Dipl.-Ing. (FH) Bauwesen
> **Büro** · Berlin seit 2007, vorher im Raum Dresden
> **Direkt erreichbar** · 030/ 69 520 364 · mobil 0173/ 57 31 045 (Schreibweise Scrape, wie Hero und Footer)

[Titel: Scrape Impressum · „über 30 Jahre in der Branche": Transkript,
**nicht** „in Bauüberwachung & Projektsteuerung" (A1) · 2007, Raum Dresden:
Scrape Home · Nummern: Scrape Kontakt/Impressum, Schreibweise ohne
Schrägstrich, `tel:+493069520364` und `tel:+491735731045`]

---

## 7 · Ablauf der Zusammenarbeit  `#ablauf`

Muster: Stationen, nummeriert (echte Reihenfolge, §7). Je Station ein Satz
zum Tun und das Ergebnis für den Auftraggeber. Die Aufgaben der Bauüberwachung
stehen schon unter Leistungen und werden hier nicht noch einmal aufgezählt
(Ein-Nennung), hier steht die Folge.

> ## Ablauf der Zusammenarbeit

Seit 2026-09-29 als Zeitstrahl. Gruppenlabels: **Bevor es losgeht**
(Stationen 1 bis 3) und **Am Bau** (4 bis 7). Ab 900 px sind die Stationen
Tabs („Stationen der Zusammenarbeit") mit einem Detailfeld (Titel,
Beschreibung, Ergebnis); mobil eine Zeile je Station (Ziffer, Titel,
Ergebnis), die Beschreibung klappt auf. Neben dem Detailfeld bzw. unter der
Liste: CTA und „Telefon 030/ 69 520 364". Stationstexte unverändert.

**Demo-Hinweis direkt über Station 1:**

> **Demo-Stand:** Die Stationen 1 bis 3 sind ein Entwurf für die Demo; dass die Beauftragung je Objekt erfolgt, stammt aus dem Vorgespräch. Die Stationen 4 bis 7 folgen dem Leistungsangebot der bisherigen Website. Im Projekt legt René Gansmüller den Einstieg so fest, wie er tatsächlich arbeitet.

> **1 · Anfrage** (H3)
> Sie beantworten zwei kurze Fragen und hinterlassen Ihre Kontaktdaten.
> *Ergebnis:* Ihr Vorhaben ist in groben Zügen bekannt, bevor das erste Gespräch beginnt.

> **2 · Erstgespräch** (H3)
> Sie schildern Ihr Vorhaben und bekommen die Rückfragen, die ein Bauingenieur dazu hat.
> *Ergebnis:* Sie wissen, welche Leistung Ihr Projekt braucht und in welchem Umfang.

> **3 · Beauftragung für Ihr Objekt** (H3)
> Sie vergeben den Auftrag für dieses eine Vorhaben.
> *Ergebnis:* Eine klare Vereinbarung für ein Objekt, ohne Bindung darüber hinaus.

> **4 · Bestandsaufnahme und Beratung** (H3)
> Bei Sanierung und Modernisierung steht die Prüfung der vorhandenen Substanz am Anfang.
> *Ergebnis:* Sie planen mit einer Kostenschätzung, die den tatsächlichen Zustand kennt.

> **5 · Vergabe** (H3)
> Ich bereite die Vergabe vor und begleite sie bis zum Auftrag an die Firma.
> *Ergebnis:* Sie vergeben auf Grundlage vergleichbarer Angebote.

> **6 · Objektüberwachung** (H3)
> Die Überwachung läuft, bis das Objekt fertig ist.
> *Ergebnis:* Sie zahlen, was geprüft und aufgemessen ist.

> **7 · Gewährleistungsabnahme und Dokumentation** (H3)
> Vor Ablauf der Gewährleistungsfrist nehme ich die Leistungen noch einmal ab und übergebe Ihnen die Revisionsunterlagen.
> *Ergebnis:* Mängel kommen auf den Tisch, solange die Firmen noch dafür einstehen.
>
> **CTA:** Projekt unverbindlich prüfen lassen → `#anfrage`

[1: zwei Pflichtfragen laut Spec/FUNNEL, muss zum Markup passen (beleg-check
Selbstabgleich) · 2, 3: Entwurf, objektbezogen: Transkript · 4–7: Scrape
Leistungen (Bestandsaufnahme, Kostenschätzung, Vergabe, Objektüberwachung,
Aufmaßkontrolle und Rechnungsprüfung, Gewährleistungsabnahmen,
Revisionsunterlagen) · Station 3 ist die einzige Wiederaufnahme von
„objektbezogen" (Hauptnennung unter „Für wen"), hier als Schritt, nicht als
Argument]

Nummern als Zeichen der Station (`<ol>`), keine „01/02/03"-Deko.

---

## 8 · Anfrage-Funnel  `#anfrage`

Gerahmter Kasten nach `docs/FUNNEL.md`: Kopfzeile, Schrittzähler,
Fortschrittsbalken, Fußzeile. Zwei Pflichtfragen plus Kontakt.

> *Kicker (p):* Anfrage
>
> ## Lassen Sie Ihr Projekt unverbindlich prüfen
>
> Zwei kurze Fragen, dann Ihre Kontaktdaten. Melden Sie sich auch, wenn Ihr Vorhaben erst in einem oder zwei Jahren beginnt: Viele Aufträge sind aus einem Gespräch entstanden, das lange vorher stattfand.

[„unverbindlich prüfen": Briefing · Kontakte melden sich oft ein bis zwei
Jahre später: Transkript]

**Kopfzeile des Kastens:** Projektanfrage · Schritt 1 von 3

**Vorbelegte Leistung** (nur sichtbar, wenn `?leistung=` gesetzt ist, als
Chip über Schritt 1):

> Gewählte Leistung: **Bauüberwachung** · ändern

Werte für `?leistung=`: `projektsteuerung` → Projektsteuerung ·
`bauueberwachung` → Bauüberwachung · `baubetreuung` → Baubetreuung ·
`bauberatung` → Bauberatung · `alle-leistungsphasen` → Vorhaben mit Planung.
„ändern" entfernt den Chip.

### Schritt 1 von 3 (Pflicht, Tap)

> **Wer fragt an?** *
>
> ◯ Bauträger · ◯ Projektentwickler · ◯ Wohnungsunternehmen · ◯ Gewerblicher Auftraggeber · ◯ Architektur- oder Planungsbüro · ◯ Generalplaner · ◯ Privates Eigenheim

**Hinweis bei Auswahl „Privates Eigenheim"** (erscheint unter den Optionen,
Absenden bleibt möglich, Anfrage wird markiert):

> Gut zu wissen: Ich arbeite vor allem für gewerbliche Bauherren und Planungsbüros. Schicken Sie Ihre Anfrage gern ab, ich sehe sie mir an.

[Optionen: Spec, Wohnungsunternehmen ergänzt (Bruno, Station 1; ohne die
Option kann der Link aus „Für wen" Schritt 1 nicht vorbelegen, siehe offene
Punkte) · Verhalten: Bruno, Nachtrag „Privates Eigenheim"]

### Schritt 2 von 3 (Pflicht, Tap)

> **Wie groß ist das Bauvolumen ungefähr?** *
>
> ◯ unter 1 Mio. € · ◯ 1–5 Mio. € · ◯ 5–15 Mio. € · ◯ über 15 Mio. € · ◯ noch offen

**Hinweis bei Auswahl „über 15 Mio. €"** (Absenden bleibt möglich, Anfrage
wird markiert):

> Das liegt über meinem üblichen Rahmen. Senden Sie Ihre Anfrage ruhig ab, dann klärt sich im Gespräch, wo ich Ihr Vorhaben unterstützen kann.

[Stufen: Bruno, delegierte Entscheidung · Verhalten: Spec · „Rahmen" greift
das Wort aus „Für wen" auf, ohne die Zahl zu wiederholen]

### Schritt 3 von 3 (Pflicht: Kontakt)

> **Ihre Kontaktdaten**
>
> Name * · Platzhalter: Vor- und Nachname
> Unternehmen oder Büro · Platzhalter: Name Ihres Unternehmens oder Büros
> E-Mail * · Platzhalter: Ihre E-Mail-Adresse
> Telefon · Platzhalter: Für Rückfragen
>
> ☐ Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert werden. (Datenschutzerklärung) *
>
> **Knopf:** Anfrage absenden
>
> *Fußzeile (p):* Pflichtfelder sind mit * markiert.

Navigation: **Weiter** (Schritt 1, 2), **Zurück** (ab Schritt 2, auf Schritt
1 per `hidden` ausgeblendet), **Anfrage absenden** (Schritt 3).
Fehlermeldungen: „Bitte wählen Sie eine Option." · „Bitte geben Sie Ihren
Namen ein." · „Bitte geben Sie eine gültige E-Mail-Adresse ein." · „Bitte
bestätigen Sie die Einwilligung."

### Danke-Screen

> ### Danke, Ihre Anfrage ist angekommen.
>
> Ich sehe mir Ihre Angaben an und melde mich bei Ihnen.
>
> *Freiwillig:* Wenn Sie mögen, erzählen Sie mehr über Ihr Vorhaben. Das erste Gespräch wird dadurch konkreter.
>
> **Um welche Art Projekt geht es?** ◯ Neubau · ◯ Sanierung im Bestand · ◯ Umbau · ◯ Sonstiges
> **Wo liegt das Projekt?** Platzhalter: Ort oder Postleitzahl
> **Wann soll es losgehen?** ◯ in den nächsten Monaten · ◯ im kommenden Jahr · ◯ später · ◯ noch offen
> **Wie lange soll es laufen?** ◯ unter 6 Monate · ◯ 6 bis 12 Monate · ◯ länger als 12 Monate · ◯ noch offen
> **Gibt es schon Pläne oder Unterlagen?** Dann laden Sie sie gern hoch. (Datei-Upload: Pläne, Leistungsverzeichnis, Baubeschreibung)
> **Wie sind Sie auf mich aufmerksam geworden?** ◯ Empfehlung · ◯ Google-Suche · ◯ bestehender Kontakt · ◯ Sonstiges
>
> **Knopf:** Angaben ergänzen
> **Textlink:** Zurück zur Seite
>
> *Nach „Angaben ergänzen":* Danke, damit lässt sich das Gespräch gut vorbereiten.

[Keine Reaktionszeit, weil keine belegt ist (Struktur, Asset-Bedarf) ·
Freiwillige Fragen: Briefing (Projektart, Standort, Start, Laufzeit,
Unterlagen), FUNNEL (Kanal-Frage) · 6 bis 12 Monate: Briefing („Projekte meist
6–12 Monate") · Projektart-Optionen aus den Umfängen der Referenzliste
abgeleitet (Neubau, Sanierung, Umbau), je vier Optionen, keine Dreiergruppe ·
Planung vorhanden: als Upload statt Ja/Teilweise/Nein-Frage, das wäre die
nächste Dreiergruppe]

Nach dem Absenden verschwinden Weiter, Zurück und Absenden (FUNNEL).

---

## 9 · Footer

> **Ingenieurbüro René Gansmüller**
> Dipl.-Ing. (FH) Bauwesen
>
> Schwedenstraße 13, 13357 Berlin
> Telefon 030 69 520 364 · Mobil 0173 57 31 045
> rene.gansmueller@online.de
>
> Projekt unverbindlich prüfen lassen → `#anfrage`
>
> Impressum · Datenschutz

[Name, Titel, Adresse, Telefon, Mobil, E-Mail: Scrape Impressum/Kontakt,
NAP identisch mit Google-Eintrag (scrape-google.md) · kein Fax (Bruno,
Station 1) · keine Jahreszahl im Copyright, weil keine belegt ist]

**Impressum und Datenschutz** (je eigene Seite oder Dialog, gleicher Text):

> **Demo-Stand:** Impressum und Datenschutzerklärung werden im Rahmen der Zusammenarbeit eingerichtet.

---

## CTA-Liste (vereinheitlicht)

| Ziel | Label | Wo | Ziel-URL |
|---|---|---|---|
| Hauptziel Anfrage | **Projekt unverbindlich prüfen lassen** | Ablauf (neben dem Detailfeld), Footer (Header: Kurzfassung **Projekt prüfen lassen**) | `#anfrage` |
| Bauüberwachung | **Bauüberwachung anfragen** | Hero, Leistungen | `?leistung=bauueberwachung#anfrage` |
| Projektsteuerung | **Projektsteuerung anfragen** | Leistungen | `?leistung=projektsteuerung#anfrage` |
| Baubetreuung | **Baubetreuung anfragen** | Leistungen | `?leistung=baubetreuung#anfrage` |
| Bauberatung | **Bauberatung anfragen** | Leistungen | `?leistung=bauberatung#anfrage` |
| Planung mit Partnern | **Vorhaben mit Planung anfragen** (Textlink) | Leistungen, Partnerzeile | `?leistung=alle-leistungsphasen#anfrage` |
| Zielgruppe | Name der Zielgruppe als Link | Für wen (6×) | `?auftraggeber=…#anfrage` |
| Referenzen | Referenzliste ansehen (Textlink) | Hero (Vorschlag) | `#referenzen` |
| Hauptziel aus den Referenzen | **Ähnliches Vorhaben? Projekt prüfen lassen** | unter den Referenzen | `#anfrage` |
| Register | Alle 20 Objekte anzeigen · Weniger anzeigen | Referenzen | – (klappt auf) |
| Band | Band anhalten · Band abspielen | Bauherren-Band | – |
| Funnel | Weiter · Zurück · **Anfrage absenden** · Angaben ergänzen · Zurück zur Seite | Funnel | – |

Ein Label je Ziel, keine Varianten. Die H2 des Funnels („Lassen Sie Ihr
Projekt unverbindlich prüfen") greift das Hauptziel auf, ist aber eine
Überschrift, kein Button.

---

## Zählung (nach Pass 2, sichtbarer Text der Sektionen 0 und 2–9)

Gezählt per Skript über den sichtbaren Text dieses Entwurfs (Zitatblöcke ohne
Quellenvermerke, Register und Hinweiskästen eingeschlossen, Hero nicht
enthalten), zusätzlich
`node scripts/copy-check.mjs --perspektive ich --gewerk bauueberwachung-projektsteuerung`
auf den extrahierten Text. Nach dem Bau erneut auf `site/index.html`.

| Prüfung | Wert | Grenze |
|---|---|---|
| Ansprache Leser zu „wir/uns" (Skript) | 70 : 0 | ≥ 2 : 1 |
| Ansprache Leser zu allen Ich-Formen (ich, mich, mir, mein…) | 70 : 34 = 2,06 : 1 | ≥ 2 : 1 (sinngemäß für Ich-Perspektive) |
| „wir/uns/unser" | 0 | 0 (Perspektive ich) |
| Gedankenstriche (—, „ – ", --) | 0 | 0 |
| Dreiergruppen | 1 (Funnel: drei Schritte) | ≤ 2 |
| Verbotsliste des Gewerks | 0 Treffer | 0 |
| AI-Floskeln / Tonfallen (Skript) | 0 | 0 |
| „Erfahrung" | 0 | ≤ 2 (Rest für den Hero) |
| „persönlich" | 0 | ≤ 2 |
| „Partner" | 1 | ≤ 2 |
| „unverbindlich" | 4 (davon 3 CTA-Label, 1 Funnel-H2) | Label zählt als ein Ziel |
| „qualität" | **8** (alles „Qualitätscontrolling" aus der Referenzliste) | ≤ 2 → **Skript-Fehler, siehe offene Punkte** |
| Stakkato-Warnung | 7, alle aus aneinandergereihten Überschriften und Labels der Textextraktion, kein Fließtext | im HTML nur Fließtext geprüft |

Dreiergruppen geprüft auf Text- und Layout-Ebene: Zielgruppen 4 + 2,
Leistungen 2 + 2, Vergabe-Aufzählung 4, Partnerrollen 4, Bauherren 6,
hervorgehobene Objekte 2, Steckbrief 4, Ablauf 7, Funnel-Optionen 7 und 5,
Danke-Fragen 6 mit je 4 Optionen, Projektbereiche 5, Footer-Kontakt 4
(Adresse, Telefon, Mobil, E-Mail als eigene Zeilen setzen, sonst entsteht mit
„Telefon · Mobil" in einer Zeile eine Dreiergruppe).

**Bau-Hinweis Dreiergruppe Funnel-Navigation:** „Weiter", „Zurück" und
„Anfrage absenden" nicht als drei gleichartige Geschwister in einem Container
anlegen (copy-check zählt Container mit genau drei gleichartigen Kindern).

## Anti-slop-Protokoll (Zwei-Pass)

**Pass 1** entfernt: „nicht nur … sondern" (Denkmal-Absatz), „ein
Ansprechpartner" (Verbotsliste, „aus einer Hand / ein Ansprechpartner"),
„Entlastung" als Formel, „Spannbogen von … bis …" als Ablauf-Überschrift,
„Chefsache" (Wettbewerberformel Q6), Aufzählung „Berlin, Brandenburg und
Sachsen" und „Planung, Statik und Brandschutz" (Dreier), „Ja / teilweise /
nein" im Danke-Screen (Dreier), „wir" im Sinn von „Sie und ich".

**Selbst-Audit: Was wirkt noch nach AI?**
1. Die Ergebniszeilen im Ablauf hatten alle dieselbe Form („Sie wissen …",
   „Sie haben …"). Gleichförmig.
2. Projektrahmen-Satz „davon haben Sie etwas: Ihr Projekt läuft nicht
   nebenher" behauptet eine Aufmerksamkeit, die nicht belegt ist, und klingt
   nach Pointe.
3. „Mein Büro ist klein, und das ist Absicht" war Pose, nicht belegt.
4. „Die Spanne reicht vom … bis zur …" riskiert den Spannbogen-Tell.

**Pass 2** behoben: Ergebniszeilen im Satzbau variiert (Ich-Satz,
Sie-Satz, Nominalsatz, „Mängel kommen auf den Tisch"). Projektrahmen auf
„überschaubar" (Kundenwort) und „ich verantworte es selbst" zurückgeführt.
„Absicht" gestrichen, stattdessen die Folge für den Leser. Die Spanne bleibt,
weil sie zwei echte Endpunkte aus der Liste nennt (Parkdeck, 450 Wohnungen)
und keine Werbeformel ist; ohne „von der Idee bis …"-Muster.
Gedankenstrich-Scan: 0.

## Inhaber-Test (Sätze, die geprüft und bewusst behalten oder geändert wurden)

- „Mein Rahmen sind Vorhaben bis etwa 15 Mio. € Bauvolumen." Behalten: sagt
  der Inhaber selbst so, als Rahmen, nicht als Absage.
- „Das liegt über meinem üblichen Rahmen. Senden Sie Ihre Anfrage ruhig
  ab …" Behalten: freundlich, keine Hürde.
- „Gut zu wissen: Ich arbeite vor allem für gewerbliche Bauherren und
  Planungsbüros." Behalten: sagt, wofür er steht, ohne den Privatkunden
  wegzuschicken.
- „Sie sprechen mit dem, der Ihr Projekt auch verantwortet." Behalten: kein
  Vergleich mit anderen Büros, nur die Folge der eigenen Größe.
- Gestrichen: jede Form von „für Privatkunden bin ich nicht da",
  „große Projekte nehme ich nicht an".

---

## Offene Punkte

1. **Gate-Konflikt „Qualitätscontrolling".** Die Referenzliste führt die
   Leistung bei allen sechs Bauherren, dazu stehen zwei Nennungen in den
   hervorgehobenen Objekten: 8× „qualität". `copy-check` meldet das als
   Ein-Nennung-Fehler, obwohl es Daten sind, kein Verkaufsargument. Optionen
   für Bruno: (a) als bekannte Ausnahme für die Registertabelle stehen lassen,
   (b) Leistung in den zwei hervorgehobenen Objekten weglassen (dann 6×,
   Fehler bleibt), (c) Bauherren mit gleicher Leistung unter einer
   gemeinsamen Leistungszeile gruppieren (3×, bricht aber die Sortierung nach
   Bauherr). Empfehlung: (a). Der Begriff ist Kundensprache und steht so in
   seiner eigenen Liste.
2. **Straßennamen im PDF widersprechen der Bildunterschrift der Altseite**
   (Widerspruchspflicht §3): PDF „Andenacher Str./Winterfelsstr.
   Königswinterstr." gegen Bildunterschrift „Königswinterstr./ Andernacher
   Str./ Ehrenfelsstraße, Berlin" (Scrape 4.html). Laut Vorgabe steht die
   PDF-Schreibweise. Vermutlich ist „Andernacher Str." und „Ehrenfelsstraße"
   richtig, das entscheidet aber der Kunde. Ebenso „Kaufland Schönerberger
   Str. 7" (PDF), möglicherweise „Schöneberger Str.". Beide Fragen gehören in
   den Termin am 29.09.
3. **Diska Kreischa.** Die Altseite zeigt ein Foto „Lebensmitteldiscounter
   Diska, Kreischa" (6.html), die Referenzliste nennt in Kreischa nur
   „Dresdner Str. 36, Neubau eines Edeka Lebensmittelmarktes" (GVC mbH). Ob
   das dasselbe Objekt ist, steht nirgends. Foto deshalb nicht dem
   Registereintrag zuordnen und nicht hervorheben, bis Bruno oder der Kunde es
   bestätigt.
4. **Datumsstempel im Foto Wöhlerstraße** („04.05.2008", unten rechts
   eingebrannt, laut Scrape). Widerspricht der Entscheidung „keine
   Jahreszahlen an Referenzen". Das Foto im Entwurf nicht hervorgehoben;
   falls es im Bau erscheint, den Stempel per Bildausschnitt
   (`object-position`) außerhalb der sichtbaren Fläche halten, Datei nicht
   bearbeiten.
5. **Funnel-Option „Wohnungsunternehmen" ergänzt.** Station 1 hat die
   Zielgruppe freigegeben, die Optionsliste in `docs/DEMO-SPEC.md` (Pflichtfrage
   1) führt sie noch nicht. Ohne die Option kann der Link aus „Für wen"
   Schritt 1 nicht vorbelegen. Bitte bestätigen, dann DEMO-SPEC nachziehen.
6. **Parameter `?auftraggeber=`** ist neu (Struktur verlangt die
   Vorbelegung, nennt aber keinen Parameternamen). Werte siehe Sektion 2.
7. **Ein-Nennung „über 30 Jahre"**: steht nur im Steckbrief. Übernimmt der
   Hero die Zahl, entfällt die Steckbrief-Zeile.
8. **Zeitlicher Rahmen „über 30 Jahre".** Die Altseite sagt 2008 „seit 12
   Jahren als Bauingenieur (FH) tätig" und „seit 9 Jahren selbständig"
   [Scrape Home]. Das ergibt für 2026 rund 30 Jahre als Bauingenieur. „Über
   30 Jahre in der Branche" [Transkript] ist damit plausibel, wenn Studium oder
   Tätigkeit davor mitzählen. Kein Widerspruch, aber der Kunde wird die Zahl
   im Termin sehen: kurz bestätigen lassen. Gleiches gilt für „Stammkunden
   seit 20 bis 30 Jahren" bei Selbständigkeit seit etwa 1999.
9. **Königswinter-Foto** noch nicht im Repo (Commit 8820686: „folgen").
   Ersatz für Objekt 1 wäre Bundschuhstraße 1 (Argentum, 22 WE,
   Einzeldenkmal, 750.000 €), dann sind beide hervorgehobenen Objekte aus
   Dresden und kein Berliner Objekt hat ein Bild.
10. **Baubetreuung**: Beschreibung ist Entwurf (Hinweiskasten gesetzt). Im
    Termin fragen, was er darunter versteht.
11. **Formular sendet in der Demo nicht.** Kein Hinweiskasten verlangt, im
    Termin aber zu wissen. Falls Bruno einen will: „Demo-Stand: Das Formular
    zeigt den Ablauf, abgeschickt wird im Projekt."
