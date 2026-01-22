import { toast } from "../components/toast";
import { t, ta } from "../lib/i18n";

export function renderCalculator() {
  const types = ta<Record<string, string>>("calculator.types");
  const extras = ta<Record<string, string>>("calculator.extras");

  return `
  <section class="section" id="calculator">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">${t("calculator.title")}</div>
        <p class="p">${t("calculator.subtitle")}</p>
      </div>

      <div class="calc-grid">
        <div class="card card-pad" data-reveal>
          <div class="field">
            <label for="pages">${t("calculator.pagesLabel")} <span class="field-value" id="pagesLabel">4</span></label>
            <input id="pages" type="range" min="1" max="12" value="4" class="slider" />
            <div class="range-labels">
              <span>${t("calculator.pagesMin")}</span>
              <span>${t("calculator.pagesMax")}</span>
            </div>
          </div>

          <div class="field">
            <label for="type">${t("calculator.typeLabel")}</label>
            <select id="type" class="calc-select">
              ${Object.entries(types)
                .map(([value, label]) => {
                  const selected = value === "corporate" ? " selected" : "";
                  return `<option value="${value}"${selected}>${label}</option>`;
                })
                .join("")}
            </select>
          </div>

          <div class="checks">
            <h4 style="margin: 16px 0 12px; font-size: 13px; color: var(--muted); text-transform: uppercase; font-weight: 700;">${t("calculator.extrasTitle")}</h4>
            <label class="check"><input id="opt_seo" type="checkbox" /><span>${extras.seo}</span></label>
            <label class="check"><input id="opt_copy" type="checkbox" /><span>${extras.copy}</span></label>
            <label class="check"><input id="opt_cms" type="checkbox" /><span>${extras.cms}</span></label>
            <label class="check"><input id="opt_ecommerce" type="checkbox" /><span>${extras.ecommerce}</span></label>
          </div>
        </div>

        <div class="calc-result card card-pad" data-reveal>
          <div class="meta">${t("calculator.estimate.title")}</div>
          
          <div class="result-item">
            <div class="result-label">${t("calculator.estimate.price")}</div>
            <div class="result-value" id="priceOut">—</div>
          </div>

          <div class="result-item">
            <div class="result-label">${t("calculator.estimate.time")}</div>
            <div class="result-value" id="timeOut">—</div>
          </div>

          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
            <p style="margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5;">
              ${t("calculator.estimate.note")}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function initCalculator() {
  const pages = document.querySelector<HTMLInputElement>("#pages");
  const pagesLabel = document.querySelector<HTMLElement>("#pagesLabel");
  const priceOut = document.querySelector<HTMLElement>("#priceOut");
  const timeOut = document.querySelector<HTMLElement>("#timeOut");
  const typeSelect = document.querySelector<HTMLSelectElement>("#type");
  const explain = document.querySelector<HTMLButtonElement>("#calcExplain");

  if (!pages || !priceOut || !timeOut) return;

  const opts = {
    seo: document.querySelector<HTMLInputElement>("#opt_seo"),
    copy: document.querySelector<HTMLInputElement>("#opt_copy"),
    cms: document.querySelector<HTMLInputElement>("#opt_cms"),
    ecommerce: document.querySelector<HTMLInputElement>("#opt_ecommerce"),
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat(t("calculator.locale"), { style: "currency", currency: t("calculator.currency"), maximumFractionDigits: 0 }).format(n);

  const recalc = () => {
    const pageCount = Number(pages.value);
    const type = typeSelect?.value || "corporate";

    // Base price by type
    let base = 180_000;
    if (type === "landing") base = 120_000;
    else if (type === "ecommerce") base = 250_000;
    else if (type === "portal") base = 320_000;

    // Add per-page cost
    base += pageCount * 45_000;

    // Days calculation
    let days = 4 + Math.ceil(pageCount * 0.6);

    // Add extras
    if (opts.seo?.checked) { base += 45_000; days += 1; }
    if (opts.copy?.checked) { base += 65_000; days += 2; }
    if (opts.cms?.checked) { base += 120_000; days += 3; }
    if (opts.ecommerce?.checked) { base += 150_000; days += 4; }

    priceOut.textContent = fmt(base);
    timeOut.textContent = `${days}–${days + 3} ${t("calculator.workdays")}`;
    if (pagesLabel) pagesLabel.textContent = String(pageCount);
  };

  pages.addEventListener("input", recalc);
  typeSelect?.addEventListener("change", recalc);
  Object.values(opts).forEach((x) => x?.addEventListener("change", recalc));

  explain?.addEventListener("click", () => {
    toast(t("calculator.estimate.title"), t("calculator.estimate.note"));
  });

  recalc();
}
