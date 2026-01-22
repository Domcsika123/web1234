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
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.320, 1), opacity 0.8s cubic-bezier(0.23, 1, 0.320, 1), filter 0.8s cubic-bezier(0.23, 1, 0.320, 1);
          cursor: pointer;
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          will-change: transform, opacity, filter;
        }

        .portfolio-card-3d.is-anim {
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.23, 1, 0.320, 1);
          animation-fill-mode: both;
        }

        .portfolio-card-3d[data-role="active"][data-move="next"].is-anim {
          animation-name: card-enter-from-right;
        }

        .portfolio-card-3d[data-role="active"][data-move="prev"].is-anim {
          animation-name: card-enter-from-left;
        }

        .portfolio-card-3d[data-role="left"].is-anim {
          animation-name: card-shift-left;
        }

        .portfolio-card-3d[data-role="right"].is-anim {
          animation-name: card-shift-right;
        }

        @keyframes card-enter-from-right {
          0% {
            transform: translateX(20%) translateZ(0px) rotateY(-10deg) rotateX(2deg);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) translateZ(50px) scale(1.05) rotateY(0deg) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes card-enter-from-left {
          0% {
            transform: translateX(-120%) translateZ(0px) rotateY(10deg) rotateX(2deg);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) translateZ(50px) scale(1.05) rotateY(0deg) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes card-shift-left {
          0% {
            transform: translateX(-35%) translateZ(10px) rotateY(15deg) rotateX(2deg);
            opacity: 0.3;
          }
          100% {
            transform: translateZ(0px) rotateY(25deg) rotateX(2deg) translateZ(-30px);
            opacity: 0.65;
          }
        }

        @keyframes card-shift-right {
          0% {
            transform: translateX(35%) translateZ(10px) rotateY(-15deg) rotateX(2deg);
            opacity: 0.3;
          }
          100% {
            transform: translateZ(0px) rotateY(-25deg) rotateX(2deg) translateZ(-30px);
            opacity: 0.65;
          }
        }

        .portfolio-card-3d.is-enter {
          transform: translateZ(-120px) scale(0.9);
          opacity: 0;
          filter: blur(2px);
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
  const wrapper = document.querySelector<HTMLDivElement>("#portfolio3dWrapper");
  if (!wrapper) return;

  let active = "Összes";
  let currentIndex = 0;
  let prevIndex = 0;
  let pendingDirection: "next" | "prev" | "none" = "none";

  const render3dGallery = () => {
    const filtered = active === "Összes" ? items : items.filter((x) => x.tag === active);

    const direction = pendingDirection;

    wrapper.innerHTML = "";
    wrapper.parentElement?.querySelector("#portfolio3dNav")?.remove();

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

      let className = "portfolio-card-3d is-enter";
      let role: "active" | "left" | "right" | "hidden" = "hidden";

      if (idx === currentIndex) {
        className += " active";
        role = "active";
      } else if (idx === (currentIndex - 1 + filtered.length) % filtered.length) {
        className += " left";
        role = "left";
      } else if (idx === (currentIndex + 1) % filtered.length) {
        className += " right";
        role = "right";
      } else {
        // csak 3 kártya legyen látható
        return;
      }

      const card = document.createElement("article");
      card.className = className;
      card.dataset.role = role;
      if (direction !== "none") card.dataset.move = direction;
      card.classList.add("is-anim");
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

    requestAnimationFrame(() => {
      wrapper.querySelectorAll<HTMLElement>(".portfolio-card-3d.is-enter").forEach((el) => {
        el.classList.remove("is-enter");
      });
    });

    pendingDirection = "none";

    // Carousel kezelés
    if (filtered.length > 1) {
      wrapper.style.position = "relative";

      // Nyíl gomboknak külön container
      const navContainer = document.createElement("div");
      navContainer.id = "portfolio3dNav";
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
        prevIndex = currentIndex;
        currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
        pendingDirection = "prev";
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
        prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % filtered.length;
        pendingDirection = "next";
        render3dGallery();
      });

      navContainer.appendChild(prevBtn);
      navContainer.appendChild(nextBtn);
      wrapper.parentElement?.appendChild(navContainer);
    }
  };

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
