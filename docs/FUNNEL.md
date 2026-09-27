# FUNNEL.md – Anfrage- & Bewerbungs-Funnel

Der mehrstufige Funnel ist der Teil der Demo, der bisher am besten ankam
(O-Ton Kunde: „Ja, klar. Ist gut."). Er ist gleichzeitig der Teil, an dem am
meisten Conversion verloren geht, wenn er zu lang oder nicht als Formular
erkennbar ist. Diese Datei ist die Bauanleitung. Die übergeordneten
Conversion-Prinzipien stehen in `CLAUDE.md`, Abschnitt *Conversion & Funnel*.

## Die Grundspannung: kurz halten vs. qualifizieren

Zwei Anforderungen ziehen gegeneinander. Beide Retros haben je eine Seite davon
betont, und die Auflösung ist die wichtigste Regel dieser Datei:

> **Begrenzt ist nur, was VOR dem Absenden Pflicht ist.**
> Maximal **zwei Vorqualifizierungsfragen plus Kontaktdaten**. Jede weitere
> Pflichtfrage kostet Anfragen.
> **Alles andere kommt NACH dem Absenden**, auf dem Danke-Screen, klar als
> freiwillig markiert.

Damit bleibt das „2 Minuten"-Versprechen ehrlich, der Lead ist gesichert, bevor
er es sich anders überlegt, und die Anreicherung passiert trotzdem. Wer
Vorqualifizierung über Conversion stellt, bekommt beides nicht.

## Aufbau

**Vor dem Absenden (Pflicht, maximal 3 Schritte):**
1. **Leichteste Frage zuerst.** Tap statt Tippen, wo immer möglich. Meist die
   Auswahl des Bereichs oder der Rolle.
2. **Eine Frage pro Schritt.** Keine Formularseite mit acht Feldern.
3. **Kontaktdaten als letzter Schritt.** Nie am Anfang.

**Nach dem Absenden (freiwillig, auf dem Danke-Screen):**
- Freitextfeld („Erzählen Sie kurz, worum es geht" / „Was ist dir wichtig?")
- Datei-Upload (Lebenslauf, Grundriss, Fotos)
- Kanal-Frage („Wie bist du auf uns aufmerksam geworden?") – ein Tap, liefert
  dem Kunden später Attributionsdaten
- Engagement-Frage, falls sie nicht schon in die zwei Pflichtfragen passt.
  Sie erhöht die Abschlussrate, weil sich der Nutzer verstanden fühlt – aber
  nicht auf Kosten der Länge.

## Inhaltliche Regeln

- **Keine redundanten Schritte.** Wenn Schritt 1 die Rolle abfragt, darf
  Schritt 3 dieselbe Information nicht anders erfragen.
- **Fragen rollen-neutral formulieren.** „Hast du Erfahrung im Bau- oder
  Elektrobereich?" passt nicht für Büro-Stellen – also ausgerechnet für die
  Stellen, die oft am dringendsten gesucht werden. Erst prüfen, für welche
  Zielgruppen der Funnel gilt, dann formulieren.
- **Reihenfolge nach Kundenbedarf.** Die dringendsten Stellen bzw. die
  umsatzstärksten Leistungen stehen oben, nicht alphabetisch oder nach
  Selbstverständnis des Kunden.
- **Kein Block ohne Zweck.** Jeder Abschnitt muss begründbar sein („Angaben zur
  Person" ohne konkreten Nutzen fliegt raus).

## Der Einstieg: vorbelegter Funnel

Ein CTA führt **direkt in den vorbelegten Funnel**, nie auf eine Seite, wo
dieselbe Auswahl noch einmal getroffen werden muss.

```
anfrage.html?bereich=werbefilm
```
Der Parameter hakt die Option ab und springt auf Schritt 2. Das ist ein Schritt
weniger an genau der Stelle, an der Besucher abspringen.

Gilt für jeden Einstiegspunkt: Leistungskachel, Preis-Paket, Abschluss-CTA,
Stellen-Liste.

## Das Formular muss als Formular erkennbar sein

Der häufigste Struktur-Fehler: Es sieht aus wie eine gestaltete Sektion, also
bedient es niemand. Pflicht:

- **Gerahmter Kasten** mit Kopfzeile, mitlaufendem Schrittzähler
  („Schritt 2 von 3"), Fortschrittsbalken und Fußzeile.
- **Sichtbare Auswahlschalter.** Keine versteckten Radiobuttons, keine
  Kacheln, denen man das Klicken nicht ansieht.
- **Beschriftete Eingabefelder** mit Rahmen und Platzhaltertext.
- **Pflichtfelder markiert.**
- **Der letzte Knopf heißt, was er tut** („Anfrage absenden", „Bewerbung
  abschicken"), nicht „Weiter".
- **Eingabefelder nicht erst im dritten Schritt sichtbar machen** – wenn die
  ersten Schritte reine Kachelauswahl sind, muss trotzdem erkennbar sein, dass
  hier ein Formular läuft.

## Technische Anforderungen

- **Sichtbarkeit über `hidden` steuern** (`el.hidden = true`), nicht über
  Inline-Styles. Dazu gehört zwingend `[hidden] { display: none !important; }`
  im Base-CSS – sonst schlägt eine Autoren-Regel wie `display: flex` die
  Browser-Regel, und abgeschaltete Schritte oder Buttons bleiben stehen.
- **Nach dem Absenden verschwindet die Navigation.** „Zurück" und „Absenden"
  dürfen nicht unter dem Danke-Text stehen bleiben.
- **Der Zurück-Button ist auf Schritt 1 nicht sichtbar**, nicht nur wirkungslos.
- **Touch-Targets mindestens 44 × 44 px**, auch bei Auswahlkacheln.
- Ein Funnel-Durchlauf bis zum Danke-Screen gehört als Prüfschritt in
  `docs/CHECKLISTE.md`.

## Danke-Screen

- Bestätigt konkret, was passiert („Ich melde mich innerhalb von 24 Stunden").
- Trägt die freiwilligen Zusatzfragen (siehe oben), klar als optional markiert.
- Bietet einen Ausgang zurück in die Seite, damit es keine Sackgasse ist.
