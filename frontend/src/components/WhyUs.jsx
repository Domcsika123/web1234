import React from 'react';
import { Target, TrendingUp, Settings, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const WhyUs = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Left Column */}
          <div className="space-y-6" ref={ref}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary mb-8">
              A SZEMLÉLETÜNK
            </h2>

            <div className="space-y-1 mb-8">
              <h3 className="text-xl md:text-2xl font-normal text-secondary leading-tight">
                A legtöbb weboldal elkészül…
              </h3>
              <h3 className="text-xl md:text-2xl font-bold text-brand-primary leading-tight">
                majd nem válik valódi üzleti eszközzé.
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-base md:text-lg text-secondary leading-relaxed">
                <span className="font-semibold">Szép,</span><br />
                de nem támogatja tudatosan az ügyfélszerzést.
              </p>

              <p className="text-base md:text-lg text-secondary leading-relaxed">
                <span className="font-semibold">Megvan,</span><br />
                de nincs összehangolva a vállalkozás céljaival.
              </p>
            </div>

            <p className="text-base md:text-lg text-secondary mb-4">
              Mi is láttuk:
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-secondary flex-shrink-0 mt-1"></div>
                <p className="text-base text-secondary">digitális megoldásokat, amelyek nem illeszkednek a működéshez</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-secondary flex-shrink-0 mt-1"></div>
                <p className="text-base text-secondary">projekteket, ahol a célok nem voltak egyértelműek</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-secondary flex-shrink-0 mt-1"></div>
                <p className="text-base text-secondary">oldalakat, amelyek elkészültek, de nem kaptak irányt a fejlődéshez</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-brand-primary font-bold leading-tight">
              Ezért döntöttünk úgy, hogy stratégiai szemlélettel dolgozunk.
            </p>
          </div>

          {/* Right Column */}
          <div className="bg-page border border-border-medium rounded-xl p-6 md:p-8 space-y-6 h-fit">
            <p className="body-medium text-secondary">
              Minden együttműködést egy egyszerű kérdéssel kezdünk:
            </p>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-primary leading-tight">
              MIT SZERETNÉL ELÉRNI A DIGITÁLIS JELENLÉTEDDEL?
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <p className="body-medium text-brand-primary">Több megkeresést?</p>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <p className="body-medium text-brand-primary">Hatékonyabb értékesítést?</p>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <p className="body-medium text-brand-primary">Kevesebb manuális adminisztrációt?</p>
              </div>
            </div>

            <p className="body-large text-brand-primary font-bold border-t border-border-medium pt-6">
              A válasz határozza meg, mit és hogyan építünk.
            </p>

            <div className="border-t border-border-medium pt-6 space-y-3">
              <p className="body-medium text-secondary">
                Nem klasszikus webfejlesztőként gondolkodunk.
              </p>
              <p className="body-medium text-secondary">
                Digitális partnerként dolgozunk, a stratégiai tervezéstől a megvalósításon át a folyamatos fejlesztésig.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="text-center mb-8">
          <p className="caption text-secondary uppercase tracking-wider">
            SZÁMOK, AMELYEK MÖGÖTT VALÓDI PROJEKTEK ÁLLNAK
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-card border border-border-medium rounded-xl p-6 md:p-8 text-center transition-all duration-300">
            <h3 className="text-4xl md:text-5xl font-black text-brand-primary mb-2">127+</h3>
            <p className="body-medium text-secondary">sikeresen lezárt projekt</p>
          </div>
          <div className="bg-card border-2 border-brand-primary rounded-xl p-6 md:p-8 text-center transition-all duration-300">
            <h3 className="text-4xl md:text-5xl font-black text-brand-primary mb-2">94%</h3>
            <p className="body-medium text-secondary">visszatérő ügyfél</p>
          </div>
          <div className="bg-card border border-border-medium rounded-xl p-6 md:p-8 text-center transition-all duration-300">
            <h3 className="text-4xl md:text-5xl font-black text-brand-primary mb-2">3,2×</h3>
            <p className="body-medium text-secondary">átlagos konverziónövekedés</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
