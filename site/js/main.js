// main.js – Interaktion & Animation je Demo.
// Libraries liegen lokal unter assets/js/ und werden davor im HTML eingebunden
// (der Egress-Proxy blockiert CDNs – siehe docs/LIBRARIES.md).
// Einsatz-Logik: Skill motion-toolkit. Fallstricke: docs/LIBRARIES.md.
// Regeln: nur transform/opacity animieren, kein Scroll-Hijacking,
// prefers-reduced-motion respektieren (greift bereits per CSS in base.css).

/**
 * Zähl-Animation für Kennzahlen.
 *
 *   <span data-count="30" data-from="8" data-suffix=" Mitarbeiter"></span>
 *   <span data-count="1946" data-from="1926"></span>
 *   <span data-count="3" data-from="2.5" data-decimals="1" data-suffix=" Mio. €"></span>
 *
 * Nur einsetzen, wo Hochzählen etwas erzählt (Faustregel ab ~10 Schritten
 * Differenz). Kleinere Zahlen stehen statisch – von 0 auf 2 zu zählen ist kein
 * Effekt, nur Geflacker. Inhaltliche Regeln: Skill website-copy.
 */
function initZaehler(root = document) {
  const elemente = root.querySelectorAll("[data-count]");
  if (!elemente.length) return;

  const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // useGrouping: false, sonst wird aus dem Jahr 1946 ein "1.946".
  const formatieren = (wert, decimals) =>
    wert.toLocaleString("de-DE", {
      useGrouping: false,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

  // Suffix erst am Endwert, sonst entstehen Zwischenstände wie "1 Standorte".
  const anzeigen = (el, wert, decimals, fertig) => {
    const prefix = el.dataset.prefix || "";
    const suffix = fertig ? el.dataset.suffix || "" : "";
    el.textContent = prefix + formatieren(wert, decimals) + suffix;
  };

  const zaehlen = (el) => {
    const ziel = parseFloat(el.dataset.count);
    const start = parseFloat(el.dataset.from ?? 0);
    const decimals = parseInt(el.dataset.decimals ?? 0, 10);
    const dauer = parseInt(el.dataset.duration ?? 1400, 10);

    if (reduziert || !Number.isFinite(ziel)) {
      anzeigen(el, Number.isFinite(ziel) ? ziel : start, decimals, true);
      return;
    }

    const beginn = performance.now();
    const schritt = (jetzt) => {
      const fortschritt = Math.min((jetzt - beginn) / dauer, 1);
      const eased = 1 - Math.pow(1 - fortschritt, 3);
      anzeigen(el, start + (ziel - start) * eased, decimals, fortschritt === 1);
      if (fortschritt < 1) requestAnimationFrame(schritt);
    };
    requestAnimationFrame(schritt);
  };

  const beobachter = new IntersectionObserver((eintraege, obs) => {
    eintraege.forEach((eintrag) => {
      if (!eintrag.isIntersecting) return;
      zaehlen(eintrag.target);
      obs.unobserve(eintrag.target);
    });
  }, { threshold: 0.4 });

  elemente.forEach((el) => {
    const start = parseFloat(el.dataset.from ?? 0);
    const decimals = parseInt(el.dataset.decimals ?? 0, 10);
    anzeigen(el, start, decimals, false);
    beobachter.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initZaehler();
  // Weitere demo-spezifische Initialisierung hier.
});
