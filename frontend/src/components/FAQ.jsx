import React, { useState } from 'react';
import { faqData } from '../mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useInView } from '../hooks/useInView';

const FAQ = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 md:mb-20" ref={ref}>
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Gyakori kérdések</h2>
          <p className="body-large text-secondary px-2">
            Minden, amit tudnod kell az oldalkészítésről
          </p>
          <div className={`section-divider ${isInView ? 'section-divider-visible' : ''}`}></div>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`item-${faq.id}`}
              className="border border-border-medium rounded-xl px-4 md:px-6 bg-page hover:bg-border-medium transition-colors"
            >
              <AccordionTrigger className="heading-6 text-primary hover:text-brand-primary text-left py-4 md:py-6 text-sm md:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="body-medium text-secondary pb-4 md:pb-6 text-sm md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
