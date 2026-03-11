import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Dumbbell,
    Clock,
    MapPin,
    Users,
    Zap,
    Heart,
    ChevronRight,
    Star,
    Instagram,
    Facebook,
    Phone,
    Mail,
    Calendar,
    Trophy,
    Target,
    Flame,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA GYM – Modern konditerem landing page sablon
   Dark Mode • Inter + Bebas Neue • Neon Lime akcentusok
───────────────────────────────────────────────────────────── */

const classes = [
    {
        name: 'CrossFit',
        time: 'H-P 06:00 / 17:30',
        trainer: 'Kovács Dániel',
        intensity: 'Haladó',
        icon: Zap,
        color: '#ADFF2F',
    },
    {
        name: 'HIIT Cardio',
        time: 'H-Sz-P 07:00 / 18:00',
        trainer: 'Tóth Réka',
        intensity: 'Közepes',
        icon: Flame,
        color: '#FF6B35',
    },
    {
        name: 'Funkcionális edzés',
        time: 'K-Cs 08:00 / 19:00',
        trainer: 'Nagy Balázs',
        intensity: 'Minden szint',
        icon: Target,
        color: '#00D4FF',
    },
    {
        name: 'Yoga & Mobility',
        time: 'H-Sz-P 09:00',
        trainer: 'Szabó Laura',
        intensity: 'Kezdő',
        icon: Heart,
        color: '#E879F9',
    },
    {
        name: 'Box Edzés',
        time: 'K-Cs-Szo 17:00',
        trainer: 'Farkas Ádám',
        intensity: 'Haladó',
        icon: Trophy,
        color: '#FFD700',
    },
    {
        name: 'Erőemelés',
        time: 'H-Sz-P 16:00',
        trainer: 'Varga Tamás',
        intensity: 'Haladó',
        icon: Dumbbell,
        color: '#ADFF2F',
    },
];

const plans = [
    {
        name: 'Napi jegy',
        price: '2 990',
        period: 'alkalom',
        features: ['Teljes géppark', 'Öltöző & zuhanyzó', 'Szekrény használat'],
        highlight: false,
    },
    {
        name: 'Havi bérlet',
        price: '14 990',
        period: 'hó',
        features: [
            'Korlátlan belépés',
            'Csoportos órák',
            'Személyi edző 1x',
            'Szauna hozzáférés',
            'InBody mérés',
        ],
        highlight: true,
    },
    {
        name: 'Éves bérlet',
        price: '9 990',
        period: 'hó',
        features: [
            'Minden Havi előny',
            'Személyi edző 4x/hó',
            'Táplálkozási terv',
            'Vendégjegy 2x/hó',
            'Prémium öltöző',
            'Prioritás foglalás',
        ],
        highlight: false,
    },
];

const testimonials = [
    {
        name: 'Szabó Petra',
        role: 'Crossfit tag, 2 éve',
        text: 'Az edzők figyelme és az órarend rugalmassága páratlan. 15 kilót adtam le és jobban érzem magam, mint valaha!',
        rating: 5,
    },
    {
        name: 'Kiss Máté',
        role: 'Erőemelő, 1 éve',
        text: 'A géppark és szabadsúlyos terület Budapest egyik legjobban felszereltje. A közösség pedig fantasztikus.',
        rating: 5,
    },
    {
        name: 'Németh Anna',
        role: 'Yoga & HIIT tag',
        text: 'Hetente 4-szer jövök, és mindig új kihívásokat találok. A funkcionális edzés teljesen megváltoztatta a tartásomat.',
        rating: 5,
    },
];

const stats = [
    { value: '2 500+', label: 'Aktív tag' },
    { value: '40+', label: 'Heti óra' },
    { value: '12', label: 'Profi edző' },
    { value: '1 200m²', label: 'Edzőtér' },
];

const schedule = [
    { day: 'Hétfő – Péntek', hours: '06:00 – 22:00' },
    { day: 'Szombat', hours: '08:00 – 20:00' },
    { day: 'Vasárnap', hours: '08:00 – 18:00' },
];

