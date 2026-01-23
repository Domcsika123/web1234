import React from 'react';
import { process } from '../mockData';
import { CheckCircle2 } from 'lucide-react';

const Process = () => {
  return (
    <section className="py-32 px-8 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Hogyan dolgozunk</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Átlátható, gyors, kiszámítható folyamat – mindig tudod, hol tartunk
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border-medium transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {process.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="inline-block mb-4">
                    <span className="text-6xl font-black text-brand-primary/20">{step.step}</span>
                  </div>
                  <h3 className="heading-4 mb-4 text-primary">{step.title}</h3>
                  <p className="body-medium text-secondary">{step.description}</p>
                </div>
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary shadow-lg">
                  <CheckCircle2 className="h-10 w-10 text-text-inverse" />
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
