#!/usr/bin/env node
/**
 * hero-check.mjs – Render- und Messschleife für Hero-Varianten.
 *
 * Misst, was an einem Hero objektiv schiefgehen kann, und macht Screenshots
 * zur Bewertung durch den hero-critic. Die Messung killt das Schlechte,
 * sie erzeugt nicht das Gute (siehe Skill hero-craft).
 *
 *   node scripts/hero-check.mjs varianten/hero-a.html varianten/hero-b.html
 *   node scripts/hero-check.mjs --selector "#hero" --out .hero-check site/index.html
 *
 * Screenshots landen unter --out (Standard: .hero-check/, gitignored).
 * Exit-Code 1, sobald eine Datei ein Ausschlusskriterium reißt.
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

// Grenzwerte aus dem Skill hero-craft.
const GRENZEN = {
  kontrastSpanne: 0.60,   // hellster minus dunkelster Punkt, 0..1
  typoSpannweite: 2.5,    // H1-Größe geteilt durch Fließtext-Größe
  overlayMin: 0.30,       // ganzflächiges Overlay: verdächtiger Bereich
  overlayMax: 0.80,
  overlayDeckung: 0.90    // ab wieviel Flächenanteil es "ganzflächig" ist
};

const VIEWPORTS = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "laptop-1440",  width: 1440, height: 900  },
  { name: "laptop-1512",  width: 1512, height: 982  },
  { name: "mobil-390",    width: 390,  height: 844  }
];

// Auf diesen Höhen muss der Hero vollständig sichtbar sein.
const HERO_MUSS_PASSEN = new Set(["laptop-1440", "laptop-1512"]);

const HERO_SELEKTOR_STANDARD =
  '[data-hero], .hero, header + section, main > section:first-of-type, body > section:first-of-type';

function argumenteLesen(argv) {
  const dateien = [];
  let selektor = HERO_SELEKTOR_STANDARD;
  let out = ".hero-check";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--selector") selektor = argv[++i];
    else if (argv[i] === "--out") out = argv[++i];
    else dateien.push(argv[i]);
  }
  return { dateien, selektor, out };
}

/** Misst im geladenen Dokument alles, was ohne Pixel auskommt. */
function messungImDokument({ selektor, grenzen }) {
  const hero = document.querySelector(selektor);
  if (!hero) return { fehlt: true };

  const rect = hero.getBoundingClientRect();
  const fensterBreite = document.documentElement.clientWidth;
  const fensterHoehe = document.documentElement.clientHeight;

  const zahl = (wert) => parseFloat(wert) || 0;

  // Typo-Spannweite: größte Überschrift im Hero gegen Fließtextgröße.
  const ueberschrift = hero.querySelector("h1, h2, [data-headline]");
  const koerper = getComputedStyle(document.body).fontSize;
  const h1Groesse = ueberschrift ? zahl(getComputedStyle(ueberschrift).fontSize) : 0;
  const textGroesse = zahl(koerper) || 16;

  // Ganzflächiges Overlay: Element, das den Hero fast vollständig bedeckt und
  // teiltransparent ist. Das ist der Weißschleier-Reflex.
  const heroFlaeche = Math.max(rect.width * rect.height, 1);
  const overlays = [];
  for (const el of hero.querySelectorAll("*")) {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const deckung = (r.width * r.height) / heroFlaeche;
    if (deckung < grenzen.overlayDeckung) continue;

    const opacity = zahl(s.opacity);
    const bg = s.backgroundColor || "";
    const alphaTreffer = bg.match(/rgba?\([^)]*?,\s*([\d.]+)\s*\)/);
    const bgAlpha = alphaTreffer ? parseFloat(alphaTreffer[1]) : (bg && bg !== "rgba(0, 0, 0, 0)" ? 1 : 0);

    const verdaechtig = (wert) => wert >= grenzen.overlayMin && wert <= grenzen.overlayMax;
    if (verdaechtig(opacity) || verdaechtig(bgAlpha)) {
      overlays.push({
        tag: el.tagName.toLowerCase(),
        klasse: (el.className && String(el.className).slice(0, 40)) || "",
        deckung: Math.round(deckung * 100),
        opacity,
        hintergrund: bg
      });
    }
  }

  // Hover-Regeln als Näherung für "nicht statisch".
  // cssRules einer VERLINKTEN Datei ist über file:// nicht lesbar – der
  // Browser behandelt sie als fremde Herkunft und wirft. Da im Template alle
  // Styles in css/*.css liegen, hätte diese Prüfung bei jeder echten Demo
  // fälschlich "keine :hover-Regeln" gemeldet. Gezählt wird deshalb in Node,
  // auf den Dateien selbst; hier nur einsammeln.
  const inlineCss = [...document.querySelectorAll("style")]
    .map((s) => s.textContent || "").join("\n");
  const cssDateien = [...document.querySelectorAll('link[rel~="stylesheet"]')]
    .map((l) => l.getAttribute("href"))
    .filter((h) => h && !/^(https?:)?\/\//.test(h));

  // Stockfotos verraten sich am Pfad.
  const bilder = [...hero.querySelectorAll("img")].map((b) => b.currentSrc || b.src);
  const stock = bilder.filter((u) => /unsplash|shutterstock|pexels|istockphoto|stock\./i.test(u));

  return {
    fehlt: false,
    heroBreite: Math.round(rect.width),
    heroHoehe: Math.round(rect.height),
    fensterBreite,
    fensterHoehe,
    randLinks: Math.round(rect.left),
    randRechts: Math.round(fensterBreite - rect.right),
    vollflaechig: Math.round(rect.width) >= fensterBreite - 1,
    passtInsFenster: Math.round(rect.bottom) <= fensterHoehe + 1,
    h1Groesse,
    textGroesse,
    typoSpannweite: textGroesse ? +(h1Groesse / textGroesse).toFixed(2) : 0,
    overlays,
    inlineCss, cssDateien,
    bilder: bilder.length,
    stockBilder: stock,
    ueberlauf: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
}

/** Liest den Kontrastumfang aus einem Screenshot – über Canvas im Browser. */
async function kontrastAusBild(page, pngBuffer) {
  const dataUrl = "data:image/png;base64," + pngBuffer.toString("base64");
  return page.evaluate(async (url) => {
    const bild = new Image();
    await new Promise((ok, fehler) => { bild.onload = ok; bild.onerror = fehler; bild.src = url; });
    // Herunterrechnen genügt für Helligkeitsverteilung und ist deutlich schneller.
    const breite = Math.min(bild.naturalWidth, 400);
    const hoehe = Math.max(1, Math.round(bild.naturalHeight * (breite / bild.naturalWidth)));
    const canvas = document.createElement("canvas");
    canvas.width = breite; canvas.height = hoehe;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(bild, 0, 0, breite, hoehe);
    const daten = ctx.getImageData(0, 0, breite, hoehe).data;

    let min = 1, max = 0, summe = 0, anzahl = 0;
    for (let i = 0; i < daten.length; i += 4) {
      const l = (0.2126 * daten[i] + 0.7152 * daten[i + 1] + 0.0722 * daten[i + 2]) / 255;
      if (l < min) min = l;
      if (l > max) max = l;
      summe += l; anzahl++;
    }
    return { min: +min.toFixed(3), max: +max.toFixed(3), spanne: +(max - min).toFixed(3), mittel: +(summe / anzahl).toFixed(3) };
  }, dataUrl);
}

async function main() {
  const { dateien, selektor, out } = argumenteLesen(process.argv.slice(2));
  if (!dateien.length) {
    console.error("Keine Datei angegeben.\nBeispiel: node scripts/hero-check.mjs varianten/hero-a.html");
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
    const eintrag = { datei, messungen: {}, befunde: [] };

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const jsFehler = [];
      page.on("pageerror", (e) => jsFehler.push(String(e.message)));
      page.on("console", (m) => { if (m.type() === "error") jsFehler.push(m.text()); });

      await page.goto(url, { waitUntil: "load" });
      await page.waitForTimeout(400); // Webfonts und Einblend-Animationen

      const m = await page.evaluate(messungImDokument, { selektor, grenzen: GRENZEN });
      if (m.fehlt) {
        console.log(`  ${vp.name}: Hero nicht gefunden (Selektor: ${selektor})`);
        eintrag.befunde.push(`Hero-Element nicht gefunden (${selektor})`);
        durchgefallen = true;
        await page.close();
        continue;
      }

      const bildPfad = path.join(out, `${name}--${vp.name}.png`);
      const puffer = await page.screenshot();
      await writeFile(bildPfad, puffer);
      const kontrast = await kontrastAusBild(page, puffer);

      m.kontrast = kontrast;
      m.jsFehler = jsFehler.length;

      let css = m.inlineCss || "";
      for (const rel of m.cssDateien || []) {
        try { css += "\n" + await readFile(path.resolve(path.dirname(datei), rel), "utf8"); }
        catch { /* Datei fehlt – der Browser meldet das als Ladefehler */ }
      }
      m.hoverRegeln = (css.match(/:hover/g) || []).length;
      delete m.inlineCss;
      eintrag.messungen[vp.name] = m;

      console.log(
        `  ${vp.name.padEnd(12)} Hero ${m.heroBreite}×${m.heroHoehe}px  ` +
        `Rand ${m.randLinks}/${m.randRechts}  ` +
        `Typo ${m.typoSpannweite}  Kontrast ${kontrast.spanne}  ` +
        `Überlauf ${m.ueberlauf}  JS-Fehler ${m.jsFehler}`
      );

      // Ausschlusskriterien
      if (HERO_MUSS_PASSEN.has(vp.name) && !m.passtInsFenster) {
        eintrag.befunde.push(`${vp.name}: Hero abgeschnitten (${m.heroHoehe}px in ${vp.height}px Fenster)`);
      }
      if (vp.name === "desktop-1920" && !m.vollflaechig) {
        eintrag.befunde.push(`${vp.name}: Hero nutzt die Fensterbreite nicht (${m.heroBreite} von ${m.fensterBreite}px)`);
      }
      if (m.ueberlauf > 0) {
        eintrag.befunde.push(`${vp.name}: horizontaler Überlauf (${m.ueberlauf}px)`);
      }
      if (m.typoSpannweite && m.typoSpannweite < GRENZEN.typoSpannweite) {
        eintrag.befunde.push(`${vp.name}: Typo-Spannweite ${m.typoSpannweite} (mindestens ${GRENZEN.typoSpannweite}) – wirkt flau`);
      }
      if (kontrast.spanne < GRENZEN.kontrastSpanne) {
        eintrag.befunde.push(`${vp.name}: Kontrastumfang ${kontrast.spanne} (mindestens ${GRENZEN.kontrastSpanne}) – milchig`);
      }
      if (m.overlays.length) {
        for (const o of m.overlays) {
          eintrag.befunde.push(
            `${vp.name}: ganzflächiges Overlay über dem Hero (${o.tag}.${o.klasse}, ` +
            `Deckung ${o.deckung}%, opacity ${o.opacity}, bg ${o.hintergrund}) – Weißschleier-Reflex`
          );
        }
      }
      if (m.stockBilder.length) {
        eintrag.befunde.push(`${vp.name}: Stockfoto im Hero (${m.stockBilder[0]}) – kein Beleg für die Arbeit des Betriebs`);
      }
      if (m.jsFehler) {
        eintrag.befunde.push(`${vp.name}: ${m.jsFehler} JS-Fehler`);
      }
      if (vp.name === "desktop-1920" && m.hoverRegeln === 0) {
        eintrag.befunde.push(`keine :hover-Regeln gefunden – wirkt statisch`);
      }

      await page.close();
    }

    // Befunde, die auf mehreren Breiten identisch auftreten, einmal ausgeben.
    const nachText = new Map();
    for (const b of eintrag.befunde) {
      const treffer = b.match(/^([\w-]+):\s(.*)$/);
      const [breite, text] = treffer ? [treffer[1], treffer[2]] : ["alle", b];
      if (!nachText.has(text)) nachText.set(text, []);
      nachText.get(text).push(breite);
    }
    const einmalig = [...nachText].map(([text, breiten]) =>
      breiten.length >= 3 || breiten[0] === "alle"
        ? text
        : `${breiten.join(", ")}: ${text}`
    );

    if (einmalig.length) {
      durchgefallen = true;
      console.log("  BEFUNDE:");
      for (const b of einmalig) console.log(`   - ${b}`);
    } else {
      console.log("  Keine Ausschlusskriterien gerissen.");
    }
    eintrag.befunde = einmalig;
    bericht.push(eintrag);
  }

  await browser.close();
  await writeFile(path.join(out, "bericht.json"), JSON.stringify(bericht, null, 2));
  console.log(`\nScreenshots und bericht.json unter ${out}/`);
  console.log("Hinweis: Bestandene Messwerte heißen nicht 'guter Hero'. Bewertung: hero-critic.");
  process.exit(durchgefallen ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
