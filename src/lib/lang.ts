import { getSavedLang, setLang, type Lang } from "./i18n";

export function initLang(onChange?: (lang: Lang) => void) {
    const switcher = document.querySelector<HTMLDivElement>("#langSwitcher");
    if (!switcher) return;

    const buttons = switcher.querySelectorAll<HTMLButtonElement>(".lang-btn");
    if (!buttons.length) return;

    const saved = getSavedLang();
    setLang(saved);

    buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === saved);
    });

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = (btn.dataset.lang || "hu") as Lang;
            setLang(lang);

            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            onChange?.(lang);
        });
    });
}
