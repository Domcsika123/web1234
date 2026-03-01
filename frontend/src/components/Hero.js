import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Zap,
  Search,
  Smartphone,
  Cog,
} from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0.25, 0.8], [1, 0]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
      data-testid="hero-section"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF00] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-display font-bold leading-tight mb-6"
                data-testid="hero-headline"
              >
                Digitális jelenlét{' '}
                <span className="gradient-text">vállalkozásod</span>{' '}
                növekedéséhez
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg lg:text-xl text-[#A1A1AA] mb-10 max-w-xl"
                data-testid="hero-subtitle"
              >
                Prémium weboldalak kis- és középvállalkozások részére.
                Modern, SEO-optimalizált honlapok 1-4 hét alatt, fix áron.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="hero-cta-primary"
                >
                  Ingyenes konzultáció
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection('#portfolio')}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="hero-cta-secondary"
                >
                  Referenciák megtekintése
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 flex flex-wrap gap-6 text-sm text-[#52525B]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FF00] rounded-full" />
                  <span>30 napos garancia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FF00] rounded-full" />
                  <span>Fix áras projektek</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FF00] rounded-full" />
                  <span>Ingyenes konzultáció</span>
                </div>
              </motion.div>
            </div>

            {/* 3D Element */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* 3D Rotating Cube */}
                <div className="cube-container">
                  <div className="cube">
                    <div className="cube-face cube-face-front">
                      <AuraCodeLogo className="w-20 h-20" glowEffect={true} />
                    </div>
                    <div className="cube-face cube-face-back">
                      <TrendingUp className="w-12 h-12 text-[#00FF00]" strokeWidth={1.75} />
                    </div>
                    <div className="cube-face cube-face-right">
                      <Zap className="w-12 h-12 text-[#00FF00]" strokeWidth={1.75} />
                    </div>
                    <div className="cube-face cube-face-left">
                      <Search className="w-12 h-12 text-[#00FF00]" strokeWidth={1.75} />
                    </div>
                    <div className="cube-face cube-face-top">
                      <Smartphone className="w-12 h-12 text-[#00FF00]" strokeWidth={1.75} />
                    </div>
                    <div className="cube-face cube-face-bottom">
                      <Cog className="w-12 h-12 text-[#00FF00]" strokeWidth={1.75} />
                    </div>
                  </div>
                </div>

                {/* Glowing rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="w-[350px] h-[350px] border border-[#00FF00]/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute w-[400px] h-[400px] border border-[#00F0FF]/10 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        data-testid="scroll-indicator"
      >
        <motion.button
          onClick={() => scrollToSection('#approach')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#52525B] hover:text-[#00FF00] transition-colors"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};
