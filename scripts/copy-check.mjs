#!/usr/bin/env node
/**
 * copy-check.mjs – misst Text und Dokumentstruktur einer Demo-Seite.
 *
 * Füllt die Leerstellen in docs/CHECKLISTE.md, die bisher von Hand geschätzt
 * wurden. Beide bisherigen Demos sind an Regeln gescheitert, die längst im
 * Template standen – aber nie gemessen wurden. Ein Haken ohne Wert gilt als
 * nicht geprüft.
 *
 *   node scripts/copy-check.mjs site/index.html
 *   node scripts/copy-check.mjs --gewerk dachdecker site/index.html
 *   node scripts/copy-check.mjs --perspektive ich site/index.html
 *   node scripts/copy-check.mjs entwurf.txt        (nur Textprüfungen)
 *
 * HTML wird im echten Browser-DOM gelesen (Playwright, Browser ist in dieser
 * Umgebung vorinstalliert). Selbstgebaute Regex-Parser haben genau die Art
 * Fehler, gegen die dieses Skript gebaut ist.
 *
 * Exit-Code 1, sobald ein FEHLER gemeldet wird (WARNUNG allein: 0).
 *
 * Was das Skript NICHT kann: beurteilen, ob ein Satz gut ist. Es fängt
 * Muster. Der Inhaber-Test bleibt Handarbeit.
 */

import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
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
    "    Die Browser liegen dort unter /opt/pw-browsers, kein 'playwright install'.\n" +
    "  Lokal auf dem eigenen Rechner: npm i -D playwright && npx playwright install chromium\n" +
    "    Dort fehlt der Browser sonst und der Start schlägt fehl."
  );
  process.exit(2);
}

// --- Grenzwerte (CLAUDE.md, docs/CHECKLISTE.md, Skills) -----------------
const GRENZEN = {
  ansprache: 2.0,       // "Sie/Ihr" zu "wir/uns", mindestens
  werbewortMax: 2,      // dasselbe Verkaufsargument je Seite
  dreiergruppen: 2,     // je Seite
  gedankenstriche: 0,   // als Stilmittel
  titleMin: 50, titleMax: 60,
  descMin: 140, descMax: 160
};

// --- Wortlisten ---------------------------------------------------------

/** Verkaufsargumente. Öfter als zweimal je Seite = Wiederholung statt Beleg. */
const WERBEWORTE = [
  "qualität", "qualitativ", "zuverlässig", "zuverlässigkeit", "kompetent",
  "kompetenz", "individuell", "maßgeschneidert", "professionell", "hochwertig",
  "erfahrung", "erfahren", "leidenschaft", "transparent", "termingerecht",
  "sorgfältig", "partner", "innovativ", "modern", "nachhaltig", "flexibel",
  "persönlich", "fachgerecht", "präzise", "effizient"
];

/** AI-Floskeln aus dem Skill anti-slop. */
const FLOSKELN = [
  "in der heutigen", "es ist wichtig zu", "tauchen sie ein", "heben sie sich ab",
  "das gewisse etwas", "lassen sie uns", "im folgenden erfahren", "spannende zeiten",
  "die zukunft sieht", "ein meilenstein", "spielt eine entscheidende rolle",
  "unterstreicht die bedeutung", "prägt die landschaft", "zeugt von",
  "im herzen von", "eingebettet in", "wahres schmuckstück", "atemberaubend",
  "experten sagen", "studien zeigen", "nahtlos", "ganzheitlich", "wegweisend",
  "zusammenspiel", "im einklang mit", "nicht nur", "es geht nicht um",
  "aufgrund der tatsache", "zum jetzigen zeitpunkt", "um dieses ziel zu erreichen",
  "fungiert als", "stellt dar", "verfügt über", "ich hoffe", "gerne!",
  "möchten sie, dass", "großartige frage", "werfen wir einen blick"
];

