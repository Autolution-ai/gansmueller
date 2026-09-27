#!/usr/bin/env node
/**
 * branchen-check.mjs – prüft Branchendateien der Knowledge Base gegen ihre
 * eigenen Belege.
 *
 * Hintergrund: Eine falsche Zahl in einer Branchendatei wandert über das
 * Dossier in jeden künftigen Hero dieses Gewerks. Ein Review hat in einer
 * Datei 13 solcher Stellen gefunden, nachdem sie von Hand "geprüft" worden
 * war. Struktur anschauen ist keine Prüfung – nachrechnen ist eine.
 *
 *   node scripts/branchen-check.mjs
 *   node scripts/branchen-check.mjs .claude/skills/branchen-wissen/references/dachdecker.md
 *
 * Exit-Code 1, sobald eine Datei einen FEHLER hat (WARNUNG allein: 0).
 *
 * Erwartetes Format einer Zählung:
 *
 *     5 von 8 zeigen ein Kachelraster (Q1, Q3, Q4, Q6, Q7)
 *
 * Die Belegliste steht **in Klammern**, direkt hinter der Zahl, und ist
 * vollständig. Nur diese Form ist maschinell nachrechenbar. Q-Nennungen im
 * erklärenden Nachsatz ("– Q3 macht es zum Claim") gehören nicht zur Zählung
 * und werden nicht mitgezählt.
 *
 * Was geprüft wird:
 *   1. Pflichtabschnitte, Stand-Datum, Auffrischungshinweis
 *   2. Quellen-Notation (Q1..Qn) vorhanden – sonst ist nichts nachrechenbar
 *   3. "X von N": N muss überall der deklarierten Quellenzahl entsprechen
 *   4. "X von N": X darf N nicht übersteigen
 *   5. Belegliste enthält genau X verschiedene Quellen
 *   6. Dieselbe Quelle doppelt in einer Belegliste (Doppelzählung)
 *   7. Unbekannte Quellen-Marker (Q9, wenn es nur Q1..Q8 gibt)
 *   8. Zahlenaussage ganz ohne Quellenmarker
 *   9. Als Vorlage markierte Quellen, die in Strukturzählungen mitlaufen
 *
 * Nicht geprüft (und auch nicht prüfbar): ob die Quelle das wirklich sagt.
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const REFERENZ_ORDNER = ".claude/skills/branchen-wissen/references";

const PFLICHT_ABSCHNITTE = [
  "Austauschbare Formulierungen",
  "Hero-Muster",
  "Trust-Signale",
  "Typische Kundensituationen",
  "Einwände",
  "Typische Leistungen",
  "wirklich differenziert"
];

// Eine Zählung. Der Lookbehind verhindert, dass "4,9 von 5 Sternen" als
// Zählung über die Stichprobe gelesen wird.
const ZAEHLUNG = /(?<![\d.,])(\d+)\s*von\s*(\d+)/g;

const rot = (s) => `\x1b[31m${s}\x1b[0m`;
const gelb = (s) => `\x1b[33m${s}\x1b[0m`;
const gruen = (s) => `\x1b[32m${s}\x1b[0m`;

/** Spannen innerhalb deutscher oder gerader Anführungszeichen. */
function zitatSpannen(z) {
  const spannen = [];
  for (const m of z.matchAll(/„[^“”]*[“”]|"[^"]*"/g)) {
    spannen.push([m.index, m.index + m[0].length]);
  }
  return spannen;
}

/**
 * Absätze statt Zeilen. Die Dateien brechen um, eine Belegliste läuft
 * regelmäßig über zwei Zeilen. Zeilenweise Prüfung sieht dann eine Zählung
 * ohne Beleg, wo einer steht.
 */
