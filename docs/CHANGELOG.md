# CHANGELOG – Demo-Template

Was sich am **Template** ändert, nicht an einer einzelnen Demo.

**Wozu das gut ist.** Aus diesem Repo entsteht per „Use this template" jede
Demo. Eine Demo, die im Mai gebaut wurde, kennt die Regeln vom Mai. Ohne
Versionsstand ist beim Blick auf eine alte Demo nicht unterscheidbar, ob eine
Regel verletzt wurde oder damals noch nicht existierte – und ohne Begründung je
Eintrag wird eine Regel, deren Anlass niemand mehr kennt, irgendwann als
„unnötig streng" wieder entfernt. Genau so gehen Lehren verloren.

**Pflicht bei jeder Template-Änderung:**
1. `TEMPLATE-VERSION` hochzählen.
2. Hier einen Eintrag anlegen – mit **Anlass**, nicht nur mit Beschreibung.
3. Wenn eine Regel aus einem konkreten Fehler stammt: den Fehler benennen.

**Schema:** `JJJJ.MM.N` – Jahr, Monat, laufende Nummer innerhalb des Monats.
Kein Semver: Es gibt keine Kompatibilität zu brechen, nur einen Stand.

**Eine laufende Demo zieht nie nach.** Ein Template-Update gilt ab der nächsten
Demo. Eine bereits gebaute Demo wird nur dann angepasst, wenn Bruno das
ausdrücklich sagt – sonst kostet jede Template-Änderung Nacharbeit an
Projekten, die längst abgenommen sind.

---

## 2026.10.03 – `ui-ux-pro-max` richtig abfragen, sonst liefert er nichts

Anlass: Brunos Frage, ob die Design-Skills jetzt geladen und funktionsfaehig
sind. `skill-check.mjs` sagte ja, und das war formal richtig. Der Probelauf
sagte etwas anderes.

**Der Befund.** Die Abfrage, die ich dem `structure-architect` am 16.09. als
Pflichtabfrage vorgegeben hatte, liefert **null Treffer**:

```
"<gewerk> local service landing" --domain ux   ->  0 results
"handwerker webseite vertrauen"  --domain ux   ->  0 results
"trust signals local service business"         ->  0 results
"contrast"                       --domain ux   ->  3 results
"home services"             --domain product   ->  2 results, mit Stilempfehlung
"plumbing home service website" --design-system ->  vollstaendiges System
```

Zwei Ursachen, beide meine:

1. **Die Datenbank ist englisch.** Die deutschen Ausloeser in der Beschreibung
   sorgen dafuer, dass der Skill **anspringt**. Sie aendern nichts daran, wie er
   **abgefragt** wird. Das hatte ich nicht getrennt.
2. **`--domain ux` versteht UI-Handwerk, keine Branchensprache.** Die 119 Regeln
   liegen in zwoelf Kategorien (Accessibility 20, Forms 11, Animation 10,
   Layout 9, …). Fuers Gewerk ist `--domain product` oder `--design-system`
   zustaendig, dort liegen 192 Produkttypen. Fuer Handwerksbetriebe trifft
   `home services`.

Haette das niemand geprueft, waere der Skill in der ersten echten Demo
zweimal mit null Treffern zurueckgekommen und danach als nutzlos abgehakt
worden – obwohl er genau die Antwort enthaelt, die gesucht war.

Geaendert: Tabelle mit den geprueften Abfragen und drei Regeln im Kopf der
`SKILL.md`, korrigierte Pflichtabfrage im `structure-architect`.

**Nebenbei im HSK-Repo behoben:** Dort standen `design-system` und
`ui-ux-pro-max` nur in `docs/WORKFLOW.md`, nicht in den Agenten, die
tatsaechlich gestalten. `skill-check` war zufrieden, weil er bei 0 Nennungen
anschlaegt und nicht bei 1. Jetzt stehen beide in `hero-specialist`,
`structure-architect` und `visual-critic`.

## 2026.10.02 – Die Branch-Frage kommt nicht mehr

Anlass: Die HSK-Session fragte bei **jedem** Start dasselbe: „Soll die Demo auf
main weiterlaufen, wie CLAUDE.md es vorsieht, oder auf dem Session-Branch
bleiben?" Bruno hat diese Frage inzwischen mehrfach beantwortet.

