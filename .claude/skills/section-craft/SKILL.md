---
name: section-craft
description: >
  Handwerk für die Sektionen unterhalb des Heros: Muster-Typologie statt
  Kachelraster, Rhythmus über die ganze Seite, Anatomie einer Sektion,
  Zäsuren und Übergänge, messbare Abnahme. Nutzen, sobald eine Sektion
  konzipiert, getextet oder gebaut wird. Welche Sektionen es überhaupt gibt,
  entscheidet der Agent structure-architect; wie eine davon aussieht, steht hier.
---

# Section-Craft

`hero-craft` deckt die eine Sektion ab, die jeder sieht. Diese Datei deckt die
zehn ab, die darunter kommen – und dort entsteht der Eindruck „generisch",
„statisch", „Kachelwüste".

**Arbeitsteilung:** Der `structure-architect` entscheidet **welche** Sektionen
in **welcher Reihenfolge**. Diese Datei entscheidet, **wie eine einzelne
aussieht** und **wie die Folge sich anfühlt**. Den Text liefert `website-copy`,
die Bewegung `motion-toolkit`.

## Die zwei Tests

**Der Streich-Test** – gegen Füllmaterial:
> Diese Sektion ersatzlos löschen. Fehlt dem Besucher danach etwas, das er für
> seine Entscheidung braucht? Wenn nein: raus, nicht kürzen.

Eine Seite mit sechs Sektionen, die tragen, schlägt eine mit elf, von denen
fünf nur Fläche füllen. „Über uns", „Unsere Werte" und „Warum wir" sind
zusammen meistens eine Sektion, oft keine.

**Der Blätter-Test** – gegen Monotonie:
> Die Seite auf 25 % zoomen und durchscrollen, ohne zu lesen. Wiederholt sich
> eine Form drei Mal? Sieht der Streifen zwischen Hero und Footer aus wie eine
> Liste gleich hoher grauer Blöcke? Dann ist die Seite austauschbar, egal wie
> gut der Text ist.

Das ist der Test, den beide bisherigen Demos nicht bestanden haben. „Statisch,
weichgewaschen" ist die Antwort eines Betrachters auf den Blätter-Test, nicht
auf den Inhalt.

## 1. Muster-Typologie – Karten sind eine Option von elf

Der Reflex bei jedem Inhalt ist ein Raster aus Icon + Überschrift + drei Zeilen.
Das ist die Form, an der KI-Layout erkannt wird. Es folgen die Alternativen.
**Das Muster folgt aus der Beziehung der Inhalte zueinander**, nicht aus
Gewohnheit.

| Muster | Passt, wenn | Breite | Achtung |
|---|---|---|---|
| **Asymmetrischer Zweispalter** | Ein Gedanke plus ein Bild, das ihn belegt | Text / `.breakout` | `align-items: center`, sonst tote Fläche |
| **Randloses Bildband** | Das Werk spricht selbst | `.full` | Nur eigene Fotos |
| **Gewichtete Liste** | Ein Punkt ist wichtiger als der Rest | `.breakout` | Der erste bekommt Fläche, die anderen eine Zeile |
| **Vergleich / Gegenüberstellung** | Zwei Wege, zwei Zustände, vorher/nachher | `.breakout` | Nie gegen Wettbewerber, nur gegen Zustände |
| **Fließtext mit ausbrechendem Zitat** | Eine Geschichte, eine Haltung | Text + `.breakout` | Zitat braucht Gesicht und Quelle |
| **Ablauf / Stationen** | Es gibt **wirklich** eine Reihenfolge | `.breakout` | Ohne echte Sequenz keine Nummern (01/02/03) |
| **Galerie-Raster** | Die Elemente sind tatsächlich gleichwertig | `.breakout` | Höchstens einmal je Seite |
| **Zahlenleiste** | Zahlen aus **einer** Logik | `.breakout` | Jede Zahl trägt ihren Bezug im Label |
| **Akkordeon / FAQ** | Echte Einwände, nicht erfundene Fragen | Text | Erste Frage offen, sonst wirkt es leer |
| **Werkzeug** (Rechner, Konfigurator) | Es existiert und funktioniert | `.breakout` oder `.full` | Der stärkste Differenzierer im Gewerk |
| **Farbschnitt / Zäsur** | Die Seite braucht einen Atemzug | `.full` | Trägt Inhalt, ist kein Deko-Streifen |

