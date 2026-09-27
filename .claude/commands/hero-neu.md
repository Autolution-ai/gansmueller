---
description: Überarbeitet den Hero einer bestehenden Demo nach dem aktuellen Hero-Standard – rüstet die nötigen Bausteine vorher automatisch nach.
---

# /hero-neu – Hero einer bestehenden Demo neu bauen

Für Demos, die aus einem **älteren Template-Stand** entstanden sind und deren
Hero nicht sitzt. Rüstet die Hero-Bausteine nach und baut den Hero neu.

**Dieser Befehl läuft im Demo-Repo, nicht im Template.**

Normalerweise gilt: „Eine laufende Demo zieht nie automatisch nach"
(CLAUDE.md §12). Dieser Befehl ist die ausdrückliche Ausnahme, die Bruno
anfordert – und er fasst **nur den Hero an**, nichts sonst.

---

## Schritt 1 – Ausgangslage sichern

Bevor irgendetwas kopiert wird:

```
git status
```

Sind Änderungen offen: committen oder stashen. Ein halbfertiger Stand plus
nachgerüstete Dateien ist hinterher nicht mehr auseinanderzuhalten.

Aktuellen Hero **vorher messen und als Screenshot festhalten**, sonst gibt es
später keinen Vergleich:

```
node scripts/hero-check.mjs --out .hero-check/vorher site/index.html
```

(Existiert das Skript noch nicht, kommt es in Schritt 2 – dann diesen Befehl
danach nachholen.)

## Schritt 2 – Bausteine nachrüsten

Template holen (per `add_repo` für `Autolution-ai/demo-template`, dann klonen –
**nicht** ins Demo-Repo hinein, sondern daneben, z.B. nach `/tmp/template`).

**Diese Dateien kopieren** (reine Infrastruktur, enthalten keine Kundendaten):

| Was | Wofür |
|---|---|
| `.claude/skills/hero-craft/` | das Hero-Handwerk selbst |
| `.claude/skills/website-copy/` | Slot-Regel, Fünf-Stufen-Leiter, Inhaber-Test |
| `.claude/skills/anti-slop/` | Stakkato, Floskeln |
| `.claude/skills/branchen-wissen/` | Verbotsliste des Gewerks, Wettbewerber-Heros |
| `.claude/skills/design-system/` | Typo-Spannweite, Kontrast, `--color-primary-on-dark` |
| `.claude/skills/motion-toolkit/` | falls der Hero Bewegung bekommt |
| `.claude/agents/hero-specialist.md` | baut die Varianten |
| `.claude/agents/hero-critic.md` | urteilt unabhängig |
| `scripts/hero-check.mjs` | misst Hero-Varianten |
| `scripts/layout-check.mjs` | misst Kontrast, Touch-Ziele, Fläche |
| `scripts/copy-check.mjs` | misst die Hero-Copy |

**Diese Dateien NIEMALS überschreiben** – sie enthalten die Arbeit an dieser
konkreten Demo:

```
site/index.html       die Demo selbst
site/css/tokens.css   die Kunden-CI (Farben, Schriften)
site/css/styles.css   das Layout dieser Demo
site/vercel.json      Header dieser Demo (u.a. noindex)
docs/DEMO-SPEC.md     Hauptziel, Perspektive, Person
docs/DOSSIER.md       die Strategie dieser Demo
docs/SEO-NOTIZEN.md   gefüllte Notizen
site/assets/          Bilder, Logo, Schriften
```

**Fallstrick bei `CLAUDE.md` und `docs/CHECKLISTE.md`:** `hero-craft` verweist
auf Paragraphen („CLAUDE.md §3", „§7"). Im alten Stand stimmen die Nummern
möglicherweise nicht. Beide Dateien **diffen statt blind kopieren** – und wenn
im Demo-Repo demo-spezifische Ergänzungen stehen, diese erhalten. Im Zweifel
nicht kopieren: Der Hero lässt sich auch bauen, wenn eine Paragraphennummer
nicht passt.

Nach dem Kopieren: **melden, welche Dateien dazugekommen sind**, bevor es
weitergeht.

