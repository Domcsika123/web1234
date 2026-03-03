import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Wrench, Target, Zap, Search, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Biztonság garantáltan',
    description: 'Teljes körű adatvédelem és maximális védelem a kiberfenyegetések ellen.',
  },
  {
    icon: Wrench,
    title: 'Karbantartás segítség',
    description: 'Nem vagy egyedül átadás után – támogatunk szükség esetén.',
  },
  {
    icon: Target,
    title: 'Konverzió-fókusz',
    description: 'Nem csak szép, hanem eredményes – minden elem az ügyfélszerzésért dolgozik.',
  },
  {
    icon: Zap,
    title: 'Gyors kivitelezés',
    description: 'Rövid átfutás, transzparens kivitelezés, gyors élesítés.',
  },
  {
    icon: Search,
    title: 'SEO-alapok beépítve',
    description: 'Technikai SEO-val és villámgyors betöltéssel biztosítjuk, hogy vevőid könnyen rátaláljanak.',
  },
  {
    icon: BarChart3,
    title: 'Mérés beépítve',
    description: 'Precíz analitikát állítunk be, hogy minden adatot láss a látogatók viselkedéséről.',
  },
];

export const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

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
              03 // AMIT KAPSZ TŐLÜNK
            </span>
            <div className="mt-4">
              <h2 className="text-headline font-bold max-w-xl" data-testid="services-headline">
                Nem csak egy weboldalt, hanem egy{' '}
                <span className="gradient-text">működő ügyfélszerző rendszert</span>
              </h2>
              <p className="text-[#A1A1AA] mt-4 max-w-xs">
                Minden fontos elemmel, ami a sikeres online jelenléthez kell
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
            {services.map((service, index) => {
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
                    className={`absolute left-0 top-4 bottom-4 w-[2px] bg-[#00FF00] rounded-full transition-transform duration-300 origin-top ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />

                  {/* Number */}
                  <span
                    className={`font-mono text-xs pt-1 flex-shrink-0 w-6 transition-colors duration-300 ${
                      isActive ? 'text-[#00FF00]/50' : 'text-[#ffffff15]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon box */}
                  <div
                    className={`flex-shrink-0 p-2.5 rounded-lg border transition-all duration-300 mt-0.5 ${
                      isActive
                        ? 'bg-[#00FF00]/10 border-[#00FF00]/25'
                        : 'bg-[#ffffff05] border-[#ffffff08]'
                    }`}
                  >
                    <service.icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? 'text-[#00FF00]' : 'text-[#52525B]'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`text-base font-bold mb-1.5 transition-colors duration-300 ${
                        isActive ? 'text-[#00FF00]' : 'text-white'
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
              03 // AMIT KAPSZ TŐLÜNK
            </span>
            <h2 className="text-headline font-bold mt-4" data-testid="services-headline-desktop">
              Nem csak egy weboldalt, hanem egy{' '}
              <span className="gradient-text">működő ügyfélszerző rendszert</span>
            </h2>
            <p className="text-[#A1A1AA] mt-4 max-w-2xl mx-auto">
              Minden fontos elemmel, ami a sikeres online jelenléthez kell
            </p>
          </motion.div>

          {/* Desktop Card Grid */}
          <motion.div
            variants={desktopContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={desktopItemVariants}
                className="service-card glass p-6 lg:p-8 rounded-xl group cursor-default relative"
                data-testid={`service-card-${index}`}
              >
                <div className="p-3 rounded-xl bg-[#00FF00]/10 w-fit mb-6 group-hover:bg-[#00FF00]/20 transition-colors">
                  <service.icon className="w-6 h-6 text-[#00FF00]" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[#00FF00] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#A1A1AA] leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 right-0 w-[2px] h-8 bg-gradient-to-b from-[#00FF00] to-transparent" />
                  <div className="absolute top-0 right-0 h-[2px] w-8 bg-gradient-to-l from-[#00FF00] to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
