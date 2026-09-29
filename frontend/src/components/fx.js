import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ── Section tag pill ─────────────────────────────────────────── */
export const SectionTag = ({ children, className = '' }) => (
  <span className={`section-tag ${className}`}>
    <span className="section-tag-dot" />
    {children}
  </span>
);

/* ── Word-by-word masked reveal ───────────────────────────────── */
export const RevealWords = ({ text, className = '', delay = 0, inView = true, stagger = 0.045 }) => {
  const words = String(text).split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Standard section header ──────────────────────────────────── */
export const SectionHeader = ({ tag, start, accent, subtitle, inView, align = 'center', testId, className = '' }) => {
  const centered = align === 'center';
  // Headers are always centred on mobile; `left` only applies from lg up.
  return (
    <div className={`text-center mx-auto ${centered ? '' : 'lg:text-left lg:mx-0'} max-w-3xl ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <SectionTag>{tag}</SectionTag>
      </motion.div>
      <h2 className="text-headline font-bold mt-5" data-testid={testId}>
        <RevealWords text={start} inView={inView} delay={0.1} />{' '}
        <RevealWords
          text={accent}
          inView={inView}
          delay={0.1 + start.split(' ').length * 0.045}
          className="gradient-text-animated"
        />
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className={`text-[#A1A1AA] mt-5 text-lg mx-auto ${centered ? 'max-w-2xl' : 'max-w-xl lg:mx-0'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

/* ── Card with a cursor-following border + inner glow ─────────── */
export const SpotlightCard = ({ className = '', children, ...rest }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={handleMove} className={`spotlight-card ${className}`} {...rest}>
      {children}
    </div>
  );
};

/* ── Magnetic wrapper (pulls toward the cursor) ───────────────── */
export const Magnetic = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

  const handleMove = (e) => {
    if (isTouchDevice()) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* ── 3D tilt with glare ───────────────────────────────────────── */
export const TiltCard = ({ children, className = '', max = 10, glare = true, style }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const glareBg = useTransform(
    [gx, gy],
    ([px, py]) => `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.14), transparent 55%)`
  );

  const handleMove = (e) => {
    if (reduce || isTouchDevice()) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1000, ...style }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative h-full group/tilt"
      >
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
};