/** Tonalität: Pose statt Fakten (CLAUDE.md §8, Inhaber-Test). */
const TONFALLEN = [
  { muster: /nicht jeden (auftrag|kunden)/i, was: "Ablehnungs-Rhetorik" },
  { muster: /wir nehmen nicht/i, was: "Ablehnungs-Rhetorik" },
  { muster: /ob sie zu uns passen/i, was: "Türsteher-Formulierung" },
  { muster: /passen sie zu uns/i, was: "Türsteher-Formulierung" },
  { muster: /viele (betriebe|anbieter|firmen)/i, was: "Wettbewerbs-Vergleich" },
  { muster: /die meisten (betriebe|anbieter|firmen)/i, was: "Wettbewerbs-Vergleich" },
  { muster: /anders als (andere|der wettbewerb)/i, was: "Wettbewerbs-Vergleich" },
  { muster: /\bmarktführer\b/i, was: "Superlativ ohne Beleg" },
  { muster: /\bnummer 1\b|\bnr\.?\s*1\b/i, was: "Superlativ ohne Beleg" },
  { muster: /\bder beste\b|\bdie beste\b|\bdas beste\b/i, was: "Superlativ ohne Beleg" },
  { muster: /\bführend(e|er|es)?\b/i, was: "Superlativ ohne Beleg" },
  { muster: /\beinzigartig\b/i, was: "Superlativ ohne Beleg" },
  { muster: /preis(e)? (im|nach dem) (vor)?gespräch/i, was: "Vertröstung statt CTA" },
  { muster: /auf anfrage\b/i, was: "Vertröstung statt CTA" },
  { muster: /folgt in kürze|in kürze verfügbar|coming soon|demnächst hier/i,
    was: "Zusage statt Demo-Hinweis" },
  { muster: /drei (dinge|gründe|säulen|werte)/i, was: "angekündigte Dreiergruppe" }
];

/** Wörter, die beim Zählen der Kernbegriffe nichts aussagen. */
const STOPP = new Set(`
der die das den dem des ein eine einen einem einer eines und oder aber auch
ist sind war waren wird werden wurde haben hat hatte für mit von zu im in am
an auf aus bei nach über unter vor durch ohne um als wie dass wenn weil dann
nicht kein keine mehr sehr schon noch nur alle jede jeden man sich ihr ihre
ihren ihrem sie wir uns unser unsere unseren unserem euch ihnen es hier da
so bis vom zur zum beim ins können kann sowie mehr immer dabei
`.trim().split(/\s+/));

const rot = (s) => `\x1b[31m${s}\x1b[0m`;
const gelb = (s) => `\x1b[33m${s}\x1b[0m`;
const gruen = (s) => `\x1b[32m${s}\x1b[0m`;
const grau = (s) => `\x1b[90m${s}\x1b[0m`;

// --- Verbotsliste des Gewerks aus der Knowledge Base --------------------

