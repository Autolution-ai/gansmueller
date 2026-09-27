# Scrape der bestehenden Website

Gescrapt am: 2026-09-27 (17:27–17:30 UTC) · Actor: `apify/web-fetch` (je Seite ein Lauf, Formate raw/markdown/links/text)
Start-URL: http://www.ingenieurbuero-gansmueller.de/
Rohdaten: `quellen/scrape-website.json` (Roh-HTML, CSS, PDF-Text, Header)

Warum `apify/web-fetch` statt Crawler: Die Seite hat 9 verlinkte HTML-Seiten und
ein PDF. Einzelabrufe waren günstiger und vollständig. Direkter Abruf per curl
wird vom Egress-Proxy gesperrt (HTTP 403), ebenso `api.apify.com`.

## Unterseiten (alle über Navigation erreichbar, alle HTTP 200)

| URL | `<title>` | Last-Modified (Server) |
|---|---|---|
| http://www.ingenieurbuero-gansmueller.de/ (= index.html) | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Home | Sat, 14 Jun 2008 08:44:42 GMT |
| http://www.ingenieurbuero-gansmueller.de/2.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Leistungen | – |
| http://www.ingenieurbuero-gansmueller.de/3.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Referenzen | Sat, 14 Jun 2008 08:44:47 GMT |
| http://www.ingenieurbuero-gansmueller.de/10.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Referenzliste | Sat, 14 Jun 2008 08:44:52 GMT |
| http://www.ingenieurbuero-gansmueller.de/4.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Altbausanierung | Sat, 14 Jun 2008 08:44:58 GMT |
| http://www.ingenieurbuero-gansmueller.de/6.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Gewerbliche Bauten | Sat, 14 Jun 2008 08:44:58 GMT |
| http://www.ingenieurbuero-gansmueller.de/7.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Aktuelles und Service | Sat, 14 Jun 2008 08:44:58 GMT |
| http://www.ingenieurbuero-gansmueller.de/8.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Kontakt | – |
| http://www.ingenieurbuero-gansmueller.de/9.html | Ingenieurbuero-Gansmueller-Diplom-Bauingenieur(FH) - Impressum | Sat, 14 Jun 2008 08:44:58 GMT |
| http://www.ingenieurbuero-gansmueller.de/resources/Referenzliste.pdf | (PDF, 4 Seiten, 33005 Bytes) | Sat, 14 Jun 2008 08:44:57 GMT |

„–" = Header bei diesem Abruf nicht mit ausgelesen (kein Befund).

Jede HTML-Seite endet mit dem Generator-Kommentar
`<!-- wfxbuild / 1.0 / layout2-1 / 2008-06-14 10:44:xx CEST-->`.
Die Stylesheets tragen den Vermerk `(c) Schlund + Partner AG` (Baukasten-Vorlage).

**Externe Links:** keine. Außer den internen Seiten, dem PDF, `mailto:rene.gansmueller@online.de`
und dem Link auf die eigene Domain gibt es keinen Link. Kein Social-Profil,
kein Google-Maps-Link, keine Karte.

## Meta (auf allen Seiten identisch)

- `<meta name="author" content="René Gansmüller">`
- `<meta name="description" content="Ingenieurbüro Rene Gansmüller, Bauingenieur">`
- `<meta name="keywords" content="Ingenieurbüro, Bau, Bauingenieur, Gansmüller, Bauleiter, Bauleitung, Bauüberwachung, Hausbau, Sanierung, Schwammsanierung, Hausschwamm,">`
- Doctype HTML 4.01 Transitional, `<html>` ohne `lang`, kein Viewport-Meta,
  kein Open Graph, kein JSON-LD, kein Canonical-Tag im Quelltext

## Footer (auf allen Seiten identisch)

Ingenieurbüro René Gansmüller, Schwedenstraße 13, 13357 Berlin

---

## Text je Seite (unverändert, Navigation weggelassen)

