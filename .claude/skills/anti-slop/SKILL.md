---
name: anti-slop
description: >
  Prüft und überarbeitet deutschen Website-Text, sodass er menschlich klingt und
  keine typischen AI-Muster enthält. Nutzen als Pflicht-Durchgang nach jedem
  Texten (durch website-copy) und in der QA. Arbeitet mit einem Zwei-Pass-Verfahren:
  erst überarbeiten, dann sich selbst fragen "Was wirkt hier noch nach AI?", dann
  final schleifen.
---

# Anti-Slop (Humanizer für Website-Copy)

Macht Website-Text menschlich. Basiert auf der Community-Referenz "Signs of AI
writing" (Wikipedia / blader-humanizer), destilliert und auf **deutschen
Website-Text** zugeschnitten. Enzyklopädie-spezifische Muster wurden entfernt,
die für Marketing-Copy relevanten geschärft.

## Kernprinzip: Zwei-Pass-Verfahren

Der wirksamste Mechanismus. Nie beim ersten Entwurf stehenbleiben:

1. **Pass 1 – Entwurf:** Text schreiben/überarbeiten, offensichtliche AI-Muster
   entfernen (Listen unten).
2. **Selbst-Audit:** Sich ehrlich fragen: *"Was macht diesen Text noch
   offensichtlich AI-generiert?"* Verbleibende Tells kurz benennen.
3. **Pass 2 – Final:** Die benannten Tells beheben. Ergebnis enthält keine
   Gedankenstriche und liest sich beim Vorlesen natürlich.

## Der stärkste Hebel: Satzrhythmus (zuerst anwenden)

Wirkt mehr als alle Vokabel-Fixes zusammen. AI schreibt in gleichmäßig
mittellangen Sätzen. Menschen variieren: kurze Sätze neben langen, die sich Zeit
nehmen. Bewusst mischen. Diesen Schritt VOR den Wortlisten anwenden – reine
Wort-Ersetzung ohne Rhythmus-Variation bringt wenig.

Aber: Ein paar kurze Sätze zur Betonung sind gut. Eine ganze Kette kurzer
Stakkato-Fragmente ist selbst ein AI-Tell (siehe unten).

## Muster, die entfernt werden

### Inhaltliche Muster

1. **Bedeutungs-Inflation.** Aufgeblasene Wichtigkeit: "ein Meilenstein",
   "spielt eine entscheidende Rolle", "unterstreicht die Bedeutung", "prägt die
   Landschaft", "zeugt von". → Konkret sagen, was Sache ist.
2. **Werbe-Sprache ohne Beleg.** "lebendig", "reich an", "atemberaubend",
   "im Herzen von", "eingebettet in", "renommiert", "wahres Schmuckstück".
   → Konkrete Leistung/Zahl statt Adjektiv.
3. **Oberflächliche -ing/-end-Analysen.** Angehängte Partizip-Phrasen für
   Schein-Tiefe: "…, wodurch die Verbindung zur Region unterstrichen wird",
   "…, was das Engagement widerspiegelt". → Weglassen oder als echten Satz.
4. **Vage Autoritäten.** "Experten sagen", "Studien zeigen", "viele meinen"
   ohne Quelle. → Konkret werden oder streichen.

### Sprach- & Grammatik-Muster

5. **AI-Vokabular** (deutsch): "zudem", "darüber hinaus", "maßgeblich",
   "entscheidend", "nahtlos", "vielfältig", "Zusammenspiel", "Facetten",
   "im Einklang mit", "ganzheitlich", "wegweisend". Häufung ist der Tell.
6. **Copula-Vermeidung.** Statt schlichtem "ist/sind" elaborierte Konstruktionen:
   "fungiert als", "stellt dar", "bietet", "verfügt über". → Wo möglich "ist/hat".
7. **Negativ-Parallelismen.** "Nicht nur…, sondern auch…", "Es geht nicht um X,
   es geht um Y". Überstrapaziert. → Direkt sagen.
