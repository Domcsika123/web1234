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
            Nem csak készítünk weboldalt – partnerek vagyunk a sikerben
          </p>
        </div>
        
        {/* Top Image Section */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-border-medium shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80" 
            alt="Csapat együttműködés"
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
        
        {/* Bottom Image Section with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-border-medium shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" 
              alt="Modern munkakörnyezet"
              className="w-full h-[350px] object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="heading-4 text-primary mb-6">Tapasztalat, amiben megbízhatsz</h3>
            
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border-medium">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-2xl font-black text-brand-primary">50+</span>
              </div>
              <div>
                <h4 className="heading-6 text-primary mb-2">Sikeres projekt</h4>
                <p className="body-small text-secondary">Magyar KKV-k számára készített weboldal</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border-medium">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-2xl font-black text-brand-primary">98%</span>
              </div>
              <div>
                <h4 className="heading-6 text-primary mb-2">Elégedett ügyfelek</h4>
                <p className="body-small text-secondary">Ügyfeleink ajánlanák szolgáltatásunkat</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border-medium">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-2xl font-black text-brand-primary">24h</span>
              </div>
              <div>
                <h4 className="heading-6 text-primary mb-2">Válaszidő</h4>
                <p className="body-small text-secondary">Garantált gyors reagálás minden kérdésre</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
