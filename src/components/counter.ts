export function initCounters(selector = ".js-counter") {
    const counters = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!counters.length) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const startAnimation = (el: HTMLElement) => {
        const targetEnd = Number(el.dataset.target ?? 0);
        const hasRange = el.dataset.startTarget !== undefined;
        const targetStart = hasRange ? Number(el.dataset.startTarget ?? 0) : 0;

        const fromEnd = Number(el.dataset.from ?? 0);
        const fromStart = Number(el.dataset.startFrom ?? 0);

        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const duration = Number(el.dataset.duration ?? 3000);

        let rafId = 0;

        const render = (progress: number) => {
            const eased = easeOutCubic(progress);
            const currentEnd = Math.round(fromEnd + (targetEnd - fromEnd) * eased);

            if (hasRange) {
                const currentStart = Math.round(fromStart + (targetStart - fromStart) * eased);
                el.textContent = `${prefix}${currentStart}–${currentEnd}${suffix}`;
            } else {
                el.textContent = `${prefix}${currentEnd}${suffix}`;
            }
        };

        render(0);

        const tick = (startTime: number) => {
            const step = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1);
                render(progress);
                if (progress < 1) rafId = requestAnimationFrame(step);
            };
            rafId = requestAnimationFrame(step);
        };

        const start = performance.now();
        tick(start);

        return () => cancelAnimationFrame(rafId);
    };

    const run = (el: HTMLElement) => {
        if ((el as any)._counterStarted) return;
        (el as any)._counterStarted = true;
        startAnimation(el);
    };

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        run(entry.target as HTMLElement);
                        io.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.4 }
        );

        counters.forEach((el) => {
            io.observe(el);
        });
    } else {
        counters.forEach(run);
    }
}
