---
description: Wertet gesammelte Rückmeldungen aus mehreren Demos aus und setzt daraus Template-Änderungen um, die beim nächsten Mal von selbst greifen.
---

# /auswerten – aus Korrekturen werden Entscheidungen

Läuft **in der Template-Session**, nicht in einer Demo. Bruno legt die
gesammelten Rückmeldungsdateien (aus `/closing`) bereit oder hängt sie an.

Ziel ist nicht ein Bericht. Ziel ist, dass **Bruno dieselbe Korrektur nie
wieder von Hand machen muss.**

## Schritt 1 – Zählen, nicht schätzen

```
node scripts/feedback-auswerten.mjs <pfad-zu-den-dateien>
```

Das Skript liefert Verteilungen und Muster ab zwei verschiedenen Demos.
**Ein Muster, das das Skript nicht zählt, gibt es nicht** – „mir ist
aufgefallen, dass" ist kein Befund.

Meldet es Befunde ohne Beleg: diese fallen aus der Auswertung. Ein unbelegter
Befund erzeugt sonst ein erfundenes Muster und am Ende eine Regel für ein
Problem, das es nie gab.

## Schritt 2 – Je Muster die Ursache prüfen, nicht übernehmen

Der `feedback-analyst` hat eine Ursache vorgeschlagen. Prüfe sie nach, bevor
du darauf aufbaust – besonders die Unterscheidung, auf die alles ankommt:

**Steht zu diesem Befund bereits eine Regel im Template?**
Durchsuche `CLAUDE.md`, die Skills, `docs/CHECKLISTE.md` und die Agents.

- **Regel gefunden** → `regel-ignoriert`. Eine weitere Regel wäre wertlos.
- **Keine Regel** → `regel-fehlt`. Erst jetzt ist neuer Text berechtigt.

Diese Prüfung ist der Grund, warum dieser Befehl existiert. Beide bisherigen
Retrospektiven kamen zum selben Ergebnis: Die Demos sind an Regeln
gescheitert, die längst dastanden. Wer darauf mit einer neuen Regel antwortet,
schreibt dieselbe Regel zum zweiten Mal auf und löst nichts.

## Schritt 3 – Die passende Lösungsart wählen

| Ursache | Lösung | **Nicht** |
|---|---|---|
| `regel-ignoriert` | **Gate**: Wert messen, Schwelle setzen, Lauf schlägt fehl | noch ein Absatz in CLAUDE.md |
| `regel-fehlt` | Regel im passenden Skill, plus Messpunkt in der Checkliste | Regel ohne Messpunkt |
| `information-fehlte` | **Pflichtfrage** in Phase 0 (`brief-analyst`) | hoffen, dass es auffällt |
| `geraten-statt-gefragt` | Abbruchbedingung: fehlt die Angabe, wird gefragt statt entschieden | Formulierungshinweis |
| `geschmack` | **Eintrag in `docs/PRAEFERENZEN.md`** ab 2 Demos – die Kalibrierung des `visual-critic` | eine Qualitätsregel aus einer Vorliebe machen |

### Der Test für jede Lösung

> **Greift sie von selbst, oder muss jemand daran denken?**

Eine Lösung, die verlangt, dass Bruno oder ein Agent sich erinnert, ist keine.
Das ist derselbe Fehler in neuer Verpackung.

| Greift von selbst | Muss erinnert werden |
|---|---|
| Skript bricht mit Fehler ab | Satz in einer Regeldatei |
| Pflichtfrage, ohne die die Phase nicht endet | Empfehlung im Skill |
| Messwert, der in der Checkliste eingetragen werden muss | „darauf achten, dass …" |

### `geschmack` ist nicht wertlos – er hat nur einen anderen Ausgang

Bis 2026.09.21 führte `geschmack` zu nichts. Das war falsch: Für den
`visual-critic`, der Gestaltung beurteilen soll, ist genau das die
wertvollste Information. Woher sonst soll ein Agent wissen, was Bruno stört?

Ab zwei Demos mit derselben Korrektur entsteht ein Eintrag in
`docs/PRAEFERENZEN.md`. **Zwei Regeln dabei** (stehen auch dort):