**Achtung bei älteren Demos:** Seit Template-Stand 2026.09.12 liegt die
Website unter `site/`. Eine Demo aus einem früheren Stand hat `index.html` und
`css/` noch im Repo-Wurzelverzeichnis. **Dann gelten die Pfade ohne `site/`** –
und dieser Befehl zieht den Umzug ausdrücklich **nicht** nach: Er fasst nur den
Hero an. Ein Struktur-Umzug ist eine eigene Entscheidung, keine Nebenwirkung
einer Hero-Überarbeitung.

## Schritt 3 – Grundlagen prüfen, nicht erfinden

`hero-craft` baut auf drei Dingen auf. Fehlt eins im alten Repo, wird gefragt,
nicht geraten (CLAUDE.md §3):

1. **`docs/DOSSIER.md`** – was ist einzigartig, was hervorheben. Ist es leer
   oder existiert es nicht: Bruno fragen, ob es nachgeholt wird oder ob der
   Hero aus dem vorhandenen Material gebaut werden soll.
2. **Gewerk** – für die Verbotsliste aus `branchen-wissen`. Steht es nicht in
   `docs/DEMO-SPEC.md`: aus der Demo ableiten und **bestätigen lassen**.
3. **Assets** – welche Bilder existieren tatsächlich unter
   `site/assets/images/`?
   Ein Hero-Konzept, das ein Foto voraussetzt, das niemand hat, ist
   verschwendete Arbeit (CLAUDE.md §6).

## Schritt 4 – Diagnose des bestehenden Heros

Bevor etwas Neues entsteht: **benennen, warum der alte nicht trägt.** Messwerte
aus Schritt 1 plus die zwei Tests aus `hero-craft`:

- **Austauschbarkeits-Test:** Logo abdecken – könnte der Hero einem
  Wettbewerber im selben Gewerk gehören?
- **Inhaber-Test:** Würde der Chef jeden Satz laut ins Gesicht sagen?
- Typo-Spannweite, Kontrastumfang, ganzflächiges Overlay (Weißschleier-Reflex),
  Höhe auf 1440×900 und 1512×982, Breite auf 1920

🛑 **Kontrollpunkt:** Diagnose zeigen. Erst wenn klar ist, *warum* er nicht
sitzt, wird gebaut – sonst entsteht ein anderer Hero, kein besserer.

## Schritt 5 – Zwei Varianten bauen

→ Subagent `hero-specialist`, Skill `hero-craft`.

Zwei echte Varianten, die sich in **Typ UND Hintergrund** unterscheiden – nicht
zwei Farbvarianten desselben Entwurfs.

**Die Varianten entstehen als eigene Dateien** (`site/hero-a.html`,
`site/hero-b.html`), nicht durch Überschreiben von `site/index.html`. Der bestehende Hero bleibt
unangetastet, bis eine Variante freigegeben ist.

```
node scripts/hero-check.mjs site/hero-a.html site/hero-b.html
```

## Schritt 6 – Unabhängiges Urteil

→ Subagent `hero-critic`. Bewertet am gerenderten Bild und an den Messwerten.
**Darf beide ablehnen** – dann zurück zu Schritt 5.

🛑 **Kontrollpunkt:** Bruno wählt die Variante.

## Schritt 7 – Einbau

Erst jetzt wird `site/index.html` angefasst. Nur die Hero-Sektion, der Rest der
Seite bleibt unberührt – das ist der ganze Zweck dieses Befehls.

Danach gegenmessen:

```
node scripts/hero-check.mjs site/index.html
node scripts/layout-check.mjs site/index.html
node scripts/copy-check.mjs --gewerk <gewerk> site/index.html
```

**Regressionsprüfung:** Sieht der Rest der Seite noch so aus wie vorher? Der
neue Hero darf keine Abstände, Farben oder Klassen verschieben, die andere
Sektionen nutzen.

🛑 **Finale Freigabe**, dann commit & push auf `main`.

## Grundhaltung

- **Nur der Hero.** Fällt unterwegs etwas anderes auf: melden, nicht mitfixen.
- **Belegpflicht gilt weiter.** Jede Zahl und jeder Name im neuen Hero kommt
  aus Briefing, Scrape oder von Bruno – auch wenn der alte Hero etwas anderes
  behauptet hat. Ein übernommener Satz ist keine Quelle.
- **Der alte Hero ist keine Quelle.** Stand dort eine Zahl ohne Beleg, wandert
  sie nicht mit.
- Deutsch, kurz, direkt.
