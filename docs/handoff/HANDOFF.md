# HANDOFF — Autolution Demo-Template

**Erstellt:** 2026-09-14 10:30
**Session-Nr.:** 1 (sehr lang, mehrere Compactions überstanden)
**Auslöser:** manuell über `/context-handoff`

---

## 1. KURZFASSUNG (30 Sekunden)

`Autolution/demo-template` ist ein privates GitHub-**Template-Repo**, aus dem
Bruno per „Use this template" pro Kunde eine Demo-Website erzeugt. Diese
Session hat das Template von einem reinen Regelwerk zu einem **messenden und
selbstlernenden System** ausgebaut: fünf Mess-Skripte, elf Subagenten, fünf
Slash-Commands, eine Branchen-Knowledge-Base mit sechs Gewerken, und zuletzt
eine **Lernschleife**, die aus jeder fertigen Demo automatisch eine Rückmeldung
erzeugt und daraus Messpunkte ableitet.

**Stand:** `TEMPLATE-VERSION 2026.09.21`, alles committet und gepusht, Arbeits-
verzeichnis sauber. **Unmittelbar nächster Schritt:** Bruno testet `/closing`
an einer echten Demo, die er heute fertigstellt. Aus dem Ergebnis wird die
Kalibrierung des neuen `visual-critic` gespeist.

---

## 2. PROJEKT-KONTEXT

**Übergeordnetes Ziel:**
Ein Template, aus dem Demo-Websites für Handwerksbetriebe entstehen, die im
Sales-Call gezeigt werden. Die Demo muss **besser sein als die bestehende
Website des Kunden** – in Struktur, Text und Wirkung, nicht nur optisch.
Langfristiges Ziel: Ein Agentensystem, das selbst weiß, was gut ist, und Fehler
findet, bevor Bruno sie sieht. Seine manuellen Kontrollen sollen über die Zeit
seltener werden.

**Session-Ziel (verschoben sich mehrfach, in dieser Reihenfolge):**
1. Branchendateien attribuieren und einen Prüfer dafür bauen
2. Fünf Verbesserungen umsetzen (Versionierung, section-craft, design-system,
   seo-basis, Mess-Skripte)
3. Vercel-Deploy automatisieren → **gescheitert, siehe Abschnitt 7**
4. GitHub-Organisation einrichten → durchgeführt, mit Folgeproblemen
5. Lernschleife konzipieren und bauen
6. Vertriebs-Briefing ergänzen
7. Bildquellen erweitern, `visual-critic` bauen

**Auftraggeber:** Bruno (Einzelunternehmer, Autolution). Arbeitet mit einem
Vertriebler, der die Demos im Closing-Call zeigt.

---

## 3. TOOL-STACK & UMGEBUNG

| Kategorie | Konkret | Begründung |
|---|---|---|
| Frontend | HTML5, Vanilla CSS (Custom Properties), Vanilla JS | Kein Framework für Demos – bewusst, §5 CLAUDE.md |
| CSS-Architektur | `site/css/tokens.css`, `base.css`, `styles.css`, `fonts.css` | Tokens = Rollen, keine Farbnamen |
| Animation | CSS → Lenis → GSAP/ScrollTrigger → Anime.js → Three.js | „Leichtestes Werkzeug zuerst" |
| Libraries | **lokal** unter `site/assets/js/`, **nie CDN** | Egress-Proxy blockiert cdnjs, jsdelivr, Google Fonts |
| Hosting | Vercel, Git-Integration, **Root Directory = `site`** | Strukturelle Trennung statt `.vercelignore` |
| Scraping | Apify MCP | |
| Bilder/Logo | Higgsfield MCP | |
| Test/Messung | Playwright + Chromium, **lokal, keine externen Kosten** | |
| Node | v22, Playwright unter `/opt/node22/lib/node_modules/playwright` | global, **kein `package.json` im Repo** (bewusst, s. Entscheidung 4) |

**Apify-Actors (verifiziert, nicht geraten):**
- `compass/crawler-google-places` — Google-Eintrag, Fotos, verlinkte Profile.
  Wichtige Felder: `searchStringsArray`, `locationQuery`, `searchMatching`,
  `startUrls`, `placeIds`, `maxImages`, `scrapeImageAuthors`,
  `scrapePlaceDetailPage`, `scrapeSocialMediaProfiles`
