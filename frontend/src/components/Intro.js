import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuraCodeLogo } from './AuraCodeLogo';

const SEEN_KEY = 'auracode-intro-seen';

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

// Short boot sequence shown once per session, then a curtain reveal.
export const Intro = ({ onDone, lines }) => {
  const [skip] = useState(() => alreadySeen() || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(!skip);

  useEffect(() => {
    if (skip) {
      onDone();
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const DURATION = 1500;
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {
            /* storage may be unavailable */
          }
        }, 250);
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [skip, onDone]);

  const shownLines = lines.filter((_, i) => progress >= (i / lines.length) * 100);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        onDone();
      }}
    >
      {visible && (
        <motion.div key="intro" className="fixed inset-0 z-[100] pointer-events-auto" exit={{ pointerEvents: 'none' }}>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050505] border-b border-[#00ff00]/40"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505] border-t border-[#00ff00]/40"
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <AuraCodeLogo className="h-16 w-16" glowEffect />
              <span className="text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Aura<span className="gradient-text">Code</span>
              </span>
            </motion.div>

            <div className="mt-8 w-full max-w-xs font-mono text-[11px] text-[#7dff7d]/80 h-16">
              {shownLines.map((line) => (
                <motion.p key={line} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-white/30">&gt; </span>
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="mt-4 w-full max-w-xs">
              <div className="h-[2px] w-full overflow-hidden rounded bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#00ff00] to-[#00f0ff] shadow-[0_0_12px_#00ff00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-right font-mono text-[11px] text-white/50">{String(progress).padStart(3, '0')}%</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