function einheiten(zeilen) {
  const raus = [];
  let akt = null;
  const leer = (z) => /^\s*$/.test(z);
  const tabelle = (z) => /^\s*\|/.test(z);
  const neuerBlock = (z) => /^(\s*[-*+]\s|\s*\d+\.\s|#{1,6}\s|>\s)/.test(z);

  for (const [i, z] of zeilen.entries()) {
    if (leer(z)) { akt = null; continue; }
    if (tabelle(z)) { raus.push({ nr: i + 1, text: z, tabelle: true }); akt = null; continue; }
    if (!akt || neuerBlock(z)) { akt = { nr: i + 1, text: z, tabelle: false }; raus.push(akt); continue; }
    akt.text += " " + z.trim();
  }
  return raus;
}

/**
 * Belegbereich im Fließtext: hinter der Zahl bis zum Satzende. Die Grenze
 * verhindert, dass eine Zählung sich die Belege des nächsten Satzes borgt
 * ("0 von 8 nennen X. Nebenbeleg: Q3 zeigt …").
 */
function satzBereich(text, ab) {
  const rest = text.slice(ab);
  const grenze = rest.search(/\.\s|\.$|–|—/);
  return grenze === -1 ? rest : rest.slice(0, grenze);
}

/** Belegbereich in einer Tabellenzeile: eigene Zelle, sonst die nächste. */
function zellenBereich(text, ab) {
  const pipe = text.indexOf("|", ab);
  const eigene = pipe === -1 ? text.slice(ab) : text.slice(ab, pipe);
  if (/\bQ\d+\b/.test(eigene)) return eigene;
  if (pipe === -1) return null;
  const danach = text.indexOf("|", pipe + 1);
  const naechste = danach === -1 ? text.slice(pipe + 1) : text.slice(pipe + 1, danach);
  return /\bQ\d+\b/.test(naechste) ? naechste : null;
}

/**
 * Belegliste einer Zählung. Drei Schreibweisen sind erlaubt und kommen in den
 * Dateien alle vor:
 *   Klammer:       5 von 8 zeigen ein Kachelraster (Q1, Q3, Q4, Q6, Q7)
 *   Belege-Spalte: | Formulierung | 8 von 9 | Q1, Q2, Q3, … |
 *   Doppelpunkt:   So gebaut bei 7 von 9 Quellen: Q1, Q4, Q5, …
 */
function belegliste(einheit, ab) {
  const { text, tabelle } = einheit;

  // Klammer zuerst: darin darf ein Semikolon Einträge trennen
  // ("(Q3 mit Logo-Leiste; Q6 mit Widget)") – das ist kein Satzende.
  const klammer = text.slice(ab).match(/^([^()\n]{0,80}?)\(([^)]*)\)/);
  if (
    klammer &&
    !/[.;–—]/.test(klammer[1]) &&
    !/(?<![\d.,])\d+\s*von\s*\d+/.test(klammer[1]) &&
    /\bQ\d+\b/.test(klammer[2])
  ) {
    return klammer[2];
  }

  const bereich = tabelle ? zellenBereich(text, ab) : satzBereich(text, ab);
  return bereich && /\bQ\d+\b/.test(bereich) ? bereich : null;
}

/** Q-Marker eines Belegbereichs, Bereiche wie "Q1–Q8" ausgeschrieben. */
function markerListe(text) {
  const marker = [];
  const rest = text.replace(/\bQ(\d+)\s*(?:–|—|-|bis)\s*Q?(\d+)\b/g, (treffer, a, b) => {
    const von = Number(a), zu = Number(b);
    if (zu < von || zu - von > 50) return treffer;
    return Array.from({ length: zu - von + 1 }, (_, i) => `Q${von + i}`).join(", ");
  });
  for (const m of rest.matchAll(/\bQ(\d+)\b/g)) marker.push(Number(m[1]));
  return marker;
}

