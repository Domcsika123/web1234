import React from 'react';
import { caseStudies } from '../mockData';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const CaseStudies = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="case-studies" className="py-16 md:py-32 px-4 md:px-8 bg-page">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Referenciák</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto px-2">
            Valós projektek, mérhető eredményekkel – ilyen oldalakat készítünk
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-2 sm:px-12 md:px-20">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-primary hover:bg-brand-hover transition-all flex items-center justify-center shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-text-inverse" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-primary hover:bg-brand-hover transition-all flex items-center justify-center shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-text-inverse" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-1" ref={emblaRef}>
            <div className="flex -mx-2 md:-mx-4">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 md:px-4"
                >
                  <div className="event-card-style overflow-hidden rounded-xl border border-border-medium hover:border-brand-primary transition-all duration-300 group h-full flex flex-col">
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.client}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-olive/90 to-transparent"></div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                        <span className="inline-block px-2 md:px-3 py-1 rounded-full bg-brand-primary text-text-inverse caption font-semibold text-xs">
                          {study.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-8 bg-card flex-1 flex flex-col">
                      <h3 className="heading-5 mb-3 md:mb-4 text-primary text-base md:text-lg">{study.client}</h3>
                      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 flex-1">
                        <div>
                          <span className="caption text-secondary text-xs">KIHÍVÁS</span>
                          <p className="body-small text-primary mt-1 text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <span className="caption text-secondary text-xs">MEGOLDÁS</span>
                          <p className="body-small text-primary mt-1 text-sm">{study.solution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 md:p-4 rounded-lg bg-brand-primary/10 border border-brand-primary/20">
                        <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-brand-primary flex-shrink-0" />
                        <span className="button-text text-brand-primary text-xs md:text-sm">{study.result}</span>
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