- `apify/instagram-scraper` — `directUrls`, `resultsType`, `resultsLimit`
- `onescales/bulk-image-downloader` — `startUrls`, `resultsType: "zip"`,
  `includeSrcset: "yes"`

**Befehle, die tatsächlich funktioniert haben:**
```bash
node scripts/branchen-check.mjs                          # alle Branchendateien
node scripts/copy-check.mjs --gewerk maler site/index.html
node scripts/layout-check.mjs site/index.html            # erzeugt Screenshots
node scripts/hero-check.mjs --selector "#hero" site/index.html
node scripts/feedback-auswerten.mjs .closing/
git push -u origin main
```

**Umgebungsvariablen (Namen, keine Werte):**
- `VERCEL_TOKEN` — war für die verworfene GitHub-Action gedacht, **wird nicht
  mehr gebraucht** (Deploy ist manuell)
- `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` — vorgegeben von der Umgebung

**Chat-Transkript (maschinell lesbar, verifiziert):**
`/root/.claude/projects/-home-user-demo-template/bc3915b2-d1b2-5a5e-a843-84cf5a51b275.jsonl`
2760 Zeilen, JSON-Lines mit `type`, `timestamp`, `message.content`.
Grundlage für den `feedback-analyst`.

---

## 4. KONZEPTION / ARCHITEKTUR

```
demo-repo (aus Template erzeugt)
├── site/                 ← NUR das geht live (Vercel Root Directory = site)
│   ├── index.html  css/  js/  assets/  vercel.json (noindex-Header)
├── CLAUDE.md             ← Verfassung, 12 Abschnitte
├── docs/                 ← Vorlagen + Wissen, nie deployed
├── .claude/agents/       ← 11 Subagenten
├── .claude/skills/       ← 8 eigene + 5 GSAP
├── scripts/              ← 5 Mess-Skripte
└── .closing/ .visual-check/ .demo-messung/   ← gitignoriert
```

**Ablauf einer Demo (docs/WORKFLOW.md):**

```
Phase 0  Briefing        brief-analyst        → docs/DEMO-SPEC.md      🛑
Phase 1  Scrape          site-analyst         → CI, Logo, Bildquellen  🛑
Phase 1b Synthese        site-analyst         → docs/DOSSIER.md        🛑
Phase 2a Struktur        structure-architect  → Rhythmusplan           🛑
Phase 2b Hero            hero-specialist → hero-critic (2 Varianten)   🛑
Phase 2c Design          + design-system      → tokens.css gefüllt     🛑
Phase 3  Copy            copywriter           → copy-check.mjs         🛑
Phase 4  Bau             Haupt-Agent          → layout-check.mjs
Phase 4b Visuell         visual-critic        ← NEU, vor Brunos Blick
         + git tag demo-v1                    ← Marker für die Rückmeldung
Phase 5  QA              qa-reviewer, responsive-qa                    🛑
Phase 6  Closing         feedback-analyst ∥ vertriebs-briefing  → 2 Dateien
```

**Die Lernschleife (docs/LERNSCHLEIFE.md):**

```
Demo-Session:  Bruno korrigiert im Chat → sagt "closing-bereit" → /closing
               → zwei Dateien nach .closing/, per SendUserFile an Bruno
                  ├── …-rueckmeldung.md   (nach innen: was war falsch, warum)
                  └── …-vertrieb.md       (nach außen: Briefing fürs Closing)

Template-Session: Bruno gibt die Rückmeldungen → /auswerten
               → feedback-auswerten.mjs zählt Muster (ab 2 Demos)
               → je Ursache eine andere Lösungsart:
                  regel-ignoriert      → Gate im Skript (KEIN neuer Text)
                  regel-fehlt          → Regel + Messpunkt
                  information-fehlte   → Pflichtfrage Phase 0
                  geraten-statt-gefragt→ Abbruchbedingung
                  geschmack            → docs/PRAEFERENZEN.md
                                         = Kalibrierung des visual-critic
```

---

## 5. GETROFFENE ENTSCHEIDUNGEN

