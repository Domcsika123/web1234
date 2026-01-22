import { t, ta } from "../lib/i18n";

type Feature = { title: string; text: string };

export function renderHero() {
  const features = ta<Feature[]>("hero.features");

  return `
  <section class="hero" id="top">
    <div class="container hero-grid">
      <div data-reveal>
        <h1>
          ${t("hero.titleLead")} <span class="grad-text">${t("hero.titleHighlight")}</span>
        </h1>

        <p class="p">
          ${t("hero.subtitle")}
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" data-modal-open="quote">${t("hero.ctaPrimary")}</button>
          <a class="btn" href="#work" data-nav>${t("hero.ctaSecondary")}</a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <b class="js-counter" data-start-target="3" data-target="7">0</b>
            <div>${t("hero.stats.days")}</div>
          </div>
          <div class="stat">
            <b class="js-counter" data-target="50" data-suffix="+">0</b>
            <div>${t("hero.stats.clients")}</div>
          </div>
        </div>

        <div class="hero-features" style="margin-top: 32px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          ${features
            .map(
              (f) => `
            <div style="padding: 16px; border-radius: 8px; border: 1px solid var(--border);">
              <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${f.title}</h4>
              <p style="font-size: 14px; color: var(--muted);">${f.text}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="hero-visual" data-reveal>
        <div class="ba" aria-label="${t("hero.before")}/${t("hero.after")}">
          <div class="ba-frame">
            <div class="ba-after"></div>
            <div class="ba-before"></div>
            <div class="ba-handle"></div>
          </div>

          <div class="ba-foot">
            <span>${t("hero.before")}</span>
            <input class="ba-range" type="range" min="0" max="100" value="55" aria-label="${t("hero.sliderLabel")}" />
            <span>${t("hero.after")}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}
