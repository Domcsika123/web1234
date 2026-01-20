export function renderNav() {
  return `
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="#top" data-nav>
        <span class="brand-dot"></span>
        <span>Webfejlesztés</span>
      </a>

      <nav class="nav-links" aria-label="Fő navigáció">
        <a href="#services" data-nav>Csomag</a>
        <a href="#process" data-nav>Folyamat</a>
        <a href="#work" data-nav>Portfólió</a>
        <a href="#testimonials" data-nav>Vélemények</a>
        <a href="#contact" data-nav>Kapcsolat</a>
      </nav>

      <div class="nav-actions">
        <div class="lang-switcher" id="langSwitcher">
          <button class="lang-btn active" data-lang="hu">🇭🇺</button>
          <button class="lang-btn" data-lang="en">🇬🇧</button>
          <button class="lang-btn" data-lang="de">🇩🇪</button>
        </div>
        <button class="btn btn-primary" data-modal-open="quote">Konzultáció</button>
        <button class="icon-btn burger" id="burger" aria-label="Menü">☰</button>
      </div>
    </div>

    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer-backdrop" data-drawer-close></div>
      <div class="drawer-panel">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border);">
          <div class="brand"><span class="brand-dot"></span><span>Menü</span></div>
          <button class="icon-btn" data-drawer-close aria-label="Bezárás">✕</button>
        </div>
        <a href="#services" data-nav>Csomag</a>
        <a href="#process" data-nav>Folyamat</a>
        <a href="#work" data-nav>Portfólió</a>
        <a href="#testimonials" data-nav>Vélemények</a>
        <a href="#contact" data-nav>Kapcsolat</a>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);">
          <button class="btn btn-primary" style="width:100%;" data-modal-open="quote">Konzultáció</button>
        </div>
      </div>
    </div>

    ${renderQuoteModal()}
  </header>
  `;
}

export function initNav() {
  const burger = document.querySelector<HTMLButtonElement>("#burger");
  const drawer = document.querySelector<HTMLElement>("#drawer");
  const drawerClosers = Array.from(document.querySelectorAll<HTMLElement>("[data-drawer-close]"));

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  burger?.addEventListener("click", openDrawer);
  drawerClosers.forEach((c) => c.addEventListener("click", closeDrawer));

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-nav][href^="#"]'));
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      closeDrawer();

      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const sectionIds = ["services", "process", "portfolio", "pricing", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

  const setActive = (id: string) => {
    document.querySelectorAll<HTMLElement>(".nav-links a[data-nav]").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("href") === `#${id}`);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((x) => x.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: [0.05, 0.12, 0.2] }
  );

  sections.forEach((s) => io.observe(s));
}

function renderQuoteModal() {
  return `
    <div class="modal-overlay" id="quoteModal" aria-hidden="true">
      <div class="modal-backdrop" data-modal-close></div>
      <div class="modal-content" role="dialog" aria-modal="true" aria-label="Ajánlatkérés">
        <div class="modal-head">
          <div>
            <div class="meta">Ajánlatkérés</div>
            <div style="font-weight:900;font-size:20px;margin-top:8px;">Mondd el röviden, mire van szükséged</div>
            <div style="color:var(--muted);margin-top:6px;">Visszajelzünk a legjobb megoldással és javasolt ütemezéssel.</div>
          </div>
          <button class="icon-btn" data-modal-close aria-label="Bezárás">✕</button>
        </div>

        <form id="quoteForm">
          <div class="field">
            <label for="q_name">Név</label>
            <input id="q_name" name="name" placeholder="Pl. Kiss Gábor" required />
          </div>
          <div class="field">
            <label for="q_email">Email</label>
            <input id="q_email" name="email" placeholder="email@domain.hu" type="email" required />
          </div>
          <div class="field">
            <label for="q_msg">Rövid leírás</label>
            <textarea id="q_msg" name="msg" placeholder="Milyen weboldalt szeretnél? Mi a cél? Van-e határidő?"></textarea>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px;">
            <button type="button" class="btn btn-ghost" data-modal-close>Mégse</button>
            <button type="submit" class="btn btn-primary">Küldés</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
