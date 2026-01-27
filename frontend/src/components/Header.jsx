import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Header = ({ onCtaClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-lg border-b-2 border-brand-primary/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-2 md:py-2.5">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/logo.svg" alt="AuraCode Logo" className="h-8 md:h-10 w-auto" />
              <span className="heading-4 text-lg md:text-xl">
                <span className="text-white">Aura</span>
                <span className="text-brand-primary">Code</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-[#302f2c]/20 backdrop-blur-sm rounded-2xl px-2 py-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1 min-w-[140px] text-brand-primary uppercase font-semibold transition-all duration-300 px-4 py-2 rounded-xl shadow-2xl shadow-brand-primary/0 hover:bg-[#302f2c]/80 hover:shadow-brand-primary/60 hover:scale-105 text-center">
              Kezdőlap
            </button>
            <button onClick={() => scrollToSection('case-studies')} className="flex-1 min-w-[140px] text-brand-primary uppercase font-semibold transition-all duration-300 px-4 py-2 rounded-xl shadow-2xl shadow-brand-primary/0 hover:bg-[#302f2c]/80 hover:shadow-brand-primary/60 hover:scale-105 text-center">
              Referenciák
            </button>
            <button onClick={() => scrollToSection('contact')} className="flex-1 min-w-[140px] text-brand-primary uppercase font-semibold transition-all duration-300 px-4 py-2 rounded-xl shadow-2xl shadow-brand-primary/0 hover:bg-[#302f2c]/80 hover:shadow-brand-primary/60 hover:scale-105 text-center">
              Kapcsolat
            </button>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button onClick={onCtaClick} className="btn-primary">
              Ingyenes konzultáció
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary p-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left nav-link py-2 text-sm"
            >
              Kezdőlap
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className="block w-full text-left nav-link py-2 text-sm"
            >
              Referenciák
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left nav-link py-2 text-sm"
            >
              Kapcsolat
            </button>
            <Button onClick={onCtaClick} className="btn-primary w-full mt-3 text-sm">
              Ingyenes konzultáció
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
