---
name: vertriebs-briefing
description: >
  Erstellt zum Closing-Zeitpunkt das Briefing für den Vertriebler, der die Demo
  im Closing-Call zeigt: was die Demo abbildet und warum, welche Besonderheiten
  drin sind, was noch fehlt und wie er es anspricht. Prüft jede Behauptung gegen
  die gebaute Seite. Wird von /closing aufgerufen.
---

# Vertriebs-Briefing

Du schreibst für **einen Menschen, der die Demo gleich einem Interessenten
zeigt** – nicht für Bruno, nicht für Claude, nicht fürs Archiv.

Der Ablauf: Bruno gibt dem Vertriebler den Demo-Link. Der Vertriebler zeigt die
Demo im Closing-Call und stellt sie vor. Dein Dokument ist seine Vorbereitung.

**Du fragst nicht nach.** Das Briefing entsteht allein, aus der gebauten Seite
und den Projektunterlagen.

## Die härteste Regel

> **Jede Besonderheit, die du nennst, muss in der Demo tatsächlich vorhanden
> und funktionsfähig sein.**

Steht im Briefing „Google-Bewertungen sind eingebunden" und es ist in
Wirklichkeit ein Platzhalter, behauptet der Vertriebler das im Gespräch – und
blamiert sich vor dem Interessenten. Das ist der teuerste Fehler, den dieses
Dokument machen kann, teurer als jede Auslassung.

**Prüfe deshalb jede Aussage gegen die gebaute Seite** (`site/index.html` und
die übrigen Seiten), nicht gegen das Konzept und nicht gegen den Chat. Was
geplant war, aber nicht drin ist, gehört in den Abschnitt „Was noch fehlt" –
nie in die Besonderheiten.

Drei Zustände, sauber getrennt:

| Zustand | Gehört wohin |
|---|---|
| Vorhanden und funktioniert | **Besonderheiten** – kann er zeigen |
| Sichtbar als Demo-Hinweis/Platzhalter | **Was noch fehlt** – Gesprächsanlass |
| Weder noch | gar nicht ins Dokument |

## Quellen

| Quelle | Wofür |
|---|---|
| `site/index.html` + weitere Seiten | **Was ist wirklich drin.** Die maßgebliche Quelle |
| `docs/DEMO-SPEC.md` | Hauptziel, Zielgruppen, Perspektive |
| `docs/DOSSIER.md` | was einzigartig ist, was ausgenutzt wurde – liefert das **Warum** |
| Demo-Hinweise im HTML | was noch aussteht |
| Chat-Verlauf | Begründungen für Entscheidungen |
| `branchen-wissen` (Gewerk) | echte Einwände der Branche **und** was dort selten ist → Alleinstellung |

## Wonach du suchst

Geh die Seite durch und prüfe gezielt auf diese Punkte. Die Liste ist ein
Suchraster, keine Erwartung – was nicht drin ist, wird nicht erwähnt.

**Zu jedem Fund gehören zwei Feststellungen:** *ist es drin* und **wie ist es
umgesetzt**. Die zweite bestimmt, was der Vertriebler sagen darf (siehe
unten):

- **Social-Media** (Instagram, Facebook) – live nachladender Feed, fest
  eingebaute Auswahl, oder nur verlinkt? Drei verschiedene Argumente
- **Anfrage-Funnel** – mehrstufig? Wie viele Pflichtfragen? Wohin führt er?
- **Karriere- oder Bewerbungsstrecke** als zweite Zielgruppe
- **Karte / Anfahrt** (Google Maps o.ä.)
- **Bewertungen** – eingebettetes Widget, verlinkt oder zitiert?
- **Innung, Handwerkskammer, Zertifikate, Herstellerpartner** – verlinkt?
- **Rechner, Konfigurator, interaktives Werkzeug**
- **Referenzen, Galerie, Vorher/Nachher**
- **Notdienst / Erreichbarkeit** hervorgehoben
- **Telefonnummer** direkt anklickbar auf dem Handy
- **Bewegung / Scroll-Inszenierung**, die auffällt
- **Struktur-Entscheidungen**, die vom Üblichen abweichen – und warum
- **Unterseiten**, Partnerverlinkungen

## Der Nutzen folgt aus der Umsetzung, nicht aus dem Feature-Namen

Der Vertriebler verkauft keinen Funktionsumfang. Jede Besonderheit bekommt
deshalb: was gebaut wurde, **wie** es gebaut wurde, und was der Betrieb davon
hat.

**Der mittlere Teil entscheidet.** Dasselbe Feature hat je nach Umsetzung einen
völlig anderen Nutzen – und eine falsche Nutzenaussage ist genauso schädlich
wie eine erfundene Besonderheit. Beides behauptet der Vertriebler im Gespräch.

### Dasselbe Feature, zwei Umsetzungen, zwei Nutzen

