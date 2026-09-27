# Google-Unternehmensprofil
Gescrapt am: 2026-09-27 · Actor: compass/crawler-google-places
Place-ID: ChIJ05l4ri9SqEcRroDNaNdCBEY
Profil-URL: https://www.google.com/maps/search/?api=1&query=Ingenieurb%C3%BCro%20Ren%C3%A9%20Gansm%C3%BCller&query_place_id=ChIJ05l4ri9SqEcRroDNaNdCBEY

Lauf: runId `kU4jIQl2q3BvucFEK`, Dataset `zfZcGMyeg65B7bCxQ`, Rohdaten: `quellen/scrape-google.json`
Suche: `searchStringsArray` = ["Ingenieurbüro René Gansmüller", "Ingenieurbüro Gansmüller"]
(Name laut Impressum und Name laut Domain), `locationQuery` = "Berlin, Deutschland"
(Ort laut Impressum), `searchMatching: "only_exact"`, `maxCrawledPlacesPerSearch: 3`,
`scrapePlaceDetailPage: true`, `maxImages: 30`, `scrapeImageAuthors: true`, `maxReviews: 0`.
Auf der Website liegt kein Google-Maps-Link, daher Suche statt `startUrls`.
Ergebnis: genau ein Treffer (Rang 1 zu „Ingenieurbüro René Gansmüller").

## Zuordnung belegt durch (mindestens zwei, CLAUDE.md §5)
- Website-URL: stimmt überein (Profil `http://www.ingenieurbuero-gansmueller.de/` = Start-URL des Scrapes)
- Telefon: stimmt überein (Profil `+49 30 69520364` = Website „030/ 69 520 364")
- Adresse: stimmt überein (Profil „Schwedenstraße 13, 13357 Berlin, Deutschland" = Impressum „Schwedenstraße 13, 13357 Berlin")

Drei von drei Merkmalen stimmen überein: Eintrag ist zugeordnet.

## Übernommen
Name:            Ingenieurbüro René Gansmüller
Adresse:         Schwedenstraße 13, 13357 Berlin, Deutschland
Telefon:         +49 30 69520364
Öffnungszeiten:  keine im Profil (Feld `openingHours` leer)
Bewertung:       keine im Profil (`totalScore` null, `reviewsCount` null)
Verifiziert:     nein (`claimThisBusiness: true`, das Profil ist vom Inhaber nicht beansprucht)

## Weitere Felder (wie geliefert)
- Kategorie: Ingenieur (`categories`: ["Ingenieur"])
- Stadtteil (`neighborhood`): Mitte
- Plus Code: H94F+4H Berlin, Deutschland
- Koordinaten: 52.5553197, 13.3738849
- Bilder: `imagesCount` 0, keine Bilder, daher auch keine Bildautoren
- Beschreibung, Inhaberbeschreibung, Inhaber-Beiträge, Fragen & Antworten: keine
- Social-Profile oder weitere Links im Profil: keine
- `permanentlyClosed`: false, `temporarilyClosed`: false
- kgmid: /g/11bzypv2wb · cid: 5045230975505498286

## Folgen für die Demo (Regel aus CLAUDE.md §5 / WORKFLOW Phase 1)
Keine Öffnungszeiten und keine Bewertung vorhanden, also nichts davon auf die
Seite. Das Profil ist nicht beansprucht und gilt damit als Hinweis, nicht als
Beleg; es bestätigt aber Name, Adresse und Telefon der Website.
