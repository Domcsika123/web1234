export function renderFooter() {
  const year = new Date().getFullYear();

  return `
  <footer class="site-footer">
    <div class="container footer-top" data-reveal>
      <div class="footer-brand">
        <div class="brand">
          <span class="brand-dot"></span>
          <span>Webfejlesztés</span>
        </div>
        <p class="footer-text">
          Premium weboldalak, amik eladnak. Design + fejlesztés + SEO + performance.
        </p>

        <div class="footer-cta">
          <button class="btn btn-primary" data-modal-open="quote">Konzultáció kérése</button>
          <a class="btn" href="#work" data-nav>Portfólió</a>
        </div>
      </div>

      <div class="footer-cols">
        <div class="fcol">
          <div class="fhead">Szolgáltatások</div>
          <a class="flink" href="#services" data-nav>Premium csomag</a>
          <a class="flink" href="#services" data-nav>Pro Plus</a>
          <a class="flink" href="#services" data-nav>Enterprise</a>
          <a class="flink" href="#calculator" data-nav>Árbecslő</a>
        </div>

        <div class="fcol">
          <div class="fhead">Rólunk</div>
          <a class="flink" href="#work" data-nav>Portfólió</a>
          <a class="flink" href="#process" data-nav>Folyamat</a>
          <a class="flink" href="#testimonials" data-nav>Vélemények</a>
          <a class="flink" href="#faq" data-nav>GYIK</a>
        </div>

        <div class="fcol">
          <div class="fhead">Gyors kontakt</div>
          <a class="flink" href="mailto:info@webfejlesztes.hu">info@webfejlesztes.hu</a>
          <a class="flink" href="tel:+36301234567">+36 (30) 123-4567</a>
          <span class="fmuted">Mon–Fri: 9–18</span>
        </div>

        <div class="fcol">
          <div class="fhead">Egyéb</div>
          <a class="flink" href="#contact" data-nav>Kapcsolat</a>
          <a class="flink" href="#">Adatkezelés</a>
          <a class="flink" href="#">ÁSZF</a>
          <span class="fmuted">© ${year} Webfejlesztés</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span class="fmuted">© ${year} Webfejlesztés. All rights reserved.</span>
        <div class="footer-tech">
          <span class="fmuted">Built with</span>
          <span style="margin: 0 4px;">❤️</span>
          <span class="fmuted">TypeScript • Vite • Modern CSS</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}
