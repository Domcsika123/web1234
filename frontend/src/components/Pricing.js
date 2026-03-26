import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, Clock3, Sparkles } from 'lucide-react';

const typeConfig = {
    landing: { basePrice: 90000, days: 7 },
    business: { basePrice: 130000, days: 14 },
    webshop: { basePrice: 150000, days: 14 },
    booking: { basePrice: 140000, days: 18 },
};

const DESIGN_CUSTOM_PRICE = 50000;
const EXTRA_PAGE_PRICE = 6000;
const SEO_PRICE = 29000;
const COPYWRITING_PER_PAGE = 7800;

const formatFt = (value) => `${new Intl.NumberFormat('hu-HU').format(Math.round(value))} Ft`;

export const Pricing = ({ content }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const [websiteType, setWebsiteType] = useState('landing');
    const [designType, setDesignType] = useState('template');
    const [pages, setPages] = useState(1);
    const [seo, setSeo] = useState(false);
    const [copywriting, setCopywriting] = useState(false);
    const [urgent, setUrgent] = useState(false);

    const normalizedPages = Math.max(1, Number.isNaN(Number(pages)) ? 1 : Number(pages));

    const calculation = useMemo(() => {
        const selectedType = typeConfig[websiteType] || typeConfig.landing;
        const base = selectedType.basePrice;
        const design = designType === 'custom' ? DESIGN_CUSTOM_PRICE : 0;
        const extraPages = Math.max(0, normalizedPages - 3) * EXTRA_PAGE_PRICE;
        const seoFee = seo ? SEO_PRICE : 0;
        const copywritingFee = copywriting ? normalizedPages * COPYWRITING_PER_PAGE : 0;

        const subtotal = base + design + extraPages + seoFee + copywritingFee;
        const multiplier = urgent ? 1.4 : 1;
        const total = subtotal * multiplier;
        const estimateDays = urgent ? Math.ceil(selectedType.days / 2) : selectedType.days;

        return {
            base,
            design,
            extraPages,
            seoFee,
            copywritingFee,
            subtotal,
            multiplier,
            total,
            estimateDays,
        };
    }, [websiteType, designType, normalizedPages, seo, copywriting, urgent]);

    return (
        <section
            id="pricing"
            ref={ref}
            className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
            data-testid="pricing-section"
        >
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="font-mono text-base tracking-wider text-[#00FF00]">
                        {content.tag}
                    </span>
                    <h2 className="text-headline font-bold mt-4" data-testid="pricing-headline">
                        {content.headlineStart} <span className="gradient-text">{content.headlineAccent}</span>
                    </h2>
                    <p className="text-[#A1A1AA] mt-4 max-w-2xl mx-auto">{content.subtitle}</p>
                </motion.div>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="glass rounded-2xl border border-[#ffffff10] p-6 lg:p-8"
                    >
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#D4D4D8] mb-2">{content.labels.type}</label>
                                <select
                                    value={websiteType}
                                    onChange={(e) => setWebsiteType(e.target.value)}
                                    className="w-full rounded-xl border border-[#ffffff14] bg-[#0A0A0A] px-4 py-3 text-white outline-none focus:border-[#00FF00]"
                                >
                                    {content.typeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#D4D4D8] mb-2">{content.labels.design}</label>
                                <select
                                    value={designType}
                                    onChange={(e) => setDesignType(e.target.value)}
                                    className="w-full rounded-xl border border-[#ffffff14] bg-[#0A0A0A] px-4 py-3 text-white outline-none focus:border-[#00FF00]"
                                >
                                    {content.designOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#D4D4D8] mb-2">{content.labels.pages}</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={normalizedPages}
                                    onInput={(e) => setPages(e.currentTarget.value)}
                                    onChange={(e) => setPages(e.target.value)}
                                    className="w-full rounded-xl border border-[#ffffff14] bg-[#0A0A0A] px-4 py-3 text-white outline-none focus:border-[#00FF00]"
                                />
                                <p className="text-xs text-[#71717A] mt-2">{content.hints.pages}</p>
                            </div>

                            <label className="flex items-center gap-3 rounded-xl border border-[#ffffff14] bg-[#0A0A0A] p-4 cursor-pointer">
                                <input type="checkbox" checked={seo} onChange={(e) => setSeo(e.target.checked)} className="accent-[#00FF00]" />
                                <span className="text-sm text-[#E4E4E7]">{content.extras.seo}</span>
                            </label>

                            <label className="flex items-center gap-3 rounded-xl border border-[#ffffff14] bg-[#0A0A0A] p-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={copywriting}
                                    onChange={(e) => setCopywriting(e.target.checked)}
                                    className="accent-[#00FF00]"
                                />
                                <span className="text-sm text-[#E4E4E7]">{content.extras.copywriting}</span>
                            </label>

                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#D4D4D8] mb-2">{content.labels.urgency}</label>
                                <select
                                    value={urgent ? 'urgent' : 'normal'}
                                    onChange={(e) => setUrgent(e.target.value === 'urgent')}
                                    className="w-full rounded-xl border border-[#ffffff14] bg-[#0A0A0A] px-4 py-3 text-white outline-none focus:border-[#00FF00]"
                                >
                                    {content.urgencyOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.2 }}
                        className="glass rounded-2xl border border-[#ffffff10] p-6 lg:p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Calculator className="w-5 h-5 text-[#00FF00]" />
                            <h3 className="text-xl font-bold text-white">{content.summary.title}</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <Row label={content.summary.base} value={formatFt(calculation.base)} />
                            <Row label={content.summary.design} value={formatFt(calculation.design)} />
                            <Row label={content.summary.extraPages} value={formatFt(calculation.extraPages)} />
                            <Row label={content.summary.seo} value={formatFt(calculation.seoFee)} />
                            <Row label={content.summary.copywriting} value={formatFt(calculation.copywritingFee)} />
                            <Row label={content.summary.subtotal} value={formatFt(calculation.subtotal)} accent />
                            <Row label={content.summary.multiplier} value={`${calculation.multiplier.toFixed(1)}x`} />
                        </div>

                        <div className="mt-6 pt-6 border-t border-[#1f2937]">
                            <p className="text-sm text-[#9CA3AF] mb-2">{content.summary.total}</p>
                            <p className="text-4xl font-extrabold text-[#00FF00] tracking-tight" data-testid="pricing-total">
                                {formatFt(calculation.total)}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#ffffff14] bg-[#0A0A0A] p-4">
                            <Clock3 className="w-5 h-5 text-[#00FF00]" />
                            <p className="text-sm text-[#D4D4D8]">
                                {content.summary.eta}: <span className="font-bold text-white">{calculation.estimateDays} {content.summary.days}</span>
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                const contact = document.querySelector('#contact');
                                if (contact) {
                                    const top = contact.getBoundingClientRect().top + window.scrollY;
                                    window.scrollTo({ top, behavior: 'smooth' });
                                }
                            }}
                            className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00FF00] px-5 py-3.5 font-bold text-[#0A0A0A] hover:brightness-110 transition-all"
                            data-testid="pricing-cta"
                        >
                            <Sparkles className="w-4 h-4" />
                            {content.cta}
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Row = ({ label, value, accent = false }) => (
    <div className="flex items-center justify-between gap-4">
        <span className="text-[#A1A1AA]">{label}</span>
        <span className={`font-semibold ${accent ? 'text-[#E2E8F0]' : 'text-white'}`}>{value}</span>
    </div>
);
