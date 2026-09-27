# Dachdecker

**Stand:** 2026-09-11 · **Ausgewertet:** 8 Betriebsseiten, alle acht Startseiten

**Quellen** (alle am 2026-09-11 über Apify gescraped, jeweils die Startseite):

| # | URL | Ort | Art |
|---|---|---|---|
| Q1 | `https://www.diedachexperten.de/` | Hamburg | kleiner Betrieb, schlichte Seite |
| Q2 | `https://www.dachdecker-hh.de/` (Dachdeckermeister Garling) | Hamburg | Mittelbetrieb |
| Q3 | `https://089dach.de/` (089Dach GmbH) | München-Obermenzing | conversion-optimierte Neu-Seite |
| Q4 | `https://www.peterhaensel-dach.de/` (Peterhänsel Dach-Wand-Schornsteine) | Leipzig | 15+ Mitarbeiter, **Agentur: contentura.de** |
| Q5 | `https://ottobedachungen.de/` (Otto Bedachungen) | Köln-Königsdorf | 15 Mitarbeiter |
| Q6 | `https://dachschaden.de/` (Dachdeckermeister Claus Dittrich) | Dresden / Berlin | über 100 Fachkräfte, fünf Standorte |
| Q7 | `https://eco-dach.com/` (Eco Dach GmbH) | Stuttgart | Familienbetrieb seit 2009 |
| Q8 | `https://www.hannover-dachbau.de/` (HW Hannover Dachbau) | Isernhagen bei Hannover | junger Betrieb |

**Nebenbelege** (nur Suchergebnis-Titel und -Description ausgewertet, die Seite selbst
wurde nicht gescraped, deshalb kein vollwertiger Beleg und in keiner Zählung enthalten):
`horn-dachdecker.de`, `amd-dachdeckerei.de`, `clauss-dach.de`, `www.dachvomfachkoeln.de`,
`www.mks-bedachungen.de`, `herzog-dach.de`, `www.kroenke-dach.de`,
`www.russek-bedachungen.de`, `schaeffer-dach.de`, `www.ddm-schroeder.de`,
`www.bedachungen-thomas-katten.de`, `www.pp-dachdesign.de`, `www.derdachdecker.hamburg`,
`www.hermann-dachbau.de`, `voges-dach.de`.

**Belastbarkeit:** Tragfähig für Formulierungs-, Hero- und Layoutmuster. Alle acht sind
Startseiten, regional gestreut über Hamburg (zweimal), München, Leipzig, Köln, Dresden,
Stuttgart und Hannover. Drei Einschränkungen gehören beim Lesen mitgedacht:

1. **Hamburg ist doppelt vertreten** (Q1, Q2). Wo eine Zählung nur auf diesen beiden
   beruht, ist sie eine Stadtstichprobe und kein Regionalmuster.
2. **Q3 ist ein Ausreißer nach oben.** Die Seite ist erkennbar von jemandem gebaut, der
   Conversion-Optimierung betreibt. Sie liefert die meisten Differenzierungsfunde, taugt
   aber nicht als Beleg dafür, was „die Branche" tut. Steht etwas nur bei Q3, ist es
   genau deshalb interessant.
3. **Acht Seiten sind eine Stichprobe, kein Zensus.** Was hier nicht vorkommt, existiert
   im Gewerk trotzdem. Jede Aussage dieser Datei gilt über diese acht Seiten, nicht über
   das Handwerk.

**Agenturvorlagen:** Bei Q4 steht im Footer ein verlinktes Agenturlogo
(`contentura.de`), die Seite stammt also von einer Agentur. Was daraus folgt, ist eng
begrenzt: Stimmen zwei Seiten überein, **weil** dieselbe Agentur sie gebaut hat, ist die
Übereinstimmung kein Branchenmuster. In dieser Stichprobe ist Q4 die einzige nachweislich
von einer Agentur gebaute Seite, eine solche Scheinübereinstimmung kann hier also nicht
entstehen. Q4 läuft deshalb in allen Zählungen mit und steht überall namentlich in der
Belegliste, wer eine Zählung ohne Agenturseite will, kann sie abziehen. Bei den anderen
sieben war im erfassten Seiteninhalt kein Agenturvermerk zu sehen, bei mehreren wurde der
Footer aber nicht vollständig mitgescraped, ein Vermerk kann also übersehen worden sein.
Die aus der Vorgängerfassung bekannte Vorlagenquelle `hoffmannsolutions.de` kam in dieser
Runde nicht vor.

