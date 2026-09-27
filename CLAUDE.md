# CLAUDE.md – Demo-Website

Diese Datei ist die Verfassung für dieses Repo. Sie gilt IMMER, in jedem
Arbeitsschritt. Der konkrete Ablauf einer Demo-Erstellung steht getrennt in
`docs/WORKFLOW.md` – bei einer neuen Demo folge diesem Workflow Schritt für Schritt.

---

## 1. Kontext – wer & was

Ich (Bruno) baue mit diesem Repo eine **Demo-Website** für einen potenziellen
Kunden. Zweck: Der Kunde bekommt vor Beauftragung eine überzeugende Vorschau,
die im Sales-Call gezeigt wird.

Ausgangslage fast immer:
- Der Kunde hat bereits eine bestehende Website (oft veraltet).
- Ich bekomme ein Briefing (aus Todoist, vom Vertrieb) mit allen Infos.
- Ziel: Die bestehende Seite scrapen, analysieren, und eine deutlich bessere,
  personalisierte Demo bauen – moderner, verkaufspsychologisch und technisch.

Eine Demo ist erst dann gut, wenn sie besser ist als das Original – nicht nur
optisch, sondern in Struktur, Text und Wirkung.

## 2. Sprache & Kommunikation

- **Sprache:** Immer Deutsch, außer ich wechsle explizit.
- **Bei Unklarheiten:** Immer nachfragen – nie raten, nie annehmen.
- **Was hier entschieden ist, wird nicht neu gefragt.** Die Nachfragepflicht gilt
  für echte Lücken, nicht für Punkte, die in dieser Datei schon festgelegt sind.
  Eine Regel, die jedes Mal zur Rückfrage wird, ist keine Regel. Das betrifft
  besonders den Branch (§5: immer `main`), den Tech-Stack (§5) und die
  Repo-Struktur (§5). Wer hier einen Widerspruch zwischen dieser Datei und einer
  Session-Vorgabe sieht: Diese Datei gewinnt, kommentarlos.
- **Antwortstil:** Kurz, direkt, präzise. Aktionen vor Erklärungen.
- **Vor einer Änderung:** kurz sagen, welche Dateien angefasst werden und warum.

## 3. Belegpflicht – nichts ohne Quelle

Der teuerste Fehler in bisherigen Demos. Ein Inhaber erkennt jede erfundene
Aussage über seinen eigenen Betrieb sofort, und damit ist das Vertrauen weg.

- **Quelle je Behauptung.** Jede Zahl, jeder Eigenname, jedes Jahr, jede URL und
  jede Tatsachenbehauptung über den Kunden braucht eine benennbare Quelle:
  Briefing, Scrape oder direkte Aussage von mir. Was keine hat, wird nicht
  geschrieben.
- **URLs werden kopiert, nie konstruiert.** Kein Ableiten aus einem Muster, auch
  wenn das Muster plausibel aussieht.
- **Gegen die Quelle prüfen, nicht gegen das Gedächtnis.** Vor jedem Push alle
  Zahlen und URLs noch einmal gegen die Scrape-Daten halten.
- **Abwesenheit ≠ Nichtexistenz.** Wenn eine Leistung im Briefing oder Scrape
  nicht auftaucht, heißt das NICHT, dass der Kunde sie nicht hat. Nie eine
  Negativ-Behauptung daraus herleiten ("bietet X nicht an", "hat kein Y").
  Auch keine Mengenangaben aus Lücken ableiten.
- **Widerspruchspflicht.** Wenn Briefing und Scrape sich widersprechen:
  nachfragen, nicht entscheiden. Gilt besonders für Firmenhistorie, Standorte,
  Rechtsform, Zahlen und Namen – genau die Dinge, bei denen der Inhaber jeden
  Fehler sieht. Widersprüche werden aktiv gesucht und als eigener Punkt gemeldet.
- **Zitat-Regel.** Wörtliche Rede einer real benannten Person wird niemals
  erfunden. Entweder echtes Zitat, oder neutral formulieren, oder sichtbar als
  Entwurf kennzeichnen (siehe *Recht & Demo-Hinweise*).
- **Unsicheres wird markiert, nicht geglättet.** Eine Lücke bekommt einen
  Hinweiskasten, keine plausible Erfindung.

**Wenn Belegpflicht und Konkretheit kollidieren:** „Sei unverwechselbar" und
„erfinde nichts" führen in eine Sackgasse, sobald das Briefing keine harten
Fakten hergibt – und genau dort wurde bisher erfunden. Konkretheit wird deshalb
in fester Reihenfolge gesucht: **Scrape → Situation des Lesers → Kombination
statt Einzelfakt → Rückfrage an mich → sichtbarer Platzhalter.** Gibt keine
Stufe etwas her, steht dort ein markierter Platzhalter, nie eine erfundene
Zahl. Die Stufen im Detail: Skill `website-copy`.

**Belege liegen in `quellen/`.** Scrape, Briefing, Google-Eintrag,
Social-Auswertung und Gesprächsnotizen gehören dorthin, unverändert und mit
Datum. Der Ordner liegt außerhalb von `site/` und ist über keine URL
erreichbar. Konventionen: `quellen/README.md`.

