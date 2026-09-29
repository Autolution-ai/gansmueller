# Symbolbilder Unsplash (Leistungskacheln)

Stand: 2026-09-29 · Auftrag: Leistungskacheln wie im Beispielbild (`.referenz/leistungen-beispiel-bruno.webp`), freie Fotos von Unsplash, auf der Seite klein als „Symbolbild" gekennzeichnet.

## Status: eingebaut (2026-09-29, Überarbeitung 2)

Der Egress-Proxy der Arbeitsumgebung lehnt `images.unsplash.com`, `unsplash.com` und `api.apify.com` weiter ab (403). Abruf deshalb über Apify `web-fetch` (Format `raw`, Header `Accept: image/jpeg`); das Ergebnis kommt als Base64 aus dem Apify-Dataset, wurde lokal dekodiert und mit PIL geprüft (vollständiges JPEG, Größe = `contentLengthBytes`).

Parameter: aus den kopierten URLs unten nur `w=3000` → `w=2000` geändert, `q=60` unverändert. Ein vorheriger Test mit `Range: bytes=0-39999` (w=1100, q=55) lieferte 206 und `Content-Range: bytes 0-39999/368324`; Teilstücke waren am Ende nicht nötig, weil das Dataset-Ergebnis als Datei gespeichert wird.

| Datei | Quelle | Abruf (Apify-Lauf) | Original | Bearbeitung |
|---|---|---|---|---|
| `site/assets/images/leistungen/projektsteuerung.webp` / `.jpg` | Kandidat 01 (Jacek Dylag) | `wgz8sPqVxOimmX0nt`, 1.059.814 Byte | 2000 × 3000 | Ausschnitt y 450 bis 2250, auf 1440 × 1296 verkleinert, WebP q66 / JPG q72 |
| `site/assets/images/leistungen/bauueberwachung.webp` / `.jpg` | Kandidat 02 (Scott Blake) | `psza7JZMsZDe9NQ6b`, 747.538 Byte | 2000 × 1125 | auf 1440 × 810 verkleinert, WebP q60 / JPG q68 |

Am Bild geprüft: keine Personen. Auf dem Kran in Bild 01 ist klein der Herstellerschriftzug zu sehen (Kranhersteller, keine Baufirma), unter dem Verlauf kaum lesbar. Der Ersatzkandidat (Lauf `Tc9y59ibh7RNwfbEr`) ist **nicht** verwendet: gut sichtbares Firmenlogo auf einem Silo.

Auf der Seite trägt jede Kachel oben rechts die Kennung „Symbolbild". Der Demo-Hinweis über den Kacheln ist entfallen.

## Ausgewählte Kandidaten (URLs kopiert aus den Abrufen)

