// src/sections/portfolio.ts
import { openCaseStudy } from "../components/caseStudy";
import { t, ta } from "../lib/i18n";

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
        <div class="h2">${t("portfolio.title")}</div>
        <p class="p">
          ${t("portfolio.subtitle")}
        </p>
      </div>

      <div class="portfolio-controls" id="portfolioControls" data-reveal></div>
      
      <!-- 3D Perspective Gallery -->
      <style>
        .portfolio-3d-container {
          perspective: 1200px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: visible;
        }
        
        .portfolio-3d-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .portfolio-card-3d {
          position: absolute;
          width: 280px;
          height: 380px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          transform-style: preserve-3d;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
          cursor: pointer;
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .portfolio-card-3d.active {
          z-index: 10;
          left: 50%;
          transform: translateX(-50%) translateZ(50px) scale(1.05) rotateY(0deg) rotateX(0deg);
        }
        
        .portfolio-card-3d.left {
          left: 10%;
          transform: translateZ(0px) rotateY(25deg) rotateX(2deg) translateZ(-30px);
          opacity: 0.65;
        }
        
        .portfolio-card-3d.right {
          right: 10%;
          left: auto;
          transform: translateZ(0px) rotateY(-25deg) rotateX(2deg) translateZ(-30px);
          opacity: 0.65;
        }
        
        .portfolio-card-3d .pimg {
          flex: 1;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }
        
        .portfolio-card-3d .pimg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .portfolio-card-3d:hover .pimg::after {
          opacity: 1;
        }
        
        .portfolio-card-3d .pbody {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;
          background: white;
        }
        
        .portfolio-card-3d .pmeta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        
        .portfolio-card-3d .meta {
          font-size: 11px;
          padding: 4px 8px;
          background: var(--bg2);
          border-radius: 4px;
          color: var(--muted);
        }
        
        .portfolio-card-3d .ptitle {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        
        .portfolio-card-3d .presult {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .portfolio-3d-container {
            height: auto;
          }
          
          .portfolio-card-3d {
            position: relative;
            width: 100%;
            height: auto;
            transform: none !important;
            opacity: 1 !important;
            margin-bottom: 20px;
          }
          
          .portfolio-card-3d.left,
          .portfolio-card-3d.right {
            display: none;
          }
        }
      </style>
      
      <div class="portfolio-3d-container" id="portfolio3d" data-reveal>
        <div class="portfolio-3d-wrapper" id="portfolio3dWrapper"></div>
      </div>
    </div>
  </section>
  `;
}

export function initPortfolio() {
  const items = ta<Item[]>("portfolio.items").filter(Boolean);

  const controls = document.querySelector<HTMLDivElement>("#portfolioControls");
  const wrapper = document.querySelector<HTMLDivElement>("#portfolio3dWrapper");
  if (!wrapper || !controls) return;

  const tags = Array.from(new Set(items.map((x) => x.tag)));
  const allTags = [t("portfolio.all"), ...tags];

  let active = "Összes";
  let currentIndex = 0;

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
        currentIndex = 0;
        renderControls();
        render3dGallery();
      });
    });
  };

  const render3dGallery = () => {
    const filtered = active === "Összes" ? items : items.filter((x) => x.tag === active);

    wrapper.innerHTML = "";

    if (filtered.length === 0) {
      wrapper.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--muted);">${t("portfolio.empty")}</div>`;
      return;
    }

    // 3 kártya: left, active, right
    filtered.forEach((it, idx) => {
      const img = it.image?.trim();
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

      let className = "portfolio-card-3d";

      if (idx === currentIndex) {
        className += " active";
      } else if (idx === (currentIndex - 1 + filtered.length) % filtered.length) {
        className += " left";
      } else if (idx === (currentIndex + 1) % filtered.length) {
        className += " right";
      } else {
        // csak 3 kártya legyen látható
        return;
      }

      const card = document.createElement("article");
      card.className = className;
      card.dataset.case = payload;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Esettanulmány: ${it.title}`);

      card.innerHTML = `
        <div class="pimg" ${img ? `style="background-image:url('${escapeAttr(img)}');"` : ""}></div>
        <div class="pbody">
          <div class="pmeta">
            <span class="meta">${escapeHtml(it.tag)}</span>
            <span class="meta">📈 ${escapeHtml(it.result)}</span>
          </div>
          <div class="ptitle">${escapeHtml(it.title)}</div>
          <p class="presult">Kattints az esettanulmány nézethez.</p>
        </div>
      `;

      const open = () => {
        try {
          const data = JSON.parse(payload) as Item;
          openCaseStudy(data);
        } catch (e) {
          console.error("Case study parse error:", e);
        }
      };

      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      wrapper.appendChild(card);
    });

    // Carousel kezelés
    if (filtered.length > 1) {
      wrapper.style.position = "relative";

      // Nyíl gomboknak külön container
      const navContainer = document.createElement("div");
      navContainer.style.cssText = `
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 16px;
        z-index: 5;
      `;

      const prevBtn = document.createElement("button");
      prevBtn.innerHTML = "← Előző";
      prevBtn.style.cssText = `
        padding: 10px 20px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
      `;
      prevBtn.addEventListener("mouseover", () => {
        prevBtn.style.transform = "scale(1.05)";
      });
      prevBtn.addEventListener("mouseout", () => {
        prevBtn.style.transform = "scale(1)";
      });
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
        render3dGallery();
      });

      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = "Következő →";
      nextBtn.style.cssText = `
        padding: 10px 20px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
      `;
      nextBtn.addEventListener("mouseover", () => {
        nextBtn.style.transform = "scale(1.05)";
      });
      nextBtn.addEventListener("mouseout", () => {
        nextBtn.style.transform = "scale(1)";
      });
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % filtered.length;
        render3dGallery();
      });

      navContainer.appendChild(prevBtn);
      navContainer.appendChild(nextBtn);
      wrapper.parentElement?.appendChild(navContainer);
    }
  };

  renderControls();
  render3dGallery();
}

/* ===== helpers ===== */
function escapeHtml(s: string) {
  return s.replaceAll(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}

// attribútumba megy → idézőjelek kezelése
function escapeAttr(s: string) {
  return escapeHtml(s).replaceAll("\"", "&quot;");
}
