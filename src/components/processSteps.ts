export function initProcessSteps() {
    const sidebar = document.querySelector<HTMLElement>(".process-sidebar");
    const contentArea = document.querySelector<HTMLElement>(".process-content");

    if (!sidebar || !contentArea) return;

    // Get all step indicators and content sections
    const indicators = sidebar.querySelectorAll<HTMLElement>(".process-step-indicator");
    const contentSections = contentArea.querySelectorAll<HTMLElement>(".process-step-content");

    // Create Intersection Observer to detect which section is in view
    const observerOptions = {
        root: null,
        // Focus detection when section is roughly mid-viewport
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const step = entry.target.getAttribute("data-step");
                if (!step) return;

                // Remove active state from all indicators and content
                indicators.forEach((indicator) => {
                    indicator.classList.remove("active");
                });
                contentSections.forEach((section) => {
                    section.classList.remove("active");
                });

                // Add active state to current step
                const activeIndicator = sidebar.querySelector<HTMLElement>(
                    `[data-step="${step}"]`
                );
                if (activeIndicator) {
                    activeIndicator.classList.add("active");
                }

                const activeContent = contentArea.querySelector<HTMLElement>(
                    `[data-step="${step}"]`
                );
                if (activeContent) {
                    activeContent.classList.add("active");
                }
            }
        });
    }, observerOptions);

    // Observe all content sections
    contentSections.forEach((section) => {
        observer.observe(section);
    });

    // Add click handlers to sidebar indicators for manual navigation
    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            const step = indicator.getAttribute("data-step");
            if (!step) return;

            const targetContent = contentArea.querySelector<HTMLElement>(
                `.process-step-content[data-step="${step}"]`
            );

            if (targetContent) {
                targetContent.scrollIntoView({ behavior: "smooth", block: "start" });

                // Manually trigger active state
                setTimeout(() => {
                    indicators.forEach((ind) => ind.classList.remove("active"));
                    contentSections.forEach((section) => section.classList.remove("active"));

                    indicator.classList.add("active");
                    targetContent.classList.add("active");
                }, 300);
            }
        });
    });

    // Set first step as active on load
    if (indicators.length > 0 && contentSections.length > 0) {
        const firstIndicator = indicators[0];
        const firstContent = contentSections[0];

        firstIndicator.classList.add("active");
        firstContent.classList.add("active");
    }
}
