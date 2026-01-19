export function initScrollProgress() {
  const bar = document.createElement("div");
  bar.id = "scrollProgress";
  document.body.appendChild(bar);

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = `${p}%`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
