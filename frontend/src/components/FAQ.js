import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export const FAQ = ({ content }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
      data-testid="faq-section"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-base text-[#00FF00] tracking-wider">
            {content.tag}
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="faq-headline">
            {content.headlineStart} <span className="gradient-text">{content.headlineAccent}</span>
          </h2>
          <p className="text-[#A1A1AA] mt-4">
            {content.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {content.items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item pb-4"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="faq-trigger text-left text-lg font-semibold hover:no-underline py-4 [&[data-state=open]]:text-[#00FF00]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#A1A1AA] leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[#52525B] mb-4">
            {content.missingAnswer}
          </p>
          <a
            href="#contact"
            className="text-[#00FF00] hover:underline font-medium"
            data-testid="faq-contact-link"
          >
            {content.contactLink}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
