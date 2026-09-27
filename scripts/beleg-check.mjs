#!/usr/bin/env node
/**
 * beleg-check.mjs – hält jede Zahl und jede URL der Seite gegen ihre Quelle.
 *
 * Das Gate zur Belegpflicht (CLAUDE.md §3). Die Regel stand viermal im
 * Template und wurde in der Demo Kerrinnes trotzdem sechsmal verletzt:
 * erfundene Öffnungszeiten im Footer, eine Tatsachenbehauptung über ein
 * Kundenprojekt, drei Alt-Texte, eine falsche Fragenzahl im CTA. Die
 * Rückmeldung dazu hielt fest, woran es lag: „Sie wurde nicht übersehen, weil
 * sie unklar war, sondern weil niemand vor dem Push gegen sie gemessen hat."
 *
 *   node scripts/beleg-check.mjs site/index.html
 *   node scripts/beleg-check.mjs --quellen quellen,docs site/index.html
 *   node scripts/beleg-check.mjs --selbsttest
 *
 * Drei Prüfungen:
 *   1. QUELLENABGLEICH  Jede Belegzahl und jede URL der Seite muss in einer
 *                       Quelldatei vorkommen. Quellen sind `quellen/` (Scrape,
 *                       Briefing, Google, Social) und `docs/` (DEMO-SPEC,
 *                       DOSSIER). Kein Treffer: FEHLER.
 *   2. SELBSTABGLEICH   Nennt die Copy eine Anzahl von Fragen oder Schritten,
 *                       wird sie gegen das eigene Markup gezählt. Genau der
 *                       Fall „sieben Fragen" bei acht `data-step`.
 *   3. PLATZHALTER      TODO, XXX, Lorem und Vorlagenreste, die es bis in die
 *                       gebaute Seite geschafft haben.
 *
 * Exit-Code 1, sobald ein FEHLER gemeldet wird (WARNUNG allein: 0).
 *
 * Was das Skript NICHT kann: beurteilen, ob eine belegte Zahl auch richtig
 * verwendet ist. Es prüft Herkunft, nicht Wahrheit. Und es sieht keine Bilder,
 * ein falscher Alt-Text bleibt Handarbeit.
 */

import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { readdirSync, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);

function ladePlaywright() {
  const kandidaten = [
    "playwright",
    "/opt/node22/lib/node_modules/playwright",
    "/usr/lib/node_modules/playwright",
    "/usr/local/lib/node_modules/playwright"
  ];
  for (const k of kandidaten) {
    try { return require(k); } catch { /* nächster Kandidat */ }
  }
  console.error(
    "Playwright nicht gefunden.\n" +
    "  In der Cloud-Session (Claude Code on the web): npm i -D playwright\n" +
    "  Lokal: npm i -D playwright && npx playwright install chromium"
  );
  process.exit(2);
}

const rot = (t) => `\x1b[31m${t}\x1b[0m`;
const gelb = (t) => `\x1b[33m${t}\x1b[0m`;
const gruen = (t) => `\x1b[32m${t}\x1b[0m`;
const grau = (t) => `\x1b[90m${t}\x1b[0m`;

// --- Was als Beleg-Zahl gilt -------------------------------------------
//
// Nicht jede Ziffer ist eine Behauptung. „8 bis 17 Uhr" im Footer ist eine,
// „2 Minuten" im CTA auch, die 24 in „rund um die Uhr" nicht unbedingt.
// Entscheidend ist das Wort daneben. Diese Liste ist bewusst eng: Ein Gate,
// das bei jeder Ziffer anschlägt, wird nach dem zweiten Lauf abgeschaltet.
const EINHEITEN = [
  // Betriebsgröße und Historie – hier sieht der Inhaber jeden Fehler
  "mitarbeiter", "beschäftigte", "beschaeftigte", "kollegen", "leute",
  "jahre", "jahren", "jahrzehnt", "jahrzehnte", "seit",
  "projekte", "projekten", "aufträge", "auftraege", "kunden", "objekte",
  "standorte", "filialen", "fahrzeuge", "meister", "gesellen", "azubis",
  // Bewertungen
  "bewertungen", "rezensionen", "sterne", "von 5", "google",
  // Maße und Leistung
  "quadratmeter", "m²", "qm", "kw", "kwp", "kilowatt", "tonnen", "meter",
  // Zeit und Erreichbarkeit
  "uhr", "stunden", "minuten", "werktage", "werktagen", "tage", "tagen",
  "wochen", "monate", "monaten",
  // Geld
  "euro", "€", "prozent", "%"
];

