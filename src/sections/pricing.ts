export function renderPricing() {
  return `
  <section class="section" id="pricing">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="kicker">💰 Árazás</span>
        <div class="h2">Egyszerű, átlátható csomagok</div>
        <p class="p">Nincs rejtett díj. Amit kapsz, az az! Egyéb igények? Egyedi ajánlat.</p>
      </div>

      <div class="pricing-grid" style="margin-top:28px;">
        ${pkg("Starter", "Kisvállalkozói csomag", 
          ["1–3 oldal", "Reszponzív design", "Alap SEO", "Contact form", "Free SSL"],
          "4–5 nap",
          "$1,200",
          "Ajánlatkérés"
        )}
        ${pkg("Professional", "Konverziós csomag", 
          ["4–8 oldal", "Custom animációk", "Sebesség optimalizálás", "Lead tracking", "Analytics setup", "Email campaign ready"],
          "5–7 nap",
          "$3,500",
          "Jelölj ki!",
          true
        )}
        ${pkg("Enterprise", "Teljes custom", 
          ["Korlátlan oldalak", "E-commerce / CMS", "API integrálások", "3 éves support", "Performance monitoring", "Monthly reports"],
          "Egyedi",
          "Ajánlat alapján",
          "Beszéljünk"
        )}
      </div>

      <div class="pricing-note" data-reveal>
        <p><strong>💡 Minden csomag tartalmaz:</strong></p>
        <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 12px; list-style: none; padding: 0;">
          <li>✓ 95+ PageSpeed</li>
          <li>✓ Mobil-first</li>
          <li>✓ SEO-ready</li>
          <li>✓ SSL cert</li>
          <li>✓ Domain setup</li>
          <li>✓ 1 év free support</li>
        </ul>
      </div>
    </div>
  </section>
  `;
}

function pkg(name: string, desc: string, bullets: string[], time: string, price: string, cta: string, featured = false) {
  return `
  <div class="pricing-card ${featured ? "featured" : ""}" data-reveal>
    ${featured ? '<div class="pricing-badge">Legtöbb érték</div>' : ''}
    <div class="pricing-header">
      <h3 class="pricing-title">${name}</h3>
      <p class="pricing-desc">${desc}</p>
    </div>
    <div class="pricing-value">
      <div class="pricing-price">${price}</div>
      <div class="pricing-time">${time} alatt</div>
    </div>
    <div class="pricing-features">
      ${bullets.map(b => `<div class="feature-row">✓ ${b}</div>`).join('')}
    </div>
    <button class="btn ${featured ? "btn-primary" : "btn-outline"}" style="width: 100%; margin-top: 20px;" data-modal-open="quote">${cta}</button>
  </div>
  `;
}
