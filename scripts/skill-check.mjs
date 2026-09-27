#!/usr/bin/env node
/**
 * skill-check.mjs – prüft, ob jeder Skill im Repo auch aufgerufen wird.
 *
 * Hintergrund: Am 16.09.2026 stellte sich heraus, dass fünf Skills seit
 * Monaten im Repo lagen und nie geladen wurden. `motion-toolkit` verwies auf
 * „gsap-skills" – ein Name, den es nicht gibt. Die echten Dateien heißen
 * gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-performance, gsap-utils.
 * Ein Sammelname lädt nichts, und eine englische Beschreibung springt in einer
 * deutschen Session kaum von selbst an.
 *
 * Die Lehre: Ein Skill im Repo ist keine Garantie, dass er benutzt wird.
 * Verlässlich ist nur der Aufruf beim Namen an der Stelle im Ablauf, wo er
 * gebraucht wird. Genau das misst dieses Skript.
 *
 *   node scripts/skill-check.mjs
 *   node scripts/skill-check.mjs --selbsttest
 *
 * Zwei Befundarten:
 *   FEHLER  Skill existiert, wird aber nirgends beim Namen genannt (tot).
 *   FEHLER  Ein Name wird als Skill aufgerufen, existiert aber nicht (Luftnummer).
 *
 * Exit-Code 1, sobald ein FEHLER auftritt.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const WURZEL = process.cwd();

/** Dateien, in denen ein Aufruf zählt. Ein Skill, der nur in sich selbst oder
 *  im CHANGELOG steht, ist nicht verdrahtet. */
const ABLAUF = ["CLAUDE.md", "docs/WORKFLOW.md", ".claude/commands", ".claude/agents"];

/** Skills dürfen sich gegenseitig aufrufen (motion-toolkit → gsap-*). Das ist
 *  eine gültige Verdrahtung, aber eine schwächere: Sie greift nur, wenn der
 *  verweisende Skill selbst geladen wurde. Deshalb getrennt gezählt.
 *
 *  Nur Markdown, nicht der ganze Ordner: `ui-ux-pro-max` bringt 3,5 MB CSV,
 *  JSON und kompilierte Python-Dateien mit. Ein Treffer in `styles.csv` ist
 *  kein Aufruf, und ein Treffer in einer `.pyc` ist überhaupt nichts. */
const SKILL_DATEIEN = /(?:^|\/)(?:SKILL\.md|references\/[^/]+\.md)$/;

/** Skills, die bewusst nicht im Ablauf genannt werden müssen, mit Begründung.
 *  Leer lassen, solange es keinen echten Fall gibt: Eine Ausnahme ohne Grund
 *  ist die bequemste Art, diesen Check wirkungslos zu machen. */
const AUSNAHMEN = {};

const rot = (t) => `\x1b[31m${t}\x1b[0m`;
const gruen = (t) => `\x1b[32m${t}\x1b[0m`;
const grau = (t) => `\x1b[90m${t}\x1b[0m`;

function dateienSammeln(pfad, raus = []) {
  const voll = join(WURZEL, pfad);
  if (!existsSync(voll)) return raus;
  if (statSync(voll).isFile()) {
    raus.push(pfad);
    return raus;
  }
  for (const e of readdirSync(voll, { withFileTypes: true })) {
    if (e.name.startsWith(".") && e.name !== ".claude") continue;
    dateienSammeln(join(pfad, e.name), raus);
  }
  return raus;
}

function skillsLesen() {
  const basis = join(WURZEL, ".claude/skills");
  if (!existsSync(basis)) return [];
  return readdirSync(basis, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(basis, e.name, "SKILL.md")))
    .map((e) => e.name)
    .sort();
}

/** Beschreibung aus dem Frontmatter, für den Sprachhinweis. */
function beschreibung(skill) {
  const p = join(WURZEL, ".claude/skills", skill, "SKILL.md");
  const t = readFileSync(p, "utf8");
  const fm = t.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return "";
  const d = fm[1].match(/description:\s*(?:>-?|\|)?\s*([\s\S]*?)(?=\n[a-z_]+:|$)/);
  return d ? d[1].replace(/\s+/g, " ").trim() : "";
}

/** Grobes Sprach-Indiz. Kein Sprachmodell, nur häufige deutsche Funktionswörter.
 *  Reicht für den Zweck: Ein rein englischer Text trifft keines davon. */
const DE_WOERTER = /\b(wird|werden|nutzen|beim|nach|und|die|der|das|für|fuer|bevor|sobald|jeder|jede)\b/i;

/** Alle Stellen, an denen ein Name als Skill *beansprucht* wird.
 *  Drei Formen, alle aus echten Dateien dieses Repos abgeleitet:
 *    „**Skills:** `website-copy`, `anti-slop`"  → Schlüsselwort davor
 *    „Umsetzung → gsap-skills."                 → der Name trägt „skill"
 *    „(Skill: design-system)"                   → Schlüsselwort davor
 */
