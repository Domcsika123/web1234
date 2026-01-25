import React from 'react';
import { Button } from './ui/button';
import { heroData } from '../mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ onCtaClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="Team collaboration"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title mb-4 md:mb-6">{heroData.headline}</h1>
        <p className="body-large mb-8 md:mb-12 max-w-2xl text-neutral-light text-base md:text-xl">
          {heroData.subheadline}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            onClick={onCtaClick}
            className="btn-primary group"
            size="lg"
          >
            {heroData.cta}
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
            {heroData.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
