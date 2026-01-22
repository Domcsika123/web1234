import { t, ta } from "../lib/i18n";

export function renderHero() {
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
            <b class="js-counter" data-target="95" data-suffix="+">${t("hero.stats.pagespeedValue")}</b>
            <div>${t("hero.stats.pagespeedLabel")}</div>
          </div>
          <div class="stat">
            <b
              class="js-counter"
              data-start-target="3"
              data-target="7"
              data-start-from="0"
              data-from="0"
            >${t("hero.stats.daysValue")}</b>
            <div>${t("hero.stats.daysLabel")}</div>
          </div>
          <div class="stat">
            <b class="js-counter" data-target="50" data-suffix="+">${t("hero.stats.clientsValue")}</b>
            <div>${t("hero.stats.clientsLabel")}</div>
          </div>
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
