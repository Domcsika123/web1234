import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Code2, LifeBuoy, MessageSquare, PenTool, Rocket } from 'lucide-react';
import { ChapterHeading } from './primitives';

const stepIcons = [MessageSquare, PenTool, Code2, Rocket, LifeBuoy];

function StepCard({ step, index, state }) {
  const Icon = stepIcons[index];
  return (
    <article className="process-card" data-state={state}>
      <div className="flex items-center justify-between gap-4">
        <span className="process-icon">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="process-num tabular" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="type-h3 mt-8 text-hi">{step.title}</h3>
      <p className="type-body mt-3">{step.description}</p>
    </article>
  );
}

/* Desktop: the section pins and vertical scroll drives the track sideways. */
function PinnedProcess({ copy }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const steps = copy.steps;
  const last = steps.length - 1;

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // Dwell a little at both ends so the first and last steps can be read
  const travel = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true });
  const smooth = useSpring(travel, { stiffness: 170, damping: 32, mass: 0.35 });
  const x = useTransform(smooth, (p) => -p * distance);

  useMotionValueEvent(travel, 'change', (p) => {
    setActive(Math.min(last, Math.max(0, Math.round(p * last))));
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="process-pinned relative"
      style={{ height: `calc(100vh + ${distance}px + 45vh)` }}
      aria-labelledby="process-title"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[var(--nav-h)]">
        <div className="shell flex items-end justify-between gap-10">
          <ChapterHeading id="process-title" index={copy.index} label={copy.label} title={copy.title} lead={copy.lead} />
          <p className="process-readout tabular" aria-hidden="true">
            {copy.progress(active + 1, steps.length)}
          </p>
        </div>

        <div ref={viewportRef} className="process-viewport mt-12 xl:mt-16">
          <motion.div ref={trackRef} style={{ x, '--steps': steps.length }} className="process-track">
            <div className="relative">
              <div className="process-rail" aria-hidden="true">
                <motion.span className="process-rail-fill" style={{ scaleX: smooth }} />
              </div>
              <ol className="flex gap-[var(--step-gap)]">
                {steps.map((step, i) => (
                  <li key={step.title} className="process-step">
                    <span className="process-node" data-lit={i <= active} aria-hidden="true" />
                    <span className="process-phase" data-lit={i <= active} aria-hidden="true">
                      {step.phase}
                    </span>
                    <StepCard step={step} index={i} state={i === active ? 'active' : i < active ? 'done' : 'next'} />
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Mobile / reduced motion: a vertical timeline. The line fills with scroll unless motion is reduced. */
function StackedProcess({ copy, reduce }) {
  const listRef = useRef(null);
  const [reached, setReached] = useState(reduce ? copy.steps.length - 1 : 0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.55'] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return;
    setReached(Math.min(copy.steps.length - 1, Math.floor(p * copy.steps.length + 0.15)));
  });

  return (
    <section id="process" className="chapter" aria-labelledby="process-title">
      <div className="shell">
        <ChapterHeading id="process-title" index={copy.index} label={copy.label} title={copy.title} lead={copy.lead} />
        <div ref={listRef} className="process-stack">
          <div className="process-stack-rail" aria-hidden="true">
            <motion.span className="process-stack-fill" style={{ scaleY: reduce ? 1 : fill }} />
          </div>
          <ol className="flex flex-col gap-5">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="process-stack-item">
                <span className="process-node" data-lit={i <= reached} aria-hidden="true" />
                <StepCard step={step} index={i} state={i === reached ? 'active' : i < reached ? 'done' : 'next'} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Process({ copy }) {
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1024px) and (min-height: 700px)').matches);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 700px)');
    const update = () => setDesktop(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return desktop && !reduce ? <PinnedProcess copy={copy} /> : <StackedProcess copy={copy} reduce={Boolean(reduce)} />;
}
