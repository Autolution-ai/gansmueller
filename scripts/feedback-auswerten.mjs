#!/usr/bin/env node
/**
 * feedback-auswerten.mjs – zählt die Befunde aus mehreren Rückmeldungsdateien.
 *
 * Die Dateien entstehen je Demo über /closing (Agent `feedback-analyst`) und
 * liegen NICHT im Repo – Bruno sammelt sie und legt sie zur Auswertung ab.
 *
 *   node scripts/feedback-auswerten.mjs .feedback/*.md
 *   node scripts/feedback-auswerten.mjs --min 3 rueckmeldungen/
 *
 * Warum ein Skript und kein Agent: Ein Agent, der "in drei Demos war das so"
 * behauptet, schätzt. Muster müssen gezählt werden, sonst entstehen Regeln
 * für Probleme, die es nie gab. Dieselbe Lehre wie bei branchen-check.mjs.
 *
 * Das Skript zählt. Was daraus folgt, entscheidet /auswerten – mit Urteil.
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const MIN_VORKOMMEN = 2;   // n=1 ist kein Muster

const KATEGORIEN = ["hero","struktur","copy","design","assets","fakten","funnel","technik"];
const URSACHEN = ["information-fehlte","regel-ignoriert","regel-fehlt","geraten-statt-gefragt","geschmack"];

const rot = (s) => `\x1b[31m${s}\x1b[0m`;
const gelb = (s) => `\x1b[33m${s}\x1b[0m`;
const gruen = (s) => `\x1b[32m${s}\x1b[0m`;
const grau = (s) => `\x1b[90m${s}\x1b[0m`;

/** Liest eine Rückmeldungsdatei: Kopfdaten plus Befunde. */
function leseDatei(name, text) {
  const warnungen = [];

  const kopf = {};
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    for (const zeile of fm[1].split("\n")) {
      const m = zeile.match(/^([a-z_]+):\s*(.*)$/);
      if (m) kopf[m[1]] = m[2].trim();
    }
  } else {
    warnungen.push("kein Kopf (YAML-Frontmatter) gefunden");
  }

  const befunde = [];
  // Ein Befund beginnt mit "### B<n> – Titel" und läuft bis zum nächsten ###.
  const bloecke = text.split(/^###\s+/m).slice(1);
  for (const block of bloecke) {
    const titel = block.split("\n")[0].replace(/^B\d+\s*[–-]\s*/, "").trim();
    const feld = (n) => {
      const m = block.match(new RegExp(`^-\\s*\\*\\*${n}:\\*\\*\\s*(.*)$`, "mi"));
      return m ? m[1].trim().toLowerCase() : null;
    };
    const belegBlock = block.match(/^-\s*\*\*Beleg:\*\*\s*([\s\S]*?)(?=^-\s*\*\*|\n###|$)/mi);
    befunde.push({
      datei: name,
      demo: kopf.demo || name,
      titel,
      kategorie: feld("Kategorie"),
      phase: feld("Phase"),
      schwere: feld("Schwere"),
      ursache: feld("Ursache"),
      beleg: belegBlock ? belegBlock[1].trim() : null,
      regel: feld("Bestehende Regel")
    });
  }
  if (!befunde.length) warnungen.push("keine Befunde gefunden (Format `### B1 – Titel`?)");

  return { kopf, befunde, warnungen };
}

/** Gruppiert Befunde nach ähnlichem Titel – grobe Näherung, kein Urteil. */
function themen(befunde) {
  const STOPP = new Set("der die das den dem des ein eine und oder in im auf für mit von zu als ist war wurde nicht kein bei".split(" "));
  const schluessel = (t) => (t.toLowerCase().match(/[a-zäöüß]{4,}/g) || [])
    .filter((w) => !STOPP.has(w)).sort().slice(0, 3).join("+");

  const gruppen = new Map();
  for (const b of befunde) {
    const k = schluessel(b.titel) || b.titel.toLowerCase();
    if (!gruppen.has(k)) gruppen.set(k, []);
    gruppen.get(k).push(b);
  }
  return gruppen;
}

function zaehle(liste, feld) {
  const m = new Map();
  for (const b of liste) {
    const v = b[feld] || "(fehlt)";
    m.set(v, (m.get(v) || 0) + 1);
  }
  return [...m].sort((a, b) => b[1] - a[1]);
}

function balken(n, max, breite = 28) {
  return "█".repeat(Math.max(1, Math.round((n / Math.max(max, 1)) * breite)));
}

async function main() {
  const argv = process.argv.slice(2);
  let min = MIN_VORKOMMEN;
  const pfade = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--min") min = Number(argv[++i]);
    else pfade.push(argv[i]);
  }
  if (!pfade.length) {
    console.error("Keine Dateien angegeben.\n  node scripts/feedback-auswerten.mjs .feedback/*.md");
    process.exit(2);
  }

  // Ordner auflösen
  const dateien = [];
  for (const p of pfade) {
    try {
      const eintraege = await readdir(p);
      for (const e of eintraege) if (e.endsWith(".md")) dateien.push(path.join(p, e));
    } catch { dateien.push(p); }
  }

  const alle = [];
  const demos = new Set();
  let formatWarnungen = 0;

  for (const d of dateien.sort()) {
    const text = await readFile(d, "utf8");
    const { kopf, befunde, warnungen } = leseDatei(path.basename(d), text);
    for (const w of warnungen) {
      console.log(gelb(`  ! ${path.basename(d)}: ${w}`));
      formatWarnungen++;
    }
    demos.add(kopf.demo || path.basename(d));
    alle.push(...befunde);
  }

  console.log(`\n=== ${demos.size} Demo(s), ${alle.length} Befunde ===\n`);
  if (!alle.length) { console.log(rot("Nichts auszuwerten.")); process.exit(1); }

  // --- Verteilungen ---
  for (const [feld, titel, erlaubt] of [
    ["ursache", "Ursachen – was daraus folgt, steht in /auswerten", URSACHEN],
    ["kategorie", "Kategorien", KATEGORIEN],
    ["phase", "Phase, in der es hätte auffallen müssen", null],
    ["schwere", "Schwere", null]
  ]) {
    const z = zaehle(alle, feld);
    const max = z[0]?.[1] || 1;
    console.log(`${titel}:`);
    for (const [wert, n] of z) {
      const unbekannt = erlaubt && wert !== "(fehlt)" && !erlaubt.includes(wert);
      const anteil = Math.round((n / alle.length) * 100);
      const zeile = `  ${String(wert).padEnd(24)} ${String(n).padStart(3)}  ${String(anteil).padStart(3)}%  ${balken(n, max)}`;
      console.log(unbekannt ? rot(zeile + "   ← unbekannter Wert") : zeile);
    }
    console.log();
  }

  // --- Muster: dasselbe Thema in mehreren Demos ---
  console.log(`Muster (mindestens ${min} verschiedene Demos):\n`);
  const gruppen = themen(alle);
  const muster = [...gruppen.values()]
    .map((g) => ({ g, demos: new Set(g.map((b) => b.demo)) }))
    .filter((x) => x.demos.size >= min)
    .sort((a, b) => b.demos.size - a.demos.size);

  if (!muster.length) {
    console.log(grau(`  Keins. Bei ${demos.size} Demo(s) ist das normal – n=1 ist kein Muster.`));
  }
  for (const { g, demos: d } of muster) {
    const ursache = zaehle(g, "ursache")[0][0];
    console.log(`  ${rot("▸")} ${g[0].titel}`);
    console.log(`      ${d.size} von ${demos.size} Demos: ${[...d].join(", ")}`);
    console.log(`      Ursache überwiegend: ${ursache}`);
    console.log(grau(`      Belege: ${g.filter((b) => b.beleg).length} von ${g.length} Befunden`));
    console.log();
  }

  // --- Qualität der Datenbasis ---
  const ohneBeleg = alle.filter((b) => !b.beleg).length;
  const ohneUrsache = alle.filter((b) => !b.ursache).length;
  console.log("Datenqualität:");
  console.log(`  ohne Beleg:   ${ohneBeleg}${ohneBeleg ? rot("  ← nicht verwertbar, Belegpflicht") : gruen("  ok")}`);
  console.log(`  ohne Ursache: ${ohneUrsache}${ohneUrsache ? gelb("  ← Einordnung fehlt") : gruen("  ok")}`);

  console.log(grau(
    "\nHinweis: Das Skript zählt nur. Ob aus einem Muster ein Gate, eine Regel " +
    "oder nichts folgt, entscheidet /auswerten – mit Urteil und mit Blick ins Regelwerk."
  ));
  process.exit(ohneBeleg > 0 || formatWarnungen > 0 ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
