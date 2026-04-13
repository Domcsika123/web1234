import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';

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
      className={`inline-flex items-center gap-1 rounded-full border border-[#ffffff1f] bg-[#111111cc] p-1 backdrop-blur ${compact ? 'w-fit' : ''}`}
      aria-label={content.languageLabel}
      role="group"
    >
      {options.map((option) => {
        const isActive = lang === option.key;
        return (
          <motion.button
            key={option.key}
            type="button"
            onClick={() => setLang(option.key)}
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${isActive
              ? 'bg-[#00FF00] text-[#0A0A0A]'
              : 'text-[#A1A1AA] hover:bg-[#ffffff10] hover:text-white'
              }`}
            whileTap={{ scale: 0.95 }}
            title={option.title}
            aria-pressed={isActive}
            data-testid={`lang-switch-${option.key}`}
          >
            <option.Flag />
            {!compact && <span>{option.label}</span>}
          </motion.button>
        );
      })}
    </div>
  );
};

export const Navbar = ({ lang, setLang, content }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const isMobile = window.innerWidth < 768;
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: isMobile ? 'instant' : 'smooth' });
      }
    }, isMobile ? 350 : 0);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'
          }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              data-testid="navbar-logo"
            >
              <AuraCodeLogo className="h-[62px] w-[62px]" />
              <span className="font-black text-xl tracking-tight" style={{ fontWeight: 900, WebkitTextStroke: '0.35px rgba(255,255,255,0.55)' }}>
                Aura<span className="gradient-text font-black" style={{ fontWeight: 900, WebkitTextStroke: '0.35px rgba(0,255,0,0.4)' }}>Code</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {content.links.map((link) => (
                <motion.button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  className="nav-link-underline text-sm text-[#A1A1AA] hover:text-white transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  data-testid={`nav-link-${link.key}`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <div className="hidden lg:grid grid-cols-[auto_220px] items-center gap-3">
              <LanguageSwitcher lang={lang} setLang={setLang} content={content} />

              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-sm w-[220px] text-center whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="navbar-cta"
              >
                {content.cta}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-24 px-6 lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between rounded-xl border border-[#ffffff14] bg-[#111111] p-3">
                <span className="text-sm font-medium text-[#A1A1AA]">{content.languageLabel}</span>
                <LanguageSwitcher lang={lang} setLang={setLang} content={content} compact />
              </div>

              {content.links.map((link, index) => (
                <motion.button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-semibold text-left text-white hover:text-[#00FF00] transition-colors"
                  data-testid={`mobile-nav-link-${link.key}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: content.links.length * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary text-lg mt-4 w-full"
                  data-testid="mobile-cta"
                >
                  {content.cta}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
