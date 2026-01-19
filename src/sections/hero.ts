export function renderHero() {
  return `
  <section class="hero" id="top">
    <div class="container hero-grid">
      <div data-reveal>
        <h1>
          Weboldalak, amik <span class="grad-text">valóban működnek.</span>
        </h1>

        <p class="p">
          Nincs szépítés a végén. Design, kód, és marketing egy csomágban. 
          95+ PageSpeed. Konverzió-fókusz. Mérhető eredmények az első héten.
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" data-modal-open="quote">Konzultáció kérése</button>
          <a class="btn" href="#work" data-nav>Portfólió megtekintése</a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <b>95+</b>
            <div>PageSpeed Score</div>
          </div>
          <div class="stat">
            <b>3–7</b>
            <div>Nap alatt kész</div>
          </div>
          <div class="stat">
            <b>50+</b>
            <div>Elégedett kliens</div>
          </div>
        </div>

        <div class="hero-features">
          <div class="feature-badge">✓ Mobil-first</div>
          <div class="feature-badge">✓ SEO-ready</div>
          <div class="feature-badge">✓ Accessible</div>
          <div class="feature-badge">✓ Converter</div>
        </div>
      </div>

      <div class="hero-visual" data-reveal>
        <div class="ba" aria-label="Before/After">
          <div class="ba-frame">
            <div class="ba-after"></div>
            <div class="ba-before"></div>
            <div class="ba-handle"></div>
          </div>

          <div class="ba-foot">
            <span>Előtte</span>
            <input class="ba-range" type="range" min="0" max="100" value="55" aria-label="Csúszka" />
            <span>Után</span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}
