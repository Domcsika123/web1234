import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, Target, TrendingUp, Wrench } from 'lucide-react';

const painPoints = [
  {
    icon: AlertCircle,
    text: 'digitális megoldásokat, amelyek nem illeszkednek a működéshez',
  },
  {
    icon: AlertCircle,
    text: 'projekteket, ahol a célok nem voltak egyértelműek',
  },
  {
    icon: AlertCircle,
    text: 'oldalakat, amelyek elkészültek, de nem kaptak irányt a fejlődéshez',
  },
];

const goals = [
  { icon: Target, text: 'Több megkeresést?' },
  { icon: TrendingUp, text: 'Hatékonyabb értékesítést?' },
  { icon: Wrench, text: 'Kevesebb manuális adminisztrációt?' },
];

export const Approach = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="approach"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="approach-section"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left Column */}
          <div>
            <motion.span
              variants={itemVariants}
              className="font-mono text-base text-[#00FF00] tracking-wider"
            >
              01 // A SZEMLÉLETÜNK
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-headline font-bold mt-4 mb-6"
              data-testid="approach-headline"
            >
              A legtöbb weboldal elkészül…{' '}
              <span className="text-[#A1A1AA]">majd nem válik valódi üzleti eszközzé.</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              <p className="text-[#A1A1AA]">
                Szép, de nem támogatja tudatosan az ügyfélszerzést.
              </p>
              <p className="text-[#A1A1AA]">
                Megvan, de nincs összehangolva a vállalkozás céljaival.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-[#52525B] font-medium mb-4">Mi is láttunk:</p>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-4 bg-[#121212] rounded-lg border border-[#ffffff10]"
                  >
                    <point.icon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#A1A1AA]">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-white font-medium"
            >
              Ezért döntöttünk úgy, hogy{' '}
              <span className="text-[#00FF00]">stratégiai szemlélettel</span> dolgozunk.
            </motion.p>
          </div>

          {/* Right Column */}
          <div>
            <motion.div
              variants={itemVariants}
              className="glass p-8 lg:p-10 rounded-2xl"
            >
              <p className="text-[#52525B] font-mono text-sm mb-4">
                Minden együttműködést egy egyszerű kérdéssel kezdünk:
              </p>

              <h3 className="text-xl lg:text-2xl font-bold mb-8 text-[#00FF00]">
                MIT SZERETNÉL ELÉRNI A DIGITÁLIS JELENLÉTEDDEL?
              </h3>

              <div className="space-y-4 mb-8">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 rounded-lg border border-[#ffffff10] hover:border-[#00FF00]/30 transition-colors group cursor-default"
                  >
                    <div className="p-2 rounded-lg bg-[#00FF00]/10 group-hover:bg-[#00FF00]/20 transition-colors">
                      <goal.icon className="w-5 h-5 text-[#00FF00]" />
                    </div>
                    <span className="text-white font-medium">{goal.text}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-[#A1A1AA] leading-relaxed">
                A válasz határozza meg, mit és hogyan építünk.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 border-l-2 border-[#00FF00]"
            >
              <p className="text-[#A1A1AA] leading-relaxed">
                Nem klasszikus webfejlesztőként gondolkodunk.{' '}
                <span className="text-white font-medium">
                  Digitális partnerként dolgozunk
                </span>
                , a stratégiai tervezéstől a megvalósításon át a folyamatos fejlesztésig.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
