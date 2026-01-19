export function renderProcess() {
  return `
  <section class="section" id="process">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Gyors, transzparens munkafolyamat</div>
        <p class="p">3–7 nap alatt live. Minden lépés világos, korlátlan revízió, 1 év support.</p>
      </div>

      <div class="process-timeline" data-reveal>
        ${step("1️⃣ Discovery Call", "Megértjük az üzleti célt, a célközönséget, és a KPI-ket. (30 min)")}
        ${step("2️⃣ Design Concept", "Figma mockup, 2-3 dizájn szint közül választhatsz. (1-2 nap)")}
        ${step("3️⃣ Development", "Clean, semantic kód. TypeScript, modern CSS, performance-first. (2-4 nap)")}
        ${step("4️⃣ Testing & Revisions", "Cross-browser, mobile, performance tesztelés. Korlátlan revízió. (1 nap)")}
        ${step("5️⃣ Launch & Analytics", "Deploy, DNS/SSL konfigurálás, Google Analytics, pixel tracking. (1 nap)")}
        ${step("6️⃣ Follow-up Support", "Évenkénti security updates, SEO optimalizálás, feature request konsultáció.")}
      </div>

      <div class="process-features" data-reveal style="margin-top: 40px;">
        <div class="pfeature">
          <h3>⏱️ Gyorsaság</h3>
          <p>Egy héten belül live. Nincs hosszú "development" szörnyetegség.</p>
        </div>
        <div class="pfeature">
          <h3>🤝 Transzparencia</h3>
          <p>Slack/email hozzáférés, Figma draft, git repository. Látod, mi történik.</p>
        </div>
        <div class="pfeature">
          <h3>✅ Korlátlan Revízió</h3>
          <p>Amíg teljesen elégedett nem vagy, addig javítunk. Véglegesen.</p>
        </div>
        <div class="pfeature">
          <h3>📊 Mérés</h3>
          <p>Pixel tracking, conversion goal setup, havi reporting dashboard.</p>
        </div>
      </div>
    </div>
  </section>
  `;
}

function step(title: string, text: string) {
  return `
    <div class="timeline-step" data-reveal>
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </div>
  `;
}
