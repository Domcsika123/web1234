import { toast } from "../components/toast";
import { t, ta } from "../lib/i18n";

export function renderContact() {
  const projectOptions = ta<{ value: string; label: string }[]>("contact.form.projectOptions");

  return `
  <section class="section" id="contact">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">${t("contact.title")}</div>
        <p class="p">${t("contact.subtitle")}</p>
      </div>

      <div class="contact-grid" data-reveal>
        <div class="contact-info">
          <h3>${t("contact.infoTitle")}</h3>
          
          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <div>
              <div class="contact-label">${t("contact.emailLabel")}</div>
              <a href="mailto:info@webfejlesztes.hu">info@webfejlesztes.hu</a>
            </div>
          </div>

          <div class="contact-item">
            <span class="contact-icon">📱</span>
            <div>
              <div class="contact-label">${t("contact.phoneLabel")}</div>
              <a href="tel:+36301234567">+36 (30) 123-4567</a>
            </div>
          </div>

          <div style="margin-top: 30px;">
            <h4 style="margin-top: 0;">${t("contact.availabilityTitle")}</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">📅 <strong>${t("contact.availabilityWeekdays")}</strong></li>
              <li>⏰ <strong>${t("contact.availabilityUrgent")}</strong></li>
            </ul>
          </div>
        </div>

        <form id="contactForm" class="contact-form" data-reveal>
          <h3>${t("contact.formTitle")}</h3>
          
          <div class="form-group">
            <label for="c_name">${t("contact.form.name")}</label>
            <input id="c_name" type="text" required placeholder="${t("contact.form.placeholders.name")}" />
          </div>

          <div class="form-group">
            <label for="c_email">${t("contact.form.email")}</label>
            <input id="c_email" type="email" required placeholder="${t("contact.form.placeholders.email")}" />
          </div>

          <div class="form-group">
            <label for="c_phone">${t("contact.form.phone")}</label>
            <input id="c_phone" type="tel" placeholder="${t("contact.form.placeholders.phone")}" />
          </div>

          <div class="form-group">
            <label for="c_type">${t("contact.form.projectType")}</label>
            <select id="c_type" required>
              ${projectOptions.map((o) => `<option value="${o.value}">${o.label}</option>`).join("")}
            </select>
          </div>

          <div class="form-group">
            <label for="c_msg">${t("contact.form.message")}</label>
            <textarea id="c_msg" required placeholder="${t("contact.form.placeholders.message")}"></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" style="width: 100%;">${t("contact.form.submit")}</button>
          </div>

          <div style="font-size: 12px; color: var(--muted); margin-top: 12px;">
            <input type="checkbox" id="c_agree" required style="margin-right: 6px;" />
            <label for="c_agree">${t("contact.form.privacy")}</label>
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

    toast(t("contact.toastTitle"), t("contact.toastMessage"));
    form.reset();
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const top = contactSection.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}
