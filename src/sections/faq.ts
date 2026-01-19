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
  const list = document.querySelector("#faqList");
  if (!list) return;

  list.querySelectorAll<HTMLElement>(".faq-item").forEach((wrap) => {
    const btn = wrap.querySelector<HTMLButtonElement>(".faq-q");
    btn?.addEventListener("click", () => {
      wrap.classList.toggle("is-open");
    });
  });
}

function item(q: string, a: string) {
  return `
  <div class="faq-item" data-reveal>
    <button class="faq-q" type="button" aria-expanded="false">
      <span>${q}</span>
      <span class="faq-toggle">+</span>
    </button>
    <div class="faq-a">${a}</div>
  </div>
  `;
}
