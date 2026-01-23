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
    <header className="fixed top-0 left-0 right-0 z-50 bg-page/80 backdrop-blur-lg border-b border-border-medium">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="heading-4 text-brand-primary hover:opacity-80 transition-opacity cursor-pointer"
            >
              WebForge
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nav-link">
              Főlap
            </button>
            <button onClick={() => scrollToSection('case-studies')} className="nav-link">
              Referenciák
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
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
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left nav-link py-3"
            >
              Főlap
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className="block w-full text-left nav-link py-3"
            >
              Referenciák
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left nav-link py-3"
            >
              Kapcsolat
            </button>
            <Button onClick={onCtaClick} className="btn-primary w-full mt-4">
              Ingyenes konzultáció
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
