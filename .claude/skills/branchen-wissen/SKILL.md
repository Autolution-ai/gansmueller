---
name: branchen-wissen
description: >
  Knowledge Base pro Gewerk: welche Formulierungen in dieser Branche
  austauschbar sind, welche Hero-Muster dominieren, welche Trust-Signale
  zählen, welche Einwände echt sind und was wirklich differenziert. Nutzen in
  Phase 1b (Dossier), beim Hero und beim Texten – immer bevor formuliert wird.
  Gefüllt und aufgefrischt über den Befehl /branche.
---

# Branchen-Wissen

**Austauschbarkeit ist eine Eigenschaft des Gewerks, nicht des Ortes.** Ob der
Dachdecker in Karlsruhe oder in Kiel sitzt – „Ihr Dach in den besten Händen"
ist in beiden Städten beliebig. Deshalb wird die Wettbewerbsrecherche **einmal
pro Gewerk** gemacht und nicht pro Demo.

Das spart die teuerste Phase und wird mit jeder Demo besser.

## Wie benutzen

1. Gewerk aus `docs/DEMO-SPEC.md` bestimmen.
2. Passende Datei unter `references/` lesen – **nur diese eine**, nicht alle.
3. Die Verbotsliste des Gewerks gilt ab dann als gesperrt. Sie geht auch ins
   Dossier (`docs/DOSSIER.md`, Abschnitt 8).
4. Fehlt das Gewerk: `/branche <gewerk>` laufen lassen oder ersatzweise drei
   Wettbewerber direkt scrapen und den Fund am Ende als neue Datei ablegen.

## Was drin steht

| Block | Wofür |
|---|---|
| Kopf: Stand, Quellen mit Datum, Anzahl Seiten | Belegpflicht, Alterung sichtbar |
| **Austauschbare Formulierungen** | Verbotsliste fürs Gewerk |
| Hero-Muster der Branche | Was dominiert – und was dadurch auffällt |
| Trust-Signale, die zählen | Innung, Meisterbrief, Herstellerpartner |
| Typische Kundensituationen | Rohstoff für Stufe 2 der Konkretheits-Leiter |
| Echte Einwände | FAQ-Rohstoff |
| Typische Leistungen | Struktur-Rohstoff |
| **Was wirklich differenziert** | Das Gegenteil der Verbotsliste |

## Wie belegt wird

Jede Datei führt ihre Quellen als nummerierte Tabelle (Q1, Q2, …). Jede
Zahlenaussage nennt die Nummern, auf denen sie steht: „5 von 8 zeigen ein
Kachelraster (Q1, Q3, Q4, Q6, Q7)". Ohne diese Notation ist keine Zahl der
Datei nachrechenbar, und eine falsche Zahl wandert über das Dossier in jeden
künftigen Hero dieses Gewerks.

`node scripts/branchen-check.mjs` rechnet das nach: Bezugsgröße, Doppelzählung,
Zahlen ohne Marker, Vorlagen-Quellen in Strukturaussagen. Eine Datei mit
Fehlern gilt als nicht erhoben.

Was das Skript **nicht** prüft: ob die Quelle das wirklich sagt. Marker
ergänzen, um grün zu werden, macht aus einer Erfindung einen maschinell
bestätigten Beleg. Wer einen Beleg nicht belegen kann, streicht die Aussage.

## Zwei Grenzen, die man kennen muss

**Die Dateien altern.** Was 2026 differenziert, ist 2028 Standard. Jede Datei
trägt ihr Prüfdatum. **Ist sie älter als zwölf Monate, gilt sie als Hinweis,
nicht als Beleg** – dann `/branche <gewerk>` erneut laufen lassen.

**Branchenwissen ersetzt nicht den lokalen Blick.** Es beantwortet zuverlässig
„was ist in diesem Gewerk beliebig". Es beantwortet **nicht**, was der
Wettbewerber in der Nachbarstraße gerade macht. Bei stark umkämpften Lagen oder
wenn Bruno es verlangt: zusätzlich drei lokale Betriebe ansehen.

## Verfügbare Gewerke

<!-- Nach jedem /branche-Lauf hier ergänzen. -->

| Gewerk | Datei | Stand | Basis | Vorlagen-Quellen |
|---|---|---|---|---|
| Dachdecker | `references/dachdecker.md` | 2026-09-11 | 8 Startseiten aus 7 Städten | Q4 |
| Elektrotechnik | `references/elektro.md` | 2026-09-11 | 8 Startseiten aus 5 Regionen | Q6 |
| SHK (Sanitär/Heizung/Klima) | `references/shk.md` | 2026-09-11 | 9 Seiten, davon 8 Startseiten | Q5, Q6 |
| Metallbau / Schlosserei | `references/metallbau.md` | 2026-09-11 | 12 Startseiten aus 6 Bundesländern | Q5, Q8, Q11, Q12 |
| Bau / Hochbau | `references/bau.md` | 2026-09-11 | 8 Startseiten – Raum Paderborn überrepräsentiert | Q1, Q7 |
| Maler und Lackierer | `references/maler.md` | 2026-09-11 | 8 Startseiten aus 6 Städten | Q2, Q4, Q7 |

Alle sechs Dateien laufen **fehlerfrei** durch `node scripts/branchen-check.mjs`
(0 Fehler). Zwei davon – `maler.md` (2) und `metallbau.md` (5) – melden
zusätzlich Warnungen: Strukturaussagen, die sich auf eine Vorlagen-Quelle
stützen. Das ist kein Formfehler, sondern ein echter inhaltlicher Hinweis –
die Spalte **Vorlagen-Quellen** nennt genau diese Seiten, die erkennbar auf
einer Agenturvorlage oder einem Baukasten laufen: Bei Struktur- und
Layout-Aussagen sind sie abzuziehen, ihre **Texte** bleiben verwertbar.

Noch offen und je einmal zu erheben: Zimmerei, Garten- & Landschaftsbau,
Tischlerei, Fliesenleger, Gerüstbau.