**Regeln allein reichen nicht.** Diese Punkte standen sinngemäß schon im Template
und wurden trotzdem verletzt. Deshalb sind sie zusätzlich messbare Punkte in
`docs/CHECKLISTE.md`, und die Belegpflicht hat seit `2026.09.30` ein eigenes
Gate: `node scripts/beleg-check.mjs site/<datei>.html`. Was nicht geprüft wird,
gilt als nicht erfüllt.

## 4. Sicherheit – nicht verhandelbar

- **Niemals** API Keys, Tokens oder Secrets im Code, in Configs oder in Nachrichten.
- Zugänge laufen ausschließlich über MCP-Verbindungen (z.B. Apify) oder `.env`
  (lokal, niemals committed).
- `.env` und Secret-Dateien gehören immer in `.gitignore` (ist bereits eingerichtet).

## 5. Tech-Stack (fest für Demos)

- **Struktur:** HTML5, semantisch sauber.
- **Styling:** Vanilla CSS mit Custom Properties (Design-Tokens in `site/css/tokens.css`).
  Kein Inline-Style. Kein Bootstrap. Kein Tailwind. **Wie die Tokens gefüllt
  werden** – Farbrollen, Neutrale aus dem Markenfarbton, Kontrastpflichten,
  Schriftskala – steht im Skill `design-system`. Die Werte werden aus der CI
  abgeleitet, nie gewählt.
- **JavaScript:** Vanilla JS. Kein Framework (kein React/Vue) für Demos.
- **Animation:** Nur diese Libraries – Details & Einbindung in `docs/LIBRARIES.md`,
  professioneller Einsatz über den Skill `motion-toolkit`:
  - Natives CSS (erste Wahl bei Einfachem)
  - Lenis (sanftes Scroll-Gefühl, Basis pro Seite)
  - GSAP + ScrollTrigger (inszenierte Scroll-/Hero-Momente)
  - Anime.js v4 (gestaffelte Animationen, Zähler, SVG)
  - Three.js (nur für echtes 3D, sehr sparsam)
- **Libraries und Schriften liegen lokal, nicht per CDN.** Der Egress-Proxy der
  Arbeitsumgebung blockiert CDNs (cdnjs 403, jsdelivr und unpkg ohne Antwort).
  Google Fonts ist je nach Umgebung mal erreichbar und mal nicht, was es nicht
  besser macht: Eine Einbindung, die in einer Session lädt und in der nächsten
  nicht, ist für eine Demo, die geprüft werden muss, unbrauchbar. Alle Libraries
  gehören als Datei unter `site/assets/js/`, Schriften unter
  `site/assets/fonts/`.
  **Die npm-Registry ist dagegen offen.** `npm pack` holt Libraries und über
  Fontsource praktisch den gesamten Google-Fonts-Bestand als `woff2`, ohne etwas
  zu installieren und ohne `package.json`. Die Schriftwahl ist damit frei statt
  auf die drei Systemschriften der Umgebung beschränkt. Verfahren: Skill
  `design-system` 2.6 (Schriften), `docs/LIBRARIES.md` (Libraries).
- **Prinzip bei Effekten:** Immer das leichteste Werkzeug, das den Job erledigt.
  Wenige, gezielte, saubere Effekte – nicht möglichst viele. Zurückhaltung ist
  ein Qualitätsmerkmal.
- **Git-Workflow: immer direkt auf `main`.** Committen und pushen ohne
  Feature- oder Session-Branch. Solo-Workflow ohne Code-Review, die
  Kontrollpunkte (siehe *Kontrollpunkt-Prinzip*) übernehmen die Freigabe vor
  jedem Push. Ein Branch, der nie gemerged wird, führt dazu, dass `main` und
  damit die Live-Domain nur das Grundgerüst zeigt statt der echten Demo.

  **Diese Regel hat Vorrang, auch wenn die Session etwas anderes vorgibt.**
  Claude Code setzt beim Start oft einen eigenen Branch (`claude/...`) und
  verlangt, dort zu entwickeln. In diesem Repo gilt trotzdem `main`. Der Grund
  ist nicht Bequemlichkeit: Die Demo wird über die Vercel-Domain gezeigt, und
  Vercel deployed `main`. Arbeit auf einem Branch ist für den Kunden unsichtbar.

  **Und es wird nicht nachgefragt.** Nicht am Sessionstart, nicht vor dem ersten
  Push, nicht als Hinweis am Rand. Die Entscheidung ist hier getroffen; sie
  jedes Mal neu zu stellen kostet Bruno eine Antwort für ein Ergebnis, das
  ohnehin feststeht. Steht die Session beim Start auf einem anderen Branch:
  **kommentarlos auf `main` wechseln** (`git checkout main`) und dort
  weiterarbeiten. Liegen auf dem Branch bereits Commits, werden sie nach `main`
  übernommen und das im Commit vermerkt.

  Einzige Ausnahme: Bruno verlangt in dieser Session ausdrücklich einen Branch.
