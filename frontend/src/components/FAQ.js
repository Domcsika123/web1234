import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { SectionTag } from './fx';

export const FAQ = ({ content }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="faq"
      ref={ref}
      className="theme-light py-24 lg:py-32 relative overflow-hidden bg-canvas text-fg"
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
          <SectionTag>{content.tag}</SectionTag>
          <h2 className="text-headline font-bold mt-4" data-testid="faq-headline">
            {content.headlineStart} <span className="gradient-text">{content.headlineAccent}</span>
          </h2>
          <p className="text-fg-2 mt-4">
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
                <AccordionTrigger className="faq-trigger text-left text-lg font-semibold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-fg-2 leading-relaxed pb-4">
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
          <p className="text-fg-3 mb-4">
            {content.missingAnswer}
          </p>
          <a
            href="#contact"
            className="link font-medium"
            data-testid="faq-contact-link"
          >
            {content.contactLink}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
