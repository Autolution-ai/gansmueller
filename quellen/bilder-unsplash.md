# Symbolbilder Unsplash (Leistungskacheln)

Stand: 2026-09-29 · Auftrag: Leistungskacheln wie im Beispielbild (`.referenz/leistungen-beispiel-bruno.webp`), freie Fotos von Unsplash, auf der Seite klein als „Symbolbild" gekennzeichnet.

## Status: nicht eingebaut

Die Dateien liegen **nicht** im Repo. Grund:

- Der Egress-Proxy der Arbeitsumgebung lehnt `images.unsplash.com`, `unsplash.com` und `api.apify.com` ab (403, Organisationsrichtlinie; geprüft 2026-09-29 über `curl` und `$HTTPS_PROXY/__agentproxy/status`).
- Apify `web-fetch` lädt das Bild zwar (Lauf `IuGntSPEJVvTHMFTM`, 1.357.457 Byte, AVIF), das Ergebnis liegt aber nur im Apify-Dataset. Von dort kommt es ausschließlich als Base64-Text durch die Chat-Schnittstelle, für ein Bild dieser Größe nicht übertragbar.

Die Seite zeigt deshalb einen gekennzeichneten Bildplatz (dunkle Fläche, „Bildplatz"). Sobald die Dateien vorliegen, genügt je Kachel eine Zeile als erstes Kind von `<article class="kachel">`:

```html
<img class="kachel__bild" src="assets/images/leistungen/projektsteuerung.webp" alt="" width="2000" height="1333" loading="lazy">
```

Die Kennung wechselt dann per CSS von „Bildplatz" auf „Symbolbild"; den Demo-Hinweis über den Kacheln entfernen.

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
