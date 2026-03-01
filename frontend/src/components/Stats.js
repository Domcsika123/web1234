import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const stats = [
  {
    value: 30,
    suffix: '',
    label: 'Nap Garancia',
    description: 'minden projektre',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Konverzió Növekedés',
    description: 'átlagos eredmény',
  },
];

export const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="stats-section"
    >
      {/* Background binary code effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="font-mono text-[#00FF00] text-xs whitespace-pre leading-tight animate-marquee">
          {Array(50).fill('01001000 01100101 01101100 01101100 01101111 ').join('')}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-base text-[#00FF00] tracking-wider">
            02 // EREDMÉNYEINK
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
              data-testid={`stat-item-${index}`}
            >
              <div className="relative inline-block">
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-4 bg-[#00FF00]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="stat-number relative">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={0.5 + index * 0.2}
                    />
                  )}
                  <span>{stat.suffix}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-4 mb-2 text-white">
                {stat.label}
              </h3>

              <p className="text-[#52525B] text-sm">
                {stat.description}
              </p>

              {/* Decorative line */}
              <motion.div
                className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#00FF00] to-transparent mx-auto mt-6"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {['1–4 HÉT', 'FIX ÁR', 'EREDMÉNYGARANCIA'].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 border border-[#ffffff10] rounded-full text-sm text-[#A1A1AA] font-mono"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
