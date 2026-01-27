import React from 'react';
import { X } from 'lucide-react';

const TermsOfService = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border-medium rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border-medium p-6 flex justify-between items-center">
          <h2 className="heading-3 text-primary">Általános Szerződési Feltételek (ÁSZF)</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
            aria-label="Bezárás"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <section>
            <h3 className="heading-5 text-primary mb-3">1. Általános rendelkezések</h3>
            <p className="body-medium text-secondary mb-3">
              Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) tartalmazzák az AuraCode 
              (továbbiakban: Szolgáltató) által nyújtott webfejlesztési és kapcsolódó szolgáltatások 
              igénybevételének feltételeit.
            </p>
            <p className="body-medium text-secondary">
              A szolgáltatás igénybevételével az Ügyfél elfogadja jelen ÁSZF-ben foglalt feltételeket.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">2. A Szolgáltató adatai</h3>
            <div className="body-medium text-secondary space-y-1">
              <p><strong>Név:</strong> AuraCode</p>
              <p><strong>E-mail:</strong> websitemuhely@gmail.com</p>
              <p><strong>Székhely:</strong> Budapest, Magyarország</p>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">3. Szolgáltatások</h3>
            <p className="body-medium text-secondary mb-3">
              A Szolgáltató az alábbi szolgáltatásokat nyújtja:
            </p>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li>Egyedi weboldal tervezés és fejlesztés</li>
              <li>Reszponzív (mobilbarát) kialakítás</li>
              <li>SEO optimalizálás</li>
              <li>Weboldal karbantartás és frissítés</li>
              <li>Teljesítmény optimalizálás</li>
              <li>Domain és tárhely beállítás segítése</li>
            </ul>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">4. Megrendelési folyamat</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">4.1. Ajánlatkérés</h4>
                <p className="body-medium text-secondary">
                  Az Ügyfél a weboldalon található űrlap kitöltésével, e-mailben vagy telefonon kérhet ajánlatot. 
                  Az ajánlatkérés nem jelent szerződéses kötelezettséget.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">4.2. Ajánlat</h4>
                <p className="body-medium text-secondary">
                  A Szolgáltató az ajánlatkérés beérkezésétől számított 3-5 munkanapon belül egyedi ajánlatot küld, 
                  amely tartalmazza a szolgáltatás részletes leírását, az árat és a teljesítési határidőt.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">4.3. Szerződéskötés</h4>
                <p className="body-medium text-secondary">
                  A szerződés az ajánlat Ügyfél általi írásbeli elfogadásával és az előleg befizetésével jön létre.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">5. Árak és fizetési feltételek</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">5.1. Árak</h4>
                <p className="body-medium text-secondary">
                  Az árak egyedi kalkuláció alapján kerülnek meghatározásra a projekt komplexitásától függően. 
                  Az ajánlatban szereplő árak magyar forintban (HUF) értendők és tartalmazzák az ÁFA-t.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">5.2. Fizetési ütemezés</h4>
                <ul className="list-disc list-inside body-medium text-secondary space-y-2">
                  <li>Előleg: A teljes összeg 50%-a a szerződéskötéskor</li>
                  <li>Közbenső részlet: 30% a fejlesztés közbenső mérföldkövénél (ha szükséges)</li>
                  <li>Végelszámolás: 50% a projekt átadásakor (kisebb projekteknél) vagy 20% nagyobb projekteknél</li>
                </ul>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">5.3. Fizetési módok</h4>
                <p className="body-medium text-secondary">
                  Banki átutalás, azonnali banki átutalás, online bankkártyás fizetés.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">5.4. Késedelmes fizetés</h4>
                <p className="body-medium text-secondary">
                  Késedelmes fizetés esetén a Szolgáltató jogosult a munkát felfüggeszteni és a Ptk. szerinti 
                  késedelmi kamatot felszámítani.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">6. Teljesítési határidő</h3>
            <p className="body-medium text-secondary mb-3">
              A teljesítési határidőt az egyedi ajánlat tartalmazza. A határidő akkor kezdődik, amikor:
            </p>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li>Az előleg beérkezett a Szolgáltató számlájára</li>
              <li>Az Ügyfél minden szükséges tartalmat és anyagot átadott</li>
              <li>A projekt részletei véglegesítésre kerültek</li>
            </ul>
            <p className="body-medium text-secondary mt-3">
              Az Ügyfél általi késedelmes anyagátadás vagy döntéshozatal esetén a határidő arányosan meghosszabbodik.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">7. Az Ügyfél kötelezettségei</h3>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li>Időben biztosítja a szükséges tartalmakat, logókat, képeket és egyéb anyagokat</li>
              <li>Egyértelmű és részletes visszajelzéseket ad a munka során</li>
              <li>Biztosítja, hogy a rendelkezésre bocsátott anyagok nem sértik harmadik felek jogait</li>
              <li>Időben fizeti a megállapított díjakat</li>
            </ul>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">8. Szerzői jogok</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">8.1. Tulajdonjog</h4>
                <p className="body-medium text-secondary">
                  A kész weboldal forráskódja és design elemei a teljes vételár kiegyenlítését követően 
                  az Ügyfél tulajdonába kerülnek. Addig a Szolgáltató tulajdona.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">8.2. Portfólió használat</h4>
                <p className="body-medium text-secondary">
                  A Szolgáltató jogosult a létrehozott weboldalt portfóliójában bemutatni és 
                  marketingcélokra felhasználni, kivéve, ha az Ügyfél ezt írásban megtiltja.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">8.3. Harmadik féltől származó elemek</h4>
                <p className="body-medium text-secondary">
                  A weboldalon használt stock fotók, ikonok, betűtípusok és egyéb harmadik féltől származó 
                  elemek licencei az Ügyfelet terhelik. A Szolgáltató segít a megfelelő licencek beszerzésében.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">9. Módosítások és kiegészítések</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">9.1. Ingyenes módosítások</h4>
                <p className="body-medium text-secondary">
                  A fejlesztési folyamat során legfeljebb 3 körös visszajelzés és módosítás díjmentesen biztosított. 
                  A módosítási kéréseket írásban kell megadni.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">9.2. További módosítások</h4>
                <p className="body-medium text-secondary">
                  A harmadik kör utáni módosítások vagy a projekt lényeges átalakítása külön megállapodás és 
                  díjazás alapján történik.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">9.3. Átadás utáni módosítások</h4>
                <p className="body-medium text-secondary">
                  Az átadást követő módosítások óradíjas alapon vagy karbantartási csomagok keretében igényelhetők.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">10. Garancia és karbantartás</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">10.1. Garancia</h4>
                <p className="body-medium text-secondary">
                  A Szolgáltató 30 napos garanciát vállal az átadástól számítva a programhibák javítására. 
                  Ez nem vonatkozik az Ügyfél vagy harmadik fél által okozott hibákra.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">10.2. Karbantartás</h4>
                <p className="body-medium text-secondary">
                  A rendszeres karbantartás, frissítések és támogatás külön megállapodás alapján vehető igénybe.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">11. Felelősség korlátozása</h3>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li>A Szolgáltató nem felel az Ügyfél által szolgáltatott tartalmak jogszerűségéért</li>
              <li>Nem felel harmadik felek (pl. tárhely szolgáltató) működési zavaraiért</li>
              <li>Nem felel az Ügyfél által telepített harmadik féltől származó kódok hibáiért</li>
              <li>Kártérítési felelőssége a szerződés értékére korlátozódik</li>
            </ul>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">12. Szerződés megszüntetése</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">12.1. Közös megegyezéssel</h4>
                <p className="body-medium text-secondary">
                  A szerződés bármikor megszüntethető közös megegyezéssel. Ebben az esetben az addig elvégzett 
                  munkát ki kell fizetni.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">12.2. Ügyfél általi felmondás</h4>
                <p className="body-medium text-secondary">
                  Az Ügyfél írásban felmondhatja a szerződést. Az előleg nem kerül visszatérítésre, 
                  és az addig végzett munka után teljes díjat kell fizetni.
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">12.3. Szolgáltató általi felmondás</h4>
                <p className="body-medium text-secondary">
                  Szolgáltató azonnali hatállyal felmondhatja a szerződést, ha az Ügyfél fizetési 
                  kötelezettségének 30 napon túl nem tesz eleget.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">13. Egyéb rendelkezések</h3>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li>A felek közötti kommunikáció e-mailben vagy telefonon történik</li>
              <li>A szerződésre a magyar jog az irányadó</li>
              <li>Vitás esetben a felek elsősorban békés megegyezésre törekszenek</li>
              <li>Megegyezés hiányában a Pesti Központi Kerületi Bíróság illetékes</li>
            </ul>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">14. Hatálybalépés</h3>
            <p className="body-medium text-secondary">
              Jelen ÁSZF {new Date().toLocaleDateString('hu-HU')} napján lép hatályba, és visszavonásig érvényes.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">15. Módosítás joga</h3>
            <p className="body-medium text-secondary">
              A Szolgáltató fenntartja a jogot az ÁSZF egyoldalú módosítására. A módosításokról a weboldalon 
              történő közzététellel értesíti az ügyfeleket. A folyamatban lévő projektekre a szerződéskötéskor 
              hatályos ÁSZF az irányadó.
            </p>
          </section>

          <section>
            <p className="body-small text-secondary italic">
              Utolsó frissítés: {new Date().toLocaleDateString('hu-HU')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
