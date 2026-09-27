---
name: seo-basis
description: >
  Was an Sichtbarkeit schon in der Demo richtig sein muss, weil es später teuer
  nachzurüsten ist: Dokumentstruktur, lokale Signale und JSON-LD, Title und
  Description, Bilddateien, Teilen-Vorschau. Plus die Grenzen: keine erfundenen
  Suchvolumina, keine Ranking-Versprechen. Nutzen in Phase 3 beim Texten und in
  Phase 4 beim Bau.
---

# SEO-Basis

**Was diese Datei nicht ist.** Keine Keyword-Recherche. Die passiert erst im
Produktionsprojekt. In der Demo-Phase gibt es keine Werkzeuge dafür und kein
Budget – und geschätzte Suchvolumina sind erfundene Zahlen, also verboten
(CLAUDE.md §3).

**Was sie ist.** Die Liste der Dinge, die **jetzt** richtig sein müssen, weil
sie später Umbau statt Nacharbeit bedeuten. Eine Seite mit fünf H1, ohne
Alt-Texte und ohne lokale Signale nachzurüsten heißt, jede Sektion noch einmal
anzufassen.

**Und ein Verkaufsargument.** Der Demo-Link wird im Termin geöffnet, per
WhatsApp weitergeleitet und in eine Mail gepackt. Wie er dort aussieht,
entscheidet mit – das ist Abschnitt 6.

---

## 1. Dokumentstruktur

- **Genau eine H1 je Seite.** Sie sagt, worum es auf dieser Seite geht, nicht
  wie die Firma heißt.
- **Keine Sprünge in der Hierarchie.** H2 nach H1, H3 nach H2. Eine H3, weil
  sie kleiner aussieht, ist ein Strukturfehler – dafür ist die Schriftgröße da.
- **Überschriften sind Überschriften, keine Layout-Elemente.** Ein Kicker ist
  ein `<p>` oder `<span>`, keine H4.
- **Semantische Elemente nutzen:** `<header>`, `<nav>`, `<main>` (genau einmal),
  `<section>` mit zugehöriger Überschrift, `<footer>`.
- **Keine doppelten IDs.** Sie brechen Anker und Formularbeschriftungen.
- **`lang="de"`** am `<html>`.
- **Jeder Anker löst auf.** Ein Menüpunkt, der ins Leere zeigt, ist in einer
  Demo ein Vertrauensbruch und kein SEO-Detail.

## 2. Lokale Signale – der eigentliche Hebel im Handwerk

Ein Dachdecker wird über „Dachdecker + Ort" gefunden, nicht über Marken-Suche.
Drei Dinge entscheiden, und alle drei sind belegpflichtig.

**NAP-Konsistenz.** Name, Adresse, Telefon müssen überall identisch sein –
Header, Footer, Kontakt, JSON-LD. Abweichungen schwächen das lokale Signal.
**Alle drei stammen aus Briefing oder Scrape.** Stehen im Scrape zwei
verschiedene Adressen, ist das ein Widerspruch und wird gemeldet, nicht
entschieden (CLAUDE.md §3).

**Ort steht sichtbar im Inhalt**, nicht nur im Impressum: im Hero-Kicker
(Slot-Regel, `website-copy`), in mindestens einer H2, im Footer.

**Einzugsgebiet ehrlich.** Orte nennen, die aus dem Briefing oder der
bestehenden Seite stammen. Eine erfundene Ortsliste fällt dem Inhaber sofort
auf und ist zugleich das klassische Spam-Muster.

### JSON-LD

