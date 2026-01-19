const KEY = "wf_theme";

export function initTheme() {
  const html = document.documentElement;

  // default: dark
  const saved = localStorage.getItem(KEY);
  const initial = saved === "light" ? "light" : "dark";
  html.setAttribute("data-theme", initial);

  const btn = document.querySelector<HTMLButtonElement>("#themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cur = html.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = cur === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
  });
}
