# quellen/ – woher jede Behauptung stammt

**Hier liegt alles, was als Beleg zählt.** Scrape der bestehenden Seite,
Briefing, Google-Eintrag, Social-Auswertung, Notizen aus Gesprächen mit Bruno.

Das ist kein Archiv, sondern ein Prüfgegenstand: `scripts/beleg-check.mjs` hält
**jede Zahl und jede URL der gebauten Seite** gegen den Inhalt dieses Ordners.
Was hier nicht steht, gilt als erfunden und bricht den Lauf ab.

## Warum es diesen Ordner gibt

Die Belegpflicht (CLAUDE.md §3) stand viermal im Template und wurde in der Demo
Kerrinnes trotzdem sechsmal verletzt: erfundene Öffnungszeiten im Footer, eine
Tatsachenbehauptung über ein Kundenprojekt, drei Alt-Texte, eine falsche
Fragenzahl im CTA. Die Rückmeldung hielt die Ursache fest: Die Regel wurde nicht
übersehen, weil sie unklar war, sondern weil niemand vor dem Push gegen sie
gemessen hat.

Messen ging bis dahin auch nicht. Der Workflow sagte „Bestehende Website
scrapen (Apify)", aber nirgends stand, **wohin** das Ergebnis kommt. Bei
Kerrinnes entstanden deshalb ad-hoc `docs/GOOGLE-ANALYSE.md` und
`docs/INSTAGRAM-ANALYSE.md`, in einer anderen Demo gar nichts. Ein Gate braucht
einen festen Ort.

## Was hier hineingehört

| Datei | Inhalt |
|---|---|
| `briefing.md` | das Briefing aus Todoist, unverändert eingefügt |
| `scrape-website.md` | Text, Zahlen, Leistungen und Bild-URLs der alten Seite |
| `scrape-google.md` | Google-Eintrag, **nach festem Schema** (siehe unten) |
| `scrape-instagram.md` | Beiträge, belegte Leistungen, Bild-URLs |
| `gespraech-<datum>.md` | was Bruno mündlich beigesteuert hat, mit Datum |

Rohdaten dürfen auch als `.json` oder `.csv` daneben liegen, `beleg-check.mjs`
liest `.md`, `.txt`, `.json`, `.csv`, `.yml` und `.yaml`.

## `scrape-google.md` hat ein festes Schema

Weil daraus echte Öffnungszeiten und eine echte Bewertung auf die Seite gehen,
muss nachvollziehbar sein, **welcher Eintrag** das war und **wann**:

```markdown
# Google-Unternehmensprofil
Gescrapt am: 2026-09-18 · Actor: compass/crawler-google-places
Place-ID: <exakt kopiert>
Profil-URL: <exakt kopiert, nicht konstruiert>

## Zuordnung belegt durch (mindestens zwei, CLAUDE.md §5)
- Website-URL: stimmt überein / weicht ab
- Telefon: stimmt überein / weicht ab
- Adresse: stimmt überein / weicht ab

## Übernommen
Name:            <wie im Profil>
Adresse:         <wie im Profil>
Telefon:         <wie im Profil>
Öffnungszeiten:  Mo-Fr 08:00-17:00, Sa geschlossen   ← so, wie sie im Profil stehen
Bewertung:       4,9 von 5 bei 37 Bewertungen
Verifiziert:     ja / nein / unbekannt
```

**Ein Namenstreffer allein reicht nicht.** „Elektro Müller" gibt es in jeder
zweiten Stadt, und die Öffnungszeiten eines fremden Betriebs auf der Demo sieht
der Inhaber sofort. Stimmen weniger als zwei Merkmale überein, wird der Eintrag
nicht übernommen, sondern bei Bruno nachgefragt.

**Ist das Profil nicht verifiziert**, gilt es als Hinweis, nicht als Beleg.
Dann kommt ein Hinweiskasten auf die Seite statt einer Zahl (§11).

## Drei Regeln

1. **Unverändert ablegen, dann auswerten.** Wer beim Einfügen schon glättet,
   verliert genau die Stelle, an der sich Briefing und Scrape widersprechen.
   Widersprüche sind meldepflichtig (§3), nicht wegzuräumen.
2. **URLs werden kopiert, nie konstruiert.** Auch hier drin. Eine gebastelte
   Instagram-Adresse macht das Gate wirkungslos: Der Check findet sie dann in
   der Quelle und lässt sie durch.
3. **Datum und Herkunft an jede Datei.** „Gescrapt am 12.09.2026 von
   maler-beispiel.de" ist der Unterschied zwischen einem Beleg und einer Notiz.

## Nicht öffentlich, aber im Repo

`quellen/` liegt außerhalb von `site/` und ist damit über keine URL erreichbar
(CLAUDE.md §5, Root Directory = `site`). Anders als `.closing/` oder
`.feedback/` ist der Ordner **nicht** gitignoriert: Die Belege müssen beim
nächsten Lauf noch da sein, sonst prüft das Gate gegen nichts.
