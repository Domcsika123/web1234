import { getSavedLang, setLang, type Lang } from "./i18n";

export function initLang(onChange?: (lang: Lang) => void) {
    const switcher = document.querySelector<HTMLDivElement>("#langSwitcher");
    if (!switcher) return;

    const buttons = switcher.querySelectorAll<HTMLButtonElement>(".lang-btn");
    const trigger = switcher.querySelector<HTMLButtonElement>(".lang-trigger");
    const currentFlag = switcher.querySelector<HTMLImageElement>("[data-current]");
    if (!buttons.length) return;

    const flags: Record<Lang, { src: string; alt: string }> = {
        hu: { src: "https://flagcdn.com/w20/hu.png", alt: "HU" },
        en: { src: "https://flagcdn.com/w20/gb.png", alt: "EN" },
        de: { src: "https://flagcdn.com/w20/de.png", alt: "DE" },
    };

    const saved = getSavedLang();
    setLang(saved);

    buttons.forEach((btn) => {
        const isActive = btn.dataset.lang === saved;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
        const code = (btn.dataset.lang || "hu") as Lang;
        const img = btn.querySelector<HTMLImageElement>(".lang-flag");
        if (img) {
            img.src = flags[code].src;
            img.alt = flags[code].alt;
        }
    });

    if (currentFlag) {
        currentFlag.src = flags[saved].src;
        currentFlag.alt = flags[saved].alt;
    }

    const closeMenu = () => {
        switcher.classList.remove("is-open");
        trigger?.setAttribute("aria-expanded", "false");
    };

    trigger?.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = switcher.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", () => closeMenu());

    switcher.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = (btn.dataset.lang || "hu") as Lang;
            setLang(lang);

            buttons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");
            const btnImg = btn.querySelector<HTMLImageElement>(".lang-flag");
            if (btnImg) {
                btnImg.src = flags[lang].src;
                btnImg.alt = flags[lang].alt;
            }

            if (currentFlag) {
                currentFlag.src = flags[lang].src;
                currentFlag.alt = flags[lang].alt;
            }
            closeMenu();

            onChange?.(lang);
        });
    });
}