- **Repo-Struktur: die Website liegt in `site/`, alles andere nicht.**

  ```
  demo-repo/
  ├── site/           ← die Website. NUR dieser Ordner geht live.
  │   ├── index.html
  │   ├── css/  js/  assets/
  ├── CLAUDE.md       ← Steuerung für Claude, über keine URL erreichbar
  ├── docs/  .claude/  scripts/
  ```

  Diese Trennung ist strukturell, nicht konfiguriert, und genau das ist der
  Punkt: In Vercel steht **Root Directory = `site`**, und bei einer statischen
  Seite liefert Vercel ausschließlich den Inhalt dieses Verzeichnisses aus.
  Was außerhalb liegt, ist über keine URL erreichbar, auch nicht über einen
  geratenen Pfad.

  Der frühere Weg (`.vercelignore` bei Root Directory = Repo-Root) war dafür zu
  schwach: `.vercelignore` ist in erster Linie ein Mechanismus der Vercel-CLI,
  seine Wirkung bei Git-Deployments ist nicht verlässlich dokumentiert. Auf der
  Demo-Domain läge damit im Zweifel das komplette Playbook: Agenten,
  Branchenrecherche, Verkaufslogik. Die Datei bleibt als zweite Sicherung
  liegen, tragend ist das Root Directory.

  Nebeneffekt, der sich lohnt: Alles, was beim Bauen entsteht, aber nicht
  ausgeliefert werden soll (Hero-Varianten, Testseiten, Messläufe), gehört
  außerhalb von `site/` und ist damit automatisch nicht öffentlich.

  **Wird das Root Directory vergessen, ist die Seite kaputt statt undicht:**
  Vercel findet im Repo-Root keine `index.html`. Ein Fehler, der sofort
  auffällt, ist einem still leckenden Deployment vorzuziehen.

- **Deploy:** GitHub → Vercel, **einmal pro Demo-Repo von Hand verknüpft.**
  Das ist kein Rückschritt, sondern die ehrlichere Rechnung: Eine
  Automatisierung über GitHub Actions bräuchte in jedem neuen Repo ein eigenes
  `VERCEL_TOKEN`, weil GitHub Organisations-Secrets auf dem Free-Plan nicht für
  private Repos zulässt und „Use this template" Secrets ohnehin nicht
  mitkopiert. Ein Secret zu setzen kostet denselben Handgriff wie das Projekt
  zu importieren. Die Automatisierung hätte also nichts gespart und dafür ein
  Token in jedem Repo hinterlegt. Claude kann das nicht übernehmen: Das
  Vercel-Konto gehört Bruno, Claude hat dort keinen Zugriff und darf laut §4
  auch kein Token sehen.

  **Nach jedem „Use this template":**
  1. Vercel → Add New → Project → das neue Repo importieren
  2. **Root Directory auf `site` setzen.** Der entscheidende Schritt
  3. Framework Preset „Other", kein Build-Command, kein Output-Verzeichnis
  4. Deploy. Jeder weitere Push nach `main` deployed danach von selbst

  **Einmalig, nicht pro Repo:** Die Vercel-GitHub-App muss **für die
  Organisation `Autolution-ai` installiert** sein, nicht nur für den
  persönlichen Account. Das sind getrennte Installationen
  (`github.com/settings/installations`). Fehlt sie dort, taucht kein einziges
  Demo-Repo in Vercel auf und der Import schlägt ohne brauchbare Meldung fehl.
  Einstellung auf **„All repositories"**, sonst ist jedes neue Repo einzeln
  freizugeben.

  **Es sind zwei Organisationen, und das ist Absicht:** Die Demos liegen unter
  **`Autolution-ai`** (`Autolution-ai/demo-template`, `Autolution-ai/<kunde>`),
  die Live-Projekte unter **`Autolution`** (`Autolution/Live-Template`,
  `Autolution/<kunde>-Live`). Wer die beiden verwechselt, bekommt beim
  `add_repo` eine Fehlermeldung über „cross-tier", und in Vercel fehlt die
  Hälfte der Projekte. Die Vercel-App braucht die Installation deshalb in
  **beiden** Organisationen, je einmal.

  **Prüfschritt nach dem ersten Deploy** (steht auch in `docs/CHECKLISTE.md`):
  `<demo>.vercel.app/CLAUDE.md` aufrufen. Es muss 404 kommen.

  **Die Demo ist für Google gesperrt.** `site/vercel.json` setzt den Header
  `X-Robots-Tag: noindex, nofollow` auf jede Antwort. Grund: Die
  `.vercel.app`-Adresse ist sonst indexierbar, und eine Demo mit
  Platzhaltern und Hinweiskästen darf nicht unter dem Namen des Kunden bei
  Google auftauchen, bevor er unterschrieben hat. Der Header ist unsichtbar,
  ändert an der Demo nichts und wird erst im Live-Template (Cutover) entfernt.
  Prüfung: `curl -I https://<demo>.vercel.app` zeigt die Zeile.