| # | Entscheidung | Begründung | Verworfene Alternative |
|---|---|---|---|
| 1 | Messen statt ermahnen | Beide Retros: Demos scheiterten an Regeln, die **längst im Template standen**. Mehr Prosa hilft nicht | Weitere Regeln in CLAUDE.md |
| 2 | Kein GitHub-Team-Plan | Kostenentscheidung Brunos | ~4 $/Nutzer/Monat für Org-Secrets |
| 3 | Vercel-Deploy **manuell** pro Repo | Automatisierung bräuchte in jedem Repo ein Token; „Use this template" kopiert Secrets nicht. Ein Secret setzen = derselbe Handgriff wie importieren | GitHub Action (gebaut, dann zurückgebaut) |
| 4 | Kein `package.json` im Repo | Vercel behandelt ein Repo mit `package.json` und ohne Build-Skript als Node-Projekt statt als statische Seite | `npm i -D playwright` als Abhängigkeit |
| 5 | Website nach `site/`, Root Directory = `site` | `.vercelignore` ist CLI-Mechanismus, Wirkung bei Git-Deploys nicht verlässlich dokumentiert. Strukturell statt konfiguriert | `.vercelignore` allein |
| 6 | Rückmeldungen **nie ins Repo** | „Use this template" kopiert alle Dateien – jeder neue Kunde bekäme die Kritik zu allen anderen Kunden | Eigenes Sammel-Repo (erst geplant, dann verworfen: löst dasselbe, kostet ein Repo mehr) |
| 7 | Zwei getrennte Agenten beim Closing | Das eine Dokument sucht Fehler, das andere Stärken. Eine Rolle kann beides nicht ehrlich | Ein Agent für beides |
| 8 | `visual-critic` ändert nichts | Wer baut, kann nicht unbefangen urteilen (wie `hero-specialist`/`hero-critic`) | Agent, der direkt korrigiert |
| 9 | Kein Formular für Bruno | Sein manueller Beitrag ist das **Korrigieren der Demo**, nicht das Dokumentieren | Rückmeldungs-Formular zum Ausfüllen |
| 10 | Belegpflicht auch für Agenten-Output | Ein Agent, der eigene Arbeit bewertet, beschönigt. Wörtliche Zitate kann er nicht beschönigen | Freitext-Bewertung |

---

## 6. BEREITS ERLEDIGT

### Neue Dateien dieser Session

| Pfad | Was | Status |
|---|---|---|
| `scripts/branchen-check.mjs` | rechnet Zählungen der Branchendateien gegen Quellen | fertig, getestet |
| `scripts/copy-check.mjs` | Text + Dokumentstruktur, prüft gegen Gewerk-Verbotsliste | fertig, getestet |
| `scripts/layout-check.mjs` | Layout auf 6 Breiten + Screenshots (390/1440/1920) | fertig, getestet |
| `scripts/feedback-auswerten.mjs` | zählt Muster in Rückmeldungen ab 2 Demos | fertig, an 2 Beispieldateien getestet |
| `.claude/skills/section-craft/` | Muster-Typologie, Rhythmus, Streich-/Blätter-Test | fertig |
| `.claude/skills/design-system/` | oklch-Farbrollen, Typo-Spannweite, lokale Schriften | fertig |
| `.claude/skills/seo-basis/` | lokale Signale, JSON-LD, Open Graph, Grenzen | fertig |
| `.claude/agents/feedback-analyst.md` | erzeugt die Rückmeldung aus Chat + Diff | fertig, **ungetestet** |
| `.claude/agents/vertriebs-briefing.md` | Briefing für den Closing-Call | fertig, **ungetestet** |
| `.claude/agents/visual-critic.md` | beurteilt gerenderte Screenshots | fertig, **ungetestet** |
| `.claude/commands/closing.md` | startet beide Closing-Agenten parallel | fertig, **ungetestet** |
| `.claude/commands/auswerten.md` | Muster → Gates/Regeln/Präferenzen | fertig, **ungetestet** |
| `.claude/commands/hero-neu.md` | Hero einer Alt-Demo nachziehen | fertig, **ungetestet** |
| `docs/LERNSCHLEIFE.md` | Konzept der Schleife | fertig |
| `docs/PRAEFERENZEN.md` | Kalibrierung des visual-critic | **leer**, entsteht ab 2 Rückmeldungen |
| `docs/CHANGELOG.md` + `TEMPLATE-VERSION` | Versionierung mit Anlass | fertig, 12 Einträge |
| `.claude/skills/branchen-wissen/references/*.md` | 6 Gewerke, alle mit Q-Notation | fertig, 0 Fehler |

### Getestet & verifiziert

