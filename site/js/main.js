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
  // möglich, die Anfrage wird markiert.
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
  });

  const zusatz = danke.querySelector("[data-zusatz]");
  zusatz.addEventListener("submit", (e) => {
    e.preventDefault();
    zusatz.hidden = true;
    const meldung = danke.querySelector("[data-zusatz-danke]");
    meldung.textContent = "Danke, damit lässt sich das Gespräch gut vorbereiten.";
    meldung.focus({ preventScroll: true });
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
   Ablauf: ab 900 px Tabs mit einem Detailfeld (WAI-ARIA Tabs, automatische
   Aktivierung, Pfeiltasten, Pos1/Ende). Die Liste bleibt im Dokument und ist
   darunter (mobil, ohne JS) die sichtbare Fassung.
--------------------------------------------------------------------------- */
function initZeitstrahl() {
  const wurzel = document.querySelector("[data-zeitstrahl]");
  if (!wurzel) return;
  const stationen = [...wurzel.querySelectorAll(".zs-station")].map((li) => ({
    nr: li.dataset.station,
    titel: li.querySelector(".zs-titel").innerHTML,
    text: li.querySelector(".zs-beschreibung").textContent,
    ergebnis: li.querySelector(".zs-ergebnis__text").textContent,
    details: li.querySelector("details")
  }));

  // Mobil: Beschreibungen eingeklappt (ohne JS bleiben sie offen).
  const mobil = window.matchMedia("(max-width: 899px)");
  const mobilSetzen = () => stationen.forEach((s) => { s.details.open = !mobil.matches; });
  mobilSetzen();
  mobil.addEventListener("change", mobilSetzen);

  const zweistellig = (n) => String(n).padStart(2, "0");
  const tabs = document.createElement("div");
  tabs.className = "zs-tabs";
  tabs.innerHTML = `
    <p class="zs-abschnitte" aria-hidden="true">
      <span class="label zs-abschnitt zs-abschnitt--vor">Bevor es losgeht</span>
      <span class="label zs-abschnitt zs-abschnitt--bau">Am Bau</span>
    </p>
    <div class="zs-tabliste" role="tablist" aria-label="Stationen der Zusammenarbeit">
      <span class="zs-linie" aria-hidden="true"><span></span></span>
      ${stationen.map((s) => `
        <button class="zs-tab" type="button" role="tab" id="zs-tab-${s.nr}"
          aria-controls="zs-panel" aria-selected="false" tabindex="-1">
          <span class="zs-nr" aria-hidden="true">${zweistellig(s.nr)}</span>
          <span>${s.titel}</span>
        </button>`).join("")}
    </div>
    <div class="zs-unten">
      <div class="zs-panel" id="zs-panel" role="tabpanel" tabindex="0">
        <span class="zs-panel__nr" aria-hidden="true"></span>
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

  function waehlen(index, { fokus = false } = {}) {
    const s = stationen[index];
    knoepfe.forEach((k, i) => {
      const aktiv = i === index;
      k.setAttribute("aria-selected", String(aktiv));
      k.tabIndex = aktiv ? 0 : -1;
      k.classList.toggle("zs-tab--erreicht", i < index);
    });
    tabs.dataset.aktiv = s.nr;
    panel.setAttribute("aria-labelledby", `zs-tab-${s.nr}`);
    panel.querySelector(".zs-panel__nr").textContent = zweistellig(s.nr);
    panel.querySelector("[data-panel-titel]").innerHTML = s.titel;
    panel.querySelector("[data-panel-text]").textContent = s.text;
    panel.querySelector("[data-panel-ergebnis]").textContent = " " + s.ergebnis;
    if (fokus) knoepfe[index].focus();
  }

  knoepfe.forEach((k, i) => {
    k.addEventListener("click", () => waehlen(i));
    k.addEventListener("keydown", (e) => {
      const letzte = knoepfe.length - 1;
      let ziel = null;
      if (e.key === "ArrowRight") ziel = i === letzte ? 0 : i + 1;
      else if (e.key === "ArrowLeft") ziel = i === 0 ? letzte : i - 1;
      else if (e.key === "Home") ziel = 0;
      else if (e.key === "End") ziel = letzte;
      if (ziel === null) return;
      e.preventDefault();
      waehlen(ziel, { fokus: true });
    });
  });
  waehlen(0);
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

document.addEventListener("DOMContentLoaded", () => {
  initMenue();
  initAnker();
  initVorbelegung();
  initRegister();
  initZeitstrahl();
  initZaehler();
});
