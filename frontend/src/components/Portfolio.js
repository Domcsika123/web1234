import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    category: 'Étterem',
    challenge: 'Online rendelési rendszer hiánya, alacsony láthatóság',
    solution: 'Reszponzív weboldal online foglalási és rendelési rendszerrel',
    result: '+65% online rendelés 3 hónap alatt',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  },
  {
    category: 'Fodrászat',
    challenge: 'Telefonos időpontfoglalás túlterheltsége',
    solution: 'Modern weboldal online időpontfoglaló rendszerrel',
    result: '70%-kal kevesebb adminisztráció',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
  },
  {
    category: 'Webshop',
    challenge: 'Nulláról webshop építés szűk határidővel',
    solution: 'Teljes körű e-commerce megoldás fizetéssel és logisztikával',
    result: '3 héten belül élesítés, 50+ rendelés',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
  },
  {
    category: 'Fitness klub',
    challenge: 'Elavult weboldal, nincs online beiratkozás',
    solution: 'Modern design, online tagsági rendszer',
    result: '+45% online beiratkozás',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    category: 'Ingatlaniroda',
    challenge: 'Ingatlanok nehezen kereshetők, lassú oldal',
    solution: 'Gyors, szűrős kereső, térképes nézet',
    result: '3x gyorsabb betöltés, +55% érdeklődés',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    category: 'Szálloda',
    challenge: 'Kevés direct booking, magas jutalék',
    solution: 'Weboldal közvetlen foglalási rendszerrel',
    result: '+40% direkt foglalás',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
];

export const Portfolio = () => {
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
      id="portfolio"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
      data-testid="portfolio-section"
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
            05 // REFERENCIÁK
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="portfolio-headline">
            Valós projektek,{' '}
            <span className="gradient-text">mérhető eredményekkel</span>
          </h2>
          <p className="text-[#A1A1AA] mt-4">
            Ilyen oldalakat készítünk
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="portfolio-card group rounded-xl overflow-hidden bg-[#121212] border border-[#ffffff10] hover:border-[#00FF00]/30 transition-colors"
              data-testid={`portfolio-card-${index}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.category}
                  className="w-full h-full object-cover"
                />
                <div className="overlay flex items-end p-4">
                  <span className="text-[#00FF00] font-mono text-sm bg-[#0A0A0A]/80 px-3 py-1 rounded-full">
                    {project.result}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold group-hover:text-[#00FF00] transition-colors">
                    {project.category}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#52525B] group-hover:text-[#00FF00] transition-colors" />
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[#52525B] font-mono text-xs">KIHÍVÁS</span>
                    <p className="text-[#A1A1AA] mt-1">{project.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[#52525B] font-mono text-xs">MEGOLDÁS</span>
                    <p className="text-white mt-1">{project.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
