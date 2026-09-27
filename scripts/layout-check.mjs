#!/usr/bin/env node
/**
 * layout-check.mjs – misst das gerenderte Layout einer ganzen Seite.
 *
 * hero-check.mjs prüft die eine Sektion oben. Dieses Skript prüft alles
 * darunter: Flächennutzung, Rhythmus, Kontrast, Schriftgröße, Touch-Ziele,
 * Überlauf, Zustände, JS-Fehler. Damit werden die Punkte aus
 * docs/CHECKLISTE.md (5b) und dem Skill section-craft gemessen statt geschätzt.
 *
 *   node scripts/layout-check.mjs site/index.html
 *   node scripts/layout-check.mjs --out .layout-check site/seite-a.html site/seite-b.html
 *
 * Exit-Code 1, sobald ein FEHLER gemeldet wird (WARNUNG allein: 0).
 *
 * Grenzen der Messung, offen benannt:
 * - Kontrast wird nur gegen **einfarbige** Hintergründe gerechnet. Text auf
 *   einem Bild oder Verlauf wird als „nicht messbar" ausgewiesen, nicht als
 *   bestanden. Dafür ist der Screenshot da.
 * - Der Rhythmus-Befund ist eine Heuristik über Breite, Höhe und Grundfarbe.
 *   Er ersetzt den Blätter-Test nicht, er macht ihn nur reproduzierbar.
 */

import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { mkdir, writeFile, readFile } from "node:fs/promises";
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
    "    Die Browser liegen dort unter /opt/pw-browsers, kein 'playwright install'.\n" +
    "  Lokal auf dem eigenen Rechner: npm i -D playwright && npx playwright install chromium\n" +
    "    Dort fehlt der Browser sonst und der Start schlägt fehl."
  );
  process.exit(2);
}

const GRENZEN = {
  totenRand: 200,       // px je Seite auf 1920 (docs/CHECKLISTE.md)
  kontrast: 4.5,        // Fließtext
  kontrastGross: 3.0,   // ab 24px oder 19px fett
  schriftMin: 14,       // px auf Mobil
  touchMin: 44,         // px
  typoSpannweite: 2.5,  // H1 geteilt durch Fließtext
  rhythmusFolge: 3      // gleicher Wert so oft hintereinander = Befund
};