| Umsetzung | Was stimmt | Was **nicht** gesagt werden darf |
|---|---|---|
| **Live-Feed** (Script/Embed lädt Beiträge) | „Neue Beiträge erscheinen von selbst – die Seite bleibt aktuell, ohne dass jemand sie pflegt" | – |
| **Drei fest eingebaute Beiträge** | „Die drei stärksten Arbeiten, bewusst ausgewählt – statt einem Feed, in dem die beste Arbeit zwischen Baustellenfotos untergeht" | „aktualisiert sich", „immer aktuell", „automatisch" |

Die zweite Variante ist **kein schwächeres Argument**, sondern ein anderes:
Kuratierung schlägt Zufall. Aber sie ist eben kuratiert, und genau das muss im
Briefing stehen.

Dasselbe Muster bei fast allem:

| Feature | Varianten, die sich im Nutzen unterscheiden |
|---|---|
| Bewertungen | Live-Widget · zitierte Auswahl · nur verlinkt |
| Karte | interaktives Embed · Bild mit Link · nur Adresse |
| Referenzen | dynamische Galerie · feste Auswahl |
| Funnel | versendet wirklich · Demo-Attrappe bis zum Danke-Screen |
| Partner/Innung | verlinkt · nur Logo gezeigt |

### Gesperrt, solange keine Automatik gebaut ist

Diese Wörter behaupten eine Mechanik. Sie dürfen nur stehen, wenn sie
nachweislich existiert:

> automatisch · aktualisiert sich · immer aktuell · live · synchron ·
> in Echtzeit · ohne Aufwand · pflegt sich selbst

**Prüfe im HTML, welche Variante gebaut ist**, bevor du den Nutzen
formulierst – ein Script oder `iframe`, das Inhalte nachlädt, ist etwas
anderes als feste `<img>`-Tags. Im Zweifel die vorsichtigere Formulierung: Ein
zurückhaltendes, wahres Argument kostet nichts. Ein falsches kostet den
Abschluss.

Die Umkehrformel selbst bleibt dieselbe wie in `website-copy`: nicht Prahlerei,
sondern was es für den Kunden bedeutet.

## Alleinstellung aus dem Branchenwissen

Die Branchendatei des Gewerks (`branchen-wissen/references/<gewerk>.md`) hat
erhoben, was Wettbewerber dieses Gewerks tun – und vor allem, was **selten**
ist. Wo eine Besonderheit der Demo auf eine solche Seltenheit trifft, ist das
das stärkste Argument, das der Vertriebler hat: belegt statt behauptet.

**Bilde die Schnittmenge:** Was ist in dieser Demo tatsächlich gebaut (siehe
Besonderheiten oben) **und** laut Branchendatei in der Stichprobe selten?

Beispiel aus `bau.md`: „Referenzbereich überhaupt vorhanden: 4 von 8, davon mit
Jahresangabe je Objekt nur 2 von 8." Hat die Demo eine Referenzliste mit
Jahresangaben, ist das ein belegbarer Vorsprung.

**Höchstens drei bis fünf Punkte**, die stärksten. Eine lange Liste entwertet
jeden einzelnen.

### Die Grenze, die nicht überschritten wird

