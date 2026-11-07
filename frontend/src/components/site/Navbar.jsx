import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';

const EASE_OUT = [0.23, 1, 0.32, 1];
const EASE_IN_OUT = [0.77, 0, 0.175, 1];
const LANGS = ['hu', 'en'];

function LangSwitch({ lang, setLang, copy, className = '' }) {
  return (
    <div role="group" aria-label={copy.language} className={`lang-switch ${className}`}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className="lang-option"
        >
          {code.toUpperCase()}
          <span className="sr-only"> – {copy.langNames[code]}</span>
        </button>
      ))}
    </div>
  );
}

export function Navbar({ copy, lang, setLang, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the menu is open the rest of the page is inert, scroll is locked,
  // Escape closes it and focus starts on the first link.
  useEffect(() => {
    if (!open) return undefined;
    const outside = ['#main', 'footer', '.chapter-rail', '.skip-link']
      .map((s) => document.querySelector(s))
      .filter(Boolean);
    outside.forEach((el) => el.setAttribute('inert', ''));
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => panelRef.current?.querySelector('a')?.focus(), 80);
    return () => {
      outside.forEach((el) => el.removeAttribute('inert'));
      root.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Leaving the mobile breakpoint closes the menu
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setOpen(false);

  const reveal = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: 'circle(0% at calc(100% - 42px) 36px)' },
        animate: { clipPath: 'circle(150% at calc(100% - 42px) 36px)' },
        exit: { clipPath: 'circle(0% at calc(100% - 42px) 36px)' },
      };

  return (
    <header className="site-header" data-scrolled={scrolled && !open}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.menuTitle}
            className="mobile-menu lg:hidden"
            {...reveal}
            transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE_IN_OUT }}
          >
            <nav aria-label={copy.primary} className="shell flex h-full flex-col pb-10 pt-[calc(var(--nav-h)+24px)]">
              <ul className="flex flex-col">
                {copy.links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + i * 0.05, duration: 0.32, ease: EASE_OUT }}
                    className="border-b border-line"
                  >
                    <a href={`#${link.id}`} onClick={closeMenu} className="mobile-link">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36, duration: 0.3 }}
                className="mt-auto space-y-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lo">{copy.language}</span>
                  <LangSwitch lang={lang} setLang={setLang} copy={copy} />
                </div>
                <div className="space-y-3 text-base text-mid">
                  <p className="text-sm text-lo">{copy.contactTitle}</p>
                  <a href="mailto:info@auracode.hu" className="flex items-center gap-3 hover:text-hi">
                    <Mail className="h-4 w-4 text-volt" aria-hidden="true" /> info@auracode.hu
                  </a>
                  <a href="tel:+36306489678" className="flex items-center gap-3 hover:text-hi">
                    <Phone className="h-4 w-4 text-volt" aria-hidden="true" /> +36 30 648 9678
                  </a>
                </div>
                <a href="#contact" onClick={closeMenu} className="btn btn-volt w-full">
                  {copy.cta}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="site-header-bar">
        <div className="nav-backdrop" aria-hidden="true" />
        <div className="shell load-fade relative flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a href="#top" aria-label={copy.home} className="nav-home" onClick={closeMenu}>
            <Logo size={34} />
          </a>

          <nav aria-label={copy.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {copy.links.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="nav-link" data-active={isActive}>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="nav-link-indicator"
                          transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LangSwitch lang={lang} setLang={setLang} copy={copy} />
            <a href="#contact" className="btn btn-volt btn-sm">
              {copy.cta}
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.menuClose : copy.menuOpen}
            data-open={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </button>
        </div>
      </div>
    </header>
  );
}