**Karten sind richtig**, wenn die Elemente gleichwertig sind, einzeln
anklickbar und in beliebiger Reihenfolge lesbar. Das trifft auf Leistungen und
Referenzen zu – und selten sonst.

## 2. Rhythmus – die Regel, die den Blätter-Test besteht

Einzelne Sektionen können alle richtig sein und die Seite trotzdem monoton.
Rhythmus ist eine Eigenschaft der **Folge**.

- **Kein Muster zweimal hintereinander.** Zwei Kartenraster in Folge sind ein
  Kartenraster mit Zwischenüberschrift.
- **Die Breite wechselt.** Nicht jede Sektion auf Textbreite, nicht jede auf
  `.breakout`. Mindestens ein `.full` je Seite ist Pflicht (CLAUDE.md §7).
- **Höhe variiert.** Eine kurze Sektion nach einer langen ist ein Absatz. Fünf
  gleich hohe Sektionen sind eine Tabelle.
- **Höchstens zwei Dreiergruppen je Seite.** Und nie angekündigt („Drei Dinge
  sind uns wichtig") – das macht die erzwungene Struktur explizit.
- **Der Grund wechselt, aber nicht jedes Mal.** Zwei bis drei farbige oder
  dunkle Flächen je Seite setzen Zäsuren. Abwechselnd hell/dunkel über acht
  Sektionen ist ein Zebrastreifen.

**Ein Rhythmusplan gehört ins Konzept**, nicht in die Nachbesserung. Eine
Tabelle im Phase-2a-Entwurf, eine Zeile je Sektion:

| # | Sektion | Muster | Breite | Grund | Höhe |
|---|---|---|---|---|---|
| 1 | Hero | (hero-craft) | `.full` | dunkel | groß |
| 2 | Leistungen | gewichtete Liste | `.breakout` | hell | mittel |
| 3 | Referenzen | Bildband | `.full` | Bild | groß |
| … | | | | | |

Wiederholt sich in einer Spalte derselbe Wert dreimal in Folge, wird umgebaut.

## 3. Anatomie einer Sektion

Nicht jede Sektion braucht alle Teile, aber die Reihenfolge steht fest:

1. **Kicker** – wo bin ich. Kurz, kein ganzer Satz.
2. **H2 – eine Aussage, keine Bezeichnung.** „Dach neu, in einer Woche, ohne
   Gerüstwochen" statt „Unsere Leistungen". Ein Etikett verschenkt die
   auffälligste Zeile der Sektion.
3. **Lead** – ein bis zwei Sätze, die die H2 einlösen. Optional.
4. **Inhalt** – das Muster aus Abschnitt 1.
5. **Abschluss** – der nächste Schritt. **Jede Leistungssektion endet mit einer
   Handlungsaufforderung**, nicht mit einem Preishinweis oder einem
   Vertröstungssatz (CLAUDE.md §9).

**Ein Gedanke je Sektion.** Braucht die H2 ein „und", sind es zwei Sektionen
oder eine falsche H2.

## 4. Übergänge und Zäsuren

- **Nur eine Seite polstert.** Zwischen zwei Sektionen setzt entweder die obere
  `padding-block-end` oder die untere `padding-block-start` – nie beide. Sonst
  addieren sich die Abstände zu einem Loch.
- **Ein Farbwechsel ist schon ein Übergang.** Läuft die Sektion auf farbigem
  Grund randlos durch, braucht sie oben und unten keine zusätzliche Trennlinie.
- **Keine dekorativen Wellen, Schrägen oder Blob-Formen** zwischen Sektionen.
  Das ist Baukasten-Optik und datiert die Seite sofort.
- **Die Zäsur trägt Inhalt.** Ein farbiger Streifen, in dem nur ein Satz steht,
  ist in Ordnung – wenn der Satz etwas leistet. Ein leerer Streifen ist Deko.

## 5. Zustände sind Pflicht, nicht Kür

„Statisch" ist meistens wörtlich gemeint: Nichts auf der Seite reagiert.

- **Hover auf allem Anklickbaren und auf jeder Inhaltskachel.** Ohne Feedback
  wirken Textkacheln tot.
- **Sichtbarer Fokus** auf allem, was per Tastatur erreichbar ist. Der
  Browser-Default darf nicht wegretuschiert werden.
- **Aktiver Zustand** bei allem, was gedrückt wird – der Moment zwischen Klick
  und Reaktion entscheidet, ob sich eine Seite gebaut anfühlt.
- **Bewegung ist sparsam und hat einen Grund** (Skill `motion-toolkit`). Jede
  Sektion einzeln einzublenden ist kein Konzept, sondern ein Standardeffekt.

## 6. Bilder in Sektionen

- **An jeder Entscheidungsstelle ein Bild.** Bereichsauswahl, Zitat, Referenz.
  Ein Zitat ohne Gesicht ist Schmucktypografie.
- **Kein Bild ohne Bezug.** Ein Stockfoto als Beleg für die Arbeit des Betriebs
  ist eine Falschaussage in Bildform (CLAUDE.md §3).
- **Keine selbstgezeichnete Grafik als Ersatz** für ein Foto. Sie wirkt immer
  wie ein Platzhalter. Lieber ein ehrlich gekennzeichneter Bildplatz.
- **Bildformat variieren.** Acht Bilder im selben 3:2-Rahmen sind ein Raster,
  auch wenn drumherum kein Kartenrand liegt.
- **Fehlt ein Asset:** Struktur bauen, die auch ohne trägt, und den fehlenden
  Pfad im Hinweiskasten nennen (CLAUDE.md §6).

## 7. Abnahme

Gemessen über `node scripts/layout-check.mjs site/<datei>.html`, Inhaltliches über
`node scripts/copy-check.mjs site/<datei>.html`. Ein Haken ohne Wert gilt als nicht
geprüft.

- [ ] **Streich-Test** je Sektion bestanden
- [ ] **Blätter-Test** bestanden (auf 25 % gezoomt durchgescrollt)
- [ ] Rhythmusplan vorhanden, kein Wert dreimal in Folge in einer Spalte
- [ ] Mindestens ein `.full` je Seite: ______
- [ ] Ungenutzter Rand je Sektion **mit Bildern/Karten** auf 1920:
      max ______ px (Grenze ~200). Reiner Fließtext bleibt auf Lesebreite,
      das ist kein Befund – aber nicht jede Sektion darf Fließtext sein
- [ ] Dreiergruppen je Seite: ______ (max. 2)
- [ ] Jede H2 ist eine Aussage, keine Bezeichnung
- [ ] Jede Leistungssektion endet mit einer Handlungsaufforderung
- [ ] Hover auf allem Anklickbaren und auf Inhaltskacheln: ______ ohne
- [ ] Sichtbarer Fokus vorhanden
- [ ] Keine zwei gleichen Muster in Folge
- [ ] Zwischen zwei Sektionen polstert nur eine Seite
- [ ] Jede Zahl trägt ihren Bezug im Label und steht genau einmal je Seite

**Grenze der Messung:** Die Werte fangen zuverlässig das Schlechte. Ob eine
Sektion etwas leistet, entscheidet der Streich-Test – und der ist Handarbeit.
