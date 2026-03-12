import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const templates = [
    {
        id: 'gastro',
        title: 'Étterem weboldal',
        category: 'Gastro',
        description: 'Modern éttermi bemutatkozó oldal online asztalfoglalás fókuszú felépítéssel.',
        previewRoute: '/preview/gastro',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'fitness',
        title: 'Konditerem weboldal',
        category: 'Fitness',
        description: 'Bérlet- és órarendközpontú landing oldal edzői bemutatkozással és CTA blokkokkal.',
        previewRoute: '/preview/fitness',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'law',
        title: 'Ügyvédi iroda weboldal',
        category: 'Law',
        description: 'Bizalmat építő vállalati megjelenés, szolgáltatásfókuszú struktúra és kapcsolatfelvétel.',
        previewRoute: '/preview/law',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'barber',
        title: 'Borbélyszalon weboldal',
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
        title: 'Szépségszalon weboldal',
        category: 'Beauty',
        description: 'Prémium megjelenésű sablon online időpontfoglaláshoz, kezelési listához és bizalomépítő bemutatkozáshoz.',
        previewRoute: '/preview/beauty',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    },
];

const TemplateCard = ({ template, index, mobile = false, onPreview, isExpanding }) => (
    <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        className={`group relative overflow-hidden rounded-[12px] border border-[#ffffff1a] bg-[#1e1e1e] transition-all duration-300 hover:-translate-y-[5px] ${mobile ? 'min-w-[78%] max-w-[78%] snap-start flex-shrink-0' : ''} ${isExpanding ? 'invisible' : ''}`}
        data-testid={`template-card-${index}`}
    >
        <div className="aspect-[16/10] w-full overflow-hidden">
            <img
                src={template.image}
                alt={`${template.title} sablon előnézet`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
            />
        </div>

        <div className="p-5">
            <h3 className="text-xl font-bold text-white">{template.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{template.description}</p>
            <button
                onClick={() => onPreview && onPreview(template)}
                className="mt-5 inline-flex items-center justify-center rounded-lg border border-[#00FF00]/35 px-4 py-2 text-sm font-semibold text-[#00FF00] transition-colors duration-300 group-hover:bg-[#00FF00] group-hover:text-[#0A0A0A]"
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
    const navigate = useNavigate();
    const [expandedTemplate, setExpandedTemplate] = useState(null);
    const [showIframe, setShowIframe] = useState(false);

    const handlePreview = (template) => {
        if (template.previewRoute) {
            if (window.innerWidth >= 1024) {
                setExpandedTemplate(template);
                setTimeout(() => setShowIframe(true), 380);
                return;
            }
            navigate(template.previewRoute);
        }
    };

    const handleClose = () => {
        setShowIframe(false);
        // Megvárjuk az animáció végét (0.65s = 650ms) mielőtt eltávolítjuk a DOM-ból
        setTimeout(() => setExpandedTemplate(null), 650);
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
                        WEBOLDAL SABLONOK
                    </span>
                    <h2 className="text-headline font-bold mt-4" data-testid="templates-headline">
                        Választható <span className="gradient-text">iparági sablonok</span>
                    </h2>
                    <p className="mt-4 text-[#A1A1AA] lg:max-w-2xl lg:mx-auto">
                        Ezek csak kiindulópontok. Bármilyen egyedi funkciót vagy designt megvalósítunk.
                    </p>
                </motion.div>

                <div className="lg:hidden -mx-6 px-6 overflow-x-auto hide-scrollbar" style={{ scrollPaddingLeft: '24px' }}>
                    <div className="flex snap-x snap-mandatory gap-4 pb-2" style={{ paddingRight: '24px' }}>
                        {templates.map((template, index) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                index={index}
                                mobile
                                onPreview={handlePreview}
                                isExpanding={expandedTemplate?.id === template.id}
                            />
                        ))}
                    </div>
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
                            {/* Close button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[#121212]/90 border border-[#00FF00]/30 text-[#00FF00] hover:bg-[#00FF00] hover:text-[#0a0a0a] transition-colors"
                            >
                                <X size={20} />
                            </motion.button>

                            {/* Transitioning Image */}
                            {!showIframe && (
                                <div className="w-full h-full">
                                    <img
                                        src={expandedTemplate.image}
                                        alt={expandedTemplate.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Iframe fades in after expansion */}
                            <AnimatePresence>
                                {showIframe && (
                                    <motion.iframe
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                                        src={`${expandedTemplate.previewRoute}?embed=true`}
                                        title={`${expandedTemplate.title} előnézet`}
                                        className="absolute inset-0 w-full h-full border-0"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};
