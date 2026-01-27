import React from 'react';
import { X } from 'lucide-react';

const PrivacyPolicy = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border-medium rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border-medium p-6 flex justify-between items-center">
          <h2 className="heading-3 text-primary">Adatvédelmi nyilatkozat</h2>
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
            <p className="body-medium text-secondary">
              Az AuraCode (a továbbiakban: Szolgáltató) elkötelezett a felhasználók személyes adatainak védelme iránt. 
              Jelen adatvédelmi tájékoztató célja, hogy ismertesse a Szolgáltató által kezelt személyes adatok körét, 
              az adatkezelés célját, jogalapját, időtartamát, valamint a felhasználók adatkezeléssel kapcsolatos jogait.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">2. Az adatkezelő adatai</h3>
            <div className="body-medium text-secondary space-y-1">
              <p><strong>Név:</strong> AuraCode</p>
              <p><strong>E-mail:</strong> websitemuhely@gmail.com</p>
              <p><strong>Székhely:</strong> Budapest, Magyarország</p>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">3. Kezelt adatok köre és célja</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="heading-6 text-primary mb-2">3.1. Kapcsolatfelvételi űrlap</h4>
                <p className="body-medium text-secondary mb-2">
                  <strong>Kezelt adatok:</strong> név, e-mail cím, telefonszám, költségkeret, üzenet tartalma
                </p>
                <p className="body-medium text-secondary mb-2">
                  <strong>Cél:</strong> Kapcsolatfelvétel, ajánlatkérés kezelése, ügyfélszolgálat biztosítása
                </p>
                <p className="body-medium text-secondary">
                  <strong>Jogalap:</strong> Az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont)
                </p>
              </div>

              <div>
                <h4 className="heading-6 text-primary mb-2">3.2. Weboldal használata</h4>
                <p className="body-medium text-secondary mb-2">
                  <strong>Kezelt adatok:</strong> IP cím, böngésző típusa, operációs rendszer, látogatás időpontja
                </p>
                <p className="body-medium text-secondary mb-2">
                  <strong>Cél:</strong> Weboldal működésének biztosítása, statisztikák készítése
                </p>
                <p className="body-medium text-secondary">
                  <strong>Jogalap:</strong> A Szolgáltató jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">4. Adatkezelés időtartama</h3>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li>Kapcsolatfelvételi adatok: Az ajánlat elkészítéséig, vagy az érintett törlési kérelméig, de maximum 2 év</li>
              <li>Szerződéses adatok: A szerződés teljesítését követően 5 év (számviteli kötelezettség miatt)</li>
              <li>Technikai adatok: 90 nap</li>
            </ul>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">5. Adattovábbítás, adatfeldolgozók</h3>
            <p className="body-medium text-secondary mb-3">
              A Szolgáltató a következő adatfeldolgozókat veszi igénybe:
            </p>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li><strong>Formspree:</strong> Kapcsolatfelvételi űrlap kezelése (székhelye: USA)</li>
              <li><strong>Tárhely szolgáltató:</strong> Weboldal üzemeltetése</li>
            </ul>
            <p className="body-medium text-secondary mt-3">
              A Szolgáltató harmadik országba történő adattovábbítás esetén gondoskodik a megfelelő garanciák meglétéről.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">6. Az érintettek jogai</h3>
            <p className="body-medium text-secondary mb-3">
              Az érintettek a következő jogokkal rendelkeznek:
            </p>
            <ul className="list-disc list-inside body-medium text-secondary space-y-2">
              <li><strong>Hozzáférés joga:</strong> Tájékoztatás kérése a kezelt személyes adatokról</li>
              <li><strong>Helyesbítés joga:</strong> Pontatlan adatok helyesbítésének kérése</li>
              <li><strong>Törlés joga:</strong> A "elfeledtetéshez való jog" gyakorlása</li>
              <li><strong>Korlátozás joga:</strong> Az adatkezelés korlátozásának kérése</li>
              <li><strong>Tiltakozás joga:</strong> Tiltakozás a jogos érdeken alapuló adatkezelés ellen</li>
              <li><strong>Adathordozhatóság joga:</strong> Adatok strukturált, géppel olvasható formátumban történő kérése</li>
              <li><strong>Hozzájárulás visszavonása:</strong> A hozzájárulás bármikor visszavonható</li>
            </ul>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">7. Jogorvoslat</h3>
            <p className="body-medium text-secondary mb-3">
              Panasz esetén az érintett a következő hatósághoz fordulhat:
            </p>
            <div className="body-medium text-secondary space-y-1">
              <p><strong>Nemzeti Adatvédelmi és Információszabadság Hatóság</strong></p>
              <p>Székhely: 1055 Budapest, Falk Miksa utca 9-11.</p>
              <p>Levelezési cím: 1363 Budapest, Pf. 9.</p>
              <p>Telefon: +36-1-391-1400</p>
              <p>E-mail: ugyfelszolgalat@naih.hu</p>
              <p>Honlap: www.naih.hu</p>
            </div>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">8. Adatbiztonság</h3>
            <p className="body-medium text-secondary">
              A Szolgáltató a személyes adatok biztonságát korszerű technikai és szervezési intézkedésekkel védi. 
              Az adatokat titkosított kapcsolaton keresztül továbbítjuk, és biztonságos szervereken tároljuk. 
              Hozzáférés csak korlátozott számú, arra jogosult személy részére biztosított.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">9. Cookie-k (sütik) használata</h3>
            <p className="body-medium text-secondary">
              A weboldal működéséhez szükséges sütiket használ. Ezek a sütik biztosítják a weboldal megfelelő működését, 
              és nem tárolnak személyes adatokat. Elemző célú sütiket csak az érintett kifejezett hozzájárulásával használunk.
            </p>
          </section>

          <section>
            <h3 className="heading-5 text-primary mb-3">10. Módosítások</h3>
            <p className="body-medium text-secondary">
              A Szolgáltató fenntartja a jogot jelen adatvédelmi tájékoztató módosítására. A módosításokról 
              a weboldalon történő közzététellel értesítjük a felhasználókat.
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

export default PrivacyPolicy;
