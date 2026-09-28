// main.js – Interaktion & Bewegung, Ingenieurbüro René Gansmüller.
// Libraries lokal unter assets/js/ (Lenis, GSAP, ScrollTrigger), per defer
// vor dieser Datei geladen. Einsatz nach Skill motion-toolkit:
//   - Hero-Einblendung: reines CSS (css/hero.css)
//   - Lenis: sanftes Scrollen als Basis
//   - GSAP + ScrollTrigger: nur die Fortschrittslinie im Ablauf
//   - alles andere: CSS-Hover
// Ohne JS ist alles sichtbar; bei prefers-reduced-motion gibt es kein Lenis
// und keine Scroll-Animation, der Endzustand steht sofort.

const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis = null;

function kopfHoehe() {
  const kopf = document.querySelector("[data-kopf]");
  return kopf ? kopf.getBoundingClientRect().height : 0;
}

/* ---------------------------------------------------------------------------
   Scrollen: Lenis als Basis, Anker mit Abstand zum Sticky-Header
--------------------------------------------------------------------------- */
function initScrollen() {
  if (!reduziert && typeof window.Lenis === "function") {
    lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((zeit) => lenis.raf(zeit * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (zeit) => { lenis.raf(zeit); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
}

function scrolleZu(ziel, { fokus = null } = {}) {
  if (!ziel) return;
  const offset = -kopfHoehe();
  const fertig = () => {
    if (fokus) fokus.focus({ preventScroll: true });
  };
  if (lenis) {
    // Maße frisch holen: Schriften, Formularschritte und das Register ändern
    // die Seitenhöhe nach dem Start, Lenis rechnet sonst mit altem Ende.
    lenis.resize();
    // Lenis rechnet scroll-margin-top (base.css: Header-Höhe) selbst ein.
    lenis.scrollTo(ziel, { onComplete: fertig });
  } else {
    const y = ziel.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: reduziert ? "auto" : "smooth" });
    fertig();
  }
}

function initAnker() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute("data-vorbelegen")) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const ziel = document.querySelector(id);
    if (!ziel) return;
    e.preventDefault();
    menueSchliessen();
    history.pushState(null, "", id);
    // Sprung an den Seitenanfang: Fokus mitnehmen, damit Tastatur und
    // Screenreader dort weiterlesen.
    scrolleZu(ziel, { fokus: id === "#top" ? ziel : null });
  });
}

/* ---------------------------------------------------------------------------
   Mobilmenü
--------------------------------------------------------------------------- */
const kopf = document.querySelector("[data-kopf]");
const menueKnopf = document.querySelector("[data-menue]");

// Solange das Mobilmenü offen ist, bleiben Inhalt und Footer für Tastatur
// und Screenreader außen vor (inert), der Fokus bleibt im Menü (S2).
function hintergrundSperren(an) {
  document.querySelectorAll("body > main, body > footer").forEach((el) => {
    el.inert = an;
  });
}

function menueSchliessen() {
  if (!kopf || !kopf.classList.contains("kopf--offen")) return;
  kopf.classList.remove("kopf--offen");
  menueKnopf.setAttribute("aria-expanded", "false");
  const text = menueKnopf.querySelector("[data-menue-text]");
  if (text) text.textContent = "Menü";
  menueKnopf.setAttribute("aria-label", "Menü");
  document.body.classList.remove("is-locked");
  hintergrundSperren(false);
  if (lenis) lenis.start();
}

function initMenue() {
  if (!kopf || !menueKnopf) return;
  menueKnopf.setAttribute("aria-label", "Menü");
  menueKnopf.addEventListener("click", () => {
    const offen = kopf.classList.toggle("kopf--offen");
    menueKnopf.setAttribute("aria-expanded", String(offen));
    const text = menueKnopf.querySelector("[data-menue-text]");
    const label = offen ? "Menü schließen" : "Menü";
    if (text) text.textContent = label;
    menueKnopf.setAttribute("aria-label", label);
    document.body.classList.toggle("is-locked", offen);
    hintergrundSperren(offen);
    if (lenis) (offen ? lenis.stop() : lenis.start());
    if (offen) {
      const erster = kopf.querySelector(".kopf__nav a");
      if (erster) erster.focus();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && kopf.classList.contains("kopf--offen")) {
      menueSchliessen();
      menueKnopf.focus();
    }
  });
  window.matchMedia("(min-width: 1101px)").addEventListener("change", (m) => {
    if (m.matches) menueSchliessen();
  });
}

/* ---------------------------------------------------------------------------
   Anfrage-Funnel (docs/FUNNEL.md): 2 Pflichtfragen + Kontakt, Vorbelegung
   über ?leistung= und ?auftraggeber=, Danke-Screen mit freiwilligen Fragen.
--------------------------------------------------------------------------- */
const LEISTUNGEN = {
  projektsteuerung: "Projektsteuerung",
  bauueberwachung: "Bauüberwachung",
  baubetreuung: "Baubetreuung",
  bauberatung: "Bauberatung",
  "alle-leistungsphasen": "Vorhaben mit Planung"
};
const AUFTRAGGEBER = [
  "bautraeger", "projektentwickler", "wohnungsunternehmen", "gewerblich",
  "planungsbuero", "generalplaner", "privat"
];

