import { useRef } from 'react';
import { BarChart3, Check, Lock, MousePointer2, MousePointerClick, Search, ShieldCheck, Wrench, Zap } from 'lucide-react';
import { ChapterHeading } from './primitives';

const icons = {
  speed: Zap,
  seo: Search,
  conversion: MousePointerClick,
  analytics: BarChart3,
  security: ShieldCheck,
  care: Wrench,
};

// Mirrored bento: wide / narrow / narrow, then narrow / narrow / wide
const spans = {
  speed: 'lg:col-span-6',
  seo: 'lg:col-span-3',
  conversion: 'lg:col-span-3',
  analytics: 'lg:col-span-3',
  security: 'lg:col-span-3',
  care: 'lg:col-span-6',
};
const wide = new Set(['speed', 'care']);

/* ── Micro-illustrations: each card shows its promise working ── */

function SpeedViz({ viz }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {viz.weeks.map((w, i) => (
          <div key={w} className="space-y-2">
            <span className="feature-seg" data-step={i} />
            <span className="block text-fine text-lo">{w}</span>
          </div>
        ))}
      </div>
      <span className="feature-chip">
        <Check className="h-3.5 w-3.5 text-volt" />
        {viz.done}
      </span>
    </div>
  );
}

function SeoViz({ viz }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="grid grid-cols-3 gap-3">
      {viz.metrics.map((m, i) => (
        <div key={m} className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
            <circle cx="28" cy="28" r={r} className="gauge-track" />
            <circle
              cx="28"
              cy="28"
              r={r}
              className="gauge-value"
              strokeDasharray={c}
              strokeDashoffset={c * (0.06 + i * 0.03)}
            />
          </svg>
          <span className="font-code text-fine text-mid">{m}</span>
          <span className="text-fine font-medium text-volt">{viz.good}</span>
        </div>
      ))}
    </div>
  );
}

function ConversionViz({ viz }) {
  return (
    <div className="conversion-viz">
      <span className="conversion-btn">{viz.button}</span>
      <span className="conversion-ripple" />
      <MousePointer2 className="conversion-cursor h-5 w-5" />
    </div>
  );
}

function AnalyticsViz({ viz }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-fine text-lo">
        <span>{viz.label}</span>
        <span>{viz.period}</span>
      </div>
      <svg viewBox="0 0 240 80" className="h-20 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spark-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" style={{ stopColor: 'var(--volt)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--ion)' }} />
          </linearGradient>
          <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--ion)', stopOpacity: 0.22 }} />
            <stop offset="100%" style={{ stopColor: 'var(--ion)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path
          d="M0 66 L24 60 L48 63 L72 50 L96 54 L120 40 L144 44 L168 30 L192 33 L216 18 L240 12 L240 80 L0 80 Z"
          fill="url(#spark-fill)"
        />
        <path
          d="M0 66 L24 60 L48 63 L72 50 L96 54 L120 40 L144 44 L168 30 L192 33 L216 18 L240 12"
          fill="none"
          stroke="url(#spark-stroke)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="spark-line"
          pathLength="1"
        />
      </svg>
    </div>
  );
}

function SecurityViz({ viz }) {
  return (
    <div className="space-y-3">
      <div className="url-bar">
        <Lock className="h-4 w-4 flex-none text-volt" />
        <span className="truncate font-code text-fine text-mid">
          <span className="text-lo">https://</span>
          {viz.url}
        </span>
        <span className="ml-auto flex-none rounded-pill bg-volt/10 px-2 py-0.5 font-code text-fine text-volt">SSL</span>
      </div>
      <p className="flex items-center gap-2 text-fine text-lo">
        <ShieldCheck className="h-3.5 w-3.5 text-volt" />
        {viz.secure}
      </p>
    </div>
  );
}

function CareViz({ viz }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-sm font-medium text-hi">
          <span className="pulse-dot" />
          {viz.status}
        </span>
        <span className="font-code text-fine text-lo">{viz.days}</span>
      </div>
      <div className="flex h-10 items-end gap-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="uptime-tick" style={{ height: `${70 + ((i * 37) % 30)}%` }} />
        ))}
      </div>
    </div>
  );
}

const vizzes = { speed: SpeedViz, seo: SeoViz, conversion: ConversionViz, analytics: AnalyticsViz, security: SecurityViz, care: CareViz };

function FeatureCard({ item }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const Icon = icons[item.key];
  const Viz = vizzes[item.key];
  const isWide = wide.has(item.key);

  // Cursor spotlight: the card's own pseudo-elements read --mx/--my (batched per frame)
  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || frame.current) return;
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - r.left}px`);
      el.style.setProperty('--my', `${clientY - r.top}px`);
      frame.current = 0;
    });
  };

  return (
    <li
      ref={ref}
      onPointerMove={onPointerMove}
      className={`glow-card group flex flex-col p-6 sm:p-7 lg:p-8 ${spans[item.key]} ${
        isWide ? 'lg:flex-row lg:items-stretch lg:gap-10' : ''
      }`}
    >
      <div className={isWide ? 'lg:w-[44%] lg:flex-none' : ''}>
        <span className="icon-tile">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="type-h3 mt-5 text-hi">{item.title}</h3>
        <p className="type-body mt-3">{item.description}</p>
      </div>
      {/* Text stays top-aligned with its row, the illustration sits on the bottom edge */}
      <div className={isWide ? 'mt-8 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-end' : 'mt-auto pt-8'} aria-hidden="true">
        <div className="feature-viz">
          <Viz viz={item.viz} />
        </div>
      </div>
    </li>
  );
}

export function Features({ copy }) {
  return (
    <section id="services" className="chapter" aria-labelledby="services-title">
      <div className="shell">
        <ChapterHeading id="services-title" index={copy.index} label={copy.label} title={copy.title} lead={copy.lead} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {copy.items.map((item) => (
            <FeatureCard key={item.key} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
