import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const templates = [
    {
        id: 'gastro',
        title: 'Étterem',
        category: 'Gastro',
        description: 'Modern éttermi bemutatkozó oldal online asztalfoglalás fókuszú felépítéssel.',
        previewRoute: '/preview/gastro',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'fitness',
        title: 'Konditerem',
        category: 'Fitness',
        description: 'Bérlet- és órarendközpontú landing oldal edzői bemutatkozással és CTA blokkokkal.',
        previewRoute: '/preview/fitness',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'law',
        title: 'Ügyvédi iroda',
        category: 'Law',
        description: 'Bizalmat építő vállalati megjelenés, szolgáltatásfókuszú struktúra és kapcsolatfelvétel.',
        previewRoute: '/preview/law',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'barber',
        title: 'Borbélyszalon',
        category: 'Beauty',
        description: 'Időpontfoglalásra optimalizált, vizuálisan erős sablon szolgáltatás- és árlistával.',
        previewRoute: '/preview/barber',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'wedding',
        title: 'Esküvői dekoráció',
        category: 'Wedding',
        description: 'Portfólió- és ajánlatkérés-központú sablon prémium vizuális hangsúlyokkal.',
        previewRoute: '/preview/wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'moto',
        title: 'Szépségszalon',
        category: 'Beauty',
        description: 'Prémium megjelenésű sablon online időpontfoglaláshoz, kezelési listához és bizalomépítő bemutatkozáshoz.',
        previewRoute: '/preview/beauty',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    },
];

const TemplateCard = ({ template, index, mobile = false, onPreview, isExpanding, isActive, cardRef }) => (
    <motion.article
        ref={cardRef}
        initial={mobile ? false : { opacity: 0, y: 24 }}
        whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
        viewport={mobile ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: mobile ? 0 : index * 0.06 }}
        className={`relative flex h-[420px] lg:h-[460px] flex-col overflow-hidden rounded-[12px] border bg-[#1e1e1e] transition-all duration-300
            ${mobile ? 'min-w-[78%] max-w-[78%] snap-start flex-shrink-0' : 'group hover:-translate-y-[5px]'}
            ${mobile && isActive ? 'border-[#00FF00]/70' : 'border-[#ffffff1a]'}
            ${mobile && !isActive ? 'opacity-50' : ''}
            ${isExpanding ? 'invisible' : ''}`}
        data-testid={`template-card-${index}`}
    >
        <div className="aspect-[16/10] w-full overflow-hidden pointer-events-none">
            <img
                src={template.image}
                alt={`${template.title} sablon előnézet`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
            />
        </div>

        <div className="p-5 flex flex-1 flex-col pointer-events-none">
            <h3 className="text-xl font-bold text-white">{template.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{template.description}</p>
            <button
                onClick={() => onPreview && onPreview(template)}
                className={`pointer-events-auto mt-auto inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-300
                    ${mobile && isActive
                        ? 'border-[#00FF00] bg-[#00FF00] text-[#0A0A0A]'
                        : 'border-[#00FF00]/35 text-[#00FF00] hover:bg-[#00FF00] hover:text-[#0A0A0A]'
                    }`}
                data-testid={`template-cta-${index}`}
            >
                Előnézet
            </button>
        </div>
    </motion.article>
);

export const Templates = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const [expandedTemplate, setExpandedTemplate] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
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
            className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
            data-testid="templates-section"
        >
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-left lg:text-center"
                >
                    <span className="font-mono text-base text-[#00FF00] tracking-wider">
                        04 // WEBOLDAL SABLONOK
                    </span>
                    <h2 className="text-headline font-bold mt-4" data-testid="templates-headline">
                        Választható <span className="gradient-text">iparági sablonok</span>
                    </h2>
                    <p className="mt-4 text-[#A1A1AA] lg:max-w-2xl lg:mx-auto">
                        Ezek csak kiindulópontok. Bármilyen egyedi funkciót vagy designt megvalósítunk.
                    </p>
                </motion.div>

                <div
                    ref={scrollRef}
                    className="lg:hidden -mx-6 px-6 overflow-x-auto hide-scrollbar"
                    style={{ scrollPaddingLeft: '24px', overscrollBehaviorX: 'contain', paddingTop: '8px', paddingBottom: '8px' }}
                >
                    <div className="flex items-start snap-x snap-mandatory gap-4" style={{ paddingRight: '24px' }}>
                        {templates.map((template, index) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                index={index}
                                mobile
                                onPreview={handlePreview}
                                isExpanding={expandedTemplate?.id === template.id}
                                isActive={activeIndex === index}
                                cardRef={el => cardRefs.current[index] = el}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile dot indicators */}
                <div className="lg:hidden flex justify-center gap-2 mt-5">
                    {templates.map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 h-2 bg-[#00FF00]' : 'w-2 h-2 bg-[#ffffff20]'}`}
                        />
                    ))}
                </div>

                <div className="hidden lg:grid grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={index}
                            onPreview={handlePreview}
                            isExpanding={expandedTemplate?.id === template.id}
                        />
                    ))}
                </div>
            </div>

            {/* Expanding Preview Overlay */}
            <AnimatePresence mode="wait">
                {expandedTemplate && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                            onClick={handleClose}
                        />

                        {/* Expanding Card → Fullscreen */}
                        <motion.div
                            className="fixed z-50 overflow-hidden rounded-xl border border-[#ffffff1a] bg-[#0a0a0a]"
                            style={{
                                top: '3vh',
                                left: '2.5vw',
                                width: '95vw',
                                height: '94vh',
                            }}
                            initial={{ opacity: 0, y: '100vh' }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: '100vh',
                            }}
                            transition={{
                                duration: 0.65,
                                ease: [0.32, 0.72, 0, 1],
                            }}
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
                                    Vissza a sablonokhoz
                                </motion.button>
                            </div>

                            <div className="h-full pt-16">
                                <iframe
                                    src={`${expandedTemplate.previewRoute}?embed=true`}
                                    title={`${expandedTemplate.title} előnézet`}
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
