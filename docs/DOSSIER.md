# DOSSIER – Strategie-Grundlage dieser Demo

**Nicht deployen. Unsichtbar für den Kunden.** Diese Datei entsteht in Phase 1b
und ist die Grundlage für **jede** gestalterische und textliche Entscheidung
danach. `hero-specialist`, `structure-architect` und `copywriter` lesen sie,
bevor sie arbeiten.

**Warum es sie gibt:** Phase 1 sammelt Rohmaterial (CI, Ton, Werte, Bilder).
Das ist noch keine Strategie. Ohne einen Ort, an dem steht *was diesen Betrieb
unterscheidet und was wir davon ausnutzen*, erfindet jede spätere Phase ihre
Strategie neu – und das Ergebnis wird austauschbar. Genau daran ist eine Demo
schon gescheitert: „Noch ist es so wie jeder andere."

**Belegpflicht gilt hier besonders.** Hinter jeder Aussage steht die Quelle:
`[Scrape]`, `[Briefing]`, `[Bruno]`. Was keine Quelle hat, kommt nicht rein –
es kommt unter *Lücken*.

---

## 1. Was ist einzigartig?

<!-- Der Rohstoff gegen Austauschbarkeit. Einzelfakten UND ihre Kombination.
     "Seit 1985" hat jeder. "Seit 1985, drei Generationen, 30 Leute, zwei
     Standorte, Bad und Heizung aus einer Hand" hat keiner. -->

| Merkmal | Quelle | Sagt der Wettbewerb das auch? |
|---|---|---|
| | | |

**Die unverwechselbare Kombination:**
<!-- Ein Satz aus den Merkmalen oben, der so nur auf diesen Betrieb passt. -->

## 2. Was muss hervorgehoben werden?

<!-- Was zahlt direkt auf das Hauptziel aus docs/DEMO-SPEC.md ein?
     Bei Mitarbeitergewinnung anderes als bei Kundengewinnung. -->

## 3. Was muss berücksichtigt werden?

<!-- Einschränkungen, die Entscheidungen begrenzen. Ehrlich benennen:
     - schwaches oder fehlendes Bildmaterial
     - Ton der Person (aus Persönlichkeitsprofil)
     - rechtliche/branchenspezifische Zwänge
     - Dinge, die der Kunde ausdrücklich NICHT will -->

## 4. Was können wir ausnutzen?

<!-- Vorteile, die vorhanden, aber ungenutzt sind. Erfahrungsgemäß ergiebig:
     Herstellerpartnerschaften, Google-Bewertungen, Firmengeschichte und alte
     Fotos, vorhandene Videos, Social-Kanäle, Auszeichnungen, Innung,
     Notdienst, Einzugsgebiet, eigene Fertigung. -->

---

## 5. Bild-Inventar (Stufe 1 – ohne Download)

**Erst bewerten, dann gezielt laden.** Der Actor `onescales/bulk-image-downloader`
rechnet pro verarbeiteter URL ab – ein blindes Herunterladen aller Bilder einer
Seite kostet Geld und liefert überwiegend Deko.

Die Herkunft lässt sich am **URL-Pfad** ablesen, ohne eine Datei zu holen:

| Pfad-Muster | Bedeutung |
|---|---|
| `/wp-content/uploads/…` | eigenes Material aus dem CMS |
| `/media/…` (onecdn u.ä.) | eigenes Material |
| `/unsplash/…`, `stock`, `shutterstock` | **Stockfoto – kein Beweis, nur Deko** |
| Dateiname mit `-1024x531` o.ä. | WordPress schreibt die Auflösung hinein |

| Bild (URL-Kürzel) | Alt-Text / Kontext | Herkunft | Auflösung | Eignung | Laden? |
|---|---|---|---|---|---|
| | | | | Hero / Referenz / Team / Leistung / unbrauchbar | ja/nein |

**Shortlist zum Download:** <!-- Nur diese URLs gehen an den Actor. -->
**Geschätzte Kosten:** <!-- Anzahl × Tarif, vor dem Lauf nennen. -->

## 6. Lücken – was fehlt

<!-- Was gebraucht wird, aber nicht existiert. Jede Lücke bekommt eine
     Entscheidung: bei Bruno erfragen, per Higgsfield erzeugen, Fotoshooting,
     oder sichtbarer Platzhalter im Hero/der Sektion. -->

| Lücke | Gebraucht für | Weg |
|---|---|---|

## 7. Widersprüche

<!-- Briefing gegen Scrape. Besonders: Firmenhistorie, Standorte, Rechtsform,
     Zahlen, Namen. Diese werden GEMELDET, nicht selbst aufgelöst.
     Echter Fall: Header nannte "Bernsdorfer Str. 291", der Umzugshinweis auf
     derselben Seite "Zschopauer Straße 259". -->

| Aussage A (Quelle) | Aussage B (Quelle) | Geklärt durch Bruno? |
|---|---|---|

## 8. Wettbewerb – was in dieser Branche austauschbar ist

<!-- Aus der Branchendatei (.claude/skills/branchen-wissen/references/<gewerk>.md).
     Falls das Gewerk dort fehlt: kurz vermerken und ggf. /branche <gewerk>
     laufen lassen. Diese Phrasen sind ab hier gesperrt. -->

---

## Ableitung für den Hero

<!-- Die Brücke zu Phase 2. Vom hero-specialist auszufüllen, bevor er
     Varianten baut. -->

- **Empfohlener Hero-Typ:** <!-- mit Begründung aus Abschnitt 1–4 -->
- **Tragendes Motiv:** <!-- welches konkrete Bild, aus dem Inventar -->
- **Beweis für above the fold:** <!-- Bewertung, Partnerlogo, Zahl – mit Quelle -->
- **Primärer CTA gehört:** <!-- welcher Zielgruppe, und warum -->
