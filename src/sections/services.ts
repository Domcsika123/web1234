export function renderServices() {
  return `
  <section class="section" id="services">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Csomagok</div>
        <p class="p">Teljes körű megoldás: design, fejlesztés, SEO, performance. Nincs rejtett díj.</p>
      </div>

      <div class="services-grid">
        ${serviceCard(
          "💎 Premium Package",
          ["• Professzionális design", "• 100% mobiloptimalizált", "• 95+ PageSpeed Score", "• SEO beállítás", "• SSL, analytics", "• 1 év ingyenes karbantartás"],
          "Legjobb érték"
        )}
        ${serviceCard(
          "🚀 Pro Plus",
          ["• Összes Premium funkció", "• Custom animációk", "• Formlekezelés & lead capture", "• Email integrálás", "• Admin dashboard", "• Teljes fejlesztői support"],
          "Legtöbb funkció"
        )}
        ${serviceCard(
          "🏆 Enterprise",
          ["• Teljes custom megoldás", "• Multi-page kampánya", "• E-commerce / webshop", "• Saját backend rendszer", "• API integrálások", "• Folyamatos szupportszervezet"],
          "Magas volumen"
        )}
      </div>

      <div class="services-features" data-reveal>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <div class="feature-text">
            <h3>Gyorsaság</h3>
            <p>95+ Lighthouse score, <2s betöltés, optimalizált képek</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <div class="feature-text">
            <h3>Konverzió fókusz</h3>
            <p>Clear CTA, persuasive copy, trust signals, A/B ready</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔒</div>
          <div class="feature-text">
            <h3>Biztonság & Privacy</h3>
            <p>GDPR compliant, SSL, secure forms, data protection</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📱</div>
          <div class="feature-text">
            <h3>Responsive Design</h3>
            <p>Mobile-first, tablet-optimized, összes képernyő</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

function serviceCard(title: string, features: string[], badge: string) {
  return `
    <div class="service-card" data-reveal>
      <div class="card-badge">${badge}</div>
      <h3 class="card-title">${title}</h3>
      <ul class="features-list">
        ${features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="btn btn-outline" style="width: 100%; margin-top: 20px;">Érdeklődj</button>
    </div>
  `;
}