`scripts/branchen-check.mjs` meldet für diese Datei Warnungen der Art „Strukturaussage
stützt sich auf Vorlagen-Quelle Q4". Das ist nach dem Absatz oben beabsichtigt: Die
Warnung markiert genau die Stellen, an denen Q4 abgezogen werden kann.

**Auffrischung:** Älter als zwölf Monate → Hinweis, kein Beleg. Dann `/branche dachdecker`.

---

## Austauschbare Formulierungen (gesperrt)

Gezählt über die acht Startseiten. Die Klammer hinter der Zahl nennt **alle** Seiten, auf
denen die Formulierung steht, die letzte Spalte nur Beispiele daraus. Was hier steht, sagt
der Wettbewerb auch. Im Fließtext darf es vorkommen, in einer Headline ist es ein Fehler.

| Formulierung | Verbreitung | Beispiele wörtlich |
|---|---|---|
| **„Meisterbetrieb" / „Meister"** | 8 von 8 (Q1–Q8) | „Hamburger Meisterbetrieb", „Meisterbetrieb seit 1990", „Meister seit 1998", „Meister- Und Ausbildungsbetrieb" |
| **„zuverlässig"** | 7 von 8 (Q1, Q2, Q3, Q5, Q6, Q7, Q8) | „zuverlässige Arbeitsausführung", „Ihr zuverlässiger Partner rund ums Dach", „Ihr zuverlässiger Dachdecker in Köln" |
| **Erfahrungsdauer als Beweis** | 7 von 8 (Q1–Q7) | „jahrelanger Erfahrung", „über 15 jährigen Erfahrung", „Seit über 35 Jahren", „Seit über 120 Jahren" |
| **„Ihr Partner" / „Ihr Ansprechpartner"** | 7 von 8 (Q1, Q2, Q3, Q5, Q6, Q7, Q8) | „Ihr kompetenter Partner", „Ihr Nr. 1 Partner für Bedachungen", „Ihr Partner für die Krone des Hauses" |
| **„rund ums Dach"** | 5 von 8 (Q1, Q2, Q4, Q6, Q8) | „Anliegen rund um Ihr Dach", „Unser Service Rund ums Dach", „Lösungen rund ums Dach" |
| **Leistung plus Ortsname in H1 oder Hero-Kicker** | 5 von 8 (Q2, Q3, Q4, Q5, Q7) | „Ihr Dachdeckermeister in Hamburg!", „Dachdecker München, Dachsanierung seit 1998", „TÄGLICH FÜR SIE AUF LEIPZIGS DÄCHERN UNTERWEGS." |
| **„individuell" / „maßgeschneidert"** | 5 von 8 (Q3, Q4, Q5, Q6, Q8) | „individuelle Lösungen", „maßgeschneiderte Lösungen", „individuelle Dachlösungen" |
| **„hochwertig" / „höchste Qualität"** | 4 von 8 (Q4, Q5, Q6, Q8) | „für höchste Qualität", „in höchster Qualität aus einer Hand", „hochwertigen Abdichtungssystemen" |
| **„langlebig"** | 4 von 8 (Q2, Q4, Q6, Q7) | „sicheres und langlebiges Dach", „langlebige Abdichtungen", „langlebige Qualität" |
| **„aus einer Hand", wörtlich** | 3 von 8 (Q3, Q5, Q8) | „Alles aus einer Hand, ohne Koordinationsprobleme", „in höchster Qualität aus einer Hand", „Service aus einer Hand!" |
| **„fachgerecht"** | 3 von 8 (Q1, Q6, Q8) | „fachgerechte Beratung", „fachgerechten Ausführung", „fachgerechten Umsetzung" |
| **„Festpreis"** | 3 von 8 (Q1, Q3, Q5) | „stets zu einem fairen Festpreis", „Festpreis-Garantie", „Bei uns kriegen Sie einen Festpreis" |
| **Schutz-vor-dem-Wetter-Satz** | 3 von 8 (Q2, Q4, Q6) | „bei typisch norddeutschem Wetter schützt", „Abdichtung und Wetterschutz", „weit mehr als nur Schutz vor Wind und Wetter" |

**Varianten von „aus einer Hand"**, die nicht in der Zählung oben stecken: „Unsere
Kompetenzen unter einem Dach" (Q6) und das Motto „Alles unter Dach und Fach" (Q5).

