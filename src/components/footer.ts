import { t } from "../lib/i18n";

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
  <footer class="site-footer">
    <div class="container footer-top" data-reveal>
      <div class="footer-brand">
        <div class="brand">
          <span class="brand-dot"></span>
          <span>${t("footer.brand")}</span>
        </div>
        <p class="footer-text">
          ${t("footer.text")}
        </p>

        <div class="footer-cta">
          <button class="btn btn-primary" data-modal-open="quote">${t("footer.ctaPrimary")}</button>
        </div>
      </div>

      <div class="footer-cols">
        <div class="fcol">
          <div class="fhead">${t("footer.columns.services")}</div>
          <a class="flink" href="#calculator" data-nav>${t("footer.links.calculator")}</a>
          <a class="flink" href="#process" data-nav>${t("footer.links.process")}</a>
          <a class="flink" href="#work" data-nav>${t("footer.links.portfolio")}</a>
          <a class="flink" href="#contact" data-nav>${t("footer.links.contact")}</a>
        </div>

        <div class="fcol">
          <div class="fhead">${t("footer.columns.about")}</div>
          <a class="flink" href="#work" data-nav>${t("footer.links.portfolio")}</a>
          <a class="flink" href="#process" data-nav>${t("footer.links.process")}</a>
          <a class="flink" href="#testimonials" data-nav>${t("footer.links.testimonials")}</a>
          <a class="flink" href="#faq" data-nav>${t("footer.links.faq")}</a>
        </div>

        <div class="fcol">
          <div class="fhead">${t("footer.columns.contact")}</div>
          <a class="flink" href="mailto:info@webfejlesztes.hu">info@webfejlesztes.hu</a>
          <a class="flink" href="tel:+36301234567">+36 (30) 123-4567</a>
          <span class="fmuted">${t("footer.hours")}</span>
        </div>

        <div class="fcol">
          <div class="fhead">${t("footer.columns.other")}</div>
          <a class="flink" href="#contact" data-nav>${t("footer.links.contact")}</a>
          <a class="flink" href="#">${t("footer.links.privacy")}</a>
          <a class="flink" href="#">${t("footer.links.terms")}</a>
          <span class="fmuted">© ${year} ${t("footer.brand")}</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span class="fmuted">© ${year} ${t("footer.brand")}. ${t("footer.copyright")}</span>
        <div class="footer-tech">
          <span class="fmuted">${t("footer.builtWith")}</span>
          <span style="margin: 0 4px;">❤️</span>
          <span class="fmuted">${t("footer.stack")}</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}