### Home – http://www.ingenieurbuero-gansmueller.de/

```
<h2> Willkommen beim Ingenieurbüro René Gansmüller.
<h3> Ich freue mich über Ihren Besuch auf meiner Website.

Vorab ein paar Informationen zu meiner Person.

Ich bin seit 12 Jahren als Bauingenieur (FH) tätig und seit 9 Jahren selbständig mit meinem Ingenieurbüro.

Seit 2007 lebe und arbeite ich in Berlin. Zuvor hatte ich meinen Wirkungskreis im Raum Dresden.
```

### Leistungen – 2.html

```
## Mein Leistungsangebot

### Beratung

### Bestandsaufnahme

*   Zustandsermittlung der Bausubstanz bei Sanierungs- und Modernisierungsvorhaben
*   Kostenschätzung

### Vorbereitung der Vergabe

*   Erstellung der Leistungsverzeichnisse
*   genaue Mengenermittlung

### Mitwirkung bei der Vergabe

*   Zusammenstellung der Ausschreibungsunterlagen
*   Angebotsauswertung
*   Bieterverhandlungen

### Objektüberwachung

*   Überwachung der Baumaßnahmen auf Übereinstimmung mit den Ausführungs-plänen und auf Einhaltung der Normen, Vorschriften und Regeln der Technik
*   Koordination der verschiedenen Gewerke und Handwerker
*   Erstellung der Ablaufpläne und Überwachung der Einhaltung dieses Zeitplanes
*   Kostenkontrolle
*   Aufmaßkontrolle und Rechnungsprüfung

### Objektbetreuung und Dokumentation

*   Gewährleistungsabnahmen vor Ablauf der Gewährleistungsfrist
*   Zusammenstellung und Übergabe der Revisionsunterlagen
```

### Referenzen – 3.html

Unternavigation: Referenzliste (10.html) · Altbausanierung (4.html) · Gewerbliche Bauten (6.html)

```
## Referenzen

Meine bisherige Tätigkeit umfasste vorwiegend Altbausanierungsobjekte aber auch Neubauvorhaben und die Realisierung von Gewerbeobjekten.

Besonders bei der Sanierung empfehle ich, die Beratung eines Spezialisten in Anpruch zu nehmen, da bei solchen Vorhaben die Kenntnis der alten Techniken und Bauweisen von Nöten ist, um das richtige Konzept zu erstellen. Auch bei der Ausführung können einem Laien schwerwiegende Fehler unterlaufen die die Bausubstanz schädigen und deren Folgen nachträglich durch teure und aufwändige Maßnahmen beseitigt werden müssen.

Ich verweise hier zum Beispiel auf die fachgerechte Sanierung von Holzbalkendecken und die Schwammsanierung.

Meine bisherigen Erfahrungen haben mir gezeigt: Hier sparen ist am falschen Ende gespart- engagieren Sie einen Fachmann für die Realisierung Ihres Bauvorhabens.
```

### Referenzliste – 10.html