**Zwei Erhebungen, keine Widerlegung:** Die Vorgängerfassung dieser Datei stützte sich auf
vier andere Seiten, davon drei Leistungs-Unterseiten.
Jene Erhebung vom 2026-09-10 führte „fachgerecht" mit 4 von 4. Das ist eine andere
Stichprobe und wird hier nicht gegengerechnet.
In der vorliegenden Stichprobe steht „fachgerecht" auf 3 von 8 Seiten (Q1, Q6, Q8).
Nebeneinander gelesen heißt das: verbreitet, aber nicht zwingend. Die durchgängigsten
Wörter dieser Stichprobe sind „Meisterbetrieb", „zuverlässig" und die Erfahrungsdauer.

**Superlative ohne Beleg** kommen vor und sind zu meiden: „Ihr Nr. 1 Partner für
Bedachungen" und „einer der führenden Meisterbetriebe" (Q5), „Perfektion fürs Dach" (Q2),
„Handwerkskunst auf höchstem Niveau" (Q3, in einem Kundenzitat). Der Inhaber-Test aus
`CLAUDE.md` erledigt diese Sätze zuverlässig.

## Hero-Muster der Branche

Der Hero zerfällt in vier Bausteine. Sie sind getrennt gezählt, weil sie getrennt
vorkommen.

| Baustein | Verbreitung | Anmerkung |
|---|---|---|
| Foto oder Videostandbild als Hero-Hintergrund | 5 von 8 (Q2, Q3, Q4, Q6, Q8) | zweimal davon kein Foto, sondern ein Standbild aus bewegtem Material |
| Kicker über der H1 | 5 von 8 (Q2, Q3, Q4, Q6, Q8) | „HERZLICH WILLKOMMEN BEI", „DACHSCHADEN?", „TÄGLICH FÜR SIE AUF LEIPZIGS DÄCHERN UNTERWEGS." |
| Leistungs-Kachelraster direkt unter dem Hero | 7 von 8 (Q1, Q2, Q3, Q4, Q5, Q7, Q8) | die achte Seite löst dasselbe über eine Tab-Leiste statt über ein Raster |
| Kennzahlen-Balken | 5 von 8 (Q3, Q4, Q5, Q6, Q7) | Wortlaut siehe unten |

Das bewegte Hero-Material kommt bei Q8 aus dem verlinkten Unternehmensvideo und bei Q6 aus
einem Video-Poster. Die Tab-Leiste statt des Kachelrasters ist Q6.

Die Kachelzahl schwankt stark: 3 (Q1), 4 (Q7), 6 (Q8), 8 (Q2), 11 (Q5), 15 (Q4), dazu
sechs große plus sechs kleine bei Q3. Genau das Raster, das `CLAUDE.md` unter Anti-Slop
verbietet, ist hier also der Branchenstandard. Ein anderer Rhythmus fällt sofort auf.

Die Kennzahlen-Balken im Wortlaut:

- 25+ Jahre, 200+ Projekte, 4.9 Bewertung, 100% Meister (Q3)
- 35+, 15+ Mitarbeiter, 200+ Projekte (Q4)
- 1990 Gründung, 99,5% Kundenzufriedenheit, 15 Mitarbeiter, 1450+ Projekte (Q5)
- Gegründet, Mitarbeiter, Dächer pro Jahr (Q6)
- Jahre Familienunternehmen, Projekte jährlich, Zufriedene Kunden (Q7)

Bei 2 von 8 (Q6, Q7) zählen die Werte beim Scrollen von null hoch.

**Was im Hero fehlt und deshalb auffallen würde:**

| Element | Verbreitung | Konsequenz |
|---|---|---|
| Sterne-Bewertung above the fold | 1 von 8 (Q3) | „4,9 bei 127 Bewertungen", direkt unter dem Hero. Ein Beweis vor dem ersten Scroll ist praktisch freies Feld |
| Reaktionszeit-Zusage | 1 von 8 (Q3) | „Reaktionszeit unter zwei Stunden", überprüfbares Versprechen statt Adjektiv |
| Zweiter Hero-CTA für Bewerber | 1 von 8 (Q4) | „Karriere" gleichrangig neben „unverbindliches Angebot anfragen". Sonst hat die zweite Zielgruppe oben keinen Einstieg |
| Aufwandsangabe am CTA | 1 von 8 (Q3) | „Dauert zwei Minuten. Die Telefonnummer ist freiwillig." Senkt die Hemmschwelle an der Abbruchstelle |
| Karriereseite in der Hauptnavigation | 5 von 8 (Q2, Q4, Q5, Q7, Q8) | vorhanden ist sie meistens, nur eben nicht im Hero |
| Vorher/Nachher unterhalb des Heroes | 2 von 8 (Q1, Q3) | Q1 in der Referenzgalerie, Q3 als Link „Unsere Arbeit im Vorher-Nachher-Vergleich". In keinem der acht Heroes selbst |

