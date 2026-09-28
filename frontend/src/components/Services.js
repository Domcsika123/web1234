import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  BarChart3,
  Lock,
  MousePointer2,
  Search,
  Shield,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';
import { Magnetic, SectionHeader, SpotlightCard, scrollToId } from './fx';

/* ── Micro visuals ────────────────────────────────────────────── */

const SpeedViz = ({ run }) => (
  <div className="flex w-full items-center gap-6 lg:gap-10">
    <svg viewBox="0 0 120 70" className="h-24 w-36 flex-shrink-0">
      <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" strokeLinecap="round" />
      <motion.path
        d="M10 62 A50 50 0 0 1 110 62"
        fill="none"
        stroke="url(#spd)"
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={run ? { pathLength: [0, 0.94, 0.94, 0] } : {}}
        transition={{ duration: 3.6, times: [0, 0.35, 0.85, 1], repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.line
        x1="60"
        y1="62"
        x2="60"
        y2="22"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ originX: 0.5, originY: 1 }}
        initial={{ rotate: -80 }}
        animate={run ? { rotate: [-80, 72, 72, -80] } : {}}
        transition={{ duration: 3.6, times: [0, 0.35, 0.85, 1], repeat: Infinity, ease: 'easeOut' }}
      />
      <circle cx="60" cy="62" r="5" fill="#00ff00" />
      <defs>
        <linearGradient id="spd" x1="0" x2="1">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#00ff00" />
        </linearGradient>
      </defs>
    </svg>
    <div className="flex-1 space-y-2.5">
      {['HTML', 'CSS', 'JS', 'IMG'].map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-9 font-mono text-[10px] text-white/40">{label}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00ff00] to-[#00f0ff]"
              initial={{ width: '0%' }}
              animate={run ? { width: ['0%', '100%', '100%', '0%'] } : {}}
              transition={{ duration: 3.6, times: [0, 0.2 + i * 0.05, 0.85, 1], repeat: Infinity, delay: i * 0.08 }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SeoViz = ({ run, query, you }) => {
  const [rank, setRank] = useState(4);
  useEffect(() => {
    if (!run) return undefined;
    const id = setInterval(() => setRank((r) => (r === 0 ? 4 : r - 1)), 1200);
    return () => clearInterval(id);
  }, [run]);

  const rows = [0, 1, 2, 3];
  const order = [...rows];
  order.splice(rank, 0, 'you');

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
        <Search className="h-3.5 w-3.5 text-white/50" />
        <span className="truncate text-xs text-white/70">{query}</span>
      </div>
      <div className="mt-3 space-y-2">
        {order.map((row) =>
          row === 'you' ? (
            <motion.div
              layout
              key="you"
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className={`rounded-lg border p-2.5 ${rank === 0 ? 'border-[#00ff00]/60 bg-[#00ff00]/10 shadow-[0_0_24px_-6px_rgba(0,255,0,0.6)]' : 'border-[#00ff00]/25 bg-[#00ff00]/[0.04]'}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#00ff00]">#{rank + 1}</span>
                <span className="text-xs font-semibold text-[#9dff9d]">{you}</span>
              </div>
              <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-[#00ff00]/25" />
            </motion.div>
          ) : (
            <motion.div layout key={row} transition={{ type: 'spring', stiffness: 260, damping: 28 }} className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
              <span className="block h-1.5 w-1/2 rounded-full bg-white/15" />
              <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-white/[0.07]" />
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

const ConversionViz = ({ run, cta, toast }) => {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    if (!run) return undefined;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setToasts((t) => [...t.slice(-2), n]);
    }, 1600);
    return () => clearInterval(id);
  }, [run]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end gap-3">
      <div className="flex w-full flex-col items-end gap-1.5">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141414] px-2.5 py-1.5 text-[11px] text-white shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff00] shadow-[0_0_6px_#00ff00]" />
              {toast}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative">
        <motion.span
          className="inline-block rounded-lg bg-[#00ff00] px-4 py-2 text-xs font-bold text-black"
          animate={run ? { scale: [1, 1, 0.92, 1] } : {}}
          transition={{ duration: 1.6, times: [0, 0.55, 0.65, 0.8], repeat: Infinity }}
        >
          {cta}
        </motion.span>
        <motion.span
          className="absolute -bottom-4 -right-4"
          animate={run ? { x: [24, 0, 0, 24], y: [18, 0, 0, 18] } : {}}
          transition={{ duration: 1.6, times: [0, 0.5, 0.75, 1], repeat: Infinity }}
        >
          <MousePointer2 className="h-5 w-5 fill-white text-black" />
        </motion.span>
      </div>
    </div>
  );
};

const AnalyticsViz = ({ run }) => {
  const d = 'M0 70 C30 64 45 68 70 56 S120 50 140 40 S190 34 215 22 S260 14 300 6';
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 300 80" className="h-28 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="an-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00ff00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
        ))}
        <motion.path
          d={`${d} L300 80 L0 80 Z`}
          fill="url(#an-fill)"
          initial={{ opacity: 0 }}
          animate={run ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="#00ff00"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={run ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,0,0.7))' }}
        />
      </svg>
      <div className="mt-2 flex h-10 items-end gap-1.5">
        {[30, 45, 38, 60, 52, 70, 64, 85, 78, 100].map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-sm bg-white/10"
            initial={{ height: 0 }}
            animate={run ? { height: `${h}%` } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.06 }}
          />
        ))}
      </div>
    </div>
  );
};

const SecurityViz = ({ run }) => (
  <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
    <motion.div
      className="absolute inset-0 rounded-full border border-[#00ff00]/20"
      animate={run ? { scale: [1, 1.25], opacity: [0.6, 0] } : {}}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
    />
    <motion.div
      className="absolute inset-0 rounded-full border border-[#00ff00]/20"
      animate={run ? { scale: [1, 1.25], opacity: [0.6, 0] } : {}}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
    />
    <div className="relative overflow-hidden rounded-2xl">
      <Shield className="h-20 w-20 text-[#00ff00]" strokeWidth={1.2} />
      <Lock className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-white" strokeWidth={1.8} />
      <motion.span
        className="absolute left-0 right-0 h-6 bg-gradient-to-b from-transparent via-[#00ff00]/40 to-transparent"
        animate={run ? { top: ['-30%', '110%'] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  </div>
);

const MaintenanceViz = ({ run, online }) => (
  <div className="w-full">
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff00] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00ff00]" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-[#00ff00]">{online}</span>
    </div>
    <svg viewBox="0 0 200 50" className="mt-3 h-14 w-full" preserveAspectRatio="none">
      <motion.path
        d="M0 25 L40 25 L50 25 L58 8 L66 42 L74 25 L110 25 L118 12 L126 38 L134 25 L200 25"
        fill="none"
        stroke="#00ff00"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={run ? { pathLength: [0, 1, 1], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 2.4, times: [0, 0.7, 1], repeat: Infinity, ease: 'linear' }}
        style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,0,0.8))' }}
      />
    </svg>
    <div className="mt-2 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.span
          key={i}
          className="h-3 rounded-[2px] bg-[#00ff00]/70"
          initial={{ opacity: 0 }}
          animate={run ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.02 }}
        />
      ))}
    </div>
  </div>
);

/* ── Card shell ───────────────────────────────────────────────── */

const icons = [Zap, Search, Target, BarChart3, Shield, Wrench];

const ServiceCard = ({ item, index, inView, className = '', children }) => {
  const Icon = icons[index];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      data-testid={`service-card-${index}`}
    >
      <SpotlightCard className="group h-full p-6 lg:p-7 flex flex-col">
        <div className="mb-6 flex flex-1 min-h-[8.5rem] items-center justify-center rounded-xl border border-white/5 bg-black/30 p-4 dot-bg">
          {children}
        </div>
        <div className="mt-auto flex items-start gap-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#00FF00]/10 transition-colors group-hover:bg-[#00FF00] group-hover:text-black text-[#00FF00]">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-sm text-[#A1A1AA] leading-relaxed">{item.description}</p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export const Services = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [vizRef, vizInView] = useInView({ threshold: 0.05 });
  const run = inView && vizInView;
  const items = content.items;
  const v = content.viz;

  return (
    <section id="services" ref={ref} className="relative py-24 lg:py-36 overflow-hidden" data-testid="services-section">
      <div className="absolute inset-0 grid-bg opacity-30 fade-mask-radial" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <SectionHeader
          tag={content.tag}
          start={content.headlineStart}
          accent={content.headlineAccent}
          subtitle={content.subtitle}
          inView={inView}
          testId="services-headline"
          className="mb-16"
        />

        <div ref={vizRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,auto)]">
          <ServiceCard item={items[0]} index={0} inView={inView} className="md:col-span-2">
            <SpeedViz run={run} />
          </ServiceCard>
          <ServiceCard item={items[1]} index={1} inView={inView} className="lg:row-span-2">
            <SeoViz run={run} query={v.seoQuery} you={v.seoYou} />
          </ServiceCard>
          <ServiceCard item={items[2]} index={2} inView={inView}>
            <ConversionViz run={run} cta={v.conversionCta} toast={v.conversionToast} />
          </ServiceCard>
          <ServiceCard item={items[3]} index={3} inView={inView}>
            <AnalyticsViz run={run} />
          </ServiceCard>
          <ServiceCard item={items[4]} index={4} inView={inView}>
            <SecurityViz run={run} />
          </ServiceCard>
          <ServiceCard item={items[5]} index={5} inView={inView}>
            <MaintenanceViz run={run} online={v.online} />
          </ServiceCard>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glow-frame"
          >
            <div className="glow-frame-inner flex flex-col justify-between p-7 lg:p-8 relative overflow-hidden">
              <div className="aurora aurora-green w-64 h-64 -right-20 -top-20 opacity-40" />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00FF00]">{v.ctaKicker}</p>
                <h3 className="mt-4 text-2xl lg:text-3xl font-bold text-white leading-tight">{v.ctaTitle}</h3>
                <p className="mt-3 text-[#A1A1AA]">{v.ctaText}</p>
              </div>
              <div className="relative mt-8">
                <Magnetic>
                  <button onClick={() => scrollToId('#contact')} className="btn-primary flex items-center gap-2 group">
                    {v.ctaButton}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
