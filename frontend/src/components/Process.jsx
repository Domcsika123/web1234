import React from 'react';
import { process } from '../mockData';
import { ClipboardList, Layers, Code, Rocket, Headphones } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const iconMap = {
  1: ClipboardList,
  2: Layers,
  3: Code,
  4: Rocket,
  5: Headphones
};

const Process = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-card relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20" ref={ref}>
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Hogyan dolgozunk</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto px-2">
            Átlátható, gyors, kiszámítható folyamat – mindig tudod, hol tartunk
          </p>
          <div className={`section-divider ${isInView ? 'section-divider-visible' : ''}`}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {process.map((step, index) => {
              const Icon = iconMap[step.id];

              return (
                <div key={step.id} className="relative flex flex-col">
                  {/* Number badge */}
                  <div className="flex justify-center mb-4">
                    <span className="text-2xl font-black text-brand-primary">{step.step}</span>
                  </div>

                  {/* Icon circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-secondary-olive flex items-center justify-center group-hover:border-brand-primary transition-all duration-300">
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-brand-primary" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="bg-transparent rounded-lg border border-border-medium p-4 md:p-6 flex-1 flex flex-col">
                    <h3 className="heading-5 mb-2 text-brand-primary text-center">{step.title}</h3>
                    <p className="body-small text-secondary text-center flex-1">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom summary */}
          <div className="mt-10 md:mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 px-6 md:px-12 py-4 rounded-full bg-transparent border border-brand-primary">
              <span className="caption text-brand-primary text-sm font-bold">3–6 HÉT</span>
              <div className="hidden sm:block w-px h-6 bg-border-medium"></div>
              <span className="caption text-brand-primary text-sm font-bold">FIX ÁR</span>
              <div className="hidden sm:block w-px h-6 bg-border-medium"></div>
              <span className="caption text-brand-primary text-sm font-bold">EREDMÉNYGARANCIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
