# LIBRARIES.md – Animations-Bibliotheken

Nachschlagewerk: welche Library wann, wie eingebunden, und welche Fallstricke
schon einmal Zeit gekostet haben. Die Einsatz-Logik lebt im Skill
`motion-toolkit` – diese Datei ist die Schnellreferenz beim Bauen.

## Grundprinzip

Leichtestes Werkzeug zuerst. Wenige, gezielte, saubere Effekte. Zurückhaltung
ist Qualität – Überladung sieht nach AI aus.

## Die Kaskade – wann was

| Library | Wann | Typische Effekte |
|---------|------|------------------|
| **Natives CSS** | Erste Wahl bei Einfachem | Hover, Fades, Übergänge, scroll-driven CSS |
| **Lenis** | Einmal pro Seite als Basis | Sanftes Momentum-Scrolling ("Agentur-Gefühl") |
| **GSAP + ScrollTrigger** | Inszenierte Momente | Scroll-Animationen, Hero-Sequenzen, Pinning, Text-Reveals, SVG |
| **Anime.js v4** | JS-Kontrolle ohne GSAP-Gewicht | Gestaffelte Animationen, Zähler, SVG-Linien |
| **Three.js** | Nur echtes 3D, sehr sparsam | 3D-Objekt im Hero, WebGL-Hintergrund |

Für die konkrete GSAP-Umsetzung: offizielle `gsap-*`-Skills heranziehen.

## Einbindung: lokal, nicht per CDN

**Der Egress-Proxy der Arbeitsumgebung blockiert CDNs.** Geprüft am
16.09.2026: cdnjs antwortet mit 403, jsdelivr und unpkg antworten gar nicht.
Google Fonts war in dieser Umgebung erreichbar, in einer anderen nicht. Eine
Einbindung, die in einer Session lädt und in der nächsten nicht, ist für eine
Demo, die geprüft werden muss, unbrauchbar. Deshalb:

- Library-Dateien liegen unter `site/assets/js/`
- Schriftdateien liegen unter `site/assets/fonts/`, eingebunden per `@font-face`
- Beides wird mit ins Repo committed

### Woher die Dateien kommen

Die CDNs sind zu, **die npm-Registry ist offen.** `npm pack` lädt ein Paket als
Archiv herunter, ohne etwas zu installieren und ohne eine `package.json`
anzulegen. Geprüft am 16.09.2026 für `gsap`, `lenis`, `animejs` und `three`.

```bash
# AUSSERHALB des Demo-Repos, z.B. im Scratchpad
cd /tmp/libs && npm pack gsap
tar -xzf gsap-*.tgz

cp package/dist/gsap.min.js          <demo-repo>/site/assets/js/
cp package/dist/ScrollTrigger.min.js <demo-repo>/site/assets/js/
```

Die Pfade je Paket: `gsap` und `three` liefern unter `package/dist/`, `lenis`
unter `package/dist/`, `animejs` unter `package/lib/`. Im Zweifel
`tar -tzf <paket>.tgz | grep min.js` statt raten.

**Nur die gebrauchten Dateien kopieren.** Das GSAP-Paket enthält Dutzende
Plugins, von denen eine Demo zwei braucht. Für Schriften gilt dasselbe Verfahren
über Fontsource, im Detail im Skill `design-system`, Abschnitt 2.6.

```html
<!-- vor </body>, nur was die Demo wirklich nutzt -->
<script src="assets/js/gsap.min.js"></script>
<script src="assets/js/ScrollTrigger.min.js"></script>
<script src="assets/js/lenis.min.js"></script>
<script src="js/main.js"></script>
```

## Minimale Start-Snippets

