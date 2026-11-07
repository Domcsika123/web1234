import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, LoaderCircle, X } from 'lucide-react';
import { asset, ChapterHeading } from './primitives';

const SIZES = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw';

function TemplateCard({ t, copy, onOpen, eager = false }) {
  return (
    <article className="tpl-card group">
      <div className="tpl-media">
        <img
          src={asset(t.src)}
          srcSet={t.srcSet
            .split(', ')
            .map((s) => asset(s))
            .join(', ')}
          sizes={SIZES}
          alt=""
          width="1024"
          height="768"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="tpl-scrim" aria-hidden="true" />
        <span className="tpl-url" aria-hidden="true">
          {t.slug}.{copy.domain}
        </span>
        <span className="tpl-cta" aria-hidden="true">
          {copy.preview}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="tpl-body">
        <h3 className="type-h3 text-hi">
          {/* The button stretches over the whole card (see .tpl-open::after) */}
          <button type="button" className="tpl-open" onClick={() => onOpen(t.id)} aria-label={copy.openPreview(t.title)}>
            {t.title}
          </button>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-lo">{t.description}</p>
      </div>
    </article>
  );
}

function MobileCarousel({ list, copy, onOpen }) {
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(Number(e.target.dataset.index));
        });
      },
      { root, threshold: 0.6 }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [list.length]);

  const goTo = (i) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  return (
    <div className="md:hidden">
      <ul ref={scrollerRef} className="tpl-scroller hide-scrollbar">
        {list.map((t, i) => (
          <li
            key={t.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-index={i}
            className="tpl-slide"
            aria-label={copy.slideLabel(i + 1, list.length)}
          >
            <TemplateCard t={t} copy={copy} onOpen={onOpen} eager={i === 0} />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex justify-center gap-1">
        {list.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className="tpl-dot"
            data-active={i === current}
            aria-label={copy.slideLabel(i + 1, list.length)}
            aria-current={i === current ? 'true' : undefined}
            onClick={() => goTo(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}

function PreviewSheet({ template, open, onOpenChange, copy, returnFocusRef }) {
  // Keep the last template while the sheet animates out
  const last = useRef(null);
  const t = template || last.current;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (template) last.current = template;
  }, [template]);

  useEffect(() => {
    if (open) setLoaded(false);
  }, [open, t?.id]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm" />
        <Dialog.Content
          className="sheet sheet-frame"
          onCloseAutoFocus={(e) => {
            // Opened from state, not a Dialog.Trigger: hand focus back to the card that opened it
            e.preventDefault();
            returnFocusRef.current?.focus({ preventScroll: true });
          }}
        >
          <div className="flex h-16 flex-none items-center justify-between gap-4 border-b border-line px-4 sm:px-6">
            <Dialog.Title className="truncate text-sm font-medium text-mid">{t ? copy.sheetTitle(t.title) : ''}</Dialog.Title>
            <Dialog.Description className="sr-only">{copy.sheetDescription}</Dialog.Description>
            <Dialog.Close asChild>
              <button type="button" className="btn btn-ghost btn-sm flex-none">
                <X className="h-4 w-4" aria-hidden="true" />
                {copy.close}
              </button>
            </Dialog.Close>
          </div>
          <div className="relative flex-1 bg-ink">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center" role="status">
                <span className="flex items-center gap-3 text-sm text-lo">
                  <LoaderCircle className="h-5 w-5 animate-spin text-volt" aria-hidden="true" />
                  {copy.loading}
                </span>
              </div>
            )}
            {t && (
              <iframe
                key={t.id}
                src={`${asset(t.previewRoute)}?embed=true`}
                title={copy.sheetTitle(t.title)}
                className="relative h-full w-full border-0"
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 240ms ease' }}
                onLoad={() => setLoaded(true)}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Templates({ copy }) {
  const [openId, setOpenId] = useState(null);
  const openerRef = useRef(null);
  const current = copy.list.find((t) => t.id === openId) || null;
  const open = (id) => {
    openerRef.current = document.activeElement;
    setOpenId(id);
  };

  return (
    <section id="templates" className="chapter" aria-labelledby="templates-title">
      <div className="shell">
        <ChapterHeading id="templates-title" index={copy.index} label={copy.label} title={copy.title} lead={copy.lead} />

        <ul className="mt-12 hidden gap-5 md:grid md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {copy.list.map((t) => (
            <li key={t.id}>
              <TemplateCard t={t} copy={copy} onOpen={open} />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <MobileCarousel list={copy.list} copy={copy} onOpen={open} />
        </div>
      </div>

      <PreviewSheet
        template={current}
        open={Boolean(current)}
        onOpenChange={(o) => !o && setOpenId(null)}
        copy={copy}
        returnFocusRef={openerRef}
      />
    </section>
  );
}
