---
name: design-system
description: >
  Verfahren, wie aus der Kunden-CI ein Farb- und Typo-System wird: Farbrollen
  und Neutralen-Ableitung in oklch, Kontrastpflichten, Schriftwahl, Skala und
  Typo-Spannweite, lokale Schrifteinbindung. Nutzen in Phase 2c, bevor
  site/css/tokens.css gefüllt wird, und bei jeder Farb- oder Schriftfrage im Bau.
---

# Design-System

`site/css/tokens.css` hat leere Plätze. Diese Datei sagt, wie sie gefüllt werden –
aus dem Kundenmaterial, nicht aus Geschmack.

**Voraussetzung:** Die CI ist ein Fundstück, keine Erfindung (CLAUDE.md §6).
Liegt kein Logo, keine bestehende Seite, kein Drucksachenmaterial vor, wird bei
Bruno nachgefragt, bevor irgendetwas gestaltet wird. Eine erfundene Palette ist
der schnellste Weg zum generischen KI-Look, auch wenn sie für sich schön ist.

---

## Teil 1 – Farbe

### 1.1 Warum oklch

Ein Farbwert hat drei Teile: `oklch(L C H)` – Helligkeit, Buntheit, Farbton.
Der Vorteil gegenüber Hex: **L ist wahrgenommene Helligkeit.** Zwei Farben mit
gleichem L wirken gleich hell, unabhängig vom Farbton. Damit lässt sich eine
Palette rechnen statt raten, und Kontrast wird vorhersagbar.

Startpunkt ist immer die **echte Markenfarbe** aus dem Logo. Sie wird
umgerechnet, nicht ersetzt:

```css
/* Gefunden im Logo: #1B4D3E  →  umgerechnet */
--marke: oklch(0.38 0.07 165);
```

### 1.2 Die Rollen – sieben, nicht siebzig

Farben bekommen Aufgaben, keine Namen. `--color-blau` bricht beim ersten
Kunden mit grünem Logo.

| Rolle | Aufgabe | Richtwert L |
|---|---|---|
| `--color-bg` | Seitengrund | 0.97 – 0.99 |
| `--color-surface` | abgesetzte Fläche (Karte, Formular) | 0.94 – 0.96 |
| `--color-border` | Linien, Umrisse | 0.85 – 0.90 |
| `--color-text-muted` | Sekundärtext, Bildunterschrift | 0.45 – 0.55 |
| `--color-text` | Fließtext | 0.20 – 0.30 |
| `--color-primary` | Marke, Hauptaktion | aus dem Logo |
| `--color-accent` | eine Ausnahme, sparsam | frei |

Dazu die dunkle Gegenseite für randlose Sektionen:

| Rolle | Aufgabe |
|---|---|
| `--color-bg-dark` | dunkle Sektionsfläche, L 0.18 – 0.25 |
| `--color-text-on-dark` | Text darauf, L 0.95 – 0.98 |
| `--color-primary-on-dark` | Markenfarbe auf Dunkel (siehe 1.4) |

### 1.3 Neutrale aus der Marke ableiten, nicht aus Grau

Der wichtigste Handgriff dieser Datei. Reines Grau (`C = 0`) neben einer
farbigen Marke wirkt tot und ist der Grundton jedes Baukastens. Die Neutralen
übernehmen deshalb den **Farbton der Marke** bei sehr niedriger Buntheit:

```css
--marke:          oklch(0.38 0.07 165);

--color-bg:       oklch(0.985 0.004 165);  /* H übernommen, C fast null */
--color-surface:  oklch(0.955 0.008 165);
--color-border:   oklch(0.880 0.012 165);
--color-text-muted: oklch(0.500 0.015 165);
--color-text:     oklch(0.250 0.020 165);
--color-bg-dark:  oklch(0.210 0.025 165);
```

**Regel:** H bleibt über alle Neutralen gleich, C steigt leicht mit sinkendem L.
Der Effekt ist nicht bewusst sichtbar, aber der Unterschied zwischen „gebaut"
und „zusammengeklickt".

### 1.4 `--color-primary-on-dark` ist Pflicht, nicht Kür

Eine Markenfarbe, die auf Weiß gut sitzt (L um 0.38), reißt auf dunklem Grund
fast immer den Kontrast. **Gemessen in einer bisherigen Demo: 3,3:1** – unter
der Grenze von 4,5:1.

Verfahren: L anheben, bis 4,5:1 gegen `--color-bg-dark` erreicht ist, C dabei
leicht senken, damit die Farbe nicht grell wird. H bleibt unverändert.

```css
--color-primary:         oklch(0.38 0.07 165);
--color-primary-on-dark: oklch(0.78 0.10 165);
```

Nachmessen, nicht schätzen. `scripts/layout-check.mjs` meldet jede Textfarbe
unter 4,5:1.

### 1.5 Wie viel Farbe