const funnel = (() => {
  const box = document.querySelector("[data-funnel]");
  if (!box) return null;

  const form = box.querySelector("[data-form]");
  const schritte = [...form.querySelectorAll("[data-step]")];
  const gesamt = schritte.length;
  const anzeige = box.querySelector("[data-schrittanzeige]");
  const zurueck = form.querySelector("[data-zurueck]");
  const weiter = form.querySelector("[data-weiter]");
  const absenden = form.querySelector("[data-absenden]");
  const nav = form.querySelector("[data-nav]");
  const chip = form.querySelector("[data-chip]");
  const chipWert = form.querySelector("[data-chip-wert]");
  const leistungFeld = form.querySelector("[data-leistung]");
  const danke = box.querySelector("[data-danke]");
  const fuss = box.querySelector("[data-fuss]");
  let aktuell = 1;

  function zeige(nr, { fokus = true } = {}) {
    aktuell = nr;
    schritte.forEach((s, i) => { s.hidden = i + 1 !== nr; });
    zurueck.hidden = nr === 1;
    weiter.hidden = nr === gesamt;
    absenden.hidden = nr !== gesamt;
    anzeige.textContent = `Schritt ${nr} von ${gesamt}`;
    box.dataset.schritt = String(nr);
    if (fokus) {
      schritte[nr - 1].focus({ preventScroll: true });
      // Mobil liegt der Kasten nach dem Wechsel oft unter dem Header (S3).
      if (box.getBoundingClientRect().top < kopfHoehe()) scrolleZu(box);
    }
  }

  function gewaehlt(name) {
    return form.querySelector(`input[name="${name}"]:checked`);
  }

  function fehler(el, an) {
    if (!el) return;
    el.hidden = !an;
  }

  function pruefeAuswahl(nr) {
    const schritt = schritte[nr - 1];
    const radio = schritt.querySelector('input[type="radio"]');
    if (!radio) return true;
    const ok = !!gewaehlt(radio.name);
    const fehlerEl = schritt.querySelector("[data-fehler]");
    fehler(fehlerEl, !ok);
    schritt.querySelectorAll('input[type="radio"]').forEach((r) => {
      r.setAttribute("aria-invalid", String(!ok));
    });
    if (!ok) radio.focus();
    return ok;
  }

  function feldPruefen(input, gueltig) {
    const fehlerEl = document.getElementById(input.getAttribute("aria-describedby"));
    input.setAttribute("aria-invalid", String(!gueltig));
    fehler(fehlerEl, !gueltig);
    return gueltig;
  }

  function pruefeKontakt() {
    const name = form.querySelector("#f-name");
    const mail = form.querySelector("#f-mail");
    const einw = form.querySelector("#f-einwilligung");
    const ergebnisse = [
      [name, feldPruefen(name, name.value.trim().length > 1)],
      [mail, feldPruefen(mail, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim()))],
      [einw, feldPruefen(einw, einw.checked)]
    ];
    const erster = ergebnisse.find(([, ok]) => !ok);
    if (erster) erster[0].focus();
    return !erster;
  }

  // Hinweise bei „Privates Eigenheim“ und „über 15 Mio. €“: Absenden bleibt
  // möglich, die Anfrage wird markiert (DEMO-SPEC, Bruno 27.09.2026).
  function hinweiseAktualisieren() {
    const a = gewaehlt("auftraggeber");
    const v = gewaehlt("bauvolumen");
    form.querySelector("[data-hinweis-privat]").hidden = !(a && a.value === "privat");
    form.querySelector("[data-hinweis-gross]").hidden = !(v && v.value === "ueber-15-mio");
  }

  form.addEventListener("change", (e) => {
    if (e.target.type === "radio") {
      hinweiseAktualisieren();
      const schritt = e.target.closest("[data-step]");
      if (schritt) {
        fehler(schritt.querySelector("[data-fehler]"), false);
        schritt.querySelectorAll('input[type="radio"]').forEach((r) => r.removeAttribute("aria-invalid"));
      }
    }
  });
  // Fehler am Feld verschwindet, sobald die Eingabe passt (auf Verlassen).
  // Nur das verlassene Feld prüfen und nichts fokussieren: Sonst verschiebt
  // das Ausblenden der Meldung das Layout zwischen mousedown und mouseup,
  // und der nächste Klick (z. B. auf die Einwilligung) geht ins Leere.
  const regeln = {
    "f-name": (v) => v.trim().length > 1,
    "f-mail": (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
  };
  form.querySelectorAll("#f-name, #f-mail").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true" && regeln[input.id](input.value)) {
        feldPruefen(input, true);
      }
    });
  });
  form.querySelector("#f-einwilligung").addEventListener("change", (e) => {
    if (e.target.checked) feldPruefen(e.target, true);
  });

  weiter.addEventListener("click", () => {
    if (pruefeAuswahl(aktuell)) zeige(aktuell + 1);
  });
  zurueck.addEventListener("click", () => zeige(aktuell - 1));

  // Enter in einem Radio soll weiterführen, nicht absenden.
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.type === "radio" && aktuell < gesamt) {
      e.preventDefault();
      weiter.click();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (aktuell < gesamt) { weiter.click(); return; }
    if (!pruefeKontakt()) return;
    const a = gewaehlt("auftraggeber");
    const v = gewaehlt("bauvolumen");
    // Markierung für René Gansmüller (im Projekt Teil der Übermittlung).
    box.dataset.markiert = String(
      (a && a.value === "privat") || (v && v.value === "ueber-15-mio")
    );
    form.hidden = true;
    nav.hidden = true;
    fuss.hidden = true;
    box.dataset.schritt = "fertig";
    danke.hidden = false;
    const titel = danke.querySelector("[data-danke-titel]");
    titel.focus({ preventScroll: true });
    scrolleZu(box);
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });

  const zusatz = danke.querySelector("[data-zusatz]");
  zusatz.addEventListener("submit", (e) => {
    e.preventDefault();
    zusatz.hidden = true;
    const meldung = danke.querySelector("[data-zusatz-danke]");
    meldung.textContent = "Danke, damit lässt sich das Gespräch gut vorbereiten.";
    meldung.focus({ preventScroll: true });
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });

  function leistungSetzen(wert) {
    if (!wert || !LEISTUNGEN[wert]) return;
    leistungFeld.value = wert;
    chipWert.textContent = LEISTUNGEN[wert];
    chip.hidden = false;
  }
  form.querySelector("[data-chip-weg]").addEventListener("click", () => {
    leistungFeld.value = "";
    chip.hidden = true;
    schritte[aktuell - 1].focus();
  });

  function auftraggeberSetzen(wert) {
    if (!AUFTRAGGEBER.includes(wert)) return false;
    const r = form.querySelector(`input[name="auftraggeber"][value="${wert}"]`);
    if (!r) return false;
    r.checked = true;
    hinweiseAktualisieren();
    return true;
  }

  // Vorbelegung aus Parametern. Springt bei gesetztem Auftraggeber auf
  // Schritt 2 (FUNNEL.md: ein Schritt weniger an der Abbruchstelle).
  function vorbelegen(params, { fokus }) {
    leistungSetzen(params.get("leistung"));
    const hatAuftraggeber = auftraggeberSetzen(params.get("auftraggeber"));
    if (!form.hidden) zeige(hatAuftraggeber ? 2 : aktuell, { fokus });
  }

  zeige(1, { fokus: false });
  return { box, vorbelegen };
})();

