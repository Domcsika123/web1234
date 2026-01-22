let initialized = false;

export function initScrollProgress() {
  if (initialized) return;
  initialized = true;

  const existing = document.getElementById("scrollProgress");
  const bar = existing ?? document.createElement("div");
  if (!existing) {
    bar.id = "scrollProgress";
    document.body.appendChild(bar);
  }

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = `${p}%`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
