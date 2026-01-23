import React from 'react';
import { testimonials } from '../mockData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const Testimonials = () => {
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
    <section className="py-32 px-8 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Ügyfeleink mondják</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Valós visszajelzések magyar vállalkozóktól
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-16">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-hover transition-all flex items-center justify-center shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-text-inverse" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-hover transition-all flex items-center justify-center shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-text-inverse" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" style={{ marginLeft: '-12px', marginRight: '-12px' }}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  style={{ paddingLeft: '12px', paddingRight: '12px' }}
                >
                  <div className="team-card p-8 rounded-xl border border-border-medium hover:bg-border-medium transition-all duration-300 h-full">
                    <Quote className="h-10 w-10 text-brand-primary mb-6" />
                    <p className="body-medium text-primary mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-primary text-brand-primary" />
                      ))}
                    </div>
                    <div>
                      <p className="button-text text-primary">{testimonial.name}</p>
                      <p className="caption text-secondary">{testimonial.company}</p>
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
