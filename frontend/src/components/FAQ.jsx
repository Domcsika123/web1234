import React, { useState } from 'react';
import { faqData } from '../mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQ = () => {
  return (
    <section className="py-32 px-8 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="heading-2 mb-6 text-primary">Gyakori kérdések</h2>
          <p className="body-large text-secondary">
            Minden, amit tudnod kell az oldalkészítésről
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`item-${faq.id}`}
              className="border border-border-medium rounded-xl px-6 bg-page hover:bg-border-medium transition-colors"
            >
              <AccordionTrigger className="heading-6 text-primary hover:text-brand-primary text-left py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="body-medium text-secondary pb-6">
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
