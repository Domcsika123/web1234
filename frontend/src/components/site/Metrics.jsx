import { Check } from 'lucide-react';
import { ChapterHeading, useCountUp, useInViewOnce } from './primitives';

function MetricShell({ item, display, children }) {
  return (
    <div className="metric-cell">
      <p className="metric-value">
        <span aria-hidden="true" className="tabular">
          {display}
        </span>
        <span aria-hidden="true" className="metric-unit" data-symbol={item.unit === '×'}>
          {item.unit}
        </span>
        <span className="sr-only">
          {item.value} {item.unit} {item.label}
        </span>
      </p>
      <p className="mt-2 text-lg font-semibold text-hi" aria-hidden="true">
        {item.label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-lo">{item.description}</p>
      <div className="mt-auto pt-8" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

function WeeksMetric({ item, run }) {
  return (
    <MetricShell item={item} display={item.value}>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n}>
            <span className="metric-track">
              <span className="metric-fill" data-run={run} style={{ transitionDelay: `${180 + n * 150}ms` }} />
            </span>
            <span className="mt-2 flex items-center gap-1 text-fine text-lo">
              {item.weekLabel(n)}
              {n === 4 && <Check className="h-3 w-3 text-volt" />}
            </span>
          </div>
        ))}
      </div>
    </MetricShell>
  );
}

const TICKS = 30;

// Returned as a plain array (no wrapping element) so the dev-only visual-edits
// Babel plugin cannot inject an HTML <span> inside the <svg>, which would hide the ticks.
function DialTicks({ lit }) {
  return Array.from({ length: TICKS }, (_, i) => {
    const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
    return (
      <line
        key={i}
        x1={60 + Math.cos(a) * 42}
        y1={60 + Math.sin(a) * 42}
        x2={60 + Math.cos(a) * 54}
        y2={60 + Math.sin(a) * 54}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="metric-tick"
        data-lit={i < lit}
      />
    );
  });
}

function GuaranteeMetric({ item, run }) {
  const count = useCountUp(item.value, run, 1500);
  return (
    <MetricShell item={item} display={count}>
      <svg viewBox="0 0 120 120" className="h-28 w-28">
        <DialTicks lit={count} />
        <circle cx="60" cy="60" r="28" className="metric-dial" />
        <path d="M49 60.5l7.5 7.5L72 52.5" className="metric-dial-check" data-done={count >= item.value} />
      </svg>
    </MetricShell>
  );
}

function ConversionMetric({ item, run }) {
  const count = useCountUp(item.value, run, 1200);
  return (
    <MetricShell item={item} display={Math.max(1, count)}>
      <div className="flex h-28 items-end gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex h-full flex-1 flex-col justify-end gap-2">
            <span
              className={`metric-bar ${n === 3 ? 'bg-aura' : ''}`}
              data-run={run}
              style={{ height: `${n * 33}%`, transitionDelay: `${200 + n * 160}ms` }}
            />
            <span className="text-fine text-lo">{n}×</span>
          </div>
        ))}
      </div>
    </MetricShell>
  );
}

export function Metrics({ copy }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });
  const [weeks, guarantee, conversion] = copy.items;
  return (
    <section id="results" className="chapter" aria-labelledby="results-title">
      <div className="shell">
        <ChapterHeading id="results-title" index={copy.index} label={copy.label} title={copy.title} />
        <div ref={ref} className="surface-panel metric-bar-grid mt-12 lg:mt-14">
          <WeeksMetric item={weeks} run={inView} />
          <GuaranteeMetric item={guarantee} run={inView} />
          <ConversionMetric item={conversion} run={inView} />
        </div>
      </div>
    </section>
  );
}