| Was | Wie | Ergebnis |
|---|---|---|
| `branchen-check.mjs` | 6 echte Dateien + Selbsttest mit 9 Fehlerarten | ✅ 0 Fehler, nur gewollte Warnungen |
| `copy-check.mjs` | kaputte Testseite vs. saubere | ✅ 15 Fehler / 0 Fehler |
| `layout-check.mjs` | Testseiten + echte `index.html` | ✅ findet Kontrast, Touch, Fläche |
| Touch-Ziel-Fix | Playwright-Messung | ✅ 19px → 44px, `summary` behält `list-item` |
| `feedback-auswerten.mjs` | 2 Beispiel-Rückmeldungen | ✅ beide Muster erkannt, fehlender Beleg gemeldet |
| oklch-Kontrast | Testseite mit Template-CSS | ✅ nach Fix korrekt |
| Transkript maschinell lesbar | Python-Parse, 2760 Zeilen | ✅ |

### Rund 40 falsche Zählungen in den Branchendateien korrigiert
Darunter: „Vorher/Nachher 0 von 8" (waren 2), „null von elf" bei Preisanker
(waren 2 von 12), Doppelzählung von Q5, „fachgerecht" 4→2.

---

## 7. NICHT FUNKTIONIERT / SACKGASSEN

> **Diese Ansätze NICHT erneut versuchen.**

| Ansatz | Warum gescheitert | Wortlaut |
|---|---|---|
| Vercel-Projekt per GitHub Action automatisch anlegen | Org-Secrets gehen auf dem Free-Plan nicht für private Repos; „Use this template" kopiert Secrets ohnehin nicht. Ein Secret setzen kostet denselben Handgriff wie der manuelle Import | „Organization secrets cannot be used by private repositories with your plan" |
| Personal-Account in Organisation **konvertieren** | GitHub bietet das nicht an | „Your personal account cannot be converted to an organization. You must create a new organization and transfer your repositories" |
| Nach dem Org-Umzug weiterarbeiten | Claude-GitHub-App war nur für den alten User-Account autorisiert, **alle 46 Repos auf einmal unerreichbar** | „Claude doesn't have GitHub access to Autolution-ai/demo-template for your organization" (403) / API: 404 |
| Google-Eintrag über `website`-Feld des Apify-Actors finden | `website` ist ein **Filter** (`withWebsite`/`withoutWebsite`), kein Suchfeld | – |
| `min-height: 44px` auf `<a>`/`<label>` | wirkt nicht auf originär inline-Elementen ohne Display-Wechsel. Regel stand da und tat nichts | gemessen: Telefon-Link 52×17px statt 44×44 |
| HTML-Kommentar als Platzhalter in `<title>` / `content=""` | wird dort **nicht** als Kommentar geparst, steht wörtlich im Browser-Tab und in der Teilen-Vorschau | – |
| `cssRules` verlinkter Stylesheets über `file://` lesen | Browser behandelt sie als fremde Herkunft und wirft. Betraf `hero-check` und `layout-check` – hätte bei **jeder** echten Demo „keine :hover-Regeln" gemeldet | – |
| Farbparser nur mit `rgb()` | Template schreibt oklch vor → **alle** Kontrastwerte falsch | „1:1 weiß auf weiß" für einen dunkelgrünen Knopf |
| Eigenes Sammel-Repo `demo-lernschleife` | löst dasselbe wie die Auslieferung an Bruno, kostet aber ein weiteres Repo und legt Kundenkritik dauerhaft versioniert ab | – |

**Meta-Lehre, die sich dreimal wiederholt hat:**
Jeder selbstgebaute Prüfer war beim ersten Lauf genauso ungeprüft wie das, was
er prüfen sollte. `branchen-check.mjs` hatte 6 eigene Fehler,
`layout-check.mjs` 4. **Prüfer immer gegen echte Dateien testen, nie gegen
konstruierte.**

---

## 8. OFFENE PUNKTE

### Blockierend
| # | Punkt | Was gebraucht wird |
|---|---|---|
| 1 | `/closing` ist **nie gelaufen** | Brunos Test an der Demo, die er heute fertigstellt |
| 2 | `docs/PRAEFERENZEN.md` leer → `visual-critic` startet unkalibriert | mindestens 2 Rückmeldungen |

### Offene Entscheidungen
| # | Frage | Optionen | Tendenz |
|---|---|---|---|
| 1 | Idee 3 bauen: `beleg-check.mjs` (jede Zahl/URL gegen Scrape prüfen) | jetzt / nach dem Test | nach dem Test – der bringt echte Daten |
| 2 | Org-Rename `Autolution` ↔ Personal-Account | so lassen / Personal umbenennen | so lassen, funktioniert |

