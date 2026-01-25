import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = ({ onCtaClick }) => {
  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-gradient-to-br from-secondary-olive via-page to-page relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8">
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-brand-primary" />
          <span className="caption text-brand-primary font-bold text-xs md:text-sm">KÉSZEN ÁLL</span>
        </div>
        <h2 className="heading-2 mb-4 md:mb-6 text-primary">
          Indítsuk el a projektedet!
        </h2>
        <p className="body-large text-secondary mb-8 md:mb-12 max-w-2xl mx-auto px-2">
          Ingyenes konzultációban megbeszéljük a céljaidat, és készítünk egy egyéni árajánlatot. 
          Nincs kötelezettség, csak lehetőségek.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Button
            onClick={onCtaClick}
            className="btn-primary group"
            size="lg"
          >
            Ingyenes konzultáció
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={() => {
              document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="outline"
            className="btn-secondary"
            size="lg"
          >
            Referenciák megtekintése
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-10 md:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 text-secondary">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
            <span className="caption text-xs md:text-sm">24 órán belül válaszolunk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
            <span className="caption text-xs md:text-sm">Nincs kötelezettség</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
            <span className="caption text-xs md:text-sm">30 napos garancia</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
