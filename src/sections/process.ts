import { t, ta } from "../lib/i18n";

type Step = { label: string };
type StepDetail = { title: string; text: string; bullets: string[] };

export function renderProcess() {
  const steps = ta<Step[]>("process.steps");
  const details = ta<StepDetail[]>("process.details");

  return `
  <section class="section" id="process">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">${t("process.title")}</div>
        <p class="p">${t("process.subtitle")}</p>
      </div>

      <div class="process-timeline-vertical" style="margin-top: 48px; display: flex; gap: 40px; position: relative;">
        
        <!-- Left Sidebar with fixed steps -->
        <div class="process-sidebar" style="position: sticky; top: 100px; height: fit-content; width: 120px; flex-shrink: 0;">
          ${steps
            .map(
              (step, index) => `
            <div class="process-step-indicator" data-step="${index + 1}">
              <div class="step-number">${index + 1}</div>
              <div class="step-label">${step.label}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Right Content -->
        <div class="process-content" style="flex: 1; padding: 60px 0;">
          ${details
            .map(
              (detail, index) => `
          <div class="process-step-content" data-step="${index + 1}">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 24px;">${detail.title}</h2>
            <p style="font-size: 18px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
              ${detail.text}
            </p>
            <ul style="font-size: 16px; line-height: 1.8; color: var(--text-secondary); list-style: none; padding: 0;">
              ${detail.bullets.map((b) => `<li style="margin-bottom: 12px;">${b}</li>`).join("")}
            </ul>
          </div>
          `
            )
            .join("")}

        </div>
      </div>
    </div>
  </section>
  `;
}
