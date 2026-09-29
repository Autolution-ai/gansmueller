// main.js – Interaktion, Ingenieurbüro René Gansmüller.
// Stil nach Referenz (docs/REFERENZ-ANALYSE.md): Die Seite bewegt sich nur,
// wenn man sie anfasst. Keine Scroll- und Ladeanimationen, keine Libraries
// (Lenis und GSAP sind entfernt). Hier stehen nur Mobilmenü, Sprünge zu
// Ankern und der Anfrage-Funnel. Ohne JS ist alles sichtbar und bedienbar.

function kopfHoehe() {
  const kopf = document.querySelector("[data-kopf]");
  return kopf ? kopf.getBoundingClientRect().height : 0;
}

// Sprung ohne Animation (Referenz: scroll-behavior auto). scrollIntoView
// beachtet scroll-margin-top, der Header verdeckt das Ziel also nicht.
function scrolleZu(ziel, { fokus = null } = {}) {
  if (!ziel) return;
  ziel.scrollIntoView({ block: "start" });
  if (fokus) fokus.focus({ preventScroll: true });
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
   Anfrage-Funnel (docs/FUNNEL.md): Leistung, Wer fragt an, Bauvolumen,
   Kontakt. Was über einen Button feststeht (?leistung=, ?auftraggeber=),
   wird übersprungen und steht als Chip über dem Formular; „ändern“ holt den
   Schritt zurück in den Weg. Die Schrittanzeige zählt nur den Weg, der
   tatsächlich gegangen wird („Schritt 1 von 2“ bis „Schritt 1 von 4“).
   Danke-Screen mit freiwilligen Fragen.
--------------------------------------------------------------------------- */
const LEISTUNGEN = {
  projektsteuerung: "Projektsteuerung",
  bauueberwachung: "Bauüberwachung",
  baubetreuung: "Baubetreuung",
  bauberatung: "Bauberatung",
  "alle-leistungsphasen": "Vorhaben mit Planung",
  offen: "Noch offen"
};
const AUFTRAGGEBER = [
  "bautraeger", "projektentwickler", "wohnungsunternehmen", "gewerblich",
  "planungsbuero", "generalplaner", "privat"
];
const GROSS_AB = 15000000;

const funnel = (() => {
  const box = document.querySelector("[data-funnel]");
  if (!box) return null;

  const form = box.querySelector("[data-form]");
  const REIHE = ["leistung", "auftraggeber", "bauvolumen", "kontakt"];
  const schritte = Object.fromEntries(REIHE.map((n) => [n, form.querySelector(`[data-step="${n}"]`)]));
  const anzeige = box.querySelector("[data-schrittanzeige]");
  const zurueck = form.querySelector("[data-zurueck]");
  const weiter = form.querySelector("[data-weiter]");
  const absenden = form.querySelector("[data-absenden]");
  const nav = form.querySelector("[data-nav]");
  const chips = form.querySelector("[data-chips]");
  const betragFeld = form.querySelector("[data-betrag-feld]");
  const betrag = form.querySelector("[data-betrag]");
  const danke = box.querySelector("[data-danke]");
  const fuss = box.querySelector("[data-fuss]");
  const uebersprungen = new Set();
  let aktuell = REIHE[0];

  const weg = () => REIHE.filter((n) => !uebersprungen.has(n));

  function zeige(name, { fokus = true } = {}) {
    aktuell = name;
    const liste = weg();
    const index = liste.indexOf(name);
    REIHE.forEach((n) => { schritte[n].hidden = n !== name; });
    zurueck.hidden = index <= 0;
    weiter.hidden = name === "kontakt";
    absenden.hidden = name !== "kontakt";
    anzeige.textContent = `Schritt ${index + 1} von ${liste.length}`;
    box.dataset.schritt = name;
    box.style.setProperty("--fortschritt", String((index + 1) / liste.length));
    chipsAktualisieren();
    if (fokus) {
      schritte[name].focus({ preventScroll: true });
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

  // Betrag: nur Ziffern, mit Tausenderpunkten angezeigt
  const betragWert = () => Number((betrag.value || "").replace(/\D/g, "")) || 0;
  betrag.addEventListener("input", () => {
    const ziffern = betrag.value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 12);
    const ende = betrag.selectionStart === betrag.value.length;
    betrag.value = ziffern ? Number(ziffern).toLocaleString("de-DE") : "";
    if (ende) betrag.setSelectionRange(betrag.value.length, betrag.value.length);
    if (betrag.getAttribute("aria-invalid") === "true" && betragWert() > 0) feldPruefen(betrag, true);
    hinweiseAktualisieren();
  });

  function pruefeAuswahl(name) {
    const schritt = schritte[name];
    const radio = schritt.querySelector('input[type="radio"]');
    if (!radio) return true;
    const auswahl = gewaehlt(radio.name);
    const ok = !!auswahl;
    fehler(schritt.querySelector("[data-fehler]"), !ok);
    schritt.querySelectorAll('input[type="radio"]').forEach((r) => {
      r.setAttribute("aria-invalid", String(!ok));
    });
    if (!ok) { radio.focus(); return false; }
    if (auswahl.value === "eigener-betrag" && !feldPruefen(betrag, betragWert() > 0)) {
      betrag.focus();
      return false;
    }
    return true;
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

  const istGross = () => {
    const v = gewaehlt("bauvolumen");
    return !!v && (v.value === "ueber-15-mio" || (v.value === "eigener-betrag" && betragWert() > GROSS_AB));
  };

  // Hinweise bei „Privates Eigenheim“ und über 15 Mio. € (Auswahl oder
  // eigener Betrag): Absenden bleibt möglich, die Anfrage wird markiert.
  function hinweiseAktualisieren() {
    const a = gewaehlt("auftraggeber");
    const v = gewaehlt("bauvolumen");
    form.querySelector("[data-hinweis-privat]").hidden = !(a && a.value === "privat");
    form.querySelector("[data-hinweis-gross]").hidden = !istGross();
    const eigen = !!v && v.value === "eigener-betrag";
    if (betragFeld.hidden === eigen) {
      betragFeld.hidden = !eigen;
      if (!eigen) feldPruefen(betrag, true);
    }
  }

  function chipsAktualisieren() {
    let sichtbar = 0;
    chips.querySelectorAll("[data-chip]").forEach((chip) => {
      const name = chip.dataset.chip;
      const auswahl = gewaehlt(name);
      const zeigen = uebersprungen.has(name) && !!auswahl;
      chip.hidden = !zeigen;
      if (zeigen) {
        sichtbar++;
        chip.querySelector("[data-chip-wert]").textContent =
          auswahl.closest("label").querySelector("span").textContent;
      }
    });
    chips.hidden = sichtbar === 0;
  }

  form.addEventListener("change", (e) => {
    if (e.target.type === "radio") {
      hinweiseAktualisieren();
      const schritt = e.target.closest("[data-step]");
      if (schritt) {
        fehler(schritt.querySelector("[data-fehler]"), false);
        schritt.querySelectorAll('input[type="radio"]').forEach((r) => r.removeAttribute("aria-invalid"));
      }
      if (e.target.value === "eigener-betrag") betrag.focus();
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

  function nachbar(richtung) {
    const liste = weg();
    return liste[liste.indexOf(aktuell) + richtung];
  }

  weiter.addEventListener("click", () => {
    if (pruefeAuswahl(aktuell) && nachbar(1)) zeige(nachbar(1));
  });
  zurueck.addEventListener("click", () => { if (nachbar(-1)) zeige(nachbar(-1)); });

  // „ändern“ am Chip: Schritt zurück in den Weg holen und dorthin springen.
  chips.addEventListener("click", (e) => {
    const knopf = e.target.closest("[data-chip-aendern]");
    if (!knopf) return;
    uebersprungen.delete(knopf.dataset.chipAendern);
    zeige(knopf.dataset.chipAendern);
  });

  // Enter in einem Radio oder im Betrag soll weiterführen, nicht absenden.
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.target.type === "radio" || e.target === betrag) && aktuell !== "kontakt") {
      e.preventDefault();
      weiter.click();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (aktuell !== "kontakt") { weiter.click(); return; }
    if (!pruefeKontakt()) return;
    const a = gewaehlt("auftraggeber");
    // Markierung für René Gansmüller (im Projekt Teil der Übermittlung).
    box.dataset.markiert = String((a && a.value === "privat") || istGross());
    form.hidden = true;
    nav.hidden = true;
    fuss.hidden = true;
    box.dataset.schritt = "fertig";
    box.style.setProperty("--fortschritt", "1");
    danke.hidden = false;
    const titel = danke.querySelector("[data-danke-titel]");
    titel.focus({ preventScroll: true });
    scrolleZu(box);
  });

  const zusatz = danke.querySelector("[data-zusatz]");
  zusatz.addEventListener("submit", (e) => {
    e.preventDefault();
    zusatz.hidden = true;
    const meldung = danke.querySelector("[data-zusatz-danke]");
    meldung.textContent = "Danke, damit lässt sich das Gespräch gut vorbereiten.";
    meldung.focus({ preventScroll: true });
  });

  function waehlen(name, wert) {
    const r = form.querySelector(`input[name="${name}"][value="${CSS.escape(wert || "")}"]`);
    if (!r) return false;
    r.checked = true;
    fehler(schritte[name].querySelector("[data-fehler]"), false);
    return true;
  }

  // Vorbelegung aus Parametern: gesetzte Werte wählen, ihre Schritte
  // überspringen und am Anfang des verbleibenden Wegs beginnen.
  function vorbelegen(params, { fokus }) {
    const leistung = params.get("leistung");
    const auftraggeber = params.get("auftraggeber");
    if (leistung && LEISTUNGEN[leistung] && waehlen("leistung", leistung)) uebersprungen.add("leistung");
    if (AUFTRAGGEBER.includes(auftraggeber) && waehlen("auftraggeber", auftraggeber)) uebersprungen.add("auftraggeber");
    hinweiseAktualisieren();
    if (!form.hidden) zeige(weg()[0], { fokus });
  }

  zeige(REIHE[0], { fokus: false });
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
   Register einklappen: die ersten 6 Objektzeilen sichtbar, der Rest per Knopf.
   Ohne JS bleibt die Tabelle vollständig offen.
--------------------------------------------------------------------------- */
function initRegister() {
  const karte = document.querySelector("[data-register]");
  const knopf = document.querySelector("[data-register-knopf]");
  if (!karte || !knopf) return;
  const text = knopf.querySelector("[data-register-knopf-text]");
  const SICHTBAR = 6;
  // Alle Zeilen nach der 6. Objektzeile, einschließlich späterer Gruppenköpfe.
  const zeilen = [...karte.querySelectorAll("tbody tr")];
  let objekte = 0;
  const weitere = zeilen.filter((tr) => {
    if (!tr.classList.contains("gruppe")) objekte++;
    return objekte > SICHTBAR || (tr.classList.contains("gruppe") && objekte >= SICHTBAR);
  });
  const setzen = (offen) => {
    weitere.forEach((tr) => { tr.hidden = !offen; });
    karte.classList.toggle("ist-eingeklappt", !offen);
    knopf.setAttribute("aria-expanded", String(offen));
    text.textContent = offen ? "Weniger anzeigen" : "Alle 20 Objekte anzeigen";
  };
  knopf.hidden = false;
  setzen(false);
  knopf.addEventListener("click", () => {
    const offen = knopf.getAttribute("aria-expanded") !== "true";
    setzen(offen);
    // Beim Einklappen springt der Knopf nach oben: im Blick behalten.
    if (!offen) knopf.scrollIntoView({ block: "nearest" });
    knopf.focus({ preventScroll: true });
  });
}

/* ---------------------------------------------------------------------------
   Bauherren-Band: Abstand und Bewegung.
   1. Abstand: Eine Liste (6 Marken + Abstände) ist mindestens so breit wie
      das Fenster plus die breiteste Marke. So ist dieselbe Marke nie zweimal
      gleichzeitig zu sehen (Wunsch Bruno). Neu gemessen bei Größenänderung.
   2. Bewegung per requestAnimationFrame mit rund 21 px/s. Bei Hover bremst
      das Band in 0,4 s auf langsames Kriechen ab und läuft danach ebenso
      sanft wieder an, statt hart stehenzubleiben. Außerhalb des Bildes und
      bei verdecktem Tab ruht es. Bei reduzierter Bewegung: nichts (CSS zeigt
      dann eine statische Reihe).
--------------------------------------------------------------------------- */
function initMarquee() {
  const band = document.querySelector("[data-marquee]");
  if (!band) return;
  const spur = band.querySelector(".marquee__spur");
  const liste = band.querySelector(".marquee__liste");
  const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduziert.matches) return;

  const TEMPO = 21;        // px/s
  const KRIECHEN = 3;      // px/s unter der Maus
  const UEBERGANG = 0.4;   // s
  let periode = 0;

  function abstandSetzen() {
    band.style.removeProperty("--marquee-abstand");
    const eintraege = [...liste.children];
    const summe = eintraege.reduce((n, li) => n + li.getBoundingClientRect().width, 0);
    const breiteste = Math.max(...eintraege.map((li) => li.getBoundingClientRect().width));
    const cssAbstand = parseFloat(getComputedStyle(liste).columnGap) || 0;
    // Liste = Summe + 5 Lücken innen + 2 halbe Lücken als Rand = Summe + 6 Lücken
    const noetig = (window.innerWidth + breiteste + 24 - summe) / 6;
    const abstand = Math.max(cssAbstand, Math.ceil(noetig));
    band.style.setProperty("--marquee-abstand", `${abstand}px`);
    periode = liste.getBoundingClientRect().width;
    band.dataset.periode = String(Math.round(periode));
  }

  let x = 0;
  let tempo = TEMPO;
  let ziel = TEMPO;
  let letzte = null;
  let sichtbar = true;
  let rahmen = null;

  function schritt(jetzt) {
    rahmen = null;
    if (!sichtbar || document.hidden) { letzte = null; return; }
    const dt = letzte === null ? 0 : Math.min(0.1, (jetzt - letzte) / 1000);
    letzte = jetzt;
    // exponentielle Annäherung an das Zieltempo: nach 0,4 s gut 95 %
    tempo += (ziel - tempo) * (1 - Math.exp(-dt * 3 / UEBERGANG));
    x -= tempo * dt;
    if (periode > 0 && -x >= periode) x += periode;
    spur.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    rahmen = requestAnimationFrame(schritt);
  }
  const starten = () => { if (rahmen === null) rahmen = requestAnimationFrame(schritt); };

  band.classList.add("marquee--js");
  abstandSetzen();
  band.addEventListener("mouseenter", () => { ziel = KRIECHEN; });
  band.addEventListener("mouseleave", () => { ziel = TEMPO; });
  let zeitgeber = null;
  window.addEventListener("resize", () => {
    clearTimeout(zeitgeber);
    zeitgeber = setTimeout(() => { abstandSetzen(); x = x % periode; }, 150);
  });
  document.addEventListener("visibilitychange", starten);
  new IntersectionObserver((e) => { sichtbar = e[0].isIntersecting; if (sichtbar) starten(); }).observe(band);
  reduziert.addEventListener("change", () => {
    if (!reduziert.matches) return;
    band.classList.remove("marquee--js");
    spur.style.removeProperty("transform");
    sichtbar = false;
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(abstandSetzen);
  window.addEventListener("load", abstandSetzen);
  starten();
}

/* ---------------------------------------------------------------------------
   Für wen: je Weg eine Tab-Liste der Rollen (WAI-ARIA Tabs, senkrecht:
   Pfeil hoch/runter, Pos1/Ende). Hover, Fokus und Klick wählen die Rolle;
   darunter stehen Beschreibung und CTA „Projekt prüfen lassen“ mit
   ?auftraggeber=. Die Rolle selbst führt nirgendwohin (Bruno).
--------------------------------------------------------------------------- */
function initWege() {
  const wurzel = document.querySelector("[data-wege]");
  if (!wurzel) return;
  wurzel.classList.add("wege--js");
  // Ein zentraler CTA unter beiden Spalten (Bruno): sein Ziel folgt der
  // zuletzt gewählten Rolle, Standard Bauträger.
  const cta = document.querySelector("[data-wege-cta]");
  wurzel.querySelectorAll("[data-weg]").forEach((weg) => {
    const tabs = [...weg.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    function waehlen(i, { fokus = false, ziel = true } = {}) {
      if (ziel && cta) cta.setAttribute("href", `?auftraggeber=${tabs[i].id.replace("rolle-", "")}#anfrage`);
      tabs.forEach((t, j) => {
        const aktiv = i === j;
        t.setAttribute("aria-selected", String(aktiv));
        t.tabIndex = aktiv ? 0 : -1;
        panels[j].classList.toggle("rollen-text--aktiv", aktiv);
        if (aktiv) panels[j].removeAttribute("inert"); else panels[j].setAttribute("inert", "");
        panels[j].setAttribute("aria-hidden", String(!aktiv));
      });
      if (fokus) tabs[i].focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => waehlen(i));
      t.addEventListener("mouseenter", () => waehlen(i));
      t.addEventListener("keydown", (e) => {
        const letzte = tabs.length - 1;
        let ziel = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") ziel = i === letzte ? 0 : i + 1;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") ziel = i === 0 ? letzte : i - 1;
        else if (e.key === "Home") ziel = 0;
        else if (e.key === "End") ziel = letzte;
        if (ziel === null) return;
        e.preventDefault();
        waehlen(ziel, { fokus: true });
      });
    });
    waehlen(Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true")), { ziel: false });
  });
}

/* ---------------------------------------------------------------------------
   Ablauf: ab 900 px Tabs mit einem Detailfeld (WAI-ARIA Tabs, automatische
   Aktivierung, Pfeiltasten, Pos1/Ende). Die Liste bleibt im Dokument und ist
   darunter (mobil, ohne JS) die sichtbare Fassung.
   Autoplay (Wunsch Bruno): Die Linie füllt sich langsam bis zur nächsten
   Station, dann wechselt das Detailfeld. Start erst, wenn der Zeitstrahl zu
   sehen ist; Pause bei Hover, Fokus, verdecktem Tab oder außerhalb des
   Bildes; nach einer Auswahl von Hand 15 s Ruhe, dann geht es weiter. Bei
   reduzierter Bewegung kein Autoplay. Autoplay setzt nie den Fokus.
--------------------------------------------------------------------------- */
function initZeitstrahl() {
  const wurzel = document.querySelector("[data-zeitstrahl]");
  if (!wurzel) return;
  const stationen = [...wurzel.querySelectorAll(".zs-station")].map((li) => ({
    nr: li.dataset.station,
    titel: li.querySelector(".zs-titel").innerHTML,
    text: li.querySelector(".zs-beschreibung").textContent,
    ergebnis: li.querySelector(".zs-ergebnis__text").textContent,
    phase: li.closest(".zs-gruppe").querySelector(".zs-gruppe__titel").textContent,
    bau: li.closest(".zs-gruppe").classList.contains("zs-gruppe--bau"),
    details: li.querySelector("details")
  }));

  // Mobil: Beschreibungen eingeklappt (ohne JS bleiben sie offen).
  const mobil = window.matchMedia("(max-width: 899px)");
  const mobilSetzen = () => stationen.forEach((s) => { s.details.open = !mobil.matches; });
  mobilSetzen();
  mobil.addEventListener("change", mobilSetzen);

  const zweistellig = (n) => String(n).padStart(2, "0");
  const vor = stationen.filter((s) => !s.bau);
  const tabs = document.createElement("div");
  tabs.className = "zs-tabs";
  tabs.innerHTML = `
    <div class="zs-tabliste" role="tablist" aria-label="Stationen der Zusammenarbeit">
      <span class="zs-phase zs-phase--vor" aria-hidden="true"><span class="label">${vor[0].phase}</span></span>
      <span class="zs-phase zs-phase--bau" aria-hidden="true"><span class="label">${stationen[stationen.length - 1].phase}</span></span>
      <span class="zs-linie" aria-hidden="true"><span></span></span>
      ${stationen.map((s) => `
        <button class="zs-tab${s.bau ? " zs-tab--bau" : ""}" type="button" role="tab" id="zs-tab-${s.nr}"
          aria-controls="zs-panel" aria-selected="false" tabindex="-1">
          <span class="zs-nr" aria-hidden="true">${zweistellig(s.nr)}</span>
          <span>${s.titel}</span>
        </button>`).join("")}
    </div>
    <div class="zs-unten">
      <div class="zs-panel" id="zs-panel" role="tabpanel" tabindex="0">
        <span class="zs-panel__nr" aria-hidden="true"></span>
        <p class="zs-panel__phase" data-panel-phase></p>
        <h3 data-panel-titel></h3>
        <p data-panel-text></p>
        <p class="zs-panel__ergebnis"><span class="zs-ergebnis__label">Ergebnis</span><span data-panel-ergebnis></span></p>
      </div>
    </div>`;
  const abschluss = wurzel.querySelector(".zs-abschluss");
  wurzel.insertBefore(tabs, abschluss);
  tabs.querySelector(".zs-unten").appendChild(abschluss.cloneNode(true));
  abschluss.classList.add("zs-abschluss--liste");
  wurzel.classList.add("zeitstrahl--tabs");

  const knoepfe = [...tabs.querySelectorAll('[role="tab"]')];
  const panel = tabs.querySelector('[role="tabpanel"]');
  const fuellung = tabs.querySelector(".zs-linie span");
  const letzte = knoepfe.length - 1;
  let aktuell = 0;

  function waehlen(index, { fokus = false } = {}) {
    const s = stationen[index];
    aktuell = index;
    knoepfe.forEach((k, i) => {
      const aktiv = i === index;
      k.setAttribute("aria-selected", String(aktiv));
      k.tabIndex = aktiv ? 0 : -1;
      k.classList.toggle("zs-tab--erreicht", i < index);
    });
    tabs.dataset.aktiv = s.nr;
    panel.classList.toggle("zs-panel--bau", s.bau);
    panel.setAttribute("aria-labelledby", `zs-tab-${s.nr}`);
    panel.querySelector(".zs-panel__nr").textContent = zweistellig(s.nr);
    panel.querySelector("[data-panel-phase]").textContent = s.phase;
    panel.querySelector("[data-panel-titel]").innerHTML = s.titel;
    panel.querySelector("[data-panel-text]").textContent = s.text;
    panel.querySelector("[data-panel-ergebnis]").textContent = " " + s.ergebnis;
    if (fokus) knoepfe[index].focus();
  }

  // ---- Autoplay ------------------------------------------------------------
  const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)");
  const breit = window.matchMedia("(min-width: 900px)");
  const zustand = { sichtbar: false, hover: false, fokus: false, ruhe: false };
  let lauf = null;
  let ruheUhr = null;

  // Lesezeit je Station aus der Textlänge: 6,5 bis 9 s.
  const dauer = (i) => {
    const zeichen = stationen[i].text.length + stationen[i].ergebnis.length;
    return Math.round(Math.min(9000, Math.max(6500, 3000 + zeichen * 30)));
  };
  const darfLaufen = () => !reduziert.matches && breit.matches && zustand.sichtbar
    && !zustand.hover && !zustand.fokus && !zustand.ruhe && !document.hidden;

  function melden() {
    tabs.dataset.autoplay = !lauf ? "aus" : lauf.playState === "running" ? "laeuft" : "pausiert";
  }
  function schritt() {
    if (lauf) lauf.cancel();
    const i = aktuell;
    const von = i / letzte;
    const bis = i < letzte ? (i + 1) / letzte : 1;
    lauf = fuellung.animate(
      [{ transform: `scaleX(${von})` }, { transform: `scaleX(${bis})` }],
      { duration: dauer(i), easing: "linear", fill: "forwards" }
    );
    lauf.onfinish = () => {
      waehlen(i < letzte ? i + 1 : 0);
      schritt();
    };
    if (!darfLaufen()) lauf.pause();
    melden();
  }
  function pruefen() {
    if (lauf) {
      if (darfLaufen()) lauf.play(); else lauf.pause();
      melden();
    } else if (darfLaufen()) {
      schritt();
    }
  }
  function vonHand() {
    if (lauf) { lauf.cancel(); lauf = null; }
    zustand.ruhe = true;
    clearTimeout(ruheUhr);
    ruheUhr = setTimeout(() => { zustand.ruhe = false; pruefen(); }, 15000);
    melden();
  }

  knoepfe.forEach((k, i) => {
    k.addEventListener("click", () => { vonHand(); waehlen(i); });
    k.addEventListener("keydown", (e) => {
      let ziel = null;
      if (e.key === "ArrowRight") ziel = i === letzte ? 0 : i + 1;
      else if (e.key === "ArrowLeft") ziel = i === 0 ? letzte : i - 1;
      else if (e.key === "Home") ziel = 0;
      else if (e.key === "End") ziel = letzte;
      if (ziel === null) return;
      e.preventDefault();
      vonHand();
      waehlen(ziel, { fokus: true });
    });
  });

  // Pause nur, solange die Maus über Zeitstrahl oder Detailfeld steht und
  // solange ein Tab per Tastatur fokussiert ist (:focus-visible). Ein per
  // Maus angeklickter Tab behält zwar den Fokus, hält das Autoplay aber nach
  // der Ruhezeit nicht mehr an (Ursache des Hängers, Überarbeitung 3).
  const tabliste = tabs.querySelector('[role="tablist"]');
  [tabliste, panel].forEach((el) => {
    el.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { zustand.hover = true; pruefen(); } });
    el.addEventListener("pointerleave", () => { zustand.hover = false; pruefen(); });
  });
  tabliste.addEventListener("focusin", (e) => {
    zustand.fokus = e.target.matches(":focus-visible");
    pruefen();
  });
  tabliste.addEventListener("focusout", (e) => {
    if (tabliste.contains(e.relatedTarget)) return;
    zustand.fokus = false;
    pruefen();
  });
  // Nach dem Scrollen kann „hover" hängen bleiben, wenn die Maus stillsteht
  // und der Inhalt unter ihr wegläuft: dann neu prüfen.
  window.addEventListener("scroll", () => {
    if (!zustand.hover) return;
    if (!tabliste.matches(":hover") && !panel.matches(":hover")) { zustand.hover = false; pruefen(); }
  }, { passive: true });
  document.addEventListener("visibilitychange", pruefen);
  reduziert.addEventListener("change", () => { if (reduziert.matches && lauf) { lauf.cancel(); lauf = null; melden(); } pruefen(); });
  breit.addEventListener("change", pruefen);
  new IntersectionObserver((eintraege) => {
    zustand.sichtbar = eintraege[0].isIntersecting;
    pruefen();
  }, { threshold: 0.2 }).observe(tabs);

  waehlen(0);
  melden();
}

/* ---------------------------------------------------------------------------
   Hero-Kennzahlen zählen hoch (Wunsch Bruno). Beide starten zusammen und
   enden zusammen; die 30 bremst stark ab (die letzten Schritte sind spürbar),
   die 450 mild. Im HTML steht der Endwert (ohne JS, Screenreader, Prüfung);
   während der Animation ist die Anzeige aria-hidden und der Endwert steht
   unsichtbar daneben. Bei reduzierter Bewegung passiert nichts.
--------------------------------------------------------------------------- */
// Ease-out mit Exponent: Die Zahl wird abgerundet, die letzte Stufe fällt
// also immer auf das Ende. Ein Quint-Verlauf hielte die 29 über eine Sekunde
// fest; mit 2,6 dauern die letzten Schritte der 30 etwa 0,15 / 0,2 / 0,6 s.
// Die 450 läuft mit 2 flacher aus und wirkt dadurch schneller.
const KURVEN = {
  stark: (t) => 1 - Math.pow(1 - t, 2.6),
  mild: (t) => 1 - Math.pow(1 - t, 2),
};

function initZaehler() {
  const zaehler = [...document.querySelectorAll("[data-zaehler]")];
  if (!zaehler.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const DAUER = 2400;

  const vorbereiten = (el) => {
    const ziel = Number(el.dataset.zaehler);
    const vorlesen = document.createElement("span");
    vorlesen.className = "vh";
    vorlesen.textContent = String(ziel);
    el.after(vorlesen);
    el.setAttribute("aria-hidden", "true");
    el.textContent = "0";
    return { el, ziel, kurve: KURVEN[el.dataset.kurve] || KURVEN.mild, vorlesen };
  };

  const starten = () => {
    const laeufe = zaehler.map(vorbereiten);
    const start = performance.now();
    const schritt = (jetzt) => {
      const t = Math.min(1, (jetzt - start) / DAUER);
      for (const l of laeufe) l.el.textContent = String(Math.floor(l.kurve(t) * l.ziel));
      if (t < 1) { requestAnimationFrame(schritt); return; }
      for (const l of laeufe) {
        l.el.textContent = String(l.ziel);
        l.el.removeAttribute("aria-hidden");
        l.vorlesen.remove();
      }
      document.documentElement.dataset.zaehlerFertig = String(Math.round(performance.now()));
    };
    requestAnimationFrame(schritt);
  };

  const beobachter = new IntersectionObserver((eintraege) => {
    if (eintraege.some((e) => e.isIntersecting)) {
      beobachter.disconnect();
      setTimeout(starten, 250);
    }
  }, { threshold: 0.6 });
  beobachter.observe(zaehler[0].closest("dl") || zaehler[0]);
}

/* ---------------------------------------------------------------------------
   Referenz-Stapel im Hero
   Ohne JS liegt die erste Karte vorn (data-pos im Markup), die Steuerung
   bleibt verborgen. Mit JS: Pfeil-Knöpfe, Klick/Tipp auf die vordere Karte,
   Wischen, Pfeiltasten im Stapel. Weiterblättern in zwei Phasen: die vordere
   Karte gleitet seitlich hinaus (.ist-weg), dann reiht sie sich hinten ein.
   Automatisch alle 6 s, nur sichtbar, ohne Hover/Fokus, ohne Wunsch nach
   reduzierter Bewegung und nicht angehalten (Pause-Knopf, WCAG 2.2.2).
   Nach eigener Auswahl ruht der Automatismus 15 s.
   Weitere Referenz: eine weitere .stapel__karte ins Markup, sonst nichts.
--------------------------------------------------------------------------- */
function initStapel() {
  const wurzel = document.querySelector("[data-stapel]");
  if (!wurzel) return;
  const ablage = wurzel.querySelector("[data-stapel-karten]");
  const karten = [...ablage.querySelectorAll(".stapel__karte")];
  if (karten.length < 2) return;

  const steuerung = wurzel.querySelector("[data-stapel-steuerung]");
  const nr = wurzel.querySelector("[data-stapel-nr]");
  const status = wurzel.querySelector("[data-stapel-status]");
  const pauseKnopf = wurzel.querySelector("[data-stapel-pause]");
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)");
  const n = karten.length;
  const TAKT = 6000;
  const RUHE = 15000;

  // reihe[0] liegt vorn
  let reihe = karten.slice();
  let beschaeftigt = false;

  wurzel.querySelector("[data-stapel-summe]").textContent = String(n);
  steuerung.hidden = false;
  wurzel.classList.add("stapel--js");

  function ordnen() {
    reihe.forEach((karte, pos) => {
      karte.dataset.pos = String(pos);
      const vorn = pos === 0;
      karte.inert = !vorn;
      if (vorn) karte.removeAttribute("aria-hidden");
      else karte.setAttribute("aria-hidden", "true");
    });
    nr.textContent = String(karten.indexOf(reihe[0]) + 1);
  }

  function melden() {
    const karte = reihe[0];
    status.textContent = `Referenz ${karten.indexOf(karte) + 1} von ${n}: ${karte.getAttribute("aria-label")}`;
  }

  function dauer() {
    const wert = parseFloat(getComputedStyle(wurzel).getPropertyValue("--stapel-dauer")) || 0.55;
    return wert * 1000;
  }

  function blaettern(richtung, { vonHand = false } = {}) {
    if (beschaeftigt) return;
    if (vonHand) ruhenLassen();
    if (ruhig.matches) {
      reihe = richtung > 0 ? [...reihe.slice(1), reihe[0]] : [reihe[n - 1], ...reihe.slice(0, -1)];
      ordnen();
      if (vonHand) melden();
      return;
    }
    beschaeftigt = true;
    const phase = dauer() * 0.6;
    if (richtung > 0) {
      // vorn hinaus, dann hinten einreihen
      const raus = reihe[0];
      raus.classList.add("ist-weg");
      reihe = [...reihe.slice(1), raus];
      reihe.forEach((k, pos) => { if (k !== raus) k.dataset.pos = String(pos); });
      nr.textContent = String(karten.indexOf(reihe[0]) + 1);
      if (vonHand) melden();
      setTimeout(() => {
        raus.classList.add("ist-weg--hinten");
        raus.classList.remove("ist-weg");
        ordnen();
        requestAnimationFrame(() => raus.classList.remove("ist-weg--hinten"));
        setTimeout(() => { beschaeftigt = false; }, dauer() * 0.5);
      }, phase);
    } else {
      // hinterste Karte seitlich heraus, dann vorn einreihen
      const rein = reihe[n - 1];
      rein.classList.add("ist-weg", "ist-weg--hinten");
      setTimeout(() => {
        reihe = [rein, ...reihe.slice(0, -1)];
        rein.classList.remove("ist-weg--hinten");
        ordnen();
        if (vonHand) melden();
        requestAnimationFrame(() => rein.classList.remove("ist-weg"));
        setTimeout(() => { beschaeftigt = false; }, dauer() * 0.6);
      }, phase);
    }
  }

  // Automatik
  let angehalten = false;
  let sichtbar = false;
  let schwebt = false;
  let fokussiert = false;
  let ruhtBis = 0;
  let uhr = null;

  function laeuft() {
    return !angehalten && sichtbar && !schwebt && !fokussiert && !ruhig.matches && !document.hidden;
  }
  function planen() {
    clearTimeout(uhr);
    if (!laeuft()) return;
    const warten = Math.max(TAKT, ruhtBis - Date.now());
    uhr = setTimeout(() => {
      if (laeuft()) blaettern(1);
      planen();
    }, warten);
  }
  function ruhenLassen() { ruhtBis = Date.now() + RUHE; planen(); }

  wurzel.querySelector("[data-stapel-vor]").addEventListener("click", () => blaettern(1, { vonHand: true }));
  wurzel.querySelector("[data-stapel-zurueck]").addEventListener("click", () => blaettern(-1, { vonHand: true }));
  pauseKnopf.addEventListener("click", () => {
    angehalten = !angehalten;
    pauseKnopf.setAttribute("aria-pressed", String(angehalten));
    pauseKnopf.setAttribute("aria-label", angehalten ? "Automatisches Weiterblättern starten" : "Automatisches Weiterblättern anhalten");
    planen();
  });
  if (ruhig.matches) pauseKnopf.hidden = true;
  ruhig.addEventListener("change", () => { pauseKnopf.hidden = ruhig.matches; planen(); });

  // Pfeiltasten, solange der Fokus im Stapel liegt
  wurzel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); blaettern(1, { vonHand: true }); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); blaettern(-1, { vonHand: true }); }
  });

  // Klick/Tipp auf die vordere Karte und Wischen
  let start = null;
  let gewischt = false;
  ablage.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    start = { x: e.clientX, y: e.clientY };
    gewischt = false;
  });
  ablage.addEventListener("pointerup", (e) => {
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      gewischt = true;
      blaettern(dx < 0 ? 1 : -1, { vonHand: true });
    }
  });
  ablage.addEventListener("pointercancel", () => { start = null; });
  ablage.addEventListener("click", (e) => {
    if (gewischt) { gewischt = false; return; }
    if (e.target.closest("a, button")) return;
    if (!e.target.closest('.stapel__karte[data-pos="0"]')) return;
    blaettern(1, { vonHand: true });
  });

  wurzel.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { schwebt = true; planen(); } });
  wurzel.addEventListener("pointerleave", () => { schwebt = false; planen(); });
  wurzel.addEventListener("focusin", () => { fokussiert = wurzel.matches(":focus-within") && !!wurzel.querySelector(":focus-visible"); planen(); });
  wurzel.addEventListener("focusout", () => { requestAnimationFrame(() => { fokussiert = !!wurzel.querySelector(":focus-visible"); planen(); }); });
  document.addEventListener("visibilitychange", planen);
  new IntersectionObserver((eintraege) => {
    sichtbar = eintraege.some((e) => e.isIntersecting);
    planen();
  }, { threshold: 0.5 }).observe(ablage);

  ordnen();
}

document.addEventListener("DOMContentLoaded", () => {
  initMenue();
  initAnker();
  initVorbelegung();
  initRegister();
  initZeitstrahl();
  initZaehler();
  initWege();
  initMarquee();
  initStapel();
});