**Warum sie trotz vorhandener Regel kam.** §5 sagte „Direkt auf `main`
arbeiten". Das ist eine Beschreibung, keine Vorrangregel. Claude Code setzt beim
Sessionstart einen eigenen Branch (`claude/...`) und verlangt ausdruecklich,
dort zu entwickeln. Zwei Anweisungen, beide plausibel, also griff §2 („Bei
Unklarheiten: Immer nachfragen") und machte daraus eine Rueckfrage. Jedes Mal.

Zwei Aenderungen:

- **§5 ist jetzt eine Vorrangregel** und benennt den Konflikt ausdruecklich:
  `main` gilt auch dann, wenn die Session einen Branch vorgibt. Dazu der Grund,
  damit die Regel nicht als Bequemlichkeit gelesen wird: Vercel deployed `main`,
  Arbeit auf einem Branch ist fuer den Kunden unsichtbar. Und die Handlung statt
  der Frage: kommentarlos auf `main` wechseln, vorhandene Commits mitnehmen und
  das im Commit vermerken. Einzige Ausnahme bleibt, dass Bruno in der Session
  ausdruecklich einen Branch verlangt.
- **§2 bekommt die fehlende Einschraenkung** zur Nachfragepflicht: Was in
  CLAUDE.md entschieden ist, wird nicht neu gefragt. Die Pflicht gilt fuer echte
  Luecken. Eine Regel, die jedes Mal zur Rueckfrage wird, ist keine Regel.

Das ist derselbe Mechanismus wie bei den toten Skills, nur andersherum: Dort lag
etwas im Repo und griff nie, hier griff etwas und wurde trotzdem jedes Mal zur
Diskussion gestellt. Beides kostet an der Stelle Zeit, an der niemand sie hat.

Im HSK-Repo mit `9fe4cad` nachgezogen, weil die Frage dort auflief. Geprueft:
Auf dem Remote liegt kein Branch ausser `main`, es ist also nichts verloren –
die Arbeit lag nur lokal in der Session.

## 2026.10.01 – Echte Google-Daten statt pauschaler Sperre

Anlass: Bruno zur Sperre der vier JSON-LD-Felder: „bei diesen Sachen waere es
ja eigentlich schlau, in Zukunft auch in den Demos richtige Google-Bewertungen,
die richtigen Oeffnungszeiten zu haben". Richtig, und die bisherige Regel stand
dem im Weg.

**Der Befund dahinter.** `seo-basis` sagte „verboten, **wenn** nicht belegt".
Das Gate in `copy-check.mjs` brach dagegen ab, sobald eines der vier Felder
ueberhaupt auftauchte. Das Gate war strenger als die Regel. Bis gestern war das
vertretbar, weil niemand „belegt" messen konnte. Seit `beleg-check.mjs` gibt es
dafuer einen Pruefer, und die Pauschalsperre kostet nur noch etwas.

**Drei Klassen statt einer Verbotsliste:**

| | Felder | Regel |
|---|---|---|
| Erlaubt, sobald belegt | `openingHours`, `priceRange` | Aus dem verifizierten Google-Eintrag. Preisspanne nur, wenn sie im Briefing steht |
| Auch mit echter Quelle nicht | `aggregateRating`, `review` | Review-Auszeichnung bildet Bewertungen ab, die auf **dieser** Seite gesammelt wurden. Eine von Google uebernommene Note im eigenen Markup ist ein Richtlinienverstoss, auch wenn die Zahl stimmt |
| Nie | jedes Feld, das auf der Seite nicht sichtbar ist | unveraendert |

**Die echte Bewertung geht trotzdem auf die Demo**, nur an der richtigen
Stelle: sichtbar im Inhalt mit Quellenangabe („4,9 von 5 bei 37 Bewertungen auf
Google") und das Profil ueber `sameAs` verlinkt.

Umgesetzt:
- `copy-check.mjs` trennt `ldHart` (Fehler) von `ldBelegpflichtig` (Warnung mit
  Verweis auf den Belegabgleich).
- `beleg-check.mjs` liest das JSON-LD, zieht `openingHours`, `opens`, `closes`
  und `priceRange` heraus und haelt jeden Wert gegen `quellen/`. Geprueft in
  beide Richtungen: belegte Zeit laeuft durch, erfundene bricht ab.
  Selbsttest jetzt 19 Faelle.
- `quellen/README.md`: festes Schema fuer `scrape-google.md` mit Place-ID,
  Profil-URL, den uebereinstimmenden Merkmalen und dem Verifikationsstand.
  Ohne diese Angaben ist spaeter nicht mehr nachvollziehbar, **welcher**
  Eintrag das war.
- `docs/WORKFLOW.md` Phase 1: eigener Schritt 2 fuer das Google-Profil, vor der
  CI-Extraktion. Folgeschritte neu nummeriert.
- `CLAUDE.md` §5 und `seo-basis`: die drei Klassen, und was bei einem nicht
  verifizierten Profil gilt (Hinweiskasten statt Zahl).

## 2026.09.31 – Zwei Organisationen, nicht eine: `Autolution-ai` und `Autolution`

Anlass: Am 15.09. liess Bruno `Autolution-ai` ueberall auf `Autolution`
korrigieren. Das war halb richtig und hat an zwei Stellen einen Fehler erzeugt.
Belegt ueber `list_repos` am 18.09.2026:

| Organisation | Inhalt |
|---|---|
| `Autolution-ai` | `demo-template`, `HSK-`, alle Kunden-Demos |
| `Autolution` | `Live-Template`, `colourclean-Live`, alle Live-Projekte |

Die Trennung ist sinnvoll und bleibt. Falsch waren die Verweise:

- `.claude/commands/hero-neu.md` Zeile 41 sagte `add_repo` auf
  `Autolution/demo-template`. Dieses Repo gibt es nicht. Der Aufruf scheitert
  mit einer Meldung ueber „cross-tier adds", die nicht erklaert, was los ist.
  Aufgefallen ist es, weil derselbe Aufruf in dieser Session fehlschlug.
- `CLAUDE.md` §5 verlangte die Vercel-GitHub-App fuer die Organisation
  `Autolution`. Dort liegen die Live-Projekte. Fuer die **Demos** braucht sie
  `Autolution-ai`, und weil beide Seiten deployen, braucht es sie in **beiden**
  Organisationen, je einmal.

Der Absatz sagt das jetzt ausdruecklich, statt eine Organisation zu nennen und
die andere vorauszusetzen. Eine Verwechslung kostet sonst zweimal Zeit: beim
`add_repo` mit einer unverstaendlichen Meldung, und in Vercel mit der Haelfte
der fehlenden Projekte.

`DEMO-TEMPLATE-SYNC` bleibt bei `2026.09.29`: Die geteilten Bausteine aus
`2026.09.30` (`scripts/beleg-check.mjs`) stehen im Live-Template noch aus.

## 2026.09.30 – `beleg-check.mjs`: die Belegpflicht hat endlich ein Gate

Anlass: Die Rueckmeldung zur Demo Kerrinnes (14.09.2026) zaehlte sechs Stellen,
an denen etwas auf der Seite stand, das aus keiner Quelle stammte. Erfundene
Oeffnungszeiten im Footer, eine Tatsachenbehauptung ueber ein Kundenprojekt,
drei Alt-Texte, eine falsche Fragenzahl im CTA. Die Regel dagegen stand
viermal im Template. Ihr Befund zur Ursache: „Sie wurde nicht uebersehen, weil
sie unklar war, sondern weil niemand vor dem Push gegen sie gemessen hat."

**Zuerst fehlte der Quellenort.** Der Workflow sagte „Bestehende Website
scrapen (Apify)", aber nirgends stand, wohin das Ergebnis kommt. Bei Kerrinnes
entstanden deshalb ad-hoc `docs/GOOGLE-ANALYSE.md` und
`docs/INSTAGRAM-ANALYSE.md`, in einer anderen Demo gar nichts. Ein Gate braucht
einen festen Gegenstand. Neu: **`quellen/`**, ausserhalb von `site/` und damit
ueber keine URL erreichbar, aber anders als `.closing/` **nicht** gitignoriert –
die Belege muessen beim naechsten Lauf noch da sein. Konventionen in
`quellen/README.md`.

`scripts/beleg-check.mjs` prueft drei Dinge im gerenderten DOM:

1. **Quellenabgleich.** Jede Belegzahl und jedes externe Ziel der Seite muss in
   `quellen/` oder in DEMO-SPEC, DOSSIER, SEO-NOTIZEN vorkommen. Telefonnummern
   werden ueber die Ziffernfolge verglichen, URLs ohne Schema und `www.`.
2. **Selbstabgleich.** „Sieben Fragen" im Knopf gegen acht `data-step` im
   Formular. Genau Befund B8, und die Quelle stand zwei Bildschirmseiten tiefer
   im eigenen Markup.
3. **Platzhalter.** Lorem, TODO, Mustermann, example.com in der gebauten Seite.

**Was als Belegzahl gilt, ist bewusst eng gefasst:** Ziffer plus Einheitswort in
der Naehe (Mitarbeiter, Jahre, Uhr, Bewertungen, Euro, m², …) oder eine
Jahreszahl. Ein Gate, das bei jeder Ziffer anschlaegt, wird nach dem zweiten
Lauf abgeschaltet.

**Vier eigene Fehler, drei davon gefaehrlich.** Wie bei jedem Pruefskript hier:

- **Eine fremde Instagram-Adresse galt als belegt**, weil die nackte Domain in
  der Quelle stand. Das ist der schlimmste denkbare Fehlalarm-Ausfall: In der
  Demo laegen die Fotos eines fremden Betriebs, und der Inhaber sieht das
  sofort. Die Domain allein zaehlt jetzt nur noch bei URLs ohne Pfad.
- **Die „8" aus „8 bis 17 Uhr" galt als belegt**, weil die Quelle „1998"
  enthielt. Teilstring-Treffer reichen bei kurzen Zahlen nicht; Zahlen brauchen
  jetzt eine Wortgrenze.
- **Die Jahreszahl 1998 wurde in eine „199" zerlegt** und als unbelegt
  gemeldet. Fehlende Lookarounds im Extraktor.
- **`quellen/README.md` zaehlte sich selbst als Quelle**, mitsamt seiner
  Beispielwerte. Damit haette die Anleitung eine erfundene Zahl belegt.

Geprueft gegen zwei echte Seiten: Eine Nachbildung der Kerrinnes-Fehler ergibt
8 Fehler, alle echt. Die korrigierte Fassung derselben Seite ergibt 0.
Selbsttest: 15 Faelle.

Verankert: Punkt in `docs/CHECKLISTE.md` 5a, Schritt 1 in `docs/WORKFLOW.md`
Phase 1 (Scrape geht nach `quellen/`), §3 und die Bausteinliste in `CLAUDE.md`.
## 2026.09.29 – Zeiger auf `docs/START.md` des Live-Templates

Anlass: Der Abschnitt „Nach dem Vertragsabschluss" nannte den `live-start`-Befehl,
aber nicht den Ablauf drumherum (neue Session, beide Repos anhängen, Dry-Run,
Deutung der Meldungen). Der steht jetzt im Live-Template unter `docs/START.md`.
Gebraucht wird er aber **hier**, denn hier steht man, wenn der Kunde
unterschreibt.

- Verweis auf `docs/START.md` ergänzt, statt den Ablauf ein zweites Mal
  aufzuschreiben. Zwei Fassungen desselben Ablaufs laufen auseinander, und dann
  gilt die falsche
- Ein Punkt daraus steht trotzdem hier, weil er diese Phase betrifft: Sind
  `docs/DEMO-SPEC.md` und `docs/DOSSIER.md` gefüllt? `live-start` überspringt
  sie kommentarlos, wenn nicht, und in P0 der Live-Phase fehlt dann die
  Grundlage. Bemerkt wird das sonst erst nach dem Übergang

Reine Demo-Änderung, geteilte Bausteine unberührt. `DEMO-TEMPLATE-SYNC` zieht
deshalb mit, ohne dass etwas zu kopieren war (siehe CLAUDE.md §12).

---

## 2026.09.28 – `DEMO-TEMPLATE-SYNC`: wann das Live-Template hinterher ist

Anlass: Beide Repos teilen sich `.claude/skills`, `.claude/agents`,
`.claude/commands` und `scripts/`, aber nur dieses hier wächst laufend. Beim
Übergang in die Live-Phase tauscht `live-start.mjs` das Playbook komplett aus,
und zwischen 2026.09.14 und 2026.09.27 wären dabei `ui-ux-pro-max`,
`schema-markup`, `visual-critic` und `skill-check.mjs` verschwunden. Lautlos:
Ein fehlender Skill wirft keinen Fehler, er wird einfach nie geladen.

Im Live-Template ist das behoben (dort 2026.09.6): Was nur im Demo-Repo liegt,
wird behalten; was in beiden liegt und abweicht, wird gesichert und gemeldet.
Hier fehlte die andere Hälfte – **zu sehen, dass eine Lücke entsteht, bevor sie
beim Kunden auffällt.**

- `DEMO-TEMPLATE-SYNC` hält den Demo-Stand fest, auf den das Live-Template
  angeglichen ist. Beide Repos führen die Datei mit demselben Wert, sie erklärt
  sich in ihren eigenen Kommentarzeilen
- `CLAUDE.md` §12: Wer `TEMPLATE-VERSION` hochzählt, weiß ab sofort, dass das
  Live-Template damit hinterher ist – **falls** ein geteilter Baustein betroffen
  ist. Reine Demo-Änderungen (`site-analyst`, `/closing`) sind ausdrücklich
  ausgenommen und bleiben so
- `/closing` vergleicht die beiden Zeilen und meldet die Abweichung im
  Abschlussbericht

**Warum ausgerechnet in `/closing`:** Das ist der letzte Moment vor dem
Vertragsabschluss und damit vor `live-start.mjs`. Danach meldet der Übergang die
Lücke selbst, aber mitten im Projektstart. Verloren geht nichts, es kostet nur
Zeit an der Stelle, wo am wenigsten davon da ist.

**Was diese Datei bewusst nicht tut:** Sie erzwingt nichts. Es gibt keinen
Gate, der einen Push blockiert, weil das Live-Template hinterher ist. Ein
Template-Stand ist kein Fehler, sondern eine Information – und ein Gate an
dieser Stelle würde jede kleine Demo-Änderung zu einem Vorgang in zwei Repos
machen.

---

## 2026.09.27 – `schema-markup` aus SearchFit SEO, der Rest bewusst nicht

Anlass: Bruno hat das Plugin „SearchFit SEO" (MIT, searchfit/searchfit-seo)
vorgelegt, 11 Skills, 3 Agenten, 6 Commands, und gefragt, ob es
funktionstuechtig ist. Gemessen am 16.09.2026 statt geschaetzt:

**Was geprueft wurde.** Das Paket ist 228 KB, 30 Dateien, davon 24 Markdown.
Keine Skripte, keine Abhaengigkeiten, **keine API-Keys** – damit kein Konflikt
mit §4. Die drei Agenten fuehren `WebFetch` in ihren Tools.

**Der Befund.** Fremde Domains sind in dieser Umgebung nicht erreichbar:
`curl` auf zwei Stichproben gab 000, `WebFetch` auf example.com antwortete
`EGRESS_BLOCKED`. Damit laufen `seo-audit`, `technical-seo` (Core Web Vitals),
`broken-links` (extern), `ai-visibility` und der Agent `competitor-analyzer`
hier nicht. Fuer die bestehende Kundenseite ist das kein Verlust: Dafuer ist
ohnehin Apify zustaendig (§5).

**Uebernommen wurde auf Brunos Entscheidung nur das, was unmittelbar zur
Demo-Phase passt:** der Skill `schema-markup` und die Commands
`/generate-schema` und `/seo-check`. Der Rest ist Arbeit an einer **live
stehenden** Seite und gehoert damit ins Live-Template, nicht in eine Demo mit
`noindex`.

Drei Anpassungen waren noetig:

1. **`name`-Feld fehlte.** Keiner der 11 Skills hat eines. Ergaenzt, dazu
   deutsche Ausloeser in der Beschreibung.
2. **Template-Syntax entfernt.** Die Commands nutzen
   `{{ $ARGUMENTS.file ? … : … }}`. Ersetzt durch eine klare Anweisung mit
   Vorgabewert `site/index.html`.
3. **Vorrangregel.** JSON-LD sieht nach Technik aus, ist aber eine
   Tatsachenbehauptung ueber den Betrieb. Der Skill kennt die Belegpflicht
   nicht und wuerde Felder aus dem Seiteninhalt „auto-detecten". Jetzt steht im
   Kopf: jedes Feld braucht eine Quelle, Beispielwerte sind Struktur und nie
   Inhalt, `sameAs` nur mit kopierten URLs. Die vier Felder `aggregateRating`,
   `review`, `openingHours`, `priceRange` sind gesperrt, solange unbelegt –
   und das ist kein Hinweis, sondern ein Gate: `scripts/copy-check.mjs` bricht
   ab.

Bei `/seo-check` kam eine zweite Kollision dazu: Er prueft dieselben Dinge, die
`copy-check.mjs` bereits **misst**. Jetzt misst der Command zuerst und urteilt
danach; wo Liste und Messwert sich widersprechen, gewinnt der Messwert und der
Widerspruch wird gemeldet. Dazu drei Streichungen fuer die Demo-Phase: keine
Keyword-Dichte, keine Suchvolumina, kein Ranking-Versprechen, und eine fehlende
Canonical ist kein Fehler, solange die Domain beim Cutover ohnehin wechselt.

## 2026.09.26 – `skill-check.mjs`: tote Skills koennen nicht mehr unbemerkt liegen

Anlass: Der gestrige Fund, dass fuenf Skills nie geladen wurden, war kein
Einzelfall, sondern eine Luecke im Verfahren. Ein Skill springt ueber seine
Beschreibung an; ob das in einer deutschen Session tatsaechlich passiert, sieht
niemand. Bruno will alles im Template haben, damit es in jeder neuen Session
greift – dann muss auch messbar sein, dass es greift.

`scripts/skill-check.mjs` meldet zwei Dinge:
- **Toter Skill:** liegt unter `.claude/skills/`, wird aber nirgends beim Namen
  genannt. Er kann nur ueber seine Beschreibung geladen werden, und das ist bei
  englischem Text unzuverlaessig.
- **Luftnummer:** ein Name wird als Skill aufgerufen, existiert aber nicht. Der
  Fall „gsap-skills".

Zusaetzlich eine WARNUNG, wenn ein Skill nur von einem anderen Skill genannt
wird und nicht im Ablauf: Das greift nur, solange der verweisende Skill selbst
geladen wurde.

**Das Skript hatte beim ersten Lauf drei eigene Fehler** – dieselbe Lehre wie
bei `branchen-check.mjs` und `layout-check.mjs`, und deshalb hier nochmal
festgehalten: Ein Pruefskript ist beim ersten Lauf genauso unbelegt wie das, was
es pruefen soll. Die drei Fehler waren: es las die 3,5 MB CSV, JSON und `.pyc`
aus `ui-ux-pro-max` als Fundstellen mit (ein Treffer in `styles.csv` ist kein
Aufruf); es erklaerte die Agenten `hero-specialist`, `structure-architect` und
`hero-critic` zu nicht existierenden Skills, weil sie in derselben Zeile wie ein
Skill stehen; und es fand den Ausloeser-Fall „→ gsap-skills" nicht, den es
ueberhaupt erst finden sollte. Jetzt entscheidet nur der Text unmittelbar vor
dem Namen, Agenten- und Command-Namen sind ausgenommen, und es gibt einen
Selbsttest mit 12 Faellen (`--selbsttest`).

Ein vierter Fehler fiel erst beim Verankern auf, und zwar durch das Skript
selbst: Der neue Checklistenpunkt nennt `scripts/skill-check.mjs`, der Dateiname
enthaelt „skill", und damit meldete das Skript seinen eigenen Namen als nicht
existierenden Skill. Dateipfade sind jetzt ausgenommen. Vier eigene Fehler in
einem Pruefskript von 250 Zeilen: Das ist die Quote, mit der zu rechnen ist, und
der Grund, warum jedes dieser Skripte einen Selbsttest hat.

Im selben Zug behoben, weil der Check sie fand:
- Die fuenf GSAP-Skills sind jetzt in `docs/WORKFLOW.md` Phase 4 **beim Namen**
  verankert, mit Zustaendigkeit, statt nur ueber `motion-toolkit`.
- Der tote Sammelname steht auch im erklaerenden Satz nicht mehr da. Ein Name,
  den es nicht gibt, gehoert auch nicht in eine Warnung vor ihm.

Verankert: Punkt in `docs/CHECKLISTE.md` 5a, Regel in `CLAUDE.md` §12 („Wer
einen Skill ergaenzt, verdrahtet ihn im selben Zug"), Skript in der Bausteinliste.

## 2026.09.25 – Zwei Skills lagen im Repo und wurden nie geladen

Anlass: Brunos Frage, ob die anderen Skills in der Vergangenheit auch nicht
gegriffen haben. Statt zu schaetzen wurde gezaehlt: fuer jeden Skill, wie oft er
ausserhalb seiner selbst in `docs/WORKFLOW.md`, den Commands und den Agenten
beim Namen genannt wird. Ergebnis, 16.09.2026:

| Skill | Nennungen |
|---|---|
| branchen-wissen | 7 |
| seo-basis, website-copy | 6 |
| anti-slop, hero-craft, section-craft | 5 |
| motion-toolkit | 4 |
| **design-system** | **2, in keinem einzigen Agenten** |
| **gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-performance, gsap-utils** | **0** |

Zwei echte Defekte dahinter:

1. **Die fuenf GSAP-Skills waren unerreichbar.** `motion-toolkit` verweist an
   vier Stellen auf „gsap-skills". **Diesen Skill gibt es nicht.** Die Dateien
   heissen `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`,
   `gsap-performance`, `gsap-utils`. Ein Sammelname laedt nichts, und ihre
   englischen Beschreibungen springen in einer deutschen Session kaum an. Jede
   GSAP-Animation bisher entstand damit aus dem Gedaechtnis statt aus der
   offiziellen Referenz. Alle Verweise nennen jetzt die echten Namen einzeln,
   mit dem Zustaendigkeitsbereich dahinter.

2. **`design-system` stand in keinem Agenten.** Genannt in `WORKFLOW.md` Phase
   2c und in `/demo` – aber die beiden Agenten, die tatsaechlich gestalten,
   bekamen ihn nie gesagt. Genau das war Brunos Eindruck, vom Design-Skill komme
   nichts an. Jetzt steht er in `hero-specialist` (Farbe, Schrift, Kontrast,
   Typo-Spannweite kommen aus den Tokens) und in `structure-architect`
   (Breiten, Abstaende, Farbrollen statt geschaetzter Pixelwerte).

Die Lehre gilt ueber diese zwei Faelle hinaus: **Ein Skill im Repo ist keine
Garantie, dass er benutzt wird.** Er springt ueber seine Beschreibung an, und
das ist bei englischer Beschreibung in deutscher Arbeit unzuverlaessig.
Verlaesslich ist nur der Aufruf beim Namen an der Stelle im Ablauf, an der er
gebraucht wird. Wer kuenftig einen Skill ergaenzt, verdrahtet ihn im selben
Zug – sonst liegt er da wie diese fuenf, monatelang, ohne dass es auffaellt.

## 2026.09.24 – `ui-ux-pro-max` fest im Repo, mit klarem Vorrang

Anlass: Bruno wollte den oeffentlichen Skill `ui-ux-pro-max` von Next Level
Builder so einbinden, dass **jede** Demo ihn hat. Der vom Urheber vorgesehene
Weg ist `/plugin install`. Der scheidet hier aus: Plugins liegen in der
persoenlichen Claude-Konfiguration, und „Use this template" kopiert
ausschliesslich Dateien des Repos. Ein Plugin muesste in jeder Demo-Session neu
installiert werden und waere damit genau das, was hier nie funktioniert: etwas,
an das jemand denken muss.

Deshalb liegt der Skill jetzt als Datei unter
`.claude/skills/ui-ux-pro-max/` und wird mitkopiert. 51 Dateien, 3,5 MB,
MIT-Lizenz (`LICENSE-ui-ux-pro-max.txt` liegt daneben). Die Tests des Urhebers
(324 KB) sind nicht mitgenommen, eine Demo braucht sie nicht.

Drei Anpassungen waren noetig, damit er hier ueberhaupt laeuft und nichts
kaputt macht:

1. **Pfade.** Die `SKILL.md` ruft ihr Suchskript ueber `${CLAUDE_PLUGIN_ROOT}`
   auf. Die Variable existiert nur bei einer Plugin-Installation. Alle zehn
   Aufrufe stehen jetzt relativ zum Repo-Wurzelverzeichnis, und `python` wurde
   zu `python3`. Geprueft: `search.py` laeuft ohne Plugin und ohne externe
   Abhaengigkeiten (Python 3.11).
2. **Deutsche Ausloeser in der Beschreibung.** Ein Skill springt ueber seine
   Beschreibung an. Die war rein englisch, die Arbeit hier laeuft auf Deutsch.
3. **Vorrangregel im Kopf der `SKILL.md`.** Der Skill ist allgemein und
   widerspricht dem Template an vier belegten Stellen: Tailwind-Klassen in den
   Code-Beispielen (`data/styles.csv` und `data/typography.csv` enthalten
   Tailwind), Kachelraster als Standardmuster, Farb- und Font-Vorschlaege aus
   der Datenbank, englische Microcopy. Gegen §5, §7, §6 und §2. Bei jedem
   Widerspruch gewinnt `CLAUDE.md`. Ausserdem: `--persist` ist untersagt, es
   wuerde ein zweites Design-System neben `site/css/tokens.css` anlegen.

**Wofuer er hier zustaendig ist**, und das ist der Grund fuer die Aufnahme:
Barrierefreiheit, Touch-Ziele, Formular- und Fehlerlogik, Navigationsmuster,
Motion-Timing, Chart-Regeln, Font-Pairing als Gegenprobe. Handwerkliche
Qualitaet also, nicht Markenentscheidung.

Verdrahtet statt nur abgelegt, weil ein Skill, den niemand aufruft, nicht
wirkt:
- `docs/WORKFLOW.md` Phase 2a und 2c, plus die Uebersichtstabelle
- `.claude/commands/demo.md` Phase 2a, 2c und 4
- `.claude/agents/structure-architect.md`: **Pflichtabfrage** zum Produkttyp vor
  dem Strukturvorschlag, mit Begruendungspflicht fuer Uebernahme und Verwurf
- `.claude/agents/hero-specialist.md`: als Gegenprobe fuer Motion und Typo
- `.claude/agents/visual-critic.md`: zweite Quelle fuer alles, was messbar
  richtig oder falsch ist. Er schaetzt dort nicht mehr, er fragt. Findet die
  Suche nichts, ist das „kein Befund" und kein Freibrief
- `CLAUDE.md` §12

## 2026.09.23 – Schriftwahl frei: Fontsource ueber npm statt drei Systemschriften

Anlass: In der HSK-Demo stellte sich in Phase 2c heraus, dass die
Arbeitsumgebung lokal nur DejaVu, Liberation und FreeFont kennt. Damit laesst
sich keine Marke bauen. Das Template verlangte zwar „Schriften liegen lokal",
sagte aber nirgends, **woher die Datei kommt**. Die Folge waere gewesen: entweder
eine Systemschrift oder eine CDN-Einbindung, die in der Pruefumgebung wie ein
Fehler aussieht.

Nachgeprueft am 16.09.2026 in dieser Umgebung:

| Quelle | Ergebnis |
|---|---|
| cdnjs.cloudflare.com | 403, gesperrt |
| cdn.jsdelivr.net, unpkg.com | keine Antwort |
| fonts.googleapis.com, fonts.gstatic.com | 200, hier erreichbar |
| registry.npmjs.org | 200, offen |

`npm pack @fontsource/inter` liefert 126 `woff2`-Dateien plus SIL-OFL-Lizenz,
`npm pack @fontsource-variable/inter` eine einzige Datei von 48 KB fuer alle
Schnitte von 100 bis 900. Stichprobe bestanden fuer playfair-display,
source-serif-4, space-grotesk, bebas-neue, ibm-plex-sans und manrope. Dasselbe
Verfahren funktioniert fuer `gsap`, `lenis`, `animejs` und `three`, ebenfalls
geprueft.

Entscheidend: `npm pack` installiert nichts und legt keine `package.json` an.
Die Regel „keine package.json im Demo-Repo" (sonst behandelt Vercel die Demo als
Node-Projekt) bleibt unberuehrt.

Geaendert:
- `CLAUDE.md` §5: Die Behauptung „blockiert Google Fonts" war fuer diese
  Umgebung falsch. Der Grund fuer lokale Dateien ist nicht die Sperre, sondern
  die Unzuverlaessigkeit: mal erreichbar, mal nicht, und eine Demo muss pruefbar
  sein. Dazu der Hinweis auf die offene npm-Registry.
- `.claude/skills/design-system/SKILL.md` 2.5 korrigiert, 2.6 neu: der geprüfte
  Ablauf, variable Schrift zuerst, nur `latin`, und die offen benannte Grenze.
  Kommerzielle Schriften gibt es bei Fontsource nicht (geprueft: kein
  helvetica-neue, futura, gotham). Dann wird gefragt statt stillschweigend
  ersetzt.
- `docs/LIBRARIES.md`: Abschnitt „Woher die Dateien kommen" neu. Auch dort stand
  bisher nur, wo die Datei liegen soll, nicht wie sie dorthin kommt.

## 2026.09.22 – Deploy-Pruefung am Inhalt statt am gruenen Haken

Anlass: Erste echte Rueckmeldung aus `/closing` (Demo Kerrinnes, Malerhandwerk,
14.09.2026), Befund B3, Schwere blockierend. Die Demo hat **zwei Tage lang
stillschweigend nicht deployt.** Das Repo war in eine Organisation verschoben
worden, Vercel Hobby baut keine privaten Repos einer Organisation und stoppt
ohne Fehlermeldung. Die Domain zeigte weiter den alten Stand, Git meldete jeden
Push als erfolgreich. Aufgefallen ist es erst, weil Bruno einen laengst
geaenderten Satz noch auf der Seite sah.

Die Checkliste hatte an dieser Stelle „Demo-Link funktioniert und ist
erreichbar". Genau dieser Punkt haette bestanden: Der Link funktionierte die
ganze Zeit, er zeigte nur einen alten Stand. Eine Erreichbarkeitspruefung ohne
inhaltliche Gegenprobe ist wertlos.

Geaendert in `docs/CHECKLISTE.md` 5c, zwei neue Punkte:
- Einen Satz auf der Live-Domain suchen, der erst im letzten Commit entstanden
  ist. Das ist die Gegenprobe, die den Ausfall gefunden haette.
- Unter Vercel -> Deployments pruefen, ob der juengste Eintrag juenger als der
  letzte Push ist. Dazu das zweite Erkennungsmerkmal `remote: This repository
  moved` beim Push.

Der Fix stand bereits im Demo-Repo und ist nie ins Template zurueckgeflossen.
Das ist der Zweck der Lernschleife: Eine Lehre, die nur in einem Kundenrepo
liegt, gilt fuer keine naechste Demo.

## 2026.09.21 – `visual-critic` und seine Kalibrierung aus den Rückmeldungen

Anlass: Die Messskripte fangen zuverlässig das Schlechte – Überlauf, Kontrast,
zu kleine Schrift. Sie fangen **nicht das Handwerkliche.** Zum Beweis wurde eine
mit Template-CSS gebaute Testseite gerendert: `layout-check.mjs` meldete
„sauber" (nur eine Rhythmus-Warnung). Beim Ansehen desselben Screenshots fanden
sich sieben Fehler, für die es keinen Messwert gibt:

- Die Kartenreihe (`.breakout`) begann links bei ~20 px, der Text daneben bei
  ~330 px – zwei Raster, die sichtbar kollidieren
- Die H1 klebte am oberen Rand, kein Luftraum
- Der CTA war ein Balken über die volle Textbreite, kein Knopf
- Vier gleich hohe, gleich breite, gleichfarbige Kacheln – die Kachelwüste aus
  §7. Das Skript zählt Dreiergruppen, vier ist erlaubt
- Eine Überschrift klebte ohne Abstand unter einer farbigen Kante
- Ein Link sah aus wie Fließtext
- Kein einziges Bild auf der Seite

**Genau diese Punkte bilden jetzt die Prüfliste** des neuen Agenten – abgeleitet
aus einem echten Fund, nicht aus allgemeinen Designregeln.

- **Agent `visual-critic`**: sieht sich die Ganzseiten-Screenshots auf 390 und
  1440 an, urteilt gegen die feste Prüfliste. Läuft in **Phase 4b, bevor Bruno
  die Seite sieht** – seine Befunde werden vorher umgesetzt. Er selbst ändert
  nichts (Trennung wie `hero-specialist` / `hero-critic`)
- **`layout-check.mjs`** erzeugt jetzt Ganzseiten-Screenshots auf 390, 1440 und
  1920 statt nur 1920. Die meisten Layoutfehler zeigen sich nur auf einer Breite
- **Belegpflicht auch hier:** Jeder Befund nennt seinen Fundort. „Die Abstände
  wirken unruhig" ist ein Gefühl, „zwischen Kartenreihe und dunkler Sektion
  ~120 px, sonst ~60 px" ist ein Befund
- **Schweregrade** `blockierend` / `störend` / `feinschliff`, damit Kleinkram
  nicht wie ein Fehler aussieht
- **„Keine Befunde" ist ein gültiges Ergebnis.** Ein Agent, der Befunde liefern
  soll, findet sonst immer welche – notfalls erfundene

### Die Kalibrierung – der eigentliche Teil

Ein Kritiker ohne Kalibrierung urteilt nach allgemeinen Regeln und trifft
Brunos Maßstab nicht. Die Antwort lag in der Lernschleife, wurde dort aber
weggeworfen: Die Ursache **`geschmack`** führte bisher ausdrücklich „zu nichts".
Für einen Agenten, der Gestaltung beurteilt, ist genau das die wertvollste
Information.

- **`docs/PRAEFERENZEN.md`** neu: was Bruno wiederholt korrigiert hat. Entsteht
  über `/auswerten` aus den Rückmeldungen, **nicht von Hand**. Der
  `visual-critic` liest sie vor jedem Urteil
- **Eintrag erst ab zwei Demos.** n=1 ist ein Einzelfall
- **Keine Kundennamen:** Aus „bei Müller war der Button zu breit" wird
  „CTA-Buttons nicht über die volle Textbreite" – die Datei wandert per „Use
  this template" in jedes neue Kundenrepo
- **Als Prüfpunkt formulieren**, nicht als Anekdote: Er muss beim Ansehen eines
  Screenshots entscheidbar sein

### Und er ist messbar, nicht nur behauptet

`feedback-analyst` vermerkt je Befund, ob der `visual-critic` ihn **vorher
schon gemeldet** hatte. `/auswerten` errechnet daraus seine Trefferquote:

- hoch → er wirkt
- niedrig → nicht der Agent ist schuld, sondern die Kalibrierung. Die
  übersehenen Punkte gehören nach `PRAEFERENZEN.md`
- er meldet viel, Bruno kritisiert anderes → er sucht am falschen Ort,
  Prüfliste schärfen statt verlängern

Ohne diesen Abgleich wäre der Agent eine Behauptung. **Keine externen Kosten:**
Playwright und Chromium laufen lokal, die Screenshots entstehen ohnehin bei
jedem `layout-check`-Lauf.

## 2026.09.20 – Bildquellen: Google-Eintrag und Instagram statt nur der Altseite

Anlass: „Fotos fehlen" ist so häufig, dass es im Vertriebs-Briefing einen
eigenen Abschnitt hat. Ursache war eine Verengung: Die **alte Website war die
einzige Bildquelle** – bei Handwerksbetrieben oft die schwächste. Der
Google-Eintrag hat regelmäßig aktuellere Fotos, Instagram die Projektbilder.
Die Demo lief auf Platzhaltern, obwohl Material existierte.

- **`site-analyst` Schritt 6 neu: Bildquellen bestimmen**, bevor inventarisiert
  wird. Quellen nach Belegbarkeit sortiert: Website → von der Website
  verlinkte Profile → Google-Eintrag → was nur Google kennt
- **Actors belegt statt geraten**, per Apify-Suche geprüft:
  `compass/crawler-google-places` (Fotos, verlinkte Profile) und
  `apify/instagram-scraper` (`directUrls` mit der belegten Profil-URL)
- **Verifikationsregel: zwei übereinstimmende Merkmale**, nicht eines. Der
  Actor liefert `website`, `phone` und `address` mit; mindestens zwei müssen
  zu den belegten Daten passen. Ein Namenstreffer allein reicht nicht –
  „Elektro Müller" gibt es in jeder zweiten Stadt, und fremde Fotos in der Demo
  sieht der Inhaber sofort. Liegt auf der Website ein Google-Maps-Link, ist
  `startUrls` der eindeutige Weg
- **`scrapeImageAuthors: true`** trennt Fotos des Betriebs von Fotos fremder
  Google-Nutzer. Letztere sind für die Demo vertretbar, kommen aber als Lücke
  ins Dossier und sind vor dem Live-Gang zu klären
- **Kosten vor dem Lauf beziffern** – ein Ort mit Detailseite und 30 Bildern
  grob 2 Cent, 30 Instagram-Beiträge grob 7 Cent. Klein, aber die Regel gilt
- **Kein Eintrag gefunden ist ein Befund**, keine Lücke zum Auffüllen. Nicht
  weitersuchen, bis irgendetwas gefunden ist, das plausibel aussieht

**Beim Bauen korrigiert:** Die erste Annahme war, man könne den Google-Eintrag
über das `website`-Feld des Actors finden. Der Blick ins Input-Schema zeigte:
`website` ist ein **Filter** (`withWebsite`/`withoutWebsite`), kein Suchfeld.
Daher die Verifikation über zwei Merkmale statt über eine direkte Suche.

## 2026.09.19 – Alleinstellung im Vertriebs-Briefing aus dem Branchenwissen

Anlass: Die Branchendateien haben längst erhoben, was in einem Gewerk selten
ist – „Referenzbereich überhaupt vorhanden: 4 von 8, davon mit Jahresangabe je
Objekt nur 2 von 8". Wo eine gebaute Besonderheit auf so eine Seltenheit
trifft, ist das das stärkste Argument im Closing-Call: belegt statt behauptet.
Genutzt wurde es bisher nur intern, nie im Vertrieb.

- **Neuer Abschnitt „Was Sie von vielen unterscheidet"** im Briefing. Der Agent
  bildet die **Schnittmenge** aus tatsächlich gebauten Besonderheiten und
  belegten Seltenheiten der Branchendatei. Höchstens drei bis fünf Punkte –
  eine lange Liste entwertet jeden einzelnen

**Ein Widerspruch im Template war dabei aufzulösen.** Seit 2026.09.17 stand im
Briefing „Keine Aussagen über Wettbewerber". Die Auflösung: Das Verbot aus
CLAUDE.md §8 gilt für die **Website-Copy** – dort macht ein Wettbewerbsvergleich
den Betrieb kleinlich und fällt durch den Inhaber-Test. Im Gespräch **über** die
Website ist ein belegter Marktüberblick etwas anderes.

Was trotzdem verboten bleibt, und zwar hart:

- **Keine Aussage über die lokalen Wettbewerber des Interessenten.** Die
  Branchendateien erheben bundesweite Stichproben eines Gewerks und sagen
  ausdrücklich nichts über „den Wettbewerber in der Nachbarstraße"
  (`branchen-wissen`, „Zwei Grenzen"). Der Interessent kennt seine
  Wettbewerber besser als wir – eine Behauptung über sie fliegt sofort auf
- **Jede Formulierung trägt die Stichprobe mit sich.** Sonst kann der
  Vertriebler die Rückfrage „welche acht denn?" nicht beantworten
- **„In der Stichprobe nicht gefunden"**, nie „gibt es in der Branche nicht" –
  Abwesenheit ist kein Beweis für Nichtexistenz (§3)

Der Abschnitt entfällt ersatzlos, wenn es keine Branchendatei gibt, sie älter
als zwölf Monate ist (dann nur Beobachtung ohne Zahlen) oder keine
Schnittmenge besteht. Ein erfundener Vorsprung ist schlimmer als keiner.

## 2026.09.18 – Nutzenaussage folgt der Umsetzung, nicht dem Feature-Namen

Anlass: Bruno hat einen Fehler **im Template selbst** gefunden, und zwar in dem
Beispiel, mit dem 2026.09.17 die Regel erklärt hat. Dort stand:

> „Instagram-Feed eingebunden" → „Der Feed aktualisiert sich mit jedem Post von
> selbst – die Seite wirkt gepflegt, ohne dass jemand sie pflegen muss"

Manche Demos binden aber nur die drei stärksten Beiträge **fest** ein. Dann ist
„aktualisiert sich von selbst" falsch – und der Vertriebler behauptet es im
Gespräch. Das Beispiel verletzte damit genau die Regel, die zwei Absätze
darüber im selben Dokument steht.

- **Jede Besonderheit bekommt ein drittes Feld: „Wie umgesetzt".** Live
  nachladend, fest eingebaut oder nur verlinkt – daraus folgt der Nutzen, nicht
  aus dem Feature-Namen
- **Sperrliste für Automatik-Wörter**, solange keine Automatik gebaut ist:
  automatisch · aktualisiert sich · immer aktuell · live · synchron ·
  in Echtzeit · ohne Aufwand · pflegt sich selbst
- **Das Feature wird trotzdem genannt.** Die kuratierte Variante ist kein
  schwächeres Argument, sondern ein anderes: „Die drei stärksten Arbeiten,
  bewusst ausgewählt – statt einem Feed, in dem die beste Arbeit zwischen
  Baustellenfotos untergeht." Weglassen wäre die falsche Konsequenz
- **Gilt für fast alles**, nicht nur Social Media: Bewertungen (Widget /
  zitiert / verlinkt), Karte (Embed / Bild / Adresse), Referenzen (dynamisch /
  feste Auswahl), Funnel (versendet wirklich / Demo-Attrappe)
- Der Agent prüft die Variante **im HTML** – ein nachladendes Script oder
  `iframe` ist etwas anderes als feste `<img>`-Tags
- „Keine Automatik behaupten, die nicht gebaut ist" zusätzlich im Abschnitt
  „Das bitte nicht behaupten"

**Die Lehre über den Einzelfall hinaus:** Eine falsche Nutzenaussage ist
genauso schädlich wie eine erfundene Besonderheit. Die Belegpflicht endet nicht
beim „ob", sie gilt auch fürs „wie".

## 2026.09.17 – `/closing` erzeugt auch das Vertriebs-Briefing

Anlass: Der Vertriebler bekommt den Demo-Link und zeigt die Demo im
Closing-Call. Bisher ging er ohne Vorbereitung hinein – er wusste nicht, was
die Demo abbildet, warum sie so aufgebaut ist, welche Besonderheiten drin
stecken und was noch fehlt. Der Zeitpunkt ist derselbe wie bei der
Rückmeldung, deshalb derselbe Befehl.

- **Neuer Agent `vertriebs-briefing`**, parallel zum `feedback-analyst`.
  **Zwei Agenten, weil zwei Blickrichtungen:** Das eine Dokument sucht Fehler
  nach innen, das andere Stärken nach außen. Dieselbe Rolle könnte beides
  nicht ehrlich schreiben
- **Härteste Regel des Briefings:** Jede genannte Besonderheit muss in der
  gebauten Seite vorhanden **und funktionsfähig** sein. Steht dort „Google-
  Bewertungen sind eingebunden" und es ist ein Platzhalter, behauptet der
  Vertriebler das im Gespräch und blamiert sich vor dem Interessenten. Geprüft
  wird gegen `site/index.html`, nicht gegen das Konzept
- **Drei Zustände sauber getrennt:** vorhanden und funktionsfähig →
  Besonderheiten · als Demo-Hinweis sichtbar → „Was noch fehlt" · weder noch →
  gar nicht erwähnt
- **Feature wird zu Nutzen.** Nicht „Instagram-Feed eingebunden", sondern was
  der Betrieb davon hat. Dieselbe Umkehrformel wie in `website-copy`
- **Fehlendes als Gesprächsanlass**, mit fertigem Satz für den Vertriebler –
  ein Demo-Hinweis ist ein Verkaufsargument, kein Makel (§11)
- **Abschnitt „Das bitte nicht behaupten"**: keine Ranking-Versprechen, keine
  Zahlen außerhalb der Seite, Platzhalter namentlich genannt, keine Aussagen
  über Wettbewerber. Schützt vor einem Vertriebler, der übertreibt
- **Einwände aus `branchen-wissen`** fließen ins Briefing – die gesammelten
  echten Einwände des Gewerks sind genau das Material, das er im Gespräch
  braucht

**Ablageort vereinheitlicht:** Beide Dokumente liegen in `.closing/` statt
`.feedback/`, beide gitignoriert. Zwei Gründe: „Use this template" kopiert alle
Dateien in jedes neue Kundenrepo, und das Demo-Repo kann beim Kunden landen –
ein Vertriebsbriefing über ihn, das er selbst lesen kann, wäre unangenehm.

## 2026.09.16 – Lernschleife Stufe 1+2: `/closing` und `/auswerten`

Anlass: Jede Demo wird nach der Übergabe besser, aber das Wissen darüber
verschwand im Chat. Beim nächsten Kunden fing dasselbe von vorn an.

**Gegenüber der ersten Planfassung deutlich vereinfacht** – Bruno hat
klargestellt: Sein manueller Beitrag ist das **Korrigieren der Demo**, nicht
das Ausfüllen eines Formulars. Gestrichen wurden damit das Rückmeldungs-
Formular und das eigene Sammel-Repo.

- **`/closing`** + Agent `feedback-analyst`: Auf Brunos „closing-bereit"
  entsteht die Rückmeldung **vollautomatisch, ohne Rückfragen** – aus
  Chat-Verlauf und Git-Diff. Ablage in `.feedback/` (gitignoriert),
  Auslieferung per `SendUserFile`. **Nie ins Repo**: „Use this template"
  kopiert alle Dateien, jeder neue Kunde bekäme sonst die Kritik zu allen
  anderen Kunden mitgeliefert
- **`demo-v1`-Tag am Ende von Phase 4**: Ohne Marker ist später nicht
  rekonstruierbar, was Claude gebaut und was Bruno korrigiert hat. Ein Tag
  kostet nichts, die fehlende Information ist nicht nachholbar
- **Die entscheidende Frage** ist nicht „was wurde geändert", sondern „warum
  war es beim ersten Mal falsch". Jeder Befund bekommt eine Ursache:
  `regel-ignoriert`, `regel-fehlt`, `information-fehlte`,
  `geraten-statt-gefragt`, `geschmack`
- **`scripts/feedback-auswerten.mjs`**: zählt Verteilungen und findet Muster ab
  zwei verschiedenen Demos. Ein Muster, das das Skript nicht zählt, gibt es
  nicht – „mir ist aufgefallen" ist kein Befund
- **`/auswerten`**: ordnet jeder Ursache eine Lösungsart zu.
  `regel-ignoriert` → **Gate**, ausdrücklich kein weiterer Absatz in
  CLAUDE.md. Beide Retros kamen zum selben Ergebnis: Die Demos scheiterten an
  Regeln, die längst dastanden. Wer darauf mit einer neuen Regel antwortet,
  schreibt dieselbe Regel zum zweiten Mal auf
- **Test für jede Lösung:** Greift sie von selbst, oder muss jemand daran
  denken? Eine Lösung, die Erinnerung verlangt, ist keine
- **Schritt 5 in `/auswerten`:** Prüfen, ob die Lösungen der letzten Runde
  gewirkt haben. Taucht ein Befund wieder auf, wird nicht dieselbe Lösung
  verschärft, sondern die Art gewechselt

Gegen die Selbstbewertung – der Agent bewertet Arbeit, an der er beteiligt war
– hilft nur die **Belegpflicht**: Jeder Befund braucht ein wörtliches Zitat
oder eine Diff-Stelle. Einen Wortlaut kann man nicht beschönigen. Das Skript
meldet Befunde ohne Beleg und schließt sie aus.

Verifiziert an zwei Beispieldateien: beide Muster erkannt, ungültiger
Ursachenwert und fehlender Beleg gemeldet.

## 2026.09.15 – `/hero-neu`: Hero einer bestehenden Demo nachziehen

Anlass: Eine laufende Demo aus einem älteren Template-Stand hat einen Hero, der
nicht sitzt – der Rest der Seite ist in Ordnung. Bisher gab es dafür keinen
Weg: Die Regel „eine laufende Demo zieht nie automatisch nach" (§12) ist
richtig, aber sie beantwortet nicht, **wie** man nachzieht, wenn man es
ausdrücklich will. Ohne Weg passiert eines von beidem: Die Demo bleibt auf
altem Stand, oder jemand kopiert das halbe Template hinein und überschreibt
dabei `tokens.css` mit der Kunden-CI.

- `.claude/commands/hero-neu.md`: läuft **im Demo-Repo**, holt sich die
  Hero-Bausteine aus dem Template, baut den Hero neu, fasst sonst nichts an
- **Explizite Trennung**, welche Dateien kopiert werden dürfen (Skills, Agents,
  Skripte – enthalten keine Kundendaten) und welche niemals: `site/index.html`,
  `site/css/tokens.css`, `site/css/styles.css`, `site/vercel.json`,
  `docs/DEMO-SPEC.md`, `docs/DOSSIER.md`, `docs/SEO-NOTIZEN.md`, `site/assets/`
- **Demos von vor dem `site/`-Umzug** (Stand < 2026.09.12) sind ausdrücklich
  berücksichtigt: dort gelten die Pfade ohne `site/`, und der Befehl zieht den
  Umzug **nicht** nach – ein Struktur-Umzug ist eine eigene Entscheidung, keine
  Nebenwirkung einer Hero-Überarbeitung
- **Fallstrick benannt:** `hero-craft` verweist auf Paragraphen in CLAUDE.md.
  Im alten Stand stimmen die Nummern womöglich nicht – diffen statt kopieren,
  im Zweifel nicht kopieren
- **Varianten entstehen als eigene Dateien**, `index.html` wird erst nach der
  Freigabe angefasst. Plus Regressionsprüfung: Der neue Hero darf keine
  Abstände oder Klassen verschieben, die andere Sektionen nutzen
- **Der alte Hero ist keine Quelle:** Stand dort eine Zahl ohne Beleg, wandert
  sie nicht mit (§3)

## 2026.09.14 – Verweis auf das Live-Template und den Übergang

Anlass: Das Demo-Template endete beim Demo-Link, ohne zu sagen, was nach dem
Vertragsabschluss passiert. Seit heute gibt es `Autolution/Live-Template`
mit dem Ablauf P0–P9 und dem Skript `live-start.mjs`, das ein Demo-Repo in
ein Live-Projekt überführt (Playbook tauschen, `site/` und Kundenkontext
behalten).

- `docs/WORKFLOW.md`: neuer Schlussabschnitt „Nach dem Vertragsabschluss" mit
  dem Befehl
- CLAUDE.md §12: Verweis auf das Live-Template
- Keine Regeländerung an der Demo selbst

## 2026.09.13 – Demo für Google gesperrt (`noindex`-Header)

Anlass: Beim Bau des Live-Templates fiel auf, dass Vercel nur
Preview-Deployments automatisch mit `noindex` versieht. Die Produktionsadresse
`<demo>.vercel.app` ist indexierbar. Eine Demo mit „PLATZHALTER"-Texten und
Hinweiskästen konnte damit unter dem Namen des Kunden bei Google auftauchen,
bevor er unterschrieben hat, und nach dem Livegang als Duplikat der echten
Seite weiterleben.

- `site/vercel.json` neu, mit genau einem Header: `X-Robots-Tag: noindex,
  nofollow` auf jede Antwort. Unsichtbar für den Betrachter, ändert an der
  Demo nichts
- CLAUDE.md §5 und `docs/CHECKLISTE.md` (5c) um Grund und Prüfung ergänzt
  (`curl -I` zeigt die Zeile)
- Der Header wird nicht im Demo-Template entfernt, sondern im Live-Template
  beim Cutover (dort Schritt 2 des Launch-Protokolls, mit Gegenprüfung durch
  `launch-check`)

## 2026.09.12 – Website nach `site/`, Vercel-Verknüpfung wieder manuell

Anlass: `.vercelignore` ist keine verlässliche Grenze. Bisher zeigte das
Vercel-Projekt auf den Repo-Root, und die Datei sollte `CLAUDE.md`, `docs/`,
`.claude/` und `scripts/` vom Deployment ausschließen. Nur ist `.vercelignore`
in erster Linie ein Mechanismus der Vercel-CLI; ob es bei Deployments über die
Git-Integration greift, ist nicht verlässlich dokumentiert. Im Zweifel hätte
unter `<demo>.vercel.app/CLAUDE.md` das komplette Playbook gelegen:
Agenten-Prompts, Branchenrecherche, Verkaufslogik. Das ist kein Aufräumthema,
sondern der Wettbewerbsvorteil des Betriebs.

- Die Website liegt jetzt vollständig in `site/` (`index.html`, `css/`, `js/`,
  `assets/`). In Vercel steht **Root Directory = `site`**. Bei statischen Seiten
  liefert Vercel ausschließlich den Inhalt dieses Verzeichnisses aus, alles
  außerhalb ist über keine URL erreichbar
- Die Trennung ist damit strukturell statt konfiguriert. Wird das Root Directory
  vergessen, findet Vercel keine `index.html` und die Seite ist kaputt statt
  undicht: ein Fehler, der auffällt, statt eines Lecks, das niemand bemerkt
- `.vercelignore` bleibt als zweite Sicherung liegen, ist aber nicht mehr die
  tragende. Die Stichprobe in `docs/CHECKLISTE.md` (5c) verlangt jetzt einen
  gemessenen 404 statt eines Hakens
- Nebeneffekt: Hero-Varianten, Testseiten und Messläufe gehören außerhalb von
  `site/` und sind dadurch automatisch nicht öffentlich
- Alle Pfadangaben nachgezogen: Skills, Agenten, `docs/`, und die
  Aufrufbeispiele der Messskripte (`node scripts/layout-check.mjs
  site/index.html`)

**Dazu gelöscht: `.github/workflows/vercel-setup.yml`** (aus 2026.09.7/.8). Die
Rechnung ging nicht auf: Organisations-Secrets lässt GitHub auf dem Free-Plan
nicht für private Repos zu, also braucht jedes neue Repo ein eigenes
`VERCEL_TOKEN`, und ein Secret zu setzen kostet denselben Handgriff wie das
Projekt in Vercel zu importieren. Die Automatisierung hätte nichts gespart und
dafür in jedem Demo-Repo ein Token hinterlegt. Das Verknüpfen steht wieder als
manueller Schritt in Phase 5c, jetzt mit dem entscheidenden Zusatz
Root Directory = `site`.

**Fund nebenbei, der das ursprüngliche Vercel-Problem erklären dürfte:** Die
Vercel-GitHub-App wird **pro Account und pro Organisation getrennt** installiert.
War sie nur auf dem persönlichen Account `Autolution-ai` installiert, taucht kein
Repo der Organisation `Autolution` in Vercel auf, und der Import schlägt ohne
brauchbare Meldung fehl. Steht jetzt als einmaliger Einrichtungsschritt in
CLAUDE.md §5.

**Hinweis zur Entstehung:** Dieser Eintrag entstand parallel zu 2026.09.9 bis
.11 in einer zweiten Session. Touch-Ziele und der Organisationsname waren dort
schon behoben, als dieser Stand gemergt wurde; beide Befunde stammen aus
derselben Analyse und sind dort dokumentiert, nicht hier. Die `base.css`-Fassung
aus 2026.09.10 wurde übernommen, weil sie `summary` bewusst ausnimmt und
`footer a` mit abdeckt.
## 2026.09.11 – Repo-Owner korrigiert: Autolution-ai → Autolution

Anlass: Beim „Move work to an organization"-Schritt (siehe 2026.09.8) landete
die neue Organisation unter dem Namen **`Autolution`** (ohne „-ai"), nicht wie
ursprünglich angenommen unter `Autolution-ai` – der geplante zweite Schritt
(Personal-Account umbenennen, dann die Organisation auf den freigewordenen
Namen umbenennen) wurde nicht durchgeführt. Sieben Stellen in vier operativen
Dateien nannten danach weiterhin `Autolution-ai` als Repo-Owner, obwohl dieser
Account jetzt nur noch der alte, leere Personal-Account ist (0 Repos) und die
Organisation `Autolution` alle 46 Repos besitzt – verifiziert per GitHub-API.

- `CLAUDE.md` (3×), `.claude/commands/demo.md` (1×), `docs/CHECKLISTE.md`
  (1×), `.github/workflows/vercel-setup.yml` (2×): `Autolution-ai` → `Autolution`
- **`docs/CHANGELOG.md` bewusst unverändert gelassen** – die Einträge zu
  2026.09.7/2026.09.8 beschreiben, was zum jeweiligen Zeitpunkt tatsächlich
  galt (die Organisation hieß zu diesem Zeitpunkt wirklich `Autolution-ai`).
  Historie umzuschreiben widerspräche dem eigenen Prinzip dieser Datei

## 2026.09.10 – Touch-Ziel-Regel wirkte nicht: min-height auf inline-Elementen

Anlass: Ein Review fand zwei zusammenhängende Fehler. `layout-check.mjs`
meldet bei jedem frisch aus dem Template erzeugten Repo 2-3 rote Befunde zu
Touch-Zielen im Footer (Impressum/Datenschutz, 89×19px statt 44×44px) – noch
bevor überhaupt eine einzige Demo-Sektion existiert. Das eigentliche Risiko
daran: Ein QA-Agent, der lernt, bekannte rote Meldungen zu überlesen, übersieht
irgendwann auch einen echten Befund.

Ursache war schwerwiegender als die zwei Links: Die bestehende Regel in
`css/base.css`

    a[href^="tel:"], a[href^="mailto:"], button, [role="button"], label, summary {
      min-height: 44px;
    }

sah korrekt aus und tat bei `<a>` und `<label>` trotzdem nichts – `min-height`
wirkt nicht auf originär inline-Elementen ohne einen Display-Wechsel. Gemessen:
ein Telefon-Link mit dieser Regel war **52×17px** statt 44×44px. Das trifft
ausgerechnet die Telefonnummer, die im Template selbst als „das wichtigste
Ziel der ganzen Seite" bezeichnet wird.

- `css/base.css`: Regel in zwei Teile getrennt. `a[href^="tel:"],
  a[href^="mailto:"], nav a, footer a, label` bekommen zusätzlich
  `display: inline-flex; align-items: center;`, erst dann greift
  `min-height`. `button, [role="button"], summary` bleiben in der einfachen
  Regel – `summary` ausdrücklich nicht in die erste Gruppe, sonst verliert es
  über `inline-flex` sein natives Aufklapp-Dreieck (`display: list-item`)
- Deckt jetzt auch generell Navigations-Links ab (Header **und** Footer), nicht
  nur tel:/mailto: – vorher waren „Impressum"/„Datenschutz" von der Regel gar
  nicht erfasst, unabhängig vom Inline-Problem
- Kommentar im Code dokumentiert die Falle ausdrücklich, plus den Hinweis: ein
  freistehender Link/CTA außerhalb von `<nav>` und außerhalb von Fließtext
  (z.B. eine eigene `.cta`-Klasse) braucht dieselben drei Zeilen explizit –
  das Basis-CSS kann künftige Demo-Komponenten nicht erraten
- Verifiziert: Telefon-Link und beide Footer-Links jetzt bei 44px Höhe
  (gemessen, nicht nur behauptet), `summary` behält `list-item` und sein
  Dreieck, `layout-check.mjs` gegen `index.html` meldet keinen
  Touch-Ziel-Befund mehr

## 2026.09.9 – Ungenauigkeit im branchen-wissen-Index korrigiert

Anlass: Eine andere Session fand den Satz „Alle sechs Dateien laufen
fehlerfrei durch node scripts/branchen-check.mjs" zu optimistisch formuliert.
Nachgeprüft: Stimmt für **Fehler** (0 in allen sechs), aber `maler.md` (2) und
`metallbau.md` (5) melden zusätzlich Warnungen – Strukturaussagen, die sich
auf eine Vorlagen-Quelle stützen. Kein Formfehler, ein echter inhaltlicher
Hinweis, den der Satz unterschlagen hat.

- `.claude/skills/branchen-wissen/SKILL.md`: Satz präzisiert, nennt jetzt
  Fehler- und Warnungszahl getrennt und benennt die zwei betroffenen Dateien

## 2026.09.8 – Vercel-Secret auf Repo-Ebene statt Organisations-Ebene

Anlass: Der in 2026.09.7 vorgesehene Weg (Organisations-Secret, einmalig für
alle Repos) scheiterte an einer echten GitHub-Grenze, die erst beim
tatsächlichen Einrichten sichtbar wurde: **Organisations-Secrets lassen sich
auf dem kostenlosen GitHub-Organisations-Plan nicht für private Repos nutzen**
("Organization secrets cannot be used by private repositories with your
plan"). Ein Upgrade auf den bezahlten Team-Plan wurde bewusst abgelehnt – zu
Recht, Demo-Repos sind privat und bleiben es.

- `VERCEL_TOKEN` (und optional `VERCEL_TEAM_ID`) wird jetzt als **Repo-Secret**
  gesetzt, nicht als Organisations-Secret. Repo-Secrets kennen dieses Limit
  nicht. Am Workflow selbst ändert sich nichts – `secrets.VERCEL_TOKEN` wird
  von GitHub unabhängig davon aufgelöst, ob das Secret auf Repo- oder
  Organisationsebene liegt
- **Kosten:** ein kurzer Schritt pro neuem Demo-Repo statt einmalig für alle,
  weil GitHub Secrets bei „Use this template" grundsätzlich nicht mitkopiert
  (nur Dateien wandern). `gh secret set VERCEL_TOKEN --repo Autolution-ai/
  <repo>` fragt interaktiv nach dem Wert – landet nicht in der Shell-History
- CLAUDE.md §5, `vercel-setup.yml`-Kommentarkopf, `docs/CHECKLISTE.md` (5c)
  und `/demo` (Phase 0) entsprechend korrigiert

**Nebenbefund zur eigenen Vorgeschichte dieser Änderung:** Auf dem Weg dorthin
wurde `Autolution-ai` von einem persönlichen GitHub-Account in eine
Organisation überführt (Repos per „Move work to an organization" verschoben).
Das war nicht umsonst – Autolution-ai ist jetzt eine echte Organisation mit
allen damit verbundenen Vorteilen (Team-Verwaltung, sauberere Rechtetrennung)
–, hat aber die Ausgangsfrage (organisationsweites Secret) am Ende nicht
gelöst, weil das Plan-Limit unabhängig davon besteht, ob ein User- oder ein
Free-Organisations-Account dahintersteht.

## 2026.09.7 – Vercel-Projektanlage automatisiert statt manuell

Anlass: Bruno musste bei jedem neuen Demo-Repo das Vercel-Projekt selbst
anlegen und verknüpfen. Der Grund war nie eine Inkompatibilität zwischen
GitHub und Vercel – beide haben saubere APIs –, sondern dass Claude in der
Chat-Session keinerlei Zugriff auf Brunos Vercel-Account hat und laut §4 auch
kein Token dafür sehen darf. Das lässt sich lösen, ohne die Sicherheitsregel
zu verletzen: durch eine eigenständige, autorisierte GitHub-Automatisierung
statt durch Zugriff im Chat.

- **`.github/workflows/vercel-setup.yml`**: läuft bei jedem Push, prüft per
  Vercel-API idempotent, ob für das Repo schon ein Projekt existiert, und legt
  es beim ersten Mal an (Production Branch `main`, Root Directory = Repo-Root,
  `framework: null` – die Seite hat kein `package.json` und soll auch keins
  bekommen, siehe unten). Fehlt das Secret, überspringt sich der Lauf mit einer
  Warnung statt den Push zu blockieren
- **Einmalige Einrichtung pro Organisation, nicht pro Repo:** Vercel-API-Token
  erzeugen, als Organisations-Secret `VERCEL_TOKEN` bei GitHub hinterlegen,
  optional `VERCEL_TEAM_ID` bei einem Team-Account, und die Vercel-GitHub-App
  auf „All repositories" stellen – sonst müsste jedes neue Repo dort weiterhin
  einzeln freigegeben werden und der Automatismus liefe ins Leere
- `.github/` zusätzlich in `.vercelignore` aufgenommen, damit die
  Workflow-Datei nicht auf der Kunden-Domain abrufbar ist
- Checkliste (5c), `/demo` und `CLAUDE.md` §5 entsprechend angepasst: der
  Kontrollpunkt ist jetzt „Actions-Tab grün prüfen" statt „Projekt manuell
  anlegen"

**Was weiterhin nur Bruno tun kann und muss**, weil es einen Login in seinen
eigenen Vercel-Account braucht: den Token erzeugen und als Org-Secret
hinterlegen. Danach ist der Schritt für jedes künftige Demo-Repo automatisch.

## 2026.09.6 – Messskripte: zwei Fehler, die jede echte Demo getroffen hätten

- **`hero-check.mjs` hätte bei jeder Demo „keine :hover-Regeln" gemeldet.** Es
  las die Regeln über `cssRules`, und das ist bei einer **verlinkten** Datei
  über `file://` nicht möglich. Getestet wurde es nur gegen Seiten mit
  `<style>`-Block – im Template liegen aber alle Styles in `css/*.css`.
  Jetzt wird wie in `layout-check.mjs` in den Dateien selbst gezählt.
- **Der Playwright-Hinweis stimmte nur in der Cloud.** „Browser sind
  vorinstalliert" gilt für Claude Code on the web, nicht für einen lokalen
  Rechner – dort fehlt ohne `npx playwright install chromium` der Browser.
  Die Meldung nennt jetzt beide Fälle.

Kein `package.json` im Template: Ein Vercel-Projekt mit `package.json` und ohne
Build-Skript wird als Node-Projekt behandelt statt als statische Seite. Die
Skripte kommen deshalb ohne Abhängigkeit im Repo aus.

## 2026.09.5 – Zwei Messskripte: copy-check und layout-check

Anlass: Die Checkliste verlangt Messwerte („Ansprache-Verhältnis ______",
„Dreiergruppen ______"), aber es gab kein Werkzeug dafür. Wer schätzt, trägt
eine Zahl ein, die niemand nachrechnen kann – und genau das ist beiden Demos
passiert. Jetzt liefern zwei Skripte die Werte.

**`scripts/copy-check.mjs`** – Text und Dokumentstruktur, gelesen im echten
Browser-DOM statt per Regex:
Ansprache-Verhältnis, Gedankenstriche, Verkaufswort-Häufung (Ein-Nennung-Regel),
Dreiergruppen, Stakkato, AI-Floskeln, Ablehnungs-Rhetorik und Superlative,
Perspektivbruch, H1, Hierarchie-Sprünge, doppelte IDs, tote Anker, Alt-Texte,
Title/Description, Open Graph, verbotene JSON-LD-Felder. Mit `--gewerk`
zusätzlich gegen die **Verbotsliste der Branchendatei** – damit hängt die
Knowledge Base zum ersten Mal am fertigen Text.

**`scripts/layout-check.mjs`** – das gerenderte Layout auf sechs Breiten:
Überlauf, kleinste Schrift, Kontrast, Touch-Ziele, Flächennutzung und Rhythmus
je Sektion, `:hover`/`:focus`, kaputte Bilder, JS-Fehler, plus ein eigener
Durchgang mit `prefers-reduced-motion`.

**Ein Widerspruch im Template ist dabei aufgefallen und aufgelöst.** Die Regel
„kein Abschnitt lässt auf 1920 px mehr als ~200 px je Seite ungenutzt" ist
wörtlich unerfüllbar: Ein Fließtext-Abschnitt auf `--maxw-content: 68ch` lässt
zwangsläufig rund 570 px je Seite. Die Regel gilt jetzt für Abschnitte **mit
Bildern, Karten oder Galerien**; reiner Fließtext bleibt auf Lesebreite. Falsch
ist erst eine Seite, auf der **jeder** Abschnitt so aussieht – und genau das
meldet das Skript als Fehler. Angeglichen in `CLAUDE.md` §7,
`docs/CHECKLISTE.md`, `css/styles.css`, `section-craft` und `responsive-qa`.

**Vier Fehler in den Prüfern selbst**, alle erst an echten Seiten aufgefallen:
- Der Farbparser kannte nur `rgb()`. Das Template schreibt oklch vor – also
  waren alle Kontrastwerte falsch („1:1 weiß auf weiß" für einen dunkelgrünen
  Knopf). Umgerechnet wird jetzt über ein 1×1-Canvas, also durch den Browser
- `cssRules` einer verlinkten Datei ist über `file://` nicht lesbar; der
  `:focus`-Befund war ein Artefakt. Gezählt wird jetzt in den Dateien selbst
- Links mitten im Fließtext wurden als zu kleine Touch-Ziele gemeldet
- Eine randlos durchlaufende farbige Sektion galt als „toter Rand", weil nur
  die Inhaltsbox gemessen wurde

`.layout-check/` ist in `.gitignore`.

**Zwei Funde am Template selbst**, aufgedeckt vom ersten Lauf gegen
`index.html`:
- In `<title>` und in `content="…"` ist ein HTML-Kommentar **kein** Kommentar.
  Der Platzhalter `<!-- Leistung in Ort … -->` stand wörtlich im Browser-Tab
  und wäre in jeder Teilen-Vorschau gelandet. Ersetzt durch sichtbaren
  Platzhaltertext, die Anleitung steht jetzt außerhalb der Tags
- Die Footer-Links auf Impressum und Datenschutz zeigten ins Leere. Die
  Zielabschnitte mit Platzhaltertext sind jetzt von Anfang an da

## 2026.09.4 – Skill `seo-basis`, Sichtbarkeit als Befund statt als Versprechen

Anlass: Zu Sichtbarkeit gab es fünf Häkchen in der Checkliste und eine
Notizdatei für „vermutete Keywords". Alles, was später teuer nachzurüsten ist
– lokale Signale, strukturierte Daten, Teilen-Vorschau, Bilddateien – war
nirgends geregelt. Eine Seite mit fünf H1 und ohne Alt-Texte nachzurüsten heißt,
jede Sektion noch einmal anzufassen.

- **Lokale Signale** als eigentlicher Hebel im Handwerk: NAP-Konsistenz über
  Header, Footer, Kontakt und JSON-LD, Ort im sichtbaren Inhalt, Einzugsgebiet
  nur mit belegten Orten
- **JSON-LD mit Verbotsliste:** kein `aggregateRating` mit ausgedachten Werten,
  keine erfundenen Öffnungszeiten, kein `priceRange` ohne Preisangabe. Ein
  leeres Feld wegzulassen ist immer richtiger, als es zu füllen
- **Teilen-Vorschau (Open Graph)** als Verkaufsargument: Der Demo-Link wandert
  in WhatsApp und Mail. Ohne die Angaben sieht er dort kaputt aus, bevor ihn
  jemand öffnet. `og:image` liegt lokal, ein Hotlink läuft ab
- **Befund zur Altseite** wandert aus dem Scrape nach `docs/SEO-NOTIZEN.md` –
  belegbares Material für den Termin. Ausdrücklich **nicht** auf die Demo-Seite:
  eine Website, die dem Inhaber seine alte Seite vorhält, verkauft nichts
- **Grenzen benannt:** keine Rankings, keine Suchvolumina, kein „X verlorene
  Anfragen im Monat". Solche Sätze sind im Termin angreifbar
- `index.html` bringt Meta, Open Graph und einen JSON-LD-Block als Vorlage mit

Verdrahtet in `site-analyst` (Phase 1), `copywriter` (Phase 3),
`docs/WORKFLOW.md`, `docs/CHECKLISTE.md`, `/demo`.

## 2026.09.3 – Skill `design-system`, Tokens als Rollensystem

Anlass: Zu Farbe und Typografie gab es nur Verbote („kein Purple-Gradient",
„CI nicht erfinden") und leere Platzhalter in `css/tokens.css` – kein
Verfahren, wie aus einem Logo ein System wird. Ein Verbot ohne Verfahren
endet beim Raten.

- **Farbrollen statt Farbnamen**, plus dunkle Gegenseite für `.full`-Zäsuren
- **Neutrale werden aus dem Markenfarbton abgeleitet** (H gleich, C sehr
  klein). Reines Grau neben einer farbigen Marke ist der Grundton jedes
  Baukastens
- **`--color-primary-on-dark`** mit Verfahren statt nur mit Warnung: L anheben,
  bis 4,5:1 gegen `--color-bg-dark` steht (gemessener Altwert einer Demo: 3,3:1)
- **Typo-Spannweite ≥ 2,5** als Eigenschaft der Skala verankert, dazu getrennte
  Zeilenhöhen (`--lh-display`, `--lh-heading`, `--lh-body`) und Laufweiten.
  Ein globaler Zeilenhöhenwert lässt jede große Überschrift zerfallen
- **Zustands- und Bewegungs-Tokens** (`--color-hover`, `--color-focus`,
  `--dur-schnell`, `--ease-out`) – ohne sie gibt es kein Feedback, und
  „statisch" ist in der Kritik wörtlich gemeint
- **`css/fonts.css`** als Vorlage für lokale `@font-face`-Einbindung, in
  `index.html` vor `tokens.css` verlinkt
- `:focus-visible` in `base.css`, mit `currentColor`-Fallback: ohne ihn wäre
  die Regel bei leerem Token ungültig und die Seite hätte **weniger** Fokus
  als ohne sie

## 2026.09.2 – Skill `section-craft`

Anlass: Der Hero hatte ein eigenes Handwerk (`hero-craft`), die zehn Sektionen
darunter nicht. Genau dort entsteht „Kachelwüste" und „statisch,
weichgewaschen". Bisher standen die Regeln dagegen verstreut in CLAUDE.md §7
und im `structure-architect` – als Verbote, ohne Alternative.

- **Muster-Typologie:** elf Sektionsmuster mit Bedingung und Breite. Karten
  sind eine Option davon, nicht der Standardweg. Das Muster folgt aus der
  Beziehung der Inhalte, nicht aus Gewohnheit
- **Streich-Test** je Sektion: Fehlt dem Besucher etwas, wenn sie wegfällt?
- **Blätter-Test:** Seite auf 25 % zoomen und ohne Lesen durchscrollen.
  „Statisch" ist die Antwort darauf, nicht auf den Inhalt
- **Rhythmusplan** als Pflichtartefakt in Phase 2a: je Sektion Muster, Breite,
  Grund, Höhe. Derselbe Wert dreimal in Folge = Umbau, und zwar vor dem Bau
- Anatomie (H2 ist eine Aussage, keine Bezeichnung), Zäsuren (nur eine Seite
  polstert), Zustände (Hover, Fokus, aktiv) als Pflicht

Verdrahtet in `structure-architect`, `docs/WORKFLOW.md` (2a und 4), `/demo`.

## 2026.09.1 – Erste versionierte Fassung

Stand nach der Auswertung der beiden Retrospektiven (Demo „Dachdecker" und
Demo „SHK") und der Wettbewerbsanalyse. Ab hier wird gezählt.

**Der gemeinsame Befund beider Retros:** Beide Demos sind an Regeln
gescheitert, die längst im Template standen. Nicht an fehlenden Regeln. Die
Konsequenz zieht sich durch alles Folgende – **gemessen statt ermahnt**.

### Belegpflicht wurde ein eigener Abschnitt (CLAUDE.md §3)
Anlass: Erfundene Zahlen und konstruierte URLs in beiden Demos. Ein Inhaber
erkennt jede erfundene Aussage über seinen eigenen Betrieb sofort.
- Quelle je Behauptung, URLs kopiert statt konstruiert
- „Abwesenheit ≠ Nichtexistenz": aus einer Lücke im Scrape folgt keine
  Negativ-Behauptung
- Widerspruchspflicht: Briefing gegen Scrape, melden statt auflösen
- **Fünf-Stufen-Leiter** gegen die Sackgasse „sei konkret, erfinde aber nichts":
  Scrape → Situation des Lesers → Kombination → Rückfrage → Platzhalter

### Flächennutzung wurde ein Mechanismus statt einer Ermahnung
Anlass: „Der linke und rechte Rand wird überhaupt nicht genutzt" – der
häufigste Kritikpunkt an beiden Demos. Ursache war strukturell: Ein
zentrierender Container macht die schmale Mittelspalte zum Weg des geringsten
Widerstands.
- `.layout`-Raster mit drei Breiten (Text / `.breakout` / `.full`)
- Pflicht je Seite: mindestens ein randloses Element, auf 1920 px kein
  Abschnitt mit mehr als ~200 px totem Rand je Seite

### Hero bekam ein eigenes Teilsystem
Anlass: „generisch, statisch, weichgewaschen". Diagnose: der
Weißschleier-Reflex – ein falsch aufgelöster Konflikt zwischen Lesbarkeit und
Bildwirkung.
- Skill `hero-craft`: Hero-Typologie, Hintergrund-Strategien, Bausteinformel
- Agent `hero-specialist` baut **zwei** Varianten, die sich in Typ **und**
  Hintergrund unterscheiden
- Agent `hero-critic` urteilt unabhängig und darf beide ablehnen
- `scripts/hero-check.mjs` misst Höhe, Flächennutzung, Typo-Spannweite,
  Kontrastumfang und Weißschleier

### Vorgelagerte Analyse-Phase (Phase 1b)
Anlass: Hero und Struktur entstanden bisher, bevor feststand, was den Betrieb
überhaupt unterscheidet.
- `docs/DOSSIER.md`: was ist einzigartig, was hervorheben, was
  berücksichtigen, was ausnutzen
- **Zweistufiges Bild-Inventar**: erst auflisten, was es gibt, dann gezielt
  laden. Alles herunterzuladen war teuer und größtenteils unnütz

### Branchen-Knowledge-Base
Anlass: Austauschbarkeit ist eine Eigenschaft des Gewerks, nicht des Ortes. Die
Wettbewerbsrecherche pro Demo zu wiederholen war die teuerste Phase.
- Skill `branchen-wissen` mit sechs Gewerken (Dachdecker, Elektro, SHK,
  Metallbau, Bau, Maler)
- Befehl `/branche <gewerk>` erhebt oder frischt auf

### Quellen-Notation und Prüfer für die Knowledge Base
Anlass: Zwei Code-Reviews fanden in `dachdecker.md` 13 falsche Stellen,
nachdem die Datei von Hand „geprüft" worden war. Der erste Prüflauf zeigte die
größere Lücke: fünf der sechs Dateien hatten überhaupt keine Quellen-Notation.
- Jede Zahl trägt ihre Belegliste (`5 von 8 (Q1, Q3, Q4, Q6, Q7)`)
- `scripts/branchen-check.mjs` rechnet nach; eine Datei mit Fehlern gilt als
  nicht erhoben
- Beim Attribuieren fielen rund 40 Zählungen, darunter zwei falsche
  Null-Aussagen, denen Gegenbeispiele in derselben Stichprobe widersprachen

### Widersprüche zwischen den beiden Retros aufgelöst
- **Demo-Hinweis:** kein globales Band über der Seite (verschiebt das Layout),
  sondern ein Kasten direkt **über** dem betroffenen Inhalt
- **Funnel:** Begrenzt ist nur, was **vor** dem Absenden Pflicht ist – maximal
  zwei Vorqualifizierungsfragen plus Kontaktdaten. Optionales liegt auf dem
  Danke-Screen (`docs/FUNNEL.md`)
- **Libraries:** liegen lokal unter `assets/js/`, nicht per CDN. Der
  Egress-Proxy blockiert CDNs und Google Fonts

### Git und Deploy
- Direkt auf `main`, keine Feature-Branches. Anlass: Ein nie gemergter Branch
  führte dazu, dass die Live-Domain nur das Grundgerüst zeigte
- `.vercelignore` hält `CLAUDE.md`, `docs/`, `.claude/` und `scripts/` von der
  Kunden-Domain fern
