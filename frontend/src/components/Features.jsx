import React, { useRef, useState } from 'react';
import { features } from '../mockData';
import { Zap, Search, Smartphone, BarChart3, Shield, Wrench, Gauge, Target, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const iconMap = {
  1: Zap,
  2: Search,
  3: Smartphone,
  4: BarChart3,
  5: Shield,
  6: Wrench,
  7: Gauge,
  8: Target
};

const Features = () => {
  const [ref, isInView] = useInView();
  const swiperRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const restartAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    if (swiperRef.current?.swiper.autoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        swiperRef.current?.swiper.autoplay.start();
        setIsPlaying(true);
      }, 500);
    }
  };

  const handleNavigation = (direction) => {
    if (swiperRef.current?.swiper.autoplay) {
      swiperRef.current.swiper.autoplay.stop();
    }

    if (direction === 'prev') {
      swiperRef.current?.swiper.slidePrev();
    } else {
      swiperRef.current?.swiper.slideNext();
    }

    restartAutoplay();
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      swiperRef.current?.swiper.autoplay.stop();
      setIsPlaying(false);
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    } else {
      swiperRef.current?.swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-page">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20" ref={ref}>
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Amit kapsz tőlünk</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto px-2">
            Nem csak egy weboldalt, hanem egy működő ügyfélszerző rendszert – minden fontos elemmel
          </p>
          <div className={`section-divider ${isInView ? 'section-divider-visible' : ''}`}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Swiper
            ref={swiperRef}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={false}
            navigation={false}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="features-swiper"
          >
            {features.map((feature) => {
              const Icon = iconMap[feature.id];
              return (
                <SwiperSlide key={feature.id} className="swiper-slide-custom">
                  <div className="feature-card-3d h-full p-6 md:p-8 rounded-2xl border-2 border-brand-primary bg-[#2a2a2a] transition-all duration-300">
                    <div className="mb-4 md:mb-6 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-brand-primary/10">
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-brand-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-brand-primary">{feature.title}</h3>
                    <p className="body-small text-secondary">{feature.description}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-8 flex gap-4 z-10">
            <button
              onClick={() => handleNavigation('prev')}
              className="p-3 rounded-full border-2 border-brand-primary hover:bg-brand-primary/10 transition-all duration-300 flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-brand-primary" />
            </button>

            <button
              onClick={toggleAutoplay}
              className="p-3 rounded-full border-2 border-brand-primary hover:bg-brand-primary/10 transition-all duration-300 flex items-center justify-center"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-brand-primary" />
              ) : (
                <Play className="w-6 h-6 text-brand-primary" />
              )}
            </button>

            <button
              onClick={() => handleNavigation('next')}
              className="p-3 rounded-full border-2 border-brand-primary hover:bg-brand-primary/10 transition-all duration-300 flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-brand-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