**Preise im Hero:** In den acht ausgewerteten Heroes steht keine Zahl zum Preis. Wo Zahlen
vorkommen, stehen sie weiter unten auf der Seite (Q3, Q5), siehe *Was wirklich
differenziert*.

**Kein Schluss auf die Branche:** Dass in dieser Stichprobe kein Hero mit Vorher/Nachher
arbeitet, heißt nicht, dass es das im Gewerk nicht gibt. Die Vorgängerfassung dieser Datei
dokumentiert das Gegenteil: `jp-abdichtungstechnik.de` führte im Hero einen
Vorher/Nachher-Schieberegler („Zustand vor Sanierung" gegen „Saniertes Flachdach"). Das
Muster existiert, es ist nur selten. Als Demo-Idee bleibt es stark, gerade weil das
Ergebnis in diesem Gewerk auf einem Foto sofort erkennbar ist.

**Zwei belegte Hero-Sonderwege**, beide ohne zusätzliches Material nachbaubar:

- **Das Problem als Kicker.** Q6 stellt über die H1 das Wort „DACHSCHADEN?" und heißt auch
  so (`dachschaden.de`). Die H1 selbst verzichtet auf den Ortsnamen: „Dächer für
  Generationen. Handwerk mit Verantwortung." Die einzige der acht Seiten, die oben nicht
  ihre Zuständigkeit, sondern die Lage des Lesers benennt.
- **Nutzen statt Vorstellung.** Q3 setzt unter die H1 drei Häkchen-Zeilen, die je ein
  Ergebnis versprechen: „Undichte Stellen finden, bevor sie teuer werden", „Heizkosten
  sofort senken durch bessere Dämmung", „Sturmschäden beheben, bevor die Versicherung
  ablehnt".

## Trust-Signale, die in diesem Gewerk zählen

| Signal | Verbreitung | Einordnung |
|---|---|---|
| Meisterbrief | 8 von 8 (Q1–Q8) | Hygienefaktor. Fehlt nie, überzeugt niemanden. Nennen, nicht betonen |
| Erfahrungsdauer oder Gründungsjahr | 7 von 8 (Q1–Q7) | ebenfalls Hygienefaktor, außer die Zahl ist außergewöhnlich |
| Mitarbeiterzahl konkret genannt | 3 von 8 (Q4, Q5, Q6) | wirkt, weil überprüfbar und selten präzise |
| Ausbildungsbetrieb | 3 von 8 (Q6, Q7, Q8) | zahlt auf Bestand und Nachwuchs zugleich ein |
| Herstellerpartner als Logoreihe | 2 von 8 (Q7, Q8) | verleiht fremde Autorität, kostet nichts |
| Eigene Werkstatt oder eigener Fuhrpark | 2 von 8 (Q4, Q6) | kann kein Wettbewerber ohne Werkstatt behaupten |
| Kundenstimmen mit Namen | 2 von 8 (Q3, Q7) | die Mehrheit zeigt gar keine Stimmen |
| Sichtbares Team, Fotos und Vornamen | 2 von 8 (Q6, Q7) | macht aus der Firma Personen |
| Fachverbands-Zertifikat über den Meisterbrief hinaus | 1 von 8 (Q2) | „Photovoltaik Manager im Dachdeckerhandwerk, ZVDH Zertifiziert", dazu eine eigene Zertifikate-Seite |
| Nachprüfbare Google-Bewertung verlinkt | 1 von 8 (Q3) | 4,9 aus 127 Bewertungen, Link auf Google Maps. Beweis statt Behauptung |
| Firmenvideo | 1 von 8 (Q8) | teuer in der Produktion, dafür konkurrenzlos |

Details zu den Belegen:

- **Gründungsjahr:** Die höchste Zahl der Stichprobe steht bei Q6, dort wörtlich als
  Überschrift „Ihr Dach. Unser Handwerk. Seit 1905." und im Fließtext als „Seit 1905
  stehen wir für handwerkliche Qualität". Der Hero nennt daneben „Seit über 120 Jahren".
