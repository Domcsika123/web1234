import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Dumbbell,
    Clock,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Flame,
    Heart,
    Zap,
    Star,
    ArrowRight,
    Menu,
    X,
    Users,
    Waves,
    ChevronRight,
    Check,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA FITNESS – Konditerem sablon
   Inspired by scitecfitnessbudapest.hu
   Dark, bold, aggressive gym aesthetic
   Bebas Neue + Inter · Red/Orange accent on black
   0-24 gym style · Budapest
───────────────────────────────────────────────────────────── */

const RED = '#E53E3E';
const RED_GLOW = '#FF4444';
const ORANGE = '#F97316';
const BG = '#0A0A0A';
const BG_CARD = '#111111';
const BG_SURFACE = '#141414';
const TEXT_LIGHT = '#888';
const BORDER = '#1F1F1F';

const extras = [
    {
        icon: Waves,
        title: 'Finn szauna & Relax zóna',
        desc: 'A szaunázás során kitágulnak az erek és felgyorsul a vérkeringés. Nem csak az immunitásod támogatod vele, az izmoknak is nagyon jót tesz!',
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
    },
    {
        icon: Heart,
        title: 'Masszázs',
        desc: 'Méregtelenít, feszesíti a bőröd, ellazítja az izomzatod, regenerálja a szervezeted. Ha sportolsz, elengedhetetlen a rendszeres masszázs is.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    },
    {
        icon: Flame,
        title: 'InfraShape',
        desc: 'Az InfraShape egy olyan fekvőkerékpár, amely rendkívül intenzív zsírégetést tesz lehetővé. Extra fogyást serkentő kiegészítőkkel van felszerelve.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    },
    {
        icon: Users,
        title: 'Személyi edzés',
        desc: 'Szakmailag felkészült edzőinkkel nincs lehetetlen. Egyéni célkitűzéseid alapján személyre szabott edzéstervvel segítünk.',
        image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=600&q=80',
    },
];

const facilities = [
    { label: 'Személyi edzés', icon: Users },
    { label: 'Fitness bár', icon: Zap },
    { label: 'Egyéni étrend', icon: Heart },
    { label: 'Modern öltözők & zuhanyzók', icon: Star },
    { label: 'Finn szauna & Relax', icon: Waves },
    { label: 'Világelső erősítő- & kardio gépek', icon: Dumbbell },
];

const pricing = [
    {
        name: 'Napijegy',
        price: '3 990',
        unit: 'Ft / alkalom',
        desc: 'Teljes géppark, öltöző, zuhanyzó, szauna és relax zóna használat.',
        features: ['Erősítő- & kardio gépek', 'Öltöző & zuhanyzó', 'Finn szauna & relax zóna'],
        popular: false,
    },
    {
        name: 'Havi bérlet',
        price: '26 500',
        unit: 'Ft / hó',
        desc: 'Korlátlan belépés a vásárlás napjától számított 1 hónapig. Szauna és relax zóna is benne!',
        features: ['Korlátlan belépés', 'Finn szauna & relax zóna', 'InBody mérés', 'Fitness bár kedvezmény', 'Vendégjegy kedvezmény'],
        popular: true,
    },
    {
        name: '10 alkalmas bérlet',
        price: '25 500',
        unit: 'Ft / 60 nap',
        desc: '60 napig érvényes. Szauna és relax zóna is benne van!',
        features: ['10x belépés', 'Finn szauna & relax zóna', 'Rugalmas felhasználás', '60 nap érvényesség'],
        popular: false,
    },
];

const trainers = [
    { name: 'Takács Roland', specialty: 'Erőemelés, Funkcionális' },
    { name: 'Varga Lilla', specialty: 'Cardio, HIIT' },
    { name: 'Horváth Ádám', specialty: 'CrossFit, Erőnlét' },
    { name: 'Balogh Réka', specialty: 'Yoga, Mobility' },
    { name: 'Tóth Zsombor', specialty: 'Testépítés' },
    { name: 'Fehér Vivien', specialty: 'Booty Builder, Alakformálás' },
];

const testimonials = [
    {
        name: 'Szabó Petra',
        text: 'Közel 3000 nm-en a legmodernebb gépek, tiszta öltözők, szauna — nem kell több! Az edzők is szuperek.',
        rating: 5,
    },
    {
        name: 'Kiss Máté',
        text: 'A 0-24-es nyitvatartás nekem az élet. Hajnali edzések után szauna — ennél jobb regeneráció nincs.',
        rating: 5,
    },
    {
        name: 'Németh Anna',
        text: 'A személyi edzőm teljesen átalakította az edzéstervem. 3 hónap alatt látványos az eredmény!',
        rating: 5,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
    }),
};

export const FitnessPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const navLinks = [
        { label: 'Szolgáltatások', href: '#szolgaltatasok' },
        { label: 'Árak', href: '#arak' },
        { label: 'Edzőink', href: '#edzoink' },
        { label: 'Kapcsolat', href: '#kapcsolat' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                body { overflow-x: hidden; }
                .gf-h { font-family: 'Bebas Neue', sans-serif; }
                .gf-b { font-family: 'Inter', sans-serif; }
            `}</style>

            <div className="min-h-screen gf-b text-white" style={{ backgroundColor: BG }}>

                {/* ═══════ Preview Top Bar ═══════ */}
                {!isEmbed && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
                        style={{ backgroundColor: `${BG}ee`, borderColor: `${RED}33` }}
                    >
                        <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between">
                            <button
                                onClick={() => { navigate('/'); setTimeout(() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                                className="flex items-center gap-2 font-semibold text-sm transition-colors"
                                style={{ color: '#00FF00' }}
                            >
                                <ArrowLeft size={17} />
                                Vissza a sablonokhoz
                            </button>
                            <span className="text-xs font-medium" style={{ color: TEXT_LIGHT }}>
                                Sablon előnézet · Konditerem
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* ═══════ Navbar ═══════ */}
                <nav
                    className={`fixed left-0 right-0 z-40 backdrop-blur-xl border-b ${isEmbed ? 'top-0' : 'top-[44px]'}`}
                    style={{ backgroundColor: `${BG}dd`, borderColor: BORDER }}
                >
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16">
                        <a href="#hero" className="flex items-center gap-2">
                            <Dumbbell size={22} style={{ color: RED }} />
                            <span className="gf-h text-2xl tracking-wider">
                                AURA <span style={{ color: RED }}>FITNESS</span>
                            </span>
                        </a>

                        <div className="hidden md:flex items-center gap-7">
                            {navLinks.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    className="text-[13px] font-semibold tracking-wider uppercase text-white/40 transition-colors hover:text-white"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href="#arak"
                                className="ml-1 px-5 py-2 text-[12px] font-bold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                style={{ backgroundColor: RED }}
                            >
                                Bérletek
                            </a>
                        </div>

                        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenu(!mobileMenu)}>
                            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    <AnimatePresence>
                        {mobileMenu && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden overflow-hidden border-t"
                                style={{ backgroundColor: BG, borderColor: BORDER }}
                            >
                                <div className="px-5 py-4 space-y-3">
                                    {navLinks.map((l) => (
                                        <a
                                            key={l.label}
                                            href={l.href}
                                            onClick={() => setMobileMenu(false)}
                                            className="block text-sm font-semibold py-1 uppercase tracking-wider text-white/60"
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                    <a
                                        href="#arak"
                                        onClick={() => setMobileMenu(false)}
                                        className="block text-center py-2.5 text-sm font-bold uppercase tracking-wider text-white mt-2"
                                        style={{ backgroundColor: RED }}
                                    >
                                        Bérletek
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* ═══════ Hero ═══════ */}
                <section
                    id="hero"
                    className="relative min-h-screen flex items-center overflow-hidden"
                    style={{ paddingTop: isEmbed ? 64 : 108 }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80')",
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.4) 100%)' }} />

                    {/* Scrolling ticker top */}
                    <div className="absolute top-16 lg:top-20 left-0 right-0 overflow-hidden py-2 border-b" style={{ borderColor: BORDER }}>
                        <motion.div
                            animate={{ x: [0, -1200] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="flex gap-12 whitespace-nowrap"
                        >
                            {Array(4).fill(['FINN SZAUNA', 'EXKLUZÍV KÖRNYEZET', 'MASSZÁZS', 'VILÁGELSŐ GÉPEK', 'SZEMÉLYI EDZÉS']).flat().map((item, i) => (
                                <span key={i} className="gf-h text-lg tracking-[0.3em] text-white/10">
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="w-16 h-1 mb-6 origin-left"
                                style={{ backgroundColor: RED }}
                            />
                            <p className="text-xs font-bold tracking-[0.5em] uppercase mb-4 text-white/40">
                                Edzőterem · Budapest · 0–24
                            </p>
                            <h1 className="gf-h text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] mb-6 tracking-wide">
                                A TE <span style={{ color: RED }}>FEJLŐDÉSED</span>
                                <br />
                                A MI
                                <br />
                                <span style={{ color: RED }}>KÜLDETÉSÜNK</span>
                            </h1>
                            <p className="text-sm leading-relaxed text-white/40 mb-8 max-w-md">
                                Közel 3.000 négyzetméteren, a nap 24 órájában várnak a világ vezető
                                erősítő- és kardio gépei, finn szauna, masszázs és személyi edzés —
                                mindezt exkluzív, modern környezetben.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="#arak"
                                    className="px-7 py-3.5 text-[12px] font-bold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                    style={{ backgroundColor: RED }}
                                >
                                    Bérletek & árak
                                </a>
                                <a
                                    href="#szolgaltatasok"
                                    className="flex items-center gap-2 px-7 py-3.5 text-[12px] font-bold tracking-wider uppercase border text-white/40 transition-all hover:text-white hover:border-white/20"
                                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                                >
                                    Először jársz itt? <ChevronRight size={14} />
                                </a>
                            </div>

                            {/* Stats strip */}
                            <div className="flex gap-8 mt-12 pt-8 border-t" style={{ borderColor: BORDER }}>
                                {[
                                    { val: '3000', unit: 'm²', label: 'Edzőtér' },
                                    { val: '0–24', unit: '', label: 'Nyitvatartás' },
                                    { val: '12+', unit: '', label: 'Személyi edző' },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <span className="gf-h text-3xl" style={{ color: RED }}>
                                            {s.val}
                                        </span>
                                        <span className="gf-h text-3xl text-white/30">{s.unit}</span>
                                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/25 mt-1">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ Szolgáltatások / Extrák ═══════ */}
                <section id="szolgaltatasok" className="py-20 lg:py-28" style={{ backgroundColor: BG_SURFACE }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="mb-14"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                                <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: RED }}>
                                    Edzőterem extrákkal
                                </span>
                            </div>
                            <h2 className="gf-h text-4xl md:text-5xl tracking-wide">
                                NEM EGY SZIMPLA <span style={{ color: RED }}>FITNESS</span> TEREM
                            </h2>
                            <p className="text-sm text-white/30 mt-3 max-w-xl leading-relaxed">
                                Számos extra szolgáltatással igyekszünk teljes kikapcsolódást
                                és feltöltődést biztosítani Neked, mindezt exkluzív, modern környezetben.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {extras.map((ext, i) => (
                                <motion.div
                                    key={ext.title}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                                    variants={fadeUp}
                                    className="group overflow-hidden border transition-all hover:border-white/10"
                                    style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                                >
                                    <div className="grid sm:grid-cols-2">
                                        <div className="h-56 sm:h-auto overflow-hidden">
                                            <img
                                                src={ext.image}
                                                alt={ext.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col justify-center">
                                            <ext.icon size={24} style={{ color: RED }} className="mb-3" />
                                            <h3 className="gf-h text-2xl tracking-wide mb-2">{ext.title}</h3>
                                            <p className="text-sm text-white/30 leading-relaxed">{ext.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Facilities strip */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
                            variants={fadeUp}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10"
                        >
                            {facilities.map((f) => (
                                <div
                                    key={f.label}
                                    className="border p-4 text-center transition-all hover:border-white/10"
                                    style={{ borderColor: BORDER }}
                                >
                                    <f.icon size={20} style={{ color: RED }} className="mx-auto mb-2" />
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                                        {f.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ CTA Szalag ═══════ */}
                <div className="overflow-hidden py-4" style={{ backgroundColor: RED }}>
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="flex gap-16 whitespace-nowrap"
                    >
                        {Array(6).fill(['GYERE ÉS EDDZ VELÜNK', '0–24 NYITVA', 'BUDAPEST', 'KÖZEL 3000 M²', 'FINN SZAUNA']).flat().map((item, i) => (
                            <span key={i} className="gf-h text-xl tracking-[0.3em] text-white/80">
                                {item} ★
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* ═══════ Árak (Pricing) ═══════ */}
                <section id="arak" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-6xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                                <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: RED }}>
                                    Gyere és eddz velünk
                                </span>
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                            </div>
                            <h2 className="gf-h text-4xl md:text-5xl tracking-wide">
                                BÉRLETEK & <span style={{ color: RED }}>ÁRAK</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {pricing.map((plan, i) => (
                                <motion.div
                                    key={plan.name}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                                    variants={fadeUp}
                                    className={`border p-6 relative flex flex-col transition-all ${plan.popular ? 'border-red-500/30' : ''}`}
                                    style={{ backgroundColor: BG_CARD, borderColor: plan.popular ? `${RED}44` : BORDER }}
                                >
                                    {plan.popular && (
                                        <div
                                            className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold tracking-wider uppercase text-white"
                                            style={{ backgroundColor: RED }}
                                        >
                                            A legnépszerűbb
                                        </div>
                                    )}
                                    <h3 className="gf-h text-2xl tracking-wider mb-1">{plan.name}</h3>
                                    <p className="text-xs text-white/25 mb-4">{plan.desc}</p>
                                    <div className="mb-5">
                                        <span className="gf-h text-4xl" style={{ color: RED }}>{plan.price}</span>
                                        <span className="text-white/25 text-sm ml-1">{plan.unit}</span>
                                    </div>
                                    <ul className="space-y-2 flex-1">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2 text-sm text-white/35">
                                                <Check size={13} style={{ color: RED }} className="flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="#kapcsolat"
                                        className={`mt-5 block text-center py-3 text-[12px] font-bold tracking-wider uppercase transition-all ${plan.popular
                                            ? 'text-white hover:brightness-110'
                                            : 'border text-white/40 hover:text-white hover:border-white/15'
                                            }`}
                                        style={plan.popular ? { backgroundColor: RED } : { borderColor: BORDER }}
                                    >
                                        {plan.popular ? 'Bérlet vásárlás' : 'Válaszd ezt'}
                                    </a>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
                            variants={fadeUp}
                            className="text-center mt-6"
                        >
                            <a
                                href="#kapcsolat"
                                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all hover:gap-3"
                                style={{ color: RED }}
                            >
                                Nézd meg a teljes árlistát <ArrowRight size={15} />
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ Edzőink (Trainers) ═══════ */}
                <section id="edzoink" className="py-20 lg:py-28" style={{ backgroundColor: BG_SURFACE }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                                <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: RED }}>
                                    Edzőink
                                </span>
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                            </div>
                            <h2 className="gf-h text-4xl md:text-5xl tracking-wide">
                                SZAKMAILAG FELKÉSZÜLT <span style={{ color: RED }}>CSAPAT</span>
                            </h2>
                            <p className="text-sm text-white/30 mt-3">
                                Szakmailag felkészült edzőinkkel nincs lehetetlen.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {trainers.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.05}
                                    variants={fadeUp}
                                    className="border p-4 text-center group transition-all hover:border-white/10"
                                    style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                                >
                                    {/* Faceless avatar */}
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
                                        <svg width="40" height="40" viewBox="0 0 40 40">
                                            <circle cx="20" cy="15" r="7" fill="#333" />
                                            <ellipse cx="20" cy="36" rx="12" ry="10" fill="#333" />
                                        </svg>
                                    </div>
                                    <h4 className="text-sm font-bold text-white/80 mb-1">{t.name}</h4>
                                    <p className="text-[10px] uppercase tracking-wider" style={{ color: RED }}>{t.specialty}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Vélemények (Testimonials) ═══════ */}
                <section className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-5xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                                <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: RED }}>
                                    Tagjaink mondták
                                </span>
                                <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                            </div>
                            <h2 className="gf-h text-4xl md:text-5xl tracking-wide">
                                VÉLEMÉNYEK
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                                    variants={fadeUp}
                                    className="border p-6"
                                    style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                                >
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: t.rating }).map((_, si) => (
                                            <Star key={si} size={13} fill={ORANGE} stroke="none" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-white/35 leading-relaxed mb-5 italic">
                                        „{t.text}"
                                    </p>
                                    <p className="text-sm font-bold text-white/60">{t.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Kapcsolat (Contact) ═══════ */}
                <section id="kapcsolat" className="py-20 lg:py-28" style={{ backgroundColor: BG_SURFACE }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-14 items-start">
                            {/* Left */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-1" style={{ backgroundColor: RED }} />
                                    <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: RED }}>
                                        Kapcsolat
                                    </span>
                                </div>
                                <h2 className="gf-h text-4xl md:text-5xl tracking-wide mb-6">
                                    GYERE ÉS <span style={{ color: RED }}>EDDZ</span> VELÜNK
                                </h2>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { icon: MapPin, label: '1138 Budapest, Váci út 76.' },
                                        { icon: Phone, label: '+36 30 997 6421' },
                                        { icon: Mail, label: 'info@aurafitness.hu' },
                                        { icon: Clock, label: 'Minden nap: 0–24' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${RED}12` }}>
                                                <item.icon size={16} style={{ color: RED }} />
                                            </div>
                                            <span className="text-sm text-white/40">{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {[Instagram, Facebook].map((Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="w-10 h-10 flex items-center justify-center border transition-all hover:border-white/15"
                                            style={{ borderColor: BORDER }}
                                        >
                                            <Icon size={16} className="text-white/30" />
                                        </a>
                                    ))}
                                </div>

                                {/* Map placeholder */}
                                <div className="mt-8 h-48 flex items-center justify-center border" style={{ borderColor: BORDER, backgroundColor: BG_CARD }}>
                                    <div className="text-center">
                                        <MapPin size={28} className="mx-auto mb-2" style={{ color: RED }} />
                                        <p className="text-xs text-white/25">Budapest, Váci út 76. · Földszint</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right — Form */}
                            <motion.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
                                variants={fadeUp}
                                className="border p-7 md:p-8"
                                style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                            >
                                <h3 className="gf-h text-2xl tracking-wider mb-1">ÉRDEKLŐDSZ?</h3>
                                <p className="text-xs text-white/25 mb-6">
                                    Írj nekünk vagy gyere be személyesen!
                                </p>
                                <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1">Név</label>
                                            <input
                                                type="text"
                                                placeholder="Teljes név"
                                                className="w-full border px-4 py-2.5 text-sm text-white placeholder-white/15 bg-transparent focus:outline-none focus:border-white/15 transition-colors"
                                                style={{ borderColor: BORDER }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1">Telefon</label>
                                            <input
                                                type="tel"
                                                placeholder="+36 ..."
                                                className="w-full border px-4 py-2.5 text-sm text-white placeholder-white/15 bg-transparent focus:outline-none focus:border-white/15 transition-colors"
                                                style={{ borderColor: BORDER }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1">E-mail</label>
                                        <input
                                            type="email"
                                            placeholder="pelda@email.hu"
                                            className="w-full border px-4 py-2.5 text-sm text-white placeholder-white/15 bg-transparent focus:outline-none focus:border-white/15 transition-colors"
                                            style={{ borderColor: BORDER }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1">Melyik bérlet érdekel?</label>
                                        <select
                                            className="w-full border px-4 py-2.5 text-sm text-white/30 bg-transparent focus:outline-none focus:border-white/15 transition-colors appearance-none"
                                            style={{ borderColor: BORDER }}
                                        >
                                            <option value="" className="bg-black">Válassz bérletet...</option>
                                            <option className="bg-black">Napijegy</option>
                                            <option className="bg-black">Havi bérlet</option>
                                            <option className="bg-black">10 alkalmas bérlet</option>
                                            <option className="bg-black">Személyi edzés</option>
                                            <option className="bg-black">Egyéb</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-1">Üzenet</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Kérdésed, megjegyzésed..."
                                            className="w-full border px-4 py-2.5 text-sm text-white placeholder-white/15 bg-transparent focus:outline-none focus:border-white/15 transition-colors resize-none"
                                            style={{ borderColor: BORDER }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-[12px] font-bold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                        style={{ backgroundColor: RED }}
                                    >
                                        Küldés
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Footer ═══════ */}
                <footer className="border-t" style={{ backgroundColor: BG, borderColor: BORDER }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 grid md:grid-cols-3 gap-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Dumbbell size={20} style={{ color: RED }} />
                                <span className="gf-h text-xl tracking-wider">AURA <span style={{ color: RED }}>FITNESS</span></span>
                            </div>
                            <p className="text-sm text-white/25 leading-relaxed">
                                Edzőterem extrákkal Budapest szívében.
                                Közel 3.000 m², nap 24 órájában.
                            </p>
                            <div className="flex gap-3 mt-4">
                                {[Instagram, Facebook].map((Icon, i) => (
                                    <a key={i} href="#" className="w-9 h-9 flex items-center justify-center border border-white/5 transition-all hover:border-white/15">
                                        <Icon size={15} className="text-white/30" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: RED }}>
                                Szolgáltatások
                            </h4>
                            <ul className="text-sm space-y-2 text-white/25">
                                {extras.map((e) => (
                                    <li key={e.title}>
                                        <a href="#szolgaltatasok" className="transition-colors hover:text-white/40">{e.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: RED }}>
                                Elérhetőség
                            </h4>
                            <ul className="text-sm space-y-2 text-white/25">
                                <li className="flex items-center gap-2">
                                    <MapPin size={13} style={{ color: `${RED}88` }} />
                                    1138 Budapest, Váci út 76.
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={13} style={{ color: `${RED}88` }} />
                                    +36 30 997 6421
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={13} style={{ color: `${RED}88` }} />
                                    info@aurafitness.hu
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={13} style={{ color: `${RED}88` }} />
                                    Minden nap: 0–24
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center text-white/10 text-xs py-5 border-t" style={{ borderColor: BORDER }}>
                        © 2026 Aura Fitness. Minden jog fenntartva.
                    </div>
                </footer>
            </div>
        </>
    );
};
