# LERNSCHLEIFE – Plan

**Status: Stufe 1 und 2 gebaut.** Beschreibt, wie aus jeder fertigen Demo eine
Rückmeldung entsteht, aus mehreren Rückmeldungen Muster werden, und aus Mustern
Messpunkte im Template.

**Korrigiert gegenüber der ersten Planfassung:** Diese sah ein Formular vor,
das Bruno ausfüllt, sowie ein eigenes Sammel-Repo. Beides ist gestrichen. Sein
manueller Beitrag ist das **Korrigieren der Demo**, nicht das Dokumentieren –
die Rückmeldung entsteht vollautomatisch. Und sie wird nirgends versioniert
abgelegt, sondern direkt an ihn ausgeliefert; er sammelt die Dateien und gibt
sie zur Auswertung weiter.

---

## 1. Das Problem

Jede Demo wird nach der Übergabe besser – aber das Wissen darüber verschwindet.
Bruno korrigiert im Chat („der Hero ist zu generisch", „das Bild passt nicht",
„der Satz muss raus"), Claude bessert nach, die Demo geht raus. Beim nächsten
Kunden fängt dasselbe von vorn an.

Die beiden bisherigen Retrospektiven haben das bereits gezeigt und einen
Befund geliefert, der die ganze Bauweise dieser Schleife bestimmt:

> **Beide Demos sind an Regeln gescheitert, die längst im Template standen.**

Daraus folgt: Eine Lernschleife, die nur neue Regeln produziert, verschlimmert
das Problem. Der wertvolle Output sind **Messpunkte und Gates**, nicht Prosa.

## 2. Grundprinzipien

**Gegen die Quelle, nicht gegen das Gedächtnis.** Die Rückmeldung wird aus
Git-Diff, Messwerten und Chat-Transkript erzeugt – nicht aus dem, was ein Agent
meint, getan zu haben. Dieselbe Session, die die Demo gebaut hat, beschönigt
zuverlässig. Das ist in diesem Repo zweimal passiert (Branchendateien, die
„geprüft" waren; ein Prüfskript mit sechs eigenen Fehlern).

**Was nicht gezählt werden kann, wird geschätzt.** Freitext-Rückmeldungen
lassen sich später nicht auswerten. Jeder Befund bekommt feste Kategorien und
eine Kennung, damit Muster zählbar statt spürbar sind.

**n=1 ist kein Muster.** Eine Änderung in einer Demo ist ein Einzelfall. Erst
ab zwei unabhängigen Demos wird daraus ein Befund, ab drei eine Regel. Dieselbe
Schwelle wie in `branchen-wissen`.

**Belegpflicht gilt auch hier.** Jede Musterbehauptung nennt die Demos, auf
denen sie beruht – `(D2, D5, D7)`, analog zur Quellen-Notation der
Branchendateien. Eine Auswertung ohne Belege ist eine Meinung.

**Die Schleife muss vorbereitet werden, nicht nachträglich rekonstruiert.**
Wer erst bei der Übergabe fragt „was war eigentlich die erste Version?", hat
die Information schon verloren. Deshalb Abschnitt 5.

## 3. Architektur – und warum die Sammlung nicht ins Template darf

**Kritischer Punkt:** `demo-template` ist ein GitHub-Template. „Use this
template" kopiert **alle** Dateien des Default-Branches in das neue Repo. Läge
die Rückmeldungs-Sammlung im Template, bekäme jeder neue Kunde die
Rückmeldungen zu allen anderen Kunden mitgeliefert – inklusive Namen, Kritik
und Verkaufsergebnis. Es gibt keinen Mechanismus, einzelne Dateien vom
Template-Kopiervorgang auszunehmen.

Daraus folgt eine Zweiteilung, die der von `branchen-wissen` entspricht
(Rohscrapes bleiben draußen, nur das Destillat kommt rein):

| Ort | Inhalt | Warum dort |
|---|---|---|
| **Demo-Repo, `.feedback/`** | die erzeugte Rückmeldung, **gitignoriert** | Entsteht, wo die Daten liegen – ohne je versioniert zu werden |
| **Bei Bruno** | die gesammelten Dateien | Ausgeliefert per `SendUserFile`. Kein Repo, keine Historie, keine Kundendaten in fremden Kundenrepos |
| **`demo-template`** | nur das **Destillat**: Messpunkte, Gates, Regeln | Wandert per „Use this template" mit – und soll das auch |

Ein eigenes Sammel-Repo wurde verworfen: Es löst dasselbe Problem wie die
Auslieferung an Bruno, kostet aber ein weiteres Repo und legt Kundenkritik
dauerhaft versioniert ab.

## 4. Zwei Messpunkte statt einem

Bruno hat einen Zeitpunkt benannt: die Übergabe an den Vertrieb. Der zweite ist
der wertvollere und fehlt noch.

### T1 – Übergabe an den Vertrieb
**Frage:** Was musste ich korrigieren, bevor die Demo zeigbar war?
**Misst:** die interne Qualität der ersten Claude-Version.
**Auslöser:** `/rueckmeldung` am Ende der Bau-Session.

### T2 – Nach dem Sales-Termin
**Frage:** Wie kam die Demo an? Beauftragt oder nicht? Was sagte der Inhaber?
**Misst:** die tatsächliche Wirkung – das eigentliche Ziel.
**Auslöser:** `/rueckmeldung --termin`, Tage bis Wochen später.

**Warum T2 entscheidend ist:** Eine Demo ist nicht gut, weil Bruno wenig
korrigieren musste. Sie ist gut, wenn sie verkauft. Ohne T2 optimiert die
Schleife auf Brunos Geschmack statt auf Abschlüsse – und genau die Fälle, in
denen beides auseinanderfällt, sind die lehrreichsten.

T2 bleibt bewusst klein (fünf Felder, zwei Minuten), sonst wird es nie
ausgefüllt.

## 5. Die Vorbereitung: ohne Marker kein Vorher

Die Kernfrage „was war Claudes erste Version, was kam danach?" ist nachträglich
nicht beantwortbar, wenn niemand den Punkt markiert hat.

**Lösung:** Am Ende von Phase 4 (Bau fertig, vor der QA) setzt der Workflow
automatisch einen Git-Tag:

```
git tag demo-v1 -m "Erste vollständige Claude-Version, vor QA und Korrekturen"
```

Damit ist jederzeit rekonstruierbar:

```
git diff demo-v1..HEAD -- site/
```

Zusätzlich werden die Messwerte des Erstbaus abgelegt
(`.demo-messung/v1.json` aus `hero-check`, `layout-check`, `copy-check`), damit
später nicht nur „was wurde geändert", sondern auch „wurde es messbar besser"
beantwortbar ist.

**Das ist der einzige Teil, der am bestehenden Workflow etwas ändert** – eine
Zeile in Phase 4. Alles andere kommt obendrauf.

## 6. Das Rückmeldungs-Dokument

Eine Vorlage im Template (`docs/RUECKMELDUNG.md`), je Demo gefüllt.

### Kopf
Kunde, Gewerk, Datum, `TEMPLATE-VERSION`, Demo-Kennung (`D7`), Link zur Demo.

### Je Befund eine Zeile

| Feld | Werte | Wofür |
|---|---|---|
| **Kategorie** | Hero · Struktur · Copy · Design · Assets · Fakten · Funnel · Technik | macht Muster zählbar |
| **Phase** | 0–5 – wo hätte es auffallen müssen? | zeigt, wo das Netz Löcher hat |
| **Schwere** | blockierend · störend · Geschmack | trennt Wichtiges von Vorlieben |
| **Was** | ein Satz | |
| **Original-Zitat** | Brunos Wortlaut aus dem Chat | ungefiltert, nicht paraphrasiert |
| **Einordnung** | siehe unten | der eigentliche Lerninhalt |

### Die Einordnung – das Herzstück

Jeder Befund wird gegen das bestehende Regelwerk gehalten. Drei Fälle:

| Einordnung | Bedeutung | Konsequenz |
|---|---|---|
| **Regel verletzt** | Die Regel stand da, wurde nicht eingehalten | **Kein neuer Text.** Ein Messpunkt oder ein Gate im Skript |
| **Regel fehlt** | Echte Lücke | Neue Regel oder Skill-Ergänzung |
| **Geschmack** | Vorliebe, kein Fehler | Notieren, nicht regeln |

**Warum diese Unterscheidung alles entscheidet:** Die Retros haben gezeigt,
dass „Regel verletzt" der häufigste Fall ist. Wer darauf mit einer neuen Regel
antwortet, schreibt dieselbe Regel zum zweiten Mal auf und löst nichts. Die
richtige Antwort ist ein Wert, der gemessen wird.

## 7. Erzeugung: was automatisch geht und was nicht

Geprüft, nicht vermutet – am Transkript dieser Session (2760 Zeilen):

| Schritt | Automatisierbar? | Befund |
|---|---|---|
| Diff `demo-v1..HEAD` auswerten | **ja** | Git liefert Dateien, Sektionen, Umfang |
| Messwerte vorher/nachher | **ja** | Skripte existieren bereits |
| Brunos Korrektur-Nachrichten finden | **teilweise** | Stichwort-Filter markierte 32 von 60 Nachrichten – mit klaren Fehltreffern. Taugt als **Vorfilter**, nicht als Urteil |
| Kategorie und Phase zuordnen | **Vorschlag** | Agent schlägt vor, Bruno bestätigt |
| Einordnung Regel-verletzt/fehlt | **nein** | Verlangt Abgleich mit dem Regelwerk und Urteil |
| Muster über mehrere Demos zählen | **ja** | Skript, nicht Agent |

**Daraus die Arbeitsteilung:** Der Agent liest den Chat und den Diff und
schreibt das Dokument allein – **keine Rückfragen an Bruno.** Der
Stichwort-Vorfilter war für ein Skript gedacht; ein Agent mit dem vollen
Chat-Kontext braucht ihn nicht, er liest die Nachrichten im Zusammenhang.

Der Preis dieser Vollautomatik: Der Agent bewertet Arbeit, an der er beteiligt
war. Dagegen hilft nur die **Belegpflicht** – jeder Befund braucht ein
wörtliches Zitat oder eine Diff-Stelle. Einen Wortlaut kann man nicht
beschönigen. `feedback-auswerten.mjs` meldet Befunde ohne Beleg und schließt
sie aus der Auswertung aus.

**Zeitpunkt:** `/rueckmeldung` läuft am besten in derselben Session, solange
der Kontext warm ist. Es funktioniert aber auch später – das Transkript liegt
als Datei vor und ist maschinell lesbar (verifiziert).

## 8. Auswertung: von Rückmeldungen zu Mustern

Im Repo `demo-lernschleife`:

- `rueckmeldungen/D07-mustermann-dachdecker.md` – je Demo eine Datei
- `MUSTER.md` – die kumulierte Auswertung
- `scripts/muster-check.mjs` – prüft `MUSTER.md` gegen die Rückmeldungen,
  Vorbild ist `branchen-check.mjs`
- `.claude/commands/auswerten.md` – `/auswerten`

Ein Mustereintrag sieht aus wie ein Eintrag in einer Branchendatei:

```markdown
| Muster | Vorkommen | Einordnung | Konsequenz |
|---|---|---|---|
| Hero-Bild wurde ersetzt, weil Stockfoto | 4 von 7 (D2, D3, D5, D7) | Regel verletzt | Gate in hero-check.mjs: Stockfoto-Pfade → Fehler statt Warnung |
| „Ihr Partner für" in der Headline | 3 von 7 (D1, D4, D6) | Regel verletzt | copy-check.mjs prüft Headline gegen Slot-Regel |
| Instagram-Feed nachträglich gewünscht | 3 von 7 (D3, D6, D7) | Regel fehlt | Pflichtfrage in Phase 0 aufnehmen |
```

`muster-check.mjs` rechnet nach: Stimmt die Bezugsgröße? Existieren die
genannten Demos? Wird eine Konsequenz behauptet, die im Template nicht steht?
**Ein Muster ohne belegbare Demos ist kein Muster.**

## 9. Der Kreis schließt sich

Ein bestätigtes Muster führt zu genau einer der folgenden Konsequenzen:

| Konsequenz | Wo |
|---|---|
| Messpunkt | `docs/CHECKLISTE.md` |
| Gate (Fehler statt Warnung) | `scripts/*-check.mjs` |
| Handwerksregel | passender Skill |
| Pflichtfrage | `brief-analyst`, Phase 0 |
| Prinzip | `CLAUDE.md` – letzte Wahl, nicht erste |

Jede Änderung wird versioniert – das System dafür existiert bereits:
`TEMPLATE-VERSION` hochzählen, Eintrag in `docs/CHANGELOG.md` **mit Anlass**.
Der Anlass lautet dann nicht mehr „ist mir aufgefallen", sondern
„4 von 7 Demos, D2/D3/D5/D7". Damit ist jede Regel im Template auf konkrete
Fälle zurückführbar – und beim nächsten Aufräumen nicht mehr als „unnötig
streng" entfernbar.

## 10. Wirkt die Schleife? – Erfolgsmessung

Eine Lernschleife ohne Erfolgsmessung ist Selbstbeschäftigung. Zwei Kennzahlen,
beide aus vorhandenen Daten:

**Korrekturen je Demo, nach Kategorie.** Sinkt die Zahl über die Demos? Wenn
Hero-Korrekturen von 5 auf 1 fallen, wirkt das Hero-System. Wenn sie bei 5
bleiben, ist die Konsequenz falsch gewählt – dann nicht mehr Regeln, sondern
andere Regeln.

**Abschlussquote je Template-Version.** Aus T2. Grobkörnig, aber es ist die
einzige Zahl, die das eigentliche Ziel misst. **Ehrlich dazu:** Bei wenigen
Demos pro Monat ist das lange keine belastbare Statistik. Sie wird als Hinweis
geführt, nicht als Beweis – dieselbe Regel wie bei Branchendateien unter n=3.

**Regel-Verfall.** Eine Regel, die über fünf Demos nie greift und nie verletzt
wird, kommt auf den Prüfstand. Sonst wächst das Template, bis es niemand mehr
liest – und ein ungelesenes Regelwerk schützt vor nichts.

## 11. Ausbaustufen

Nicht alles auf einmal. Jede Stufe ist für sich nützlich.

**Stufe 1 – Erfassen. ✅ gebaut**
`demo-v1`-Tag am Ende von Phase 4 · Agent `feedback-analyst` · Befehl
`/closing` · Ablage in `.feedback/` (gitignoriert) · Auslieferung per
`SendUserFile`.

**Stufe 2 – Auswerten. ✅ gebaut**
`scripts/feedback-auswerten.mjs` (zählt Verteilungen und Muster ab zwei
Demos, meldet fehlende Belege) · Befehl `/auswerten` mit der Zuordnung
Ursache → Lösungsart.
*Aussagekräftig ab etwa drei Rückmeldungen – vorher gibt es nichts zu zählen.*

**Stufe 3 – Wirkung messen.**
T2 nach dem Termin · Kennzahlen aus Abschnitt 10.

**Stufe 4 – Automatisieren.**
Erinnerung an T2 per Routine · Auswertung läuft automatisch bei jeder neuen
Rückmeldung · Vorschlagsliste für das nächste Template-Update.

## 12. Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Dokument wird nie ausgefüllt | Vorausgefüllt, fünf Minuten Prüfaufwand, nicht Schreibaufwand |
| Agent bewertet die eigene Arbeit | Erzeugung aus Diff und Transkript, nicht aus Erinnerung |
| Muster werden erfunden | `muster-check.mjs`, Demo-Belege je Zeile, n≥2 |
| Regelwucherung | „Regel verletzt" → Gate statt Text · Regel-Verfall nach 5 Demos |
| Kundendaten im Template | Sammlung liegt in eigenem Repo, niemals im Template |
| Optimierung auf Geschmack statt Abschluss | T2 als zweiter Messpunkt |

## 13. Offene Entscheidungen

Vor dem Bau von Bruno zu klären:

1. **Eigenes Repo `demo-lernschleife`?** Empfehlung: ja, wegen der
   Template-Kopie. Alternative wäre ein Ordner außerhalb von Git – dann
   allerdings ohne Historie und ohne Zugriff aus anderen Sessions.
2. **T2 mitbauen oder später?** Empfehlung: Feld vorsehen, Ausfüllen erst ab
   Stufe 3 – aber die Struktur jetzt anlegen, damit alte Rückmeldungen später
   nicht nachgerüstet werden müssen.
3. **Rückwirkend?** Für abgeschlossene Demos existiert kein `demo-v1`-Tag,
   aber die Transkripte liegen vor. Eine grobe Rückmeldung ist daraus
   rekonstruierbar – lohnt sich für die letzten zwei bis drei Demos, nicht für
   alle.
4. **Wer erstellt die Rückmeldung?** Empfehlung: ein eigener Agent
   (`feedback-analyst`), nicht der Haupt-Agent der Bau-Session – aus demselben
   Grund, aus dem `hero-critic` vom `hero-specialist` getrennt ist.
