import "./style.css";

import { initScrollProgress } from "./components/scrollProgress";
import { initBeforeAfter } from "./components/beforeAfter";
import { initCaseStudy } from "./components/caseStudy";

import { initNav, renderNav } from "./components/nav";
import { renderFooter } from "./components/footer";

import { initReveal } from "./lib/animate";
import { initTheme } from "./lib/theme";
import { initModal } from "./components/modal";
import { initToast } from "./components/toast";
import { initCounters } from "./components/counter";

import { renderHero } from "./sections/hero";
import { renderClients } from "./sections/clients";
import { renderServices } from "./sections/services";
import { renderProcess } from "./sections/process";
import { initPortfolio, renderPortfolio } from "./sections/portfolio";
import { initCalculator, renderCalculator } from "./sections/calculator";
import { initTestimonials, renderTestimonials } from "./sections/testimonials";
import { initFaq, renderFaq } from "./sections/faq";
import { initContact, renderContact } from "./sections/contact";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app not found");

app.innerHTML = `
  ${renderNav()}
  <main>
    ${renderHero()}
    ${renderClients()}
    ${renderServices()}
    ${renderProcess()}
    ${renderPortfolio()}
    ${renderCalculator()}
    ${renderTestimonials()}
    ${renderFaq()}
    ${renderContact()}
  </main>
  ${renderFooter()}
`;

// init (DOM után)
initToast();
initTheme();
initNav();
initModal();
initReveal();
initCounters();

initPortfolio();
initCalculator();
initTestimonials();
initFaq();
initContact();

initScrollProgress();
initBeforeAfter();
initCaseStudy();