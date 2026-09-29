# Logos der Bauherren (Marquee unter dem Hero)

Abgerufen am: 2026-09-29 · Weg: Apify (`apify/rag-web-browser`, `apify/web-fetch`)
Auftrag: Bruno, 29.09.2026 („Die Logos der Referenzen als Marquee unter den
HERO“, Beleg: `quellen/gespraech-2026-09-27-bruno.md`, letzter Nachtrag).
Regel: Logo nur, wo die Firma über ihre eigene Website eindeutig
identifizierbar ist; URLs aus Suchtreffer bzw. Seitenquelltext kopiert, nie
konstruiert. Höchstens 6 Apify-Abrufe (Bruno), verbraucht: 4 Actor-Läufe.

| Bauherr (Referenzliste.pdf) | Ergebnis | Herkunft |
|---|---|---|
| HOWOGE mbH | **Logo** `site/assets/images/logos/howoge.svg` (bitgleich, 1770 Bytes, `image/svg+xml`, HTTP 200) | Suche „HOWOGE Wohnungsbaugesellschaft mbH Berlin offizielle Website“ → Treffer „HOWOGE: Home“, `https://www.howoge.de/`. Im JSON-LD der Seite: `Organization` „HOWOGE Wohnungsbaugesellschaft mbH“, `logo`: `https://www.howoge.de/_assets/5124746c56c5ac96cc2e629860a05e8f/Images/logo-howoge.svg` (exakt kopiert). Datei per web-fetch (raw) geladen, 2026-09-29T05:52:07Z |
| Kaufland Ladenbau GmbH | **Wortmarke** | Suche „Kaufland Deutschland offizielle Website“ → `https://www.kaufland.com/` („Kaufland: Home“). Seitenquelltext (web-fetch html, 50.224 Bytes) enthält keine Logodatei (Kopf wird per Skript nachgeladen). Außerdem ist „Kaufland Ladenbau GmbH“ nicht dieselbe Firma wie die Handelsmarke Kaufland. Keine weitere Suche, um das Abrufbudget zu halten |
| BauBeCon Wohnen GmbH | **Wortmarke** | nicht abgerufen: Ob die Marke heute noch eigenständig existiert, ist ohne weitere Abrufe nicht eindeutig; Budget |
| Argentum GmbH & Co. KG | **Wortmarke** | nicht abgerufen: Allerweltsname, Verwechslungsgefahr |
| Ortus GmbH & Co. KG | **Wortmarke** | nicht abgerufen: Allerweltsname, Verwechslungsgefahr |
| GVC mbH | **Wortmarke** | nicht abgerufen: Allerweltsname, Verwechslungsgefahr |

Apify-Läufe (runId): PzyBim9zXJnwH9d8i (Suche HOWOGE), wR9BZQ5j9fG6jWMgr
(Logo HOWOGE), bOziSTALjeDJ9iTs3 (Suche Kaufland), s2vai7Gs0ZRbVolsX
(Quelltext kaufland.com). Dazu nur Lesezugriffe auf die Ergebnis-Datasets.

**Vor dem Live-Gang:** Nennung der Bauherren und Nutzung des HOWOGE-Logos mit
René Gansmüller klären (Demo-Hinweis steht über dem Band).

## Von Bruno geliefert (2026-09-29)

Bruno hat im Chat vier Logos geschickt, wörtlich: „Hier sind die anderen Logos. Werte diese selbständig auf und bearbeite sie, dass du sie hochwertig im Marquee einbauen kannst." Originale unverändert abgelegt:

| Datei | Maße | Zeigt | Eintrag in der Referenzliste |
|---|---|---|---|
| `quellen/logos/argentum-bruno.png` | 201×66 | „ARGENTUM" mit Stier-Bildmarke | Argentum GmbH & Co. KG |
| `quellen/logos/baubecon-bruno.png` | 219×93 | „BauBeCon Facility Management" | BauBeCon Wohnen GmbH |
| `quellen/logos/gcv-bruno.png` | 298×86 | „GCV Verwaltungsgesellschaft mbH" | GVC mbH |
| `quellen/logos/kaufland-bruno.png` | 148×125 | Kaufland-Bildmarke mit Schriftzug | Kaufland Ladenbau GmbH |

**Abweichungen, zu klären mit René Gansmüller (nicht aufgelöst):**
- Referenzliste „GVC mbH", Logo „GCV Verwaltungsgesellschaft mbH" (Buchstabendreher in einer der beiden Quellen?).
- Referenzliste „BauBeCon Wohnen GmbH", Logo „BauBeCon Facility Management".
- Referenzliste „Kaufland Ladenbau GmbH", Logo ist die Handelsmarke Kaufland.

Ortus GmbH & Co. KG: kein Logo geliefert, bleibt Wortmarke.

### Aufbereitung (2026-09-29)

Die vier PNGs sind voll deckend (kein Alpha), Hintergrund weiß bzw. bei
BauBeCon blaugrau. Vektorisiert mit `potracer` (Python-Port von Potrace),
Skript: 8-fach hochskaliert (Lanczos), leicht geglättet, Hintergrund über
den Abstand zur Hintergrundfarbe freigestellt, je Farbfläche einzeln
getraced. Form und Text unverändert, nichts ergänzt. Ergebnis:

| Datei | Farben (aus dem Original gemessen) | Anmerkung |
|---|---|---|
| `site/assets/images/logos/argentum.svg` | #1a1a18 | Stier und Rahmen mit geringerer Glättung, damit Schwanz und Hörner erhalten bleiben |
| `site/assets/images/logos/baubecon.svg` | #0f594a (Bildmarke), #1d1d1b (Schrift) | Blaugrauer Hintergrund des PNG entfernt; kleine Zeile mit wenig Glättung wegen der i-Punkte |
| `site/assets/images/logos/gcv.svg` | #b5b4b4 (Linien), #716f6f (Schrift) | Die untersten 5 Pixelzeilen des PNG (dunkle Linie und roter Balken über die volle Breite) gehören zur Kopfleiste der Website, nicht zum Logo, und sind weggelassen. Die unterste Linie des Gebäudes endet deshalb dort, wo sie im PNG vom Balken überdeckt wird |
| `site/assets/images/logos/kaufland.svg` | #dc0322 | – |

Die Alt-Texte folgen der Referenzliste (siehe Abweichungen oben).

