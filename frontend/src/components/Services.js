import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Wrench, Target, Zap, Search, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: '',
    description: '',
    size: 'featured',
    gridArea: 'featured1',
  },
  {
    icon: Search,
    title: '',
    description: '',
    size: 'featured',
    gridArea: 'featured2',
  },
  {
    icon: Target,
    title: '',
    description: '',
    size: 'medium',
    gridArea: 'medium1',
  },
  {
    icon: BarChart3,
    title: '',
    description: '',
    size: 'medium',
    gridArea: 'medium2',
  },
  {
    icon: Shield,
    title: '',
    description: '',
    size: 'small',
    gridArea: 'small1',
  },
  {
    icon: Wrench,
    title: '',
    description: '',
    size: 'small',
    gridArea: 'small2',
  },
];

const BentoCard = ({ service, index, inView }) => {
  const Icon = service.icon;

  const sizeClasses = {
    featured: 'col-span-2 row-span-1 p-6 lg:p-8',
    medium: 'col-span-1 row-span-1 p-5 lg:p-6',
    small: 'col-span-1 row-span-1 p-5 lg:p-6',
  };
  const titleClasses = { featured: 'text-xl lg:text-2xl', medium: 'text-lg', small: 'text-lg' };
  const descClasses = { featured: 'text-sm lg:text-base', medium: 'text-xs lg:text-sm', small: 'text-xs lg:text-sm' };
  const iconBgSize = { featured: 'w-12 h-12 lg:w-14 lg:h-14', medium: 'w-10 h-10', small: 'w-10 h-10' };
  const iconSize = { featured: 'w-6 h-6 lg:w-7 lg:h-7', medium: 'w-5 h-5', small: 'w-5 h-5' };
  const bgIconSize = { featured: 'w-36 h-36 lg:w-48 lg:h-48', medium: 'w-24 h-24', small: 'w-24 h-24' };

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
      <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
        <Icon className={`${bgIconSize[service.size]} text-[#00FF00]`} strokeWidth={1} />
      </div>
      <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#00FF00]/20 group-hover:bg-[#00FF00]/50 transition-colors" />
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#00FF00]/20 group-hover:bg-[#00FF00]/50 transition-colors" />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-[#00FF00]/30" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#00FF00]/10 via-transparent to-[#00FF00]/5" />
      </div>
      <div className="relative z-10">
        <div className={`
          ${iconBgSize[service.size]} flex items-center justify-center
          rounded-xl bg-[#00FF00]/10 mb-5 lg:mb-6
          group-hover:bg-[#00FF00]/15 group-hover:scale-105
          transition-all duration-300
          ${service.size === 'featured' ? '-ml-2 -mt-2' : ''}
        `}>
          <Icon className={`${iconSize[service.size]} text-[#00FF00]`} strokeWidth={2} />
        </div>
        <h3 className={`${titleClasses[service.size]} font-bold mb-3 text-white group-hover:text-[#00FF00] transition-colors duration-300`}>
          {service.title}
        </h3>
        <p className={`${descClasses[service.size]} text-[#71717A] leading-relaxed font-light tracking-wide group-hover:text-[#A1A1AA] transition-colors duration-300`}>
          {service.description}
        </p>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-[#00FF00]/60 to-transparent" />
        <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-[#00FF00]/60 to-transparent" />
      </div>
      {service.size === 'featured' && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
};

export const Services = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  const localizedServices = services.map((service, index) => {
    const localized = content.items[index] || {};
    return {
      ...service,
      title: localized.title || service.title,
      description: localized.description || service.description,
    };
  });

  // Track which item is closest to viewport center on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop card grid variants
  const desktopContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const desktopItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
      data-testid="services-section"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="font-mono text-base text-[#00FF00] tracking-wider">
              {content.tag}
            </span>
            <div className="mt-4">
              <h2 className="text-headline font-bold max-w-xl" data-testid="services-headline">
                {content.headlineStart}{' '}
                <span className="gradient-text">{content.headlineAccent}</span>
              </h2>
              <p className="text-[#A1A1AA] mt-4 max-w-xs">
                {content.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Mobile Feature Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-[#ffffff08]"
          >
            {localizedServices.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="relative flex items-start gap-5 py-7 border-b border-[#ffffff08] pl-4 transition-all duration-300"
                  data-testid={`service-card-${index}`}
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-4 bottom-4 w-[2px] bg-[#00FF00] rounded-full transition-transform duration-300 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0'
                      }`}
                  />

                  {/* Number */}
                  <span
                    className={`font-mono text-xs pt-1 flex-shrink-0 w-6 transition-colors duration-300 ${isActive ? 'text-[#00FF00]/50' : 'text-[#ffffff15]'
                      }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon box */}
                  <div
                    className={`flex-shrink-0 p-2.5 rounded-lg border transition-all duration-300 mt-0.5 ${isActive
                      ? 'bg-[#00FF00]/10 border-[#00FF00]/25'
                      : 'bg-[#ffffff05] border-[#ffffff08]'
                      }`}
                  >
                    <service.icon
                      className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-[#00FF00]' : 'text-[#52525B]'
                        }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`text-base font-bold mb-1.5 transition-colors duration-300 ${isActive ? 'text-[#00FF00]' : 'text-white'
                        }`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#A1A1AA] leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
        <div className="hidden lg:block">
          {/* Desktop Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-sm text-[#00FF00] tracking-wider">
              {content.tag}
            </span>
            <h2 className="text-headline font-bold mt-4" data-testid="services-headline-desktop">
              {content.headlineStart}{' '}
              <span className="gradient-text">{content.headlineAccent}</span>
            </h2>
            <p className="text-[#A1A1AA] mt-4 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </motion.div>

          {/* Desktop Bento Grid */}
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
            `}</style>
            {localizedServices.map((service, index) => (
              <BentoCard key={index} service={service} index={index} inView={inView} />
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/30 to-transparent"
          />
        </div>

      </div>
    </section>
  );
};
