// src/sections/portfolio.ts
import portfolio from "../data/portfolio.json";
import { openCaseStudy } from "../components/caseStudy";

type Item = {
  title: string;
  tag: string;
  result: string;
  image?: string;

  // opcionális extra mezők a case study modalhoz
  summary?: string;
  bullets?: string[];
  stack?: string[];
};

export function renderPortfolio() {
  return `
  <section class="section" id="work">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Portfólió</div>
        <p class="p">
          50+ sikeres projekt. E-commerce, SaaS, landing oldalak. Kattints a részletekhez.
        </p>
      </div>

      <div class="portfolio-controls" id="portfolioControls" data-reveal></div>
      <div class="portfolio-grid" id="portfolioGrid" data-reveal></div>
    </div>
  </section>
  `;
}

export function initPortfolio() {
  const items = (portfolio as Item[]).filter(Boolean);

  const grid = document.querySelector<HTMLDivElement>("#portfolioGrid");
  const controls = document.querySelector<HTMLDivElement>("#portfolioControls");
  if (!grid || !controls) return;

  const tags = Array.from(new Set(items.map((x) => x.tag)));
  const allTags = ["Összes", ...tags];

  let active = "Összes";

  const renderControls = () => {
    controls.innerHTML = allTags
      .map(
        (t) =>
          `<button class="chip ${t === active ? "is-active" : ""}" data-tag="${escapeAttr(t)}">${escapeHtml(t)}</button>`
      )
      .join("");

    controls.querySelectorAll<HTMLButtonElement>("[data-tag]").forEach((b) => {
      b.addEventListener("click", () => {
        active = b.dataset.tag || "Összes";
        renderControls();
        renderGrid();
      });
    });
  };

  const renderGrid = () => {
    const filtered = active === "Összes" ? items : items.filter((x) => x.tag === active);

    grid.innerHTML =
      filtered
        .map((it) => {
          const img = it.image?.trim();

          // JSON-t betesszük attribútumba → kattintáskor ebből nyitjuk a modalt
          const payload = escapeAttr(
            JSON.stringify({
              title: it.title,
              tag: it.tag,
              result: it.result,
              summary: it.summary,
              bullets: it.bullets,
              stack: it.stack,
            })
          );

          return `
          <article class="card pcard" data-case="${payload}" role="button" tabindex="0" aria-label="Esettanulmány megnyitása: ${escapeAttr(it.title)}">
            <div class="pimg" ${
              img ? `style="background-image:url('${escapeAttr(img)}');background-size:cover;background-position:center;"` : ""
            }></div>

            <div class="pbody">
              <div class="pmeta">
                <span class="meta">${escapeHtml(it.tag)}</span>
                <span class="meta">📈 ${escapeHtml(it.result)}</span>
              </div>
              <div class="ptitle">${escapeHtml(it.title)}</div>
              <p class="presult">Kattints az esettanulmány nézethez.</p>
            </div>
          </article>
        `;
        })
        .join("") || `<div class="p">Nincs találat.</div>`;

    // kattintás + Enter billentyű: nyissa a case study modalt
    grid.querySelectorAll<HTMLElement>("[data-case]").forEach((card) => {
      const open = () => {
        const raw = card.getAttribute("data-case");
        if (!raw) return;
        try {
          const data = JSON.parse(raw) as Item;
          openCaseStudy(data);
        } catch {
          // ha valami JSON-escape gond lenne, ne omoljon össze az oldal
        }
      };

      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  };

  renderControls();
  renderGrid();
}

/* ===== helpers ===== */
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}

// attribútumba megy → idézőjelek kezelése
function escapeAttr(s: string) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
