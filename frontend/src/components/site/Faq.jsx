import * as Accordion from '@radix-ui/react-accordion';
import { MessageSquare, Plus } from 'lucide-react';
import { ChapterHeading } from './primitives';

function AskCard({ copy, className = '' }) {
  return (
    <div className={`surface-card p-6 lg:p-7 ${className}`}>
      <span className="icon-tile">
        <MessageSquare className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-5 text-lg font-semibold text-hi">{copy.missingTitle}</p>
      <p className="mt-2 text-base text-lo">{copy.missingText}</p>
      <a href="#contact" className="btn btn-ghost btn-sm mt-6">
        {copy.missingCta}
      </a>
    </div>
  );
}

export function Faq({ copy }) {
  return (
    <section id="faq" className="chapter" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
            <ChapterHeading id="faq-title" index={copy.index} label={copy.label} title={copy.title} />
            <AskCard copy={copy} className="mt-10 hidden lg:block" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Accordion.Root type="single" collapsible defaultValue="item-0" className="faq-list">
            {copy.items.map((item, i) => (
              <Accordion.Item key={item.question} value={`item-${i}`} className="faq-item">
                <Accordion.Header className="m-0">
                  <Accordion.Trigger className="faq-trigger group">
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <Plus className="h-4 w-4" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="faq-content">
                  <p className="type-body pb-6 pr-10">{item.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
          <AskCard copy={copy} className="mt-10 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