// Zahlwörter, die in der Copy als Anzahl auftreten
const ZAHLWORT = {
  "null": 0, "ein": 1, "eine": 1, "einer": 1, "zwei": 2, "drei": 3, "vier": 4,
  "fünf": 5, "fuenf": 5, "sechs": 6, "sieben": 7, "acht": 8, "neun": 9,
  "zehn": 10, "elf": 11, "zwölf": 12, "zwoelf": 12
};

const PLATZHALTER = [
  "lorem ipsum", "todo", "tbd", "xxx", "platzhalter-text", "dummy",
  "beispieltext", "mustermann", "musterstadt", "example.com",
  "hier text einfügen", "hier text einfuegen", "<name>", "[name]"
];

// --- Quellen einlesen ---------------------------------------------------

function dateienUnter(ordner, raus = []) {
  if (!existsSync(ordner)) return raus;
  for (const e of readdirSync(ordner, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(ordner, e.name);
    if (e.isDirectory()) dateienUnter(p, raus);
    else if (/\.(md|txt|json|csv|ya?ml)$/i.test(e.name)) raus.push(p);
  }
  return raus;
}

/** Diese docs-Dateien sind Vorlagen und Regelwerk, keine Belege über den
 *  Kunden. Wer sie als Quelle zählt, belegt eine erfundene Zahl mit einem
 *  Beispiel aus der Anleitung – genau der Fehler, den das Gate verhindern soll. */
const KEINE_QUELLE = /^(CHANGELOG|CHECKLISTE|FUNNEL|LERNSCHLEIFE|LIBRARIES|PRAEFERENZEN|WORKFLOW)\.md$/i;

async function quellenLesen(ordnerListe) {
  const dateien = [];
  for (const o of ordnerListe) {
    for (const d of dateienUnter(o)) {
      if (o === "docs" && KEINE_QUELLE.test(path.basename(d))) continue;
      // quellen/README.md erklaert den Ordner und nennt dabei Beispielwerte.
      // Wer sie als Beleg zaehlt, belegt eine erfundene Zahl mit der Anleitung.
      if (/^README\.md$/i.test(path.basename(d))) continue;
      if (d.includes(`${path.sep}handoff${path.sep}`)) continue;
      dateien.push(d);
    }
  }
  let text = "";
  for (const d of dateien) text += "\n" + (await readFile(d, "utf8"));
  return { dateien, text: text.toLowerCase() };
}

// --- Seite auslesen -----------------------------------------------------

async function seiteLesen(datei) {
  const { chromium } = ladePlaywright();
  const browser = await chromium.launch();
  const seite = await browser.newPage();
  await seite.goto(pathToFileURL(path.resolve(datei)).href, { waitUntil: "load" });
  const daten = await seite.evaluate(() => {
    const sichtbar = document.body ? document.body.innerText : "";
    const verlinkt = [...document.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href"),
      text: (a.textContent || "").trim().slice(0, 60)
    }));
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => s.textContent || "");
    const schritte = document.querySelectorAll("[data-step]").length;
    const gesamt = document.querySelector("[data-funnel-total]");
    return {
      sichtbar,
      verlinkt,
      ld,
      schritte,
      funnelTotal: gesamt ? Number(gesamt.getAttribute("data-funnel-total")) : null
    };
  });
  await browser.close();
  return daten;
}

// --- Prüfung 1: Quellenabgleich ----------------------------------------

/** Findet Zahlen, die eine Behauptung tragen: Ziffer plus Einheit in der Nähe,
 *  oder eine Jahreszahl. Der Kontext wird mitgegeben, damit der Befund
 *  nachvollziehbar ist statt „irgendwo steht eine 8". */