8. **Dreier-Regel (Rule of Three).** Zwanghafte Dreier-Aufzählungen für
   Schein-Vollständigkeit: "Innovation, Inspiration, Insights". → Auf das
   Echte reduzieren. Das gilt auch fürs Layout: **höchstens zwei Dreiergruppen
   pro Seite**, gezählt über alles (drei Kennzahlen, drei Benefits, drei Werte,
   drei Fragen). In einer Demo fanden sich zehn davon – einzeln unauffällig, in
   Summe genau der Rhythmus, an dem man KI erkennt. Nie ankündigen ("Drei Dinge
   sind uns wichtig").
9. **Synonym-Karussell.** Dasselbe krampfhaft anders benennen (Protagonist →
   Hauptfigur → zentrale Gestalt → Held). → Beim Begriff bleiben.
10. **Falsche Spannweiten.** "von X bis Y", wo X und Y keine echte Skala bilden.

### Stil-Muster

11. **Gedankenstriche (— und –): harte Regel.** Der finale Text enthält KEINE
    Gedankenstriche als Stilmittel. Einer der zuverlässigsten AI-Tells. Ersetzen
    durch: Punkt (neuer Satz), Komma (enge Einschub), Doppelpunkt (Erklärung),
    Klammern (echter Einschub) – oder umbauen. Auch doppelte Bindestriche (--)
    fangen. Vor Abgabe scannen: jeder Treffer heißt, der Text ist nicht fertig.
12. **Boldface-Übernutzung.** Nicht mechanisch Phrasen fettmarkieren.
13. **Emojis** in Überschriften/Aufzählungen: keine (außer explizit gewollt).
14. **Manufactured Punchlines / Stakkato-Drama.** Nicht jeder Satz muss wie eine
    Pointe landen. Kein Stapeln kurzer Fragmente für künstliche Dramatik.
    ("Dann kam X. Keine Kompromisse. Keine Ausreden. Die alten Regeln waren weg.")
15. **Aphorismus-Formeln.** "X ist das Y von Z", "X wird zur Falle", "die Sprache
    des …", "die Architektur des …". Klingt tief, sagt nichts. → Konkreten
    Anspruch nennen.

### Kommunikations-Muster

16. **Chatbot-Artefakte.** "Ich hoffe, das hilft", "Natürlich!", "Gerne!",
    "Möchten Sie, dass ich …", "Lass uns eintauchen". Gehört nie in Website-Text.
17. **Signposting.** Ankündigen statt tun: "Lassen Sie uns einen Blick werfen",
    "Im Folgenden erfahren Sie". → Einfach die Sache sagen.
18. **Servil/anbiedernd.** "Großartige Frage!", "Sie haben völlig recht". Streichen.
19. **Füllphrasen.** "um dieses Ziel zu erreichen" → "um", "aufgrund der Tatsache,
    dass" → "weil", "zum jetzigen Zeitpunkt" → "jetzt", "es ist wichtig zu
    erwähnen, dass" → direkt sagen.
20. **Generisch-positive Schlüsse.** "Die Zukunft sieht rosig aus", "Spannende
    Zeiten liegen vor uns". → Konkret oder weglassen.

## Falsch-Positive: Was NICHT anzutasten ist

Wichtig – sonst wird gute menschliche Prosa kaputt-korrigiert. Diese Dinge sind
für sich KEIN AI-Beweis:

- Sauberer, fehlerfreier Stil. Politur ≠ AI.
- Fachvokabular an sich (nur die *spezifischen* AI-Lieblingswörter aus §5 zählen).
- Ein einzelner kurzer, betonter Satz (nur eine ganze Kette ist ein Tell).
- Ein einzelnes "jedoch"/"zudem" (nur die Häufung zählt).
- Formelle Anrede/Grußformel.
- Wörter/Phrasen in Zitaten, Eigennamen oder Beispielen (dort werden sie
  besprochen, nicht verwendet – nicht umschreiben).

**Regel:** Auf **Häufungen** achten, nicht auf Einzelfälle. Ein Gedankenstrich
allein sagt nichts; Gedankenstrich + Dreier-Regel + "lebendiges Zusammenspiel"
+ generischer Schluss zusammen sind das Geständnis.

## Menschliche Signale (bewahren)

Wo diese auftauchen, eher in Ruhe lassen – sie machen den Text menschlich:
- Konkrete, schwer erfundene Details (echte Zahlen, Orte, Namen).
- Variierende Satzlänge (kurz neben lang).
- Echte Einschübe, Selbstkorrekturen, Zwischentöne.
- Konkrete, verteidigbare Wortwahl statt Allerwelts-Formulierung.

## Gezählt wird, nicht geschätzt

Die Muster oben sind Urteilssache, diese vier Prüfungen nicht. Sie werden mit
einer Zahl beantwortet, sonst gelten sie als nicht erfüllt:

| Prüfung | Grenze |
|---|---|
| Gedankenstriche (—, –, --) im finalen Text | 0 |
| Kernbegriffe / Verkaufsargumente je Seite | max. 2× (siehe `website-copy`, Ein-Nennung-Regel) |
| Dreiergruppen je Seite | max. 2 |
| Ansprache-Verhältnis Leser zu Selbst ("Sie/Ihr" zu "wir/uns") | mindestens 2:1 |

**Bei Korrekturen nach dem Wortstamm suchen, nicht nach dem Satz.** Wer nach
"ablehnen müssen" sucht, übersieht "Aufträge ablehnen" – und zwar zuverlässig
auf der Startseite, die der Kunde zuerst sieht. Nach dem Fix den vollständigen
Text **aller** Seiten lesen, nicht nur die geänderte Stelle.

**Pose ist ein AI-Tell wie jedes andere.** Zusätzlich zu den Mustern oben gegen
die Verbotsliste in `website-copy` prüfen (Ablehnungs-Rhetorik, Vergleiche mit
Wettbewerbern, Türsteher-Formulierungen, Selbstbewertung) und den Inhaber-Test
anwenden.

## Ablauf (Zusammenfassung)

1. Rhythmus prüfen & variieren (stärkster Hebel, zuerst).
2. Muster oben durchgehen und beheben.
3. Selbst-Audit: "Was wirkt noch nach AI?" – benennen.
4. Finaler Durchgang, inkl. Gedankenstrich-Scan.
5. Die vier Zählungen durchführen und die Werte nennen.
6. Laut lesen: Klingt es wie ein guter menschlicher Texter? Wenn nein, zurück zu 1.