function pruefeDatei(name, text) {
  const fehler = [];
  const warnungen = [];
  const zeilen = text.split("\n");

  // --- 1. Struktur -----------------------------------------------------
  for (const abschnitt of PFLICHT_ABSCHNITTE) {
    if (!new RegExp(`^##\\s.*${abschnitt}`, "mi").test(text)) {
      fehler.push(`Pflichtabschnitt fehlt: "${abschnitt}"`);
    }
  }
  if (!/\*\*Stand:\*\*\s*\d{4}-\d{2}-\d{2}/.test(text)) {
    fehler.push("Kein Stand-Datum im Format **Stand:** JJJJ-MM-TT");
  }
  if (!/Auffrischung/i.test(text)) {
    warnungen.push("Kein Auffrischungshinweis (Alterung der Datei)");
  }

  // --- 2. Quellen einlesen ---------------------------------------------
  // Erwartet Tabellenzeilen der Form: | Q3 | `url` | Ort | Art |
  const quellen = new Map(); // nummer -> {zeile, vorlage}
  for (const [i, z] of zeilen.entries()) {
    const t = z.match(/^\|\s*(?:\*\*)?Q(\d+)(?:\*\*)?\s*\|(.*)$/);
    if (!t) continue;
    // Eine Quellenzeile nennt eine Adresse. Ohne diese Bedingung wird jede
    // andere Tabelle, die zufällig mit | Q3 | beginnt, als Quelle gelesen.
    if (!/https?:\/\/|`[^`]*\.[a-z]{2,}[^`]*`|\b[a-z0-9][a-z0-9-]*\.(de|com|net|org|eu|info|shop)\b/i.test(t[2])) {
      continue;
    }
    const nummer = Number(t[1]);
    const vorlage = /\b(agenturvorlage|vorlage|baukasten|template|agentur)\b/i.test(t[2]);
    if (!quellen.has(nummer)) quellen.set(nummer, { zeile: i + 1, vorlage });
  }

  if (quellen.size === 0) {
    fehler.push(
      "Keine Q-Notation gefunden – keine Zählung dieser Datei ist nachrechenbar. " +
      "Quellen als Tabelle `| Q1 | url | Ort | Art |` anlegen und jede Zahl mit (Q1, Q3, …) belegen."
    );
    return { fehler, warnungen, quellenZahl: 0 };
  }

  const n = quellen.size;
  const vorlagenQ = [...quellen.entries()].filter(([, v]) => v.vorlage).map(([k]) => k);

  const deklariert = text.match(/\*\*Ausgewertet:\*\*\s*(\d+)/);
  if (deklariert && Number(deklariert[1]) !== n) {
    fehler.push(
      `Kopf deklariert ${deklariert[1]} Quellen, die Quellentabelle enthält ${n}`
    );
  }

  // --- 3.-9. Zählungen prüfen ------------------------------------------
  for (const einheit of einheiten(zeilen)) {
    const { nr, text: t } = einheit;

    // Die Quellentabelle selbst und Rückblicke auf frühere Erhebungen sind
    // keine Zählungen über diese Stichprobe.
    if (/^\s*\|\s*(?:\*\*)?Q\d+/.test(t)) continue;
    if (/Erhebung vom|gegenüber der (vorigen|letzten|Erhebung)|Alt-Erhebung/i.test(t)) continue;

    const alleMarker = markerListe(t);
    const unbekannt = [...new Set(alleMarker)].filter((q) => !quellen.has(q));
    if (unbekannt.length) {
      fehler.push(`Zeile ${nr}: unbekannte Quelle(n) Q${unbekannt.join(", Q")}`);
    }

    const zitate = zitatSpannen(t);
    const imZitat = (idx) => zitate.some(([a, b]) => idx >= a && idx < b);

    for (const m of t.matchAll(ZAEHLUNG)) {
      const x = Number(m[1]);
      const basis = Number(m[2]);
      const ende = m.index + m[0].length;

      // "4,9 von 5 Sternen" und zitierte Zählungen sind keine Behauptungen
      // über die Stichprobe.
      if (/^\s*Sternen?/i.test(t.slice(ende))) continue;
      if (imZitat(m.index)) continue;

      if (basis !== n) {
        fehler.push(
          `Zeile ${nr}: "${m[0]}" – Bezugsgröße ${basis} passt nicht zur Quellenzahl ${n}`
        );
        continue;
      }
      if (x > basis) {
        fehler.push(`Zeile ${nr}: "${m[0]}" – Anteil größer als Grundgesamtheit`);
        continue;
      }

      const liste = belegliste(einheit, ende);

      if (liste === null) {
        if (x === 0) {
          warnungen.push(
            `Zeile ${nr}: "${m[0]}" – Null-Aussage ohne Marker. Prüfen, ob die Reichweite ` +
            `im Satz steht ("auf keiner der ${n} Startseiten gefunden"), nicht "gibt es nicht"`
          );
        } else {
          fehler.push(
            `Zeile ${nr}: "${m[0]}" ohne Belegliste – nicht nachprüfbar. ` +
            `Form: "${m[0]} (Q1, Q3, …)" oder eigene Belege-Spalte`
          );
        }
        continue;
      }

      const marker = markerListe(liste);
      const gezaehlt = marker.reduce((acc, q) => acc.set(q, (acc.get(q) || 0) + 1), new Map());
      const doppelt = [...gezaehlt].filter(([, c]) => c > 1).map(([q]) => `Q${q}`);
      if (doppelt.length) {
        fehler.push(
          `Zeile ${nr}: ${doppelt.join(", ")} doppelt in der Belegliste zu "${m[0]}"`
        );
      }

      const eindeutig = gezaehlt.size;
      if (eindeutig !== x) {
        fehler.push(
          `Zeile ${nr}: "${m[0]}" – Belegliste nennt ${eindeutig} Quelle(n) ` +
          `(Q${[...gezaehlt.keys()].join(", Q")})`
        );
      }

      const vorlagenInListe = [...gezaehlt.keys()].filter((q) => vorlagenQ.includes(q));
      if (vorlagenInListe.length && /\b(?:raster|kachel|kennzahl|struktur|aufbau|hero|layout|sektion)/i.test(t)) {
        warnungen.push(
          `Zeile ${nr}: Strukturaussage "${m[0]}" stützt sich auf Vorlagen-Quelle(n) ` +
          `Q${vorlagenInListe.join(", Q")} – dieselbe Vorlage ist kein Branchenmuster`
        );
      }
    }
  }

  return { fehler, warnungen, quellenZahl: n, vorlagenQ };
}

