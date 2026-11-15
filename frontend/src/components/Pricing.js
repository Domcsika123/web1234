import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X } from 'lucide-react';
import { SectionHeader } from './fx';

const scrollToContact = () => {
  const el = document.querySelector('#contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const PlanCard = ({ plan, content, index, inView }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className={`relative flex flex-col rounded-2xl bg-surface p-7 lg:p-8 ${
      plan.featured
        ? 'border-2 border-accent shadow-xl shadow-primary/10 lg:-my-4 lg:py-12'
        : 'border border-line'
    }`}
    data-testid={`pricing-card-${index}`}
  >
    {plan.featured && (
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {content.popular}
      </span>
    )}

    <header>
      <h3 className="text-xl lg:text-2xl font-bold text-fg">{plan.name}</h3>
      <p className="mt-1.5 text-sm text-fg-2">{plan.subtitle}</p>
    </header>

    <div className="mt-6 border-b border-line pb-6">
      <p className="text-3xl lg:text-4xl font-black tracking-tight text-fg" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {plan.price}
      </p>
      <p className="mt-1 text-xs text-fg-3">{content.priceNote}</p>
    </div>

    <p className="sr-only">{content.includesLabel}</p>
    <ul className="mt-6 flex flex-col gap-3">
      {plan.includes.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-fg">
          <span className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary-soft">
            <Check className="h-3 w-3 text-secondary" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>

    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">{content.excludesLabel}</p>
    <ul className="mt-3 flex flex-col gap-2.5">
      {plan.excludes.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-fg-3">
          <span className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center">
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>

    <div className="mt-auto pt-8">
      <button
        type="button"
        onClick={scrollToContact}
        className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} group flex w-full items-center justify-center gap-2`}
        data-testid={`pricing-cta-${index}`}
      >
        {content.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  </motion.article>
);

export const Pricing = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="pricing"
      ref={ref}
      className="theme-light bg-canvas text-fg relative py-24 lg:py-32 overflow-hidden"
      data-testid="pricing-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <SectionHeader
          tag={content.tag}
          start={content.headlineStart}
          accent={content.headlineAccent}
          subtitle={content.subtitle}
          inView={inView}
          testId="pricing-headline"
        />

        <div className="mt-16 lg:mt-20 grid gap-8 lg:grid-cols-3 lg:gap-6 lg:items-stretch max-w-md mx-auto lg:max-w-none">
          {content.plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} content={content} index={index} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 lg:mt-16 text-center"
        >
          <p className="text-fg-2">
            {content.customStart}{' '}
            <a
              href="#contact"
              className="font-medium text-hot underline underline-offset-4 decoration-1 hover:decoration-2"
              data-testid="pricing-custom-link"
            >
              {content.customLink}
            </a>
          </p>
          <p className="mt-4 text-xs text-fg-3 max-w-xl mx-auto">{content.vatNote}</p>
        </motion.div>
      </div>
    </section>
  );
};
