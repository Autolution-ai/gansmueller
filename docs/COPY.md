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
| Hero, Kennzahl 2 | 450 · Wohneinheiten für die HOWOGE | PDF, Rostocker Str./Woldecker Str., Plattenbausanierung 450 WE, Bauherr HOWOGE mbH (Label seit 2026-09-29 kürzer) |
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

**Stand 2026-09-29 (Bruno, Beleg: `quellen/gespraech-2026-09-27-bruno.md`, Nachtrag „Hero-Claim und Zähler").** Layout unverändert.

> *Plakette:* Dipl.-Ing. (FH) Bauwesen
>
> *Kicker:* Ingenieurbüro René Gansmüller
>
> # Ihr Partner für **Bauüberwachung und Projektsteuerung** in Berlin, Brandenburg und Sachsen
>
> Für Bauträger, Projektentwickler, Wohnungsunternehmen und Planungsbüros, vom ersten Plan bis zur Abnahme. *(seit Überarbeitung 2 in Fließtextgröße, 18 px, auf 1440 zweizeilig)*
>
> **CTA:** Bauüberwachung anfragen (In unter 2 Min.) · *Kontur:* Referenzliste ansehen
>
> *Überarbeitung 4:* Der Hero füllt auf dem Desktop den ersten Bildschirm allein, das Bauherren-Band folgt direkt beim Scrollen. Plakette und Kicker stehen oben mit Luft darunter, der Claim ist der Blickfang, der Unterclaim ruhiger (Textgrau).
>
> *Kennzahlen (zählen beim Laden hoch, gemeinsames Ende):* über 30 · Jahre in der Branche / 450 · Wohneinheiten für die HOWOGE

**Referenz-Stapel rechts (Überarbeitung 4)**, je Karte Plankopf mit Foto
(Altseite 4.html, nativ oder kleiner), Referenz, Bauherr, Umfang, Leistung
(Leistung je Bauherr wie im Register, Referenzliste.pdf):

| # | Referenz | Bauherr | Umfang | Leistung |
|---|---|---|---|---|
| 1 | Königswinterstr./ Andernacher Str./ Ehrenfelsstraße, Berlin | HOWOGE mbH | Komplexe Altbausanierung, 85 WE | Bauüberwachung, Qualitätscontrolling |
| 2 | Loisenstraße 10, Dresden | Argentum GmbH & Co. KG | Komplexe Altbausanierung, 24 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung |
| 3 | Augustusweg 114, Radebeul | Argentum GmbH & Co. KG | Komplexe Altbausanierung, 10 WE (Einzeldenkmal) | wie 2 |
| 4 | Bundschuhstraße 1, Dresden | Argentum GmbH & Co. KG | Komplexe Altbausanierung, 22 WE (Einzeldenkmal) | wie 2 |

Steuerung: „Vorherige Referenz" / „Nächste Referenz", Zähler „1 / 4",
kein Pause-Knopf (Überarbeitung 5, Wunsch Bruno). Ansage für
Screenreader: „Referenz 2 von 4: Loisenstraße 10, Dresden". Das Feld
„Bearbeitung René Gansmüller" der früheren Einzelkarte entfällt (Höhe).
Karte 4 ergänzt (nicht in Brunos Liste): Mit genau drei Karten zählt der
Stapel als dritte Dreiergruppe der Seite (§7); Bundschuhstraße ist voll
belegt und hat ein eigenes Foto.

[„Partner" steht auf der Verbotsliste der Branchendatei; bewusste
Entscheidung von Bruno („ok, Partner statt Bauingenieur") · Region: Büro
Berlin (Impressum), Objekte in Berlin, Strausberg (Brandenburg), Dresden,
Radebeul, Coswig, Kreischa (Sachsen) laut Referenzliste · Zielgruppen:
DEMO-SPEC · „über 30" steht zusätzlich unter „Über mich" (Wunsch Bruno)]

---

## 2 · Für wen ich arbeite  `#fuer-wen`

**Stand Überarbeitung 3 (gilt):** Zwei Spalten nebeneinander, je Weg ein
großer Gruppenkopf (H3) mit Satz, darunter die Rollen als Tabs (kein Link).
Hover, Fokus oder Klick auf eine Rolle zeigt darunter in derselben Spalte
Rolle und Beschreibung. Darunter, über beide Spalten zentriert, **ein**
CTA **„Projekt prüfen lassen"** mit „In unter 2 Min."; sein Ziel folgt der
zuletzt gewählten Rolle (`?auftraggeber=<rolle>#anfrage`, Standard
Bauträger; Bruno: „Zwei Buttons sind auf jeden Fall zu viel"). Vorausgewählt:
Bauträger bzw. Architektur- und Planungsbüros. Mobil untereinander, der
Button unter beiden Gruppen.

*Vorher (Überarbeitung 2, ersetzt):* Profil-Wähler statt Kartenraster.
Die Rollen stehen als typografische Liste mit Profilsatz, **ohne Link in
den Funnel** (Bruno: „da ist noch kein Intent da"). Ab 900 px zeigt rechts,
vertikal mittig, die Rolle groß und darunter der Satz in 20 bis 22 px
(Wiederholung, aria-hidden); die Rollen sind dort per Tastatur erreichbar.
Der Einleitungssatz unter der H2 ist entfernt. Gruppenköpfe klein
(Kicker), Gruppensatz 15 px.

> ## Für wen ich arbeite

**Gruppe hell**

> ### Sie bauen selbst
> Sie sind Bauherr und brauchen jemanden auf Ihrer Seite, beauftragt für ein Objekt.
>
> - *Bauträger:* Sie bauen für den Verkauf, und Ihre eigene Bauleitung ist gerade ausgelastet.
> - *Projektentwickler:* Sie entwickeln ein Vorhaben und wollen schon in der Planung jemanden an Ihrer Seite, der vom Bau kommt.
> - *Wohnungsunternehmen:* Sie sanieren Ihren Bestand und brauchen für ein Haus jemanden, der die Baustelle für Sie im Blick hat.
> - *Gewerbliche Auftraggeber:* Sie bauen für Ihren eigenen Betrieb, und das Tagesgeschäft lässt keine Zeit für die Baustelle.
>

**Gruppe dunkel**

> ### Sie planen und brauchen die Bauüberwachung
> Die Planung bleibt bei Ihnen, die Ausführung messe ich an Ihren Plänen.
>
> - *Architektur- und Planungsbüros:* Sie haben geplant, und für die Bauüberwachung fehlt im Büro gerade die Kapazität.
> - *Generalplaner:* Sie verantworten die gesamte Planung und geben die Bauüberwachung für ein Objekt ab.


**Projektrahmen**

> ### Projektrahmen *(je Punkt grüner Haken bzw. rotes Kreuz, dazu unsichtbar „Passt gut:" / „Passt weniger:")*
> **Passt gut**
> - **Vorhaben bis etwa 15 Mio. € Bauvolumen.** In dieser Größe bleibt ein Projekt überschaubar, und ich behalte Ihres selbst im Blick.
> - **Ein konkretes Objekt.** Sie beauftragen mich für dieses eine Vorhaben, und mit dem Objekt endet auch Ihre Verpflichtung.
>
> **Passt weniger**
> - **Reine private Eigenheime.** Meine Arbeit richtet sich an Bauträger, Unternehmen und Planungsbüros.
> - **Großbaustellen im Bereich von 50 bis 100 Mio. €.** Solche Projekte brauchen ein ganzes Bauleitungsteam; bei mir haben Sie mich selbst als Ansprechpartner.

[Zielgruppen: DEMO-SPEC, Transkript · Profilsätze beschreiben die Lage des
Lesers, keine Tatsachen über den Betrieb · „eigene Bauleitung ausgelastet":
Lage des Lesers (website-copy Stufe 2), aus dem bisher freigegebenen Text · Obergrenze „maximal 10
oder 15 Millionen", keine „private Eigenheimbauer", keine Baustellen „50, 100
Millionen" und keine großen Baufirmen (Name nicht genannt): Transkript ·
objektbezogen: Transkript · **keine Untergrenze** (nicht belegt) · Ton nach
§8: sachlich, keine Ablehnungs-Rhetorik]

---

## 3 · Leistungen  `#leistungen`

**Stand 2026-09-29:** Kacheln nach Brunos Beispielbild. Zwei große randlose
Kacheln (Nummer, Titel, 1 bis 2 Zeilen, CTA), darunter Aufgaben und Vergabe
als Schlagworte, zwei kleine Kacheln, Partnerzeile.

> *Kicker:* Leistungen
>
> ## Projektsteuerung und Bauüberwachung

[Untertext „Das ist mein Metier …" seit Überarbeitung 4 entfernt (Bruno)]

**Fotos (Überarbeitung 2):** Unsplash-Symbolbilder, je Kachel oben rechts
„Symbolbild"; der frühere Demo-Hinweis über den Kacheln ist entfallen.

> **01 · Projektsteuerung** (H3)
> Schon in der Planungsphase ein Bauingenieur auf Ihrer Seite, der Ihre Interessen gegenüber dem Generalunternehmer vertritt, bis gebaut ist.
> **CTA:** Projektsteuerung anfragen

> **02 · Bauüberwachung** (H3), *Kicker:* HOAI Leistungsphase 8
> Während gebaut wird, überwache ich die Baustelle in Ihrem Auftrag: Ausführung, Termine und Kosten, bevor Sie zahlen.
> **CTA:** Bauüberwachung anfragen

**Unter den Kacheln (Überarbeitung 3), zwei Spalten bündig mit den Kacheln:**

> *Links, Label „Mit Planung":* Brauchen Sie auch die Planung, decke ich gemeinsam mit Partnern alle Leistungsphasen ab: Planer, Architekt, Statiker und Brandschutzexperte arbeiten dann an Ihrem Vorhaben mit. **Textlink:** Vorhaben mit Planung anfragen · In unter 2 Min.
>
> *Rechts, Label „Dazu gehört":* Ausführung nach Plan und Regeln der Technik prüfen · Gewerke und Handwerker koordinieren · Termine und Kosten überwachen · Aufmaß und Rechnungen prüfen, bevor Sie zahlen
> *kleine Zeile:* Auf Wunsch auch die Vergabe vorher und die Gewährleistungsabnahme danach.

[Gekürzt aus der bisherigen Aufgabenliste und dem Vergabe-Absatz (Scrape,
Leistungsseite); die Partnerzeile ist in die linke Spalte gewandert; die
Details der Vergabe stehen im Ablauf, Station 05]

**Demo-Hinweis über 03/04, einzeilig. 03/04 seit dem Nachtrag vom 2026-09-29 als kleinere Bildkacheln (Symbolbild, Textlink hell, „In unter 2 Min."), deutlich abgesetzt; Haken unter „Dazu gehört" grün:**

> **Demo-Stand:** Baubetreuung stammt aus dem Vorgespräch, der Text ist ein Entwurf.

> **03 · Baubetreuung** (H3) Ich vertrete Ihr Vorhaben gegenüber Behörden und Baufirmen und halte die Abstimmungen für Sie zusammen. *Textlink:* Baubetreuung anfragen
>
> **04 · Bauberatung** (H3) Bei Sanierung und Modernisierung ermittle ich den Zustand der Bausubstanz und schätze die Kosten, bevor Sie planen oder ausschreiben. *Textlink:* Bauberatung anfragen

> *Partnerzeile (entfallen, Text jetzt links unter der Projektsteuerungs-Kachel):* Brauchen Sie auch die Planung, decke ich gemeinsam mit Partnern alle Leistungsphasen ab. Dann arbeiten Planer, Architekt, Statiker und Brandschutzexperte an Ihrem Vorhaben mit. **CTA:** Vorhaben mit Planung anfragen

[Leistungen, Aufgaben, Vergabe: Scrape (Leistungsseite) · Projektsteuerung
ab Planungsphase, GU/GÜ: Transkript · Baubetreuung: Transkript, Text Entwurf
· Fotos: Unsplash-Symbolbilder, Herkunft, Apify-Läufe und Bearbeitung in
`quellen/bilder-unsplash.md`]

---

## 4 + 5 · Referenzen  `#referenzen`

### Bauherren-Band (direkt unter dem Hero, seit 2026-09-29)

Eigene Sektion zwischen Hero und „Für wen", randlos laufendes Band. Kicker
und H2 „Aus meiner Referenzliste" stehen seitdem am Kopf der Referenzen.

**Demo-Hinweis direkt über dem Band (dritte Person):**

> (entfernt am 29.09.2026 auf Anweisung von Bruno; Nennungsfreigabe bleibt offener Punkt für den Termin)

[Stand 2026-09-29, zweite Fassung: Herkunft der vier gelieferten Logos
ergänzt, auf dem Desktop einzeilig.]

> *H2 als Label:* Bauherren aus meiner Referenzliste
>
> HOWOGE mbH (Logo) · Argentum GmbH & Co. KG (Logo) · Ortus GmbH & Co. KG (Wortmarke) · BauBeCon Wohnen GmbH (Logo) · GVC mbH (Logo) · Kaufland Ladenbau GmbH (Logo)

[Namen und Alt-Texte exakt nach PDF, Spalte „Bauherr", auch wo das Logo
anders lautet (GCV, BauBeCon Facility Management, Kaufland-Handelsmarke):
die Abweichungen stehen in `quellen/logos.md` und werden im Termin geklärt ·
Alt-Texte in den drei Kopien leer (aria-hidden) · Knopf „Band anhalten“
auf Brunos Wunsch entfernt, Pause bei Hover bleibt]

### Kopf der Referenzen

> *Kicker (p):* Referenzen
>
> ## Aus meiner Referenzliste

### Logo-Leiste rechts neben der Überschrift (Überarbeitung 4)

> *Label:* Auftraggeber aus meiner Referenzliste
>
> Logos in Originalfarben: HOWOGE mbH · Argentum GmbH & Co. KG · BauBeCon Wohnen GmbH · GVC mbH · Kaufland Ladenbau GmbH · Ortus GmbH & Co. KG (Wortmarke)

[Alt-Texte exakt wie Referenzliste · „Auftraggeber" statt Brunos „Meine
Partner", weil „Partner" auf der Seite für Planer, Architekt, Statik,
Brandschutz steht · Der Einleitungssatz „Seit über 30 Jahren …" ist seit
Überarbeitung 4 entfernt (Bruno)]

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

**Stand Überarbeitung 2:** eine unauffällige Zeile unter dem Register.

> **Demo-Stand:** Industrie, Arztpraxen und Krankenhäuser nennt René Gansmüller selbst; Beispiele dazu stehen im Projekt hier.
>
> PROJEKTBEREICHE Wohnungsbau · Gewerbe · Industrie · Arztpraxen · Krankenhäuser

[Bereiche: Transkript · Wohnungsbau und Gewerbe durch die Referenzliste
belegt · für Industrie, Arztpraxen und Krankenhäuser keine Objekte behauptet]

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

**Stand 2026-09-29 (Bruno):** Expertise zuerst, dann der Mehrwert direkter
Ansprechpartner. Nicht „Mein Büro ist klein".

> *Kicker:* Über mich
>
> ## René Gansmüller, Bauingenieur
>
> Ich bin seit über 30 Jahren in der Branche, als Diplom-Ingenieur (FH) für Bauwesen. Seit 2007 arbeite ich von Berlin aus, davor lag mein Wirkungskreis im Raum Dresden. Einige Auftraggeber begleite ich seit 20 bis 30 Jahren, von Projekt zu Projekt.
>
> Ihr Ansprechpartner bin ich selbst, vom ersten Gespräch bis zur Abnahme. Die Zusammenarbeit läuft dabei immer direkt und auf Augenhöhe. Wenn Sie anrufen, haben Sie mich am Telefon.

**Steckbrief:** Abschluss: Dipl.-Ing. (FH) Bauwesen · Büro: Schwedenstraße 13, 13357 Berlin, Link „In Google Maps öffnen" (neuer Tab) · In Berlin: seit 2007, vorher Raum Dresden · Direkt erreichbar: 030/ 69 520 364, mobil 0173/ 57 31 045

**Demo-Hinweis über dem Porträt (unverändert):** Foto von der bisherigen Website, wird durch ein aktuelles Porträt ersetzt.

[über 30 Jahre, Stammkunden 20 bis 30 Jahre: Transkript · Absatz
„Ihr Ansprechpartner …, direkt und auf Augenhöhe": Vorgabe Bruno
2026-09-29, der Mitarbeiter-Satz ist entfernt · Dipl.-Ing. (FH) Bauwesen: Impressum · Berlin seit 2007,
zuvor Raum Dresden: Scrape · Adresse: Impressum, Google-Eintrag (geprüft) ·
Maps-Link: Profil-URL aus `quellen/scrape-google.md`, kopiert]

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
Liste: CTA und darunter der Mikro-Claim „In unter 2 Min." (Aussage Bruno,
2026-09-29; die Telefonnummer steht dort nicht mehr). Stationstexte unverändert.

**Stand 2026-09-29:** Die Phasen sind deutlich getrennt: „Bevor es losgeht"
mit gestrichelter Fläche, Linie und Ziffern, „Am Bau" getönt und
durchgezogen; das Detailfeld nennt die Phase. Autoplay: Die Linie füllt sich
in 6,5 bis 9 s (nach Textlänge) bis zur nächsten Station, dann wechselt das
Detailfeld, nach 07 wieder 01. Start erst im Bild, Pause bei Hover und
Fokus, nach einer Auswahl von Hand 15 s Ruhe; bei reduzierter Bewegung kein
Autoplay. **Überarbeitung 2:** Schalter entfernt (Bruno), keine
Strichelungen mehr: Linie in zwei Farbabschnitten, Phasen-Labels mit feiner
Klammer, Ring- vs. gefüllte Punkte, „Am Bau" auf getönter Fläche ohne
Rahmen; Detailfeld ohne Rahmen und Schatten. **Überarbeitung 3:** Autoplay
startet ab 20 % Sichtbarkeit; Pause nur bei Maus über Zeitstrahl oder
Detailfeld und bei Tastaturfokus in der Tab-Liste. Ein per Maus
angeklickter Tab hält es nicht mehr dauerhaft an (das war der Hänger).

**Demo-Hinweis direkt über Station 1:**

> **Demo-Stand:** Die Stationen 1 bis 3 sind ein Entwurf für die Demo; dass die Beauftragung je Objekt erfolgt, stammt aus dem Vorgespräch. Die Stationen 4 bis 7 folgen dem Leistungsangebot der bisherigen Website. Im Projekt legt René Gansmüller den Einstieg so fest, wie er tatsächlich arbeitet.

> **1 · Anfrage** (H3)
> Sie beantworten ein paar kurze Fragen und hinterlassen Ihre Kontaktdaten.

[„ein paar" statt „zwei": Die Zahl der Fragen hängt seit Überarbeitung 4 vom Weg ab]
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

[„unverbindlich prüfen": Briefing · Der Text unter der Überschrift ist seit
2026-09-29 entfernt (Bruno)]

**Kopfzeile des Kastens:** Projektanfrage · Schritt 1 von 4 (ohne Vorauswahl)

**Weg je Einstieg (Überarbeitung 4):** Was über einen Button feststeht, wird
übersprungen und steht als Chip über dem Formular. „ändern" holt den Schritt
zurück in den Weg, die Schrittanzeige zählt mit.

| Einstieg | Weg | Anzeige |
|---|---|---|
| direkt (gescrollt, Header, Ablauf, Footer) | Leistung · Wer fragt an? · Bauvolumen · Kontakt | Schritt 1 von 4 |
| `?leistung=` (Leistungs-Buttons, Hero) | Wer fragt an? · Bauvolumen · Kontakt | Schritt 1 von 3 |
| `?auftraggeber=` (Für wen) | Leistung · Bauvolumen · Kontakt | Schritt 1 von 3 |
| beides | Bauvolumen · Kontakt | Schritt 1 von 2 |

> Leistung: **Bauüberwachung** · ändern
> Anfrage als: **Bauträger** · ändern

Werte für `?leistung=`: `projektsteuerung` → Projektsteuerung ·
`bauueberwachung` → Bauüberwachung · `baubetreuung` → Baubetreuung ·
`bauberatung` → Bauberatung · `alle-leistungsphasen` → Vorhaben mit Planung.

### Leistung (Pflicht, Tap; nur ohne Vorauswahl)

> **Welche Leistung brauchen Sie?** *
>
> ◯ Projektsteuerung · ◯ Bauüberwachung · ◯ Baubetreuung · ◯ Bauberatung · ◯ Vorhaben mit Planung · ◯ Noch offen

[Bruno, Überarbeitung 4. Abweichung von docs/FUNNEL.md (max. 2
Pflichtfragen): Der Leistungsschritt ist ausdrücklich gewünscht und entfällt
bei jedem Einstieg über einen Leistungs-Button]

### Wer fragt an? (Pflicht, Tap; entfällt bei `?auftraggeber=`)

> **Wer fragt an?** *
>
> ◯ Bauträger · ◯ Projektentwickler · ◯ Wohnungsunternehmen · ◯ Gewerblicher Auftraggeber · ◯ Architektur- oder Planungsbüro · ◯ Generalplaner · ◯ Privates Eigenheim

**Hinweis bei Auswahl „Privates Eigenheim"** (erscheint unter den Optionen,
Absenden bleibt möglich, Anfrage wird markiert):

> Gut zu wissen: Ich arbeite vor allem für gewerbliche Bauherren und Planungsbüros. Schicken Sie Ihre Anfrage gern ab, ich sehe sie mir an.

[Optionen: Spec, Wohnungsunternehmen ergänzt (Bruno, Station 1; ohne die
Option kann der Link aus „Für wen" Schritt 1 nicht vorbelegen, siehe offene
Punkte) · Verhalten: Bruno, Nachtrag „Privates Eigenheim"]

### Bauvolumen (Pflicht, Tap)

> **Wie groß ist das Bauvolumen ungefähr?** *
>
> ◯ unter 1 Mio. € · ◯ 1–5 Mio. € · ◯ 5–15 Mio. € · ◯ über 15 Mio. € · ◯ noch offen · ◯ Selbst eintragen
>
> *Bei „Selbst eintragen" erscheint:* Bauvolumen in Euro · Platzhalter: z. B. 2.500.000 · Fehlermeldung: „Bitte tragen Sie einen Betrag in Euro ein, gern auch grob geschätzt."

**Hinweis bei Auswahl „über 15 Mio. €" oder eingetragenem Betrag über
15 Mio. €** (Absenden bleibt möglich, Anfrage wird markiert):

> Das liegt über meinem üblichen Rahmen. Senden Sie Ihre Anfrage ruhig ab, dann klärt sich im Gespräch, wo ich Ihr Vorhaben unterstützen kann.

[Stufen: Bruno, delegierte Entscheidung · Verhalten: Spec · „Rahmen" greift
das Wort aus „Für wen" auf, ohne die Zahl zu wiederholen]

### Kontakt (Pflicht, immer letzter Schritt)

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

Navigation: **Weiter** (bis vor Kontakt), **Zurück** (ab dem zweiten Schritt
des jeweiligen Wegs; übersprungene Schritte über „ändern" am Chip),
**Anfrage absenden** (Kontakt).
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

**Mikro-Claim (Bruno, 2026-09-29):** Unter jedem CTA zum Formular steht klein
„In unter 2 Min." (Hero, beide Leistungskacheln, Baubetreuung, Bauberatung,
Partnerzeile, Referenzen, Ablauf, Footer). Ausgenommen: Header (kein Platz)
und „Anfrage absenden" im Formular selbst.

| Ziel | Label | Wo | Ziel-URL |
|---|---|---|---|
| Hauptziel Anfrage | **Projekt unverbindlich prüfen lassen** | Ablauf (neben dem Detailfeld), Footer (Header: Kurzfassung **Projekt prüfen lassen**) | `#anfrage` |
| Bauüberwachung | **Bauüberwachung anfragen** | Hero, Leistungen | `?leistung=bauueberwachung#anfrage` |
| Projektsteuerung | **Projektsteuerung anfragen** | Leistungen | `?leistung=projektsteuerung#anfrage` |
| Baubetreuung | **Baubetreuung anfragen** | Leistungen | `?leistung=baubetreuung#anfrage` |
| Bauberatung | **Bauberatung anfragen** | Leistungen | `?leistung=bauberatung#anfrage` |
| Planung mit Partnern | **Vorhaben mit Planung anfragen** (Textlink) | Leistungen, Partnerzeile | `?leistung=alle-leistungsphasen#anfrage` |
| Zielgruppe | entfallen (Profil-Wähler ohne Link, Bruno); Parameter `?auftraggeber=` funktioniert weiter | – | – |
| Referenzen | Referenzliste ansehen (Textlink) | Hero (Vorschlag) | `#referenzen` |
| Hauptziel aus den Referenzen | **Ähnliches Vorhaben? Projekt prüfen lassen** | unter den Referenzen | `#anfrage` |
| Register | Alle 20 Objekte anzeigen · Weniger anzeigen | Referenzen | – (klappt auf) |
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
