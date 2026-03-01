import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-sm text-[#00FF00] mb-6 tracking-wider"
                data-testid="hero-label"
              >
                // WEBFEJLESZTÉS & DESIGN
              </motion.div>

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
                className="relative w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]"
              >
                {/* Outer rotating ring with dots */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-full border border-[#00FF00]/20" />
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#00FF00] rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 45}deg) translateX(160px) translateY(-50%)`,
                      }}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.25 
                      }}
                    />
                  ))}
                </motion.div>

                {/* Middle pulsing hexagon */}
                <motion.div
                  className="absolute inset-[15%]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <motion.polygon
                      points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                      fill="none"
                      stroke="#00FF00"
                      strokeWidth="0.5"
                      animate={{ 
                        strokeOpacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </svg>
                </motion.div>

                {/* Inner hexagon with glow */}
                <motion.div
                  className="absolute inset-[25%]"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]">
                    <polygon
                      points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                      fill="rgba(0,255,0,0.05)"
                      stroke="#00FF00"
                      strokeWidth="1.5"
                    />
                  </svg>
                </motion.div>

                {/* Center logo */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <AuraCodeLogo className="w-24 h-24 lg:w-32 lg:h-32" glowEffect={true} />
                </motion.div>

                {/* Orbiting code symbols */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  {['<>', '{}', '[]', '()'].map((symbol, i) => (
                    <motion.span
                      key={i}
                      className="absolute font-mono text-[#00FF00]/60 text-sm"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(120px) translateY(-50%) rotate(-${i * 90}deg)`,
                      }}
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.5 
                      }}
                    >
                      {symbol}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Glowing background effect */}
                <div className="absolute inset-[30%] bg-[#00FF00]/5 rounded-full blur-3xl" />
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
