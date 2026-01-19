type CaseStudy = {
  title: string;
  tag?: string;
  result?: string;
  summary?: string;
  bullets?: string[];
  stack?: string[];
};

let modalEl: HTMLDivElement | null = null;

export function initCaseStudy() {
  if (modalEl) return;

  modalEl = document.createElement("div");
  modalEl.className = "cs-modal";
  modalEl.setAttribute("aria-hidden", "true");
  modalEl.innerHTML = `
    <div class="cs-backdrop" data-cs-close></div>
    <div class="cs-panel" role="dialog" aria-modal="true" aria-label="Esettanulmány">
      <div class="cs-head">
        <div>
          <div class="cs-kicker" id="csKicker"></div>
          <div class="cs-title" id="csTitle"></div>
          <div class="cs-sub" id="csSub"></div>
        </div>
      </div>

      <div class="cs-body">
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);

  modalEl.querySelectorAll<HTMLElement>("[data-cs-close]").forEach((x) =>
    x.addEventListener("click", closeCaseStudy)
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCaseStudy();
  });
}

export function openCaseStudy(data: CaseStudy) {
  initCaseStudy();
  if (!modalEl) return;

  const kicker = modalEl.querySelector<HTMLElement>("#csKicker")!;
  const title = modalEl.querySelector<HTMLElement>("#csTitle")!;
  const sub = modalEl.querySelector<HTMLElement>("#csSub")!;
  const summary = modalEl.querySelector<HTMLElement>("#csSummary")!;
  const bullets = modalEl.querySelector<HTMLUListElement>("#csBullets")!;
  const stack = modalEl.querySelector<HTMLDivElement>("#csStack")!;

  kicker.textContent = [data.tag, data.result ? `📈 ${data.result}` : ""].filter(Boolean).join(" • ");
  title.textContent = data.title;
  sub.textContent = "Esettanulmány nézet — prémium prezentáció (demo)";

  summary.textContent =
    data.summary ??
    "Itt lesz majd a projekt sztori: cél, megoldás, mérés. Most demo, de a struktúra már esettanulmány-szint.";

  const b = data.bullets ?? [
    "Üzenet & CTA struktúra újratervezés",
    "Premium UI tipó + spacing rendszer",
    "Sebesség és konverziós útvonalak finomítása",
  ];
  bullets.innerHTML = b.map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const s = data.stack ?? ["Vite", "TypeScript", "Modern UI", "Performance"];
  stack.innerHTML = s.map((x) => `<span class="cs-tag">${escapeHtml(x)}</span>`).join("");

  modalEl.classList.add("is-open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

export function closeCaseStudy() {
  if (!modalEl) return;
  modalEl.classList.remove("is-open");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}