- **Keine Kundennamen.** Aus „bei Müller war der Button zu breit" wird
  „CTA-Buttons nicht über die volle Textbreite". Die Datei wandert in jedes
  neue Kundenrepo
- **Als Prüfpunkt formulieren**, nicht als Anekdote. Er muss beim Ansehen
  eines Screenshots entscheidbar sein

**Kein Eintrag ohne zwei Demos.** Und gilt einer über fünf Demos nie mehr,
kommt er auf den Prüfstand – ein Kritiker mit fünfzig Prüfpunkten meldet
fünfzig Befunde und wird dadurch wertlos.

### Beispiele

**„Hero-Bild war ein Stockfoto", 2 Demos, `regel-ignoriert`.**
Die Regel steht in `hero-craft`. Lösung: `hero-check.mjs` stuft Stockfoto-Pfade
von Warnung auf **Fehler** hoch. Die Phase kann nicht abgeschlossen werden,
solange es drin ist. Kein neuer Text.

**„Instagram-Feed fehlte", 2 Demos, `information-fehlte`.**
Claude konnte es nicht wissen. Lösung: Pflichtfrage in Phase 0 – „Gibt es
aktive Social-Media-Kanäle, und sollen sie eingebunden werden?" Damit wird es
zur Entscheidung statt zur Lücke.

## Schritt 4 – Umsetzen und verbuchen

Änderungen umsetzen, dann wie bei jeder Template-Änderung (CLAUDE.md §12):
`TEMPLATE-VERSION` hochzählen, Eintrag in `docs/CHANGELOG.md`.

**Der Anlass nennt die Demos.** Nicht „ist aufgefallen", sondern
„3 von 7 Demos: Mustermann, Schulze, Peters". Damit ist jede Regel im Template
auf konkrete Fälle zurückführbar und beim nächsten Aufräumen nicht mehr als
„unnötig streng" entfernbar.

## Schritt 5 – Die Trefferquote des `visual-critic`

Die Rückmeldungen enthalten, was Bruno kritisiert hat. Die Berichte des
`visual-critic` (aus `.visual-check/`, sofern in der Rückmeldung vermerkt)
enthalten, was der Agent **vorher** gemeldet hat. Der Abgleich beantwortet die
einzige Frage, die über seinen Wert entscheidet:

> Wie viele von Brunos Befunden hatte der Agent schon gefunden?

- **Hohe Quote** → er wirkt, die Kalibrierung stimmt
- **Niedrige Quote** → nicht der Agent ist schuld, sondern die Kalibrierung.
  Die wiederholt übersehenen Punkte gehören nach `docs/PRAEFERENZEN.md`
- **Er meldet viel, Bruno kritisiert anderes** → er sucht am falschen Ort.
  Prüfliste im Agenten schärfen, nicht verlängern

So wird aus „hoffentlich taugt er etwas" eine Zahl. Ohne diesen Abgleich ist
der `visual-critic` eine Behauptung.

## Schritt 6 – Prüfen, ob die letzte Runde gewirkt hat

Vor dem Abschluss: Befunde, die in einer früheren Auswertung eine Lösung
bekommen haben – tauchen sie in den neuen Rückmeldungen wieder auf?

- **Verschwunden** → die Lösung wirkt. Im Changelog vermerken.
- **Weiter da** → die Lösung war die falsche Art. Dann **nicht** dieselbe
  Lösung verschärfen, sondern die Art wechseln: aus Text wird ein Gate, aus
  einem Gate eine Pflichtfrage.

Eine Lernschleife ohne diese Prüfung optimiert ins Leere.

## Grenzen, offen benannt

- **Zwei Demos sind ein Hinweis, kein Beweis.** Bei kleiner Zahl lieber ein
  Messpunkt als eine harte Regel.
- **Das Skript gruppiert über Titelwörter.** Zwei verschieden benannte Befunde
  zum selben Thema findet es nicht. Beim Lesen gegenprüfen.
- **Geschmack ist kein Fehler.** Häuft sich eine Vorliebe über viele Demos,
  ist sie eine Präferenz – dann gehört sie dokumentiert, nicht als Qualitäts-
  regel verkleidet.
