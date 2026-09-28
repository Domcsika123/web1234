import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { ShieldCheck } from 'lucide-react';
import { Marquee, SectionTag, SpotlightCard } from './fx';

const Ring = ({ inView }) => (
  <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
    <motion.circle
      cx="60"
      cy="60"
      r="52"
      fill="none"
      stroke="url(#ring-grad)"
      strokeWidth="8"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={inView ? { pathLength: 1 } : {}}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    />
    <defs>
      <linearGradient id="ring-grad" x1="0" x2="1">
        <stop offset="0%" stopColor="#00ff00" />
        <stop offset="100%" stopColor="#00f0ff" />
      </linearGradient>
    </defs>
  </svg>
);

const Bars = ({ inView }) => (
  <div className="flex h-28 items-end gap-3">
    {[1, 3].map((h, i) => (
      <div key={h} className="flex flex-col items-center gap-2">
        <motion.div
          className={`w-10 rounded-t-lg ${i === 1 ? 'bg-gradient-to-t from-[#00ff00] to-[#00f0ff] shadow-[0_0_24px_rgba(0,255,0,0.45)]' : 'bg-white/10'}`}
          initial={{ height: 0 }}
          animate={inView ? { height: h * 28 } : {}}
          transition={{ duration: 1.4, delay: 0.3 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="font-mono text-[10px] text-white/40">{h}x</span>
      </div>
    ))}
  </div>
);

const Weeks = ({ inView, labels }) => (
  <div className="w-full">
    <div className="relative h-2 w-full rounded-full bg-white/5">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00ff00] to-[#00f0ff] shadow-[0_0_16px_rgba(0,255,0,0.5)]"
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
      />
    </div>
    <div className="mt-3 flex justify-between font-mono text-[10px] text-white/40">
      {labels.map((l, i) => (
        <motion.span key={l} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 + i * 0.45 }}>
          {l}
        </motion.span>
      ))}
    </div>
  </div>
);

export const Stats = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const visuals = [
    <Ring inView={inView} />,
    <Bars inView={inView} />,
    <Weeks inView={inView} labels={content.weekLabels} />,
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <SectionTag>{content.tag}</SectionTag>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {content.items.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`stat-item-${index}`}
            >
              <SpotlightCard className="h-full p-7 lg:p-8 flex flex-col">
                <div className="flex h-32 items-center justify-center">
                  {index === 0 ? (
                    <div className="relative">
                      {visuals[0]}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldCheck className="h-10 w-10 text-[#00FF00]" strokeWidth={1.5} />
                      </div>
                    </div>
                  ) : (
                    visuals[index]
                  )}
                </div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="stat-number !text-[clamp(2.75rem,5vw,4rem)]">
                    {stat.prefix}
                    {inView ? <CountUp start={stat.start || 0} end={stat.value} duration={2.2} delay={0.3 + index * 0.15} /> : stat.start || 0}
                  </span>
                  <span className="stat-number !text-[clamp(1.5rem,3vw,2.25rem)]">{stat.suffix}</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-white">{stat.label}</h3>
                <p className="mt-1 text-sm text-[#71717A]">{stat.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14"
        >
          <Marquee
            items={content.tags}
            speed={30}
            separator="•"
            itemClassName="font-mono text-sm tracking-[0.25em] text-white/40"
          />
        </motion.div>
      </div>
    </section>
  );
};