- **Eine Marke, höchstens ein Akzent.** Alles Weitere sind Neutrale.
- **Farbe schafft Hierarchie, nicht Dekoration.** Die Markenfarbe markiert, was
  der Besucher tun soll. Ist sie überall, markiert sie nichts.
- **Faustregel für die Fläche:** Marke und Akzent zusammen unter 10 % der
  sichtbaren Fläche, Zäsur-Sektionen ausgenommen.
- **Kein Verlauf als Default**, kein Purple-Gradient. Ein Verlauf ist erlaubt,
  wo er etwas leistet: als gerichteter Scrim über einem Foto (`hero-craft`).
- **Semantik nicht verbiegen:** Rot bleibt Warnung, Grün bleibt Bestätigung –
  auch wenn die Marke rot ist.

### 1.6 Kontrastpflichten

| Was | Mindestens |
|---|---|
| Fließtext, Bedienelemente | 4,5:1 |
| Text ab 24 px oder 19 px fett | 3:1 |
| Umrisse, Icons, Trennlinien mit Bedeutung | 3:1 |
| Fokusring gegen seinen Grund | 3:1 |

Gilt auch auf Bildern und farbigen Flächen. Der übliche Fehler ist nicht die
Textfarbe, sondern der Grund darunter.

---

## Teil 2 – Typografie

### 2.1 Zwei Familien, nicht fünf

- **`--font-display`** für Überschriften, **`--font-body`** für alles andere.
- Eine einzige Familie mit echtem Schnittkontrast (400 gegen 800) ist eine
  vollwertige Option und oft die ruhigere.
- Drei oder mehr Familien sind ein Fehler, kein Ausdruck.
- **Die Wahl folgt der Marke.** Benutzt der Kunde bereits eine Schrift auf
  Drucksachen oder der bestehenden Seite, ist das die Vorgabe. Nur wenn nichts
  vorliegt, wird gewählt – und dann passend zum Gewerk, nicht zum Zeitgeist.

### 2.2 Die Skala – und warum 2,5 die harte Grenze ist

Aus `hero-craft`: **Typo-Spannweite (H1 ÷ Fließtext) mindestens 2,5.** Darunter
wirkt jede Seite flach, egal wie gut die Schrift ist. Das ist der häufigste
messbare Grund für „weichgewaschen".

Die Skala in `tokens.css` hat fünf Stufen und arbeitet mit `clamp()`: klein bei
390 px, groß bei 1440 px.

| Stufe | Aufgabe | Verhältnis zu `--step-0` |
|---|---|---|
| `--step--1` | Kicker, Bildunterschrift, Fußnote | ~0.85 |
| `--step-0` | Fließtext | 1 |
| `--step-1` | Lead, H3 | ~1.3 |
| `--step-2` | H2 | ~2.0 |
| `--step-3` | H1 | **≥ 2.5** |

**Untergrenze:** `--step--1` nie unter 14 px. Fließtext bei 13,4 px war ein
QA-Befund, keine Designentscheidung.

Reicht `--step-3` für die Spannweite nicht, wird `--step-3` erhöht – nicht der
Fließtext verkleinert.

### 2.3 Zeilenhöhe, Laufweite, Zeilenlänge

| Element | Zeilenhöhe | Laufweite |
|---|---|---|
| H1 / große Display-Zeile | 0.95 – 1.1 | −0.02 bis −0.03 em |
| H2 / H3 | 1.1 – 1.25 | −0.01 em |
| Fließtext | 1.5 – 1.65 | 0 |
| Kicker in Versalien | 1.2 | +0.06 bis +0.12 em |

- **Zeilenlänge 60–75 Zeichen.** Dafür steht `--maxw-content: 68ch` im
  `.layout`-Raster. Text über die volle Breite laufen zu lassen ist kein
  Flächennutzen, sondern unlesbar.
- **Große Schrift braucht enge Zeilen.** Eine H1 mit `line-height: 1.5` zerfällt
  in Einzelzeilen. Das ist der typische Fehler, wenn nur ein globaler Wert gesetzt ist.

### 2.4 Hierarchie kommt aus Größe und Abstand, nicht aus Farbe

- Überschriften sind selten farbig. Eine farbige H2 ersetzt fehlenden
  Größenunterschied und wirkt dekorativ.
- Kein Unterstreichen zur Betonung, kein Kursiv über mehr als einen Satz.
- Versalien nur für kurze Kicker, nie für ganze Überschriften.
- **Nicht mehr als zwei Schriftschnitte je Familie** für Hierarchie. Wer
  Größe und Weißraum richtig setzt, braucht den dritten Schnitt nicht.

### 2.5 Schriften liegen lokal

Der Egress-Proxy blockiert CDNs (cdnjs 403, jsdelivr und unpkg ohne Antwort,
geprüft am 16.09.2026). Google Fonts ist je nach Arbeitsumgebung mal erreichbar
und mal nicht, und genau das ist der Grund, es nie einzubinden: Eine Einbindung,
die in einer Session lädt und in der nächsten nicht, ist für eine Demo, die
geprüft werden muss, unbrauchbar (CLAUDE.md §5). Die Schriftdatei liegt im Repo,
immer.

