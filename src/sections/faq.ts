import { t, ta } from "../lib/i18n";

type FaqItem = { q: string; a: string };

export function renderFaq() {
  const items = ta<FaqItem[]>("faq.items");

  return `
  <section class="section" id="faq">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">${t("faq.title")}</div>
        <p class="p">${t("faq.subtitle")}</p>
      </div>

      <div class="faq" id="faqList" data-reveal>
        ${items.map((x) => item(x.q, x.a)).join("")}
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
