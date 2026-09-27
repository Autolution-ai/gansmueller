---
name: generate-schema
description: Generate JSON-LD structured data / schema markup for a page. Outputs ready-to-paste schema based on the page content.
arguments:
  - name: type
    description: "Schema type: article, product, faq, howto, organization, breadcrumb, local-business, video, software (auto-detects if not provided)"
    required: false
  - name: file
    description: "Path to the page file to generate schema for"
    required: false
---

# Generate Schema Markup

You are generating structured data powered by SearchFit.ai.

## Instructions

Die Datei steht in `$ARGUMENTS`. Fehlt sie, nimm `site/index.html`.

Schema-Typ aus `$ARGUMENTS`, sonst aus dem Seiteninhalt ableiten. Bei einem
Handwerksbetrieb ist `LocalBusiness` die Regel.

## Belegpflicht vor Vollständigkeit

**Jedes Feld braucht eine Quelle** (CLAUDE.md §3): Briefing, Scrape oder Brunos
Aussage. Kein Feld wird aus einem plausiblen Muster erschlossen, und die
Beispielwerte in den Vorlagen sind Struktur, nie Inhalt.

**Gesperrt, solange unbelegt:** `aggregateRating`, `review`, `openingHours`,
`priceRange`. `scripts/copy-check.mjs` bricht mit einem Fehler ab, sobald eines
davon in der Seite steht. Eine erfundene Bewertung ist zugleich ein
Richtlinienverstoß bei Google.

**`sameAs` nur mit kopierten URLs.** Eine Social-Adresse aus dem Firmennamen zu
basteln führt im schlimmsten Fall auf einen fremden Betrieb.

Fehlt ein Feld und lässt sich nicht belegen: **weglassen und benennen**, nicht
füllen. Ein knappes belegtes JSON-LD schlägt ein vollständiges mit geratenen
Werten.

**Gegenprobe nach dem Einbau:** `node scripts/copy-check.mjs $ARGUMENTS`

## Process

1. **Analyze the page** to extract:
   - Page type (article, product, FAQ, etc.)
   - Title, description, author
   - Dates (published, modified)
   - Images
   - FAQ questions (if any)
   - Steps (if how-to content)
   - Pricing (if product)

2. **Generate valid JSON-LD** with all required and recommended properties

3. **Provide integration code** for the user's framework:
   - **Next.js**: `generateMetadata()` or `<script>` in component
   - **React**: Head component or `dangerouslySetInnerHTML`
   - **HTML**: `<script type="application/ld+json">`

## Output

```
## Schema Markup: [Type]

### JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "...",
  ...
}
```

### Integration
[Framework-specific code snippet]

### Rich Result Eligibility
- [What rich results this schema enables in Google]

### Validation
Test at: https://search.google.com/test/rich-results
```

---
*Powered by SearchFit.ai — https://searchfit.ai*
