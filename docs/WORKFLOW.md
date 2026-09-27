# WORKFLOW.md – Demo-Erstellung

Dieser Ablauf ergänzt die Regeln aus `CLAUDE.md` (die immer gelten). Hier steht
die konkrete Reihenfolge: von "Briefing einfügen" bis "Demo-Link". Der Ablauf
wird per Slash-Command `/demo` gestartet.

## Grundregeln für den ganzen Ablauf

- **Phasen nacheinander.** Keine Phase überspringen, keine vorziehen.
- **Plan Mode nutzen (Phase 0–2).** In den analysierenden Phasen im Plan Mode
  arbeiten (Shift+Tab in Claude Code): nur lesen, extrahieren, planen, Konzepte
  vorlegen – noch keine Dateien bauen. Nach dem Struktur-Kontrollpunkt (Ende
  Phase 2) in den Ausführungsmodus wechseln. Ab Phase 3 wird gebaut.
- **Kontrollpunkte (🛑) ernst nehmen.** An jedem 🛑: kurz Stand zeigen, auf
  Freigabe warten, erst dann weiter. (Anfangs mehr manuelle Freigaben; mit der
  Zeit übernimmt der `qa-reviewer` mehr – siehe CLAUDE.md, *Kontrollpunkt-Prinzip*.)
- **Nichts erfinden.** Nur mit Infos aus Briefing, Scrape oder von Bruno arbeiten.
  Jede Behauptung braucht eine Quelle, Widersprüche werden gemeldet statt
  eigenmächtig aufgelöst (siehe CLAUDE.md, *Belegpflicht*).
- **Direkt auf `main` arbeiten.** Keine Feature-/Session-Branches anlegen –
  jeder Commit geht direkt nach `main` (siehe CLAUDE.md, *Tech-Stack*). Sonst
  zeigt die Live-Domain nur das Grundgerüst statt der echten Demo.
- **Nach jeder Änderungsrunde ein Regressionslauf über alle Seiten**, nicht nur
  über die geänderte. Copy-Korrekturen nach dem **Wortstamm** suchen, nicht nach
  dem Satz – sonst bleibt die Variante stehen.
- **Transparenz.** Bei jeder Extraktion/Analyse zeigen, was verwendet und was
  bewusst weggelassen wurde.

---

## Phase 0 – Briefing-Analyse  ·  🧠 Plan Mode
**Agent:** `brief-analyst`

1. Bruno fügt das Briefing (aus Todoist, vom Vertrieb) ein.
2. `brief-analyst` extrahiert alle demo-relevanten Infos:
   - Hauptziel der Demo (z.B. Mitarbeitergewinnung vs. Kundengewinnung)
   - Branche, Unternehmensgröße, Leistungen
   - Geforderte Sektionen & Funktionen (z.B. Bewerbungs-Funnel, Projektanfrage)
   - Benefits / Argumente, Referenz-Anforderungen
   - Design-Wünsche, Hero-Vorgaben, Ton
   - URL der bestehenden Website (Scrape-Quelle)
3. Filtert Nicht-Relevantes heraus und **nennt es transparent** (z.B.
   Terminorganisation, Budget-Notizen, reine Sales-Gesprächsnotizen).
4. **Vier Pflichtfragen** – die werden immer gestellt, wenn das Briefing sie
   nicht beantwortet. Jede davon hat in einer echten Demo eine komplette
   Korrekturrunde gekostet:
   1. **Welche Assets liegen vor?** Videos, Fotos, Logo (in welcher Auflösung),
      Kundenlogos, Referenzmaterial. Ohne diese Liste wird kein Hero konzipiert.
   2. **Wer ist der Ansprechpartner als Person?** Wie redet er, was treibt ihn,
      wie sieht er sich selbst? Das steuert Ton und Hero.
   3. **Aus welcher Perspektive spricht die Website?** ich / wir / dritte Person.
      Bei Einzelunternehmern und Personenmarken ist "ich" die Voreinstellung.
   4. **Was sind die echten Referenzprojekte** – und war der Kunde dort
      Auftraggeber, Produzent oder nur Beteiligter? Diese Rolle wird nie geraten.
