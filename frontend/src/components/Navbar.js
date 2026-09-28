import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';
import { Magnetic } from './fx';

const FlagHungary = () => (
  <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px]" aria-hidden="true">
    <rect width="24" height="16" fill="#ffffff" />
    <rect width="24" height="5.33" y="0" fill="#CE2939" />
    <rect width="24" height="5.33" y="10.67" fill="#477050" />
  </svg>
);

const FlagUK = () => (
  <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px]" aria-hidden="true">
    <rect width="24" height="16" fill="#012169" />
    <path d="M0 0l10 6.5M24 0l-10 6.5M0 16l10-6.5M24 16l-10-6.5" stroke="#ffffff" strokeWidth="3" />
    <path d="M0 0l10 6.5M24 0l-10 6.5M0 16l10-6.5M24 16l-10-6.5" stroke="#C8102E" strokeWidth="1.4" />
    <rect x="10" width="4" height="16" fill="#ffffff" />
    <rect y="6" width="24" height="4" fill="#ffffff" />
    <rect x="10.8" width="2.4" height="16" fill="#C8102E" />
    <rect y="6.8" width="24" height="2.4" fill="#C8102E" />
  </svg>
);

const LanguageSwitcher = ({ lang, setLang, content, compact = false }) => {
  const options = [
    { key: 'hu', label: 'HU', title: content.langHu, Flag: FlagHungary },
    { key: 'en', label: 'EN', title: content.langEn, Flag: FlagUK },
  ];

  return (
    <div
      className="relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1"
      aria-label={content.languageLabel}
      role="group"
    >
      {options.map((option) => {
        const isActive = lang === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => setLang(option.key)}
            className={`relative inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${isActive ? 'text-[#0A0A0A]' : 'text-[#A1A1AA] hover:text-white'}`}
            title={option.title}
            aria-pressed={isActive}
            data-testid={`lang-switch-${option.key}`}
          >
            {isActive && (
              <motion.span
                layoutId={compact ? 'lang-pill-mobile' : 'lang-pill'}
                className="absolute inset-0 rounded-full bg-[#00FF00]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative"><option.Flag /></span>
            {!compact && <span className="relative">{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

const useActiveSection = (ids) => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
};

export const Navbar = ({ lang, setLang, content, ready = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [sectionIds] = useState(() => content.links.map((l) => l.href.slice(1)));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const scrollToSection = (href) => {
    const isMobile = window.innerWidth < 1024;
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: isMobile ? 'instant' : 'smooth' });
      }
    }, isMobile ? 350 : 0);
  };

  const highlight = hovered ?? activeSection;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 lg:pt-4"
        data-testid="navbar"
      >
        <div
          className={`mx-auto flex items-center justify-between rounded-2xl border transition-all duration-500 ${
            isScrolled
              ? 'max-w-6xl h-16 px-4 lg:px-5 border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]'
              : 'max-w-7xl h-20 px-2 lg:px-8 border-transparent bg-transparent'
          }`}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5"
            data-testid="navbar-logo"
          >
            <AuraCodeLogo className={`transition-all duration-500 ${isScrolled ? 'h-11 w-11' : 'h-[56px] w-[56px]'}`} />
            <span className="font-black text-xl tracking-tight" style={{ fontWeight: 900, WebkitTextStroke: '0.35px rgba(255,255,255,0.55)' }}>
              Aura<span className="gradient-text font-black" style={{ fontWeight: 900, WebkitTextStroke: '0.35px rgba(0,255,0,0.4)' }}>Code</span>
            </span>
          </a>

          <div
            className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1"
            onMouseLeave={() => setHovered(null)}
          >
            {content.links.map((link) => {
              const id = link.href.slice(1);
              const isHi = highlight === id;
              return (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHovered(id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${isHi ? 'text-white' : 'text-[#A1A1AA] hover:text-white'}`}
                  data-testid={`nav-link-${link.key}`}
                >
                  {isHi && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-[#00FF00]/30 bg-[#00FF00]/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher lang={lang} setLang={setLang} content={content} />
            <Magnetic strength={0.2}>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap flex items-center gap-2 group"
                data-testid="navbar-cta"
              >
                {content.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/10 bg-black/40 text-white backdrop-blur"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
            data-testid="mobile-menu-toggle"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block w-5 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="block w-5 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="block w-5 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-[#060606] px-6 pt-28 pb-10 lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="aurora aurora-green w-80 h-80 -bottom-20 -left-20 opacity-40" />
            <nav className="relative flex flex-col">
              {content.links.map((link, index) => (
                <motion.button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4 text-left"
                  data-testid={`mobile-nav-link-${link.key}`}
                >
                  <span className="font-mono text-xs text-[#00FF00]/60">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-4xl font-bold text-white transition-colors group-active:text-[#00FF00]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {link.name}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative mt-auto space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#A1A1AA]">{content.languageLabel}</span>
                <LanguageSwitcher lang={lang} setLang={setLang} content={content} compact />
              </div>
              <div className="flex flex-col gap-2 text-sm text-[#A1A1AA]">
                <a href="mailto:info@auracode.hu" className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#00FF00]" />info@auracode.hu</a>
                <a href="tel:+36306489678" className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#00FF00]" />+36 30 648 9678</a>
              </div>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-lg w-full flex items-center justify-center gap-2"
                data-testid="mobile-cta"
              >
                {content.cta}
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
