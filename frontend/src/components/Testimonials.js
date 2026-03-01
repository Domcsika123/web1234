import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Korrekt, gördülékeny együttműködés volt. Olyan weboldalt kaptunk, ami valóban a mi stílusunkat tükrözi, és a vendégeink is visszajelezték, hogy végre átlátható az étlapunk.',
    name: 'István',
    role: 'Étteremtulajdonos',
  },
  {
    quote: 'Egy ügyvédi irodánál a bizalom a legfontosabb. Olyan letisztult és elegáns weboldalt kaptunk, ami pontosan azt a professzionalizmust tükrözi, amit mi is képviselünk.',
    name: 'Péter',
    role: 'Ügyvédi iroda',
  },
  {
    quote: 'Végre szintet léptünk. Az új weboldal miatt sokkal komolyabban vesznek minket az új tagok, és ez a bérleteladásokon is látszik.',
    name: 'Eszter',
    role: 'Fitness stúdió',
  },
  {
    quote: 'Végre egy csapat, akik nem csak bólogatnak, hanem szakmai tanácsokat is adnak. Olyan funkciókat is beépítettek, amikre én nem is gondoltam.',
    name: 'Gábor',
    role: 'Webshop tulajdonos',
  },
  {
    quote: 'A legnagyobb megváltás az online foglalórendszer volt. Nem kell a kezelés közben a telefont fognom, a vendégek pedig imádják.',
    name: 'Mónika',
    role: 'Kozmetikai szalon',
  },
  {
    quote: 'Régi motorosok vagyunk a szakmában, de a weboldalunkon ez nem látszott. Most már büszkén mutatom meg a projektjeinket az új partnereknek.',
    name: 'László',
    role: 'Építőipari cég',
  },
  {
    quote: 'Gyors, hatékony munka. Pontosan úgy néz ki az oldal, ahogy elképzeltem.',
    name: 'Judit',
    role: 'Személyi edző',
  },
  {
    quote: 'Eddig csak ajánlás útján jöttek hozzánk, de mióta elkészült az új oldal, rengeteg új ember keres meg minket a környékről.',
    name: 'Tamás',
    role: 'Autószerviz',
  },
];

const TestimonialCard = ({ testimonial, index }) => (
  <div
    className="testimonial-card flex-shrink-0 w-[350px] p-6 rounded-xl mx-3"
    data-testid={`testimonial-card-${index}`}
  >
    <Quote className="w-8 h-8 text-[#00FF00] mb-4 opacity-50" />

    <p className="text-[#A1A1AA] leading-relaxed mb-6 text-sm">
      "{testimonial.quote}"
    </p>

    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#00FF00] text-[#00FF00]" />
      ))}
    </div>

    <div>
      <p className="font-bold text-white">{testimonial.name}</p>
      <p className="text-[#52525B] text-sm">{testimonial.role}</p>
    </div>
  </div>
);

export const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#121212]"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-base text-[#00FF00] tracking-wider">
            06 // ÜGYFELEINK MONDJÁK
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="testimonials-headline">
            Visszajelzések{' '}
            <span className="gradient-text">magyar vállalkozóktól</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121212] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121212] to-transparent z-10" />

        {/* First row - left to right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex mb-6 hide-scrollbar"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex"
          >
            {duplicatedTestimonials.slice(0, 8).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Second row - right to left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex hide-scrollbar"
        >
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex"
          >
            {duplicatedTestimonials.slice(4, 12).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index + 8} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