**Bild-, Logo- & Design-Assets (Higgsfield MCP):**
Für alles Visuelle, das nicht Code ist, wird der Higgsfield-MCP genutzt:
- Logo aufwerten / hochskalieren (upscale)
- Logo freistellen / Hintergrund entfernen (für sauberen Einbau in Header/Footer)
- Bilder generieren (Hero-Motive, Hintergründe, wo keine echten Kundenbilder da sind)
- 3D-Assets / Motive generieren, falls für den Look sinnvoll
Wichtig: Higgsfield erzeugt visuelle Assets (Bilder, Logo, Motive). Die
Interaktion/Bewegung auf der Seite selbst kommt aus den Code-Libraries oben
(GSAP, Lenis etc.) – beides nicht verwechseln.

**Bilder vom Kunden holen (Apify):**
Der Scrape der bestehenden Website läuft über den Apify-MCP.

**Die alte Website ist nicht die einzige Bildquelle – oft die schwächste.**
Bei Handwerksbetrieben liegt das bessere Material regelmäßig im Google-Eintrag
(aktuellere Fotos) und auf Instagram (Projekt- und Baustellenfotos). Wer nur
die Website ansieht, baut die Demo auf Platzhaltern, obwohl Material da ist.
Deshalb klopft Phase 1 alle Quellen ab, **bevor** das Konzept steht
(Asset-Inventar vor Konzept, siehe §6):

| Quelle | Actor |
|---|---|
| Google-Eintrag: Fotos, verlinkte Profile | `compass/crawler-google-places` |
| Instagram-Beiträge | `apify/instagram-scraper` |
| Bilddateien herunterladen | `onescales/bulk-image-downloader` |

**Zwei Regeln, die dabei nicht verhandelbar sind:**

- **URLs werden kopiert, nie konstruiert** (§3). Eine Instagram-Adresse aus dem
  Firmennamen zu basteln führt im schlimmsten Fall zu einem fremden Betrieb,
  dessen Fotos dann in der Demo landen – der Inhaber sieht das sofort.
- **Ein Google-Eintrag gilt erst als der richtige, wenn mindestens zwei
  belegte Merkmale übereinstimmen** (Website-URL, Telefon, Adresse). Ein
  Namenstreffer allein reicht nicht, „Elektro Müller" gibt es in jeder zweiten
  Stadt. Ist er so zugeordnet **und verifiziert**, liefert er mehr als Fotos:
  **echte Öffnungszeiten und die echte Bewertung gehören auf die Demo.** Sie
  sind starke lokale Signale, und der Inhaber erkennt seine eigenen Daten
  wieder. Die Öffnungszeiten dürfen dann auch ins JSON-LD; die Bewertung
  ausschließlich sichtbar im Inhalt mit Quellenangabe und `sameAs` auf das
  Profil, nie als eigenes `aggregateRating` (Skill `seo-basis`). Nicht
  verifiziert oder nicht eindeutig: Hinweiskasten statt Zahl. `scrapeImageAuthors: true` trennt zusätzlich Fotos des Betriebs von
  Fotos fremder Google-Nutzer – letztere sind für die Demo vertretbar, vor dem
  Live-Gang aber zu klären.

Werden konkrete Bilddateien gebraucht und nicht nur URLs, wird der Actor
**`onescales/bulk-image-downloader`** genutzt. Er lädt die Bilder einer oder
mehrerer Seiten als Dateien (`startUrls`, `resultsType: "zip"`, bei Bedarf
`includeSrcset: "yes"` für responsive Varianten).

Grund: Hotlinks auf fremde CDNs laufen ab – Instagram-URLs zum Beispiel nach
wenigen Tagen – und eine Demo, die im Sales-Termin Platzhalter statt Bilder
zeigt, ist wertlos. Kundenbilder gehören als Datei unter `site/assets/images/`.

## 6. Recherche-Grundlagen – vor dem ersten Konzept

Drei Dinge stehen fest, bevor gestaltet oder getextet wird. Fehlt eines davon,
wird nachgefragt statt angenommen.

**CI ist Fundstück, nicht Erfindung.**
Farben, Schriften und Logo werden immer aus echtem Kundenmaterial abgeleitet
(Logo, bestehende Website, Social-Profile, Drucksachen). Eine erfundene Palette
ist der schnellste Weg zum generischen KI-Look, auch wenn sie für sich genommen
schön ist. Liegt kein Material vor: bei mir anfragen, bevor irgendetwas gestaltet
wird. Nicht raten, nicht "passend wählen".

**Asset-Inventar vor Konzept.**
Bevor ein Hero, eine Sektion oder eine Animation konzipiert wird, steht fest,
welche Assets es tatsächlich gibt: Videos, Fotos, Logo (in welcher Auflösung),
Kundenlogos, Referenzmaterial. Ein Konzept, das ein Asset voraussetzt, das
niemand hat, ist verschwendete Arbeit. Jeder Konzeptvorschlag nennt seinen
Asset-Bedarf und ob er gedeckt ist. Wo ein Asset fehlt, aber vorgesehen ist:
Struktur bauen, die auch ohne funktioniert (Standbild trägt, Video blendet sich
ein, sobald die Datei da ist), und den fehlenden Pfad im Hinweiskasten nennen.