```css
/* site/css/fonts.css – Dateien unter site/assets/fonts/ */
@font-face {
  font-family: "Marken-Display";
  src: url("../assets/fonts/marken-display.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;   /* Text sofort sichtbar, Schrift tauscht nach */
}
```

- **Nur `woff2`.** Alles andere ist überflüssiges Gewicht.
- **Nur die gebrauchten Schnitte.** Jeder ungenutzte Schnitt ist Ladezeit.
- **Lizenz prüfen**, bevor eine Schrift eingebunden wird. Bei Unsicherheit
  fragen, nicht annehmen.
- **`font-display: swap`** plus eine Fallback-Kette mit ähnlicher Breite, damit
  der Tausch kein Layout springen lässt.

### 2.6 Woher die Schriftdatei kommt

Die npm-Registry ist erreichbar, die CDNs nicht. Über **Fontsource** liegt
praktisch der gesamte Google-Fonts-Bestand als npm-Paket mit fertigen
`woff2`-Dateien. Damit ist die Schriftwahl frei und nicht auf die drei
Systemschriften der Arbeitsumgebung (DejaVu, Liberation, FreeFont) beschränkt.

**Ablauf, geprüft am 16.09.2026:**

```bash
# 1. AUSSERHALB des Repos arbeiten, z.B. im Scratchpad.
#    npm pack legt nur ein .tgz ab, aber Reste gehoeren nicht ins Demo-Repo.
cd /tmp/schrift && npm pack @fontsource-variable/inter
tar -xzf fontsource-variable-inter-*.tgz

# 2. Nur die gebrauchte Datei ins Repo kopieren.
cp package/files/inter-latin-wght-normal.woff2 \
   <demo-repo>/site/assets/fonts/

# 3. Lizenz mitnehmen und im Repo ablegen.
cp package/LICENSE <demo-repo>/site/assets/fonts/inter-LICENSE.txt
```

**Variable Schrift zuerst.** `@fontsource-variable/<name>` liefert eine einzige
Datei für alle Schnitte von 100 bis 900. Bei Inter sind das 48 KB statt sechs
einzelner Dateien. Gibt es keine variable Fassung, nimmt man
`@fontsource/<name>` und daraus **nur** die gebrauchten Schnitte, benannt nach
dem Muster `<name>-latin-400-normal.woff2`.

**`latin` reicht.** Die Pakete enthalten auch Kyrillisch, Griechisch und
Vietnamesisch. Für eine deutsche Handwerkerseite ist das totes Gewicht.
`latin-ext` nur, wenn Namen mit osteuropäischer Diakritik vorkommen.

**Kein `package.json` im Demo-Repo.** `npm pack` installiert nichts und legt
keine an. Das ist Absicht: Sobald eine `package.json` im Repo liegt, behandelt
Vercel die Demo als Node-Projekt statt als statische Seite (CLAUDE.md §5).

**Die Grenze, offen benannt.** Fontsource führt freie Schriften (SIL OFL,
Apache). Kommerzielle Schriften sind nicht dabei, geprüft: kein
`@fontsource/helvetica-neue`, kein `futura`, kein `gotham`. Benutzt der Kunde
eine lizenzpflichtige Schrift, gibt es genau zwei Wege, und beide laufen über
eine Rückfrage an Bruno:

1. Bruno besorgt die Datei samt Lizenz für die Demo.
2. Es wird eine freie Schrift mit ähnlichem Charakter gewählt **und im
   Hinweiskasten benannt**, dass die Originalschrift im Projekt eingesetzt wird.

Nie stillschweigend eine Ersatzschrift nehmen und so tun, als wäre es die CI
(CLAUDE.md §3).

---

## Abnahme

Gemessen über `node scripts/layout-check.mjs site/<datei>.html`.

- [ ] Jeder Farbwert stammt aus dem Kundenmaterial oder ist daraus abgeleitet.
      Keine erfundene Palette
- [ ] Neutrale tragen den Markenfarbton (C klein, H gleich), kein reines Grau
- [ ] `--color-primary-on-dark` gesetzt und gegen `--color-bg-dark` gemessen:
      ______ (min. 4,5:1)
- [ ] Geringster Textkontrast auf der Seite: ______ (min. 4,5:1)
- [ ] Typo-Spannweite H1 ÷ Fließtext: ______ (min. 2,5)
- [ ] Kleinste Schriftgröße auf 390 px: ______ px (min. 14)
- [ ] Höchstens zwei Schriftfamilien, höchstens zwei Schnitte je Familie
- [ ] Zeilenhöhe der H1 unter 1.2
- [ ] Schriften liegen als `woff2` unter `site/assets/fonts/`, keine CDN-URL im HTML
- [ ] Marke plus Akzent unter ~10 % der sichtbaren Fläche
