import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';

const navLinks = [
  { name: 'Szolgáltatások', href: '#services' },
  { name: 'Folyamat', href: '#process' },
  { name: 'GYIK', href: '#faq' },
];

export const Navbar = () => {
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
              <AuraCodeLogo className="h-10 w-10" />
              <span className="font-extrabold text-xl tracking-tight">
                Aura<span className="gradient-text font-extrabold">Code</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="navbar-cta"
              >
                Ingyenes konzultáció
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
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-semibold text-left text-white hover:text-[#00FF00] transition-colors"
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary text-lg mt-4 w-full"
                  data-testid="mobile-cta"
                >
                  Ingyenes konzultáció
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
