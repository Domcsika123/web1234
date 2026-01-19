import { toast } from "../components/toast";

export function renderContact() {
  return `
  <section class="section" id="contact">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Szeretnél elkezdeni?</div>
        <p class="p">Írj vagy hívj. 24 órán belül válaszolunk, konzultáció ingyenes.</p>
      </div>

      <div class="contact-grid" data-reveal>
        <div class="contact-info">
          <h3>Gyors kontakt</h3>
          
          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <div>
              <div class="contact-label">Email</div>
              <a href="mailto:info@webfejlesztes.hu">info@webfejlesztes.hu</a>
            </div>
          </div>

          <div class="contact-item">
            <span class="contact-icon">📱</span>
            <div>
              <div class="contact-label">Telefon</div>
              <a href="tel:+36301234567">+36 (30) 123-4567</a>
            </div>
          </div>

          <div class="contact-item">
            <span class="contact-icon">💬</span>
            <div>
              <div class="contact-label">Slack / Discord</div>
              <p style="margin: 0; color: var(--muted);">Real-time project updates</p>
            </div>
          </div>

          <div style="margin-top: 30px;">
            <h4 style="margin-top: 0;">Várható időpontok</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">📅 <strong>Hétfő–Péntek:</strong> 09:00–18:00</li>
              <li>⏰ <strong>Sürgős:</strong> 30 perces callback</li>
            </ul>
          </div>
        </div>

        <form id="contactForm" class="contact-form" data-reveal>
          <h3>Kérdezz vagy kérj ajánlatot</h3>
          
          <div class="form-group">
            <label for="c_name">Név *</label>
            <input id="c_name" type="text" required placeholder="A céged vagy neved" />
          </div>

          <div class="form-group">
            <label for="c_email">Email *</label>
            <input id="c_email" type="email" required placeholder="email@domain.hu" />
          </div>

          <div class="form-group">
            <label for="c_phone">Telefon</label>
            <input id="c_phone" type="tel" placeholder="+36 (30) 123-4567" />
          </div>

          <div class="form-group">
            <label for="c_type">Milyen típusú projekt?</label>
            <select id="c_type" required>
              <option value="">-- Válassz --</option>
              <option value="landing">Landing page</option>
              <option value="webshop">Webshop / E-commerce</option>
              <option value="corporate">Céges oldal</option>
              <option value="saas">SaaS platform</option>
              <option value="redesign">Redesign / Migration</option>
              <option value="other">Egyéb</option>
            </select>
          </div>

          <div class="form-group">
            <label for="c_msg">Rövid leírás *</label>
            <textarea id="c_msg" required placeholder="Mi a cél? Mi a szükséges? Milyen timeframe?"></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" style="width: 100%;">Küldés & Konzultáció</button>
          </div>

          <div style="font-size: 12px; color: var(--muted); margin-top: 12px;">
            <input type="checkbox" id="c_agree" required style="margin-right: 6px;" />
            <label for="c_agree">Elfogadom az adatvédelmi irányelveket</label>
          </div>
        </form>
      </div>
    </div>
  </section>
  `;
}

export function initContact() {
  const form = document.querySelector<HTMLFormElement>("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = (document.querySelector("#c_name") as HTMLInputElement).value;
    const email = (document.querySelector("#c_email") as HTMLInputElement).value;
    const type = (document.querySelector("#c_type") as HTMLSelectElement).value;
    const msg = (document.querySelector("#c_msg") as HTMLTextAreaElement).value;

    // Later: send to backend/API
    console.log({ name, email, type, msg });

    toast("Köszönünk! ✅", "Az üzeneteted megkaptuk. Hamarosan felvesszük veled a kapcsolatot.");
    form.reset();
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const top = contactSection.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}
