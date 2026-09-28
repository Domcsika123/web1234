import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Gauge, Search, Smartphone } from 'lucide-react';
import { TiltCard } from './fx';

const W = 580;
const H = 480;

// Each code line, once typed, reveals the next piece of the live preview.
const buildLines = (m) => [
  [['<', 'punc'], ['Navbar', 'tag'], [' logo', 'attr'], ['=', 'punc'], [`"${m.brand}"`, 'str'], [' />', 'punc']],
  [['<', 'punc'], ['Hero', 'tag'], [' title', 'attr'], ['=', 'punc'], [`"${m.titleShort}"`, 'str'], [' />', 'punc']],
  [['<', 'punc'], ['Button', 'tag'], [' cta', 'attr'], ['=', 'punc'], [`"${m.cta}"`, 'str'], [' />', 'punc']],
  [['<', 'punc'], ['Cards', 'tag'], [' items', 'attr'], ['=', 'punc'], ['{menu}', 'fn'], [' />', 'punc']],
  [['<', 'punc'], ['Analytics', 'tag'], [' track', 'attr'], ['=', 'punc'], ['"leads"', 'str'], [' />', 'punc']],
  [['deploy', 'fn'], ['()', 'punc'], ['  ✓ live', 'ok']],
];

const lineLength = (line) => line.reduce((sum, [t]) => sum + t.length, 0);

const renderPartial = (line, chars) => {
  let left = chars;
  return line.map(([text, cls], i) => {
    if (left <= 0) return null;
    const part = text.slice(0, left);
    left -= text.length;
    return (
      <span key={i} className={`tok-${cls}`}>
        {part}
      </span>
    );
  });
};

const useTypewriter = (lines, running) => {
  const [state, setState] = useState({ line: 0, char: 0, done: false });

  useEffect(() => {
    setState({ line: 0, char: 0, done: false });
  }, [lines]);

  useEffect(() => {
    if (!running) return undefined;

    const tick = () => {
      setState((s) => {
        if (s.done) return s;
        const len = lineLength(lines[s.line]);
        if (s.char < len) return { ...s, char: s.char + 1 };
        if (s.line < lines.length - 1) return { line: s.line + 1, char: 0, done: false };
        return { ...s, done: true };
      });
    };
    const timer = setInterval(tick, 32);
    return () => clearInterval(timer);
  }, [lines, running]);

  // restart the loop a few seconds after finishing
  useEffect(() => {
    if (!state.done || !running) return undefined;
    const t = setTimeout(() => setState({ line: 0, char: 0, done: false }), 4200);
    return () => clearTimeout(t);
  }, [state.done, running]);

  return state;
};

