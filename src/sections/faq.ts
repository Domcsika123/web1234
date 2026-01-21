export function renderFaq() {
  return `
  <section class="section" id="faq">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Gyakori kérdések</div>
        <p class="p">Nem találod a választ? Írj vagy hívj: info@webfejlesztes.hu</p>
      </div>

      <div class="faq" id="faqList" data-reveal>
        ${item("Mennyi idő alatt készül el a weboldal?", "A csomag típusától függ. Starter: 4–5 nap, Professional: 5–7 nap, Enterprise: egyedi. Rush projekteket is vállalunk.")}
        ${item("Módosíthatom-e később a tartalmat?", "Igen! Egyéb csomag + CMS / admin panelja van, szabad módosítást is ajánlunk.")}
        ${item("Mi az, ha nem szeretem az eredményt?", "Korlátlan revízió egy bizonyos keretekig. Amíg nem vagy elégedett, addig javítunk.")}
        ${item("Kapok SEO alapot és mérési beállítást?", "Igen! Google Analytics, Search Console, pixel tracking, és schema markup minden csomagban benne van.")}
        ${item("Mi történik az első év után?", "Ingyenes support az első éven belül. Utána opcionális annual maintenance csomag (updates, security, performance).")}
        ${item("Lehet e-commerce / webshop is?", "Igen. Ez a Professional vagy Enterprise csomag, Stripe/PayPal integrációval.")}
        ${item("Milyen támogatást kapok fejlesztés közben?", "Email + Slack hozzáférés. Hétfő–péntek, napi válaszidő. Gyors kommunikáció.")}
        ${item("Kapok source code-ot / Git repositoryt?", "Igen! Git repo-hoz hozzáférés (privát), sőt full source code is letölthető.")}
      </div>
    </div>
  </section>
  `;
}

export function initFaq() {
  const items = document.querySelectorAll<HTMLElement>(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>(".faq-q");
    const answer = item.querySelector<HTMLElement>(".faq-a");
    const icon = item.querySelector<SVGElement>(".faq-icon");

    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all other items
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-open");
          const otherBtn = otherItem.querySelector<HTMLButtonElement>(".faq-q");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function item(q: string, a: string) {
  return `
  <div class="faq-item">
    <button class="faq-q" type="button" aria-expanded="false">
      <span class="faq-q-text">${q}</span>
      <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <div class="faq-a">
      <div class="faq-a-content">${a}</div>
    </div>
  </div>
  `;
}
