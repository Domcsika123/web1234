import { Fragment, useEffect, useRef, useState } from 'react';

/** Public asset path that respects CRA's PUBLIC_URL. */
export const asset = (path) => `${process.env.PUBLIC_URL || ''}${path}`;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Scroll to an in-page anchor; CSS scroll-padding keeps it clear of the fixed nav. */
export function scrollToHash(hash, { updateUrl = true } = {}) {
  const id = hash.replace(/^#/, '');
  const el = id ? document.getElementById(id) : null;
  if (!el) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    if (updateUrl) window.history.replaceState(null, '', window.location.pathname);
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  if (updateUrl) window.history.replaceState(null, '', `#${id}`);
}

/** True once the element has entered the viewport; never flips back. */
export function useInViewOnce({ rootMargin = '0px 0px -12% 0px', threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin, threshold]);

  return [ref, inView];
}

/** "01 // Szemléletünk" — the number and slashes are decoration for screen readers. */
export function ChapterMark({ index, label, className = '' }) {
  return (
    <p className={`chapter-mark ${className}`}>
      <span className="n" aria-hidden="true">{index}</span>
      <span className="s" aria-hidden="true">{'//'}</span>
      <span>{label}</span>
    </p>
  );
}

/**
 * Gradient words. Each word gets its own slice of the volt→ion ramp so the
 * gradient reads as one sweep even though every word sits in its own mask.
 */
export function AuraWords({ text, animate = false, baseDelay = 0, stagger = 50 }) {
  const words = String(text).split(' ');
  return words.map((word, i) => {
    const g0 = `${Math.round((i / words.length) * 100)}%`;
    const g1 = `${Math.round(((i + 1) / words.length) * 100)}%`;
    const style = { '--g0': g0, '--g1': g1 };
    // Spaces stay outside the inline-block masks, or the line box trims them
    const space = i < words.length - 1 ? ' ' : '';
    if (!animate) {
      return (
        <Fragment key={i}>
          <span className="text-aura" style={style}>
            {word}
          </span>
          {space}
        </Fragment>
      );
    }
    return (
      <Fragment key={i}>
        <span className="word-mask">
          <span className="text-aura" style={{ ...style, '--d': `${baseDelay + i * stagger}ms` }}>
            {word}
          </span>
        </span>
        {space}
      </Fragment>
    );
  });
}

/** Plain words that slide up inside masks during the page-load sequence. */
export function MaskedWords({ text, baseDelay = 0, stagger = 50 }) {
  return String(text)
    .split(' ')
    .map((word, i, arr) => (
      <Fragment key={i}>
        <span className="word-mask">
          <span style={{ '--d': `${baseDelay + i * stagger}ms` }}>{word}</span>
        </span>
        {i < arr.length - 1 ? ' ' : ''}
      </Fragment>
    ));
}

/**
 * Chapter heading: code-comment marker, title, optional lead.
 * Reveals once when it scrolls into view (CSS transition on [data-shown]).
 */
export function ChapterHeading({ index, label, title, titleAccent, intro, lead, id, className = '', children }) {
  const [ref, shown] = useInViewOnce();
  return (
    <header ref={ref} className={`max-w-3xl ${className}`}>
      <div className="reveal" data-shown={shown}>
        <ChapterMark index={index} label={label} />
      </div>
      {intro && (
        <p className="reveal mt-6 text-base text-lo" data-shown={shown} style={{ '--d': '60ms' }}>
          {intro}
        </p>
      )}
      <h2 id={id} className={`reveal type-h2 text-hi ${intro ? 'mt-3' : 'mt-5'}`} data-shown={shown} style={{ '--d': '90ms' }}>
        {title}
        {titleAccent && (
          <>
            {' '}
            <AuraWords text={titleAccent} />
          </>
        )}
      </h2>
      {lead && (
        <p className="reveal type-lead mt-5 max-w-measure" data-shown={shown} style={{ '--d': '160ms' }}>
          {lead}
        </p>
      )}
      {children}
    </header>
  );
}

/** Count from 0 to `to` once `run` turns true (ease-out cubic). */
export function useCountUp(to, run, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (prefersReducedMotion()) {
      setValue(to);
      return undefined;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, duration]);
  return value;
}

/** Which section is in the middle band of the viewport (for nav + chapter rail). */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = key.split('|').find((id) => visible.get(id));
        setActive(current || null);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    key.split('|').forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);

  return active;
}