5. Stellt darüber hinaus 3–5 gezielte Rückfragen – nur wo wirklich nötig, nicht
   auf Verdacht.
6. Gibt eine strukturierte **Demo-Spec** aus (Ziel, Sektionen, Funnels, Ton,
   Perspektive, Persönlichkeitsprofil, Asset-Inventar, Quelle).

🛑 **Kontrollpunkt:** Demo-Spec + Filterung bestätigen oder korrigieren.

Nach Bestätigung: die Vorlage `docs/DEMO-SPEC.md` ausfüllen.
Grund: Damit geht das Hauptziel/die Priorität (z.B. "starke Karriereseite")
über den ganzen Ablauf nicht verloren – `structure-architect` und
`qa-reviewer` checken später explizit gegen diese Datei.

---

## Phase 1 – Scrape & Analyse  ·  🧠 Plan Mode

**Neu ab 2026.09.20: alle Bildquellen, nicht nur die Website.** Google-Eintrag
und Instagram enthalten bei Handwerksbetrieben oft das bessere Material. Die
Quellen werden **vor** dem Konzept abgeklopft – ein Konzept auf Platzhaltern,
obwohl Material existiert, ist verschwendete Arbeit. Verifikation und Kosten:
Agent `site-analyst`, Schritt 6.
**Agent:** `site-analyst` · **Tools:** Apify (Scrape + Bilder), Higgsfield (Logo)

1. Bestehende Website scrapen (Apify). **Das Ergebnis kommt nach `quellen/`**,
   unverändert und mit Datum und Herkunft im Kopf. Nicht ins Chatfenster und
   nicht nur in die Analyse: `scripts/beleg-check.mjs` hält später jede Zahl
   und jede URL der gebauten Seite gegen diesen Ordner. Was dort fehlt, gilt
   als erfunden. Konventionen: `quellen/README.md`.
