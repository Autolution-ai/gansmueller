---
description: Demo ist closing-bereit – erzeugt parallel die Rückmeldung (intern) und das Vertriebs-Briefing (für den Closing-Call) und liefert beide aus.
---

# /closing – Demo freigeben, zwei Dokumente erzeugen

Bruno sagt: die Demo ist closing-bereit. Ab hier läuft alles ohne ihn.

**Keine Rückfragen.** Sein Beitrag war die Korrektur der Demo, nicht das
Ausfüllen von Formularen.

Es entstehen **zwei Dokumente zum selben Zeitpunkt, für zwei verschiedene
Leser** – deshalb zwei getrennte Agenten:

| Dokument | Für wen | Blickrichtung |
|---|---|---|
| **Rückmeldung** | Bruno, für die Lernschleife | nach innen: was musste korrigiert werden und warum |
| **Vertriebs-Briefing** | den Vertriebler im Closing-Call | nach außen: was kann er zeigen und sagen |

Dieselbe Rolle könnte beides nicht ehrlich schreiben: Das eine sucht Fehler,
das andere Stärken.

## Ablauf

1. **Stand sichern.** Offene Änderungen committen und pushen, damit der
   closing-Stand eindeutig ist.

   Dabei zwei Zeilen vergleichen:

   ```bash
   cat TEMPLATE-VERSION DEMO-TEMPLATE-SYNC
   ```

   Steht `TEMPLATE-VERSION` **über** dem Wert in `DEMO-TEMPLATE-SYNC`, ist das
   `Live-Template` nicht auf dem Stand dieser Demo. Das in Schritt 4 melden.
   Jetzt ist der richtige Moment dafür: Beim Vertragsabschluss läuft
   `live-start.mjs`, und der meldet es sonst mitten im Projektstart. Nichts
   geht verloren, aber dort kostet es Zeit, die niemand hat.

2. **Beide Agenten parallel starten** – sie sind voneinander unabhängig:

   - **`feedback-analyst`** → `.closing/<JJJJ-MM-TT>-<kunde>-rueckmeldung.md`
     Liest Chat-Verlauf und Git-Diff (`demo-v1..HEAD`, sonst den ersten
     Bau-Commit aus `git log` ableiten **und im Dokument benennen**). Je Befund
     ein wörtlicher Beleg und eine Ursache.

   - **`vertriebs-briefing`** → `.closing/<JJJJ-MM-TT>-<kunde>-vertrieb.md`
     Liest die **gebaute Seite**, `docs/DEMO-SPEC.md`, `docs/DOSSIER.md` und
     die Branchendatei des Gewerks. Prüft jede Besonderheit gegen das, was
     wirklich drin ist.

3. **Beide an Bruno ausliefern** mit `SendUserFile`. Steht das Tool nicht zur
   Verfügung: beide Inhalte vollständig im Chat ausgeben. Die Session ist
   vergänglich – eine Datei, die nur im Container liegt, ist verloren.

4. **Kurz melden:** wie viele Befunde in der Rückmeldung, welche Ursache
   überwiegt, und wie viele Besonderheiten im Briefing stehen. Drei Sätze,
   keine Wiederholung der Dokumente. Dazu, falls Schritt 1 es ergeben hat, ein
   Satz: Das Live-Template steht auf `<Wert>`, diese Demo auf `<Wert>`.

## Beides gehört nicht ins Repo

Der Ordner `.closing/` ist gitignoriert. Zwei Gründe, beide ernst:

- **`demo-template` ist ein GitHub-Template.** „Use this template" kopiert
  **alle** Dateien des Default-Branches. Läge hier eine Sammlung, bekäme jeder
  neue Kunde die Kritik und Vertriebsunterlagen zu allen anderen Kunden
  mitgeliefert. Einzelne Dateien lassen sich davon nicht ausnehmen.
- **Das Demo-Repo kann beim Kunden landen.** Ein Vertriebsbriefing über ihn,
  das er selbst lesen kann, ist unangenehm – und die Rückmeldung mit interner
  Kritik erst recht.

**Vor dem ersten Lauf prüfen, ob `.closing/` in `.gitignore` steht.** Fehlt der
Eintrag, wird er ergänzt, bevor irgendetwas erzeugt wird. Eine Datei, die erst
entsteht und dann versehentlich committet wird, ist nicht zurückzuholen.

## Was Bruno damit macht

Das **Briefing** geht an den Vertriebler, zusammen mit dem Demo-Link.

Die **Rückmeldungen** sammelt er und gibt sie in der Template-Session weiter.
Dort laufen sie durch `/auswerten`: Muster über mehrere Demos finden, und aus
den Mustern werden Messpunkte und Gates im Template – damit dieselbe Korrektur
beim nächsten Kunden nicht noch einmal von Hand nötig ist.
