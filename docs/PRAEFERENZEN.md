# PRÄFERENZEN – was Bruno wiederholt korrigiert hat

**Nicht deployen. Unsichtbar für den Kunden.**

Diese Datei ist die **Kalibrierung des `visual-critic`** und die Antwort auf
eine einfache Frage: Woher soll ein Agent wissen, was Bruno stört?

Aus den Rückmeldungen. Jede Demo erzeugt über `/closing` ein Dokument mit
Brunos wörtlicher Kritik. Was sich dort über mehrere Demos wiederholt, landet
hier – und der `visual-critic` liest es, bevor er urteilt.

**Die Datei wird nicht von Hand gepflegt.** Sie entsteht über `/auswerten` aus
den gesammelten Rückmeldungen. Ein Eintrag, den niemand belegen kann, gehört
nicht hierher.

---

## Wie ein Eintrag entsteht

In `/auswerten` bekommt jeder Befund eine Ursache. Vier davon führen zu Gates,
Regeln oder Pflichtfragen im Template. Die fünfte – **`geschmack`** – führte
bisher zu nichts, und das war ein Fehler: Für einen Agenten, der Gestaltung
beurteilen soll, ist genau das die wertvollste Information.

Ein Eintrag entsteht, wenn dieselbe Korrektur in **mindestens zwei Demos**
vorkommt. n=1 ist ein Einzelfall, kein Muster.

## Zwei Regeln beim Destillieren

**Keine Kundennamen.** Die Rückmeldung sagt „bei Müller Dachdecker war der
Button zu breit". Hier steht: „CTA-Buttons nicht über die volle Textbreite."
Die Datei wandert per „Use this template" in jedes neue Kundenrepo – sie darf
nichts über andere Kunden verraten.

**Als Prüfpunkt formulieren, nicht als Anekdote.** Ein Eintrag muss beim
Ansehen eines Screenshots entscheidbar sein. „Bruno mag es aufgeräumter" ist
unbrauchbar. „Zwischen zwei Sektionen höchstens ein Element polstern, nie
beide" ist prüfbar.

---

## Einträge

<!-- Von /auswerten zu füllen. Format:

### P1 – <Prüfpunkt in einem Satz>
- **Belegt durch:** <n> Demos
- **Ursprüngliche Kritik:** „<wörtliches Zitat, ohne Kundennamen>"
- **Woran erkennbar:** <was der visual-critic im Screenshot sehen muss>
- **Seit:** <TEMPLATE-VERSION>

-->

*Noch leer. Entsteht ab der zweiten ausgewerteten Rückmeldung.*

---

## Was hier nicht hingehört

- **Handwerksregeln**, die allgemein gelten – die stehen in `section-craft`,
  `hero-craft` und `design-system`. Hier steht nur, was **darüber hinaus** an
  Brunos Urteil hängt
- **Einmalige Entscheidungen** eines Projekts („bei diesem Kunden sollte das
  Grün dunkler sein") – das ist keine Präferenz, sondern eine Projektfrage
- **Regelverletzungen.** Wenn eine Regel im Template steht und ignoriert wurde,
  ist ein Gate im Skript die richtige Antwort, kein Eintrag hier

## Warum das nicht ausufern darf

Ein `visual-critic`, der fünfzig Prüfpunkte abarbeitet, meldet fünfzig Befunde
und wird dadurch wertlos. **Gilt ein Eintrag über fünf Demos hinweg nie mehr,
kommt er auf den Prüfstand** – dieselbe Regel wie beim Regel-Verfall in
`docs/LERNSCHLEIFE.md`.