async function main() {
  const argumente = process.argv.slice(2);
  let dateien = argumente;
  if (!dateien.length) {
    const eintraege = await readdir(REFERENZ_ORDNER);
    dateien = eintraege.filter((d) => d.endsWith(".md")).map((d) => path.join(REFERENZ_ORDNER, d));
  }

  let hatFehler = false;
  for (const datei of dateien.sort()) {
    const text = await readFile(datei, "utf8");
    const { fehler, warnungen, quellenZahl, vorlagenQ = [] } = pruefeDatei(datei, text);

    console.log(`\n=== ${path.basename(datei)} ===`);
    console.log(
      `  Quellen mit Q-Notation: ${quellenZahl}` +
      (vorlagenQ.length ? ` · als Vorlage markiert: Q${vorlagenQ.join(", Q")}` : "")
    );

    if (fehler.length) {
      hatFehler = true;
      console.log(rot(`  ${fehler.length} FEHLER:`));
      for (const f of fehler) console.log(rot(`   ✗ ${f}`));
    }
    if (warnungen.length) {
      console.log(gelb(`  ${warnungen.length} Warnung(en):`));
      for (const w of warnungen) console.log(gelb(`   ! ${w}`));
    }
    if (!fehler.length && !warnungen.length) console.log(gruen("  sauber"));
  }

  console.log(
    "\nHinweis: Bestandene Prüfung heißt nur, dass die Zahlen zu den genannten " +
    "Quellen passen. Ob die Quelle das wirklich sagt, prüft kein Skript."
  );
  process.exit(hatFehler ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
