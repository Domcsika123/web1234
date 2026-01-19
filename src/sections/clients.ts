export function renderClients() {
  return `
  <section class="section" aria-label="Bizalom" data-reveal>
    <div class="container">
      <div class="section-head">
        <div class="h2">Professzionális impression az első pillanattól</div>
        <p class="p">
          Nem sablon, nem "szépítés". Olyan dizájnkat csinálunk, ami azonnal prémium benyomást kelt,
          és irányítja az látogatókat a konverzióhoz.
        </p>
      </div>

      <div class="grid" style="grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:22px;">
        ${proof("⚡", "Sebesség", "Gyors betöltés + jó Core Web Vitals — nem csak ígéret, alap.")}
        ${proof("🎯", "Konverzió", "Tiszta útvonalak, CTA-k, és mérésre felkészített oldal.")}
        ${proof("🛡️", "Bizalom", "Tipográfia, spacing, “enterprise” UI érzet — nem sablon.")}
      </div>

      <div class="logos" style="margin-top:22px;">
        <div class="logo-box">LOGO</div>
        <div class="logo-box">LOGO</div>
        <div class="logo-box">LOGO</div>
        <div class="logo-box">LOGO</div>
        <div class="logo-box">LOGO</div>
        <div class="logo-box">LOGO</div>
      </div>
    </div>
  </section>
  `;
}

function proof(icon: string, title: string, text: string) {
  return `
  <div class="card card-pad" data-reveal>
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="font-size:18px">${icon}</div>
      <div style="font-weight:950">${title}</div>
    </div>
    <p class="item-text" style="margin-top:10px">${text}</p>
  </div>
  `;
}
