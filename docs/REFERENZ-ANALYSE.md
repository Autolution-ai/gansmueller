# REFERENZ-ANALYSE: maler-heusser.de

**Nicht deployen.** Grundlage für die Stil-Übernahme in die Demo Gansmüller.
Auftrag: Bruno, 28.09.2026 (`quellen/gespraech-2026-09-27-bruno.md`, letzter
Nachtrag). Referenz: `https://www.maler-heusser.de/` plus zwei Unterseiten aus
deren eigener Linkliste (`/gewerbekunden`, `/leistungen/fassadenanstrich`).

**Messweg:** Direktzugriff und Playwright lokal scheiterten am Egress-Proxy
(403). Gemessen über Apify (`apify/web-fetch`, 2 Läufe `apify/playwright-scraper`
mit Residential-Proxy DE): Computed Styles, `document.fonts`, CSS-Regeln,
Hover-Zustände vorher/nachher, Opazität/Transform vor und nach dem Scrollen,
`document.getAnimations()`, Scan von JS- und CSS-Bundle. Screenshots lokal in
`.referenz/` (nicht im Repo). Alle Zahlen unten sind Messwerte bei 1440 px,
sofern nicht anders angegeben.

---

## 0. Was die Referenz technisch ist

Kein Baukasten (kein WordPress, Wix, Jimdo, Webflow). Eine React-App (Vite-Build,
ein Bundle `assets/index-*.js`, 822 KB) mit **Tailwind + shadcn/ui** (Radix,
Sonner, Lucide-Icons, react-helmet-async, Prerender). Die Design-Tokens sind das
shadcn-Themen-Schema samt ungenutzter Standardvariablen (`--sidebar-*`,
`--chart-1…5`). Das Theme ist ein „Neo-Brutalism“-Preset: `--shadow: 5px 5px 0 0
hsl(220 15% 15%)`, Schatten-Skala 1/2/3/5/8/12/16/24 px, alle ohne Unschärfe,
`--font-sans: Space Grotesk`, `--font-mono: Space Mono`, `--font-serif: Lora`
(Mono und Serif geladen, aber nicht verwendet). Das ist das Muster, das
AI-App-Builder (Lovable, Bolt, v0) standardmäßig erzeugen; ein bestimmter
Builder ist im Code nicht belegt (keine Lovable-Marker im HTML).

Folge für uns: Der Stil ist **übernehmbar, weil er aus wenigen Regeln besteht**.
Er ist aber auch verbreitet. Übernommen wird deshalb das System, nicht das
Aussehen im Detail.

---

## 1. Aufbau

**Startseite, 8.792 px hoch (1440), Mobil 13.177 px (390).**

| # | Sektion | Muster | Breite / Fläche |
|---|---|---|---|
| 0 | Header | fix, 82 px, weiß, **2 px Unterkante in Textfarbe**. Logo · 6 Menüpunkte Versal · DE/EN · Kontur-Button „Gewerbekunden“ · Telefon · roter Button „Jetzt anfragen“ | 1400 px Container |
| 1 | Hero | Zweispalter 50/50: links Google-Badge (4.87/5 · 74), roter Kicker, H1 mit rot hervorgehobenem Wortteil plus 4-px-Balken darunter, Lead, 2 Buttons, Trennlinie, 3 Kennzahlen (rot, 36 px); rechts **echtes Teamfoto** 4:3, Radius 24 px, **Hartschatten 12/12** | min-height 100vh |
| 2 | Leistungen | Kicker + H2 48 px + Lead links, darunter **7 Bildkarten im 2er-Raster** (Foto 670×419 oben, Titel, 2 Zeilen, Pill-Button). Die 7. Karte steht allein, rechts bleibt ein Loch | 1368 px |
| 3 | SEO-Textblock | H2 30 px + 3 Absätze + 2 Pfeil-Links, nur linke Hälfte, rechts leer | Text 768 px |
| 4 | Warum wir | **abgesetztes Panel**: Fläche `#f4f4f6`, Radius 40 px, 16 px Abstand zum Rand. Links H2 + Text + 2 Textkarten, rechts 3×2 Icon-Kacheln | 1408 px |
| 5 | Preise | gleiches Panel, 3 FAQ-Karten nebeneinander + Kontur-Button zum Kostenrechner | 1408 px |
| 6 | Kundenstimmen | H2 + Sternzeile, Karussell mit Pfeilknöpfen (rund, 48 px), Karten mit **Hartschatten 3/3** | 1400 px, läuft rechts aus dem Raster |
| 7 | Kontakt | links H2 + 3 Kontaktzeilen mit roten Icon-Quadraten, rechts **Formular-Karte mit Hartschatten 8/8**, Radius 16 px | 1400 px |
| 8 | Footer | einzige dunkle Fläche (`#21242c`), 3 Spalten, dann Bezirks-Linkwolke, Geschäftsstellen | voll |

