export function initBeforeAfter(rootSelector = ".ba") {
  document.querySelectorAll<HTMLElement>(rootSelector).forEach((root) => {
    const range = root.querySelector<HTMLInputElement>('input[type="range"]');
    const before = root.querySelector<HTMLElement>(".ba-before");
    const handle = root.querySelector<HTMLElement>(".ba-handle");
    if (!range || !before || !handle) return;

    const apply = (v: number) => {
      before.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      handle.style.left = `${v}%`;
    };

    range.addEventListener("input", () => apply(Number(range.value)));
    apply(Number(range.value || 55));
  });
}
