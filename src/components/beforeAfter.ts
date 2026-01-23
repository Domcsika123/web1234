let runId = 0;

export function initBeforeAfter(rootSelector = ".ba") {
  const currentRun = ++runId;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll<HTMLElement>(rootSelector).forEach((root) => {
    const before = root.querySelector<HTMLElement>(".ba-before");
    const handle = root.querySelector<HTMLElement>(".ba-handle");
    if (!before || !handle) return;

    root.style.pointerEvents = "none";

    let value = 0;
    let direction: 1 | -1 = 1;
    let lastTime = performance.now();
    const durationMs = Number(root.dataset.duration ?? 8000);
    const min = 0;
    const max = 100;
    let rafId = 0;
    let running = false;

    const apply = (v: number) => {
      before.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      handle.style.left = `${v}%`;
    };

    const tick = (now: number) => {
      if (currentRun !== runId || !running) return;
      const delta = now - lastTime;
      lastTime = now;

      const step = (delta / durationMs) * 100;
      value += step * direction;

      if (value >= max) {
        value = max;
        direction = -1;
      } else if (value <= min) {
        value = min;
        direction = 1;
      }

      apply(value);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    apply(value);

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) start();
            else stop();
          }
        },
        { threshold: 0.2 }
      );
      io.observe(root);
    } else {
      start();
    }
  });
}
