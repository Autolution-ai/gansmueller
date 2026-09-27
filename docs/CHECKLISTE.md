# CHECKLISTE.md – Pre-Deploy-Kontrolle

Gegen diese Liste prüft der `qa-reviewer` (5a) und `responsive-qa` (5b). Beide
Durchgänge laufen, **bevor die Demo zum ersten Mal jemandem gezeigt wird** –
nicht erst vor dem Deploy. Nichts geht live oder in einen Termin, solange
kritische Punkte offen sind.

**Wo ein Messwert verlangt ist, wird er eingetragen.** Beide bisherigen Demos
sind an Regeln gescheitert, die längst im Template standen, aber nie gemessen
wurden. Ein Haken ohne Wert gilt als nicht geprüft.

## 5a – Inhalt & Struktur (qa-reviewer)

### Belegpflicht
- [ ] **Jede Zahl** auf der Seite gegen die Scrape-/Briefing-Daten gegengeprüft
      (gegen die Quelle, nicht gegen das Gedächtnis)
- [ ] **Jede externe URL** stammt kopiert aus den Quelldaten, keine konstruiert
- [ ] Keine unbelegte Negativ-Behauptung ("bietet X nicht an", "hat kein Y")
- [ ] Kein wörtliches Zitat einer real benannten Person, das nicht echt ist
- [ ] Widersprüche zwischen Briefing und Scrape gemeldet, nicht selbst aufgelöst
- [ ] Alles Unbelegte trägt einen sichtbaren Hinweiskasten

### Copy & Verkaufslogik (gemessen über `node scripts/copy-check.mjs site/<datei>.html`)

Mit `--gewerk <gewerk>` prüft das Skript zusätzlich gegen die Verbotsliste der
Branchendatei, mit `--perspektive ich|wir` gegen die Perspektive aus der
Demo-Spec.

- [ ] Ansprache-Verhältnis "Sie/Ihr" zu "wir/uns" gezählt: ______ (min. 2:1)
- [ ] Kein Kernbegriff öfter als 2× je Seite. Häufigster Begriff: ______ (__×)
- [ ] Dreiergruppen je Seite gezählt: ______ (max. 2)
- [ ] Gedankenstriche im finalen Text: ______ (muss 0 sein)
- [ ] **Inhaber-Test bestanden:** Kein Satz, den der Chef nicht laut sagen würde
      (keine Ablehnungs-Rhetorik, keine Wettbewerbs-Vergleiche, keine
      Türsteher-Formulierungen, keine Superlative ohne Beleg)
- [ ] Kein AI-Slop (anti-slop bestanden), Ton passt zur Kundensprache
- [ ] Perspektive durchgehalten (ich / wir / dritte Person laut Demo-Spec)
- [ ] Jede Sektion hat etwas Konkretes, keine leeren Adjektive

### Hero (gemessen über `node scripts/hero-check.mjs`)
- [ ] **5-Sekunden-Test:** wer, was, für wen, was tun – vier Antworten
- [ ] **Austauschbarkeits-Test:** Logo abgedeckt – könnte der Hero einem
      Wettbewerber gehören? Wenn ja, nicht fertig