function skillAnsprueche(text) {
  const raus = [];
  const kandidat = /`?\b([a-z][a-z0-9]*(?:-[a-z0-9]+)+)\b`?/g;
  for (const zeile of text.split("\n")) {
    let m;
    kandidat.lastIndex = 0;
    while ((m = kandidat.exec(zeile))) {
      const name = m[1];
      // Nur der Text unmittelbar davor entscheidet. Eine Zeile wie
      // „**Agenten:** `hero-specialist` · **Skills:** `design-system`" nennt
      // beides; wer die ganze Zeile prüft, erklärt den Agenten zum Skill.
      const davor = zeile.slice(0, m.index).replace(/[`*_]/g, "");
      const danach = zeile.slice(m.index + m[0].length);
      // Dateipfad, kein Skill: `scripts/skill-check.mjs`, `docs/WORKFLOW.md`.
      // Ohne diese Ausnahme meldet das Skript seinen eigenen Dateinamen.
      const istDatei = /^\.[a-z0-9]{2,4}\b/.test(danach) || /[\/]$/.test(davor);
      if (istDatei) continue;
      const schluessel = /\bSkills?\b[\s:→-]*$/i.test(davor);
      const selbstBenannt = /skill/i.test(name); // fängt „gsap-skills"
      if (schluessel || selbstBenannt) raus.push(name);
    }
  }
  return raus;
}

/** Agenten und Commands heißen wie Skills, sind aber keine. Ihre Namen dürfen
 *  nie als „existiert nicht" gemeldet werden. */
function keineSkills() {
  const namen = new Set();
  for (const ordner of [".claude/agents", ".claude/commands"]) {
    const voll = join(WURZEL, ordner);
    if (!existsSync(voll)) continue;
    for (const e of readdirSync(voll)) {
      if (e.endsWith(".md")) namen.add(e.replace(/\.md$/, ""));
    }
  }
  return namen;
}

function analysieren() {
  const skills = skillsLesen();

  const ablaufDateien = ABLAUF.flatMap((p) => dateienSammeln(p));
  const skillDateien = dateienSammeln(".claude/skills").filter((d) => SKILL_DATEIEN.test(d));

  const lesen = (liste) => {
    const m = new Map();
    for (const d of liste) {
      try {
        m.set(d, readFileSync(join(WURZEL, d), "utf8"));
      } catch {
        /* unlesbar: kann keinen Aufruf enthalten */
      }
    }
    return m;
  };
  const imAblauf = lesen(ablaufDateien);
  const inSkills = lesen(skillDateien);

  const fehler = [];
  const warnungen = [];
  const zeilen = [];

  // --- 1. Jeder Skill: wird er beim Namen genannt, und von wo? ---
  for (const s of skills) {
    const muster = new RegExp(`\`${s}\`|\\b${s}\\b(?=[ ,.;:)\`]|$)`, "gm");
    const finde = (quelle, eigenerPfad) => {
      const orte = [];
      for (const [datei, text] of quelle) {
        if (eigenerPfad && datei.startsWith(`.claude/skills/${s}/`)) continue;
        muster.lastIndex = 0;
        if (muster.test(text)) orte.push(datei);
      }
      return orte;
    };
    const ablauf = finde(imAblauf, false);
    const ausSkills = finde(inSkills, true);
    const sprache = DE_WOERTER.test(beschreibung(s)) ? "DE" : "EN";
    zeilen.push({ skill: s, ablauf, ausSkills, sprache });

    if (AUSNAHMEN[s]) continue;

    if (ablauf.length === 0 && ausSkills.length === 0) {
      fehler.push(
        `Skill \`${s}\` wird nirgends beim Namen aufgerufen. Er liegt im Repo, ` +
          `springt aber nur über seine ${sprache === "EN" ? "englische " : ""}Beschreibung an ` +
          `und wird damit in der Praxis nicht geladen. Nenne ihn in docs/WORKFLOW.md, ` +
          `in einem Command oder in dem Agenten, der ihn braucht.`
      );
    } else if (ablauf.length === 0) {
      warnungen.push(
        `Skill \`${s}\` wird nur von einem anderen Skill genannt ` +
          `(${ausSkills.map((d) => d.split("/")[3] || d).join(", ")}), nicht im Ablauf. ` +
          `Das greift nur, solange der verweisende Skill selbst geladen wurde.`
      );
    }
  }

  // --- 2. Umgekehrt: wird ein Name als Skill aufgerufen, den es nicht gibt? ---
  const vorhanden = new Set(skills);
  const nichtSkills = keineSkills();
  const luftnummern = new Map();
  for (const [datei, text] of new Map([...imAblauf, ...inSkills])) {
    for (const name of skillAnsprueche(text)) {
      if (vorhanden.has(name) || nichtSkills.has(name)) continue;
      if (!luftnummern.has(name)) luftnummern.set(name, new Set());
      luftnummern.get(name).add(datei);
    }
  }
  for (const [name, orte] of luftnummern) {
    fehler.push(
      `\`${name}\` wird als Skill aufgerufen, existiert aber nicht unter ` +
        `.claude/skills/. Ein Name, den es nicht gibt, lädt nichts. ` +
        `Fundstellen: ${[...orte].join(", ")}`
    );
  }

  return { zeilen, fehler, warnungen, anzahlSkills: skills.length };
}

const gelb = (t) => `\x1b[33m${t}\x1b[0m`;

function ausgeben({ zeilen, fehler, warnungen, anzahlSkills }) {
  console.log(`\n=== ${anzahlSkills} Skill(s) im Repo ===\n`);
  const breite = Math.max(...zeilen.map((z) => z.skill.length), 5);
  console.log(grau(`  ${"".padEnd(breite)}  SPR  ABL  VON-SKILL  wo im Ablauf`));
  for (const z of zeilen) {
    const a = z.ablauf.length;
    const zahl = a === 0 ? rot(String(a).padStart(3)) : String(a).padStart(3);
    console.log(
      `  ${z.skill.padEnd(breite)}  ${z.sprache}  ${zahl}  ${String(z.ausSkills.length).padStart(9)}  ` +
        grau(a ? z.ablauf.map((d) => d.split("/").pop()).join(" ") : "— nicht im Ablauf —")
    );
  }
  for (const w of warnungen) console.log(`\n  ${gelb("WARNUNG")} ${w}`);
  if (fehler.length === 0) {
    console.log(gruen("\n  Kein toter Skill, keine Luftnummer.\n"));
    return 0;
  }
  console.log(`\n${rot(`${fehler.length} FEHLER`)}\n`);
  for (const f of fehler) console.log(`  ${rot("•")} ${f}\n`);
  return 1;
}

/** Selbsttest: Das Skript muss die beiden echten Defekte vom 16.09.2026
 *  erkennen. Ein Prüfskript, das nie geprüft wurde, ist genauso unbelegt wie
 *  das, was es prüfen soll. */
function selbsttest() {
  let ok = 0;
  let schief = 0;
  const pruefe = (name, bedingung) => {
    if (bedingung) {
      ok++;
      console.log(`  ${gruen("ok")}   ${name}`);
    } else {
      schief++;
      console.log(`  ${rot("FEHL")} ${name}`);
    }
  };

  const t = skillAnsprueche;

  console.log("\n=== Selbsttest ===\n");
  pruefe("erkennt den Sammelnamen: 'Umsetzung → gsap-skills.'",
    t("Umsetzung → gsap-skills.").includes("gsap-skills"));
  pruefe("erkennt 'Skill: design-system'",
    t("(Skill: design-system)").includes("design-system"));
  pruefe("erkennt '**Skills:** `website-copy`, `anti-slop`'",
    t("**Skills:** `website-copy`, `anti-slop`").includes("website-copy"));
  pruefe("erkennt 'Skill `hero-craft`' in der Fließzeile",
    t("**Handwerk:** Skill `hero-craft` (Typologie, Hintergründe).").includes("hero-craft"));
  pruefe("kein Fehlalarm auf gewöhnlichem Bindestrichwort",
    t("Das ist ein Scroll-Effekt und ein Weiss-Schleier.").length === 0);
  pruefe("kein Fehlalarm auf Dateinamen ohne Skill-Bezug",
    t("Gemessen mit `scripts/layout-check.mjs` auf sechs Breiten.").length === 0);
  pruefe("Agent in derselben Zeile wird nicht zum Skill erklaert",
    !t("**Agenten:** `hero-specialist` · **Skills:** `design-system`").includes("hero-specialist"));
  pruefe("und der Skill in derselben Zeile wird trotzdem erkannt",
    t("**Agenten:** `hero-specialist` · **Skills:** `design-system`").includes("design-system"));
  pruefe("kein Fehlalarm auf Tabellenwerten wie `regel-fehlt`",
    t("| `regel-fehlt` | Regel im passenden Skill, plus Messpunkt |").length === 0);
  pruefe("kein Fehlalarm auf dem eigenen Dateinamen",
    t("Geprüft mit `node scripts/skill-check.mjs`.").length === 0);
  pruefe("kein Fehlalarm auf einem Pfad im Skill-Kontext",
    t("Der Skill liegt unter .claude/skills/hero-craft/SKILL.md.").length === 0);
  pruefe("Sprach-Indiz trennt DE von EN",
    DE_WOERTER.test("Nutzen in der Bau-Phase") && !DE_WOERTER.test("Use this when designing"));

  console.log(`\n  ${ok} bestanden, ${schief} fehlgeschlagen\n`);
  return schief === 0 ? 0 : 1;
}

const code = process.argv.includes("--selbsttest")
  ? selbsttest()
  : ausgeben(analysieren());
process.exit(code);