Lizenz aller Kandidaten: Unsplash License (frei, auch kommerziell, ohne Namensnennungspflicht; Namensnennung hier trotzdem vermerkt). Premium-Bilder (`plus.unsplash.com`, „Unsplash+") sind ausgeschlossen.

| Kachel | Motiv (Alt-Text laut Unsplash) | Fotograf | Fotoseite | Bild-URL |
|---|---|---|---|---|
| 01 Projektsteuerung | gray metal building frame near tower crane during daytime | Jacek Dylag (@dylu) | https://unsplash.com/photos/gray-metal-building-frame-near-tower-crane-during-daytime-nhCPOp4A2Xo | https://images.unsplash.com/photo-1527335988388-b40ee248d80c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uc3RydWN0aW9uJTIwc2l0ZXxlbnwwfHwwfHx8MA%3D%3D |
| 02 Bauüberwachung | aerial view of gray concrete building | Scott Blake (@sunburned_surveyor), veröffentlicht 8. Januar 2021 | https://unsplash.com/photos/aerial-view-of-gray-concrete-building-rsGd-rXFGkM | https://images.unsplash.com/photo-1610079732288-72a77bd816c9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D |
| Ersatz | a building under construction with a crane in the background | Tomas (@tomas_chudy) | https://unsplash.com/photos/a-building-under-construction-with-a-crane-in-the-background-R32rcn653D0 | https://images.unsplash.com/photo-1644221150167-fb4fafa7f411?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D |

Die Motive sind nach Alt-Text und Fotoseite ausgewählt, nicht am Bild geprüft (Download nicht möglich). Vor dem Einbau am Bild prüfen: keine erkennbaren Firmenlogos, keine Personen, die für René Gansmüller gehalten werden könnten.

## Apify-Abrufe (2026-09-29)

| Lauf | Actor | Zweck |
|---|---|---|
| `mAu3owPswHxDhAgDu` | apify/rag-web-browser | Suche „unsplash construction site building concrete photos" |
| `Y7qoy7mzWyTTRT4ou` | apify/web-fetch | https://unsplash.com/s/photos/construction-site (Link aus dem ersten Treffer) |
| `IuGntSPEJVvTHMFTM` | apify/web-fetch (raw) | Testdownload Kandidat 01, siehe Status |
| `f4d7hZ9OCfbzXUM7G` | apify/web-fetch (raw, Range) | Test Teilstück, 2026-09-29 |
| `wgz8sPqVxOimmX0nt` | apify/web-fetch (raw) | Kandidat 01, w=2000 |
| `psza7JZMsZDe9NQ6b` | apify/web-fetch (raw) | Kandidat 02, w=2000 |
| `Tc9y59ibh7RNwfbEr` | apify/web-fetch (raw) | Ersatz, w=2000, nicht verwendet |

## Nachtrag 2026-09-29: Bildkacheln 03 Baubetreuung und 04 Bauberatung

Suche über Apify `rag-web-browser` („unsplash photos architect blueprints construction plans table"), Treffer: https://unsplash.com/s/photos/construction-plans. Die Suche nach Altbau-Fassaden lieferte nur Getty-Seiten (zwei Läufe ohne verwertbares Ergebnis); für 04 stammt der Kandidat deshalb aus der Liste https://unsplash.com/s/photos/construction-site (siehe oben). Abruf wie zuvor (`raw`, Base64 lokal dekodiert, Bytezahl = `contentLengthBytes`), Parameter: nur `w=3000` → `w=1600`.

| Datei | Motiv (Alt-Text Unsplash) | Fotograf | Fotoseite | Bild-URL | Lauf | Bearbeitung |
|---|---|---|---|---|---|---|
| `site/assets/images/leistungen/baubetreuung.webp` / `.jpg` | Architectural blueprints spread out on a surface | Marina Zvada (@zvada_photo) | https://unsplash.com/photos/architectural-blueprints-spread-out-on-a-surface-fNxmdlYHRm8 | https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbiUyMHBsYW5zfGVufDB8fDB8fHww | `fXBOxoCf82FXMDbX0`, 444.797 Byte, 1600 × 2133 | Ausschnitt y 650 bis 1650, 1200 × 750, WebP q66 / JPG q72 |
| `site/assets/images/leistungen/bauberatung.webp` / `.jpg` | two construction workers working on scaffolding on a building | Nik (@helloimnik) | https://unsplash.com/photos/two-construction-workers-working-on-scaffolding-on-a-building-7mtBqZo5G6I | https://images.unsplash.com/photo-1713593930871-e21d7f9ef4a1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MHx8MHx8fDA%3D | `wO5syZHQeSWnUjTaJ`, 424.528 Byte, 1600 × 2526 | Ausschnitt y 1000 bis 2000, 1200 × 750, WebP q66 / JPG q72 |

Am Bild geprüft: Personen auf dem Gerüst nur von der Seite/hinten, keine Gesichter erkennbar, keine Firmenlogos. Nicht verwendet: „people reviewing architectural blueprints on desk" (Pedro Miranda, Lauf `f8Q0IlKN78xdhw2zQ`), weil auf den Plänen ein Firmenschriftzug steht. Das Motiv für 04 zeigt ein Gerüst, keinen Altbau; ein passenderes Altbau-Motiv war im Abruflimit nicht zu finden.

| Lauf | Actor | Zweck |
|---|---|---|
| `HUgrfKkiXJlcb46q7` | apify/rag-web-browser | Suche Baupläne |
| `lDj9a6oBQmuiGGIGp` | apify/rag-web-browser | Suche Altbau-Fassade (nur Getty, verworfen) |
| `f8Q0IlKN78xdhw2zQ` | apify/web-fetch (raw) | Kandidat 03a, verworfen (Logo) |
| `fXBOxoCf82FXMDbX0` | apify/web-fetch (raw) | 03 Baubetreuung |
| `wO5syZHQeSWnUjTaJ` | apify/web-fetch (raw) | 04 Bauberatung |
| `wHJP0a2rgZb7STCLf` | apify/rag-web-browser | Suche Altbau (ohne Ergebnis) |

