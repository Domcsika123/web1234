import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, TrendingUp, Wrench } from 'lucide-react';

const goalIcons = [Target, TrendingUp, Wrench];

export const Approach = ({ content }) => {
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
      transition: { duration: 0.45 },
    },
  };

  return (
    <section
      id="approach"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      data-testid="approach-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto"
        >
          <div>
            <motion.div
              variants={itemVariants}
              className="glass p-8 lg:p-10 rounded-2xl"
            >
              <p className="text-[#52525B] font-mono text-sm mb-4">
                {content.questionIntro}
              </p>

              <h3 className="text-xl lg:text-2xl font-bold mb-8 gradient-text">
                {content.question}
              </h3>

              <div className="space-y-4 mb-8">
                {content.goals.map((goal, index) => {
                  const Icon = goalIcons[index] || Target;

                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-4 p-4 rounded-lg border border-[#ffffff10] hover:border-[#00FF00]/30 transition-colors group cursor-default"
                    >
                      <div className="p-2 rounded-lg bg-[#00FF00]/10 group-hover:bg-[#00FF00]/20 transition-colors">
                        <Icon className="w-5 h-5 text-[#00FF00]" />
                      </div>
                      <span className="text-white font-medium">{goal}</span>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-[#A1A1AA] leading-relaxed">
                {content.answerLine}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 border-l-2 border-[#00FF00]"
            >
              <p className="text-[#A1A1AA] leading-relaxed">
                {content.partnerStart}{' '}
                <span className="text-white font-medium">
                  {content.partnerAccent}
                </span>
                {content.partnerEnd}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
