import testimonials from "../data/testimonials.json";

type T = { name: string; role: string; quote: string };

export function renderTestimonials() {
  return `
  <section class="section" id="testimonials">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Mit mondanak az ügyfelek</div>
        <p class="p">50+ sikeres projekt. Valódi ügyfelek, valódi eredmények, valódi megelégedettség.</p>
      </div>

      <div class="testimonials-grid" id="tGrid" style="margin-top:28px;"></div>
    </div>
  </section>
  `;
}

export function initTestimonials() {
  const grid = document.querySelector<HTMLDivElement>("#tGrid");
  if (!grid) return;

  const items = (testimonials as T[]).filter(Boolean);

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
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}