**Perspektive & Person.**
Vor der ersten Zeile Copy steht fest:
- **Perspektive:** ich / wir / dritte Person. Bei Einzelunternehmern und
  Personenmarken ist "ich" die Voreinstellung.
- **Persönlichkeitsprofil des Ansprechpartners:** Wie redet die Person, was
  treibt sie, wie sieht sie sich selbst? Das steuert Ton und Hero-Konzept. Steht
  es nicht im Briefing, wird danach gefragt.

Ausgenommen von der gewählten Perspektive bleiben Quellenangaben unter Zitaten,
Rollen-Credits und interne Hinweiskästen – dort ist die dritte Person richtig.

## 7. Design-Qualität & Anti-AI-Slop

Der Output soll aussehen wie von einem professionellen Design-Team, nie wie
generischer AI-Output. Design ist immer projektspezifisch – kein Einheitslook.

**Anti-Slop bei Text (streng):**
- Keine Gedankenstriche als Stilmittel (—).
- Keine Aneinanderreihung extrem kurzer Stakkato-Sätze.
- Keine typischen AI-Floskeln ("In der heutigen schnelllebigen Welt", "Es ist
  wichtig zu beachten", "Tauchen Sie ein", "Heben Sie sich ab", "Das gewisse
  Etwas", leere Superlative).
- Kein aufgeblähtes Füllmaterial. Jeder Satz muss etwas leisten.
- Menschlich, konkret, natürlich schreiben – Ton an Kunde & Branche angepasst.

**Anti-Slop bei Design:**
- **Nicht alles in gleichförmige Boxen/Karten packen.** Der typische
  AI-Look ist ein uniformes 2×3- oder 3×3-Kachelraster (Icon + Überschrift +
  drei Zeilen Text, x-mal identisch). Das vermeiden. Stattdessen: Inhalte
  unterschiedlich gewichten, Layout-Rhythmus variieren, Weißraum nutzen,
  echte Hierarchie schaffen. Karten nur wo sie inhaltlich Sinn ergeben.
- **Höchstens zwei Dreiergruppen pro Seite.** Drei Kennzahlen, drei Benefits,
  drei Werte, drei Fragen: einzeln unauffällig, in Summe genau der Rhythmus, an
  dem man KI-Layout erkennt. Der Rest bekommt 2, 4 oder 5 Elemente. Und niemals
  ankündigen ("Drei Dinge sind uns wichtig") – das macht die erzwungene Struktur
  explizit sichtbar.
- **Die Fläche nutzen – ab der ersten Version, nicht als Nachbesserung.** Der
  häufigste Kritikpunkt an bisherigen Demos: "Der linke und rechte Rand wird
  überhaupt nicht genutzt." Dafür gibt es das `.layout`-Raster in
  `site/css/styles.css` mit drei Breiten: Text bleibt auf lesbarer Breite (`ch`),
  `.breakout` für Bildreihen, Karten und Galerien, `.full` randlos über die
  ganze Fensterbreite. Pflicht je Seite: **mindestens ein randloses Element**,
  und **kein Abschnitt mit Bildern, Karten oder Galerien, der auf 1920 px mehr
  als etwa 200 px je Seite ungenutzt lässt.** Ein Abschnitt aus reinem
  Fließtext bleibt auf Lesebreite – das sind auf 1920 px zwangsläufig rund
  570 px je Seite, und das ist richtig so. Die Fläche nutzt die Seite mit dem,
  was nicht Fließtext ist. Eine Seite, auf der **jeder** Abschnitt auf
  Textbreite steht, ist der Fehler.
  Gemessen mit `node scripts/layout-check.mjs site/<datei>.html`. Desktop und Mobil entstehen parallel, nicht nacheinander – "alles
  nochmal desktop optimieren" war schon eine komplette Korrekturrunde.
- **Keine toten Flächen.** Zweispaltige Abschnitte mit `align-items: center` als
  Standard; `start` nur, wenn beide Spalten etwa gleich hoch sind. Zwischen
  Sektionen polstert nur **ein** Element, nicht beide (sonst addieren sich die
  Abstände zu einem Loch).
- **Hover ist Pflicht** auf allem Anklickbaren und auf Inhaltskacheln. Ohne
  Feedback wirken Textkacheln tot ("statisch, weichgewaschen").
- **Keine selbstgebauten Grafiken als Ersatz für echte Inhalte.** Eine gezeichnete
  Karte oder ein Icon statt eines Fotos wirkt immer wie ein Platzhalter. Lieber
  ein ehrlich gekennzeichneter Bildplatz.
- **Referenzen werden auf drei Ebenen analysiert, nicht auf einer:** Aufbau
  (welche Sektionen in welcher Reihenfolge), Gestaltung (Typo, Farbe, Weißraum)
  und **Bewegung** (was passiert beim Scrollen, was ist gepinnt, was läuft mit).
  Wer nur den Aufbau übernimmt, liefert eine statische Kopie und bekommt sie zurück.
- Kein Purple-Gradient als Default.
- Kein generisches Hero mit rundem Avatar.
- Keine nummerierten Schritte (01/02/03) ohne echten sequenziellen Grund.
- Typografie bewusst einsetzen. oklch für harmonische Farbpaletten bevorzugen.

## 8. Text & Copy – Prinzip

Jeglicher Website-Text wird über den Skill `website-copy` erstellt. Der Skill
vereint drei Ziele gleichzeitig: Verkaufspsychologie, SEO-Struktur und
menschlicher, slop-freier Stil. Rohtext vom Kunden (aus dem Scrape) wird nie
1:1 übernommen, sondern neu und besser formuliert.

**Tonalität: selbstbewusst über Fakten, niemals über Pose.**
Die Demo klingt nach dem Kunden, nicht nach einem Marktführer, der sich seine
Kunden aussucht. Jede Formulierung, die andere kleiner macht oder den Leser zum
Bittsteller, fliegt raus. Verboten sind Ablehnungs-Rhetorik ("wir nehmen nicht
jeden Auftrag"), Vergleiche mit Wettbewerbern ("viele Betriebe reden von…"),
Türsteher-Formulierungen ("ob Sie zu uns passen") und Superlative ohne Beleg.

**Der Inhaber-Test entscheidet jeden Satz:**
> Würde der Geschäftsführer diesen Satz einem Kunden oder Bewerber **laut ins
> Gesicht sagen**, ohne dass es ihm unangenehm ist? Wenn nein: raus.

Die konkreten Muster, die Umkehrformel (Prahlerei → Kundennutzen) und die
Ein-Nennung-Regel stehen im Skill `website-copy`.

## 9. Conversion & Funnel

- **Jede Leistung endet mit einer Handlungsaufforderung**, nicht mit einem
  Preishinweis oder einem Vertröstungssatz ("Preis im Vorgespräch").
- **Ein CTA führt direkt ans Ziel**, nie auf eine Zwischenseite, wo dieselbe
  Auswahl noch einmal getroffen werden muss.
- **Ein Formular muss als Formular erkennbar sein** – gerahmt, mit sichtbaren
  Bedienelementen und beschrifteten Feldern.
- **Das Hauptziel bekommt Dominanz in der Fläche, kein Monopol auf jeden Button.**
  Ist es bereits durch einen dauerhaften Header-CTA und einen eigenen Abschnitt
  abgedeckt, gehört der primäre Hero-CTA der **zweiten** Zielgruppe – sonst hat
  sie keinen Einstieg.
- **Zwei Zielgruppen werden getrennt angesprochen, nicht verschachtelt.** Zwei
  klare Sätze schlagen einen Satz mit "trotzdem" oder "und außerdem".

Aufbau, Fragenzahl und Formular-Standard: `docs/FUNNEL.md`.

## 10. Kontrollpunkt-Prinzip

Zwei Arten von Kontrolle, die zusammenspielen:

1. **Automatische QA (Review-Agent):** Der Subagent `qa-reviewer` prüft an
   festen Stellen selbstständig gegen klare Kriterien (Anti-Slop, Struktur,
   Verkaufslogik, SEO, Vollständigkeit) und meldet Befunde. Das ist das Ziel:
   ein System, das selbst weiß, was gut und was schlecht ist, und Fehler
   findet, bevor ich sie sehe.

2. **Manuelle Freigabe (ich):** An den Phasengrenzen zeige ich kurz den Stand
   und warte auf mein OK, bevor es weitergeht.

Entwicklungsrichtung: Anfangs mehr manuelle Freigaben (bis das System kalibriert
ist). Mit der Zeit übernimmt der `qa-reviewer` mehr, und meine manuellen Checks
werden seltener – bis ich am Ende idealerweise nur noch das fertige Ergebnis
abnehme. Nie ungefragt die ganze Demo ohne jeden Kontrollpunkt durchbauen.

**Kein Bugfix ohne reproduzierten Messwert.** Wenn ein Fehler nach dem zweiten
Fixversuch besteht, ist die Diagnose falsch, nicht der Fix. Dann wird gemessen,
nicht weiter geraten (ein `getBoundingClientRect()` schlägt jede Vermutung).

## 11. Recht & Demo-Hinweise

**Rechtstexte (Demo-Stand):** Footer enthält immer Links zu Impressum &
Datenschutz, aber mit leerem Platzhalter-Inhalt (z.B. "Wird im Rahmen der
Zusammenarbeit eingerichtet"). Kein Aufwand/Tokens für echte Rechtstexte in der
Demo-Phase.

**Demo-Hinweise (Platzhalter-Standard):** Alles, was noch nicht belegt ist,
bekommt einen sichtbaren Hinweis. Drei Anforderungen:
1. **Sichtbar im Design**, nicht als HTML-Kommentar.
2. **Beim betroffenen Inhalt, direkt darüber.** Nicht darunter – wer den Hinweis
   erst nach dem Lesen sieht, hat den Inhalt bereits für echt gehalten. Und
   **nicht als globales Band über der ganzen Seite**: Das verschiebt das Layout
   und beschädigt den Gesamteindruck.
3. **Ehrlich über die eigene Herkunft.** Der Hinweis sagt, woher der Entwurf
   stammt und was final dort steht. Er behauptet nie eine Quelle, die es nicht
   gibt ("aus unseren Gesprächen", wenn es keine Gespräche gab).

Richtig gesetzt ist der Hinweis ein Verkaufsargument, kein Makel: Er macht den
nächsten Termin zum Arbeitsgespräch ("Hier stehen später Ihre eigenen Worte,
lassen Sie uns die aufnehmen"). Formulierung von Lücken als Erklärung, nicht als
Zusage: nicht "folgt in Kürze", sondern "Demo-Stand: Im Projekt entsteht dafür X".

## 12. Die Bausteine dieses Repos

- `docs/WORKFLOW.md` – der Schritt-für-Schritt-Ablauf (Phase 0–5, Kontrollpunkte)
- `docs/DEMO-SPEC.md` – Vorlage: die verbindliche Spec dieser Demo (Phase 0).
  Hauptziel, Perspektive, Asset-Inventar, offene Punkte. Wird später gegengeprüft
- `docs/DOSSIER.md` – Vorlage: das Strategie-Dossier (Phase 1b). Was ist
  einzigartig, was hervorheben, was berücksichtigen, was ausnutzen. Grundlage
  für Hero, Struktur und Copy
- `docs/FUNNEL.md` – Aufbau und Regeln für Anfrage-/Bewerbungs-Funnel
- `docs/LIBRARIES.md` – Animations-Libraries: wann was, mit Einbindung
- `docs/CHECKLISTE.md` – finale Pre-Deploy-Kontrolle (messbare Punkte)
- `docs/SEO-NOTIZEN.md` – Vorlage: vermutete Keywords je Sektion (Phase 3)
- `docs/CHANGELOG.md` – was sich am Template geändert hat und **warum**
- `docs/LERNSCHLEIFE.md` – wie aus jeder fertigen Demo eine Rückmeldung wird,
  aus Rückmeldungen Muster und aus Mustern Messpunkte im Template
- `docs/PRAEFERENZEN.md` – was Bruno wiederholt korrigiert hat. Kalibrierung
  des `visual-critic`, entsteht aus den Rückmeldungen, nicht von Hand
- `TEMPLATE-VERSION` – Stand des Templates, aus dem diese Demo entstand
- `DEMO-TEMPLATE-SYNC` – der Demo-Stand, auf den das `Live-Template`
  zuletzt angeglichen wurde. Beide Repos führen die Datei mit demselben
  Wert; sie erklärt sich in ihren eigenen Kommentarzeilen
- `site/` – **die Website selbst. Nur dieser Ordner wird deployed**
  (Root Directory in Vercel). Alles andere in diesem Repo ist Steuerung und
  bleibt über jede URL unerreichbar
- `.claude/commands/demo.md` – Slash-Command, startet den Ablauf
- Nach Vertragsabschluss: `Autolution/Live-Template`, Übergang per
  `scripts/live-start.mjs` von dort (siehe `docs/WORKFLOW.md`, letzter Abschnitt)
- `.claude/commands/branche.md` – Slash-Command, erhebt ein Gewerk einmalig
- `.claude/commands/closing.md` – Slash-Command, erzeugt nach der Freigabe
  parallel zwei Dokumente (Phase 6): die **Rückmeldung** für die Lernschleife
  und das **Vertriebs-Briefing** für den Closing-Call
- `.claude/commands/auswerten.md` – Slash-Command, wertet gesammelte
  Rückmeldungen aus und macht daraus Messpunkte im Template
- `.claude/commands/hero-neu.md` – Slash-Command, überarbeitet den Hero einer
  **bestehenden** Demo aus einem älteren Template-Stand (rüstet die Bausteine
  vorher nach). Die ausdrückliche Ausnahme zur Regel „eine laufende Demo zieht
  nie nach" – fasst nur den Hero an
- `scripts/hero-check.mjs` – misst Hero-Varianten (Höhe, Flächennutzung,
  Kontrast, Typo-Spannweite, Weißschleier) und macht Screenshots
- `scripts/copy-check.mjs` – misst Text und Dokumentstruktur einer Seite
  (Ansprache-Verhältnis, Gedankenstriche, Dreiergruppen, AI-Floskeln, H1,
  Alt-Texte, Meta) und prüft gegen die Verbotsliste des Gewerks
- `scripts/layout-check.mjs` – misst das gerenderte Layout auf sechs Breiten
  (Flächennutzung, Rhythmus, Kontrast, Schriftgröße, Touch-Ziele, Zustände)
- `scripts/branchen-check.mjs` – rechnet die Zählungen der Branchendateien
  gegen ihre Quellen nach
- `scripts/feedback-auswerten.mjs` – zählt die Befunde aus den gesammelten
  Rückmeldungen und findet Muster ab zwei Demos
- `scripts/beleg-check.mjs` – hält jede Zahl und jede URL der gebauten Seite
  gegen `quellen/`, gleicht angekündigte Fragen- und Schrittzahlen gegen das
  eigene Markup ab und findet Platzhalterreste. Das Gate zu §3
- `scripts/skill-check.mjs` – meldet jeden Skill, der im Repo liegt, aber
  nirgends beim Namen aufgerufen wird, und jeden Namen, der als Skill
  aufgerufen wird, ohne zu existieren
- `.claude/agents/` – spezialisierte Subagenten (Briefing, Analyse, Struktur,
  Hero, Copy, QA). Der Hero hat zwei: `hero-specialist` baut, `hero-critic`
  urteilt unabhängig. Zum Closing ebenfalls zwei: `feedback-analyst` sucht
  Fehler nach innen, `vertriebs-briefing` Stärken nach außen. Nach dem Bau
  sieht sich `visual-critic` die gerenderte Seite an – er findet, wofür es
  keinen Messwert gibt
- `.claude/skills/` – wiederverwendbare Fähigkeiten (website-copy, anti-slop,
  motion-toolkit, hero-craft, section-craft, design-system, seo-basis,
  branchen-wissen). Dazu `ui-ux-pro-max` von Next Level Builder (MIT, als Datei
  im Repo, nicht als Plugin): durchsuchbare Datenbank zu Barrierefreiheit,
  Touch-Zielen, Formular- und Navigationsmustern, Motion-Timing und
  Font-Pairing. **Bei jedem Widerspruch gewinnt diese Datei** – der Skill kennt
  weder unsere Vanilla-CSS-Regel noch die Belegpflicht. Die vier bekannten
  Konfliktpunkte stehen im Kopf seiner `SKILL.md`
- `schema-markup` von SearchFit.ai (MIT, als Datei im Repo) plus die Commands
  `/generate-schema` und `/seo-check`. Erzeugt und prüft JSON-LD. **Auch hier
  gewinnt §3:** Strukturierte Daten sehen nach Technik aus, sind aber
  Tatsachenbehauptungen über den Betrieb. `aggregateRating`, `review`,
  `openingHours` und `priceRange` sind gesperrt, solange unbelegt –
  `scripts/copy-check.mjs` bricht dann ab. Vom übrigen SearchFit-Paket ist
  bewusst nichts übernommen: Die Audit-Skills brauchen `WebFetch` auf fremde
  Domains, und die sperrt der Egress-Proxy (geprüft 16.09.2026)

**Ein Skill im Repo ist keine Garantie, dass er benutzt wird.** Er springt über
seine Beschreibung an, und das ist bei englischer Beschreibung in deutscher
Arbeit unzuverlässig. Fünf Skills lagen deshalb monatelang tot im Repo. Wer
einen Skill ergänzt, **verdrahtet ihn im selben Zug**: Aufruf beim Namen in
`docs/WORKFLOW.md`, im passenden Command und im Agenten, der ihn braucht.
Geprüft mit `node scripts/skill-check.mjs`.

**Änderungen am Template werden versioniert.** Wer hier eine Regel ergänzt oder
streicht, zählt `TEMPLATE-VERSION` hoch und schreibt einen Eintrag in
`docs/CHANGELOG.md` – mit dem **Anlass**, nicht nur der Beschreibung. Eine
Regel, deren Anlass niemand mehr kennt, wird beim nächsten Aufräumen als
unnötig streng entfernt, und der Fehler kommt zurück.

**Und damit ist das `Live-Template` hinterher.** Sobald `TEMPLATE-VERSION` über
dem Wert in `DEMO-TEMPLATE-SYNC` steht, kennt das Live-Template die neuen
geteilten Bausteine nicht: `.claude/skills`, `.claude/agents`,
`.claude/commands` und `scripts/` gehören beiden Repos. Betrifft die Änderung
nur die Demo-Phase (ein Agent wie `site-analyst`, ein Command wie `/closing`),
ist das in Ordnung und bleibt so. Betrifft sie einen geteilten Baustein, gehört
sie ins Live-Template nachgezogen, und danach wird `DEMO-TEMPLATE-SYNC` **in
beiden Repos** auf den neuen Stand gesetzt.

**Auch wenn nichts zu kopieren war, wird der Wert mitgezogen.** Er sagt nicht
„zuletzt kopiert", sondern „zuletzt geprüft". Bliebe er bei reinen
Demo-Änderungen stehen, meldete `/closing` eine Lücke, die es nicht gibt – und
ein Hinweis, der oft grundlos kommt, wird beim dritten Mal überlesen.

Vergessen ist nicht schlimm, aber es kostet Zeit an der teuersten Stelle:
`scripts/live-start.mjs` meldet beim Übergang jede Abweichung – mitten im
Projektstart, statt jetzt. Ein Baustein, den nur das Demo-Repo kennt, wird dort
behalten; einer, der in beiden liegt und abweicht, wird gesichert und gemeldet.
Verloren geht nichts, aber jemand muss es dann durchsehen.

Eine laufende Demo zieht nie automatisch nach: Ein Template-Update gilt ab der
nächsten Demo.
