---
name: hero-craft
description: >
  Handwerk für den Hero-Bereich einer Website: Hero-Typologie, Hintergrund-
  Strategien gegen den generischen Weichzeichner-Look, Bausteinformel, Längen
  und messbare Abnahmekriterien. Nutzen, sobald ein Hero konzipiert, getextet,
  gebaut oder bewertet wird. Der Prozess dazu steht im Agent hero-specialist,
  das Urteil beim hero-critic.
---

# Hero-Craft

Der Hero ist die einzige Sektion, die **jeder** Besucher sieht. Wenn er nicht
sitzt, ist der Rest der Seite egal. Diese Datei ist das Handwerk – wann welcher
Hero-Typ, welcher Hintergrund, welche Längen, und woran man Scheitern misst.

## Die zwei Tests, die alles entscheiden

**Der Austauschbarkeits-Test** – gegen Beliebigkeit:
> Logo abdecken. Könnte dieser Hero einem Wettbewerber im selben Gewerk
> gehören? Wenn ja: nicht fertig.

**Der Inhaber-Test** – gegen Pose (siehe `website-copy`):
> Würde der Chef diesen Satz einem Kunden laut ins Gesicht sagen, ohne dass es
> ihm unangenehm ist? Wenn nein: raus.

Beide sind aus echten Verlusten entstanden. Eine Demo scheiterte an „Noch ist
es so wie jeder andere", eine an „Ich bin ein bisschen abgehoben". Der erste
Test fängt das eine, der zweite das andere.

## 1. Hero-Typologie – erst entscheiden, dann formulieren

Kein Schema-F. Der Typ folgt aus dem Dossier (`docs/DOSSIER.md`), nicht aus
Gewohnheit.

| Typ | Wann | Voraussetzung |
|---|---|---|
| **Leistung + Ort** | Lokale Suchintention, Leistung ist erklärungsarm | Ort und Gewerk klar |
| **Ergebnis** | Der Besucher will ein Ergebnis, keine Leistung | Ergebnis benennbar |
| **Problem-Umkehr** | Akuter Schmerz: Notdienst, Wasserschaden, Leck | Der Schmerz ist eindeutig |
| **Person / Gesicht** | Personenmarke, Einzelunternehmer, „es ist ja meins" | Porträt vorhanden |
| **Beweis** | Visuelles Gewerk – das Werk spricht selbst | Starke eigene Projektfotos |
| **Werkzeug** | Ein Rechner/Konfigurator existiert | Das Werkzeug ist gebaut |

Der **Werkzeug-Typ** ist der stärkste Differenzierer, wenn er möglich ist: Ein
Badrechner im Hero schlägt jede Headline, weil kein Wettbewerber ihn hat.

## 2. Hintergrund – hier entsteht „generisch, weich, langweilig"

**Die eigentliche Ursache** ist fast immer derselbe Reflex: Text liegt auf einem
Foto, ist nicht lesbar, also kommt ein weißer Schleier über das **ganze** Bild.
Ergebnis: Foto tot, Kontrast weg, alles milchig. Das ist kein Geschmacks-
problem, sondern ein falsch gelöster Zielkonflikt.

**Strategien statt Schleier:**

| Strategie | Wann | Achtung |
|---|---|---|
| Foto + **gerichteter** Scrim | Starkes Motiv vorhanden | Verlauf nur auf der Textseite, nicht flächendeckend |
| **Split**: Text auf Farbfläche, Bild daneben | Immer möglich, sehr kantig | Kein Lesbarkeitskompromiss nötig |
| Solide Markenfläche, Typo trägt | Starke CI, schwaches Bildmaterial | Verlangt echte typografische Arbeit |
| Video-Loop + Standbild darunter | Video existiert **wirklich** | Standbild muss allein tragen |
| Werk-Collage / Bildband | Viele echte Projektfotos | Nur eigene Fotos, keine Stockbilder |
| Material / Textur (Ziegel, Alu, Holz) | Handwerk, Materialnähe | Sparsam, sonst Deko |
| Interaktives Element als Anker | Rechner/Konfigurator existiert | Muss funktionieren, nicht nur aussehen |

**Verboten:**
- Ganzflächiges helles Overlay über dem Bild (der Weichzeichner)
- Stockfoto ohne Bezug zum Betrieb – erkennbar am URL-Pfad (`/unsplash/`)
- Selbstgezeichnete Grafik als Ersatz für ein echtes Foto
- Purple-Gradient, generisches Hero mit rundem Avatar

## 3. Die Bausteinformel

Reihenfolge aus der Referenzanalyse (drei Seiten, identisch aufgebaut):

1. **Trust-Zeile ÜBER der Headline** – Bewertung, Sterne, Anzahl.
   **Mit Link zur Quelle**, sonst ist es eine Behauptung.
