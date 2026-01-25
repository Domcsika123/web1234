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
              const isLast = index === process.length - 1;

              return (
                <div key={step.id} className="relative">
                  {/* Connecting line - only show on lg screens */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-16 left-[calc(50%+50px)] w-[calc(100%-50px)] h-0.5 bg-gradient-to-r from-brand-primary/50 to-border-medium z-0"></div>
                  )}

                  {/* Card */}
                  <div className="relative z-10 group">
                    {/* Number badge */}
                    <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 z-20">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg md:text-xl font-black text-text-inverse">{step.step}</span>
                      </div>
                    </div>

                    {/* Icon circle */}
                    <div className="flex justify-center mb-4 md:mb-6">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-secondary-olive to-border-medium flex items-center justify-center border-4 border-card group-hover:border-brand-primary transition-all duration-300 group-hover:scale-105">
                        <Icon className="w-10 h-10 md:w-14 md:h-14 text-brand-primary" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="bg-page rounded-xl p-4 md:p-6 border border-border-medium group-hover:border-brand-primary transition-all duration-300 min-h-[180px] md:min-h-[200px] flex flex-col">
                      <h3 className="heading-6 mb-2 md:mb-3 text-primary text-center">{step.title}</h3>
                      <p className="body-small text-secondary text-center flex-1">{step.description}</p>

                      {/* Progress indicator */}
                      <div className="mt-4 pt-4 border-t border-border-medium">
                        <div className="w-full bg-border-medium rounded-full h-1.5">
                          <div
                            className="bg-brand-primary h-1.5 rounded-full transition-all duration-500 group-hover:w-full"
                            style={{ width: `${(index + 1) * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom summary */}
          <div className="mt-10 md:mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-4 rounded-2xl sm:rounded-full bg-brand-primary/10 border border-brand-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="caption text-primary text-xs sm:text-sm">2-4 hét átfutási idő</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border-medium"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="caption text-primary text-xs sm:text-sm">5 egyértelmű lépés</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border-medium"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="caption text-primary text-xs sm:text-sm">30 napos garancia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
