import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { SectionTag } from './fx';

export const Stats = ({ content }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="theme-light py-24 lg:py-32 relative overflow-hidden bg-canvas text-fg"
      data-testid="stats-section"
    >
      {/* Background binary code effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="font-mono text-tone text-xs whitespace-pre leading-tight animate-marquee">
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
          <SectionTag>{content.tag}</SectionTag>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-2 lg:gap-2 max-w-2xl mx-auto">
          {content.items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
              data-testid={`stat-item-${index}`}
            >
              <div className="relative inline-block">
                {/* Hover tint */}
                <motion.div
                  className="absolute -inset-4 bg-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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

              <h3 className="text-xl font-bold mt-4 mb-2 text-fg">
                {stat.label}
              </h3>

              <p className="text-fg-2 text-sm">
                {stat.description}
              </p>

              {/* Decorative line */}
              <motion.div
                className="w-16 h-[2px] bg-gradient-to-r from-transparent via-tone to-transparent mx-auto mt-6"
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
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 border border-line bg-surface rounded-full text-sm text-fg-2 font-mono"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