**Lenis (Basis-Setup):**
```js
const lenis = new Lenis();
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

**GSAP + ScrollTrigger (Reveal-Beispiel):**
```js
gsap.registerPlugin(ScrollTrigger);
gsap.from(".reveal", {
  y: 40, autoAlpha: 0, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".reveal", start: "top 80%" }
});
```

**Lenis + ScrollTrigger koppeln** (sonst laufen sie auseinander):
```js
lenis.on("scroll", ScrollTrigger.update);
```

## Zähl-Animationen

Erst die inhaltliche Frage (Skill `website-copy`): Was soll der Besucher aus der
Zahl schließen? Ohne klare Antwort fliegt die Zahl raus, statt animiert zu werden.

**Wann überhaupt ein Zähler?** Nur bei Zahlen, die groß genug sind, dass
Hochzählen etwas erzählt – Faustregel ab etwa 10 Schritten Differenz. Alles
darunter steht statisch. Von 0 auf 2 hochzuzählen ist kein Effekt, nur Geflacker.

**Wenn Zähler, dann mit Startwert nahe am Ziel:**
- Jahreszahl 1946 → `data-from="1926"`. Eine Jahreszahl startet nie bei 0
- Mitarbeiterzahl 30 → `data-from="8"`
- 3 Mio. € → ab 2,5 mit einer Nachkommastelle, sonst zählt es sichtbar „drei Euro"

Die Funktion `initZaehler()` in `site/js/main.js` erwartet:
```
data-count     Zielwert
data-from      Startwert (Standard 0)
data-decimals  Nachkommastellen (Standard 0)
data-prefix / data-suffix
```
Sie formatiert mit `useGrouping: false` (sonst wird aus dem Jahr 1946 ein
„1.946"), hängt das Suffix erst am Endwert an (sonst entstehen Zwischenstände
wie „1 Standorte") und setzt bei `prefers-reduced-motion` direkt den Endwert.

## Fallstricke (real aufgetreten, teuer in Suchzeit)

**CSS-Grundlagen, die ganze Funktionen ausschalten:**
- `body { overflow-x: hidden }` **zerstört `position: sticky`**. Der Body wird
  zum Scroll-Container, der Header kann nicht mehr kleben. Lösung:
  `overflow-x: clip` – steht so im Base-CSS.
- Ein Element mit `backdrop-filter`, `filter`, `transform`, `perspective` oder
  `will-change` ist **Containing Block für `position: fixed`-Kinder**. Ein
  Frosted-Glass-Header mit Fullscreen-Menü darin ist der Klassiker: Das Menü
  wird nur so hoch wie der Header. Lösung: Hintergrund und Blur auf ein
  `::before`-Pseudoelement legen, `will-change` weglassen.
- `[hidden]` wird von `display: flex` geschlagen, weil die Autoren-Regel die
  Browser-Regel überschreibt. Deshalb steht `[hidden] { display: none !important }`
  im Base-CSS.
- Abstände entweder über den Container **oder** über das Kind, nie beides – sonst
  addieren sich zwei Einzüge und schneiden auf Mobil Buttons ab.
- `width: 100%` auf einem Element im Container hebelt dessen Padding aus.

**GSAP:**
- `yPercent` und ein CSS-`transform` auf demselben Element beißen sich: GSAP
  übernimmt den CSS-Wert als Pixel-Y und führt getrenntes yPercent-Tracking, der
  Tween wirkt nicht. Startzustände **nur** per `gsap.set()`.
- GSAP-Snapping und Lenis vertragen sich nicht. Entweder Snapping raus, oder
  Lenis über den Ticker koppeln (siehe oben).
- `fullPage`-Screenshots von gepinnten Sequenzen zeigen große schwarze Flächen.
  Das ist ein Artefakt der Screenshot-Funktion, kein Bug – solche Sequenzen mit
  echtem Scrollen prüfen.

**Sonstiges:**
- Ein Rasterhintergrund als Trennlinien-Trick (`background` plus `gap: 1px`)
  zeigt bei unvollständiger letzter Reihe einen grauen Block. Linien gehören auf
  das Element (`box-shadow`), nicht unter das Raster.

> **Kein Bugfix ohne reproduzierten Messwert.** Der Sticky-Header-Bug oben wurde
> fünfmal gemeldet und viermal falsch diagnostiziert (die Smooth-Scroll-Library
> wurde verdächtigt und ausgebaut, ohne Besserung). Ein einziges
> `getBoundingClientRect().top` nach dem Scrollen hätte es in zwei Minuten gezeigt.

## Pflichtregeln (aus motion-toolkit)

- Nur transform & opacity animieren, nie Layout-Properties.
- `prefers-reduced-motion` respektieren – jede Animation hat einen fertigen
  Endzustand, der auch ohne JS trägt.
- Kein Scroll-Hijacking. `ScrollTrigger.refresh()` nach Layout-Änderungen.
- Auf Mobil UND Desktop prüfen.

## Hinweis GSAP-Lizenz

GSAP inkl. aller Plugins (ScrollSmoother, SplitText, MorphSVG …) ist seit der
Webflow-Übernahme 100% kostenlos, auch kommerziell. Kein Club-Account nötig.