### Bekannte Schwächen
| # | Punkt | Ort | Schwere |
|---|---|---|---|
| 1 | `git remote` zeigt noch `Autolution-ai/...` (Redirect greift, Push funktioniert) | lokal | kosmetisch |
| 2 | `feedback-auswerten.mjs` gruppiert über Titelwörter – zwei verschieden benannte Befunde zum selben Thema findet es nicht | Skript, Abschnitt „themen()" | bekannt, dokumentiert |
| 3 | 18 gewollte Warnungen in den Branchendateien (Vorlagen-Quellen in Strukturaussagen) | `bau`, `dachdecker`, `maler`, `metallbau` | gewollt, im Text eingeordnet |

---

## 9. NUTZER-PRÄFERENZEN & CONSTRAINTS

**Arbeitsweise (aus CLAUDE.md §2, gilt immer):**
- **Deutsch**, kurz, direkt, präzise. Aktionen vor Erklärungen
- **Vor einer Änderung:** kurz sagen, welche Dateien angefasst werden und warum
- **Bei Unklarheiten nachfragen** – nie raten, nie annehmen
- Nach einer Änderung prüfen, ob andere Dateien inkonsistent werden

**Explizite Verbote:**
- **Keine API-Keys, Tokens oder Secrets** im Code, in Configs oder in
  Nachrichten. Zugänge nur über MCP oder `.env` (nie committed)
