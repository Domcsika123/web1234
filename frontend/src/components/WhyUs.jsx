import React from 'react';
import { whyUs } from '../mockData';
import { Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const WhyUs = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-page">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20" ref={ref}>
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Miért minket válassz?</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto px-2">
            Nem csak weboldalt készítünk – partnerek vagyunk a sikerben
          </p>
          <div className={`section-divider ${isInView ? 'section-divider-visible' : ''}`}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
          {whyUs.map((item) => (
            <div
              key={item.id}
              className="text-center p-5 md:p-8 rounded-xl border border-border-medium bg-card hover:bg-border-medium transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4 md:mb-6 inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-brand-primary">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-text-inverse" />
              </div>
              <h3 className="heading-5 mb-2 md:mb-3 text-primary text-base md:text-lg">{item.title}</h3>
              <p className="body-small text-secondary text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Image Section with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-border-medium shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
              alt="Modern munkakörnyezet"
              className="w-full h-[200px] md:h-[300px] object-cover"
            />
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="heading-4 text-primary mb-4 md:mb-6 text-lg md:text-xl">Tapasztalat, amiben megbízhatsz</h3>

            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-card border border-border-medium">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-lg md:text-2xl font-black text-brand-primary">50+</span>
              </div>
              <div>
                <h4 className="heading-6 text-primary mb-1 md:mb-2 text-sm md:text-base">Sikeres projekt</h4>
                <p className="body-small text-secondary text-xs md:text-sm">Magyar KKV-k számára készített weboldal</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-card border border-border-medium">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-lg md:text-2xl font-black text-brand-primary">98%</span>
              </div>
              <div>
                <h4 className="heading-6 text-primary mb-1 md:mb-2 text-sm md:text-base">Elégedett ügyfelek</h4>
                <p className="body-small text-secondary text-xs md:text-sm">Ügyfeleink ajánlanák szolgáltatásunkat</p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-card border border-border-medium">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-lg md:text-2xl font-black text-brand-primary">24h</span>
              </div>
              <div>
                <h4 className="heading-6 text-primary mb-1 md:mb-2 text-sm md:text-base">Válaszidő</h4>
                <p className="body-small text-secondary text-xs md:text-sm">Garantált gyors reagálás minden kérdésre</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