export function belegZahlen(text) {
  const raus = [];
  const zeilen = text.split("\n");
  for (const zeile of zeilen) {
    const jahre = zeile.match(/\b(1[89]\d{2}|20[0-5]\d)\b/g) || [];
    for (const j of jahre) raus.push({ wert: j, art: "Jahreszahl", kontext: zeile.trim().slice(0, 90) });

    // (?<!\d) und (?!\d) sind nicht kosmetisch: ohne sie zerlegt \d{1,3}
    // die Jahreszahl 1998 in eine "199" und meldet sie als unbelegt.
    const treffer = zeile.matchAll(
      /(?<![\d.,])(\d{1,3}(?:[.,]\d{1,3})?)(?![\d])\s*([%€]|[A-Za-zÄÖÜäöüß²]{1,14})?/g
    );
    for (const t of treffer) {
      const wert = t[1];
      if (/\b(1[89]\d{2}|20[0-5]\d)\b/.test(wert)) continue; // schon als Jahr erfasst
      const umfeld = zeile.slice(Math.max(0, t.index - 25), t.index + 40).toLowerCase();
      const einheit = EINHEITEN.find((e) => umfeld.includes(e));
      if (!einheit) continue;
      raus.push({ wert, art: `Zahl (${einheit})`, kontext: zeile.trim().slice(0, 90) });
    }
  }
  // Doppelte mit identischem Wert und Kontext zusammenfassen
  const gesehen = new Set();
  return raus.filter((r) => {
    const s = r.wert + "|" + r.kontext;
    if (gesehen.has(s)) return false;
    gesehen.add(s);
    return true;
  });
}

