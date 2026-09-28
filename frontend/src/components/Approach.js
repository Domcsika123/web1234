import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Target, TrendingUp, Wrench } from 'lucide-react';
import { SpotlightCard } from './fx';

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
                isActive ? 'border-[#00FF00]/50 text-white' : 'border-white/10 text-[#A1A1AA] hover:text-white hover:border-white/20'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="goal-active-bg"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FF00]/[0.12] to-transparent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-[#00FF00] text-black' : 'bg-white/5 text-[#00FF00]'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="relative text-lg font-semibold">{goal}</span>
              <ArrowRight className={`relative ml-auto h-5 w-5 transition-all ${isActive ? 'opacity-100 translate-x-0 text-[#00FF00]' : 'opacity-0 -translate-x-2'}`} />
            </button>
          );
        })}
        <p className="px-1 pt-1 font-mono text-xs text-white/30">{content.tapHint}</p>
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
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF00]/10">
                <ActiveIcon className="h-5 w-5 text-[#00FF00]" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00FF00]">{content.weBuild}</span>
            </div>
            <h4 className="mt-5 text-2xl lg:text-3xl font-bold text-white">{answer.title}</h4>
            <ul className="mt-6 space-y-3">
              {answer.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3 text-[#D4D4D8]"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00FF00]/15">
                    <Check className="h-3 w-3 text-[#00FF00]" />
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
    <section id="approach" className="relative py-24 lg:py-32 overflow-hidden" data-testid="approach-section">
      <div className="aurora aurora-green w-[600px] h-[600px] top-1/2 -right-60 opacity-30" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Interactive goal selector */}
        <div ref={goalRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={goalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl"
          >
            <p className="font-mono text-sm text-[#71717A]">{content.questionIntro}</p>
            <h3 className="mt-3 text-2xl lg:text-4xl font-bold gradient-text">{content.question}</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={goalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GoalSelector content={content} />
          </motion.div>
          <p className="mt-8 text-[#A1A1AA]">{content.answerLine}</p>
        </div>

        {/* Partner statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="relative mt-24 max-w-4xl pl-8 lg:pl-12"
        >
          <span className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-[#00FF00] via-[#00F0FF] to-transparent" />
          <span className="absolute -left-2 -top-10 select-none text-[7rem] leading-none text-[#00FF00]/15" style={{ fontFamily: 'Outfit, sans-serif' }}>
            “
          </span>
          <p className="text-xl lg:text-3xl leading-snug text-[#D4D4D8]">
            {content.partnerStart} <span className="text-white font-semibold">{content.partnerAccent}</span>
            {content.partnerEnd}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};
