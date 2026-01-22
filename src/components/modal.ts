import { toast } from "./toast";
import { t } from "../lib/i18n";

export function initModal() {
  const modal = document.querySelector<HTMLElement>("#quoteModal");
  if (!modal) return;

  const openers = Array.from(document.querySelectorAll<HTMLElement>('[data-modal-open="quote"]'));
  const closers = Array.from(modal.querySelectorAll<HTMLElement>("[data-modal-close]"));
  const backdrop = modal.querySelector<HTMLElement>(".modal-backdrop");

  const close = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const top = contactSection.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  openers.forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToContact();
  }));
  closers.forEach((b) => b.addEventListener("click", close));
  backdrop?.addEventListener("click", close);

  globalThis.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  // fake submit
  const form = modal.querySelector<HTMLFormElement>("#quoteForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    close();
    toast(t("modal.thanksTitle"), t("modal.thanksBody"));
    form.reset();
  });
}