function initVorbelegung() {
  if (!funnel) return;
  const params = new URLSearchParams(window.location.search);
  if (params.has("leistung") || params.has("auftraggeber")) {
    funnel.vorbelegen(params, { fokus: false });
  }
  // Links mit ?leistung= / ?auftraggeber=: kein Neuladen, Wert setzen und
  // direkt zum Formular.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-vorbelegen]");
    if (!a) return;
    const url = new URL(a.getAttribute("href"), window.location.href);
    e.preventDefault();
    menueSchliessen();
    history.replaceState(null, "", url.search + url.hash);
    funnel.vorbelegen(url.searchParams, { fokus: false });
    // Einspaltig (Mobil, Tablet) steht das Formular unter der Einleitung:
    // dann direkt zum Formular, sonst an den Kopf des Abschnitts.
    const einspaltig = window.matchMedia("(max-width: 1100px)").matches;
    const ziel = document.querySelector(einspaltig ? "#anfrage-formular" : "#anfrage");
    const schritt = funnel.box.querySelector("[data-step]:not([hidden])");
    scrolleZu(ziel, { fokus: schritt });
  });
}

/* ---------------------------------------------------------------------------
   Ablauf: Fortschrittslinie (GSAP + ScrollTrigger, scrub). Die Stationen
   füllen sich, sobald die Linie sie erreicht. Ohne JS oder bei reduzierter
   Bewegung steht die Linie voll und alle Stationen sind gefüllt.
--------------------------------------------------------------------------- */
function initAblauf() {
  const wrap = document.querySelector("[data-stationen]");
  if (!wrap || reduziert || !window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const abschnitt = wrap.closest(".ablauf");
  const linie = wrap.querySelector("[data-linie]");
  abschnitt.classList.add("ablauf--animiert");

  gsap.fromTo(linie, { scaleY: 0 }, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: wrap,
      start: "top 65%",
      end: "bottom 65%",
      scrub: 0.4
    }
  });

  wrap.querySelectorAll(".station").forEach((station) => {
    ScrollTrigger.create({
      trigger: station,
      start: "top 65%",
      onEnter: () => station.classList.add("ist-erreicht"),
      onLeaveBack: () => station.classList.remove("ist-erreicht")
    });
  });

  // Schriften verschieben die Höhen: danach neu messen.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollen();
  initMenue();
  initAnker();
  initVorbelegung();
  initAblauf();
});