async function ladeVerbotsliste(gewerk) {
  const datei = `.claude/skills/branchen-wissen/references/${gewerk}.md`;
  let text;
  try { text = await readFile(datei, "utf8"); }
  catch { return { datei, gefunden: false, phrasen: [] }; }

  // Nur der Abschnitt "Austauschbare Formulierungen".
  const start = text.search(/^##\s.*Austauschbare Formulierungen/mi);
  if (start === -1) return { datei, gefunden: true, phrasen: [] };
  const rest = text.slice(start + 1);
  const ende = rest.search(/^##\s/m);
  const abschnitt = ende === -1 ? rest : rest.slice(0, ende);

  const phrasen = new Set();
  // Die Branchendateien schreiben „…" mit geradem Schlusszeichen. Beide Formen
  // zulassen – ein Muster, das nur typografische Anführungszeichen kennt,
  // lädt still eine leere Liste und meldet dann fälschlich „sauber".
  for (const m of abschnitt.matchAll(/„([^„“”"]{3,60})["“”]/g)) {
    const p = m[1]
      .replace(/\*\*/g, "")
      .replace(/\\\|/g, "|")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    // Platzhalter und Fragmente aussortieren.
    if (!p || p.includes("…") || p.startsWith("/")) continue;
    phrasen.add(p);
  }
  return { datei, gefunden: true, phrasen: [...phrasen] };
}

// --- Textprüfungen (gelten für HTML-Text und für reine Textdateien) -----

function satzListe(text) {
  // Auch am Zeilenumbruch trennen: Eine Überschrift ohne Punkt würde sonst mit
  // dem folgenden Absatz zu einem Riesensatz verschmelzen, und jede
  // satzbezogene Prüfung liefe ins Leere.
  return text
    .split(/\n+|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function pruefeText(text, { perspektive, verbotsliste, fliesstext = text }) {
  const fehler = [], warnungen = [], werte = {};
  const klein = text.toLowerCase();

  // Ansprache-Verhältnis. "Sie/Ihr" groß geschrieben ist die Anrede;
  // "sie/ihr" klein ist die dritte Person und zählt nicht.
  const leser = (text.match(/\b(Sie|Ihr|Ihre|Ihren|Ihrem|Ihrer|Ihres|Ihnen)\b/g) || []).length;
  const selbst = (text.match(/\b([Ww]ir|[Uu]ns|[Uu]nser|[Uu]nsere|[Uu]nseren|[Uu]nserem|[Uu]nserer|[Uu]nseres)\b/g) || []).length;
  werte.ansprache = selbst ? +(leser / selbst).toFixed(2) : (leser ? Infinity : 0);
  werte.leser = leser; werte.selbst = selbst;
  if (selbst > 0 && werte.ansprache < GRENZEN.ansprache) {
    fehler.push(
      `Ansprache-Verhältnis ${werte.ansprache}:1 (Leser ${leser} zu Selbst ${selbst}) – ` +
      `mindestens ${GRENZEN.ansprache}:1. Die Seite redet über sich statt mit dem Leser`
    );
  }

  // Gedankenstriche als Stilmittel.
  const striche = (text.match(/—| – /g) || []).length;
  werte.gedankenstriche = striche;
  if (striche > GRENZEN.gedankenstriche) {
    fehler.push(`${striche} Gedankenstrich(e) im Text – als Stilmittel gesperrt (CLAUDE.md §7)`);
  }

  // Verkaufsargumente, die sich wiederholen.
  werte.werbeworte = {};
  for (const w of WERBEWORTE) {
    const n = (klein.match(new RegExp(`\\b${w}`, "g")) || []).length;
    if (n) werte.werbeworte[w] = n;
    if (n > GRENZEN.werbewortMax) {
      fehler.push(
        `„${w}" steht ${n}× auf der Seite (max. ${GRENZEN.werbewortMax}) – ` +
        `Ein-Nennung-Regel: einmal an der stärksten Stelle, danach die Folge erzählen`
      );
    }
  }

  // Häufigste Inhaltswörter, nur als Information.
  const haeufig = new Map();
  for (const w of klein.match(/[a-zäöüß]{4,}/g) || []) {
    if (STOPP.has(w)) continue;
    haeufig.set(w, (haeufig.get(w) || 0) + 1);
  }
  werte.haeufigsteWoerter = [...haeufig].sort((a, b) => b[1] - a[1]).slice(0, 6);

  // AI-Floskeln.
  const floskeln = FLOSKELN.filter((f) => klein.includes(f));
  werte.floskeln = floskeln;
  for (const f of floskeln) fehler.push(`AI-Floskel: „${f}" (Skill anti-slop)`);

  // Tonfallen.
  werte.tonfallen = [];
  for (const t of TONFALLEN) {
    const treffer = text.match(t.muster);
    if (treffer) {
      werte.tonfallen.push(`${t.was}: „${treffer[0]}"`);
      fehler.push(`${t.was}: „${treffer[0]}" – fällt durch den Inhaber-Test (CLAUDE.md §8)`);
    }
  }

  // Verbotsliste des Gewerks.
  werte.gesperrt = [];
  for (const p of verbotsliste) {
    if (klein.includes(p)) {
      werte.gesperrt.push(p);
      fehler.push(
        `Austauschbare Formulierung des Gewerks: „${p}" – laut Branchendatei ` +
        `benutzen das fast alle. Austauschbarkeits-Test nicht bestanden`
      );
    }
  }

  // Stakkato: drei kurze Sätze hintereinander. Nur im Fließtext – ein
  // Listenpunkt ist legitim kurz, drei davon sind eine Liste, kein Stakkato.
  const saetze = satzListe(fliesstext);
  let stakkato = 0;
  for (let i = 0; i + 2 < saetze.length; i++) {
    const drei = saetze.slice(i, i + 3);
    if (drei.every((s) => s.split(/\s+/).length <= 4)) { stakkato++; i += 2; }
  }
  werte.stakkato = stakkato;
  if (stakkato) {
    warnungen.push(`${stakkato}× drei sehr kurze Sätze in Folge – Stakkato-Dreier (anti-slop)`);
  }

  // Perspektive.
  if (perspektive === "ich" && selbst > 0) {
    fehler.push(
      `Perspektive „ich" verlangt, aber ${selbst}× „wir/uns/unser" im Text. ` +
      `Eine ganze Seite nachträglich umzuschreiben war schon eine komplette Runde`
    );
  }
  if (perspektive === "wir") {
    const ichZahl = (text.match(/\b(ich|mich|mir|mein|meine|meinen|meinem)\b/gi) || []).length;
    if (ichZahl > 0) fehler.push(`Perspektive „wir" verlangt, aber ${ichZahl}× „ich/mein" im Text`);
  }

  return { fehler, warnungen, werte };
}

// --- Strukturprüfungen im echten DOM ------------------------------------

function messungImDokument() {
  const txt = (el) => (el?.textContent || "").replace(/\s+/g, " ").trim();

  const ueberschriften = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .map((h) => ({ stufe: Number(h.tagName[1]), text: txt(h).slice(0, 70) }));

  const spruenge = [];
  let vorher = 0;
  for (const u of ueberschriften) {
    if (vorher && u.stufe > vorher + 1) spruenge.push(`h${vorher} → h${u.stufe} bei „${u.text}"`);
    vorher = u.stufe;
  }

  const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  const doppelteIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];

  const anker = [...document.querySelectorAll('a[href^="#"]')]
    .map((a) => a.getAttribute("href"))
    .filter((h) => h && h.length > 1);
  const toteAnker = [...new Set(anker.filter((h) => {
    try { return !document.querySelector(h); } catch { return true; }
  }))];

  const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content?.trim() || "";
  const og = (p) => document.querySelector(`meta[property="${p}"]`)?.content?.trim() || "";

  const bilder = [...document.querySelectorAll("img")];
  const ohneAlt = bilder.filter((b) => !b.hasAttribute("alt")).length;
  const stummeDateinamen = bilder
    .map((b) => (b.getAttribute("src") || "").split("/").pop() || "")
    .filter((n) => /^(img|dsc|foto|bild|image|unbenannt|screenshot)[-_ ]?\d+/i.test(n));

  // JSON-LD: vorhanden, und welche Felder stehen drin, die Beleg brauchen.
  const ldBloecke = [...document.querySelectorAll('script[type="application/ld+json"]')];
  const ldRoh = ldBloecke.map((s) => s.textContent || "").join(" ");
  // Zwei Klassen, seit 2026.10.01 getrennt:
  //   hart   – auch mit echter Quelle nicht ins eigene JSON-LD (Richtlinien)
  //   belegt – erlaubt, sobald der Wert in quellen/ steht. Prueft beleg-check.
  const ldHart = ["aggregateRating", "review"].filter((f) => ldRoh.includes(f));
  const ldBelegpflichtig = ["openingHours", "priceRange"].filter((f) => ldRoh.includes(f));

  // Dreiergruppen: Container mit genau drei gleichartigen Kindern.
  let dreier = 0;
  const dreierOrte = [];
  for (const el of document.querySelectorAll("ul,ol,div,section,nav")) {
    const kinder = [...el.children];
    if (kinder.length !== 3) continue;
    const tags = new Set(kinder.map((k) => k.tagName));
    if (tags.size !== 1) continue;
    if (!kinder.some((k) => txt(k).length > 10)) continue;  // reine Icon-Reihen ignorieren
    dreier++;
    dreierOrte.push(`${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ")[0] : ""}`);
  }

  // CTA-Beschriftungen, um uneinheitliche Labels zu sehen.
  const ctaLabels = [...new Set(
    [...document.querySelectorAll("a,button")]
      .map((e) => txt(e))
      .filter((t) => t.length > 2 && t.length < 60)
      .filter((t) => /anfrage|kontakt|termin|angebot|jetzt|bewerb|rufen|beraten|rechner|konfigurat/i.test(t))
  )];

  return {
    h1: document.querySelectorAll("h1").length,
    ueberschriften: ueberschriften.length,
    spruenge,
    doppelteIds,
    toteAnker,
    title: (document.title || "").trim(),
    description: meta("description"),
    og: { title: og("og:title"), description: og("og:description"), image: og("og:image") },
    bilder: bilder.length,
    ohneAlt,
    stummeDateinamen,
    ldVorhanden: ldBloecke.length,
    ldHart,
    ldBelegpflichtig,
    dreier,
    dreierOrte,
    ctaLabels,
    // Blockweise statt am Stück: siehe satzListe().
    sichtbarerText: [...document.querySelectorAll(
      "h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,dt,dd,button,a,label,summary,td,th"
    )].map(txt).filter(Boolean).join("\n"),
    fliesstext: [...document.querySelectorAll("p,blockquote,figcaption,dd")]
      .map(txt).filter(Boolean).join("\n")
  };
}

function pruefeStruktur(m) {
  const fehler = [], warnungen = [];

  if (m.h1 !== 1) fehler.push(`${m.h1} H1 auf der Seite – genau eine ist Pflicht`);
  for (const s of m.spruenge) fehler.push(`Sprung in der Überschriftenhierarchie: ${s}`);
  for (const id of m.doppelteIds) fehler.push(`Doppelte ID: #${id} – bricht Anker und Formularbeschriftungen`);
  for (const a of m.toteAnker) fehler.push(`Anker ohne Ziel: ${a} – in einer Demo ein Vertrauensbruch`);

  const t = m.title.length;
  if (!t) fehler.push("Kein <title> gesetzt");
  else if (t < GRENZEN.titleMin || t > GRENZEN.titleMax) {
    warnungen.push(`<title> ${t} Zeichen (Arbeitsbereich ${GRENZEN.titleMin}–${GRENZEN.titleMax}): „${m.title}"`);
  }

  const d = m.description.length;
  if (!d) fehler.push("Keine <meta name=\"description\"> gesetzt");
  else if (d < GRENZEN.descMin || d > GRENZEN.descMax) {
    warnungen.push(`<meta description> ${d} Zeichen (Arbeitsbereich ${GRENZEN.descMin}–${GRENZEN.descMax})`);
  }

  if (m.ohneAlt) fehler.push(`${m.ohneAlt} Bild(er) ohne alt-Attribut`);
  for (const n of m.stummeDateinamen) {
    warnungen.push(`Nichtssagender Bilddateiname: ${n} – sprechende Namen nutzen`);
  }

  for (const f of ["title", "description", "image"]) {
    if (!m.og[f]) warnungen.push(`og:${f} fehlt – der Demo-Link sieht in WhatsApp und Mail kaputt aus`);
  }
  if (m.og.image && /^https?:\/\//i.test(m.og.image)) {
    warnungen.push(`og:image ist ein Hotlink (${m.og.image}) – fremde URLs laufen ab, Bild lokal ablegen`);
  }

  if (!m.ldVorhanden) warnungen.push("Kein JSON-LD – lokale Signale fehlen (Skill seo-basis)");
  for (const f of m.ldHart) {
    fehler.push(
      `JSON-LD enthält „${f}" – auch mit echter Google-Bewertung nicht ins eigene ` +
      `Markup. Review-Auszeichnung bildet Bewertungen ab, die auf dieser Seite ` +
      `gesammelt wurden, nicht von einer fremden Plattform übernommene. ` +
      `Richtig ist: Note sichtbar auf der Seite zeigen, mit Quelle Google, und ` +
      `das Profil über „sameAs" verlinken (Skill seo-basis)`
    );
  }
  for (const f of m.ldBelegpflichtig) {
    warnungen.push(
      `JSON-LD enthält „${f}" – erlaubt, sobald der Wert in quellen/ steht. ` +
      `Gegenprobe: node scripts/beleg-check.mjs <datei>`
    );
  }

  if (m.dreier > GRENZEN.dreiergruppen) {
    fehler.push(
      `${m.dreier} Dreiergruppen auf der Seite (max. ${GRENZEN.dreiergruppen}): ${m.dreierOrte.join(", ")} – ` +
      `der Rhythmus, an dem KI-Layout erkannt wird`
    );
  }

  if (m.ctaLabels.length > 4) {
    warnungen.push(`${m.ctaLabels.length} verschiedene CTA-Beschriftungen: ${m.ctaLabels.join(" | ")} – ein Label je Ziel`);
  }

  return { fehler, warnungen };
}

// --- Ablauf -------------------------------------------------------------

function argumenteLesen(argv) {
  const dateien = [];
  let gewerk = null, perspektive = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--gewerk") gewerk = argv[++i];
    else if (argv[i] === "--perspektive") perspektive = argv[++i];
    else dateien.push(argv[i]);
  }
  return { dateien, gewerk, perspektive };
}

async function main() {
  const { dateien, gewerk, perspektive } = argumenteLesen(process.argv.slice(2));
  if (!dateien.length) {
    console.error(
      "Keine Datei angegeben.\n" +
      "  node scripts/copy-check.mjs site/index.html\n" +
      "  node scripts/copy-check.mjs --gewerk dachdecker --perspektive wir site/index.html"
    );
    process.exit(2);
  }

  let verbotsliste = [];
  if (gewerk) {
    const v = await ladeVerbotsliste(gewerk);
    if (!v.gefunden) {
      console.error(`Branchendatei nicht gefunden: ${v.datei}. Erst /branche ${gewerk} laufen lassen.`);
      process.exit(2);
    }
    verbotsliste = v.phrasen;
    console.log(grau(`Verbotsliste ${gewerk}: ${verbotsliste.length} Formulierungen aus ${v.datei}`));
  }

  const html = dateien.filter((d) => /\.html?$/i.test(d));
  let browser = null;
  if (html.length) browser = await ladePlaywright().chromium.launch();

  let durchgefallen = false;

  for (const datei of dateien) {
    console.log(`\n=== ${path.basename(datei)} ===`);
    let fehler = [], warnungen = [], werte = {}, struktur = null;

    if (/\.html?$/i.test(datei)) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(pathToFileURL(path.resolve(datei)).href, { waitUntil: "load" });
      struktur = await page.evaluate(messungImDokument);
      await page.close();

      const s = pruefeStruktur(struktur);
      fehler.push(...s.fehler); warnungen.push(...s.warnungen);

      const t = pruefeText(struktur.sichtbarerText,
        { perspektive, verbotsliste, fliesstext: struktur.fliesstext });
      fehler.push(...t.fehler); warnungen.push(...t.warnungen); werte = t.werte;
    } else {
      const text = await readFile(datei, "utf8");
      const t = pruefeText(text, { perspektive, verbotsliste });
      fehler.push(...t.fehler); warnungen.push(...t.warnungen); werte = t.werte;
      console.log(grau("  Textdatei – nur Textprüfungen, keine Struktur"));
    }

    // Messwerte für die Checkliste.
    console.log("  MESSWERTE (in docs/CHECKLISTE.md eintragen):");
    console.log(`    Ansprache-Verhältnis      ${werte.ansprache} : 1   (Leser ${werte.leser}, Selbst ${werte.selbst})`);
    console.log(`    Gedankenstriche           ${werte.gedankenstriche}`);
    console.log(`    Stakkato-Dreier           ${werte.stakkato}`);
    if (struktur) {
      console.log(`    H1                        ${struktur.h1}`);
      console.log(`    Hierarchie-Sprünge        ${struktur.spruenge.length}`);
      console.log(`    Doppelte IDs              ${struktur.doppelteIds.length}`);
      console.log(`    Dreiergruppen             ${struktur.dreier}`);
      console.log(`    Bilder ohne alt           ${struktur.ohneAlt} von ${struktur.bilder}`);
      console.log(`    title / description       ${struktur.title.length} / ${struktur.description.length} Zeichen`);
    }
    const top = Object.entries(werte.werbeworte || {}).sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (top.length) {
      console.log(`    Häufigstes Verkaufswort   ${top.map(([w, n]) => `${w} (${n}×)`).join(", ")}`);
    }
    if (werte.haeufigsteWoerter?.length) {
      console.log(grau(`    Häufigste Wörter          ${werte.haeufigsteWoerter.map(([w, n]) => `${w} ${n}×`).join(", ")}`));
    }

    if (fehler.length) {
      durchgefallen = true;
      console.log(rot(`  ${fehler.length} FEHLER:`));
      for (const f of fehler) console.log(rot(`   ✗ ${f}`));
    }
    if (warnungen.length) {
      console.log(gelb(`  ${warnungen.length} Warnung(en):`));
      for (const w of warnungen) console.log(gelb(`   ! ${w}`));
    }
    if (!fehler.length && !warnungen.length) console.log(gruen("  sauber"));
  }

  if (browser) await browser.close();

  console.log(
    `\nHinweis: Bestandene Messwerte heißen nicht „guter Text". Das Skript fängt ` +
    `Muster, es beurteilt keinen Satz. Der Inhaber-Test bleibt Handarbeit.`
  );
  process.exit(durchgefallen ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
