import React from 'react';
import { caseStudies } from '../mockData';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const CaseStudies = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="case-studies" className="py-32 px-8 bg-page">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Referenciák</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Valós projektek, mérhető eredményekkel – ilyen oldalakat készítünk
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-hover transition-all flex items-center justify-center shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-text-inverse" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-hover transition-all flex items-center justify-center shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-text-inverse" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-22px)]"
                >
                  <div className="event-card-style overflow-hidden rounded-xl border border-border-medium hover:border-brand-primary transition-all duration-300 group h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.client}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-olive/90 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-primary text-text-inverse caption font-semibold">
                          {study.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 bg-card flex-1 flex flex-col">
                      <h3 className="heading-5 mb-4 text-primary">{study.client}</h3>
                      <div className="space-y-3 mb-6 flex-1">
                        <div>
                          <span className="caption text-secondary">KIHÍVÁS</span>
                          <p className="body-small text-primary mt-1">{study.challenge}</p>
                        </div>
                        <div>
                          <span className="caption text-secondary">MEGOLDÁS</span>
                          <p className="body-small text-primary mt-1">{study.solution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-4 rounded-lg bg-brand-primary/10 border border-brand-primary/20">
                        <TrendingUp className="h-5 w-5 text-brand-primary flex-shrink-0" />
                        <span className="button-text text-brand-primary">{study.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