const appear = {
  initial: { opacity: 0, y: 14, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const AnalyticsWidget = ({ label }) => (
  <motion.div
    {...appear}
    className="w-[210px] rounded-xl border border-white/10 bg-[#111]/95 p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur"
  >
    <div className="flex items-center justify-between">
      <p className="text-[9px] font-mono uppercase tracking-wider text-white/50">{label}</p>
      <span className="rounded-full bg-[#00ff00]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#00ff00]">↗</span>
    </div>
    <svg viewBox="0 0 200 50" className="mt-2 h-12 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="mk-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00ff00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 46 L25 40 L50 42 L75 32 L100 34 L125 22 L150 25 L175 11 L200 4 L200 50 L0 50 Z"
        fill="url(#mk-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />
      <motion.path
        d="M0 46 L25 40 L50 42 L75 32 L100 34 L125 22 L150 25 L175 11 L200 4"
        fill="none"
        stroke="#00ff00"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
    </svg>
  </motion.div>
);

const Preview = ({ stage, m, live }) => (
  <div className="relative h-full w-full overflow-hidden bg-[#0b0f0b]">
    <div className="absolute inset-0 dot-bg opacity-60" />
    <div className="relative flex h-full flex-col gap-3 p-4">
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div key="nav" {...appear} className="flex shrink-0 items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-[4px] bg-gradient-to-br from-[#00ff00] to-[#00f0ff]" />
              <span className="text-[11px] font-bold text-white">{m.brand}</span>
            </div>
            <div className="flex items-center gap-2">
              {[28, 22, 30].map((w, i) => (
                <span key={i} className="h-1.5 rounded-full bg-white/20" style={{ width: w }} />
              ))}
            </div>
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="hero"
            {...appear}
            className="relative shrink-0 overflow-hidden rounded-xl border border-white/5 p-4"
            style={{ background: 'radial-gradient(120% 140% at 100% 0%, rgba(0,255,0,0.18), rgba(0,240,255,0.06) 40%, rgba(255,255,255,0.02) 70%)' }}
          >
            <p className="text-[9px] font-mono tracking-widest text-[#7dff7d]">{m.kicker}</p>
            <p className="mt-1 max-w-[70%] text-[19px] font-extrabold leading-tight text-white">{m.title}</p>
            <div className="mt-2 space-y-1">
              <span className="block h-1.5 w-[60%] rounded-full bg-white/15" />
              <span className="block h-1.5 w-[45%] rounded-full bg-white/10" />
            </div>
            <AnimatePresence>
              {stage >= 3 && (
                <motion.div key="btn" {...appear} className="relative mt-3 inline-flex">
                  <span className="rounded-md bg-[#00ff00] px-3 py-1.5 text-[10px] font-bold text-black shadow-[0_0_18px_rgba(0,255,0,0.55)]">
                    {m.cta} →
                  </span>
                  <motion.span
                    className="absolute -right-3 -bottom-3 text-white"
                    initial={{ x: 30, y: 24, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1, scale: [1, 1, 0.85, 1] }}
                    transition={{ duration: 1.1, times: [0, 0.6, 0.8, 1] }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5">
                      <path d="M4 3l7 17 2.5-7.5L21 10z" />
                    </svg>
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 rounded-md border border-[#00ff00]"
                    initial={{ opacity: 0.9, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 0.8, delay: 0.85 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div key="cards" className="grid shrink-0 grid-cols-3 gap-2">
            {m.cards.map((card, i) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-2"
              >
                <div
                  className="h-9 rounded-md"
                  style={{
                    background: [
                      'linear-gradient(135deg, #1f3d1f, #0f2a2a)',
                      'linear-gradient(135deg, #10312e, #1d2b12)',
                      'linear-gradient(135deg, #1b2f1b, #0d2233)',
                    ][i],
                  }}
                />
                <p className="mt-1.5 truncate text-[9px] font-semibold text-white/90">{card}</p>
                <span className="mt-1 block h-1 w-2/3 rounded-full bg-white/10" />
              </motion.div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>

    <AnimatePresence>
      {live && (
        <motion.div
          key="live-flash"
          className="pointer-events-none absolute inset-0"
          initial={{ boxShadow: 'inset 0 0 0 2px rgba(0,255,0,0.9)' }}
          animate={{ boxShadow: 'inset 0 0 0 0px rgba(0,255,0,0)' }}
          transition={{ duration: 1.2 }}
        />
      )}
    </AnimatePresence>
  </div>
);

export const BuildMockup = ({ m }) => {
  const reduce = useReducedMotion();
  const [viewRef, inView] = useInView({ threshold: 0.2 });
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const lines = useMemo(() => buildLines(m), [m]);
  const tw = useTypewriter(lines, inView && !reduce);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stage = reduce ? lines.length : tw.done ? lines.length : tw.line;
  const live = stage >= lines.length;

  return (
    <div ref={viewRef} className="w-full">
      <div ref={wrapRef} className="relative w-full" style={{ height: H * scale }}>
        <div className="absolute left-1/2 top-0 origin-top" style={{ width: W, height: H, transform: `translateX(-50%) scale(${scale})` }}>
          <TiltCard max={7} glare={false} className="h-full">
            {/* Browser window */}
            <div
              className="absolute right-0 top-0 h-[74%] w-[86%] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_-20px_rgba(0,255,0,0.35)]"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-[#111] px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="mx-auto flex h-5 w-[55%] items-center justify-center gap-1.5 rounded-md bg-white/5 text-[10px] text-white/50">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 118 0v4" />
                  </svg>
                  {m.domain}
                </div>
                <motion.span
                  animate={live ? { backgroundColor: 'rgba(0,255,0,0.15)', color: '#00ff00' } : { backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-[#00ff00] shadow-[0_0_8px_#00ff00]' : 'bg-white/30'}`} />
                  {live ? 'Live' : 'Build'}
                </motion.span>
              </div>
              <div className="h-[calc(100%-2.25rem)]">
                <Preview stage={stage} m={m} live={live} />
              </div>
            </div>

            {/* Code editor window */}
            <div
              className="absolute bottom-0 left-0 w-[62%] overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]/95 font-mono text-[11.5px] leading-[1.75] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur"
              style={{ transform: 'translateZ(60px)' }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-3 py-2">
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/70">App.jsx</span>
                <span className="text-[10px] text-white/30">— auracode</span>
              </div>
              <div className="px-3 py-2.5">
                {lines.map((line, i) => {
                  const typed = reduce || tw.done || i < tw.line;
                  const current = !reduce && !tw.done && i === tw.line;
                  return (
                    <div key={i} className="flex whitespace-pre">
                      <span className="mr-3 w-4 select-none text-right text-white/20">{i + 1}</span>
                      <span>
                        {typed ? renderPartial(line, Infinity) : current ? renderPartial(line, tw.char) : null}
                        {current && <span className="caret" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating chips — outer div holds depth, inner div floats */}
            <div className="absolute -left-6 top-[47%]" style={{ transform: 'translateZ(80px)' }}>
              <div className="float-slow flex items-center gap-2 rounded-xl border border-white/10 bg-[#111]/90 px-3 py-2 text-xs text-white shadow-xl backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00ff00]/15">
                  <Search className="h-3.5 w-3.5 text-[#00ff00]" />
                </span>
                {m.chips[0]}
                <Check className="h-3.5 w-3.5 text-[#00ff00]" />
              </div>
            </div>
            <div className="absolute -right-4 top-[40%]" style={{ transform: 'translateZ(90px)' }}>
              <div className="float-slower flex items-center gap-2 rounded-xl border border-white/10 bg-[#111]/90 px-3 py-2 text-xs text-white shadow-xl backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00f0ff]/15">
                  <Smartphone className="h-3.5 w-3.5 text-[#00f0ff]" />
                </span>
                {m.chips[1]}
              </div>
            </div>
            <div className="absolute -top-4 left-[36%]" style={{ transform: 'translateZ(70px)' }}>
              <div className="float-slower flex items-center gap-2 rounded-xl border border-white/10 bg-[#111]/90 px-3 py-2 text-xs text-white shadow-xl backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00ff00]/15">
                  <Gauge className="h-3.5 w-3.5 text-[#00ff00]" />
                </span>
                {m.chips[2]}
              </div>
            </div>
            <div className="absolute bottom-2 right-0" style={{ transform: 'translateZ(100px)' }}>
              <AnimatePresence>{stage >= 5 && <AnalyticsWidget key="analytics" label={m.leads} />}</AnimatePresence>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
