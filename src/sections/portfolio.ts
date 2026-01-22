// src/sections/portfolio.ts
import { openCaseStudy } from "../components/caseStudy";
import { t, ta } from "../lib/i18n";

type Item = {
  title: string;
  tag: string;
  result: string;
  image?: string;
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
      
      <!-- 3D Book Gallery -->
      <style>
        .portfolio-book-container {
          perspective: 1200px;
          height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          margin: 60px 0;
        }
        
        .portfolio-book-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .portfolio-book {
          width: 900px;
          height: 550px;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4), 0 0 40px rgba(168, 85, 247, 0.2);
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
          border: 8px solid #0a0a0a;
        }
        
        .portfolio-book::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(90deg, rgba(0,0,0,0.3), transparent);
          z-index: 10;
          pointer-events: none;
        }
        
        .portfolio-book-spine {
          position: absolute;
          left: -8px;
          top: 0;
          bottom: 0;
          width: 8px;
          background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
          transform: skewX(-5deg);
        }
        
        .portfolio-book-pages {
          display: flex;
          height: 100%;
          width: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        
        .portfolio-page {
          flex: 0 0 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 40px;
          background: white;
          position: relative;
          overflow: hidden;
        }
        
        .portfolio-page.left {
          border-right: 1px solid #e5e5e5;
          justify-content: space-between;
        }
        
        .portfolio-page.right {
          background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .portfolio-page-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 8px;
        }
        
        .portfolio-page-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        
        .portfolio-page-result {
          font-size: 14px;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 24px;
        }
        
        .portfolio-page-desc {
          font-size: 13px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 20px;
          flex: 1;
        }
        
        .portfolio-page-stack {
          font-size: 11px;
          color: #999;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }
        
        .portfolio-page-stack span {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 3px;
        }
        
        .portfolio-page-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          border-radius: 3px;
        }
        
        .portfolio-book-nav {
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          align-items: center;
          z-index: 20;
        }
        
        .portfolio-book-btn {
          padding: 12px 28px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .portfolio-book-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
        }
        
        .portfolio-page-flip {
          animation: pageFlip 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-style: preserve-3d;
        }
        
        @keyframes pageFlip {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(90deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
        
        @media (max-width: 1024px) {
          .portfolio-book {
            width: 100%;
            max-width: 700px;
            height: 450px;
          }
          
          .portfolio-page {
            padding: 30px;
            font-size: 14px;
          }
          
          .portfolio-page-title {
            font-size: 24px;
          }
        }
      </style>
      
      <div class="portfolio-book-container" id="portfolioBook" data-reveal>
        <div class="portfolio-book-wrapper" id="portfolioBookWrapper">
          <!-- Book pages will be rendered here -->
        </div>
        <div class="portfolio-book-nav" id="portfolioBookNav"></div>
      </div>
    </div>
  </section>
  `;
}

export function initPortfolio() {
  const items = ta<Item[]>("portfolio.items").filter(Boolean);
  const bookWrapper = document.querySelector<HTMLDivElement>("#portfolioBookWrapper");
  const bookNav = document.querySelector<HTMLDivElement>("#portfolioBookNav");

  if (!bookWrapper || !bookNav || items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;

  const renderBookPage = () => {
    const item = items[currentIndex];
    const img = item.image?.trim() || "";

    // Create book HTML
    const bookHTML = `
      <div class="portfolio-book">
        <div class="portfolio-book-spine"></div>
        <div class="portfolio-book-pages">
          <!-- Left Page: Info -->
          <div class="portfolio-page left">
            <div>
              <div class="portfolio-page-tag">${escapeHtml(item.tag)}</div>
              <div class="portfolio-page-title">${escapeHtml(item.title)}</div>
              <div class="portfolio-page-result">📈 ${escapeHtml(item.result)}</div>
            </div>
            <div class="portfolio-page-desc">
              ${escapeHtml(item.summary || "")}
            </div>
            <div>
              ${item.bullets && item.bullets.length > 0
        ? `
                <div style="margin-bottom: 20px; font-size: 13px; line-height: 1.8; color: #555;">
                  ${item.bullets.map((b) => `<div style="margin-bottom: 8px;">✓ ${escapeHtml(b)}</div>`).join("")}
                </div>
              `
        : ""
      }
              <div class="portfolio-page-stack">
                <strong style="width: 100%; color: #1a1a1a; margin-bottom: 8px; display: block;">Technológia:</strong>
                ${item.stack ? item.stack.map((s) => `<span>${escapeHtml(s)}</span>`).join("") : ""}
              </div>
            </div>
          </div>
          
          <!-- Right Page: Image -->
          <div class="portfolio-page right">
            ${img
        ? `<div class="portfolio-page-image" style="background-image:url('${escapeAttr(img)}');"></div>`
        : `<div style="font-size: 14px; color: #999; text-align: center;">Nincs kép</div>`
      }
          </div>
        </div>
      </div>
    `;

    bookWrapper.innerHTML = bookHTML;

    // Add flip animation
    const book = bookWrapper.querySelector<HTMLDivElement>(".portfolio-book");
    if (book) {
      book.classList.add("portfolio-page-flip");
    }
  };

  const updateNav = () => {
    if (totalItems <= 1) return;

    bookNav.innerHTML = `
      <button class="portfolio-book-btn" id="prevBtn">← Előző</button>
      <span style="display: flex; align-items: center; color: var(--muted); font-size: 14px;">
        ${currentIndex + 1} / ${totalItems}
      </span>
      <button class="portfolio-book-btn" id="nextBtn">Következő →</button>
    `;

    const prevBtn = bookNav.querySelector<HTMLButtonElement>("#prevBtn");
    const nextBtn = bookNav.querySelector<HTMLButtonElement>("#nextBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        renderBookPage();
        updateNav();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        renderBookPage();
        updateNav();
      });
    }
  };

  // Initial render
  renderBookPage();
  updateNav();
}

/* ===== helpers ===== */
function escapeHtml(s: string) {
  return s.replaceAll(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}

// attribútumba megy → idézőjelek kezelése
function escapeAttr(s: string) {
  return escapeHtml(s).replaceAll("\"", "&quot;");
}
