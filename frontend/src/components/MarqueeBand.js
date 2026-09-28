import { Marquee } from './fx';

// Two crossing, tilted ribbons of services / industries.
export const MarqueeBand = ({ content }) => (
  <section className="relative py-16 lg:py-24 overflow-hidden" aria-label={content.label}>
    <div className="relative isolate -mx-4">
      <div className="-rotate-[3deg] scale-[1.03] bg-[#00FF00] py-4 lg:py-5 shadow-[0_0_60px_rgba(0,255,0,0.35)]">
        <Marquee
          items={content.primary}
          speed={38}
          itemClassName="text-[#050505] font-black uppercase tracking-tight text-2xl lg:text-4xl"
          separator="✦"
        />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[2.5deg] scale-[1.03] border-y border-white/10 bg-[#0c0c0c]/95 py-3 lg:py-4 backdrop-blur -z-10">
        <Marquee
          items={content.secondary}
          reverse
          speed={48}
          itemClassName="text-white/50 font-mono uppercase tracking-[0.2em] text-sm lg:text-base"
          separator="//"
        />
      </div>
    </div>
  </section>
);