```
Hier finden Sie sich eine Auflistung meiner Referenzobjekte.
```
(„Referenzobjekte" verlinkt auf http://www.ingenieurbuero-gansmueller.de/resources/Referenzliste.pdf)

### Altbausanierung – 4.html (nur Bildunterschriften und Bilder)

```
Loisenstr. 10, Dresden                Bundschuhstr. 1, Dresden
  <img src="resources/Loisenstr.jpg" width="184" height="268">   <img src="resources/Bundschuhstr.jpg">
Wöhlerstr. 1/ 1a, Dresden
  <img src="resources/W$C3$B6hlerstr.jpg">
Augustusweg 114, Radebeul
  <img src="resources/Augustusweg.jpg">
Königswinterstr./ Andernacher Str./ Ehrenfelsstraße, Berlin
  <img src="resources/BlnK$C3$B6nigswinter.jpg" width="347" height="241">
```

### Gewerbliche Bauten – 6.html

```
Lebensmitteldiscounter Diska, Kreischa
  <img src="resources/Diska+Kreischa.jpg">
```

### Aktuelles und Service – 7.html

```
## Service

Wenn Sie eine Entwurfs- oder Genehmigungsplanung wünschen, wenn Sie die Beantragung einer Baugenehmigung benötigen kann ich Ihnen gern den Kontakt zu einem guten Architekturbüro vermitteln, mit dem ich zusammengearbeite. Selbstverständlich können Sie sich auf eine reibungslose Kommunikation verlassen.

Zu meinem Service gehört auch die Vermittlung von qualifizierten Handwerkern, mit denen ich in meiner bisherigen Tätigkeit gute Erfahrungen gemacht habe. Leider ist es nicht immer einfach, schwarze Schafe zu erkennen. Vor schlechten Erfahrungen, Frust und Enttäuschungen möchte ich Sie so bewahren.

Wenn Sie selbst Hand anlegen möchten und planen, ein Haus in Eigenleistung zu errichten oder zu sanieren stehe ich Ihnen gern beratend zur Seite.
```

### Kontakt – 8.html

```
# Kontakt

Vielen Dank für Ihren Besuch auf meinen Seiten.

Wenn Sie Fragen oder Anmerkungen haben, so können Sie per E-Mail, Telefon oder auf dem Postweg Kontakt zu mir aufnehmen. Alternativ können Sie auch das untenstehende Formular nutzen, um mich zu kontaktieren.

*   Anschrift:  Ingenieurbüro René Gansmüller
                   Schwedenstraße 13
                   13357 Berlin
*   E- Mail:     rene.gansmueller@online.de
*   Internet:  www.ingenieurbuero-gansmueller.de
*   Telefon:   030/ 69 520 364
                   0173/ 57 31 045
*   Fax:         0721/ 151 361 235
```
Formular: `<iframe id="tincInclude4472" src="tinc?key=X1tYNWu3" … height:402px>` (Baukasten-Formular, Inhalt nicht im Scrape)

### Impressum – 9.html

```
# Impressum

Informationen über mich und mein Ingenieurbüro finden Sie hier.
Kontaktieren Sie mich, um mehr Informationen zu erhalten.

Ingenieurbüro René Gansmüller

Inhaber: René Gansmüller, Dipl.-Ing. (FH) Bauwesen

Anschrift: Schwedenstraße 13
              13357 Berlin

Telefon: 030/ 69 520 364
             0173/ 57 31 045

Fax: 0721/ 151 361 235

E- Mail: rene.gansmueller@online.de

Internet: www.ingenieurbuero-gansmueller.de

Steuernummer: 213/222/02692, Finanzamt Hoyerswerda

Inhaltlich Verantwortlicher gemäß § 6 MDStV/TDG: René Gansmüller

Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
```

---

## Referenzliste.pdf (Text unverändert, wie vom Actor extrahiert)

Quelle: http://www.ingenieurbuero-gansmueller.de/resources/Referenzliste.pdf · Last-Modified: Sat, 14 Jun 2008 08:44:57 GMT

Spalten im PDF: Objekt | Ort | Beschreibung / Größe | Leistung | Bauvolumen | Bauherr.
Die Textextraktion bricht die Tabellenzellen zeilenweise um; die Zuordnung
unten in der Tabelle ist daraus abgelesen, der Rohtext steht darunter.

| Objekt | Ort | Beschreibung / Größe | Leistung | Bauvolumen | Bauherr |
|---|---|---|---|---|---|
| Rostocker Str./Woldecker Str. | Berlin | Plattenbausanierung (Strangsanierung ;Treppenhäuser,Keller,Hauseingänge, Dach) 450 WE | Bauüberwachung, Qualitätscontrolling | 4.500.000,00 € | HOWOGE mbH |
| Andenacher Str./Winterfelsstr. Königswinterstr. | Berlin | Komplexe Altbausanierung (Strangsanierung, Fassade, Dach Keller,Treppenhäuser, Außenanlagen) 85 WE | Bauüberwachung, Qualitätscontrolling | 3.600.000,00 € | HOWOGE mbH |
| Weimarische Str. 12 | Dresden | Komplexe Albausanierung 12 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 650.000,00 € | Ortus GmbH & Co. KG |
| Zwickauer Str. 128 | Dresden | Komplexe Albausanierung 16 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 750.000,00 € | Ortus GmbH & Co. KG |
| Dresdner Str. 36 | Kreischa | Neubau eines Edeka Lebensmittelmarktes | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 650.000,00 € | GVC mbH |
| Loisenstraße 10 | Dresden | KomplexeAlbausanierung 24 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 950.000,00 € | Argentum GmbH & Co. KG |
| Heynathsstraße 16 | Dresden | Komplexe Albausanierung 16 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 650.000,00 € | Argentum GmbH & Co. KG |
| Moritzburger Str. 15 | Dresden | Komplexe Altbausanierung 22 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 850.000,00 € | Argentum GmbH & Co. KG |
| Moritzburger Straße 67 | Dresden | Komplexe Altbausanierung 8 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 350.000,00 € | Argentum GmbH & Co. KG |
| Bundschuhstraße 1 | Dresden | Komplexe Altbausanierung 22 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 750.000,00 € | Argentum GmbH & Co. KG |
| Lindenstraße 9 | Coswig | Komplexe Altbausanierung 7 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 300.000,00 € | Argentum GmbH & Co. KG |
| Lenbachstraße 3/5 | Dresden | Komplexe Altbausanierung 36 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 1.350.000,00 € | Argentum GmbH & Co. KG |
| Augustusweg 114 | Radebeul | Komplexe Albausanierung 10 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 1.200.000,00 € | Argentum GmbH & Co. KG |
| Wöhlerstraße 1/1a | Dresden | Komplexe Altbausanierung 32 WE (Einzeldenkmal) | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 950.000,00 € | Argentum GmbH & Co. KG |
| Eduard-Bilz- Str. 49 | Radebeul | Komplexe Sanierung einer denkmalsgeschützen Villa | Behördenabstimmungen, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling, Gewährleistung | 1.350.000,00 € | Argentum GmbH & Co. KG |
| 120 WE im Stadtgebiet Berlin | Berlin | Teilsanierung von einzelnen Leer- WE verteilt im Stadtgebiet Berlin | Auschreibung, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling | 1.350.000,00 € | BauBeCon Wohnen GmbH |
| 24 Liegenschaften im Stadtgebiet Berlin | Berlin | Teilsanierung von Dächern, Fassaden,Treppenhäuser, Kellern,Heizungsanlagen | Auschreibung, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling | 1.500.000,00 € | BauBeCon Wohnen GmbH |
| Linienstraße 56 | Brandenburg | Teilsanierung von 6 Leer- WE | Auschreibung, Angebotsauswertung, Vergabe, Bauüberwachung, Qualitätscontrolling | 140.000,00 € | BauBeCon Wohnen GmbH |
| Kaufland Schönerberger Str. 7 | Berlin | Umbau eines Parkdecks | Bauüberwachung, Qualitätscontrolling | 45.000,00 € | Kaufland Ladenbau GmbH |
| Kaufland Strausberg | Strausberg | Neubau von 2 Werbeanlagen | Bauüberwachung, Qualitätscontrolling | 55.000,00 € | Kaufland Ladenbau GmbH |

Rohtext:

```
Ingenieurbüro René Gansmüller Seite 1
Referenzliste
Objekt Ort Beschreibung / Größe Leistung Bauvolumen Bauherr
Rostocker Str./Woldecker Str. Berlin Plattenbausanierung Bauüberwachung 4.500.000,00 € HOWOGE mbH
(Strangsanierung ;Treppen- Qualitätscontrolling
häuser,Keller,Hauseingänge,
Dach) 450 WE
Andenacher Str./Winterfelsstr. Berlin Komplexe Altbausanierung Bauüberwachung 3.600.000,00 € HOWOGE mbH
Königswinterstr. (Strangsanierung, Fassade, Dach Qualitätscontrolling
Keller,Treppenhäuser, Außen-
anlagen) 85 WE
Weimarische Str. 12 Dresden Komplexe Albausanierung 12 WE Behördenabstimmungen 650.000,00 € Ortus GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Zwickauer Str. 128 Dresden Komplexe Albausanierung 16 WE Behördenabstimmungen 750.000,00 € Ortus GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Dresdner Str. 36 Kreischa Neubau eines Edeka Lebensmittel- Behördenabstimmungen 650.000,00 € GVC mbH
marktes Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung

-- 1 of 4 --

Ingenieurbüro René Gansmüller Seite 2
Referenzliste
Objekt Ort Beschreibung / Größe Leistung Bauvolumen Bauherr
Loisenstraße 10 Dresden KomplexeAlbausanierung 24 WE Behördenabstimmungen 950.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Heynathsstraße 16 Dresden Komplexe Albausanierung 16 WE Behördenabstimmungen 650.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Moritzburger Str. 15 Dresden Komplexe Altbausanierung 22 WE Behördenabstimmungen 850.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Moritzburger Straße 67 Dresden Komplexe Altbausanierung 8 WE Behördenabstimmungen 350.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Bundschuhstraße 1 Dresden Komplexe Altbausanierung 22 WE Behördenabstimmungen 750.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung

-- 2 of 4 --

Ingenieurbüro René Gansmüller Seite 3
Referenzliste
Objekt Ort Beschreibung / Größe Leistung Bauvolumen Bauherr
Qualitätscontrolling
Gewährleistung
Lindenstraße 9 Coswig Komplexe Altbausanierung 7 WE Behördenabstimmungen 300.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Lenbachstraße 3/5 Dresden Komplexe Altbausanierung 36 WE Behördenabstimmungen 1.350.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Augustusweg 114 Radebeul Komplexe Albausanierung 10 WE Behördenabstimmungen 1.200.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Wöhlerstraße 1/1a Dresden Komplexe Altbausanierung 32 WE Behördenabstimmungen 950.000,00 € Argentum GmbH & Co. KG
(Einzeldenkmal) Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
Eduard-Bilz- Str. 49 Radebeul Komplexe Sanierung einer Behördenabstimmungen 1.350.000,00 € Argentum GmbH & Co. KG

-- 3 of 4 --

Ingenieurbüro René Gansmüller Seite 4
Referenzliste
Objekt Ort Beschreibung / Größe Leistung Bauvolumen Bauherr
denkmalsgeschützen Villa Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Gewährleistung
120 WE im Stadtgebiet Berlin Berlin Teilsanierung von einzelnen Auschreibung 1.350.000,00 € BauBeCon Wohnen GmbH
Leer- WE verteilt im Stadtgebiet Angebotsauswertung
Berlin Vergabe
Bauüberwachung
Qualitätscontrolling
24 Liegenschaften im Stadt- Berlin Teilsanierung von Dächern, Auschreibung 1.500.000,00 € BauBeCon Wohnen GmbH
gebiet Berlin Fassaden,Treppenhäuser, Angebotsauswertung
Kellern,Heizungsanlagen Vergabe
Bauüberwachung
Qualitätscontrolling
Linienstraße 56 Brandenburg Teilsanierung von 6 Leer- WE Auschreibung 140.000,00 € BauBeCon Wohnen GmbH
Angebotsauswertung
Vergabe
Bauüberwachung
Qualitätscontrolling
Kaufland Schönerberger Str. 7 Berlin Umbau eines Parkdecks Bauüberwachung 45.000,00 € Kaufland Ladenbau GmbH
Qualitätscontrolling
Kaufland Strausberg Strausberg Neubau von 2 Werbeanlagen Bauüberwachung 55.000,00 € Kaufland Ladenbau GmbH
Qualitätscontrolling

-- 4 of 4 --
```

---

## Bilder (alle `<img>` und CSS-Hintergründe)

Keines der sechs Inhaltsbilder hat ein `alt`-Attribut. Maße nur dort, wo sie im
HTML/CSS stehen; die tatsächliche Pixelgröße ist ohne Download nicht bekannt
(Ausnahme Logo, siehe unten). `src`-Werte exakt kopiert, einschließlich der
Schreibweise `$C3$B6` für „ö".

| URL | Seite | Kontext (Bildunterschrift) | alt | Maße laut HTML/CSS |
|---|---|---|---|---|
| http://www.ingenieurbuero-gansmueller.de/resources/_wsb_logo.jpg | alle (CSS `#logo`) | Logo im Header | – (CSS-Hintergrund) | Box 215×40 (main.css) |
| http://www.ingenieurbuero-gansmueller.de/resources/Titelbild+Hintergrund+fertig.jpg | alle (CSS `#key_visual`) | Titelbild im Header | – (CSS-Hintergrund) | Box 720×220 (main.css) |
| http://www.ingenieurbuero-gansmueller.de/resources/Loisenstr.jpg | 4.html | Loisenstr. 10, Dresden | fehlt | 184×268 |
| http://www.ingenieurbuero-gansmueller.de/resources/Bundschuhstr.jpg | 4.html | Bundschuhstr. 1, Dresden | fehlt | keine Angabe |
| http://www.ingenieurbuero-gansmueller.de/resources/W$C3$B6hlerstr.jpg | 4.html | Wöhlerstr. 1/ 1a, Dresden | fehlt | keine Angabe |
| http://www.ingenieurbuero-gansmueller.de/resources/Augustusweg.jpg | 4.html | Augustusweg 114, Radebeul | fehlt | keine Angabe |
| http://www.ingenieurbuero-gansmueller.de/resources/BlnK$C3$B6nigswinter.jpg | 4.html | Königswinterstr./ Andernacher Str./ Ehrenfelsstraße, Berlin | fehlt | 347×241 |
| http://www.ingenieurbuero-gansmueller.de/resources/Diska+Kreischa.jpg | 6.html | Lebensmitteldiscounter Diska, Kreischa | fehlt | keine Angabe |

Baukasten-Grafiken (Vorlage, kein Kundenmaterial), relativ zu
`colorschemes/colorscheme1/` bzw. zur Domain: `images/static/contentbg.gif`,
`images/static/headerbg.gif`, `images/static/navbg.gif`,
`images/static/footerbg.gif`, `images/static/pgbk.gif`,
`images/dynamic/buttonset1/n1.gif`, `n1hover.gif`, `n1activeitem.gif`,
`subnav1.gif`, `subnav1hover.gif`, `subnav1active.gif`.

### Logo

- URL: http://www.ingenieurbuero-gansmueller.de/resources/_wsb_logo.jpg
- Format: JPEG (JFIF 1.02, baseline), 2660 Bytes laut Server, Last-Modified Sat, 14 Jun 2008 08:44:42 GMT
- Auflösung: **215 × 40 px** (aus dem SOF0-Header der Datei gelesen)
- Hintergrund: weiß (#ffffff), nicht transparent
- Inhalt (visuell geprüft, nur zur CI-Analyse im Scratchpad dekodiert, nicht im Repo):
  Bildmarke links aus einem hellen, gräulich-malvenfarbenen Rechteck mit
  einem mittelblauen Querbalken; rechts zweizeilig „INGENIEURBÜRO" in
  gesperrten Versalien (blaugrau) über „RENÉ GANSMÜLLER" in Versalien
  (dunkelgrau), serifenlose Schrift.
- Farben, per Pixelmittel gemessen (JPEG, Kantenglättung, daher Näherungswerte):
  - Querbalken der Bildmarke: #507fa6
  - „INGENIEURBÜRO": dunkelste Pixel #576c73, Mittel der Schriftpixel #69808a
  - „RENÉ GANSMÜLLER": dunkelste Pixel #2c2c2d, Mittel #575758
  - Rechteck der Bildmarke: #d8ced6 / #d4cfd2

## Farben und Schriften aus HTML/CSS

Drei Stylesheets: `main.css` und `colorschemes/colorscheme1/colorscheme.css`
(beide „(c) Schlund + Partner AG", Baukasten-Vorlage), `style.css`
(Seiteneinstellungen). Inline-Styles im Inhalt nur `font-size` (20px, 15px, 12px)
und Bildmaße, keine Farben.

| Wert | Verwendung | Datei |
|---|---|---|
| #036 (#003366) | Fließtext, Listen, Footer-Text, Unternavigation, Formularränder, Link (`a:link` in style.css) | colorscheme.css, style.css |
| #369 (#336699) | Überschriften h1–h3, Tabellenkopf, Tabellenrahmen | colorscheme.css, style.css |
| #630 (#663300) | aktiver Hauptnavigationspunkt, Hover Unternavigation, besuchte/aktive Links | colorscheme.css, style.css |
| #9cf (#99ccff) | inaktive Hauptnavigationspunkte | colorscheme.css, style.css |
| #fff | Hover Hauptnavigation, aktive Unternavigation, Tabellenzeilen | colorscheme.css, style.css |
| #900 (#990000) | `#text_caption` (Bildunterschrift im Header, im HTML leer) | colorscheme.css, style.css |
| #999 (#999999) | Seitenhintergrund `body` (plus Verlaufsgrafik pgbk.gif) | colorscheme.css |
| #def (#ddeeff) | gerade Tabellenzeilen | colorscheme.css |

Schrift durchgehend: `font-family: Trebuchet MS,Tahoma,Verdana,Arial,sans-serif`
(Links: `Trebuchet MS,sans-serif`), `font-weight: normal` überall.
Größen: h1 26px, h2 20px, h3 15px, Text 12px, Navigation 12px, Footer 10px.
Layout feste Breite 730px (`#container`), Header 220px hoch.

---

## Heruntergeladen am 2026-09-27

Weg: `apify/web-fetch` (Format raw) je Bild-URL, Inhalt lokal aus Base64
dekodiert (direkter Abruf der Domain und von api.apify.com ist vom
Egress-Proxy gesperrt). Keine Bearbeitung, keine Skalierung. Maße mit Pillow
aus der Datei gemessen, Server-Größe = `contentLengthBytes` des Abrufs.

| Datei (`site/assets/images/original/`) | Quell-URL (exakt kopiert) | Pixel | Datei (Bytes) | Server (Bytes) | Treue |
|---|---|---|---|---|---|
| logo-original.jpg | http://www.ingenieurbuero-gansmueller.de/resources/_wsb_logo.jpg | 215 × 40 | 2660 | 2660 | bitgleich |
| titelbild-header-original.jpg | http://www.ingenieurbuero-gansmueller.de/resources/Titelbild+Hintergrund+fertig.jpg | 720 × 220 | 45613 | 45613 | bitgleich |
| ref-dresden-loisenstrasse.jpg | http://www.ingenieurbuero-gansmueller.de/resources/Loisenstr.jpg | 167 × 251 | 11138 | 21465 | Bilddaten bitgleich, EXIF/XMP entfernt |
| ref-dresden-bundschuhstrasse.jpg | http://www.ingenieurbuero-gansmueller.de/resources/Bundschuhstr.jpg | 191 × 269 | 14119 | 24446 | Bilddaten bitgleich, EXIF/XMP entfernt |
| ref-dresden-woehlerstrasse.jpg | http://www.ingenieurbuero-gansmueller.de/resources/W$C3$B6hlerstr.jpg | 345 × 230 | 23441 | 33768 | Bilddaten bitgleich, EXIF/XMP entfernt |
| ref-radebeul-augustusweg.jpg | http://www.ingenieurbuero-gansmueller.de/resources/Augustusweg.jpg | 413 × 251 | 41161 | 41161 | bitgleich (inkl. EXIF) |
| ref-berlin-koenigswinterstrasse.jpg | http://www.ingenieurbuero-gansmueller.de/resources/BlnK$C3$B6nigswinter.jpg | 284 × 186 | 16813 | 27139 | Bilddaten bitgleich, EXIF/XMP entfernt |
| ref-kreischa-diska.jpg | http://www.ingenieurbuero-gansmueller.de/resources/Diska+Kreischa.jpg | 364 × 258 | 18625 | 28951 | Bilddaten bitgleich, EXIF/XMP entfernt |

„Bilddaten bitgleich, EXIF/XMP entfernt": Übernommen sind SOI, der
JFIF-Kopf und alles ab dem ersten DQT-Marker bis EOI, byte-genau (Länge
geprüft: Server-Größe minus Offset des DQT-Markers). Entfernt sind nur die
beiden Metadaten-Segmente (APP1 EXIF 6234 Bytes, APP1 XMP 4089 bzw. 4088 Bytes). Aus
diesen Metadaten, wie im Abruf gelesen: Kamera NIKON E5900, Aufnahme
2008-05-04 (Loisenstr. 10:49:34Z, Bundschuhstr. 11:03:09Z, Wöhlerstr.
10:29:23Z laut XMP `DateTimeOriginal`). Königswinterstr./Berlin: Aufnahme 2008-04-22 17:43:39Z, Diska Kreischa: 2008-05-04 14:15:36Z (XMP), Augustusweg: EXIF DateTime 2008:05:04 12:13:34, NIKON E5900. In der Wöhlerstr.-Aufnahme ist
unten rechts der Kamera-Datumsstempel „04.05.2008" eingebrannt.

Inhalt (visuell geprüft):
- **logo-original.jpg:** wie oben beschrieben, weißer Hintergrund.
- **titelbild-header-original.jpg:** oberes Drittel weiß, darunter ein
  hellblaues, fein horizontal gestreiftes Band mit durchscheinenden hellen
  Quadraten (gleiches Motiv wie die Bildmarke des Logos). Rechts ein
  freigestelltes Porträt eines lächelnden Mannes in dunklem Nadelstreifen-Anzug,
  weißem Hemd und hellblau gestreifter Krawatte, bis zur Brust angeschnitten.
  Wer abgebildet ist, steht nirgends auf der Seite (vermutlich der Inhaber,
  nicht belegt). EXIF DateTime 2008:05:09 11:37:50.
- **ref-dresden-loisenstrasse.jpg:** Straßenansicht, sanierter
  Gründerzeit-Eckbau in Ocker, Hochformat.
- **ref-dresden-bundschuhstrasse.jpg:** Straßenansicht, sanierter
  Gründerzeitbau, helle Fassade, Hochformat, parkende Autos im Vordergrund.
- **ref-dresden-woehlerstrasse.jpg:** Eckgebäude mit roten Mansarddach-Gauben,
  gelbe Putzfassade, Querformat.
- **ref-radebeul-augustusweg.jpg:** Villa mit rotem Ziegeldach, Gauben und
  Holzbalkonen hinter hohen Bäumen, Querformat.
- **ref-berlin-koenigswinterstrasse.jpg:** Eckbau einer Wohnanlage, rotes Dach,
  helle Putzfassade mit Erkern, Querformat.
- **ref-kreischa-diska.jpg:** eingeschossige Markthalle mit rotem Satteldach,
  weiße Fassade mit Rundbögen, gelb-rote „diska"-Schilder, Parkplatz, Querformat.
