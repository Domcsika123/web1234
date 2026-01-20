const KEY = "wf_lang";

export function initLang() {
    const switcher = document.querySelector<HTMLDivElement>("#langSwitcher");
    if (!switcher) return;

    const buttons = switcher.querySelectorAll<HTMLButtonElement>(".lang-btn");
    if (!buttons.length) return;

    // Load saved language or default to 'hu'
    const saved = localStorage.getItem(KEY) || "hu";
    document.documentElement.setAttribute("lang", saved);

    // Set active button
    buttons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === saved);
    });

    // Handle language change
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang || "hu";
            localStorage.setItem(KEY, lang);
            document.documentElement.setAttribute("lang", lang);

            // Update active state
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            console.log(`Language changed to: ${lang}`);
        });
    });
}
