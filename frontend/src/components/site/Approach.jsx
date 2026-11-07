import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck, Check, ChevronRight, Inbox, TrendingUp } from 'lucide-react';
import { ChapterHeading } from './primitives';

const EASE_OUT = [0.23, 1, 0.32, 1];
const goalIcons = { leads: Inbox, sales: TrendingUp, admin: CalendarCheck };

/* ── Outcome vignettes: small illustrations of what each goal looks like in use ── */

function LeadsVignette({ v, example }) {
  return (
    <div className="vignette">
      <div className="vignette-head">
        <span className="flex items-center gap-2">
          <span className="pulse-dot" />
          {v.title}
        </span>
        <span className="vignette-badge">{v.badge}</span>
      </div>
      <ul className="flex flex-col gap-2">
        {v.items.map((item, i) => (
          <motion.li
            key={item.name}
            className="vignette-row"
            data-new={i === 0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + i * 0.08, duration: 0.34, ease: EASE_OUT }}
          >
            <span className="vignette-avatar">{item.initials}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-hi">{item.name}</span>
              <span className="block truncate text-fine text-lo">{item.subject}</span>
            </span>
            <span className="flex-none text-fine text-lo">{item.time}</span>
          </motion.li>
        ))}
      </ul>
      <p className="vignette-foot">{example}</p>
    </div>
  );
}

function SalesVignette({ v, example }) {
  const peak = v.values.indexOf(Math.max(...v.values));
  return (
    <div className="vignette">
      <div className="vignette-head">
        <span>{v.title}</span>
        <TrendingUp className="h-4 w-4 text-volt" />
      </div>
      <div className="relative">
        <div className="flex h-40 items-end gap-2">
          {v.values.map((value, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <motion.span
                className={`vignette-bar ${i === peak ? 'bg-aura' : ''}`}
                style={{ height: `${value}%`, originY: 1 }}
                initial={{ scaleY: 0.08, opacity: 0.4 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: EASE_OUT }}
              />
              <span className="text-fine text-lo">{v.days[i]}</span>
            </div>
          ))}
        </div>
        <motion.div
          className="vignette-toast absolute left-0 top-0"
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.62, duration: 0.32, ease: EASE_OUT }}
        >
          <Check className="h-3.5 w-3.5 text-volt" />
          {v.caption}
        </motion.div>
      </div>
      <p className="vignette-foot">{example}</p>
    </div>
  );
}

// Booked slots in a 5-day × 4-slot week, filled in the order they "arrive"
const BOOKED = [1, 6, 8, 13, 15, 18, 3];

function AdminVignette({ v, example }) {
  return (
    <div className="vignette">
      <div className="vignette-head">
        <span>{v.title}</span>
        <CalendarCheck className="h-4 w-4 text-volt" />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {v.days.map((d) => (
          <span key={d} className="text-center text-fine text-lo">
            {d}
          </span>
        ))}
        {Array.from({ length: 20 }).map((_, slot) => {
          const order = BOOKED.indexOf(slot);
          const booked = order !== -1;
          return (
            <motion.span
              key={slot}
              className="vignette-slot"
              data-booked={booked}
              initial={booked ? { opacity: 0, scale: 0.9 } : false}
              animate={booked ? { opacity: 1, scale: 1 } : undefined}
              transition={booked ? { delay: 0.12 + order * 0.07, duration: 0.28, ease: EASE_OUT } : undefined}
            >
              {booked && <Check className="h-3 w-3" />}
            </motion.span>
          );
        })}
      </div>
      <motion.div
        className="vignette-toast mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.32, ease: EASE_OUT }}
      >
        <Check className="h-3.5 w-3.5 text-volt" />
        {v.toast}
      </motion.div>
      <p className="vignette-foot">{example}</p>
    </div>
  );
}

const vignettes = { leads: LeadsVignette, sales: SalesVignette, admin: AdminVignette };

export function Approach({ copy }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const uid = useId();
  const goal = copy.goals[active];
  const Vignette = vignettes[goal.key];

  const onKeyDown = (e, i) => {
    const n = copy.goals.length;
    const keys = { ArrowDown: (i + 1) % n, ArrowRight: (i + 1) % n, ArrowUp: (i - 1 + n) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    setActive(keys[e.key]);
    tabRefs.current[keys[e.key]]?.focus();
  };

  return (
    <section id="approach" className="chapter" aria-labelledby="approach-title">
      <div className="shell">
        <ChapterHeading
          id="approach-title"
          index={copy.index}
          label={copy.label}
          intro={copy.intro}
          title={copy.title}
          lead={copy.lead}
        />

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
          <div role="tablist" aria-orientation="vertical" aria-labelledby="approach-title" className="flex flex-col gap-3">
            {copy.goals.map((g, i) => {
              const Icon = goalIcons[g.key];
              const selected = i === active;
              return (
                <button
                  key={g.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="goal-tab"
                  data-selected={selected}
                >
                  {selected && (
                    <motion.span
                      layoutId="goal-indicator"
                      className="goal-tab-indicator"
                      transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
                    />
                  )}
                  <span className="goal-tab-icon">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold leading-snug text-hi">{g.label}</span>
                    <span className="mt-1 block text-sm leading-snug text-lo">{g.hint}</span>
                  </span>
                  <ChevronRight className="goal-tab-chevron h-5 w-5 flex-none" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${active}`}
            tabIndex={0}
            className="surface-panel goal-panel"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={goal.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.26, ease: EASE_OUT } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.14, ease: EASE_OUT } }}
                className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-center lg:gap-10"
              >
                <div>
                  <p className="text-sm font-medium text-volt">{copy.weBuild}</p>
                  <h3 className="type-h3 mt-3 text-hi">{goal.title}</h3>
                  <ul className="mt-6 flex flex-col gap-4">
                    {goal.points.map((point) => (
                      <li key={point} className="flex gap-3 text-base leading-relaxed text-mid">
                        <span className="check-dot" aria-hidden="true">
                          <Check className="h-3 w-3" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div aria-hidden="true">
                  <Vignette v={goal.vignette} example={copy.example} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <blockquote className="partner-quote">
          <p>{copy.partner}</p>
        </blockquote>
      </div>
    </section>
  );
}
