import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, PenTool, Code, Rocket, HeartHandshake } from 'lucide-react';
import { SectionHeader } from './fx';

const stepIcons = [MessageSquare, PenTool, Code, Rocket, HeartHandshake];

export const Process = ({ content }) => {
  const [headRef, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const steps = content.steps;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.6', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(idx);
  });

  return (
    <section id="process" className="relative pt-24 pb-8 lg:py-36" data-testid="process-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0c] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
          {/* Sticky side */}
          <div ref={headRef} className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              tag={content.tag}
              start={content.headlineStart}
              accent={content.headlineAccent}
              subtitle={content.subtitle}
              inView={inView}
              align="left"
              testId="process-headline"
            />
            <div className="mt-12 hidden lg:flex items-end gap-4">
              <div className="relative h-[7rem] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-[7rem] font-black leading-none gradient-text"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {steps[active].number}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="pb-4">
                <p className="font-mono text-sm text-white/30">/ {String(steps.length).padStart(2, '0')}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-1 text-lg font-semibold text-white"
                  >
                    {steps[active].title}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div ref={listRef} className="relative">
            <div className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-white/[0.06]" />
            <motion.div
              className="absolute left-[27px] top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-[#00FF00] to-[#00F0FF] shadow-[0_0_12px_rgba(0,255,0,0.7)]"
              style={{ scaleY: fill }}
            />

            <div className="space-y-6 lg:space-y-10">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] || MessageSquare;
                const reached = index <= active;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex gap-6"
                    data-testid={`process-step-${index}`}
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                          reached
                            ? 'border-[#00FF00] bg-[#00FF00] text-black shadow-[0_0_30px_rgba(0,255,0,0.5)]'
                            : 'border-white/10 bg-[#0c0c0c] text-white/40'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div
                      className={`flex-1 rounded-2xl border p-6 lg:p-7 transition-all duration-500 ${
                        index === active
                          ? 'border-[#00FF00]/30 bg-gradient-to-br from-[#00FF00]/[0.07] to-transparent'
                          : 'border-white/[0.06] bg-white/[0.015]'
                      }`}
                    >
                      <span className={`font-mono text-sm transition-colors ${reached ? 'text-[#00FF00]' : 'text-white/30'}`}>
                        {step.number}
                      </span>
                      <h3 className="mt-2 text-xl lg:text-2xl font-bold text-white">{step.title}</h3>
                      <p className="mt-2 text-[#A1A1AA] leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