export const FitnessPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const accent = '#ADFF2F';

    return (
        <>
            {/* ══════════ Google Fonts ══════════ */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                .font-display { font-family: 'Bebas Neue', sans-serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                .accent { color: ${accent}; }
                .bg-accent { background: ${accent}; }
                .border-accent { border-color: ${accent}; }
                .glow-accent { box-shadow: 0 0 30px ${accent}33, 0 0 60px ${accent}15; }
            `}</style>

            <div className="min-h-screen bg-[#0a0a0a] text-white font-body">

                {/* ══════════ Preview Top Bar ══════════ */}
                {!isEmbed && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-[#ADFF2F]/20"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                            <button
                                onClick={() => navigate('/#templates')}
                                className="flex items-center gap-2 text-[#ADFF2F] font-semibold hover:text-white transition-colors"
                            >
                                <ArrowLeft size={18} />
                                <span>Vissza a sablonokhoz</span>
                            </button>
                            <span className="text-[#A1A1AA] text-sm font-medium">Sablon előnézet • Konditerem</span>
                        </div>
                    </motion.div>
                )}

                {/* ══════════ Navbar ══════════ */}
                <nav className={`fixed left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5 ${isEmbed ? 'top-0' : 'top-[52px]'}`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
                        <a href="#hero" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-[#ADFF2F] flex items-center justify-center">
                                <Dumbbell size={22} className="text-[#0a0a0a]" />
                            </div>
                            <span className="font-display text-3xl tracking-wider">
                                AURA<span style={{ color: accent }}> GYM</span>
                            </span>
                        </a>
                        <div className="hidden md:flex items-center gap-10">
                            {[
                                { label: 'Órák', href: '#classes' },
                                { label: 'Árak', href: '#pricing' },
                                { label: 'Rólunk', href: '#about' },
                                { label: 'Kapcsolat', href: '#contact' },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm font-medium text-white/60 hover:text-[#ADFF2F] transition-colors uppercase tracking-wider"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                        <a
                            href="#pricing"
                            className="hidden md:inline-flex px-6 py-3 bg-[#ADFF2F] text-[#0a0a0a] text-xs font-bold tracking-widest rounded-lg hover:brightness-110 transition"
                        >
                            CSATLAKOZZ
                        </a>
                    </div>
                </nav>

                {/* ══════════ Hero Section ══════════ */}
                <section
                    id="hero"
                    className="relative min-h-screen flex items-center overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-20">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ADFF2F]/30 bg-[#ADFF2F]/10 text-[#ADFF2F] text-xs font-bold tracking-widest mb-8">
                                    <Zap size={14} />
                                    BUDAPEST LEGJOBB EDZŐTERME
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8"
                            >
                                VÁLTOZTASD<br />
                                MEG AZ<br />
                                <span style={{ color: accent }}>ÉLETED</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="text-white/50 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
                            >
                                Modern géppark, profi edzők, inspiráló közösség. Csatlakozz az Aura Gym családhoz és érd el a fitnesz céljaidat.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                                className="flex flex-wrap gap-4"
                            >
                                <a
                                    href="#pricing"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#ADFF2F] text-[#0a0a0a] font-bold text-sm tracking-wider rounded-lg hover:brightness-110 transition group"
                                >
                                    INGYENES PRÓBAEDZÉS
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="#classes"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium text-sm tracking-wider rounded-lg hover:border-[#ADFF2F] hover:text-[#ADFF2F] transition"
                                >
                                    ÓRAREND
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-white/30 text-xs tracking-widest uppercase">Görgess</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#ADFF2F] to-transparent" />
                    </motion.div>
                </section>

                {/* ══════════ Stats Bar ══════════ */}
                <section className="relative z-10 -mt-1 bg-[#111]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="font-display text-4xl md:text-5xl" style={{ color: accent }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-white/40 text-sm mt-2 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ About Section ══════════ */}
                <section id="about" className="py-24 lg:py-32 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="text-[#ADFF2F] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                                Rólunk
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] mb-6">
                                NEM CSAK EGY<br />
                                <span style={{ color: accent }}>EDZŐTEREM</span>
                            </h2>
                            <p className="text-white/50 leading-relaxed mb-6">
                                Az Aura Gym több mint egy konditerem – egy közösség, ahol mindenki számít.
                                1 200 m²-es, teljesen felszerelt terünkben a legmodernebb Life Fitness és
                                Hammer Strength gépekkel dolgozunk. Akár kezdő vagy, akár versenyző szintű
                                sportoló – nálunk megtalálod a helyed.
                            </p>
                            <p className="text-white/50 leading-relaxed mb-8">
                                12 profi edzőnk heti 40+ csoportos órát tart: CrossFit, HIIT, funkcionális
                                edzés, jóga és küzdősportok. Személyi edzőink személyre szabott programokkal
                                segítenek, a táplálkozási tanácsadástól az edzéstervekig.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {['Modern géppark', 'Profi edzők', 'Szauna & Wellness', 'Protein bár'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 text-xs font-bold tracking-wider border border-[#ADFF2F]/30 rounded-full text-[#ADFF2F]/80 uppercase"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-[#ADFF2F]/10">
                                <img
                                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80"
                                    alt="Aura Gym edzőterem belső tér"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-2 border-[#ADFF2F]/30 rounded-2xl" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#ADFF2F]/10 rounded-2xl" />
                        </motion.div>
                    </div>
                </section>

                {/* ══════════ Classes / Schedule ══════════ */}
                <section id="classes" className="py-24 lg:py-32 bg-[#111]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-[#ADFF2F] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                                Órarend
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl">
                                CSOPORTOS <span style={{ color: accent }}>ÓRÁK</span>
                            </h2>
                            <p className="text-white/40 mt-4 max-w-lg mx-auto">
                                Heti 40+ óra, 6 különböző edzéstípus – válaszd ki, ami hozzád illik.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classes.map((cls, i) => {
                                const Icon = cls.icon;
                                return (
                                    <motion.div
                                        key={cls.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        className="group relative bg-[#1a1a1a] border border-white/5 rounded-xl p-6 hover:border-[#ADFF2F]/30 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                                style={{ background: `${cls.color}15` }}
                                            >
                                                <Icon size={24} style={{ color: cls.color }} />
                                            </div>
                                            <span
                                                className="text-xs font-bold px-3 py-1 rounded-full"
                                                style={{
                                                    color: cls.color,
                                                    background: `${cls.color}15`,
                                                    border: `1px solid ${cls.color}30`,
                                                }}
                                            >
                                                {cls.intensity}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#ADFF2F] transition-colors">
                                            {cls.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                                            <Clock size={14} />
                                            {cls.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40 text-sm">
                                            <Users size={14} />
                                            {cls.trainer}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════════ Pricing Section ══════════ */}
                <section id="pricing" className="py-24 lg:py-32 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-[#ADFF2F] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                                Árak
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl">
                                VÁLASZD KI A <span style={{ color: accent }}>BÉRLETED</span>
                            </h2>
                            <p className="text-white/40 mt-4 max-w-lg mx-auto">
                                Átlátható árak, rejtett költségek nélkül. Minden bérlethez jár ingyenes próbaedzés.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {plans.map((plan, i) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`relative rounded-2xl p-8 border transition-all duration-300 ${plan.highlight
                                        ? 'bg-[#ADFF2F]/5 border-[#ADFF2F]/40 glow-accent scale-[1.02]'
                                        : 'bg-[#1a1a1a] border-white/10 hover:border-[#ADFF2F]/20'
                                        }`}
                                >
                                    {plan.highlight && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ADFF2F] text-[#0a0a0a] text-xs font-bold tracking-widest rounded-full uppercase">
                                            Legnépszerűbb
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="font-display text-5xl" style={{ color: plan.highlight ? accent : '#fff' }}>
                                            {plan.price}
                                        </span>
                                        <span className="text-white/40 text-sm">Ft / {plan.period}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feat) => (
                                            <li key={feat} className="flex items-center gap-3 text-sm text-white/60">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#ADFF2F]" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`w-full py-4 rounded-lg font-bold text-sm tracking-wider transition-all duration-300 ${plan.highlight
                                            ? 'bg-[#ADFF2F] text-[#0a0a0a] hover:brightness-110'
                                            : 'border border-white/20 text-white hover:border-[#ADFF2F] hover:text-[#ADFF2F]'
                                            }`}
                                    >
                                        BÉRLET VÁSÁRLÁS
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ Testimonials ══════════ */}
                <section className="py-24 lg:py-32 bg-[#111]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-[#ADFF2F] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                                Vélemények
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl">
                                TAGJAINK <span style={{ color: accent }}>MONDTÁK</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-[#1a1a1a] border border-white/5 rounded-xl p-8 hover:border-[#ADFF2F]/20 transition-colors"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, j) => (
                                            <Star key={j} size={16} className="fill-[#ADFF2F] text-[#ADFF2F]" />
                                        ))}
                                    </div>
                                    <p className="text-white/60 leading-relaxed mb-6 italic">„{t.text}"</p>
                                    <div>
                                        <div className="font-bold text-sm">{t.name}</div>
                                        <div className="text-white/30 text-xs mt-1">{t.role}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ Gallery ══════════ */}
                <section className="py-24 lg:py-32 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-[#ADFF2F] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                                Galéria
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl">
                                NÉZZ <span style={{ color: accent }}>KÖRÜL</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
                                'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80',
                                'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
                                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
                                'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80',
                                'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=600&q=80',
                            ].map((src, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="aspect-square rounded-xl overflow-hidden group"
                                >
                                    <img
                                        src={src}
                                        alt={`Aura Gym galéria ${i + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ CTA Section ══════════ */}
                <section className="py-24 lg:py-32 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=2000&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-[#0a0a0a]/85" />
                    <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-display text-5xl md:text-7xl mb-6">
                                KEZDD EL <span style={{ color: accent }}>MA</span>
                            </h2>
                            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                                Az első lépés a legnehezebb – de mi megkönnyítjük.
                                Gyere el egy ingyenes próbaedzésre és győződj meg róla, hogy az Aura Gym a te helyed.
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-[#ADFF2F] text-[#0a0a0a] font-bold text-sm tracking-widest rounded-lg hover:brightness-110 transition group"
                            >
                                INGYENES PRÓBAEDZÉS
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════ Contact & Map ══════════ */}
                <section id="contact" className="py-24 lg:py-32 bg-[#111]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-[#ADFF2F] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                                Kapcsolat
                            </span>
                            <h2 className="font-display text-5xl md:text-6xl">
                                LÁTOGASS <span style={{ color: accent }}>EL</span>
                            </h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { icon: MapPin, label: 'Cím', value: 'Budapest, Váci út 88.' },
                                        { icon: Phone, label: 'Telefon', value: '+36 30 123 4567' },
                                        { icon: Mail, label: 'E-mail', value: 'info@auragym.hu' },
                                        { icon: Clock, label: 'Nyitvatartás', value: 'H-P: 06-22, Szo-V: 08-20' },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.label}
                                                className="flex items-start gap-4 p-5 bg-[#1a1a1a] rounded-xl border border-white/5"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#ADFF2F]/10 flex items-center justify-center flex-shrink-0">
                                                    <Icon size={18} className="text-[#ADFF2F]" />
                                                </div>
                                                <div>
                                                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                                                    <div className="text-sm font-medium">{item.value}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="p-6 bg-[#1a1a1a] rounded-xl border border-white/5">
                                    <h3 className="font-bold text-lg mb-4">Nyitvatartás</h3>
                                    <div className="space-y-3">
                                        {schedule.map((s) => (
                                            <div key={s.day} className="flex justify-between items-center text-sm">
                                                <span className="text-white/60">{s.day}</span>
                                                <span className="font-medium text-[#ADFF2F]">{s.hours}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-80 lg:h-full min-h-[320px] bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-white/30 text-sm border border-white/5">
                                [ Google Maps integráció helye ]
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ Footer ══════════ */}
                <footer className="bg-[#0a0a0a] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                        <div className="grid md:grid-cols-4 gap-12 mb-12">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[#ADFF2F] flex items-center justify-center">
                                        <Dumbbell size={22} className="text-[#0a0a0a]" />
                                    </div>
                                    <span className="font-display text-3xl tracking-wider">
                                        AURA<span style={{ color: accent }}> GYM</span>
                                    </span>
                                </div>
                                <p className="text-white/40 leading-relaxed max-w-sm mb-6">
                                    Budapest szívében, ahol a motiváció és a szakértelem találkozik.
                                    Csatlakozz hozzánk, és légy a legjobb változatod.
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[#ADFF2F] hover:bg-[#ADFF2F]/10 transition-all">
                                        <Instagram size={18} />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[#ADFF2F] hover:bg-[#ADFF2F]/10 transition-all">
                                        <Facebook size={18} />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navigáció</h4>
                                <ul className="space-y-3 text-sm">
                                    {['Órák', 'Árak', 'Rólunk', 'Kapcsolat'].map((link) => (
                                        <li key={link}>
                                            <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-[#ADFF2F] transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Szolgáltatások</h4>
                                <ul className="space-y-3 text-sm">
                                    {['Személyi edzés', 'Csoportos órák', 'Táplálkozási tanácsadás', 'Szauna & Wellness'].map((item) => (
                                        <li key={item}>
                                            <span className="text-white/40">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="text-center text-white/20 text-xs pt-8 border-t border-white/5">
                            © 2026 Aura Gym. Minden jog fenntartva.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};
