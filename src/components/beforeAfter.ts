let runId = 0;

export function initBeforeAfter(rootSelector = ".ba") {
  const currentRun = ++runId;
  document.querySelectorAll<HTMLElement>(rootSelector).forEach((root) => {
    const before = root.querySelector<HTMLElement>(".ba-before");
    const handle = root.querySelector<HTMLElement>(".ba-handle");
    if (!before || !handle) return;

    root.style.pointerEvents = "none";

    let value = 0;
    let direction: 1 | -1 = 1;
    let lastTime = performance.now();
    const durationMs = Number(root.dataset.duration ?? 8000); // slow, gentle sweep across full width
    const min = 0;
    const max = 100;

    const apply = (v: number) => {
      before.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      handle.style.left = `${v}%`;
    };

    const tick = (now: number) => {
      if (currentRun !== runId) return;
      const delta = now - lastTime;
      lastTime = now;

      const step = (delta / durationMs) * 100; // map duration to full sweep
      value += step * direction;

      if (value >= max) {
        value = max;
        direction = -1;
      } else if (value <= min) {
        value = min;
        direction = 1;
      }

      apply(value);
      requestAnimationFrame(tick);
    };

    apply(value);
    requestAnimationFrame(tick);
  });
}
