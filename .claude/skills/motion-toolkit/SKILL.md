---
name: motion-toolkit
description: >
  Entscheidet, welche Animations-Library für welchen Effekt genutzt wird, und
  wie Effekte sparsam, performant und barrierefrei eingesetzt werden. Nutzen in
  der Bau-Phase, sobald Bewegung/Interaktion auf die Seite kommt. Dies ist der
  Dirigent: er wählt das Werkzeug. Die konkrete GSAP-Umsetzung liefern die
  offiziellen Skills gsap-core, gsap-timeline, gsap-scrolltrigger,
  gsap-performance und gsap-utils, die einzeln beim Namen aufgerufen werden.
---

# Motion-Toolkit (Dirigent für Web-Animation)

Wählt das richtige Werkzeug pro Effekt und sorgt für sauberen, sparsamen,
performanten Einsatz. Kein Ersatz für die gsap-Skills – für die konkrete
GSAP-Syntax immer dorthin verweisen. Stack: Vanilla, Libraries lokal unter
`site/assets/js/`, kein React, kein Build-Step.

## Leitprinzip: leichtestes Werkzeug zuerst

Immer die leichteste Lösung nehmen, die den Effekt erzeugt. Wenige, gezielte,
saubere Effekte schlagen ein Effekt-Feuerwerk. Zurückhaltung ist ein
Qualitätsmerkmal – Überladung sieht nach AI und nach Freshman-Portfolio aus.

## Die Entscheidungs-Kaskade

Von leicht nach schwer. Erst weiter unten greifen, wenn die leichtere Ebene
den Effekt nicht liefert.

1. **Natives CSS** – erste Wahl. Hover-States, einfache Fades, Übergänge,
   scroll-driven CSS-Animationen. Null JS-Last.
2. **Lenis** – einmal pro Seite als Basis für sanftes Momentum-Scrolling.
   Setzt das hochwertige "Agentur-Gefühl". Spielt mit GSAP ScrollTrigger zusammen.
3. **GSAP + ScrollTrigger** – das Arbeitspferd für inszenierte Momente:
   scroll-gebundene Animationen, Hero-Sequenzen, Pinning, Text-Reveals, SVG,
   Magnetic Buttons. Umsetzung → `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`.
4. **Anime.js v4** – Mittelweg für JS-Kontrolle ohne GSAP-Gewicht: gestaffelte
   Element-Animationen, Zähler (z.B. "30 Mitarbeiter" hochzählen), SVG-Linien.
5. **Three.js** – nur für echtes 3D, sehr sparsam. 3D-Objekt im Hero,
   WebGL-Hintergrund. Nur wenn der Use-Case es wirklich rechtfertigt.

## Einbindung

**Libraries liegen lokal unter `site/assets/js/`, nicht per CDN** – der Egress-Proxy
der Arbeitsumgebung blockiert CDNs und Google Fonts, eine CDN-Einbindung ist
dort nicht prüfbar. Die konkreten Script-Tags, Start-Snippets und bekannten
Fallstricke stehen in `docs/LIBRARIES.md`; sie werden hier bewusst nicht
wiederholt, damit es nur eine Quelle gibt.

Hinweis: GSAP ist seit der Webflow-Übernahme inkl. aller Plugins (ScrollSmoother,
SplitText, MorphSVG etc.) 100% kostenlos, auch kommerziell.

## Performance-Regeln (nicht verhandelbar)

- **Nur transform & opacity animieren** (translate, scale, rotate), nie
  Layout-Properties (width, height, top, left, margin) – das ruckelt.
- **`will-change: transform`** sparsam für häufig animierte Elemente setzen.
- **Timeline statt verketteter Delays** in GSAP (sauberer, steuerbarer).
- **`ScrollTrigger.refresh()`** nach Layout-Änderungen aufrufen.
- Scroll-Events nie ungedrosselt; ScrollTrigger/requestAnimationFrame nutzen.

## Barrierefreiheit & Sauberkeit (Pflicht)

- **`prefers-reduced-motion` respektieren:** Wer im System Bewegung reduziert
  hat, bekommt reduzierte/keine Animationen. Verhindert Übelkeit, ist Standard.
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **Kein Scroll-Hijacking**, das natürliches Scrollen kaputt macht. Lenis
  glättet, übernimmt aber nicht die Kontrolle gegen den Nutzer.
- Effekte müssen auf **Mobil UND Desktop** sauber laufen (siehe responsive-qa).
  Auf schwächeren Geräten dezenter.

## Anti-Slop bei Effekten

- Nicht jede Sektion braucht eine Animation. Bewegung dort, wo sie Bedeutung
  trägt (Aufmerksamkeit lenken, Hierarchie zeigen), nicht als Deko.
- Keine gleichförmigen "alles faded gleich beim Scrollen"-Reveals über die
  ganze Seite. Variieren oder weglassen.
- Timing menschlich: nicht alles gleich schnell, sinnvolle Easings (power2 o.ä.),
  keine mechanisch-gleichen Sequenzen.

## Ablauf

1. Effekt-Bedarf pro Sektion klären (braucht es überhaupt Bewegung?).
2. Leichtestes passendes Werkzeug aus der Kaskade wählen.
3. Für die GSAP-Umsetzung **den passenden Skill beim Namen aufrufen**,
   sonst wird keiner geladen: `gsap-core` (Tweens, Easing, Stagger,
   matchMedia), `gsap-timeline` (Abfolgen), `gsap-scrolltrigger`
   (Scroll, Pin, Scrub), `gsap-performance` (Ruckler, 60 fps),
   `gsap-utils` (clamp, mapRange, random, snap).
   **Einen Sammelnamen für diese fünf gibt es nicht.** Wer einen erfindet,
   lädt nichts, und die Animation entsteht aus dem Gedächtnis.
4. Performance- & Accessibility-Regeln anwenden (transform/opacity,
   prefers-reduced-motion, kein Hijacking).
5. Auf Mobil und Desktop gegenprüfen.