Dazu dauerhaft: schwebender Button „Kostenvoranschlag“ unten mittig (rot,
schräg angeschnittene Kante), WhatsApp-Knopf unten rechts, Cookie-Leiste.

**Rhythmus:** fast durchgehend hell (`#fcfcfc` Grund, `#f4f4f6` Panels, weiße
Karten). Dunkel nur im Footer. Kontrast entsteht nicht über Hell/Dunkel-Wechsel,
sondern über **schwarze Linien und harte Schatten**. Sektionsabstand 128 px
oben und unten (`py-32`).

**CTA-Sprache:** Versal, imperativ, kurz: „Jetzt anfragen“, „Unsere Leistungen“,
„Mehr erfahren“, „Angebot anfordern“, „Anfrage absenden“. Primär rot gefüllt,
sekundär Kontur.

**Gewerbekunden-Seite (B2B-Muster, für uns am nächsten):** Hero ohne Foto in
einem abgesetzten Panel (Radius 40 px), Badge, Kicker „Für Unternehmen &
Hausverwaltungen“, H1, Lead, Primär-Button + Telefon-Pill. Dann 2×2
Zielgruppenkarten mit Icon und Hartschatten, ein Panel mit 8-Punkte-Liste
(rote Häkchen), **Ablauf in 4 nummerierten Karten** (rote Ziffer 01–04, Icon,
Titel, Text). Leistungsseite: H1, Vorteile, Leistungen im Detail, Stimmen,
Kontakt – gleiches Sektionsvokabular.

**Schwächen, die wir nicht übernehmen:** 1400-px-Container lässt bei 1920 px
**260 px je Seite leer** (Screenshot `home-1920-01-hero.jpg`, über unserer
200-px-Grenze). Ungerade Kartenzahl mit Loch (Leistung 7). SEO-Block halbseitig
mit leerer rechter Hälfte. 3×2-Icon-Kacheln und 3 Kennzahlen sind genau das
Kachelraster, das CLAUDE.md §7 verbietet.

---

## 2. Gestaltung

### Typografie

Eine einzige Familie: **Space Grotesk** (400/500/600/700), überall.

| Rolle | Größe / Zeilenhöhe | Gewicht | Sonstiges |
|---|---|---|---|
| H1 | 60/60 px (1440 und 1920), 36/45 px mobil | 700 | Zeilenhöhe 1,0, Laufweite normal, Satzbreite 660 px |
| H2 groß | 48/48 px | 700 | Zeilenhöhe 1,0, max. ca. 650 px breit (3 Zeilen) |
| H2 klein | 30/36 px | 700 | für Nebensektionen |
| H3 Karte | 24/32 px | 700 | |
| H3 Kachel | 16–18 px | 700 | |
| Kicker | 14/20 px | 600 | **Versal, Laufweite 0,1 em, rot** |
| Nav, Buttons | 14/20 px (Formular-Button 16) | 600 | Versal, Laufweite 0,025 em |
| Lead | 20/28 px | 400 | grau `#676f7e` |
| Fließtext | 14–16 px, Zeilenhöhe 1,5–1,6 | 400 | grau |
| Kennzahl | 36/40 px | 700 | rot |

