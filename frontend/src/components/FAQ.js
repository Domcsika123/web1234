import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, MessageCircle, Plus } from 'lucide-react';
import { Magnetic, SectionHeader, scrollToId } from './fx';

const FaqItem = ({ item, index, open, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className={`rounded-2xl border transition-colors duration-300 ${open ? 'border-[#00FF00]/35 bg-[#00FF00]/[0.04]' : 'border-white/[0.08] bg-white/[0.015] hover:border-white/20'}`}
    data-testid={`faq-item-${index}`}
  >
    <button
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center gap-5 p-5 lg:p-6 text-left"
    >
      <span className={`font-mono text-xs transition-colors ${open ? 'text-[#00FF00]' : 'text-white/30'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={`flex-1 text-lg font-semibold transition-colors ${open ? 'text-white' : 'text-white/85'}`}>{item.question}</span>
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${open ? 'border-[#00FF00] bg-[#00FF00] text-black' : 'border-white/15 text-white/70'}`}
      >
        <Plus className="h-4 w-4" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-6 pl-[3.75rem] lg:px-6 lg:pl-[4.25rem] text-[#A1A1AA] leading-relaxed">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FAQ = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative pt-12 pb-24 lg:pt-16 lg:pb-36" data-testid="faq-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div ref={ref} className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              tag={content.tag}
              start={content.headlineStart}
              accent={content.headlineAccent}
              subtitle={content.subtitle}
              inView={inView}
              align="left"
              testId="faq-headline"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF00]/10">
                <MessageCircle className="h-5 w-5 text-[#00FF00]" />
              </span>
              <p className="mt-4 text-white font-semibold">{content.missingAnswer}</p>
              <Magnetic strength={0.2} className="mt-4">
                <button
                  onClick={() => scrollToId('#contact')}
                  className="btn-ghost-arrow group"
                  data-testid="faq-contact-link"
                >
                  {content.contactLink}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>
            </motion.div>
          </div>

          <div className="space-y-3">
            {content.items.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                open={open === index}
                onToggle={() => setOpen(open === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
