export function initTheme() {
  const html = document.documentElement;
  // Force light mode permanently
  html.setAttribute("data-theme", "light");
}