2. **Eyebrow / Kicker** – hier gehören Kategorie + Ort hin (Slot-Regel, siehe
   `website-copy`), nicht in die Headline.
3. **Aussage-Headline** – das, was nur dieser Betrieb sagen kann.
4. **Sub** – wer, was, für wen, in ein bis zwei Sätzen.
5. **Ein primärer CTA, mit dem Aufwand im Button.** Zweizeilig:
   „Jetzt Kontakt aufnehmen" / „Ihre Anfrage in unter 60 Sekunden".
   Der Aufwand gehört in den Button, nicht daneben.
6. **Beleg direkt darunter** – Partnerlogos, Zertifikate, Innung.

Bei **zwei Zielgruppen**: Ist das Hauptziel schon durch Header-CTA und einen
eigenen Abschnitt abgedeckt, gehört der primäre Hero-CTA der **zweiten**
Zielgruppe. Sonst hat sie keinen Einstieg. Nie beide in einen Satz pressen –
„…und für Ihr Bauvorhaben ist trotzdem jemand da" macht den Kundentermin zum
Entgegenkommen.

## 4. Längen – gemessen an echten Seiten

| Referenz | Headline | Urteil |
|---|---|---|
| energie-fischer.de | 61 Zeichen | gut |
| m-dach.com | 72 Zeichen | gut |
| alu-factory.com | **139 Zeichen**, Ort zweimal enthalten | Keyword-Stuffing, bricht das Layout |

**Arbeitsbereich: Headline 4–9 Wörter. Sub höchstens zwei Sätze.**

## 5. Woran „flau" messbar wird

Taste ist nicht messbar, die Symptome von „weichgewaschen" schon. `scripts/hero-check.mjs`
misst diese Werte; sie sind Ausschluss-, keine Qualitätskriterien:

| Messwert | Grenze | Fängt |
|---|---|---|
| Kontrastumfang im Hero | Spanne < 60 % | Milchige Heros |
| Typo-Spannweite (H1 ÷ Fließtext) | < 2,5 | Fehlende Hierarchie |
| Ganzflächiges Overlay, opacity 0,3–0,8 | vorhanden | **Den Weißschleier-Reflex** |
| Hero-Breite auf 1920 | nicht `.full` | Die schmale Mittelspalte |
| Hero-Höhe auf 1440×900 / 1512×982 | abgeschnitten | Den „Hero-Slideshow abgeschnitten"-Fehler |
| Interaktive Zustände | keine | „statisch, weichgewaschen" |

**Grenze der Messung:** Ein Hero kann alle Werte bestehen und trotzdem schwach
sein. Die Messung killt zuverlässig das Schlechte, sie erzeugt nicht das Gute.
Dafür sind der `hero-critic` und Brunos Auge da.

## 6. Abnahme

- [ ] **5-Sekunden-Test:** Wer ist das, was bietet er, für wen, was soll ich
      tun? Vier Antworten oder durchgefallen
- [ ] **Austauschbarkeits-Test** bestanden
- [ ] **Inhaber-Test** über jeden Satz
- [ ] Kategorie + Ort stehen above the fold (im Kicker, nicht in der Headline)
- [ ] Hero vollständig sichtbar auf 1440×900 **und** 1512×982, gemessen
- [ ] Eigener Entwurf für 390 px – nicht dieselben Elemente kleiner
- [ ] Zweite Zielgruppe hat einen sichtbaren Einstieg
- [ ] Trust-Element above the fold, **mit Quelle verlinkt**
- [ ] Jedes eingeplante Asset existiert als Datei (Dossier, Abschnitt 5)
- [ ] Hero trägt ohne JS; `prefers-reduced-motion` lässt nichts unsichtbar
- [ ] Kein Layout-Shift durch Hinweisbanner (Hinweise stehen beim Inhalt)

## Negativliste – echte Fundstellen

Aus der Referenzanalyse, als Warnung. Alle drei Seiten sind erfolgreich und
machen es trotzdem so:

| Fundstelle | Problem |
|---|---|
| „Ihr Partner für Sanitär, Heizung und Solartechnik in Chemnitz" | Headline an die Formel verschenkt (Slot-Regel) |
| H1 mit „Ingersleben" zweimal, 139 Zeichen | Keyword-Stuffing |
| „100 % Kundenorientierung und Zufriedenheit" | Kennzahl ohne Aussage – was soll der Besucher schließen? |
| „Persönlich. Zuverlässig. Vor Ort." | Stakkato-Dreier (siehe `anti-slop`) |
| Leistungen nummeriert 01–05 ohne Ablauf | Nummerierung ohne sequenziellen Grund |
| Zwei verschiedene Adressen auf einer Startseite | Fehlende Widerspruchsprüfung |
