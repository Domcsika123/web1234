type Action = {
  id: string;
  title: string;
  hint?: string;
  run: () => void;
};

export function initCommandPalette() {
  const root = document.createElement("div");
  root.id = "cmdk";
  root.innerHTML = `
    <div class="cmdk-backdrop" data-cmdk-close></div>
    <div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Parancs paletta">
      <div class="cmdk-head">
        <div class="cmdk-title">Parancsok</div>
        <div class="cmdk-kbd">Ctrl K</div>
      </div>
      <input class="cmdk-input" id="cmdkInput" placeholder="Keress: pl. portfólió, ajánlat, árazás…" />
      <div class="cmdk-list" id="cmdkList"></div>
      <div class="cmdk-foot">Enter: futtatás • Esc: bezárás</div>
    </div>
  `;
  document.body.appendChild(root);

  const input = root.querySelector<HTMLInputElement>("#cmdkInput")!;
  const list = root.querySelector<HTMLDivElement>("#cmdkList")!;
  const closeEls = root.querySelectorAll<HTMLElement>("[data-cmdk-close]");

  const open = () => {
    root.classList.add("is-open");
    setTimeout(() => input.focus(), 0);
    render("");
  };
  const close = () => {
    root.classList.remove("is-open");
    input.value = "";
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const openQuote = () => {
    // a meglévő gombra kattintunk, hogy a jelenlegi modal-logika fusson
    const btn = document.querySelector<HTMLElement>('[data-modal-open="quote"]');
    btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const actions: Action[] = [
    { id: "quote", title: "Ajánlatkérés megnyitása", hint: "Lead / Modal", run: openQuote },
    { id: "services", title: "Ugrás: Szolgáltatások", hint: "#services", run: () => scrollTo("services") },
    { id: "process", title: "Ugrás: Folyamat", hint: "#process", run: () => scrollTo("process") },
    { id: "portfolio", title: "Ugrás: Portfólió", hint: "#portfolio", run: () => scrollTo("portfolio") },
    { id: "pricing", title: "Ugrás: Árazás", hint: "#pricing", run: () => scrollTo("pricing") },
    { id: "calculator", title: "Ugrás: Árbecslő", hint: "#calculator", run: () => scrollTo("calculator") },
    { id: "contact", title: "Ugrás: Kapcsolat", hint: "#contact", run: () => scrollTo("contact") },
  ];

  const render = (q: string) => {
    const query = q.trim().toLowerCase();
    const filtered = !query
      ? actions
      : actions.filter((a) => (a.title + " " + (a.hint ?? "")).toLowerCase().includes(query));

    list.innerHTML = filtered
      .map(
        (a, i) => `
      <button class="cmdk-item ${i === 0 ? "is-active" : ""}" data-id="${a.id}">
        <span>${a.title}</span>
        <span class="cmdk-hint">${a.hint ?? ""}</span>
      </button>
    `
      )
      .join("");

    list.querySelectorAll<HTMLButtonElement>(".cmdk-item").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.id!;
        const act = actions.find((x) => x.id === id);
        act?.run();
        close();
      });
    });
  };

  input.addEventListener("input", () => render(input.value));

  const moveActive = (dir: 1 | -1) => {
    const items = Array.from(list.querySelectorAll<HTMLButtonElement>(".cmdk-item"));
    const idx = items.findIndex((x) => x.classList.contains("is-active"));
    const next = Math.max(0, Math.min(items.length - 1, idx + dir));
    items.forEach((x) => x.classList.remove("is-active"));
    items[next]?.classList.add("is-active");
    items[next]?.scrollIntoView({ block: "nearest" });
  };

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
    if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
    if (e.key === "Enter") {
      const active = list.querySelector<HTMLButtonElement>(".cmdk-item.is-active");
      active?.click();
    }
  });

  closeEls.forEach((el) => el.addEventListener("click", close));

  window.addEventListener("keydown", (e) => {
    const isMac = navigator.platform.toLowerCase().includes("mac");
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      root.classList.contains("is-open") ? close() : open();
    }
    if (e.key === "Escape") close();
  });
}
