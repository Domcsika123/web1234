import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Target, TrendingUp, Wrench } from 'lucide-react';
import { SectionTag, SpotlightCard } from './fx';

const goalIcons = [Target, TrendingUp, Wrench];

const GoalSelector = ({ content }) => {
  const [active, setActive] = useState(0);
  const answer = content.goalAnswers[active];
  const ActiveIcon = goalIcons[active] || Target;

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4 lg:gap-6">
      <div className="flex flex-col gap-3" role="tablist" aria-label={content.question}>
        {content.goals.map((goal, index) => {
          const Icon = goalIcons[index] || Target;
          const isActive = index === active;
          return (
            <button
              key={goal}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              className={`relative flex items-center gap-4 rounded-2xl border p-4 lg:p-5 text-left transition-colors duration-300 ${
                isActive ? 'border-tone/50 text-fg' : 'border-line text-fg-2 hover:text-fg hover:border-line'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="goal-active-bg"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-tone/[0.12] to-transparent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-tone text-canvas' : 'bg-fg/5 text-tone'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="relative text-base lg:text-lg font-semibold">{goal}</span>
              <ArrowRight className={`relative ml-auto h-5 w-5 transition-all ${isActive ? 'opacity-100 translate-x-0 text-tone' : 'opacity-0 -translate-x-2'}`} />
            </button>
          );
        })}
      </div>

      <SpotlightCard className="p-6 lg:p-8 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tone/10">
                <ActiveIcon className="h-5 w-5 text-tone" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-tone">{content.weBuild}</span>
            </div>
            <h4 className="mt-5 text-2xl lg:text-3xl font-bold text-fg">{answer.title}</h4>
            <ul className="mt-6 space-y-3">
              {answer.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3 text-fg"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-tone/15">
                    <Check className="h-3 w-3 text-tone" />
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </SpotlightCard>
    </div>
  );
};

export const Approach = ({ content }) => {
  const [goalRef, goalInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="approach" className="theme-light bg-canvas text-fg relative py-24 lg:py-32 overflow-hidden" data-testid="approach-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Interactive goal selector */}
        <div ref={goalRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={goalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl mx-auto text-center lg:mx-0 lg:text-left"
          >
            <SectionTag>{content.tag}</SectionTag>
            <p className="mt-6 font-mono text-sm text-fg-3">{content.questionIntro}</p>
            <h3 className="mt-3 text-2xl lg:text-4xl font-bold text-fg">{content.question}</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={goalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GoalSelector content={content} />
          </motion.div>
          <p className="mt-8 text-center lg:text-left text-fg-2">{content.answerLine}</p>
        </div>

        {/* Partner statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="relative mt-24 max-w-4xl pl-8 lg:pl-12"
        >
          <span className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-tone via-tone to-transparent" />
          <span className="absolute -left-2 -top-10 select-none text-[7rem] leading-none text-tone/15" style={{ fontFamily: 'Outfit, sans-serif' }}>
            “
          </span>
          <p className="text-xl lg:text-3xl leading-snug text-fg">
            {content.partnerStart} <span className="text-fg font-semibold">{content.partnerAccent}</span>
            {content.partnerEnd}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};
