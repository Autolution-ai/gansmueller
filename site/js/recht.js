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
  };
  knopf.setAttribute("aria-label", "Menü");
  knopf.addEventListener("click", () => setzen(!kopf.classList.contains("kopf--offen")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && kopf.classList.contains("kopf--offen")) { setzen(false); knopf.focus(); }
  });
})();