Typo-Spannweite H1 ÷ Fließtext: 60 ÷ 16 = 3,75. Hierarchie entsteht aus
**Größe + Gewicht 700 + Zeilenhöhe 1,0**, nicht aus Schriftwechsel. Fließtext
ist fast durchgehend grau, nur Überschriften und Labels sind schwarz.

### Farbe (nur Rollen)

| Rolle | Einsatz |
|---|---|
| Grund | nahezu weiß (99 % L), Karten reinweiß |
| Panel | ein Hauch dunkler, als abgesetzte, stark gerundete Fläche |
| Text / Linie / Schatten | **ein** sehr dunkles Blaugrau für Schrift, 2-px-Linien und alle Hartschatten |
| Fließtext | mittleres Grau |
| Akzent | **eine** gesättigte Farbe (hier Rot) für Primär-Button, Kicker, H1-Hervorhebung, Kennzahlen, Icons, Hover der Nav |
| Dunkel | nur Footer |

Messung nach Fläche: 90 % hell, 5 % dunkel (Footer), Akzent < 1 %. Der Akzent
wirkt, weil er selten ist.

### Buttons

| Typ | Form | Zustand |
|---|---|---|
| Primär | Rechteck, **Radius 0**, rot, 2 px Rand, **Hartschatten in Textfarbe**, Versal 14–16 px/600, Höhe 44–56 px | Hover: `translateY(-4px)` |
| Sekundär (Hero) | **Pill** (Radius 9999), 2 px schwarze Kontur, weiß | Hover: füllt sich schwarz |
| Karten-Button | Pill, 2 px Kontur, 36 px hoch, Pfeil-Icon | Hover: schwarz gefüllt, Text weiß; Pfeil rückt 4 px |
| Header „Gewerbekunden“ | Rechteck, 2 px Kontur, Radius 0 | Hover: rot gefüllt |
| Nav-Link | Text | Hover: rot, 150 ms |

Mischung aus eckigem Primär-Button und runden Pills ist Absicht: eckig =
Abschluss, rund = Weiterblättern.

### Karten, Linien, Bilder

- **Hartschatten ohne Unschärfe** ist das Leitmotiv, in Stufen nach Gewicht:
  3/3 (Stimmen), 5/5 (Badge), 8/8 (Formular, Karten-Hover), 12/12 (Hero-Bild).
- Karten: Radius 16 px, 1 px heller Rand, weiß, Innenabstand 24 px (Bildkarten 0).
- Panels: Radius 40 px, 16 px vom Fensterrand eingerückt.
- Linien: Header-Unterkante 2 px schwarz; sonst 1 px hellgrau als Trenner
  (Hero-Kennzahlen, Footer).
- Bilder: echte Fotos (Team, Baustellen), `object-fit: cover`, Karten 16:10,
  Hero 4:3. Keine Filter, keine Überlagerungen, kein Text auf Bild.
- Icons: Lucide, Strich, rot, ca. 28 px; in Kontaktzeilen weiß auf rotem Quadrat.

### Raster und Weißraum

Container 1400 px, Seitenrand 16 px, Spaltenabstand 48 px (Hero), 24 px (Karten).
Textspalten 576–768 px. Viel Leerraum: 128 px je Sektionsseite, Hero mit
~120 px Luft über dem Inhalt.

---

## 3. Bewegung

Gemessen, nicht geschätzt:

