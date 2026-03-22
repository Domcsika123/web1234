import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Search,
  Smartphone,
  Cog,
} from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';

export const Hero = ({ content }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 200]);
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
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y, opacity, willChange: 'transform', backfaceVisibility: 'hidden' }} className="w-full">
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
                {content.headlineStart}{' '}
                <span className="gradient-text">{content.headlineAccent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg lg:text-xl text-[#A1A1AA] mb-10 max-w-xl"
                data-testid="hero-subtitle"
              >
                {content.subtitle}
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
                  {content.primaryCta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection('#services')}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="hero-cta-secondary"
                >
                  {content.secondaryCta}
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 flex flex-wrap gap-6 text-sm text-[#52525B]"
              >
                {content.badges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00FF00] rounded-full" />
                    <span>{badge}</span>
                  </div>
                ))}
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
                    <div className="cube-face cube-face-front" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                      <svg viewBox="0 0 120 120" style={{ width: '4.5rem', height: '4.5rem', filter: 'drop-shadow(0 0 12px rgba(0,255,0,0.8)) drop-shadow(0 0 25px rgba(0,255,0,0.4))' }}>
                        {/* Hexagon outline */}
                        <polygon
                          points="60,5 110,30 110,80 60,105 10,80 10,30"
                          fill="none"
                          stroke="#00FF00"
                          strokeWidth="5"
                          strokeLinejoin="round"
                        />
                        {/* Left bracket < */}
                        <path
                          d="M 48 40 L 30 55 L 48 70"
                          fill="none"
                          stroke="#00FF00"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Slash / */}
                        <path
                          d="M 66 35 L 54 75"
                          fill="none"
                          stroke="#00FF00"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                        />
                        {/* Right bracket > */}
                        <path
                          d="M 72 40 L 90 55 L 72 70"
                          fill="none"
                          stroke="#00FF00"
                          strokeWidth="6.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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

    </section>
  );
};
