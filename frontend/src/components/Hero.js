import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ParticleField } from './ParticleField';
import { BuildMockup } from './BuildMockup';
import { Magnetic, RevealWords, SectionTag, scrollToId } from './fx';

export const Hero = ({ content, ready = true }) => {
  const containerRef = useRef(null);
  const [isMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  // On mobile the hero is taller than the viewport, so parallax/fade would hide the mockup.
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 140]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.85], isMobile ? [1, 1] : [1, 0]);
  const mockupY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -60]);

  const startWords = content.headlineStart.split(' ').length;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 fade-mask-y">
        <ParticleField />
      </div>
      <div className="aurora aurora-green w-[520px] h-[520px] -top-40 -left-40" />
      <div className="aurora aurora-cyan w-[480px] h-[480px] top-1/3 -right-40" style={{ animationDelay: '-6s' }} />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 lg:pt-36">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SectionTag>{content.eyebrow}</SectionTag>
              </motion.div>

              <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[1.03] mt-6 mb-7" data-testid="hero-headline">
                <RevealWords text={content.headlineStart} inView={ready} delay={0.2} stagger={0.06} />{' '}
                <RevealWords
                  text={content.headlineAccent}
                  inView={ready}
                  delay={0.2 + startWords * 0.06}
                  stagger={0.06}
                  className="gradient-text-animated"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-lg lg:text-xl text-[#A1A1AA] mb-10 max-w-xl leading-relaxed"
                data-testid="hero-subtitle"
              >
                {content.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Magnetic>
                  <button
                    onClick={() => scrollToId('#contact')}
                    className="btn-primary flex items-center gap-2 group"
                    data-testid="hero-cta-primary"
                  >
                    {content.primaryCta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => scrollToId('#services')}
                    className="btn-secondary"
                    data-testid="hero-cta-secondary"
                  >
                    {content.secondaryCta}
                  </button>
                </Magnetic>
              </motion.div>

              <motion.ul
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.05 } } }}
                className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#A1A1AA]"
              >
                {content.badges.map((badge) => (
                  <motion.li
                    key={badge}
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00FF00]" />
                    <span>{badge}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              style={{ y: mockupY }}
              initial={{ opacity: 0, scale: 0.92, rotateX: 12 }}
              animate={ready ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <BuildMockup m={content.mockup} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId('#approach')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-white/40 hover:text-white/80 transition-colors"
        aria-label={content.scroll}
      >
        <span className="scroll-cue" />
        {content.scroll}
      </motion.button>
    </section>
  );
};