Ein Block im `<head>`, ausschließlich mit belegten Feldern:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "<aus Briefing/Scrape>",
  "url": "<Demo-URL>",
  "telephone": "<aus Briefing/Scrape>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<...>",
    "postalCode": "<...>",
    "addressLocality": "<...>",
    "addressCountry": "DE"
  },
  "areaServed": ["<nur belegte Orte>"]
}
</script>
```

Passende `@type`-Werte: `RoofingContractor`, `Electrician`, `Plumber`,
`HousePainter`, `GeneralContractor`, sonst `LocalBusiness`.

**Drei Klassen, nicht eine Verbotsliste** (seit 2026.10.01):

| | Felder | Regel |
|---|---|---|
| **Erlaubt, sobald belegt** | `openingHours`, `priceRange` | Echte Öffnungszeiten aus dem **verifizierten** Google-Eintrag gehören auf die Seite. Sie sind ein starkes lokales Signal und der Kunde erkennt sie wieder. Quelle: `quellen/scrape-google.md`. Preisspanne nur, wenn sie im Briefing steht und gezeigt werden soll |
| **Auch mit echter Quelle nicht** | `aggregateRating`, `review` | Review-Auszeichnung bildet Bewertungen ab, die **auf dieser Seite** gesammelt wurden. Eine von Google übernommene Note im eigenen Markup ist ein Richtlinienverstoß, auch wenn die Zahl stimmt |
| **Nie** | jedes Feld, das auf der Seite selbst nicht sichtbar ist | Strukturierte Daten beschreiben die Seite, sie ergänzen sie nicht |

**Die echte Google-Bewertung gehört trotzdem auf die Seite**, nur an der
richtigen Stelle: sichtbar im Inhalt, mit der Quelle daneben („4,9 von 5 bei
37 Bewertungen auf Google"), und das Profil über **`sameAs`** verlinkt. Damit
ist die Note belegt, der Besucher kann sie nachprüfen, und Google zieht die
Bewertung ohnehin aus dem eigenen Eintrag.

**Ein leeres Feld weglassen ist immer richtiger als es zu füllen.**
Gemessen: `node scripts/copy-check.mjs` (harte Sperre) und
`node scripts/beleg-check.mjs` (Belegabgleich der übrigen Werte).

## 3. Struktur nach Leistung, nicht nach Firmenlogik

Was Menschen suchen, sind Leistungen („Dach decken", „Flachdach abdichten"),
nicht Abteilungen. Für die Demo heißt das:

- Jede beworbene Leistung hat einen eigenen, benennbaren Abschnitt mit eigener
  H2 und eigenem Anker.
- Die H2 trägt den Begriff, den ein Kunde benutzt – nicht den aus dem
  Leistungsverzeichnis.
- Wird aus der Demo ein Projekt, werden daraus eigene Unterseiten. Die
  Abschnittsstruktur ist die Vorarbeit dafür. Steht sie schon jetzt richtig,
  ist der Ausbau eine Aufteilung statt eines Umbaus.

## 4. Title und Description

Beide sind Text, also gilt `website-copy` und der Inhaber-Test.

| | Arbeitsbereich | Muster |
|---|---|---|
| `<title>` | 50–60 Zeichen | `Leistung in Ort – Firmenname` |
| `<meta name="description">` | 140–160 Zeichen | Was der Betrieb macht, für wen, plus der nächste Schritt |

- **Der Ort gehört hinein**, aber genau einmal. Zweimal ist Keyword-Stuffing –
  gemessen an einer echten Wettbewerbsseite: 139 Zeichen H1 mit dem Ortsnamen
  doppelt (`hero-craft`).
- **Keine Superlative ohne Beleg**, kein „Ihr Partner für".
- **Je Seite eigener Title und eigene Description.** Zwei Seiten mit demselben
  Title sind für die Suchmaschine eine.
- In der Demo dürfen beide Platzhalter sein – aber ausformulierte, keine
  leeren Attribute.

## 5. Bilder

- **Alt-Text an jedem inhaltstragenden Bild**, beschreibend statt
  schlagwortartig: „Neu gedecktes Satteldach mit Zinkrinne in Bad Nauheim",
  nicht „Dachdecker Dach Dachdeckerei".
- **Rein dekoratives Bild bekommt `alt=""`**, nicht irgendeinen Text.
- **Dateinamen sprechen:** `dach-sanierung-bad-nauheim.jpg` statt `IMG_4823.jpg`.
- **Kein Alt-Text, der etwas behauptet, was das Bild nicht zeigt.** Das Bild
  ist eine Aussage über den Betrieb und fällt unter die Belegpflicht.
- **Breite und Höhe im HTML** setzen, sonst springt das Layout beim Laden.
- **Moderne Formate** (webp/avif) mit Fallback, Bilder unterhalb des Heros
  `loading="lazy"`.

## 6. Teilen-Vorschau – das unterschätzte Verkaufsargument

Der Demo-Link wandert in WhatsApp, Mail und Slack. Ohne Open-Graph-Angaben
zeigt die Vorschau dort einen nackten Link oder ein zufälliges Bild. Das wirkt
wie eine unfertige Seite, bevor jemand sie geöffnet hat.

```html
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="…">   <!-- 1200×630, lokal im Repo -->
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

