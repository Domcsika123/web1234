import React from 'react';
import { whyUs } from '../mockData';
import { Award } from 'lucide-react';

const WhyUs = () => {
  return (
    <section className="py-32 px-8 bg-page">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Miért minket válassz?</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Nem csak készítünk weboldalt – part nerek vagyunk a sikerben
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item) => (
            <div
              key={item.id}
              className="text-center p-8 rounded-xl border border-border-medium bg-card hover:bg-border-medium transition-all duration-300 hover:scale-105"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary">
                <Award className="h-8 w-8 text-text-inverse" />
              </div>
              <h3 className="heading-5 mb-3 text-primary">{item.title}</h3>
              <p className="body-small text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