- **Beim Laden:** nichts. `document.getAnimations()` leer, keine Einblendung.
- **Beim Scrollen:** nichts. Kein Element unterhalb der Falz hatte Opazität < 1
  oder einen Transform (ein einziger Treffer: deaktivierter Karussell-Pfeil,
  0,3). Keine Reveals, kein Parallax, kein Pinning, kein Marquee. Header bleibt
  fix und unverändert (gleicher Hintergrund, kein Schatten, keine Höhenänderung
  über 20 Messpunkte). `scroll-behavior: auto`.
- **Libraries:** keine. Kein GSAP, Lenis, Framer Motion, AOS, Swiper, Embla im
  Bundle. Nur `tailwindcss-animate` für Radix-Menüs (Dropdown, Toasts).
- **Hover (die gesamte Bewegung der Seite):**
  - Leistungskarte: Hartschatten 0 → 8/8, Foto `scale(1.05)` in 500 ms.
  - Primär-Button: hebt sich 4 px.
  - Pills: Kontur → schwarze Fläche; Pfeil 4 px nach rechts.
  - Nav: Schrift → Akzentfarbe, 150 ms.
  - Stimmen-Karussell: per Pfeilknopf, nicht automatisch.

Kern: **Die Seite bewegt sich nur, wenn man sie anfasst.** Das passt zu
CLAUDE.md §5 (Zurückhaltung) und zu Brunos Kritik „langweilige Buttons“: Die
Energie steckt in den Zuständen, nicht in Scroll-Effekten.

---

## 4. Übertragung auf Gansmüller

Randbedingungen: B2B-Ingenieurbüro, eine Person plus Mitarbeiter; **keine
hochwertigen aktuellen Fotos** (Referenzfotos von 2008, Porträt 18 Jahre alt);
CI bleibt Logo-Blau / Blaugrau / Malve (`site/css/tokens.css`); Inhalte und
Belege bleiben unsere (§3). Beobachtung vorab: Unsere Demo nutzt harte
Versatzschatten bereits (Buttons 6/6, Karten-Hover, Funnel 10/10). Der
Unterschied liegt in Radius, Schrift, Flächenlogik und Konsequenz.

### 4.1 Übernehmen als Stilprinzip (1:1)

1. **Hartschatten als einziges Tiefenmittel**, in einer festen Stufenleiter
   (3 / 5 / 8 / 12 px) nach Gewicht des Elements, immer in `--color-text`, nie
   weich. Größter Schatten am wichtigsten Objekt (bei uns: Funnel und
   Hero-Plankopf).
2. **Ein Akzent, selten eingesetzt:** `--color-primary-strong` nur für
   Primär-Button, Kicker, hervorgehobenes H1-Wort, Kennzahlen, Icons, Nav-Hover.
   Fließtext grau (`--color-text-muted`), Überschriften dunkel.
3. **H1 mit hervorgehobenem Wortteil plus Balken** darunter (4 px,
   Akzentfarbe). Bei uns: „Gebaut wird, was **geplant ist.**“
4. **Kicker in Versal, gesperrt, Akzentfarbe** über jeder H2. Bei uns bleibt es
   Martian Mono (siehe 4.4).
5. **Zwei Button-Formen:** Primär eckig, gefüllt, mit Hartschatten, Hover hebt
   an. Sekundär/weiterführend als Kontur, Hover füllt sich dunkel, Pfeil rückt.
   Das ersetzt nicht das freigegebene „Maßlinie“-Konzept, sondern fasst es:
   Maßlinie bleibt als Detail am Primär-Button.
6. **Header:** fix, hell, 2 px Unterkante in Textfarbe, rechts Telefon +
   Kontur-Button + Primär-Button.
7. **Abgesetzte Panels** für ruhige Zwischensektionen (Über mich, Ablauf):
   Fläche `--color-surface`, 16 px vom Rand eingerückt.
8. **Bewegung nur auf Hover und Fokus.** Keine Scroll-Reveals nötig; Lenis und
   GSAP bleiben für einen einzigen inszenierten Moment (Hero) optional.