**Das Bild liegt lokal** unter `site/assets/images/`. Ein Hotlink auf ein fremdes
CDN läuft ab (CLAUDE.md §5), und eine tote Vorschau ist schlimmer als keine.

## 7. Befund zur bestehenden Seite

Phase 1 scrapet die Seite des Kunden ohnehin. Was dabei an Sichtbarkeitsmängeln
auffällt, ist **belegbares Material für den Termin** – und der einzige Teil von
SEO, der in der Demo-Phase eine Aussage trägt.

Notierbar, weil aus dem Scrape ablesbar:

| Befund | Warum es zählt |
|---|---|
| Mehrere H1 oder gar keine | Die Seite sagt nicht, worum es geht |
| Title fehlt, ist doppelt oder länger als ~60 Zeichen | Wird in den Ergebnissen abgeschnitten |
| Description fehlt oder ist generisch | Die Suchmaschine schreibt sie selbst |
| Bilder ohne Alt-Text | Weder auffindbar noch barrierefrei |
| Kein Ort im sichtbaren Text | Das lokale Signal fehlt |
| Kein strukturiertes Datenmarkup | Kein Anspruch auf erweiterte Darstellung |
| Widersprüchliche NAP-Daten | Schwächt genau das Signal, das lokal zählt |

**Nicht notierbar, weil nicht messbar:** Rankings, Suchvolumina, „Sie verlieren
X Anfragen im Monat", Schätzungen zum Wettbewerb. Solche Sätze im Termin sind
angreifbar und kosten mehr, als sie bringen.

Die Befunde gehören nach `docs/SEO-NOTIZEN.md`, Abschnitt „Befund".
**Nie auf die Demo-Seite selbst** – eine Website, die dem Inhaber seine alte
Seite vorhält, verkauft nichts.

## 8. Grenzen, klar benannt

- **Keine Ranking-Zusage.** Weder in Copy noch im Gespräch.
- **Keine erfundene Zahl** – kein Suchvolumen, keine Bewertungsanzahl, keine
  Kundenanzahl.
- **Keyword-Notizen sind ausdrücklich Vermutungen** und in
  `docs/SEO-NOTIZEN.md` als solche gekennzeichnet.
- **Nichts wird für die Suchmaschine geschrieben.** Ein Satz, der nur wegen
  eines Begriffs dasteht, fällt beim Inhaber-Test durch.

## Abnahme

Gemessen über `node scripts/copy-check.mjs site/<datei>.html`.

- [ ] Genau eine H1 je Seite: ______
- [ ] Keine Sprünge in der Überschriftenhierarchie: ______ Sprünge
- [ ] Keine doppelten IDs: ______
- [ ] Title 50–60 Zeichen, je Seite eigen: ______
- [ ] Description 140–160 Zeichen, je Seite eigen: ______
- [ ] Bilder ohne Alt-Attribut: ______ (muss 0 sein)
- [ ] Open-Graph-Angaben gesetzt, `og:image` liegt lokal im Repo
- [ ] JSON-LD vorhanden, nur mit belegten Feldern, keine `aggregateRating`
- [ ] NAP identisch in Header, Footer, Kontakt und JSON-LD
- [ ] Ort steht im sichtbaren Inhalt, nicht nur im Impressum
- [ ] `docs/SEO-NOTIZEN.md` gefüllt: Keywords **und** Befund zur Altseite