/** Externe Ziele. Interne Anker und Dateipfade sind kein Beleg-Thema. */
export function belegZiele(verlinkt) {
  const raus = [];
  for (const a of verlinkt) {
    const h = (a.href || "").trim();
    if (!h || h.startsWith("#") || h.startsWith("javascript:")) continue;
    if (/^(https?:)?\/\//i.test(h)) raus.push({ wert: h, art: "externe URL", kontext: a.text });
    else if (/^(tel|mailto):/i.test(h)) raus.push({ wert: h, art: "Kontaktziel", kontext: a.text });
  }
  return raus;
}

/** Vergleichswert normalisieren: Eine Telefonnummer steht in der Quelle selten
 *  so wie im href. `tel:+4940123456` und „040 123456" sind dieselbe Nummer. */
export function vergleichsformen(wert) {
  const w = wert.toLowerCase().trim();
  const formen = new Set([w]);
  if (w.startsWith("tel:")) {
    const ziffern = w.slice(4).replace(/\D/g, "");
    formen.add(ziffern);
    if (ziffern.startsWith("49")) formen.add("0" + ziffern.slice(2));
    if (ziffern.startsWith("0")) formen.add("49" + ziffern.slice(1));
  } else if (w.startsWith("mailto:")) {
    formen.add(w.slice(7));
  } else if (/^(https?:)?\/\//.test(w)) {
    const ohne = w.replace(/^(https?:)?\/\//, "").replace(/^www\./, "").replace(/\/+$/, "");
    formen.add(ohne);
    // Die nackte Domain gilt NUR, wenn die URL keinen Pfad hat. Sonst wuerde
    // instagram.com/fremder-betrieb als belegt durchgehen, weil irgendwo im
    // Briefing instagram.com steht - und in der Demo laegen die Fotos eines
    // fremden Betriebs. Der Inhaber sieht das sofort (CLAUDE.md §3).
    if (!ohne.includes("/")) formen.add(ohne);
  } else {
    formen.add(w.replace(",", "."));
    formen.add(w.replace(".", ","));
  }
  return [...formen].filter(Boolean);
}

const maskiere = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function belegt(wert, quellenText) {
  const nadel = quellenText.replace(/\s+/g, " ");
  const ziffernQuelle = quellenText.replace(/\D/g, "");
  for (const form of vergleichsformen(wert)) {
    const nurZiffern = form.replace(/\D/g, "");

    // Telefon- und Nummernfolgen: Schreibweise egal, aber erst ab sechs
    // Ziffern. Darunter findet sich jede Folge irgendwo im Quelltext.
    if (nurZiffern.length >= 6 && /^[\d+\-/ ()]+$/.test(form)) {
      if (ziffernQuelle.includes(nurZiffern)) return true;
      continue;
    }

    // Zahlen brauchen eine Wortgrenze. Ohne sie galt die 8 aus
    // "8 bis 17 Uhr" als belegt, weil die Quelle "1998" enthaelt - eine
    // erfundene Oeffnungszeit waere damit unbemerkt durchgegangen.
    if (/^\d+([.,]\d+)?$/.test(form)) {
      // Nachbarziffern trennen (aus 1998 wird keine 199), ein Satzzeichen
      // dahinter ist dagegen normal: "seit 1998," ist derselbe Wert.
      const re = new RegExp(
        `(?<!\\d)(?<!\\d[.,])${maskiere(form)}(?!\\d)(?![.,]\\d)`
      );
      if (re.test(nadel)) return true;
      continue;
    }

    if (nadel.includes(form)) return true;
  }
  return false;
}

/** Werte aus dem JSON-LD, die einen Beleg brauchen. `openingHours` und
 *  `priceRange` sind seit 2026.10.01 erlaubt, sobald sie belegt sind – echte
 *  Oeffnungszeiten aus dem verifizierten Google-Eintrag gehoeren auf die Seite.
 *  Geprueft wird dann eben, ob sie auch von dort stammen. */
export function ldBelege(bloecke) {
  const raus = [];
  const sammle = (knoten, pfad) => {
    if (knoten === null || knoten === undefined) return;
    if (Array.isArray(knoten)) { for (const k of knoten) sammle(k, pfad); return; }
    if (typeof knoten === "object") {
      for (const [k, v] of Object.entries(knoten)) sammle(v, k);
      return;
    }
    if (pfad === "priceRange" || /^openingHours$/i.test(pfad) || pfad === "opens" || pfad === "closes") {
      raus.push({ feld: pfad, wert: String(knoten) });
    }
  };
  for (const b of bloecke) {
    try { sammle(JSON.parse(b), ""); } catch { /* kaputtes JSON-LD meldet copy-check */ }
  }
  return raus;
}

// --- Prüfung 2: Selbstabgleich -----------------------------------------

/** „Sieben Fragen, rund zwei Minuten" bei acht `data-step`. Die Quelle stand
 *  zwei Bildschirmseiten tiefer im eigenen Markup. */
export function angekuendigteAnzahl(text) {
  const raus = [];
  const muster = /\b(\d{1,2}|null|ein|eine|einer|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf)\s+(fragen|schritte|schritten|felder|angaben)\b/gi;
  let m;
  while ((m = muster.exec(text))) {
    const roh = m[1].toLowerCase();
    const zahl = /^\d+$/.test(roh) ? Number(roh) : ZAHLWORT[roh];
    if (zahl === undefined) continue;
    raus.push({ zahl, wort: m[0].trim(), kontext: m[0] });
  }
  return raus;
}

// --- Hauptlauf ----------------------------------------------------------

async function pruefen(datei, quellenOrdner) {
  const quellen = await quellenLesen(quellenOrdner);
  const seite = await seiteLesen(datei);

  const fehler = [];
  const warnungen = [];

  if (quellen.dateien.length === 0) {
    fehler.push(
      `Keine Quelldateien gefunden (gesucht in: ${quellenOrdner.join(", ")}). ` +
      `Ohne Quellenkorpus ist die Belegpflicht nicht prüfbar. Scrape, Briefing, ` +
      `Google- und Social-Auswertung gehören nach quellen/ – dort, nicht in site/, ` +
      `und damit über keine URL erreichbar.`
    );
    return { fehler, warnungen, quellen, seite, zahlen: [], ziele: [] };
  }

  // --- 1. Quellenabgleich
  const zahlen = belegZahlen(seite.sichtbar);
  const ziele = belegZiele(seite.verlinkt);

  for (const z of ziele) {
    if (!belegt(z.wert, quellens(quellen))) {
      fehler.push(
        `${z.art} ohne Quelle: ${z.wert}` +
        (z.kontext ? grau(`  („${z.kontext}")`) : "") +
        `\n      URLs werden kopiert, nie konstruiert (§3). Eine gebastelte Adresse ` +
        `führt im schlimmsten Fall auf einen fremden Betrieb.`
      );
    }
  }

  for (const z of zahlen) {
    if (!belegt(z.wert, quellens(quellen))) {
      fehler.push(
        `${z.art} ohne Quelle: ${z.wert}\n      ` +
        grau(`„${z.kontext}"`) +
        `\n      Entweder belegen, oder streichen, oder als Hinweiskasten kennzeichnen (§3, §11).`
      );
    }
  }

  // --- 2. Selbstabgleich Funnel
  const istSchritte = seite.funnelTotal ?? (seite.schritte || null);
  for (const a of angekuendigteAnzahl(seite.sichtbar)) {
    if (istSchritte && a.zahl !== istSchritte) {
      fehler.push(
        `Die Seite kündigt „${a.wort}" an, das Markup hat ${istSchritte}. ` +
        `Die einzige nachprüfbare Zahl im Knopf stimmt damit nicht.`
      );
    } else if (!istSchritte) {
      warnungen.push(
        `„${a.wort}" steht im Text, aber die Seite hat kein [data-step] und kein ` +
        `[data-funnel-total]. Nicht gegenprüfbar.`
      );
    }
  }

  // --- 2b. JSON-LD gegen die Quellen
  for (const e of ldBelege(seite.ld)) {
    const zahlen = e.wert.match(/\d{1,2}[:.]\d{2}|\d+/g) || [e.wert];
    const fehlt = zahlen.filter((z) => !belegt(z.replace(".", ":"), quellens(quellen)));
    if (fehlt.length) {
      fehler.push(
        `JSON-LD „${e.feld}": ${e.wert} steht in keiner Quelle ` +
        `(${fehlt.join(", ")} nicht gefunden).\n      ` +
        (e.feld === "priceRange"
          ? `Eine Preisspanne gehört nur auf die Seite, wenn sie im Briefing steht ` +
            `und der Kunde sie zeigen will.`
          : `Echte Öffnungszeiten gehören auf die Seite – aus dem verifizierten ` +
            `Google-Eintrag, nicht aus dem Gedächtnis. Der Scrape gehört nach ` +
            `quellen/scrape-google.md (siehe quellen/README.md).`)
      );
    }
  }

  // --- 3. Platzhalter
  const klein = seite.sichtbar.toLowerCase();
  for (const p of PLATZHALTER) {
    if (klein.includes(p)) fehler.push(`Platzhalter „${p}" steht in der gebauten Seite.`);
  }

  // --- JSON-LD: Hinweis, gemessen wird es in copy-check
  if (seite.ld.length === 0) {
    warnungen.push("Kein JSON-LD auf der Seite (Skill seo-basis, lokale Signale).");
  }

  return { fehler, warnungen, quellen, seite, zahlen, ziele };
}

// Kleiner Helfer, damit der Quelltext nur einmal zusammengesetzt wird.
let _quellenCache = null;
function quellens(q) {
  if (_quellenCache === null) _quellenCache = q.text.replace(/[\s ]+/g, " ");
  return _quellenCache;
}

function ausgeben({ fehler, warnungen, quellen, zahlen, ziele }, datei) {
  console.log(`\n=== Beleg-Check: ${datei} ===\n`);
  console.log(grau(`  Quellen: ${quellen.dateien.length} Datei(en)`));
  for (const d of quellen.dateien.slice(0, 12)) console.log(grau(`    ${d}`));
  if (quellen.dateien.length > 12) console.log(grau(`    … und ${quellen.dateien.length - 12} weitere`));
  console.log(grau(`\n  Geprüft: ${zahlen.length} Belegzahl(en), ${ziele.length} Ziel(e)\n`));

  for (const w of warnungen) console.log(`  ${gelb("WARNUNG")} ${w}\n`);
  if (fehler.length === 0) {
    console.log(gruen("  Jede Belegzahl und jedes Ziel hat eine Quelle.\n"));
    return 0;
  }
  console.log(`  ${rot(`${fehler.length} FEHLER`)}\n`);
  for (const f of fehler) console.log(`  ${rot("•")} ${f}\n`);
  return 1;
}

// --- Selbsttest ---------------------------------------------------------
//
// Die Fälle stammen aus der Rückmeldung zur Demo Kerrinnes (14.09.2026).
// Ein Prüfskript ist beim ersten Lauf genauso unbelegt wie das, was es prüfen
// soll – vier eigene Fehler in skill-check.mjs waren die Lehre.
function selbsttest() {
  let ok = 0, schief = 0;
  const p = (name, bedingung) => {
    if (bedingung) { ok++; console.log(`  ${gruen("ok")}   ${name}`); }
    else { schief++; console.log(`  ${rot("FEHL")} ${name}`); }
  };
  const werte = (liste) => liste.map((x) => x.wert);

  console.log("\n=== Selbsttest ===\n");

  // B4: erfundene Öffnungszeiten
  p("findet Öffnungszeiten als Belegzahlen",
    werte(belegZahlen("Mo bis Do 8 bis 17 Uhr")).includes("8"));
  p("findet die Jahreszahl im Text",
    werte(belegZahlen("Meisterbetrieb seit 1998")).includes("1998"));
  p("findet Mitarbeiterzahl",
    werte(belegZahlen("30 Mitarbeiter an zwei Standorten")).includes("30"));
  p("zerlegt eine Jahreszahl nicht in eine Teilzahl",
    belegZahlen("Meisterbetrieb seit 1998").every((z) => z.wert !== "199"));
  p("ignoriert Ziffern ohne Einheit",
    belegZahlen("Wir arbeiten sauber und 100 pro").every((z) => z.art !== "Jahreszahl") &&
    belegZahlen("Abschnitt 4").length === 0);

  // B8: falsche Fragenzahl
  p("erkennt Sieben Fragen als Ankuendigung",
    angekuendigteAnzahl("Sieben Fragen, rund zwei Minuten")[0]?.zahl === 7);
  p("erkennt auch die Ziffernform",
    angekuendigteAnzahl("In 8 Schritten zur Anfrage")[0]?.zahl === 8);
  p("keine Ankuendigung ohne Bezugswort",
    angekuendigteAnzahl("Sieben Tage die Woche").length === 0);

  // Belegabgleich
  const q = "meisterbetrieb seit 1998, telefon 040 123456, instagram.com/malerkerrinnes";
  p("Jahreszahl gilt als belegt", belegt("1998", q));
  p("unbelegte Zahl faellt durch", !belegt("2011", q));
  p("Telefonnummer trotz anderer Schreibweise belegt", belegt("tel:+4940123456", q));
  p("URL ohne www und mit https belegt", belegt("https://www.instagram.com/malerkerrinnes/", q));
  p("fremde Domain faellt durch", !belegt("https://instagram.com/fremder-betrieb", q));
  p("zieht openingHours aus dem JSON-LD",
    ldBelege(['{"@type":"LocalBusiness","openingHours":"Mo-Fr 08:00-17:00"}'])[0]?.wert === "Mo-Fr 08:00-17:00");
  p("zieht opens/closes aus der Spezifikation",
    ldBelege(['{"openingHoursSpecification":[{"opens":"08:00","closes":"17:00"}]}']).length === 2);
  p("ignoriert unauffaellige Felder im JSON-LD",
    ldBelege(['{"@type":"LocalBusiness","name":"Maler Kerrinnes"}']).length === 0);
  p("kaputtes JSON-LD wirft nicht", ldBelege(["{nicht json"]).length === 0);
  p("kurze Zahl gilt nicht als belegt, nur weil sie in 1998 vorkommt",
    !belegt("8", "meisterbetrieb seit 1998"));
  p("dieselbe Zahl mit Wortgrenze gilt als belegt",
    belegt("8", "wir sind zu 8 im team, seit 1998"));

  console.log(`\n  ${ok} bestanden, ${schief} fehlgeschlagen\n`);
  return schief === 0 ? 0 : 1;
}

// --- Aufruf -------------------------------------------------------------

const argv = process.argv.slice(2);
if (argv.includes("--selbsttest")) process.exit(selbsttest());

let quellenOrdner = ["quellen", "docs"];
const qi = argv.indexOf("--quellen");
if (qi !== -1 && argv[qi + 1]) {
  quellenOrdner = argv[qi + 1].split(",").map((s) => s.trim()).filter(Boolean);
  argv.splice(qi, 2);
}
const datei = argv.find((a) => !a.startsWith("--"));
if (!datei) {
  console.error("Aufruf: node scripts/beleg-check.mjs [--quellen quellen,docs] site/index.html");
  process.exit(2);
}

const ergebnis = await pruefen(datei, quellenOrdner);
process.exit(ausgeben(ergebnis, datei));
