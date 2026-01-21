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
            <b class="js-counter" data-start-target="3" data-target="7">0</b>
            <div>Nap alatt kész</div>
          </div>
          <div class="stat">
            <b class="js-counter" data-target="50" data-suffix="+">0</b>
            <div>Elégedett kliens</div>
          </div>
        </div>

        <div class="hero-features" style="margin-top: 32px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <div style="padding: 16px; border-radius: 8px; border: 1px solid var(--border);">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">⏱️ Gyorsaság</h4>
            <p style="font-size: 14px; color: var(--muted);">Egy héten belül live. Nincs hosszú "development" szörnyetegség.</p>
          </div>
          <div style="padding: 16px; border-radius: 8px; border: 1px solid var(--border);">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">🤝 Transzparencia</h4>
            <p style="font-size: 14px; color: var(--muted);">Slack/email hozzáférés, Figma draft, git repository. Látod, mi történik.</p>
          </div>
          <div style="padding: 16px; border-radius: 8px; border: 1px solid var(--border);">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">✅ Korlátlan Revízió</h4>
            <p style="font-size: 14px; color: var(--muted);">Amíg teljesen elégedett nem vagy, addig javítunk. Véglegesen.</p>
          </div>
          <div style="padding: 16px; border-radius: 8px; border: 1px solid var(--border);">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">📊 Mérés</h4>
            <p style="font-size: 14px; color: var(--muted);">Pixel tracking, conversion goal setup, havi reporting dashboard.</p>
          </div>
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
            <span>Before</span>
            <input class="ba-range" type="range" min="0" max="100" value="55" aria-label="Csúszka" />
            <span>After</span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}