- **Kein GitHub-Team-Plan** („auf jeden Fall nicht Team Plan holen")
- **Kein Formular ausfüllen müssen** – Automatik oder gar nicht
- **Feedback-Dateien nicht ins Repo**
- Keine Feature-Branches für Demos – direkt auf `main`

**Wörtlich, weil es auf die Formulierung ankommt:**
> „Ich führe ja die manuellen Änderungen an der Demo durch, bis sie Closing
> bereit ist (Das ist mein manueller Teil)."

> „Das kann man aber nur behaupten wenn auch genau diese Automatisierung gebaut
> wurde." — zur Nutzenaussage im Vertriebs-Briefing

> „Mache alles nacheinander damit Du möglichst lange arbeitest und ich nicht so
> viel zwischen Input manuell eingeben muss."

**Eine berechtigte Beschwerde, die sich nicht wiederholen darf:**
> „Das hättest du mir auch mal im Vorfeld sagen können!" — nachdem der
> Organisations-Umzug durchgeführt war und sich erst danach herausstellte, dass
> Org-Secrets auf dem Free-Plan nicht für private Repos gelten.
**Lehre: Bei semi-irreversiblen Schritten vorher die Randbedingungen prüfen.**

---

## 10. FOKUS BEIM ABBRUCH

**Zuletzt gearbeitet an:** `visual-critic` + `docs/PRAEFERENZEN.md`, beide in
Commit `80c6d9d` gepusht.

**Unterbrochen bei:** Nichts Halbfertigem. Der letzte Arbeitsschritt ist
abgeschlossen, committet und gepusht, `git status` ist sauber.

**Gedanklicher Stand:** Drei Verbesserungsideen standen zur Wahl. Idee 2
(Bildquellen) und Idee 1 (`visual-critic`) sind gebaut. **Idee 3
(`beleg-check.mjs`)** liegt auf Halde: ein Skript, das jede Zahl, jedes Jahr
und jede URL der fertigen Seite gegen Scrape-Daten und Briefing abgleicht –
die Automatisierung der Belegpflicht, die aktuell der `qa-reviewer` aus dem
Gedächtnis macht. Vorbild: `branchen-check.mjs`, das genau so 40 falsche
Zahlen fand.

Bruno wollte zuerst `/closing` an einer echten Demo testen, bevor weiter
gebaut wird – „das wäre ohnehin die bessere Grundlage als meine Vermutung".

---

## 11. NÄCHSTE SCHRITTE (PRIORISIERT)

1. **Auf Brunos `/closing`-Test reagieren.** Er testet an einer Demo aus einem
   **älteren Template-Stand** – dort fehlen die Dateien. Der fertige Prompt für
   die Demo-Session steht unten in Abschnitt 12. Zu prüfen, wenn die Datei
   kommt:
   - Hat der `feedback-analyst` **wörtliche Belege** oder paraphrasiert er?
   - Hat er sich geschont – fehlen Befunde, die Bruno im Chat klar ansprach?
   - Ist der erste Bau-Commit korrekt bestimmt und **im Dokument benannt**?
     (Ohne `demo-v1`-Tag muss er ihn aus `git log` ableiten)
   - Beim Vertriebs-Briefing: nennt es Besonderheiten, die gar nicht in der
     Demo sind? Das ist der Fehler, der im Closing-Call Geld kostet
2. **Bei Auffälligkeiten den jeweiligen Agenten nachschärfen**, bevor sich
   unbrauchbare Dateien ansammeln.
3. **`scripts/beleg-check.mjs` bauen** (Idee 3), falls Bruno zustimmt. Rechnen
   mit Fehlalarmen bei „24" in „24/7", Hausnummern, Postleitzahlen – wie bei
   `branchen-check.mjs` in zwei Runden kalibrierbar.
4. **Ab der zweiten Rückmeldung:** `/auswerten` laufen lassen, `PRAEFERENZEN.md`
   füllen, Trefferquote des `visual-critic` ermitteln.

---

## 12. EMPFOHLENE SKILLS / TOOLS FÜR DIE NÄCHSTE SESSION

- **Playwright** ist global vorhanden, Browser vorinstalliert. **Kein
  `playwright install` nötig**, kein `package.json` anlegen
- **Apify MCP** für Scrapes; Actor-Namen und Felder **immer per
  `search-actors` / `fetch-actor-details` verifizieren**, nie raten
- Vor jeder Template-Änderung: `TEMPLATE-VERSION` hochzählen und
  `docs/CHANGELOG.md` **mit Anlass** ergänzen (CLAUDE.md §12)

**Fertiger Prompt für Brunos Demo-Session (ältere Template-Version):**

> Die Demo ist closing-bereit. Hol dir `Autolution/demo-template` (per
> `add_repo`, dann klonen nach `/tmp/template` – **nicht** in dieses Repo
> hinein) und kopiere daraus:
> - `.claude/commands/closing.md`
> - `.claude/agents/feedback-analyst.md`
> - `.claude/agents/vertriebs-briefing.md`
>
> Ergänze `.gitignore` um `.closing/` — **bevor** irgendetwas erzeugt wird.
> Führe dann `/closing` aus.

---

## 13. DATEIEN DIE ZUERST GELESEN WERDEN SOLLTEN

| Priorität | Pfad | Warum |
|---|---|---|
| 1 | `CLAUDE.md` | Die Verfassung. Wird ohnehin automatisch geladen |
| 2 | `docs/CHANGELOG.md` (oberste 3 Einträge) | Was zuletzt warum geändert wurde |
| 3 | `docs/LERNSCHLEIFE.md` | Das Konzept hinter `/closing` und `/auswerten` |
| 4 | `.claude/agents/feedback-analyst.md` | Läuft als nächstes zum ersten Mal |
| 5 | `.claude/agents/vertriebs-briefing.md` | dito |
| 6 | `docs/WORKFLOW.md` | Phasen 4b und 6 sind neu |
| 7 | `.claude/agents/visual-critic.md` | Neu, noch ungetestet |

---

## WICHTIGE WARNUNG FÜR DIE NÄCHSTE SESSION

**An diesem Repo arbeitet mindestens eine weitere Claude-Session parallel.**

Diese Session hat es einmal hart gemerkt: Ein Push wurde abgelehnt, weil vier
fremde Commits auf `main` lagen – darunter ein **struktureller Umbau** (Website
nach `site/`, Vercel-Action entfernt, Live-Template ergänzt).

**Daraus folgt, vor jedem Arbeitsbeginn und vor jedem Push:**

```bash
git fetch origin main && git log --oneline HEAD..origin/main
```

Liegt etwas an: **rebasen, nicht mergen** (`git -c rebase.backend=merge rebase
origin/main`). Konflikte sind bei `TEMPLATE-VERSION` und `docs/CHANGELOG.md`
zu erwarten – die eigene Version über den fremden Stand heben, den eigenen
Changelog-Eintrag oben einsortieren.

**Und prüfen, ob die eigene Arbeit noch zum Stand passt:** Der `site/`-Umzug
hat alle Pfade in `/hero-neu` ungültig gemacht; das fiel erst beim Rebase auf.