Die Branchendateien erheben **Stichproben eines Gewerks, bundesweit**. Sie
sagen ausdrücklich nichts darüber, was der Wettbewerber in der Nachbarstraße
macht (`branchen-wissen`, „Zwei Grenzen"). Der Interessent kennt seine lokalen
Wettbewerber besser als wir – eine Behauptung über sie fliegt sofort auf.

| Erlaubt | Verboten |
|---|---|
| „Von acht Betriebsseiten aus dem Gewerk, die wir angesehen haben, hatten nur zwei …" | „Kein Wettbewerber in Ihrer Region hat das" |
| „In dieser Stichprobe haben wir das nicht gefunden" | „Das gibt es in der Branche nicht" |
| Zahlen aus der Branchendatei mit genannter Grundlage | Zahlen ohne Grundlage, Namen von Wettbewerbern |

**Jede Formulierung trägt die Stichprobe mit sich.** Sonst kann der Vertriebler
die Rückfrage „welche acht denn?" nicht beantworten – und genau die kommt.

Ein brauchbarer Satz sieht so aus:

> „Wir haben uns acht Betriebsseiten aus dem Hochbau angesehen. Bei der Hälfte
> gibt es überhaupt keinen Referenzbereich, und nur bei zweien steht dabei, aus
> welchem Jahr die Objekte sind. Ihre Seite hat beides."

**Abwesenheit ist kein Beweis für Nichtexistenz** (CLAUDE.md §3). „In der
Stichprobe nicht gefunden" ist die einzige haltbare Formulierung.

### Wann dieser Abschnitt entfällt

- **Keine Branchendatei für dieses Gewerk** → Abschnitt weglassen. Nicht raten,
  nicht aus dem Bauch behaupten
- **Datei älter als zwölf Monate** → gilt als Hinweis, nicht als Beleg
  (`branchen-wissen`). Dann höchstens als Beobachtung formulieren, ohne Zahlen
- **Keine Schnittmenge** → weglassen. Ein erfundener Vorsprung ist schlimmer
  als keiner

## Was noch fehlt – als Gesprächsanlass, nicht als Entschuldigung

Alles, was in der Demo als Hinweis oder Platzhalter markiert ist, gehört hier
her – **mit einer Formulierung, die der Vertriebler benutzen kann.**

Ein Demo-Hinweis ist ein Verkaufsargument, kein Makel (CLAUDE.md §11). Er macht
den nächsten Termin zum Arbeitsgespräch:

> „Die Zitate sind hier Entwürfe. Im Projekt setzen wir uns hin und nehmen Ihre
> eigenen Worte auf – das wirkt stärker als alles, was wir uns ausdenken."

> „Für die Referenzen fehlen uns noch Ihre Fotos. Das ist der erste Schritt,
> wenn wir loslegen – und der Bereich ist schon dafür gebaut."

Formuliere je fehlendem Punkt **einen solchen Satz**, nicht nur den Hinweis.

## Format

```markdown
# Vertriebs-Briefing: <Kunde>

**Demo:** <URL>  ·  **Gewerk:** <Gewerk>  ·  **Stand:** <Datum>

## In einem Satz
<Was für ein Betrieb, was ist das Ziel dieser Demo.>

## Worauf die Demo abzielt
<Hauptziel aus DEMO-SPEC, zweite Zielgruppe, warum die Struktur so ist.
Zwei bis vier Sätze – der Vertriebler soll die Absicht erklären können.>

## Der rote Faden durch die Demo
<Wie er sie zeigt: welche Reihenfolge, wo er anhalten sollte. Nach
Gesprächsablauf sortiert, nicht nach Seitenstruktur.>

1. **<Sektion>** – <was er dazu sagt>
2. …

## Besonderheiten
<Nur was tatsächlich drin ist und funktioniert. Je Punkt: was es ist, was der
Betrieb davon hat.>

### <Besonderheit>
- **Was:** …
- **Wie umgesetzt:** <live nachladend / fest eingebaut / verlinkt / …>
- **Nutzen für den Betrieb:** <folgt aus der Umsetzung, nicht aus dem Namen>
- **Wo in der Demo:** …

## Was Sie von vielen unterscheidet
<Nur wo eine gebaute Besonderheit auf eine belegte Seltenheit der Branchen-
datei trifft. Jede Zeile nennt die Stichprobe. Entfällt, wenn es keine
Branchendatei gibt.>

| Was in der Demo | Wie verbreitet in der Stichprobe | Satz für das Gespräch |
|---|---|---|
| … | „<n> von <N> der untersuchten Seiten" | „…" |

## Was noch fehlt – und wie er es anspricht
| Was fehlt | Was er sagen kann |
|---|---|
| … | „…" |

## Womit zu rechnen ist
<Typische Einwände dieses Gewerks aus `branchen-wissen`, je mit einem
Ansatzpunkt. Keine fertigen Verkaufsskripte – Stichpunkte.>

## Das bitte nicht behaupten
<Konkret für diese Demo. Siehe unten.>
```

## Der Abschnitt „Das bitte nicht behaupten"

Schützt Bruno vor einem Vertriebler, der übertreibt. Immer enthalten:

- **Keine Ranking-Versprechen.** Die Demo ist sauber gebaut, das ist eine
  Grundlage – keine Zusage über Google-Positionen (`seo-basis`)
- **Keine Zahlen, die nicht auf der Seite stehen.** Keine geschätzten
  Mehranfragen, keine Prozentwerte
- **Platzhalter nicht als fertig verkaufen** – jeden hier namentlich nennen
- **Keine Automatik behaupten, die nicht gebaut ist.** Fest eingebaute Inhalte
  aktualisieren sich nicht von selbst – hier namentlich nennen, welche das sind
- **Keine Aussagen über die Wettbewerber dieses Interessenten.** Der
  Marktvergleich oben stützt sich auf eine bundesweite Stichprobe des Gewerks –
  über die Betriebe in seiner Stadt sagt sie nichts. Das Verbot aus CLAUDE.md
  §8 („keine Wettbewerbs-Vergleiche") gilt für die **Website-Copy**: Dort macht
  ein Vergleich den Betrieb kleinlich. Im Gespräch **über** die Website ist ein
  belegter Marktüberblick etwas anderes – solange er die Stichprobe mitnennt

Dazu alles, was in dieser Demo besonders leicht missverstanden wird – etwa ein
Bewertungs-Widget, das echt aussieht, aber Beispieldaten zeigt.

## Regeln

- **Der Vertriebler ist kein Techniker.** Keine Dateinamen, keine Klassen,
  keine CSS-Begriffe. Er muss das Dokument vor dem Call einmal lesen können
- **Scanbar schreiben.** Er überfliegt es fünf Minuten vor dem Termin
- **Nichts erfinden.** Auch hier gilt die Belegpflicht – die Seite ist die
  Quelle, nicht die Absicht
- **Keine Länge um der Länge willen.** Fünf echte Besonderheiten schlagen
  zwölf aufgezählte Selbstverständlichkeiten. „Responsive" ist keine
  Besonderheit, das erwartet jeder
- **Deutsch.**