- **Mitarbeiterzahl:** Q4 nennt „15+ Mitarbeiter", Q5 „15 Mitarbeiter", Q6 „über 100
  Fachkräfte". Q6 beziffert zusätzlich drei seiner fünf Standorte einzeln: Berlin 15
  Dachdecker, Sehmatal 9 Zimmerer und Tischler plus 2 Auszubildende, Heidenau 15
  Dachdecker. Für Dresden und Ottendorf-Okrilla nennt die Seite keine Zahl, die drei Werte
  ergeben also nicht die Gesamtzahl und widersprechen ihr auch nicht.
- **Herstellerpartner:** Q7 zeigt eine lange Logoreihe, darunter Velux, Roto, Prefa,
  Rheinzink, Braas, Wienerberger, Creaton, Nelskamp, Bauder, Isover, Knauf, JA Solar,
  Trina Solar und Huawei. Q8 bindet einen Velux-Konfigurator in den Seitenkopf ein.
- **Werkstatt und Fuhrpark:** Q6 nennt eine eigene Dachklempnerwerkstatt, die Werkstatt
  der mobilen Reparatureinheiten und eine Azubi-Werkstatt. Q4 vermietet Kran, Transporter
  und Pritschen inklusive Personal.

**Innungsmitgliedschaft:** In keiner der acht ausgewerteten Startseiten steht das Wort
Innung im erfassten Seiteninhalt. Es taucht in den Suchergebnis-Beschreibungen von drei
Nebenbelegen auf (`horn-dachdecker.de`, `amd-dachdeckerei.de`, `clauss-dach.de`), deren
Seiten hier nicht ausgewertet wurden. Als Branchenmuster ist die Innung damit **nicht
erhoben**. Hat ein Kunde sie, gehört sie auf die Seite, zum Hauptargument taugt sie nach
diesem Stand nicht.

**Förderprogramme:** In keiner der acht Startseiten stehen BAFA oder KfW namentlich.
Förderung kommt nur allgemein vor, etwa bei Q8, wo Dachbegrünung „auch gut gefördert"
werde, dazu GEG- und EnEV-Fragen in der FAQ. Das heißt nicht, dass Dachdecker nicht mit
Förderung arbeiten, es heißt nur, dass diese Datei dafür keinen Beleg hat. Wer im
Demo-Text mit Förderprogrammen arbeitet, braucht eine Quelle aus dem Briefing oder dem
Kunden-Scrape.

## Typische Kundensituationen

Rohstoff für Konkretheit ohne Firmenfakten (Stufe 2 der Leiter in `website-copy`). Alle
Punkte stammen aus den Quellen, nicht aus Alltagswissen.

