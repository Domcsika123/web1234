import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ReceiptText, ShieldCheck, Users } from 'lucide-react';
import { asset, AuraWords, hasFinePointer, MaskedWords } from './primitives';

const trustIcons = [ShieldCheck, ReceiptText, Users];
const WORD_STAGGER = 55;
const HEADLINE_DELAY = 180;

const saveData = () =>
  typeof navigator !== 'undefined' && Boolean(navigator.connection && navigator.connection.saveData);

/**
 * Sume-generated hero film: phone + laptop showing a live site, slow dolly-in.
 * The clip plays forward then backward (ping-pong), so the loop has no jump.
 * Paused while off screen; a still first frame replaces it for reduced motion
 * and data-saver users.
 */
function DeviceFilm() {
  const reduce = useReducedMotion();
  const videoRef = useRef(null);
  const [playVideo] = useState(() => !saveData());
  const poster = asset('/media/hero-devices-poster.webp');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // React sets `muted` only as a property; set it explicitly so autoplay is allowed everywhere
    video.muted = true;
    video.defaultMuted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce, playVideo]);

  if (reduce || !playVideo) {
    return <img className="hero-core-media" src={poster} alt="" width="1600" height="900" fetchPriority="high" decoding="async" />;
  }

  return (
    <video
      ref={videoRef}
      className="hero-core-media"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src={asset('/media/hero-devices.webm')} type="video/webm" />
      <source src={asset('/media/hero-devices.mp4')} type="video/mp4" />
    </video>
  );
}

export function Hero({ copy }) {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setParallax(!reduce && mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  // Scroll: the core sinks and dims a little as the hero leaves (desktop only,
  // on mobile the hero is taller than the screen and must stay readable).
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 160 : 0]);
  const scrollFade = useTransform(scrollYProgress, [0, 0.9], [1, parallax ? 0.25 : 1]);

  // Cursor: decorative depth on fine pointers, settled by a soft spring
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 60, damping: 18, mass: 0.7 });
  const springY = useSpring(py, { stiffness: 60, damping: 18, mass: 0.7 });
  const coreY = useTransform([scrollY, springY], ([a, b]) => a + b);

  const onPointerMove = (e) => {
    if (!parallax || !hasFinePointer()) return;
    const r = sectionRef.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * -24);
    py.set(((e.clientY - r.top) / r.height - 0.5) * -16);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  const accentDelay = HEADLINE_DELAY + copy.headline.split(' ').length * WORD_STAGGER;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-grid blueprint" aria-hidden="true" />
      <motion.div className="hero-core" style={{ x: springX, y: coreY, opacity: scrollFade }} aria-hidden="true">
        <div className="hero-halo" />
        <div className="hero-core-inner load-fade" style={{ '--d': '100ms' }}>
          <DeviceFilm />
        </div>
      </motion.div>

      <div className="shell relative z-10">
        <div className="hero-copy">
          {/* key: replay the word reveal when the language changes */}
          <h1 id="hero-title" key={copy.headline} className="type-display text-hi">
            <MaskedWords text={copy.headline} baseDelay={HEADLINE_DELAY} stagger={WORD_STAGGER} />{' '}
            <AuraWords text={copy.headlineAccent} animate baseDelay={accentDelay} stagger={WORD_STAGGER} />
          </h1>

          <p className="type-lead hero-sub load-rise" style={{ '--d': '560ms' }}>
            {copy.subtitle}
          </p>

          <div className="hero-actions load-rise" style={{ '--d': '640ms' }}>
            <a href="#contact" className="btn btn-volt">
              {copy.primaryCta}
            </a>
            <a href="#templates" className="btn btn-ghost">
              {copy.secondaryCta}
            </a>
          </div>

          <ul className="hero-trust load-rise" style={{ '--d': '720ms' }} aria-label={copy.trustLabel}>
            {copy.trust.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={item}>
                  <Icon className="h-4 w-4 flex-none text-volt" aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
