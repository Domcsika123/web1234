import React from 'react';
import { features } from '../mockData';
import { Zap, Search, Smartphone, BarChart3, Shield, Wrench, Gauge, Target } from 'lucide-react';

const iconMap = {
  1: Zap,
  2: Search,
  3: Smartphone,
  4: BarChart3,
  5: Shield,
  6: Wrench,
  7: Gauge,
  8: Target
};

const Features = () => {
  return (
    <section className="py-32 px-8 bg-page">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Amit kapsz tőlünk</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Nem csak egy weboldalt, hanem egy működő ügyfélszerző rendszert – minden fontos elemmel
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.id];
            return (
              <div
                key={feature.id}
                className="feature-card group p-8 rounded-xl border border-border-medium bg-card hover:bg-border-medium transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/10">
                  <Icon className="h-7 w-7 text-brand-primary" />
                </div>
                <h3 className="heading-5 mb-3 text-primary">{feature.title}</h3>
                <p className="body-small text-secondary">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
