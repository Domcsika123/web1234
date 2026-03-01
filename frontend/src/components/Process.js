import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, PenTool, Code, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Brief & Igényfelmérés',
    description: 'Megbeszéljük a céljaidat, közönségedet, versenytársaidat egy 1 órás konzultáció keretein belül.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Tervezés & Wireframe',
    description: 'Elkészítjük az oldal struktúráját és vizuális tervét. Iterálunk, amíg tökéletes.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Fejlesztés',
    description: 'Modern technológiával építjük a weboldaladat – gyors, biztonságos, skálázható.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Átadás & Élesítés',
    description: 'Élesítjük az oldalt, elvégezzük a technikai beállításokat és megtanítjuk a kezelését.',
  },
  {
    number: '05',
    icon: HeartHandshake,
    title: 'Támogatás',
    description: '30 nap garancia és opcionális karbantartási csomagok. Biztonság és szakmai háttértámogatás.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -30 : 30,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export const Process = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#121212]"
      data-testid="process-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="font-mono text-base text-[#00FF00] tracking-wider">
            04 // HOGYAN DOLGOZUNK
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="process-headline">
            Átlátható, gyors,{' '}
            <span className="gradient-text">kiszámítható folyamat</span>
          </h2>
          <p className="text-[#A1A1AA] mt-4">
            Mindig tudod, hol tartunk
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF00] via-[#00FF00]/50 to-transparent" />

          <motion.div
            className="space-y-8 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                className={`relative lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                data-testid={`process-step-${index}`}
              >
                {/* Content */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className="glass p-6 lg:p-8 rounded-xl group hover:border-[#00FF00]/30 transition-colors duration-300">
                    <span className="font-mono text-[#00FF00] text-sm">{step.number}</span>

                    <div className="flex items-center gap-4 mt-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#00FF00]/10 group-hover:bg-[#00FF00]/20 transition-colors duration-300 lg:hidden">
                        <step.icon className="w-5 h-5 text-[#00FF00]" />
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>

                    <p className="text-[#A1A1AA] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot - Desktop only */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 items-center justify-center">
                  <motion.div
                    variants={dotVariants}
                    className="w-14 h-14 rounded-full bg-[#0A0A0A] border-2 border-[#00FF00] flex items-center justify-center neon-glow"
                  >
                    <step.icon className="w-6 h-6 text-[#00FF00]" />
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden lg:block lg:w-1/2" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