9. **Formular als Karte mit größtem Hartschatten**, Felder 2-spaltig, Labels
   fett über dem Feld, Absenden-Button volle Breite.
10. **Ablauf als Karten mit großer Akzentziffer** (01–07): bei uns belegt
    sequenziell (STRUKTUR.md §7 erlaubt Nummern), also zulässig.

### 4.2 Anpassen

| Referenz | Gansmüller | Grund |
|---|---|---|
| Radius 16 / 24 / 40 px, Pills | **Radius klein halten** (Karten 4–6 px, Panels max. 12 px), Kontur-Buttons eckig statt Pill | Bildmarke rechtwinklig, Gewerk Planung/Bau; `--radius: 2px` ist aus der CI hergeleitet. Weiche Pills wirken am Ingenieurbüro verspielt |
| Rot als Akzent | `--color-primary-strong` (Logo-Blau), Malve als Fläche (Panels, Markierung) | §6: CI ist Fundstück |
| Hero rechts großes Teamfoto | Hero C „Plankopf“ bleibt, Plankopf-Karte bekommt den 12/12-Hartschatten an Stelle des Fotos | kein aktuelles Foto (§6 Asset-Inventar) |
| Leistungen als Bildkarten 2er-Raster | 2 große Textkarten (Projektsteuerung, Bauüberwachung) mit Hartschatten-Hover, 2 Zeilen darunter (wie freigegeben) | keine Leistungsfotos; Gewichtung laut DEMO-SPEC |
| Google-Badge im Hero | Badge-Form übernehmen, Inhalt: belegter Fakt (z. B. „Über 30 Jahre in der Branche“) oder Bauherren-Zeile | Bewertung nur bei verifiziertem Eintrag (§5, `quellen/scrape-google.md` prüfen) |
| 3 Kennzahlen im Hero | höchstens 2 oder 4, nur belegte | §7 Dreiergruppen, §3 |
| Kundenstimmen-Karussell | Bauherren-Streifen + Referenzregister (freigegeben) mit 3/3-Hartschatten auf den hervorgehobenen Objekten | keine Stimmen belegt; keine erfundenen Zitate (§3) |
| Container 1400 px | `.breakout` / `.full` wie gehabt, Hartschatten-Elemente dürfen bis 1572 px | §7 Flächennutzung (Referenz verfehlt sie bei 1920) |
| Dunkel nur im Footer | Bauherren-Streifen bleibt dunkel und randlos | §7 randloses Element Pflicht, Zäsur |

### 4.3 Bewusst nicht übernehmen

- **3×2-Icon-Kacheln „Warum wir“** und **FAQ-Dreierreihe**: das Kachelraster,
  das §7 verbietet.
- **Schwebender „Kostenvoranschlag“-Button und WhatsApp-Knopf**: überdecken
  Inhalt (in jedem sektionsweisen Screenshot des zweiten Laufs über dem Inhalt),
  Header-CTA reicht (§9).
- **Kostenrechner, Preisangaben, Bezirks-Linkwolke, DE/EN**: Maler-B2C-SEO,
  kein Asset, kein Beleg; die Seite bleibt knapp („kein großes Schischi“).
- **SEO-Textblock mit leerer rechter Hälfte**, **ungerade Karte mit Loch**:
  tote Fläche (§7).
- **Foto-Zoom beim Hover** (`scale 1.05`): nur auf echten Referenzfotos, nicht
  auf Bildplätzen; die Fotos von 2008 sind klein und nicht hochzuskalieren.
- **Space Grotesk 1:1**: siehe 4.4.

### 4.4 Schrift

Die Referenz trägt ihren Charakter über **eine** Grotesk mit normaler Breite,
Gewicht 700, Zeilenhöhe 1,0. Unsere Anybody in **wdth 150** ist dagegen eine
breite Display-Schrift mit eigenem, lauterem Ton; im direkten Vergleich
(`.referenz/schriftvergleich-1440.png`, unsere H1 in sechs Varianten) passt sie
nicht zum ruhigen, kompakten Satzbild der Referenz. Anybody als Fließtext
(wdth 100) zeigt zudem eigenwillige Formen (r, u), die in Absätzen unruhig lesen.

