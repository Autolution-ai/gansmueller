---
description: Startet die Demo-Erstellung – führt durch alle Phasen des Workflows.
---

# /demo – Demo-Erstellung starten

Du startest jetzt die Erstellung einer Demo-Website. Folge strikt dem Ablauf in
`docs/WORKFLOW.md` und den Regeln in `CLAUDE.md`.

## Sofort zu Beginn

1. Weise Bruno darauf hin, jetzt den **Plan Mode** zu aktivieren (Shift+Tab),
   falls nicht ohnehin Default. Phase 0–2 laufen im Plan Mode.
2. Bitte Bruno, das **Briefing aus Todoist** einzufügen.
3. Lies `TEMPLATE-VERSION` und trage den Stand in `docs/DEMO-SPEC.md` ein.
4. **Falls das Repo gerade erst per „Use this template" entstanden ist:**
   Bruno erinnern, das Vercel-Projekt anzulegen – **Root Directory = `site`**.
   Ohne diesen Schalter liegt am Ende das komplette Claude-Setup auf der
   Kunden-Domain (CLAUDE.md §5).

## Dann Phase für Phase

Arbeite den Workflow der Reihe nach ab und halte an jedem Kontrollpunkt (🛑) an:

- **Phase 0 – Briefing-Analyse** → Subagent `brief-analyst`
  Briefing extrahieren, filtern, Demo-Spec. Dazu die **vier Pflichtfragen**
  (Assets, Person, Perspektive, Rolle bei Referenzprojekten) plus 3–5 gezielte
  Rückfragen. 🛑 bestätigen lassen, dann nach `docs/DEMO-SPEC.md` schreiben.

- **Phase 1 – Scrape & Analyse** → Subagent `site-analyst`
  Apify-Scrape, CI, Logo (Higgsfield), Ton, Werte, Bildvorschläge,
  **Sichtbarkeits-Befund der Altseite** nach docs/SEO-NOTIZEN.md,
  **Widersprüche zwischen Briefing und Scrape melden**. Fertig erst, wenn
  Farbwerte, Schrift und freigestelltes Logo vorliegen. 🛑 bestätigen.

- **Phase 1b – Synthese** → Subagent `site-analyst`
  Briefing und Scrape zum Strategie-Dossier (`docs/DOSSIER.md`) zusammenführen:
  was ist einzigartig, was hervorheben, was berücksichtigen, was ausnutzen.
  Plus Bild-Inventar ohne Download. 🛑 bestätigen lassen.

- **Phase 2a – Struktur** → `structure-architect` (Skills: section-craft, ui-ux-pro-max)
  Struktur nach Ziel, Streich-Test je Sektion, **Rhythmusplan** (Muster,
  Breite, Grund, Höhe), je Sektion der Asset-Bedarf. 🛑 abnicken.

- **Phase 2b – Hero** → `hero-specialist`, dann `hero-critic`
  Wettbewerber-Heros recherchieren, **zwei echte Varianten bauen** (Typ UND
  Hintergrund verschieden), mit `scripts/hero-check.mjs` messen, unabhängig
  bewerten lassen. 🛑 Variante bestätigen.

- **Phase 2c – Design & Bewegung** → `structure-architect` + `hero-specialist`
  (Skills: design-system, motion-toolkit, ui-ux-pro-max)
  `site/css/tokens.css` nach dem Verfahren in `design-system` füllen (oklch,
  Neutrale aus dem Markenfarbton, Kontraste gemessen, Typo-Spannweite ≥ 2,5),
  dann Farben, Schrift, Logo im Einbau, Hero-Entwurf und Bewegungskonzept
  zeigen, **bevor gebaut wird**. 🛑 freigeben lassen.
  Danach: Bruno erinnern, in den Ausführungsmodus zu wechseln (Shift+Tab).

- **Phase 3 – Copy** → Subagent `copywriter`
  (Skills: website-copy, anti-slop, seo-basis, schema-markup)
  JSON-LD über `/generate-schema`, Schnellprüfung einer fertigen Seite über
  `/seo-check`. Beide messen zuerst mit `scripts/copy-check.mjs`.
  Sektionsweise texten, Struktur nach `seo-basis` (eine H1, Title/Description
  ausformuliert, Alt-Texte), Keyword-Notizen nach docs/SEO-NOTIZEN.md.
  🛑 Auto-QA durch `qa-reviewer` (inkl. `node scripts/copy-check.mjs`),
  dann 🛑 Freigabe.

- **Phase 4 – Bau & Effekte** → Haupt-Agent + `hero-specialist`
  (Skills: motion-toolkit, ui-ux-pro-max)
  HTML/CSS/JS sektionsweise, responsive von Anfang an, Effekte sparsam,
  Bilder (Original/Higgsfield/Platzhalter), Footer mit Impressum/Datenschutz-
  Platzhaltern. 🛑 visuelle Zwischenabnahme.

- **Phase 5 – Finale QA & Deploy**
  5a `qa-reviewer` gegen docs/CHECKLISTE.md, mit `scripts/copy-check.mjs` ·
  5b `responsive-qa` mit `scripts/layout-check.mjs`, dazu iPhone/Safari und
  Android/Chrome von Hand ·
  5c Befunde beheben → 🛑 finale Freigabe → Bruno verknüpft das Vercel-Projekt
  (Root Directory = `site`) → Stichprobe: `<demo>.vercel.app/CLAUDE.md` muss
  404 liefern → Demo-Link.

## Grundhaltung (aus CLAUDE.md)

- Kontrollpunkte ernst nehmen, nie ungefragt durchbauen.
- **Belegpflicht:** Jede Zahl, jeder Name, jede URL braucht eine Quelle.
  Widersprüche melden statt auflösen, Unsicheres sichtbar markieren.
- **Messen statt schätzen:** Wo die Checkliste einen Wert verlangt, wird er
  gemessen und genannt. Ein Haken ohne Wert gilt als nicht geprüft. Dafür gibt
  es `scripts/copy-check.mjs`, `scripts/layout-check.mjs` und
  `scripts/hero-check.mjs` – benutzt werden sie, nicht nachgezählt.
- Deutsch, kurz, direkt.
- Kein AI-Slop (Text & Design), Inhaber-Test über jeden Satz.
- Direkt auf `main` arbeiten, keine Feature-Branches.