- [ ] Hero vollständig sichtbar auf 1440×900 **und** 1512×982
- [ ] Hero nutzt die volle Fensterbreite auf 1920
- [ ] Typo-Spannweite (H1 ÷ Fließtext): ______ (mindestens 2,5)
- [ ] Kontrastumfang: ______ (mindestens 0,6)
- [ ] Kein ganzflächiges Overlay über dem Bild (Weißschleier-Reflex)
- [ ] Kein Stockfoto als Beweis für die Arbeit des Betriebs
- [ ] Kategorie + Ort stehen im Kicker, nicht in der Headline
- [ ] Aufwand steht im CTA-Button („in unter 60 Sekunden")
- [ ] Trust-Element above the fold, mit Quelle verlinkt
- [ ] Zweite Zielgruppe hat einen sichtbaren Einstieg
- [ ] Eigener Hero-Entwurf für 390 px, nicht dieselben Elemente kleiner

### Struktur & Deckung
- [ ] Sektionen & Gewichtung entsprechen `docs/DEMO-SPEC.md` (Hauptziel
      angemessen prominent, nicht nur als Sektion vorhanden)
- [ ] **Deckungsprüfung:** Jeder Navigationspunkt, jeder CTA und jede beworbene
      Leistung oder Stelle hat ein Ziel – und das Ziel liefert, was der Link
      verspricht. Alle internen Links und Anker lösen auf
- [ ] Keine gleichförmige Kachel-Wüste, echte Hierarchie
- [ ] Hero klar: wer, was, für wen, CTA
- [ ] Lücken als Erklärung formuliert ("Demo-Stand: im Projekt entsteht dafür X"),
      nicht als Zusage ("folgt in Kürze")

### Zahlen & Kennzahlen
- [ ] Zu jeder Zahl beantwortbar: Was soll der Besucher daraus schließen?
- [ ] Jede Zahl steht genau einmal pro Seite
- [ ] Zahlenbänder kommen aus **einer** Logik, jede Zahl trägt ihren Bezug im Label
- [ ] Zähl-Animationen nur bei Zahlen mit mindestens ~10 Schritten Differenz,
      mit `data-from`, korrekten Nachkommastellen, ohne Tausendertrennzeichen
      bei Jahreszahlen, Suffix erst am Endwert

### Conversion & Funnel
- [ ] Max. 2 Pflicht-Vorqualifizierungsfragen plus Kontakt vor dem Absenden
- [ ] Alles Optionale liegt auf dem Danke-Screen, als freiwillig markiert
- [ ] Formular ist als Formular erkennbar (Rahmen, Schrittzähler, sichtbare
      Auswahlschalter, beschriftete Felder, letzter Knopf sagt was er tut)
- [ ] Funnel-Durchlauf bis zum Danke-Screen getestet, Navigation verschwindet danach
- [ ] Jede Leistung endet mit einem CTA, nicht mit einem Preishinweis
- [ ] Kein CTA führt auf eine Zwischenseite mit derselben Auswahl
- [ ] CTA-Labels vereinheitlicht (ein Label pro Ziel)

### Sichtbarkeit (Skill `seo-basis`, gemessen über `node scripts/copy-check.mjs`)

Nichts davon ist Keyword-Arbeit. Es ist die Liste der Dinge, die später Umbau
statt Nacharbeit bedeuten.

- [ ] H1 je Seite: ______ (muss genau 1 sein)
- [ ] Sprünge in der Überschriftenhierarchie: ______ (muss 0 sein)
- [ ] Doppelte IDs: ______ (muss 0 sein)
- [ ] `<title>` Länge: ______ (50–60), je Seite eigen
- [ ] `<meta description>` Länge: ______ (140–160), je Seite eigen
- [ ] Bilder ohne Alt-Attribut: ______ (muss 0 sein)
- [ ] Bilddateinamen sprechen (`dach-sanierung-ort.jpg`, nicht `IMG_4823.jpg`)
- [ ] Open Graph gesetzt, `og:image` liegt lokal im Repo (kein Hotlink)
- [ ] JSON-LD vorhanden und **nur mit belegten Feldern** – kein
      `aggregateRating`, keine erfundenen Öffnungszeiten, kein `priceRange`
      ohne Preisangabe
- [ ] NAP (Name/Adresse/Telefon) identisch in Header, Footer, Kontakt, JSON-LD
- [ ] Ort steht im sichtbaren Inhalt, genau einmal im Title, nicht nur im
      Impressum
- [ ] `docs/SEO-NOTIZEN.md` gefüllt: Befund zur Altseite **und** Keywords
      (als Vermutung gekennzeichnet)
- [ ] Kein Satz steht nur wegen eines Suchbegriffs da (Inhaber-Test)

### Assets & Recht
- [ ] Logo sauber eingebunden (freigestellt, scharf, mit Schutzraum zur Schrift)
- [ ] Keine leeren Bild-Löcher, keine Broken-Image-Symbole
- [ ] Bilder an allen Entscheidungsstellen (Bereichsauswahl, Zitate, Referenzen).
      Ein Zitat ohne Gesicht ist Schmucktypografie
- [ ] Keine selbstgezeichnete Grafik als Ersatz für ein echtes Foto
- [ ] Externe Bild-URLs mit Ablaufdatum (z.B. Instagram-CDN) lokal ins Repo geholt
- [ ] **Alle Bildquellen abgeklopft**, nicht nur die alte Website: Google-Eintrag
      und Social-Profile geprüft. Ergebnis im Dossier – auch wenn es „nichts
      gefunden" lautet
- [ ] Bilder aus dem Google-Eintrag: Autor bekannt. Fotos fremder Nutzer sind
      als Lücke vermerkt, nicht stillschweigend übernommen
- [ ] Footer: Impressum & Datenschutz als Links mit Platzhalter-Inhalt
- [ ] Kein Demo-Hinweisband im Layout-Fluss (Hinweise stehen beim Inhalt)

## 5b – Cross-Device (responsive-qa)

Gemessen über `node scripts/layout-check.mjs site/<datei>.html` auf
**360, 390, 768, 1280, 1440, 1920** px Breite. Das Skript schreibt die Werte
und einen Ganzseiten-Screenshot nach `.layout-check/`.

- [ ] **Hero vollständig sichtbar** auf 1440×900 und 1512×982 – gemessen, nicht
      geschätzt. Ein angeschnittener Hero wirkt kaputt, bevor jemand scrollt
- [ ] `scrollWidth == clientWidth` auf allen Breiten (kein horizontaler Überlauf)
- [ ] **Fläche genutzt auf 1920** – gemessen, nicht geschätzt. „Der linke und
      rechte Rand wird überhaupt nicht genutzt" ist der häufigste Kritikpunkt
      an bisherigen Demos:
      - mindestens ein randloses Element (`.full`) je Seite: ______
      - kein Abschnitt **mit Bildern, Karten oder Galerien** lässt mehr als
        ~200 px je Seite ungenutzt. Größter solcher Rand: ______ px
      - nicht jeder Abschnitt steht auf Textbreite. Ein reiner Fließtext-
        Abschnitt bleibt auf Lesebreite, das ist richtig – aber er darf nicht
        die ganze Seite sein
- [ ] **Rhythmus:** keine drei Abschnitte in Folge mit derselben Breite,
      derselben Höhenklasse oder demselben Grund. Längste Folge: ______
- [ ] Desktop-Layout war Teil der ersten Bauversion, nicht nachträglich ergänzt
- [ ] Alle interaktiven Elemente ≥ 44 × 44 px auf 360 und 390 – besonders die
      Telefonnummer, bei Handwerksbetrieben das wichtigste Ziel überhaupt
- [ ] Kontrast überall ≥ 4,5:1 (auch Marken-Farbe auf dunklem Grund, dafür gibt
      es `--color-primary-on-dark`). Verstöße: ______ · Textstellen auf Bild
      oder Verlauf, die das Skript nicht messen kann: ______ (am Screenshot
      prüfen, nicht als bestanden werten)
- [ ] Fließtext ≥ 14 px auf Mobil (besser 15). Kleinste Schrift auf 360: ______ px
- [ ] `:hover`- und `:focus`-Regeln vorhanden: ______ / ______
- [ ] Sticky-Header klebt wirklich (`getBoundingClientRect().top == 0` nach dem
      Scrollen), Smart-Header-Logik greift
- [ ] Mobilmenü füllt den Viewport (kein Containing-Block-Fehler durch
      `backdrop-filter`/`will-change` auf dem Header)
- [ ] Anker springen nicht unter den Header (`scroll-margin-top` greift)
- [ ] iPhone/Safari + Android/Chrome + Desktop geprüft
- [ ] Scroll-Animationen flüssig, kein Jank
- [ ] `prefers-reduced-motion`: kein Element bleibt dauerhaft unsichtbar
- [ ] **0 JS-Fehler** in der Konsole, auf allen Seiten und Breiten
- [ ] Gepinnte GSAP-Sequenzen mit echtem Scrollen geprüft, nicht per
      fullPage-Screenshot (der zeigt Artefakte, keine Bugs)

## 5c – Deploy
- [ ] Kritische Befunde behoben
- [ ] Regressionslauf über **alle** Seiten nach der letzten Änderungsrunde
- [ ] `node scripts/beleg-check.mjs site/<datei>.html` läuft ohne FEHLER
      durch: ______ . Jede Zahl und jede URL der Seite hat eine Quelle in
      `quellen/`. Bei Kerrinnes waren es sechs Stellen ohne Beleg
- [ ] `node scripts/skill-check.mjs` läuft ohne FEHLER durch: ______ .
      Kein toter Skill, keine Luftnummer
- [ ] `git status` sauber – keine Screenshots, Testartefakte oder `undefined/`-Ordner
- [ ] Finale Freigabe durch Bruno
- [ ] Die Website liegt vollständig in `site/`. Nichts, was ausgeliefert werden
      soll, liegt daneben; nichts Internes liegt darin
- [ ] Vercel-Projekt existiert & ist mit dem GitHub-Repo verknüpft
      (Bruno, einmalig pro Repo)
- [ ] **Root Directory in Vercel steht auf `site`**: ______ . Der eine Schalter,
      der darüber entscheidet, ob `CLAUDE.md`, `docs/` und `.claude/` auf der
      Kunden-Domain landen
- [ ] `.vercelignore` vorhanden (zweite Sicherung, nicht die tragende)
- [ ] Demo-Link funktioniert und ist erreichbar
- [ ] **Gegenprobe am Inhalt, nicht am gruenen Haken:** einen Satz auf der
      Live-Domain suchen, der erst im letzten Commit entstanden ist: ______ .
      Erreichbarkeit allein sagt nichts. Ein gestopptes Vercel-Projekt liefert
      weiter den alten Stand aus, waehrend Git jeden Push als erfolgreich
      meldet. Genau so hat eine Demo zwei Tage lang stillschweigend nicht
      deployt (Kerrinnes, 14.09.2026)
- [ ] Unter Vercel -> Deployments ist der juengste Eintrag **juenger als der
      letzte Push**: ______ . Erkennungsmerkmal fuer denselben Ausfall, dazu
      `remote: This repository moved` beim Push
- [ ] `curl -I https://<demo>.vercel.app` zeigt `x-robots-tag: noindex, nofollow`
      (Demo für Google gesperrt, `site/vercel.json`)
- [ ] **Stichprobe, nicht optional:** `<demo>.vercel.app/CLAUDE.md` liefert
      404: ______ . Zusätzlich ein Pfad aus `docs/`: ______
