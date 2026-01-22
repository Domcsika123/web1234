import { t, ta } from "../lib/i18n";

type T = { name: string; role: string; quote: string };

export function renderTestimonials() {
  return `
  <section class="section" id="testimonials">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">${t("testimonials.title")}</div>
        <p class="p">${t("testimonials.subtitle")}</p>
      </div>

      <div class="testimonials-grid" id="tGrid" style="margin-top:28px;"></div>
    </div>
  </section>
  `;
}

export function initTestimonials() {
  const grid = document.querySelector<HTMLDivElement>("#tGrid");
  if (!grid) return;

  const items = ta<T[]>("testimonials.items").filter(Boolean);

  grid.innerHTML = items
    .map(
      (t) => `
    <div class="testimonial-card">
      <div class="tcard-rating">⭐⭐⭐⭐⭐</div>
      <blockquote class="tcard-quote">"${esc(t.quote)}"</blockquote>
      <div class="tcard-author">${esc(t.name)}</div>
      <div class="tcard-title">${esc(t.role)}</div>
    </div>
  `
    )
    .join("");
}

function esc(s: string) {
  return s.replaceAll(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}
