import React from 'react';
import { testimonials } from '../mockData';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-32 px-8 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Ügyfeleink mondják</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto">
            Valós visszajelzések magyar vállalkozóktól
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="team-card p-8 rounded-xl border border-border-medium hover:bg-border-medium transition-all duration-300"
            >
              <Quote className="h-10 w-10 text-brand-primary mb-6" />
              <p className="body-medium text-primary mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-primary text-brand-primary" />
                ))}
              </div>
              <div>
                <p className="button-text text-primary">{testimonial.name}</p>
                <p className="caption text-secondary">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
