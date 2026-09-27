---
description: Legt eine Branchendatei für ein Gewerk an oder frischt sie auf (Wettbewerbsrecherche, einmalig statt pro Demo).
---

# /branche <gewerk>

Erstellt oder aktualisiert `.claude/skills/branchen-wissen/references/<gewerk>.md`.

Diese Recherche wird **einmal pro Gewerk** gemacht, nicht pro Demo. Sie ist
die Grundlage für den Austauschbarkeits-Test: Man kann nicht vermeiden,
beliebig zu sein, wenn man nicht weiß, was die anderen sagen.

## Ablauf

**1. Prüfen, ob die Datei schon existiert.**
Gibt es sie und ist sie jünger als zwölf Monate: Bruno fragen, ob wirklich
aufgefrischt werden soll. Sonst weiter.

**2. Fünf bis acht echte Betriebsseiten des Gewerks scrapen** (Apify).
- Keine Verzeichnisse (Gelbe Seiten, MyHammer, Herstellerportale), nur
  Betriebe mit eigener Website.
- Regional streuen, nicht fünf Betriebe aus derselben Stadt.
- **URLs nie konstruieren.** Sie stammen aus einer Suche oder von Bruno.
- Auffällig ähnliche Seiten kennzeichnen: Stammen mehrere von derselben
  Agentur (Footer-Zeile „Konzept & Umsetzung von …"), sind Übereinstimmungen
  zwischen ihnen **kein** Beleg für ein Branchenmuster, sondern nur für
  dieselbe Vorlage.

**3. Auffrischen ist additiv, nicht ersetzend.**
Eine bestehende Datei wird nicht überschrieben. Die alten Quellen behalten
ihre Nummern, neue werden hinten angehängt. Nur so bleibt sichtbar, was sich
tatsächlich verändert hat und was nur eine andere Stichprobe ist. Eine alte
Quelle wird ausschließlich dann entfernt, wenn die Seite nachweislich offline
ist oder der Betrieb das Gewerk gewechselt hat – mit Notiz in der Datei.

Ändert sich dadurch die Grundgesamtheit, werden **alle** „X von N" der Datei
neu gezählt, nicht nur die der neuen Quellen. Eine Zahl, die für n=8 stimmte,
ist bei n=12 falsch.

**4. Destillieren, nicht sammeln.** Rohes Seitenmaterial gehört nicht in die
Datei. Was hinein gehört, steht in der Gliederung unten.

**5. Datei schreiben** mit Stand-Datum, Quellentabelle und Q-Notation (siehe
unten).

**6. `node scripts/branchen-check.mjs <datei>` laufen lassen, bis 0 Fehler.**
Das ist kein optionaler Schluss-Check, sondern die Abnahme. Solange der Prüfer
Fehler meldet, ist die Datei nicht fertig.

**Was der Prüfer nicht kann:** Er rechnet nach, ob die Zahlen zu den genannten
Markern passen. Ob die Quelle das wirklich sagt, prüft er nicht. Marker
ergänzen, um grün zu werden, ist deshalb der schlimmste mögliche Fehler – er
macht eine Erfindung maschinell bestätigt. Wer einen Beleg nicht belegen kann,
**streicht die Aussage**.

**7. Index ergänzen** in `.claude/skills/branchen-wissen/SKILL.md`.

## Quellen-Notation (Pflicht)

Ohne sie ist keine einzige Zahl der Datei nachrechenbar. Jede Quelle bekommt
eine Nummer, jede Behauptung nennt die Nummern, auf denen sie steht.

```markdown
**Stand:** 2026-09-11 · **Ausgewertet:** 8 Betriebsseiten

| Nr. | URL | Ort | Art |
|---|---|---|---|
| Q1 | `https://…` | Kiel | eigene Seite |
| Q2 | `https://…` | Erfurt | Agenturvorlage (Footer: …) |
```

Regeln dazu:

- **Jede Zahlenaussage trägt ihre Marker.** „5 von 8 zeigen ein Kachelraster
  (Q1, Q3, Q4, Q6, Q7)" – nicht „5 von 8 zeigen ein Kachelraster".
- **N ist überall dieselbe Zahl** und entspricht der Zeilenzahl der Tabelle.
  Teilmengen werden ausgeschrieben statt die Bezugsgröße zu wechseln: „4 der
  6 Seiten mit eigenem Fotomaterial (Q…)".
- **Keine Quelle doppelt in einer Zählung.** Zwei Fundstellen auf derselben
  Seite sind ein Beleg, nicht zwei.
- **Null ist auch eine Behauptung.** „0 von 8" braucht denselben Nachweis wie
  jede andere Zahl – und fällt, sobald ein einziges Gegenbeispiel in der
  Stichprobe steht.
- **Vorlagen-Quellen zählen bei Struktur- und Layout-Aussagen nicht mit.** Drei
  Seiten derselben Agentur belegen eine Vorlage, kein Branchenmuster.

## Gliederung der Branchendatei

```markdown
# <Gewerk>

**Stand:** <Datum> · **Ausgewertet:** <n> Betriebsseiten
**Hinweis:** Älter als zwölf Monate → Hinweis, kein Beleg. Dann /branche erneut.

## Quellen
<!-- Tabelle | Q1 | url | Ort | Art |, eine Zeile je ausgewerteter Seite. -->

## Austauschbare Formulierungen (gesperrt)
<!-- Die Phrasen, die fast alle benutzen. Wörtlich zitiert, mit Häufigkeit
     und Markern. -->

## Hero-Muster der Branche
<!-- Welcher Hero-Typ und Hintergrund dominiert. Und damit: was auffällt,
     wenn man es anders macht. -->

## Trust-Signale, die in diesem Gewerk zählen
<!-- Innung, Meisterbrief, Herstellerpartnerschaften, Zertifikate, Garantien.
     Mit Beispielen aus den Quellen. -->

## Typische Kundensituationen
<!-- Rohstoff für Konkretheit ohne Firmenfakten (Stufe 2 der Leiter in
     website-copy): In welcher Lage ist jemand, der hier sucht? -->

## Echte Einwände
<!-- Woran ein Auftrag scheitert. Rohstoff für FAQ. -->

## Typische Leistungen
<!-- Rohstoff für die Struktur. -->

## Was in diesem Gewerk wirklich differenziert
<!-- Das Gegenteil der Verbotsliste: Womit sich einzelne Betriebe tatsächlich
     abheben. Mit Beispiel und Quelle. -->
```

## Regeln

- **Belegpflicht:** Jede Aussage mit Quelle. Keine Behauptung über die Branche
  ohne mindestens zwei Seiten, die sie stützen.
- **Nicht von einer Seite auf die Branche schließen.** n=1 ist kein Muster,
  und eine Agenturvorlage ist auch bei n=3 nur eine Vorlage.
- **Abwesenheit ≠ Nichtexistenz.** Was auf der Startseite fehlt, kann auf einer
  Unterseite stehen. Die Aussage lautet „auf keiner der acht Startseiten
  gefunden", nicht „gibt es in der Branche nicht".
- Kosten: Der Scrape läuft über Apify. Vor dem Lauf die Anzahl der Seiten
  nennen.
