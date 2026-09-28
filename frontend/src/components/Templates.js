import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Eye } from 'lucide-react';
import { SectionHeader, TiltCard } from './fx';

const TemplateCard = ({ template, index, mobile = false, onPreview, isExpanding, isActive, cardRef, previewLabel, domain }) => {
    const card = (
        <div
            className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#101010] transition-colors duration-300
                ${mobile && isActive ? 'border-[#00FF00]/60' : 'border-white/10 group-hover/tilt:border-[#00FF00]/40'}`}
        >
            {/* browser chrome */}
            <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-[#151515] px-3">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-3 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
                    {template.id}.{domain}
                </span>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                    src={template.image}
                    alt={`${template.title} – ${previewLabel}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/tilt:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur">
                    {String(index + 1).padStart(2, '0')}
                </span>
                {!mobile && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100">
                        <span className="flex items-center gap-2 rounded-full bg-[#00FF00] px-4 py-2 text-sm font-bold text-black shadow-[0_0_30px_rgba(0,255,0,0.6)] translate-y-3 group-hover/tilt:translate-y-0 transition-transform duration-300">
                            <Eye className="h-4 w-4" />
                            {previewLabel}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{template.title}</h3>
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-white/30 transition-all duration-300 group-hover/tilt:rotate-45 group-hover/tilt:text-[#00FF00]" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{template.description}</p>
                <button
                    onClick={() => onPreview && onPreview(template)}
                    className={`mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${mobile && isActive ? 'text-[#00FF00]' : 'text-white/70 hover:text-[#00FF00]'}`}
                    data-testid={`template-cta-${index}`}
                >
                    {previewLabel}
                    <span className="h-px w-8 bg-current transition-all duration-300 group-hover/tilt:w-14" />
                </button>
            </div>
        </div>
    );

    if (mobile) {
        return (
            <article
                ref={cardRef}
                className={`min-w-[80%] max-w-[80%] snap-start flex-shrink-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'} ${isExpanding ? 'invisible' : ''}`}
                data-testid={`template-card-${index}`}
            >
                {card}
            </article>
        );
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`cursor-pointer ${isExpanding ? 'invisible' : ''}`}
            onClick={() => onPreview && onPreview(template)}
            data-testid={`template-card-${index}`}
        >
            <TiltCard max={8} className="h-full rounded-2xl">
                {card}
            </TiltCard>
        </motion.article>
    );
};

export const Templates = ({ content }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [expandedTemplate, setExpandedTemplate] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return undefined;
        const handleScroll = () => {
            const containerCenter = el.scrollLeft + el.clientWidth / 2;
            let closest = 0;
            let closestDist = Infinity;
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const dist = Math.abs(cardCenter - containerCenter);
                if (dist < closestDist) { closestDist = dist; closest = i; }
            });
            setActiveIndex(closest);
        };
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    const savedScrollY = useRef(0);

    const handlePreview = (template) => {
        if (template.previewRoute) {
            savedScrollY.current = window.scrollY;
            setExpandedTemplate(template);
        }
    };

    const handleClose = () => {
        setTimeout(() => {
            setExpandedTemplate(null);
            window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
        }, 650);
    };

    return (
        <section
            id="templates"
            ref={ref}
            className="py-24 lg:py-36 relative overflow-hidden"
            data-testid="templates-section"
        >
            <div className="aurora aurora-cyan w-[560px] h-[560px] -left-60 top-20 opacity-25" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <SectionHeader
                    tag={content.tag}
                    start={content.headlineStart}
                    accent={content.headlineAccent}
                    subtitle={content.subtitle}
                    inView={inView}
                    testId="templates-headline"
                    className="mb-14"
                />

                <div
                    ref={scrollRef}
                    className="lg:hidden -mx-6 px-6 overflow-x-auto hide-scrollbar"
                    style={{ scrollPaddingLeft: '24px', overscrollBehaviorX: 'contain', paddingTop: '8px', paddingBottom: '8px' }}
                >
                    <div className="flex items-stretch snap-x snap-mandatory gap-4" style={{ paddingRight: '24px' }}>
                        {content.list.map((template, index) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                index={index}
                                mobile
                                onPreview={handlePreview}
                                isExpanding={expandedTemplate?.id === template.id}
                                isActive={activeIndex === index}
                                cardRef={el => cardRefs.current[index] = el}
                                previewLabel={content.preview}
                                domain={content.domain}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:hidden flex justify-center gap-2 mt-5">
                    {content.list.map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 h-2 bg-[#00FF00]' : 'w-2 h-2 bg-[#ffffff20]'}`}
                        />
                    ))}
                </div>

                <div className="hidden lg:grid grid-cols-3 gap-7">
                    {content.list.map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={index}
                            onPreview={handlePreview}
                            isExpanding={expandedTemplate?.id === template.id}
                            previewLabel={content.preview}
                            domain={content.domain}
                        />
                    ))}
                </div>
            </div>

            {/* Expanding Preview Overlay */}
            <AnimatePresence mode="wait">
                {expandedTemplate && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                            onClick={handleClose}
                        />

                        <motion.div
                            className="fixed z-[61] overflow-hidden rounded-xl border border-[#ffffff1a] bg-[#0a0a0a]"
                            style={{ top: '3vh', left: '2.5vw', width: '95vw', height: '94vh' }}
                            initial={{ opacity: 0, y: '100vh' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100vh' }}
                            transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                        >
                            <div className="absolute top-0 left-0 right-0 z-50 flex h-16 items-center justify-center border-b border-[#ffffff14] bg-[#0a0a0a] px-4">
                                <motion.button
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -8 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    onClick={handleClose}
                                    className="rounded-full border border-[#00FF00]/30 bg-[#121212]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#00FF00] transition-colors hover:bg-[#00FF00] hover:text-[#0a0a0a]"
                                >
                                    {content.backToTemplates}
                                </motion.button>
                            </div>

                            <div className="h-full pt-16">
                                <iframe
                                    src={`${expandedTemplate.previewRoute}?embed=true`}
                                    title={`${expandedTemplate.title} ${content.preview}`}
                                    className="w-full h-full border-0"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};
