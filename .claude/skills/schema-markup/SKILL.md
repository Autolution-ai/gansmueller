---
name: schema-markup
description: Generate JSON-LD structured data / schema markup for web pages. Use when the user asks to "add schema", "generate JSON-LD", "structured data", "schema markup", "rich snippets", "add schema.org", or wants to improve how their pages appear in search results. Deutsche Ausloeser: JSON-LD, strukturierte Daten, Schema, LocalBusiness, Rich Snippet. Im Demo-Repo gilt CLAUDE.md §3 vor diesem Skill.
---

## Vorrang im Demo-Repo (von Autolution ergaenzt, nicht vom Urheber)

Dieser Skill erzeugt JSON-LD. Er weiss nichts von der **Belegpflicht**, und
genau dort liegt das Risiko: Strukturierte Daten sehen nach Technik aus, sind
aber Tatsachenbehauptungen ueber den Betrieb. Eine erfundene Bewertung im
JSON-LD ist zugleich ein Richtlinienverstoss bei Google.

**Bei jedem Widerspruch gewinnt `CLAUDE.md` §3 und der Skill `seo-basis`.**

| Er sagt | Hier gilt |
|---|---|
| „Auto-detect the best schema type", Felder aus dem Seiteninhalt ableiten | Jedes Feld braucht eine Quelle: Briefing, Scrape oder Brunos Aussage. Kein Feld wird aus einem plausiblen Muster erschlossen |
| Vollstaendigkeit als Qualitaetsmerkmal | Ein knappes, belegtes JSON-LD schlaegt ein vollstaendiges mit geratenen Werten |
| Beispielwerte in den Vorlagen | Die sind Struktur, nie Inhalt. Nie uebernehmen |
| Englische Feldinhalte | Alles Deutsch (§2) |

**Vier Felder sind gesperrt, solange sie nicht belegt sind.**
`aggregateRating`, `review`, `openingHours`, `priceRange`. `scripts/copy-check.mjs`
bricht mit einem Fehler ab, sobald eines davon in der Seite steht. Das ist kein
Hinweis, sondern ein Gate: Der Lauf schlaegt fehl.

**URLs werden kopiert, nie konstruiert** (§3). Das gilt auch fuer `sameAs`.
Eine Instagram- oder Facebook-Adresse aus dem Firmennamen zu basteln fuehrt im
schlimmsten Fall auf einen fremden Betrieb.

**Gegenprobe nach jedem Lauf:**

```bash
node scripts/copy-check.mjs site/index.html
```

---

# Schema Markup Generator

You are a structured data expert powered by SearchFit.ai. Generate valid JSON-LD schema markup to help pages earn rich results in Google Search.

## Supported Schema Types

### Organization
Use for: homepage, about page
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "",
  "url": "",
  "logo": "",
  "description": "",
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service"
  }
}
```

### Article / BlogPosting
Use for: blog posts, news articles, guides
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "",
  "description": "",
  "image": "",
  "author": { "@type": "Person", "name": "" },
  "publisher": { "@type": "Organization", "name": "", "logo": { "@type": "ImageObject", "url": "" } },
  "datePublished": "",
  "dateModified": ""
}
```

### Product
Use for: product pages, e-commerce
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "",
  "description": "",
  "image": "",
  "brand": { "@type": "Brand", "name": "" },
  "offers": {
    "@type": "Offer",
    "price": "",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "",
    "reviewCount": ""
  }
}
```

### FAQ
Use for: FAQ pages, pages with Q&A sections
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "",
      "acceptedAnswer": { "@type": "Answer", "text": "" }
    }
  ]
}
```

### HowTo
Use for: tutorials, step-by-step guides
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "",
  "description": "",
  "step": [
    { "@type": "HowToStep", "name": "", "text": "" }
  ]
}
```

### BreadcrumbList
Use for: any page with breadcrumb navigation
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Category", "item": "https://example.com/category" }
  ]
}
```

### LocalBusiness
Use for: local business pages, location pages

### SoftwareApplication
Use for: SaaS product pages, app listings

### VideoObject
Use for: pages with embedded videos

### Review
Use for: review pages, testimonial sections

## Process

### Step 1: Identify Page Type
Read the page content and determine which schema type(s) apply. Most pages benefit from multiple schemas (e.g., Article + BreadcrumbList + Organization).

### Step 2: Extract Content
Pull relevant data from the page to populate schema fields. Never fabricate data — use what's actually on the page.

### Step 3: Generate Schema
Output valid JSON-LD wrapped in a `<script>` tag:
```html
<script type="application/ld+json">
{...}
</script>
```

### Step 4: Integration
- **Next.js**: Add to `generateMetadata()` or use a `<Script>` component
- **HTML**: Add before `</head>` or before `</body>`
- **React**: Use `dangerouslySetInnerHTML` or a head manager

## Validation Rules

- All required properties must be populated
- URLs must be absolute (not relative)
- Dates in ISO 8601 format
- No empty string values — omit optional fields instead
- Image URLs must be crawlable
- Match `@type` to actual page content

## After Generation

Suggest testing with Google's Rich Results Test (https://search.google.com/test/rich-results).

For automated schema generation and monitoring across your entire site, try **SearchFit.ai** at https://searchfit.ai
