// recht.js – nur das Mobilmenü für Impressum und Datenschutz.
// Kein Lenis, keine Animation: Die Seiten sind Platzhalter (CLAUDE.md §11).
(() => {
  const kopf = document.querySelector("[data-kopf]");
  const knopf = document.querySelector("[data-menue]");
  if (!kopf || !knopf) return;
  const setzen = (offen) => {
    kopf.classList.toggle("kopf--offen", offen);
    knopf.setAttribute("aria-expanded", String(offen));
    const label = offen ? "Menü schließen" : "Menü";
    knopf.setAttribute("aria-label", label);
    const text = knopf.querySelector("[data-menue-text]");
    if (text) text.textContent = label;
    document.body.classList.toggle("is-locked", offen);
    // Inhalt und Footer aus dem Fokusweg nehmen, solange das Menü offen ist.
    document.querySelectorAll("body > main, body > footer").forEach((el) => { el.inert = offen; });
    if (offen) {
      const erster = kopf.querySelector(".kopf__nav a");
      if (erster) erster.focus();
    }
  };
  knopf.setAttribute("aria-label", "Menü");
  knopf.addEventListener("click", () => setzen(!kopf.classList.contains("kopf--offen")));
  kopf.querySelectorAll(".kopf__nav a").forEach((a) => a.addEventListener("click", () => setzen(false)));
  window.matchMedia("(min-width: 1101px)").addEventListener("change", (m) => { if (m.matches) setzen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && kopf.classList.contains("kopf--offen")) { setzen(false); knopf.focus(); }
  });
})();
