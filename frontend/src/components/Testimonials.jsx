import React from 'react';
import { testimonials } from '../mockData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react'; import { useInView } from '../hooks/useInView';
const Testimonials = () => {
  const [ref, isInView] = useInView();
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
    <section className="py-16 md:py-32 px-4 md:px-8 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20" ref={ref}>
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Ügyfeleink mondják</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto px-2">
            Valós visszajelzések magyar vállalkozóktól
          </p>
          <div className={`section-divider ${isInView ? 'section-divider-visible' : ''}`}></div>
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
            <div className="flex -mx-2 md:-mx-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 md:px-3"
                >
                  <div className="team-card p-5 md:p-8 rounded-xl border border-border-medium hover:bg-border-medium transition-all duration-300 h-full flex flex-col">
                    <Quote className="h-8 w-8 md:h-10 md:w-10 text-brand-primary mb-4 md:mb-6" />
                    <p className="body-medium text-primary mb-4 md:mb-6 italic text-sm md:text-base flex-1">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-base md:text-lg text-brand-primary">★</span>
                      ))}
                    </div>
                    <div>
                      <p className="button-text text-primary text-sm md:text-base">{testimonial.name.split(' ')[1] || testimonial.name.split(' ')[0]}</p>
                      <p className="caption text-secondary text-xs md:text-sm uppercase">{testimonial.company}</p>
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

export default Testimonials;
