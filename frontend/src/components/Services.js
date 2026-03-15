import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Wrench, Target, Zap, Search, BarChart3 } from 'lucide-react';

// Bento grid configuration with size variants and visual prominence
const services = [
  {
    icon: Zap,
    title: 'Gyors kivitelezés',
    description: 'Rövid átfutás, transzparens kivitelezés, gyors élesítés. Projektjeid 1-4 hét alatt elkészülnek.',
    size: 'featured',
    gridArea: 'featured1',
  },
  {
    icon: Search,
    title: 'SEO-alapok beépítve',
    description: 'Technikai SEO-val és villámgyors betöltéssel biztosítjuk, hogy vevőid könnyen rátaláljanak. Google-barát struktúra alapból.',
    size: 'featured',
    gridArea: 'featured2',
  },
  {
    icon: Target,
    title: 'Konverzió-fókusz',
    description: 'Nem csak szép, hanem eredményes – minden elem az ügyfélszerzésért dolgozik.',
    size: 'medium',
    gridArea: 'medium1',
  },
  {
    icon: BarChart3,
    title: 'Mérés beépítve',
    description: 'Precíz analitikát állítunk be, hogy minden adatot láss a látogatók viselkedéséről.',
    size: 'medium',
    gridArea: 'medium2',
  },
  {
    icon: Shield,
    title: 'Biztonság',
    description: 'Teljes körű adatvédelem és maximális védelem.',
    size: 'small',
    gridArea: 'small1',
  },
  {
    icon: Wrench,
    title: 'Karbantartás',
    description: 'Nem vagy egyedül átadás után – támogatunk.',
    size: 'small',
    gridArea: 'small2',
  },
];

// Card component with layered depth effect
const BentoCard = ({ service, index, inView }) => {
  const Icon = service.icon;

  const sizeClasses = {
    featured: 'col-span-2 row-span-1 p-6 lg:p-8',
    medium: 'col-span-1 row-span-1 p-5 lg:p-6',
    small: 'col-span-1 row-span-1 p-5 lg:p-6',
  };

  const titleClasses = {
    featured: 'text-xl lg:text-2xl',
    medium: 'text-lg',
    small: 'text-lg',
  };

  const descClasses = {
    featured: 'text-sm lg:text-base',
    medium: 'text-xs lg:text-sm',
    small: 'text-xs lg:text-sm',
  };

  const iconBgSize = {
    featured: 'w-12 h-12 lg:w-14 lg:h-14',
    medium: 'w-10 h-10',
    small: 'w-10 h-10',
  };

  const iconSize = {
    featured: 'w-6 h-6 lg:w-7 lg:h-7',
    medium: 'w-5 h-5',
    small: 'w-5 h-5',
  };

  const bgIconSize = {
    featured: 'w-36 h-36 lg:w-48 lg:h-48',
    medium: 'w-24 h-24',
    small: 'w-24 h-24',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`
        ${sizeClasses[service.size]}
        relative overflow-hidden rounded-2xl
        bg-[#0d0d0d] border border-[#ffffff08]
        group cursor-default
        transition-all duration-500 ease-out
        hover:border-[#00FF00]/40
        hover:shadow-[0_0_40px_-10px_rgba(0,255,0,0.25)]
      `}
      style={{ gridArea: service.gridArea }}
      data-testid={`service-card-${index}`}
    >
      {/* Layered background icon for visual depth */}
      <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
        <Icon className={`${bgIconSize[service.size]} text-[#00FF00]`} strokeWidth={1} />
      </div>

      {/* Coordinate dot decorations */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#00FF00]/20 group-hover:bg-[#00FF00]/50 transition-colors" />
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#00FF00]/20 group-hover:bg-[#00FF00]/50 transition-colors" />

      {/* Hover glow border effect - only visible on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-[#00FF00]/30" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#00FF00]/10 via-transparent to-[#00FF00]/5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with slight overflow effect */}
        <div className={`
          ${iconBgSize[service.size]}
          flex items-center justify-center
          rounded-xl bg-[#00FF00]/10
          mb-5 lg:mb-6
          group-hover:bg-[#00FF00]/15 group-hover:scale-105
          transition-all duration-300
          ${service.size === 'featured' ? '-ml-2 -mt-2' : ''}
        `}>
          <Icon className={`${iconSize[service.size]} text-[#00FF00]`} strokeWidth={2} />
        </div>

        {/* Title - dominant */}
        <h3 className={`
          ${titleClasses[service.size]}
          font-bold mb-3
          text-white
          group-hover:text-[#00FF00]
          transition-colors duration-300
        `}>
          {service.title}
        </h3>

        {/* Description - refined typography */}
        <p className={`
          ${descClasses[service.size]}
          text-[#71717A] leading-relaxed
          font-light tracking-wide
          group-hover:text-[#A1A1AA]
          transition-colors duration-300
        `}>
          {service.description}
        </p>

      </div>

      {/* Corner accent lines - hover only */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[#00FF00]/60 to-transparent" />
        <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-[#00FF00]/60 to-transparent" />
      </div>

      {/* Bottom accent for featured cards */}
      {service.size === 'featured' && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
};

export const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
      data-testid="services-section"
    >
      {/* Background grid pattern with coordinate system */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 grid-bg" />
        {/* Horizontal coordinate lines */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/10 to-transparent" />
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/10 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/10 to-transparent" />
        {/* Vertical coordinate lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00FF00]/10 to-transparent" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00FF00]/10 to-transparent" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00FF00]/10 to-transparent" />
      </div>

      {/* Coordinate intersection dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((row) =>
          [1, 2, 3].map((col) => (
            <div
              key={`${row}-${col}`}
              className="absolute w-1 h-1 rounded-full bg-[#00FF00]/20"
              style={{ top: `${row * 25}%`, left: `${col * 25}%`, transform: 'translate(-50%, -50%)' }}
            />
          ))
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="font-mono text-sm text-[#00FF00] tracking-wider">
            03 // AMIT KAPSZ TŐLÜNK
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="services-headline">
            Nem csak egy weboldalt, hanem egy{' '}
            <span className="gradient-text">működő ügyfélszerző rendszert</span>
          </h2>
          <p className="text-[#71717A] mt-4 max-w-2xl mx-auto font-light">
            Minden fontos elemmel, ami a sikeres online jelenléthez kell
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div
          className="grid gap-4 lg:gap-5"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(2, minmax(140px, auto))',
            gridTemplateAreas: `
              "featured1 featured1 medium1 small1 ."
              ". medium2 small2 featured2 featured2"
            `,
          }}
        >
          {/* Mobile-friendly fallback grid */}
          <style>{`
            @media (max-width: 1023px) {
              [data-testid="services-section"] .grid {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                grid-template-rows: auto !important;
                grid-template-areas: 
                  "featured1 featured1"
                  "featured2 featured2"
                  "medium1 medium2"
                  "small1 small2" !important;
              }
            }
            @media (max-width: 639px) {
              [data-testid="services-section"] .grid {
                grid-template-columns: 1fr !important;
                grid-template-areas: 
                  "featured1"
                  "featured2"
                  "medium1"
                  "medium2"
                  "small1"
                  "small2" !important;
              }
            }
          `}</style>

          {services.map((service, index) => (
            <BentoCard
              key={index}
              service={service}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/30 to-transparent"
        />
      </div>
    </section>
  );
};