2. **Google-Unternehmensprofil scrapen** (`compass/crawler-google-places`) und
   nach `quellen/scrape-google.md` schreiben, nach dem Schema in
   `quellen/README.md`. **Zuordnung vor Übernahme:** Mindestens zwei belegte
   Merkmale müssen übereinstimmen (Website-URL, Telefon, Adresse). Stimmt nur
   der Name, wird nachgefragt statt übernommen.

   Aus einem so zugeordneten und **verifizierten** Profil gehen zwei Dinge
   direkt auf die Demo, und beide sind starke lokale Signale:
   - **Öffnungszeiten**, auch im JSON-LD (`openingHours`)
   - **Bewertung**, aber nur **sichtbar im Inhalt** mit Quellenangabe
     („4,9 von 5 bei 37 Bewertungen auf Google") und das Profil über `sameAs`
     verlinkt. **Nicht** als `aggregateRating` im eigenen JSON-LD, siehe
     Skill `seo-basis`

   Ist das Profil nicht verifiziert oder nicht eindeutig zuzuordnen: kein Wert
   auf die Seite, sondern ein Hinweiskasten (§11).
3. **CI extrahieren:** Farben, Schriften, Logo.
4. **Logo aufbereiten (Higgsfield):** hochskalieren, freistellen/Hintergrund
   entfernen – für sauberen Einbau in Header/Footer.
5. **Sprache & Ton analysieren:** Wie schreibt der Kunde? Förmlich/locker,
   regional, fachlich? Was betont er (Menschen, Historie, Kultur, Qualität)?
6. **Werte-Analyse:** Worauf legt die alte Seite Wert – das übernehmen, aber
   besser machen (verkaufspsychologisch, SEO, modern).
7. **Original-Bilder markieren und holen:** Gute vorhandene Bilder erkennen und
   Bruno aktiv vorschlagen ("Dieses Bild passt gut in Sektion X – Original
   holen?"). Werden die Dateien gebraucht, läuft das über den Apify-Actor
   **`onescales/bulk-image-downloader`** (`resultsType: "zip"`). Bilder gehören
   als Datei unter `site/assets/images/`, nicht als Hotlink – fremde CDN-URLs laufen
   ab, Instagram-Links schon nach wenigen Tagen.
8. **Widersprüche aktiv suchen und melden.** Briefing gegen Scrape halten,
   besonders bei Firmenhistorie, Standorten, Rechtsform, Zahlen und Namen. Jeder
   gefundene Widerspruch wird als eigener Punkt gemeldet, nicht selbst aufgelöst.
   (In einer Demo stand "Hauptsitz Biesenthal" gegen "Sitz Berlin" auf der alten
   Website – niemand hat gefragt, der Kunde hat es im Termin bemerkt.)
9. **Referenz-Website analysieren, falls eine genannt ist** – auf drei Ebenen:
   Aufbau, Gestaltung und **Bewegung** (was passiert beim Scrollen, was ist
   gepinnt). Nur den Aufbau zu übernehmen liefert eine statische Kopie.

**Definition of Done für Phase 1:** Die Phase ist erst fertig, wenn
**Farbwerte, Schriftart und ein sauber freigestelltes Logo als Datei** vorliegen.
Kein Design ohne diese drei. Fehlt Material, wird bei Bruno angefragt – eine
erfundene Palette ist der schnellste Weg zum generischen KI-Look.

🛑 **Kontrollpunkt:** CI, Ton-/Werte-Erkenntnisse, Widersprüche und
Bild-Vorschläge bestätigen.

---

## Phase 1b – Synthese: das Strategie-Dossier  ·  🧠 Plan Mode
**Agent:** `site-analyst` · **Ergebnis:** `docs/DOSSIER.md`

Die wichtigste Phase des ganzen Ablaufs. Phase 1 hat Rohmaterial gesammelt –
hier wird daraus eine Entscheidungsgrundlage. Ohne diesen Schritt erfindet jede
spätere Phase ihre Strategie neu, und das Ergebnis wird austauschbar.

Briefing und Scrape werden zusammengeführt und vier Fragen beantwortet:

1. **Was ist einzigartig?** Merkmale mit Quelle – und vor allem ihre
   **Kombination**. Einzelfakten teilt man mit dem Wettbewerb, die Kombination
   nicht.
2. **Was muss hervorgehoben werden?** Was zahlt auf das Hauptziel aus
   `docs/DEMO-SPEC.md` ein?
3. **Was muss berücksichtigt werden?** Schwaches Bildmaterial, Ton der Person,
   Zwänge, ausdrückliche Wünsche.
4. **Was können wir ausnutzen?** Vorhandene, aber ungenutzte Vorteile:
   Herstellerpartnerschaften, Bewertungen, Firmengeschichte, alte Fotos,
   Social-Kanäle, Notdienst, eigene Fertigung.

Dazu: **Bild-Inventar (Stufe 1, ohne Download)**, Lücken mit Entscheidung,
Widersprüche und die Verbotsliste des Gewerks aus der Branchen-Knowledge-Base.

🛑 **Kontrollpunkt:** Dossier bestätigen. Ab hier ist es die verbindliche
Grundlage – `hero-specialist`, `structure-architect` und `copywriter` lesen es,
bevor sie arbeiten.

---

## Phase 2 – Struktur, Hero & Design  ·  🧠 Plan Mode

### 2a – Struktur
**Agent:** `structure-architect` · **Skills:** `section-craft`, `ui-ux-pro-max`

1. Entwirft die **optimale Seitenstruktur für den konkreten Use-Case** – kein
   Schema-F. Sektions-Reihenfolge folgt dem Ziel (z.B. Karrierebereich dominant
   bei Mitarbeitergewinnung).
2. Struktur als Übersicht darstellen (Sektionen + Zweck + grobe Reihenfolge).
3. **Streich-Test je Sektion** (`section-craft`): Fehlt dem Besucher etwas,
   wenn sie ersatzlos wegfällt? Wenn nein, fällt sie weg – nicht kürzen.
4. **Rhythmusplan aufstellen**: je Sektion Muster, Breite, Grund, Höhe. Kein
   Wert dreimal in Folge in derselben Spalte. Das ist der Punkt, an dem die
   Kachelwüste verhindert wird – nachträglich ist sie ein Umbau.
5. **Jeder Konzeptvorschlag nennt seinen Asset-Bedarf** und ob er gedeckt ist
   (Bild-Inventar aus `docs/DOSSIER.md`). Eine Sektion, die ein Asset
   voraussetzt, das niemand hat, kostet eine ganze Runde.

🛑 **Kontrollpunkt:** Struktur und Rhythmusplan abnicken.

### 2b – Hero
**Agenten:** `hero-specialist`, dann `hero-critic` · **Skill:** `hero-craft`

Der Hero bekommt einen **eigenen** Kontrollpunkt. Bisher lief er im
Struktur-Kontrollpunkt mit und ging darin unter – mit dem Ergebnis, dass die
wichtigste Sektion der Seite die am wenigsten geprüfte war.

1. `hero-specialist` recherchiert (Dossier, Assets, **drei Wettbewerber-Heros**),
   entscheidet Hero-Typ und Hintergrund-Strategie.
2. Baut **zwei echte Varianten** als HTML/CSS, die sich auf **beiden** Achsen
   unterscheiden – Typ *und* Hintergrund. Beschreibungen genügen nicht; einen
   Hero kann man nur am gerenderten Bild beurteilen.
3. `node scripts/hero-check.mjs` misst beide Varianten und macht Screenshots
   auf 1920, 1440×900, 1512×982 und 390.
4. `hero-critic` urteilt unabhängig, empfiehlt eine Variante und begründet die
   Ablehnung der anderen. **Er darf beide ablehnen** – dann zurück zu Schritt 1.

🛑 **Kontrollpunkt:** Bruno bestätigt die Variante oder überstimmt.

### 2c – Design- & Bewegungskonzept
**Agenten:** `structure-architect` + `hero-specialist` · **Skills:** `design-system`, `ui-ux-pro-max`

Bevor mehrere Seiten gebaut werden, wird das Aussehen einmal abgenommen. Genau
hier wäre in einer Demo die teuerste Runde (kompletter Design-Umbau nach dem
Bau) vermeidbar gewesen.

1. **`site/css/tokens.css` füllen** nach dem Verfahren in `design-system`:
   Markenfarbe aus dem Logo in oklch, Neutrale aus ihrem Farbton ableiten
   (kein reines Grau), `--color-primary-on-dark` gegen `--color-bg-dark`
   nachmessen, Typo-Spannweite `--step-3 ÷ --step-0` ≥ 2,5 prüfen.
   Schriften als `woff2` unter `site/assets/fonts/`, eingebunden über
   `site/css/fonts.css`.
2. **Design-Entwurf zeigen:** Farben und Schrift (aus der CI, Phase 1), Logo im
   Einbau, ein Hero-Entwurf.
3. **Bewegungskonzept:** Welcher Effekt in welcher Sektion, mit welchem Werkzeug
   (Skill `motion-toolkit`) und welchem Asset-Bedarf. Bei genannter
   Referenz-Website gehört das Scroll-Verhalten hier hinein, nicht nur der Aufbau.

🛑 **Kontrollpunkt:** Design & Bewegung freigeben, bevor gebaut wird.

> 🔧 **Ab hier: Ausführungsmodus.** Plan Mode verlassen (Shift+Tab) – ab
> Phase 3 wird tatsächlich getextet und gebaut.

---

## Phase 3 – Copy
**Agent:** `copywriter` · **Skills:** `website-copy`, `anti-slop`, `seo-basis`,
`schema-markup` (JSON-LD, nur belegte Felder)

1. `copywriter` textet Sektion für Sektion über den `website-copy`-Skill
   (Verkaufspsychologie + SEO-Struktur + menschlicher, slop-freier Stil).
2. Rohtext aus dem Scrape wird nie 1:1 übernommen, sondern neu & besser formuliert.
3. Ton an die in Phase 1 analysierte Kundensprache anpassen.

🛑 **Auto-QA:** `qa-reviewer` prüft die Copy gegen Anti-Slop-Regeln und
   Verkaufslogik (Skill `anti-slop`), meldet Befunde.

🛑 **Kontrollpunkt:** Copy freigeben.

---

## Phase 4 – Bau & Effekte
**Agenten:** Haupt-Agent + `hero-specialist` · **Skills:** `section-craft`,
`motion-toolkit`, `ui-ux-pro-max` · **Tool:** Higgsfield (Bilder)

Sobald GSAP im Spiel ist, wird der zuständige Skill **beim Namen** aufgerufen:
`gsap-core` (Tweens, Easing, Stagger, matchMedia), `gsap-timeline` (Abfolgen),
`gsap-scrolltrigger` (Scroll, Pin, Scrub), `gsap-performance` (Ruckler,
60 fps), `gsap-utils` (clamp, mapRange, random, snap). Ihre Beschreibungen
sind englisch und springen in einer deutschen Session nicht von selbst an.

1. HTML/CSS/JS **sektionsweise** aufbauen – von Anfang an responsive gedacht
   (mobile & desktop parallel, nicht nachträglich). Dazu gehört die
   **Breitennutzung ab der ersten Version**: je Sektion bewusst Textbreite,
   `.breakout` oder `.full` wählen (Raster in `site/css/styles.css`), mindestens ein
   randloses Element je Seite. Nachträgliches "alles nochmal desktop optimieren"
   war schon eine komplette Korrekturrunde.
2. `hero-specialist` baut & prüft den Hero besonders sorgfältig.
3. **Effekte** nach `motion-toolkit`: leichtestes Werkzeug zuerst
   (CSS → Lenis → GSAP/ScrollTrigger → Anime.js → Three.js). Sparsam & gezielt.
4. **Bilder:** echte Original-Bilder (aus Phase 1) wo passend, sonst via
   Higgsfield generieren, sonst sauberer Platzhalter. Nie leere Löcher.
   Externe Bild-URLs (z.B. Instagram-CDN) laufen ab – Bilder gehören lokal ins
   Repo, sobald die Demo länger als ein paar Tage leben soll.
5. **Funnel** nach `docs/FUNNEL.md` bauen: max. zwei Pflichtfragen plus Kontakt,
   Optionales auf den Danke-Screen, Formular als Formular erkennbar.
6. **Hinweiskästen** für alles, was noch nicht belegt ist – sichtbar, direkt
   über dem betroffenen Inhalt, nie als globales Band (CLAUDE.md,
   *Recht & Demo-Hinweise*).
7. **Footer:** Impressum & Datenschutz als Links mit leerem Platzhalter-Inhalt.
8. **Zustände nicht vergessen** (`section-craft`): Hover auf allem Anklickbaren
   und auf Inhaltskacheln, sichtbarer Fokus, aktiver Zustand. „Statisch" ist in
   der Kritik meistens wörtlich gemeint.
9. **Nach jedem größeren Abschnitt messen, nicht erst am Ende:**
   `node scripts/layout-check.mjs site/<datei>.html`. Eine Sektion, die auf 1920 px
   zu schmal gebaut ist, kostet jetzt zwei Minuten und nach neun Seiten eine
   Korrekturrunde. Genau das ist schon passiert.
10. Nach jedem größeren Abschnitt kurz Status melden.

**Bevor Bruno die Seite sieht: `visual-critic` laufen lassen.**

```
node scripts/layout-check.mjs site/index.html    # erzeugt die Screenshots
```

→ Subagent `visual-critic`. Er sieht sich die Ganzseiten-Ansichten auf 390 und
1440 an und urteilt gegen eine feste Prüfliste plus `docs/PRAEFERENZEN.md`.

Er findet, wofür es keinen Messwert gibt: Kanten, die nicht fluchten,
Überschriften ohne Luftraum, Buttons über die volle Textbreite, Kachelreihen,
die das Skript nicht als Dreiergruppe zählt. Eine Seite kann durch
`layout-check` als „sauber" laufen und trotzdem aussehen, als hätte sie
niemand angesehen.

**Seine Befunde werden umgesetzt, bevor Bruno schaut** – das ist der Zweck.
`blockierend` und `störend` zuerst, `feinschliff` nur, wenn Zeit ist.
Er selbst ändert nichts.

**Bevor die QA beginnt: den Erstbau markieren.**

```
git tag demo-v1 -m "Erste vollstaendige Claude-Version, vor QA und Korrekturen"
```

Ohne diesen Marker ist später nicht mehr rekonstruierbar, was Claude gebaut
hat und was Bruno korrigiert hat – und genau das ist die Grundlage der
Rückmeldung (`/closing`). Ein Tag kostet nichts, die fehlende Information ist
nicht nachholbar.

🛑 **Kontrollpunkt:** visuelle Zwischenabnahme.

---

## Phase 5 – Finale QA & Deploy

> **Beide QA-Durchgänge laufen, BEVOR die Demo zum ersten Mal jemandem gezeigt
> wird** – nicht erst vor dem Deploy. In einer verlorenen Demo fand die formale
> QA das erfundene Zitat, die beworbene aber fehlende Stelle, das kaputte
> Mobilmenü und den toten Sticky-Header. Nach dem Sales-Call.

### 5a – Inhalt & Struktur-QA
**Agent:** `qa-reviewer` · gegen `docs/CHECKLISTE.md`
- Sektionen & Gewichtung entsprechen `docs/DEMO-SPEC.md`
- Copy sauber (Anti-Slop, Verkaufslogik, Inhaber-Test), Zählungen durchgeführt
- Belegpflicht: jede Zahl und URL gegen die Scrape-Daten geprüft
- Deckungsprüfung: jeder Navigationspunkt, CTA und jede beworbene Leistung oder
  Stelle hat ein Ziel, das auch liefert, was der Link verspricht
- SEO-Struktur (Überschriften-Hierarchie, Meta, Alt-Texte)
- Impressum/Datenschutz-Platzhalter vorhanden
- Logo sauber eingebunden

### 5b – Cross-Device-QA
**Agent:** `responsive-qa`
- iPhone/Safari + Android/Chrome + Desktop
- Gemessene Breiten: 360, 390, 768, 1280, 1440, 1920
- **Hero vollständig sichtbar** auf 1440×900 und 1512×982 (Laptop-Höhen)
- Breakpoints sauber, Touch-Targets ≥ 44 × 44 px
- Scroll-Animationen sauber & flüssig auf allen Geräten
- Keine Layout-Brüche, kein horizontales Scrollen, 0 JS-Fehler

### 5c – Freigabe & Deploy
1. Befunde aus 5a & 5b beheben.
2. 🛑 **Finale Freigabe** durch Bruno.
3. **Einmalig pro neuem Demo-Repo:** Bruno legt das Vercel-Projekt an und
   verknüpft es mit dem GitHub-Repo. **Root Directory = `site`**, Framework
   Preset „Other", Production Branch `main`. Claude kann das nicht übernehmen:
   Das Vercel-Konto gehört Bruno, Claude hat dort keinen Zugriff und darf laut
   CLAUDE.md §4 kein Token dafür sehen. Danach deployed jeder Push nach `main`
   von selbst.
4. **Stichprobe nach dem ersten Deploy:** `<demo>.vercel.app/CLAUDE.md`
   aufrufen. Es muss 404 kommen. Kommt stattdessen der Text, steht das Root
   Directory falsch und das komplette Playbook liegt öffentlich.
5. Demo-Link ausgeben.

---

## Nach dem Vertragsabschluss

Die Demo endet hier. Unterschreibt der Kunde, wird dieses Repo zum
Projekt-Repo weitergeführt, nicht kopiert: `site/`, Historie, Demo-Spec und
Dossier bleiben, nur das Playbook wechselt. Das macht ein Befehl aus dem
Repo `Autolution/Live-Template`:

```
node <live-template>/scripts/live-start.mjs <dieses-repo> --commit
```

**Der vollständige Ablauf steht in `docs/START.md` des Live-Templates.** Dort
stehen die drei Handgriffe (neue Session, beide Repos anhängen, eine Nachricht
einfügen), die Nachricht selbst zum Einfügen, die Deutung der Meldungen und die
Abbruchgründe. Da nachsehen, statt den Befehl aus dem Gedächtnis abzutippen.

**Ein Punkt davon gilt schon hier:** Sind `docs/DEMO-SPEC.md` und
`docs/DOSSIER.md` in diesem Repo wirklich gefüllt? Sie sind der Kundenkontext,
den die Live-Phase liest; `live-start` überspringt sie kommentarlos, wenn sie
fehlen, und in P0 fehlt dann die Grundlage.

Danach gilt dort `/live` statt `/demo`, und der Ablauf P0–P9 aus dem
Live-Template. Nichts davon von Hand nachbauen.

---

## Phase 6 – Closing & Rückmeldung

**Auslöser:** Bruno sagt, die Demo ist closing-bereit · **Befehl:** `/closing`
· **Agenten:** `feedback-analyst` und `vertriebs-briefing`, parallel

Ab hier läuft alles ohne Bruno. Sein Beitrag war die Korrektur der Demo.

1. Stand committen und pushen, damit der closing-Stand eindeutig ist.
2. **Zwei Dokumente parallel**, für zwei verschiedene Leser:
   - `feedback-analyst` → **Rückmeldung**, nach innen. Aus Chat-Verlauf und
     Git-Diff (`demo-v1..HEAD`), nicht aus Erinnerung. Je Befund ein
     wörtlicher Beleg und eine Ursache (`regel-ignoriert`, …).
   - `vertriebs-briefing` → **Briefing für den Closing-Call**, nach außen.
     Was die Demo abbildet und warum, welche Besonderheiten tatsächlich drin
     sind, was noch fehlt und wie der Vertriebler es anspricht.
3. Beide nach `.closing/` (gitignoriert) und per `SendUserFile` an Bruno.

**Warum zwei Agenten:** Das eine Dokument sucht Fehler, das andere Stärken.
Dieselbe Rolle könnte beides nicht ehrlich schreiben.

**Beides gehört nicht ins Repo.** Kundennamen, interne Kritik und
Vertriebsunterlagen; „Use this template" würde sie in jedes künftige
Kundenrepo kopieren, und das Demo-Repo kann beim Kunden landen.

Das Briefing geht an den Vertriebler. Die Rückmeldungen sammelt Bruno und gibt
sie in der Template-Session weiter – dort laufen sie durch `/auswerten` und
werden zu Messpunkten und Gates.

---

## Übersicht: was greift wann

| Phase | Agent | Skill | Tool |
|-------|-------|-------|------|
| 0 Briefing | `brief-analyst` | – | – |
| 1 Scrape/Analyse | `site-analyst` | `seo-basis` | Apify, Higgsfield |
| 1b Synthese/Dossier | `site-analyst` | `branchen-wissen` | Apify (Bilder gezielt) |
| 2a Struktur | `structure-architect` | `section-craft` | – |
| 2b Hero | `hero-specialist`, `hero-critic` | `hero-craft`, `branchen-wissen` | `scripts/hero-check.mjs` |
| 2c Design/Bewegung | `structure-architect`, `hero-specialist` | `design-system`, `motion-toolkit`, `ui-ux-pro-max` | Higgsfield |
| 3 Copy | `copywriter` | `website-copy`, `anti-slop`, `seo-basis` | `scripts/copy-check.mjs` |
| 4 Bau/Effekte | Haupt-Agent, `hero-specialist` | `section-craft`, `motion-toolkit` | Higgsfield, `scripts/layout-check.mjs` |
| 5a Inhalt-QA | `qa-reviewer` | `anti-slop`, `seo-basis` | `scripts/copy-check.mjs` |
| 5b Device-QA | `responsive-qa` | `section-craft` | `scripts/layout-check.mjs` |
| 5c Deploy | Haupt-Agent + Bruno (Vercel-Projekt einmalig verknüpfen, Root Directory = `site`) | – | Vercel |
| 4b Visuelle Prüfung | `visual-critic` | `section-craft` | `scripts/layout-check.mjs` |
| 6 Closing | `feedback-analyst`, `vertriebs-briefing` | `branchen-wissen` | `/closing`, `SendUserFile` |