const VIEWPORTS = [
  { name: "mobil-360",   width: 360,  height: 780,  mobil: true },
  { name: "mobil-390",   width: 390,  height: 844,  mobil: true },
  { name: "tablet-768",  width: 768,  height: 1024 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "laptop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080, breit: true }
];

// --- Messung im Dokument -----------------------------------------------

function messungImDokument(grenzen) {
  const sichtbar = (el) => {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const zahl = (w) => parseFloat(w) || 0;

  // --- Farbe & Kontrast ---
  // Umrechnung über ein 1×1-Canvas statt per Regex. Das Template schreibt
  // oklch vor (Skill design-system); ein Parser, der nur rgb() kennt, hält
  // jede oklch-Farbe für unlesbar und rechnet dann gegen Weiß – die erste
  // Fassung meldete so "1:1, weiß auf weiß" für einen dunkelgrünen Knopf.
  // Der Browser kann jedes Farbformat, das er selbst rendert.
  const messFlaeche = document.createElement("canvas").getContext(
    "2d", { willReadFrequently: true }
  );
  const rgb = (wert) => {
    const t = String(wert || "").trim();
    if (!t || t === "transparent" || t === "none") return { r: 0, g: 0, b: 0, a: 0 };
    messFlaeche.clearRect(0, 0, 1, 1);
    messFlaeche.fillStyle = "rgba(0, 0, 0, 0)";  // zurücksetzen: ein ungültiger
    messFlaeche.fillStyle = t;                   // Wert lässt fillStyle stehen
    messFlaeche.fillRect(0, 0, 1, 1);
    const d = messFlaeche.getImageData(0, 0, 1, 1).data;
    return { r: d[0], g: d[1], b: d[2], a: +(d[3] / 255).toFixed(3) };
  };
  const relLum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const kontrast = (a, b) => {
    const l1 = relLum(a), l2 = relLum(b);
    return +(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05))).toFixed(2);
  };

  /** Hintergrund hinter einem Element. null = nicht messbar (Bild/Verlauf). */
  const grundFarbe = (el) => {
    let n = el;
    while (n && n !== document.documentElement.parentNode) {
      const s = getComputedStyle(n);
      if (s.backgroundImage && s.backgroundImage !== "none") return null;
      const c = rgb(s.backgroundColor);
      if (c.a >= 0.95) return c;
      n = n.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const textKnoten = [...document.querySelectorAll(
    "p,li,h1,h2,h3,h4,h5,h6,a,button,span,td,th,label,figcaption,blockquote,dd,dt,summary"
  )].filter((el) => {
    if (!sichtbar(el)) return false;
    // Nur Elemente mit eigenem Text, sonst wird jeder Wrapper mitgezählt.
    return [...el.childNodes].some((k) => k.nodeType === 3 && k.textContent.trim().length > 1);
  });

  let kleinsteSchrift = Infinity, kleinstesBeispiel = "";
  const kontrastBefunde = [];
  let nichtMessbar = 0;

  for (const el of textKnoten) {
    const s = getComputedStyle(el);
    const groesse = zahl(s.fontSize);
    if (groesse && groesse < kleinsteSchrift) {
      kleinsteSchrift = groesse;
      kleinstesBeispiel = (el.textContent || "").trim().slice(0, 40);
    }
    const vorne = rgb(s.color);
    const hinten = grundFarbe(el);
    if (!hinten) { nichtMessbar++; continue; }   // Text auf Bild oder Verlauf
    const gross = groesse >= 24 || (groesse >= 19 && zahl(s.fontWeight) >= 700);
    const grenze = gross ? grenzen.kontrastGross : grenzen.kontrast;
    const wert = kontrast(vorne, hinten);
    if (wert < grenze) {
      kontrastBefunde.push({
        wert, grenze,
        text: (el.textContent || "").trim().slice(0, 40),
        farbe: s.color, grund: `rgb(${hinten.r}, ${hinten.g}, ${hinten.b})`
      });
    }
  }

  // --- Touch-Ziele ---
  const zuKlein = [];
  for (const el of document.querySelectorAll('a,button,[role="button"],input,select,summary,label')) {
    if (!sichtbar(el)) continue;
    // Ein Link mitten im Fließtext ist kein Bedienelement mit Mindestgröße –
    // sonst meldet die Prüfung jede Verlinkung in einem Absatz.
    const istTelefon = /^(tel|mailto):/i.test(el.getAttribute("href") || "");
    const imFliesstext = el.tagName === "A" &&
      getComputedStyle(el).display === "inline" &&
      el.closest("p,li,blockquote,figcaption,td,dd");
    if (imFliesstext && !istTelefon) continue;
    const r = el.getBoundingClientRect();
    if (r.height < grenzen.touchMin || r.width < grenzen.touchMin) {
      zuKlein.push({
        was: el.tagName.toLowerCase() + (el.getAttribute("href") ? `[${el.getAttribute("href").slice(0, 24)}]` : ""),
        text: (el.textContent || "").trim().slice(0, 30),
        groesse: `${Math.round(r.width)}×${Math.round(r.height)}`,
        telefon: istTelefon
      });
    }
  }

  // --- Sektionen: Fläche und Rhythmus ---
  const fensterBreite = document.documentElement.clientWidth;
  const sektionen = [];
  const kandidaten = document.querySelectorAll("main > *, body > section, body > div > section");
  for (const sek of kandidaten) {
    if (!sichtbar(sek)) continue;
    // Breiteste sichtbare Inhaltsbox innerhalb der Sektion.
    let links = Infinity, rechts = -Infinity;
    for (const kind of sek.querySelectorAll("*")) {
      if (!sichtbar(kind)) continue;
      const s = getComputedStyle(kind);
      if (s.position === "absolute" || s.position === "fixed") continue;
      const r = kind.getBoundingClientRect();
      if (r.width < 40) continue;
      if (r.left < links) links = r.left;
      if (r.right > rechts) rechts = r.right;
    }
    const r = sek.getBoundingClientRect();
    if (links === Infinity) { links = r.left; rechts = r.right; }

    // Trägt die Sektion selbst eine Fläche (Farbe, Bild, Rahmen), dann ist ihr
    // eigenes Rechteck die genutzte Breite – ein randlos durchlaufendes
    // farbiges Band ist nicht "ungenutzter Rand", auch wenn der Text darin
    // auf Lesebreite steht. Ohne diese Unterscheidung meldet die Prüfung jede
    // Zäsur-Sektion fälschlich als tote Fläche.
    // Reine Lesesektion? Dann ist Textbreite richtig und kein toter Rand.
    // Enthält sie Bilder, Karten oder Galerien, gehört sie in die Breite.
    const hatMedien = sek.querySelector("img,picture,video,svg,canvas,iframe,table");
    let hatRaster = false;
    for (const kind of sek.querySelectorAll("*")) {
      const ks = getComputedStyle(kind);
      if (!/grid|flex/.test(ks.display)) continue;
      if ([...kind.children].filter(sichtbar).length >= 2) { hatRaster = true; break; }
    }
    const nurText = !hatMedien && !hatRaster;

    const sekStil = getComputedStyle(sek);
    const grundFarbeRoh = rgb(sekStil.backgroundColor);
    const gemalt =
      (sekStil.backgroundImage && sekStil.backgroundImage !== "none") ||
      (grundFarbeRoh && grundFarbeRoh.a > 0.05);

    const aussenLinks = gemalt ? r.left : links;
    const aussenRechts = gemalt ? r.right : rechts;

    const rand = Math.round(Math.max(aussenLinks, fensterBreite - aussenRechts));
    const genutzt = Math.round(aussenRechts - aussenLinks);
    const inhaltBreite = Math.round(rechts - links);
    const anteil = genutzt / fensterBreite;
    const breiteKlasse = anteil > 0.97 ? "full" : anteil > 0.7 ? "breakout" : "text";
    const hoehe = Math.round(r.height);
    sektionen.push({
      name: (sek.id || sek.className || sek.tagName).toString().split(" ")[0].slice(0, 24),
      rand, genutzt, inhaltBreite, breiteKlasse, hoehe, gemalt, nurText,
      inhaltAnteil: +(inhaltBreite / Math.max(genutzt, 1)).toFixed(2),
      hoeheKlasse: hoehe < 400 ? "klein" : hoehe < 900 ? "mittel" : "gross",
      grund: sekStil.backgroundColor
    });
  }

  // --- Zustände ---
  // cssRules einer verlinkten Datei ist über file:// nicht lesbar (der Browser
  // behandelt sie als fremde Herkunft und wirft). Die erste Fassung hat
  // deshalb "keine :focus-Regeln" gemeldet, obwohl base.css sie enthält.
  // Gezählt wird daher in Node, auf den Dateien selbst; hier nur einsammeln.
  const inlineCss = [...document.querySelectorAll("style")]
    .map((s) => s.textContent || "").join("\n");
  const cssDateien = [...document.querySelectorAll('link[rel~="stylesheet"]')]
    .map((l) => l.getAttribute("href"))
    .filter((h) => h && !/^(https?:)?\/\//.test(h));

  // --- Typo-Spannweite über die ganze Seite ---
  const h1 = document.querySelector("h1");
  const h1Groesse = h1 ? zahl(getComputedStyle(h1).fontSize) : 0;
  const textGroesse = zahl(getComputedStyle(document.body).fontSize) || 16;

  // --- Bilder ---
  const kaputteBilder = [...document.querySelectorAll("img")]
    .filter((b) => b.complete && b.naturalWidth === 0)
    .map((b) => b.getAttribute("src") || "(ohne src)");

  // --- Unsichtbar gebliebene Inhalte (reduced motion / Einblend-Effekte) ---
  const unsichtbar = [...document.querySelectorAll("main *, section *")]
    .filter((el) => {
      const s = getComputedStyle(el);
      if (zahl(s.opacity) > 0.01) return false;
      return (el.textContent || "").trim().length > 20;
    })
    .map((el) => (el.textContent || "").trim().slice(0, 40));

  return {
    fensterBreite,
    ueberlauf: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    kleinsteSchrift: kleinsteSchrift === Infinity ? 0 : +kleinsteSchrift.toFixed(1),
    kleinstesBeispiel,
    kontrastBefunde, nichtMessbar,
    zuKlein,
    sektionen,
    inlineCss, cssDateien,
    typoSpannweite: textGroesse ? +(h1Groesse / textGroesse).toFixed(2) : 0,
    kaputteBilder,
    unsichtbar: [...new Set(unsichtbar)]
  };
}

// --- Auswertung ---------------------------------------------------------

function bewerte(vp, m, fehler, warnungen) {
  const p = (t) => `${vp.name}: ${t}`;

  if (m.ueberlauf > 0) fehler.push(p(`horizontaler Überlauf ${m.ueberlauf}px`));

  if (vp.mobil && m.kleinsteSchrift && m.kleinsteSchrift < GRENZEN.schriftMin) {
    fehler.push(p(
      `kleinste Schrift ${m.kleinsteSchrift}px (min. ${GRENZEN.schriftMin}) bei „${m.kleinstesBeispiel}"`
    ));
  }

  for (const k of m.kontrastBefunde.slice(0, 5)) {
    fehler.push(p(`Kontrast ${k.wert}:1 (min. ${k.grenze}) – ${k.farbe} auf ${k.grund}, „${k.text}"`));
  }
  if (m.kontrastBefunde.length > 5) {
    fehler.push(p(`… und ${m.kontrastBefunde.length - 5} weitere Kontrastverstöße`));
  }
  if (m.nichtMessbar) {
    warnungen.push(p(`${m.nichtMessbar} Textstellen auf Bild oder Verlauf – Kontrast nicht messbar, am Screenshot prüfen`));
  }

  if (vp.mobil) {
    for (const z of m.zuKlein.slice(0, 5)) {
      const text = `Touch-Ziel ${z.groesse}px (min. ${GRENZEN.touchMin}) – ${z.was} „${z.text}"`;
      if (z.telefon) fehler.push(p(text + " – das ist die Telefonnummer, bei Handwerksbetrieben das wichtigste Ziel"));
      else fehler.push(p(text));
    }
    if (m.zuKlein.length > 5) fehler.push(p(`… und ${m.zuKlein.length - 5} weitere zu kleine Touch-Ziele`));
  }

  if (vp.breit) {
    if (!m.sektionen.some((s) => s.breiteKlasse === "full")) {
      fehler.push(p("kein randloses Element (.full) auf der Seite – Pflicht laut CLAUDE.md §7"));
    }
    for (const s of m.sektionen) {
      if (s.rand <= GRENZEN.totenRand) continue;
      if (s.nurText) continue;  // Lesebreite ist für reinen Text richtig
      fehler.push(p(
        `Sektion „${s.name}" lässt ${s.rand}px je Seite ungenutzt (max. ${GRENZEN.totenRand}) – ` +
        `sie enthält Bilder oder Karten und gehört damit in die Breite (.breakout/.full)`
      ));
    }
    if (m.sektionen.length && m.sektionen.every((s) => s.breiteKlasse === "text")) {
      fehler.push(p(
        "jede Sektion steht auf Textbreite – die Seite nutzt die Fläche nirgends. " +
        "Genau der häufigste Kritikpunkt an bisherigen Demos"
      ));
    }
    // Rhythmus: je Spalte einmal melden, mit der längsten Folge.
    const spaltenName = { breiteKlasse: "Breite", hoeheKlasse: "Höhe", grund: "Grundfarbe" };
    for (const spalte of ["breiteKlasse", "hoeheKlasse", "grund"]) {
      let folge = 1, beste = 1, wert = m.sektionen[0]?.[spalte];
      for (let i = 1; i < m.sektionen.length; i++) {
        if (m.sektionen[i][spalte] === m.sektionen[i - 1][spalte]) folge++;
        else folge = 1;
        if (folge > beste) { beste = folge; wert = m.sektionen[i][spalte]; }
      }
      if (beste >= GRENZEN.rhythmusFolge) {
        warnungen.push(p(
          `Rhythmus: ${beste} Sektionen in Folge mit derselben ${spaltenName[spalte]} ` +
          `(${wert}) – Blätter-Test wahrscheinlich nicht bestanden`
        ));
      }
    }

    // Randlose Fläche mit sehr schmalem Inhalt: die Fläche ist genutzt, der
    // Platz darin nicht. Warnung, kein Fehler – manchmal ist genau das richtig.
    for (const sek of m.sektionen) {
      if (sek.gemalt && sek.breiteKlasse === "full" && sek.inhaltAnteil < 0.4) {
        warnungen.push(p(
          `Sektion „${sek.name}": randlose Fläche, aber der Inhalt nutzt nur ` +
          `${Math.round(sek.inhaltAnteil * 100)}% davon (${sek.inhaltBreite}px von ${sek.genutzt}px)`
        ));
      }
    }
    if (m.typoSpannweite && m.typoSpannweite < GRENZEN.typoSpannweite) {
      fehler.push(p(`Typo-Spannweite ${m.typoSpannweite} (min. ${GRENZEN.typoSpannweite}) – wirkt flau`));
    }
    if (m.hoverRegeln === 0) fehler.push(p("keine :hover-Regeln – die Seite wirkt statisch"));
    if (m.fokusRegeln === 0) fehler.push(p("keine :focus-Regeln – per Tastatur unbedienbar"));
  }

  for (const b of m.kaputteBilder) fehler.push(p(`Bild lädt nicht: ${b}`));
}

// --- Ablauf -------------------------------------------------------------

function argumenteLesen(argv) {
  const dateien = [];
  let out = ".layout-check";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out") out = argv[++i];
    else dateien.push(argv[i]);
  }
  return { dateien, out };
}

const rot = (s) => `\x1b[31m${s}\x1b[0m`;
const gelb = (s) => `\x1b[33m${s}\x1b[0m`;
const gruen = (s) => `\x1b[32m${s}\x1b[0m`;

async function main() {
  const { dateien, out } = argumenteLesen(process.argv.slice(2));
  if (!dateien.length) {
    console.error("Keine Datei angegeben.\n  node scripts/layout-check.mjs site/index.html");
    process.exit(2);
  }

  const { chromium } = ladePlaywright();
  await mkdir(out, { recursive: true });
  const browser = await chromium.launch();
  let durchgefallen = false;
  const bericht = [];

  for (const datei of dateien) {
    const name = path.basename(datei).replace(/\.html?$/i, "");
    const url = pathToFileURL(path.resolve(datei)).href;
    console.log(`\n=== ${datei} ===`);
    const fehler = [], warnungen = [];
    const eintrag = { datei, messungen: {} };

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const jsFehler = [];
      page.on("pageerror", (e) => jsFehler.push(String(e.message)));
      page.on("console", (m) => { if (m.type() === "error") jsFehler.push(m.text()); });

      await page.goto(url, { waitUntil: "load" });
      await page.waitForTimeout(400);

      const m = await page.evaluate(messungImDokument, GRENZEN);
      m.jsFehler = jsFehler.length;

      let css = m.inlineCss || "";
      for (const rel of m.cssDateien || []) {
        try { css += "\n" + await readFile(path.resolve(path.dirname(datei), rel), "utf8"); }
        catch { /* Datei fehlt – der Browser meldet das bereits als Ladefehler */ }
      }
      m.hoverRegeln = (css.match(/:hover/g) || []).length;
      m.fokusRegeln = (css.match(/:focus/g) || []).length;
      delete m.inlineCss;
      eintrag.messungen[vp.name] = m;

      console.log(
        `  ${vp.name.padEnd(13)} Sektionen ${String(m.sektionen.length).padStart(2)}  ` +
        `Überlauf ${String(m.ueberlauf).padStart(3)}  ` +
        `kl. Schrift ${String(m.kleinsteSchrift).padStart(4)}px  ` +
        `Kontrastverstöße ${String(m.kontrastBefunde.length).padStart(2)}  ` +
        `JS-Fehler ${m.jsFehler}`
      );

      bewerte(vp, m, fehler, warnungen);
      if (m.jsFehler) fehler.push(`${vp.name}: ${m.jsFehler} JS-Fehler (${jsFehler[0]?.slice(0, 70)})`);

      // Ganzseiten-Screenshots für den visual-critic: breit und mobil.
      // Ein Agent, der die Seite beurteilen soll, braucht beide Ansichten –
      // die meisten Layoutfehler zeigen sich nur auf einer von beiden.
      if (vp.name === "mobil-390") {
        await writeFile(path.join(out, `${name}--390.png`), await page.screenshot({ fullPage: true }));
      }
      if (vp.name === "laptop-1440") {
        await writeFile(path.join(out, `${name}--1440.png`), await page.screenshot({ fullPage: true }));
      }
      if (vp.breit) {
        await writeFile(path.join(out, `${name}--1920.png`), await page.screenshot({ fullPage: true }));
        console.log("  Sektionen auf 1920:");
        for (const s of m.sektionen) {
          console.log(
            `    ${s.name.padEnd(22)} ${s.breiteKlasse.padEnd(9)} ` +
            `Rand ${String(s.rand).padStart(4)}px  ` +
            `Inhalt ${String(s.inhaltBreite).padStart(4)}px  ` +
            `Höhe ${String(s.hoehe).padStart(4)}px (${s.hoeheKlasse})`
          );
        }
      }
      await page.close();
    }

    // Reduzierte Bewegung: bleibt etwas dauerhaft unsichtbar?
    const seiteRM = await browser.newPage({
      viewport: { width: 1440, height: 900 }, reducedMotion: "reduce"
    });
    await seiteRM.goto(url, { waitUntil: "load" });
    await seiteRM.waitForTimeout(600);
    const rm = await seiteRM.evaluate(messungImDokument, GRENZEN);
    await seiteRM.close();
    for (const t of rm.unsichtbar.slice(0, 5)) {
      fehler.push(`prefers-reduced-motion: bleibt unsichtbar – „${t}"`);
    }

    // Gleiche Befunde über mehrere Breiten einmal ausgeben.
    const nachText = new Map();
    for (const f of fehler) {
      const t = f.match(/^([\w-]+):\s(.*)$/);
      const [breite, text] = t ? [t[1], t[2]] : ["alle", f];
      if (!nachText.has(text)) nachText.set(text, []);
      nachText.get(text).push(breite);
    }
    const einmalig = [...nachText].map(([text, breiten]) =>
      breiten.length >= 4 || breiten[0] === "alle" ? text : `${breiten.join(", ")}: ${text}`
    );

    if (einmalig.length) {
      durchgefallen = true;
      console.log(rot(`  ${einmalig.length} FEHLER:`));
      for (const f of einmalig) console.log(rot(`   ✗ ${f}`));
    }
    if (warnungen.length) {
      console.log(gelb(`  ${warnungen.length} Warnung(en):`));
      for (const w of warnungen) console.log(gelb(`   ! ${w}`));
    }
    if (!einmalig.length && !warnungen.length) console.log(gruen("  sauber"));

    eintrag.fehler = einmalig; eintrag.warnungen = warnungen;
    bericht.push(eintrag);
  }

  await browser.close();
  await writeFile(path.join(out, "bericht.json"), JSON.stringify(bericht, null, 2));
  console.log(`\nScreenshots (390, 1440, 1920 – ganze Seite) und bericht.json unter ${out}/`);
  console.log(
    `Hinweis: Kontrast wird nur gegen einfarbige Gründe gerechnet; Text auf Bild ` +
    `steht als „nicht messbar" im Bericht. Der Blätter-Test bleibt Handarbeit.`
  );
  process.exit(durchgefallen ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
