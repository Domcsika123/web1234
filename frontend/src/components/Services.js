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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
      data-testid="services-section"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-[#00FF00] tracking-wider">
            03 // AMIT KAPSZ TŐLÜNK
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="services-headline">
            Nem csak egy weboldalt, hanem egy{' '}
            <span className="gradient-text">működő ügyfélszerző rendszert</span>
          </h2>
          <p className="text-[#A1A1AA] mt-4 max-w-2xl mx-auto">
            Minden fontos elemmel, ami a sikeres online jelenléthez kell
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card glass p-6 lg:p-8 rounded-xl group cursor-default"
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
    </section>
  );
};
