import { toast } from "../components/toast";

export function renderCalculator() {
  return `
  <section class="section" id="calculator">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Gyors ár- és időbecslés</div>
        <p class="p">Állítsd össze a projektet! Ez csak becslés — pontos ajánlat email-ben jön.</p>
      </div>

      <div class="calc-grid">
        <div class="card card-pad" data-reveal>
          <div class="field">
            <label for="pages">Oldal szám <span class="field-value" id="pagesLabel">4</span></label>
            <input id="pages" type="range" min="1" max="12" value="4" class="slider" />
            <div class="range-labels">
              <span>1 (landing)</span>
              <span>12+ (nagy oldal)</span>
            </div>
          </div>

          <div class="field">
            <label for="type">Típus</label>
            <select id="type" class="calc-select">
              <option value="landing">Landing page</option>
              <option value="corporate" selected>Céges oldal</option>
              <option value="ecommerce">E-commerce / Webshop</option>
              <option value="portal">Portal / App landing</option>
            </select>
          </div>

          <div class="checks">
            <h4 style="margin: 16px 0 12px; font-size: 13px; color: var(--muted); text-transform: uppercase; font-weight: 700;">Extra opciók</h4>
            <label class="check"><input id="opt_seo" type="checkbox" /><span>⭐ Haladó SEO</span></label>
            <label class="check"><input id="opt_copy" type="checkbox" /><span>✍️ Teljes szövegírás</span></label>
            <label class="check"><input id="opt_cms" type="checkbox" /><span>⚙️ CMS / Admin panel</span></label>
            <label class="check"><input id="opt_ecommerce" type="checkbox" /><span>🛒 E-commerce (Stripe/PayPal)</span></label>
          </div>
        </div>

        <div class="calc-result card card-pad" data-reveal>
          <div class="meta">Becslés</div>
          
          <div class="result-item">
            <div class="result-label">Ár</div>
            <div class="result-value" id="priceOut">—</div>
          </div>

          <div class="result-item">
            <div class="result-label">Átfutás</div>
            <div class="result-value" id="timeOut">—</div>
          </div>

          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
            <p style="margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5;">
              💡 Ez egy gyors becslés. A végső ár az összetettségtől, a tartalomtól és az egyéni igénytől függ.
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
    new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 }).format(n);

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
    timeOut.textContent = `${days}–${days + 3} munkanap`;
    if (pagesLabel) pagesLabel.textContent = String(pageCount);
  };

  pages.addEventListener("input", recalc);
  typeSelect?.addEventListener("change", recalc);
  Object.values(opts).forEach((x) => x?.addEventListener("change", recalc));

  explain?.addEventListener("click", () => {
    toast("Árbecslés", "Alap + oldalszám + extra modulok. Pontosítunk brief után.");
  });

  recalc();
}
