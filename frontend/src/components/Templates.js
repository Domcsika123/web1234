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
        href: 'preview.html?theme=fitness',
        image: 'https://picsum.photos/seed/fitness-template/900/560',
    },
    {
        id: 'law',
        title: 'Ügyvédi iroda weboldal',
        category: 'Law',
        description: 'Bizalmat építő vállalati megjelenés, szolgáltatásfókuszú struktúra és kapcsolatfelvétel.',
        href: 'preview.html?theme=law',
        image: 'https://picsum.photos/seed/law-template/900/560',
    },
    {
        id: 'barber',
        title: 'Fodrászat weboldal',
        category: 'Beauty',
        description: 'Időpontfoglalásra optimalizált, vizuálisan erős sablon szolgáltatás- és árlistával.',
        href: 'preview.html?theme=barber',
        image: 'https://picsum.photos/seed/barber-template/900/560',
    },
    {
        id: 'wedding',
        title: 'Esküvői dekoráció',
        category: 'Wedding',
        description: 'Portfólió- és ajánlatkérés-központú sablon prémium vizuális hangsúlyokkal.',
        href: 'preview.html?theme=wedding',
        image: 'https://picsum.photos/seed/wedding-template/900/560',
    },
    {
        id: 'moto',
        title: 'Motor tartozék webshop',
        category: 'E-commerce',
        description: 'Termékfókuszú webshop struktúra gyors navigációval és konverzióra hangolt felülettel.',
        href: 'preview.html?theme=moto-shop',
        image: 'https://picsum.photos/seed/moto-template/900/560',
    },
];

const TemplateCard = ({ template, index, mobile = false, onPreview, isExpanding }) => (
    <motion.article
        layoutId={`card-container-${template.id}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        className={`group relative overflow-hidden rounded-[12px] border border-[#ffffff1a] bg-[#1e1e1e] transition-all duration-300 hover:-translate-y-[5px] ${mobile ? 'min-w-[88%] snap-start' : ''} ${isExpanding ? 'invisible' : ''}`}
        data-testid={`template-card-${index}`}
    >
        <span className="absolute right-3 top-3 z-10 rounded-full border border-[#00FF00]/30 bg-[#0A0A0A]/90 px-2.5 py-1 text-[11px] font-medium text-[#00FF00]">
            {template.category}
        </span>

        <motion.div layoutId={`card-image-${template.id}`} className="aspect-[16/10] w-full overflow-hidden">
            <img
                src={template.image}
                alt={`${template.title} sablon előnézet`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
            />
        </motion.div>

        <motion.div layoutId={`card-content-${template.id}`} className="p-5">
            <h3 className="text-xl font-bold text-white">{template.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{template.description}</p>
            <button
                onClick={() => onPreview && onPreview(template)}
                className="mt-5 inline-flex items-center justify-center rounded-lg border border-[#00FF00]/35 px-4 py-2 text-sm font-semibold text-[#00FF00] transition-colors duration-300 group-hover:bg-[#00FF00] group-hover:text-[#0A0A0A]"
                data-testid={`template-cta-${index}`}
            >
                Előnézet
            </button>
        </motion.div>
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
            if (template.id === 'gastro' && window.innerWidth >= 1024) {
                setExpandedTemplate(template);
                setTimeout(() => setShowIframe(true), 500);
                return;
            }
            navigate(template.previewRoute);
        }
    };

    const handleClose = () => {
        setShowIframe(false);
        setTimeout(() => setExpandedTemplate(null), 50);
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
                        Kész, modern alapok, amelyeket a márkádra szabunk.
                    </p>
                </motion.div>

                <div className="lg:hidden -mx-6 px-6 overflow-x-auto hide-scrollbar">
                    <div className="flex snap-x snap-mandatory gap-4 pb-2">
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
            <AnimatePresence>
                {expandedTemplate && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                            onClick={handleClose}
                        />

                        {/* Expanding Card → Fullscreen */}
                        <motion.div
                            layoutId={`card-container-${expandedTemplate.id}`}
                            className="fixed z-50 overflow-hidden rounded-xl border border-[#ffffff1a] bg-[#0a0a0a]"
                            initial={false}
                            animate={{
                                top: '3vh',
                                left: '2.5vw',
                                width: '95vw',
                                height: '94vh',
                                borderRadius: '12px',
                            }}
                            exit={{
                                borderRadius: '12px',
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 30,
                            }}
                        >
                            {/* Close button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[#121212]/90 border border-[#00FF00]/30 text-[#00FF00] hover:bg-[#00FF00] hover:text-[#0a0a0a] transition-colors"
                            >
                                <X size={20} />
                            </motion.button>

                            {/* Transitioning Image */}
                            {!showIframe && (
                                <motion.div
                                    layoutId={`card-image-${expandedTemplate.id}`}
                                    className="w-full h-full"
                                >
                                    <img
                                        src={expandedTemplate.image}
                                        alt={expandedTemplate.title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            )}

                            {/* Iframe fades in after expansion */}
                            <AnimatePresence>
                                {showIframe && (
                                    <motion.iframe
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
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
