export function renderProcess() {
  return `
  <section class="section" id="process">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="h2">Hogyan dolgozunk</div>
        <p class="p">3–7 nap alatt live. Minden lépés világos, korlátlan revízió, 1 év support.</p>
      </div>

      <div class="process-timeline-vertical" style="margin-top: 48px; display: flex; gap: 40px; position: relative;">
        
        <!-- Left Sidebar with fixed steps -->
        <div class="process-sidebar" style="position: sticky; top: 100px; height: fit-content; width: 120px; flex-shrink: 0;">
          <div class="process-step-indicator" data-step="1">
            <div class="step-number">1</div>
            <div class="step-label">Megbeszélés</div>
          </div>
          <div class="process-step-indicator" data-step="2">
            <div class="step-number">2</div>
            <div class="step-label">Tervezés</div>
          </div>
          <div class="process-step-indicator" data-step="3">
            <div class="step-number">3</div>
            <div class="step-label">Fejlesztés</div>
          </div>
          <div class="process-step-indicator" data-step="4">
            <div class="step-number">4</div>
            <div class="step-label">Közzététel</div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="process-content" style="flex: 1; padding: 60px 0;">
          
          <!-- Step 1 -->
          <div class="process-step-content" data-step="1">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 24px;">Igényfelmérés (Discovery Call)</h2>
            <p style="font-size: 18px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
              Üzleti céljaid és célközönséged alapos elemzésével fektetjük le a projekt alapjait. Egy 30 perces konzultáció során meghatározzuk a kulcsfontosságú mérőszámokat (KPI) és a pontos projektütemtervet.
            </p>
            <ul style="font-size: 16px; line-height: 1.8; color: var(--text-secondary); list-style: none; padding: 0;">
              <li style="margin-bottom: 12px;">✓ Üzleti célok és közönség elemzése</li>
              <li style="margin-bottom: 12px;">✓ KPI-k és mérési pontok kijelölése</li>
              <li style="margin-bottom: 12px;">✓ 30 perces stratégiai konzultáció</li>
              <li style="margin-bottom: 12px;">✓ Részletes projektütemterv</li>
            </ul>
          </div>

          <!-- Step 2 -->
          <div class="process-step-content" data-step="2">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 24px;">Tervezés (Design Concept)</h2>
            <p style="font-size: 18px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
              Funkcionális drótvázak és egyedi látványtervek mentén alakítjuk ki a weboldal arculatát. 2-3 különböző koncepció közül választhatsz, melyeket visszajelzéseid alapján finomítunk a tökéletes végeredményig.
            </p>
            <ul style="font-size: 16px; line-height: 1.8; color: var(--text-secondary); list-style: none; padding: 0;">
              <li style="margin-bottom: 12px;">✓ Wireframe-ek és funkcionális tervek</li>
              <li style="margin-bottom: 12px;">✓ 2-3 látványterv opció</li>
              <li style="margin-bottom: 12px;">✓ Vizuális arculat (színek, tipó)</li>
              <li style="margin-bottom: 12px;">✓ Iteráció visszajelzéseid alapján</li>
            </ul>
          </div>

          <!-- Step 3 -->
          <div class="process-step-content" data-step="3">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 24px;">Fejlesztés (Development)</h2>
            <p style="font-size: 18px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
              Tiszta, szemantikus kódolás és teljesítmény-központú fejlesztés modern technológiákkal. Biztosítjuk a reszponzív megjelenést minden eszközön, valamint a böngészőfüggetlen, villámgyors működést.
            </p>
            <ul style="font-size: 16px; line-height: 1.8; color: var(--text-secondary); list-style: none; padding: 0;">
              <li style="margin-bottom: 12px;">✓ Modern tech (TypeScript, modern CSS)</li>
              <li style="margin-bottom: 12px;">✓ Reszponzív megjelenés minden eszközön</li>
              <li style="margin-bottom: 12px;">✓ Performance-first megközelítés</li>
              <li style="margin-bottom: 12px;">✓ Cross-browser stabilitás</li>
            </ul>
          </div>

          <!-- Step 4 -->
          <div class="process-step-content" data-step="4">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 24px;">Közzététel (Launch & Support)</h2>
            <p style="font-size: 18px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 24px;">
              Alapos tesztelés után konfiguráljuk a szerverkörnyezetet és élesítjük a rendszert. Beállítjuk az analitikai eszközöket, és egy évig teljes körű technikai támogatást nyújtunk a zavartalan üzemeltetéshez.
            </p>
            <ul style="font-size: 16px; line-height: 1.8; color: var(--text-secondary); list-style: none; padding: 0;">
              <li style="margin-bottom: 12px;">✓ Alapos tesztelés</li>
              <li style="margin-bottom: 12px;">✓ Deploy, DNS/SSL konfigurálás</li>
              <li style="margin-bottom: 12px;">✓ Analitikai eszközök beállítása</li>
              <li style="margin-bottom: 12px;">✓ 1 év teljes körű support</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </section>
  `;
}
