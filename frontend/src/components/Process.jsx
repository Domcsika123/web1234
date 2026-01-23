import React from 'react';
import { process } from '../mockData';
import { ClipboardList, Layers, Code, Rocket, Headphones } from 'lucide-react';

const iconMap = {
  1: ClipboardList,
  2: Layers,
  3: Code,
  4: Rocket,
  5: Headphones
};

const Process = () => {
  return (
    <section className="py-32 px-8 bg-card relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Hogyan dolgozunk</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Átlátható, gyors, kiszámítható folyamat – mindig tudod, hol tartunk
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, index) => {
              const Icon = iconMap[step.id];
              const isLast = index === process.length - 1;
              
              return (
                <div key={step.id} className="relative">
                  {/* Connecting line */}
                  {!isLast && (
                    <div className="hidden md:block absolute top-16 left-[calc(50%+50px)] w-[calc(100%-50px)] h-0.5 bg-gradient-to-r from-brand-primary/50 to-border-medium z-0"></div>
                  )}
                  
                  {/* Card */}
                  <div className="relative z-10 group">
                    {/* Number badge */}
                    <div className="absolute -top-3 -left-3 z-20">
                      <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl font-black text-text-inverse">{step.step}</span>
                      </div>
                    </div>
                    
                    {/* Icon circle */}
                    <div className="flex justify-center mb-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary-olive to-border-medium flex items-center justify-center border-4 border-card group-hover:border-brand-primary transition-all duration-300 group-hover:scale-105">
                        <Icon className="w-14 h-14 text-brand-primary" />
                      </div>
                    </div>
                    
                    {/* Content card */}
                    <div className="bg-page rounded-xl p-6 border border-border-medium group-hover:border-brand-primary transition-all duration-300 min-h-[200px] flex flex-col">
                      <h3 className="heading-6 mb-3 text-primary text-center">{step.title}</h3>
                      <p className="body-small text-secondary text-center flex-1">{step.description}</p>
                      
                      {/* Progress indicator */}
                      <div className="mt-4 pt-4 border-t border-border-medium">
                        <div className="w-full bg-border-medium rounded-full h-1.5">
                          <div 
                            className="bg-brand-primary h-1.5 rounded-full transition-all duration-500 group-hover:w-full"
                            style={{ width: `${(index + 1) * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="caption text-primary">2-4 hét átfutási idő</span>
              </div>
              <div className="w-px h-6 bg-border-medium"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="caption text-primary">5 egyértelmű lépés</span>
              </div>
              <div className="w-px h-6 bg-border-medium"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <span className="caption text-primary">30 napos garancia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