**Akut, der Kunde hat ein sichtbares Problem**
- Feuchter Fleck an der Zimmerdecke (Q3: „Feuchte Flecken an der Decke? Heute ein Fleck,
  morgen Schimmel im ganzen Raum.")
- Undichte Stelle, Wasser kommt durch (Q3, Q6)
- Sturmschaden, Notsicherung nötig (Q1, Q3; Q3 nennt dazu die Versicherungsfrist)
- Loser oder gebrochener Ziegel (Q3)
- Dachrinne läuft über, Wasser an der Fassade, im Herbst durch Laub und Moos verstopft
  (Q3, ausführlich)

**Geplant, der Kunde rechnet**
- Heizkosten zu hoch, Dämmung fehlt oder ist veraltet (Q3, Q6, Q8; Q8 beziffert den
  Verlust über ein ungedämmtes Dach mit „bis zu 30 Prozent der Wärme")
- Wiederkehrende Reparaturen, die Frage ist Reparatur oder Sanierung (Q6)
- Altersbedingter Verschleiß, beschädigte Ziegel oder Abdichtungen (Q6)
- Dachausbau oder Modernisierung geplant, mehr Licht und Wohnraum gewünscht (Q3, Q6)
- Photovoltaik geplant, vorher stellt sich die Frage nach dem Zustand des Dachs (Q7 führt
  „Überprüfung des Dachs" als eigenen Punkt unter Photovoltaik)
- Haus soll verkauft oder vermietet werden, Energieausweis wird fällig (Q8)
- Gesetzliche Nachrüstpflicht der obersten Geschossdecke (Q8 nennt ein mögliches Bußgeld
  „von bis zu 50.000 Euro")

**Die Vertrauensfrage, unabhängig vom Anlass**
Q3 formuliert sie als eigene Sorge: „Dachdecker München, wem vertrauen? Falsche
Entscheidungen kosten doppelt." Das ist die Frage, die eine Demo beantworten muss, bevor
sie irgendeine Leistung beschreibt.

**Die Trennung ist die Arbeit:** Akut braucht Telefonnummer, Erreichbarkeit und eine
Zusage, wann jemand kommt. Geplant braucht Ablauf, Preisrahmen und die Einordnung, was
überhaupt nötig ist. Ein Hero, der beide gleich behandelt, verliert eine der Gruppen.

## Echte Einwände

Abgeleitet daraus, welche Sorge die Quellen aktiv entkräften. Die Zahl sagt, wie viele der
acht Seiten das Thema von sich aus ansprechen. Eine FAQ auf der Startseite führen nur
2 von 8 (Q3, Q8), die übrigen Belege stammen aus Fließtext und Argumentationsblöcken.

**1. „Am Ende wird es teurer als besprochen."** 3 von 8 (Q1, Q3, Q5).
Q3 benennt den Einwand wörtlich: „Ein Angebot vom Dachdecker, das nach der Rechnung
plötzlich teurer ist als besprochen, dieses Risiko kennen viele Münchner Hausbesitzer."
Die Antwort der Branche ist das Wort Festpreis, bei Q3 zusätzlich schriftlich zugesagt.

**2. „Was kostet das überhaupt?"** Mit Zahlen beantwortet: 2 von 8 (Q3, Q5).
Die anderen sechs weichen aus. Wer hier eine belegte Spanne nennt, hebt sich in diesem
Gewerk sofort ab. Details unter *Was wirklich differenziert*.

**3. „Wer steht dann wirklich auf meinem Dach, und muss ich mehrere Firmen koordinieren?"**
3 von 8 (Q3, Q5, Q7).
Q7: „ohne Subunternehmer, ohne Zwischenfirmen". Q3: „Mehrere Handwerker für ein Dach zu
koordinieren kostet Zeit und birgt die Gefahr, dass Gewerke nicht sauber zusammenpassen."
Q5: aus einer Hand „spart Zeit, Nerven und vor allem Geld".

**4. „Der meldet sich sowieso nicht zurück."** 3 von 8 (Q3, Q5, Q7).
Q7 verspricht Erreichbarkeit rund um die Uhr. Q3 gibt offen zu: „Telefonisch sind wir
wegen hoher Auslastung nicht immer sofort erreichbar" und bietet stattdessen einen
digitalen Weg mit Antwort am selben Werktag. Q5 kündigt Betriebsferien im Voraus an.

**5. „Muss wirklich alles neu, oder reicht eine Reparatur?"** 2 von 8 (Q3, Q6).
Q6: „Nicht jeder Dachschaden macht sofort eine komplette Sanierung erforderlich." Q3
trennt Reparatur und Sanierung im Leistungsangebot sauber.

**6. „Wie lange dauert das, und halten die den Termin?"** 2 von 8 (Q3, Q7).
Q3 arbeitet mit Zeitangaben: „Antwort meist am selben Werktag", „Reaktionszeit unter zwei
Stunden", im Kundenzitat „Dachfenster-Einbau in nur 2 Tagen". Q7 lässt es einen Kunden
sagen: „verlässlich und termingerecht gebaut".

**7. „Ich weiß gar nicht, wie ich mein Problem beschreiben soll."** 1 von 8 (Q3), dort
aber ausführlich: „Sie müssen noch nicht wissen, welches Gewerk betroffen ist. Wählen Sie
die Kategorie, die am ehesten passt, die fachliche Einordnung übernimmt der Meister."
Der Einwand tritt bei jedem Laien auf und wird sonst nirgends adressiert.

**8. „Ist mein Dach für Photovoltaik überhaupt geeignet?"**
Explizit adressiert: 1 von 8 (Q7). Dort steht die Prüfung des Dachs als eigener erster
Schritt vor der PV-Montage.
Photovoltaik oder Solartechnik überhaupt im Leistungsangebot: 4 von 8 (Q2, Q5, Q6, Q7).

## Typische Leistungen

Rohstoff für die Struktur, sortiert nach Häufigkeit in den acht Quellen.

**Kern, bei praktisch jedem Betrieb:** Steildach und Dacheindeckung · Flachdach und
Abdichtung · Dachsanierung · Dachreparatur · Dachfenster, Einbau und Austausch ·
Wärmedämmung · Dachrinnen und Dachentwässerung · Blech- und Klempnerarbeiten ·
Fassadenverkleidung.

**Häufig:** Dachbegrünung · Photovoltaik und Solartechnik · Zimmerei und Dachstuhl ·
Gauben · Dachwartung und Wartungsvertrag · Terrassen und Balkone · Carports und
Überdachungen · Sturmschaden und Notdienst.

**Seltener, als Spezialisierung erkennbar:** Absturzsicherung und Sekuranten (Q2, Q4) ·
Brandschutz (Q4) · Industriekletterer, Höhenarbeit ohne Gerüst (Q4) · Abbrucharbeiten
(Q4) · Fuhrpark-Vermietung mit Personal (Q4) · Rauchgasprüfungen für Flachdächer (Q2) ·
Asbest und Eternit (Q1, Q7) · Schieferarbeiten (Q1) · Schornstein- und Kaminverkleidung
(Q1, Q3) · Dachreinigung und Dachbeschichtung (Q1, Q3) · Hochwasserschutz (Q5) ·
Balkonkraftwerke (Q5) · Denkmalschutz und denkmalgeschützte Gebäude (Q4, Q6, Q7) ·
Schneefangsysteme (Q7) · Dachrinnenreinigung (Q3, Q8).

### Regionale Gewerkebezeichnung: Prüfpunkt, kein erhobenes Muster

Das Blechhandwerk am Dach heißt je nach Region anders, und die falsche Vokabel verrät eine
Demo sofort. **Jede Zeile unten ruht auf einer einzigen Quelle je Region**, außer
Dachklempner. Nach der Regel „n gleich eins ist kein Muster" ist das **kein Beleg für eine
regionale Sprachregel**, sondern eine Liste von Prüfpunkten: vor dem Texten nachsehen,
welches Wort der Kunde selbst benutzt, und dieses übernehmen.

| Bezeichnung | beobachtet bei | Region der Quelle |
|---|---|---|
| Bauflaschner, Flaschner | Q7 | Stuttgart |
| Spengler, Spenglerei | Q3 | München |
| Bauklempnerei | Q2 | Hamburg |
| Dachklempner, Dachklempnerei | Q4, Q6, Q8 | Leipzig, Dresden, Hannover |
| Klempnerarbeiten | Q5 | Köln |

Q7 führt beide Wörter nebeneinander: kundenseitig „Dachdecker- und
Flaschnermeisterbetrieb", beim Inhabertitel dagegen „Dachdecker und Klempnermeister". Der
amtliche Titel und das regionale Kundenwort fallen also auseinander. Im Fließtext das
Kundenwort nehmen, bei Titeln und Qualifikationen die amtliche Bezeichnung.

## Was in diesem Gewerk wirklich differenziert

Belegte Beispiele, das Gegenteil der Verbotsliste. Jeder Eintrag steht an einer oder zwei
der acht Seiten, genau das ist der Punkt.

| Beobachtet | Merkmal | Warum es trägt |
|---|---|---|
| bei Q3 | **Preistabelle mit Richtpreisen**: Dachsanierung inklusive Dämmung ab 235 €/m², Dachreparatur ab 195 €, Dachfenster inklusive Fenster ab 1.560 €, Dachrinne Zink ab 35 €/m, Flachdachabdichtung ab 60 €/m², Notdienst ab 300 €, gekennzeichnet als „Richtpreise für München 2026" | Beantwortet als einzige der acht Seiten die meistgestellte Frage. Die Kennzeichnung als Richtpreis hält es rechtlich sauber |
| bei Q3 | **Anfrage per Foto, Video oder Sprachnachricht**, ohne App und ohne Anmeldung, fünf Schritte, Abschluss mit „Dauert zwei Minuten. Die Telefonnummer ist freiwillig." | Nimmt dem Laien die Fachsprache ab, genau dort, wo sonst abgebrochen wird |
| bei Q3 | **Reaktionszeit als Zusage**: „Reaktionszeit unter zwei Stunden", „Antwort meist am selben Werktag", Notdienst rund um die Uhr | Überprüfbares Versprechen statt Adjektiv |
| bei Q3 und Q5 | **Drohneninspektion mit Preisschild**: 150 € brutto, bei Beauftragung vollständig angerechnet (Q3), detaillierter Zustandsbericht ab 179 € (Q5) | Macht aus einer unsichtbaren Leistung ein greifbares Produkt, die Anrechnung entschärft den Preis |
| bei Q5 | **Betriebsferien und Notdienst-Aufschlag offen im Seitenkopf**: „Betriebsferien vom 18.12.2025 bis 04.01.2026; Notdienst über Notfallnummer mit 125 % Aufschlag." | Unangenehme Information freiwillig vorab, wirkt stärker als jede Ehrlichkeits-Behauptung |
| bei Q7 | **CTA mit Inhalt statt Aufforderung**: „30 MINUTEN KOSTENFREI: EHRLICHE BERATUNG, KEIN VERKAUFSGESPRÄCH." | Sagt Dauer, Preis und Charakter des Termins in einer Zeile |
| bei Q7 | **„ohne Subunternehmer, ohne Zwischenfirmen"**, dazu das Inhaberpaar namentlich mit Rolle: Enis Colic, Dachdecker- und Klempnermeister, und Amela Colic, Büromanagement | Beantwortet, wer tatsächlich auf dem Dach steht. Ein Großbetrieb kann es nicht kopieren |
| bei Q6 | **Die Domain ist das Problem des Kunden**: `dachschaden.de`, dazu „DACHSCHADEN?" als Hero-Kicker | Merkfähig, und formuliert in der Sprache des Kunden statt in der des Gewerks |
| bei Q6 | **Standorte einzeln beschrieben**, drei davon mit Besetzung und Schwerpunkt: Berlin 15 Dachdecker mit Schwerpunkt Flachdach, Sehmatal 9 Zimmerer und Tischler plus 2 Auszubildende, Heidenau 15 Dachdecker | Statt „überregional tätig" steht dort nachprüfbar, wer wo sitzt |
| bei Q4 | **Leistungen, die kaum jemand hat**: Industriekletterer für „Höhenarbeit ohne Gerüst", Sekuranten, Brandschutz, Fuhrparkvermietung inklusive Personal | Schärfer als jedes „alles rund ums Dach", und spart dem Kunden zusätzlich das Gerüst |
| bei Q4 | **Karriere als gleichrangiger Hero-CTA** neben der Angebotsanfrage, die Karriere-Sektion duzt („Lust auf den besten Ausblick der Stadt?"), während der Rest der Seite siezt | Einzige der acht, die die zweite Zielgruppe oben bedient statt im Footer |
| bei Q2 | **Fachzertifikat über den Meisterbrief hinaus**: ZVDH-zertifizierter „Photovoltaik Manager im Dachdeckerhandwerk", eigene Zertifikate-Seite | Belegt Kompetenz genau dort, wo gerade die Nachfrage ist |
| bei Q1 | **Regionale Sprache als Marke**: „Ihr Dachdecker von de Waterkant", Slogan „we mok dat" | Kostet nichts, ist sofort wiedererkennbar, und ein Betrieb aus Kiel könnte es nicht behaupten |
| bei Q8 | **WhatsApp direkt im Seitenkopf**, dazu ein verlinktes Unternehmensvideo und „DachCheck & ServicePlus" als benanntes Produkt statt als Leistungsbeschreibung | Trifft den Kanal, den Hausbesitzer ohnehin nutzen. Ein benanntes Produkt lässt sich buchen, eine Leistung nur anfragen |

**Die größten ungenutzten Felder**, jeweils über diese acht Seiten:

1. **Preise für die eigentlichen Dachleistungen.** 1 von 8 (Q3).
   Zahlen nennt zwar auch Q5, aber nur für die Drohneninspektion und den
   Notdienst-Aufschlag, nicht für Sanierung, Reparatur oder Eindeckung.
2. **Bewertungen above the fold.** 1 von 8 (Q3), obwohl fast jeder Betrieb
   Google-Bewertungen hat.
3. **Ein Einstieg für Bewerber oben auf der Seite.** 1 von 8 (Q4), obwohl die
   Karriereseite bei den meisten in der Hauptnavigation steht, siehe Hero-Tabelle.
4. **Aufwandsangabe am CTA**, etwa „dauert zwei Minuten". 1 von 8 (Q3).
5. **Vorher/Nachher im Hero.** In diesen acht Heroes nicht vorhanden, im Gewerk aber
   belegt, siehe den Hinweis im Hero-Abschnitt. Damit ist es kein leeres Feld, sondern ein
   seltenes, und genau deshalb brauchbar.

**Warnung aus Q3:** Dieselbe Seite, die die stärksten Funde liefert, zeigt auch, was zu
weit geht. Die Angst-Rhetorik wird dort zum Dauerton („Jeder Tag ohne Lösung kostet Sie
Geld", „Warten kostet, Handeln spart", „Begrenzte Kapazitäten", „Jede Woche ohne
Reparatur kostet Sie Geld"), das Keyword „Dachdecker München" steht fettgedruckt in fast
jedem Absatz, und ein Hero-nahes Bild ist mit „Symbolbild, KI-generiert" beschriftet. Die
Mechanik übernehmen, den Ton nicht. Der Inhaber-Test aus `CLAUDE.md` fängt diese Sätze ab.