**Empfehlung: Schibsted Grotesk (Display und Text) + Martian Mono (Kicker,
Labels, Daten, Buttons).**

- Schibsted Grotesk (OFL, `@fontsource-variable/schibsted-grotesk` 5.3.0,
  Achse wght 400–900): gleiche Proportion und Dichte wie Space Grotesk, aber
  kräftiger und sachlicher, ohne dessen Tech-Startup-Eigenheiten. Headline 800,
  Zeilenhöhe 1,0, Laufweite −0,01 em; Text 400.
- Martian Mono bleibt: übernimmt die Rolle der Versal-Labels der Referenz und
  hält den Bezug zur Beschriftung im Plankopf (freigegebenes Hero C).
- Eine Textfamilie wie in der Referenz, zwei Familien insgesamt.

**Alternativen:**
- *Anybody behalten, aber wdth 112 / wght 750* für H1–H2, Fließtext auf eine
  ruhigere Grotesk: geringste Änderung, bleibt näher an der Station-2-Freigabe.
- *Space Grotesk* (OFL, `@fontsource-variable/space-grotesk`): exakte Referenz,
  aber identisch mit dem shadcn-Neo-Brutalism-Standard; Risiko, dass Bruno
  wieder „Standard-Schrift“ sieht.
- Familjen Grotesk, Bricolage Grotesque: geprüft, beide verfügbar; Bricolage zu
  verspielt für B2B, Familjen zu schmal für die Headline-Wirkung.

Einbindung nach Skill `design-system` 2.6 (lokal unter `site/assets/fonts/`,
`npm pack`), Kontraste und Typo-Spannweite nach dem Wechsel neu messen.

---

## 5. Screenshots (`.referenz/`, nicht im Repo)

| Datei | Inhalt |
|---|---|
| `home-1440-01b-hero-ohne-banner.jpg` | Hero komplett (Badge, H1-Balken, Buttons, Kennzahlen, Hartschatten 12/12) |
| `home-1920-01-hero.jpg` | 1920: 260 px Leerrand je Seite |
| `home-390-01-hero.jpg` | Mobil-Hero |
| `home-1440-02-leistungen-kopf.jpg` bis `-05-…` | Leistungskarten, Loch bei Karte 7 |
| `home-1440-hover-leistungskarte.jpg` | Karten-Hover: Schatten 8/8 + Foto-Zoom |
| `home-1440-hover-button-mehr-erfahren.jpg` | Pill-Hover schwarz gefüllt |
| `home-1440-07-warum-uns.jpg`, `-07b-…` | Panel Radius 40, 3×2-Kacheln, Kachel-Hover |
| `home-1440-08-preise.jpg` | FAQ-Dreierreihe im Panel |
| `home-1440-09b-kundenstimmen.jpg` | Karussell, Schatten 3/3 |
| `home-1440-10b-kontakt-formular.jpg` | Formular-Karte 8/8, Icon-Quadrate |
| `home-1440-11-footer.jpg` | dunkler Footer |
| `home-1440-nav-dropdown.jpg` | Dropdown mit Hartschatten, 2 px Rand |
| `gewerbe-1440-01-hero.jpg` bis `-04-ablauf.jpg` | B2B-Seite: Panel-Hero, Zielgruppenkarten, Liste, Ablauf 01–04 |
| `schriftvergleich-1440.png` | unsere H1 in Referenzschrift, Ist-Stand und vier Kandidaten |

Kosten Apify: 1 × web-fetch, 3 × playwright-scraper (davon 1 Timeout),
zusammen rund 0,09 Compute Units plus Residential-Traffic, geschätzt unter
0,20 USD.
