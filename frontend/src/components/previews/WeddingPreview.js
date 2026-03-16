import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Heart,
    Flower2,
    Camera,
    Sparkles,
    Palette,
    Gift,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Star,
    ChevronDown,
    ArrowRight,
    Quote,
    Menu,
    X,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA WEDDING – Esküvői dekoráció sablon
   LIGHT, PINK, CHEERFUL, MODERN, USER-FRIENDLY
   Content inspired by gawd.hu (Gruber Andi Wedding Decor)
   Single-page layout
───────────────────────────────────────────────────────────── */

const PINK = '#E8729A';
const PINK_LIGHT = '#F9D5E1';
const PINK_PALE = '#FEF2F6';
const PEACH = '#F5A882';
const LAVENDER = '#C3A6D8';
const BG = '#FFFBFC';
const BG_ALT = '#FFF5F8';
const BG_WARM = '#FFF9F5';
const TEXT = '#2D2024';
const TEXT_MED = '#5E4A52';
const TEXT_LIGHT = '#9C8B92';
const BORDER = '#F3E1E8';

const portfolioItems = [
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        title: 'Anna & Márk',
        location: 'Balatonfüred',
        style: 'Romantikus kert',
    },
    {
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        title: 'Lili & Gergő',
        location: 'Budapest',
        style: 'Modern elegancia',
    },
    {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
        title: 'Nóra & Dániel',
        location: 'Eger',
        style: 'Boho rusztikus',
    },
    {
        src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=800&q=80',
        title: 'Zsófi & Bence',
        location: 'Visegrád',
        style: 'Erdei ceremónia',
    },
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        title: 'Kata & Péter',
        location: 'Szentendre',
        style: 'Vintage álom',
    },
    {
        src: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=800&q=80',
        title: 'Réka & Ádám',
        location: 'Etyek',
        style: 'Szőlőbirtok',
    },
];

const services = [
    {
        icon: Flower2,
        title: 'Teljeskörű dekoráció',
        desc: 'A ceremóniától a vacsoráig mindent megálmodunk és megvalósítunk — virágok, textilek, fények, minden részlet.',
        color: PINK,
    },
    {
        icon: Palette,
        title: 'Koncepció & Styling',
        desc: 'Egyedi vizuális koncepció, moodboard, színpaletta — a ti személyiségetek lesz az inspiráció.',
        color: LAVENDER,
    },
    {
        icon: Camera,
        title: 'Grafikai arculat',
        desc: 'Meghívók, menükártyák, ültetők, welcome táblák — egységes, gyönyörű design.',
        color: PEACH,
    },
    {
        icon: Heart,
        title: 'Virágkötészet',
        desc: 'Menyasszonyi csokortól az asztaldíszekig — szezonális, friss virágokból vagy prémium selyemvirágból.',
        color: PINK,
    },
    {
        icon: Sparkles,
        title: 'Fénytechnika',
        desc: 'Hangulatfények, fényfüzérek, gyertyák — a tökéletes atmoszféra megteremtése.',
        color: LAVENDER,
    },
    {
        icon: Gift,
        title: 'Vendégajándékok',
        desc: 'Kreatív, személyre szabott köszönőajándékok, amelyek a nagy nap emlékét őrzik.',
        color: PEACH,
    },
];

const testimonials = [
    {
        couple: 'Eszter & Tamás',
        text: 'Meghaladták a legmerészebb elképzeléseinket is! Minden vendég a dekorációról beszélt hetekig. A csapat profi, kedves és végtelenül kreatív — szóval TÖKÉLETES.',
        location: 'Balatonfüred, 2025',
    },
    {
        couple: 'Dóri & Bence',
        text: 'Már a konzultáción éreztük, hogy jó kezekben vagyunk. A boho álomesküvőnk tökéletes volt — minden részlet összeillett, és a hangulat egyszerűen leírhatatlan volt.',
        location: 'Budapest, 2025',
    },
    {
        couple: 'Réka & Ádám',
        text: 'Olyan figyelmet kaptunk, mintha mi lennénk az egyetlen pár. A helyszínünk teljesen átalakult — sírva fakadtam, amikor megláttam. Köszönünk mindent! 💕',
        location: 'Eger, 2024',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] },
    }),
};

const SectionLabel = ({ children }) => (
    <span
        className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-5"
        style={{ backgroundColor: PINK_PALE, color: PINK }}
    >
        {children}
    </span>
);

export const WeddingPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const navLinks = [
        { label: 'Rólunk', href: '#rolunk' },
        { label: 'Szolgáltatások', href: '#szolgaltatasok' },
        { label: 'Portfólió', href: '#portfolio' },
        { label: 'Vélemények', href: '#velemenyek' },
        { label: 'Kapcsolat', href: '#kapcsolat' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
                body { overflow-x: hidden; }
                .wf-h { font-family: 'Playfair Display', serif; }
                .wf-b { font-family: 'DM Sans', sans-serif; }
            `}</style>

            <div className="min-h-screen wf-b" style={{ backgroundColor: BG, color: TEXT }}>

                {/* ═══════ Preview Top Bar ═══════ */}
                {!isEmbed && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
                        style={{ backgroundColor: `${BG}ee`, borderColor: BORDER }}
                    >
                        <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between">
                            <button
                                onClick={() => { navigate('/'); setTimeout(() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                                className="flex items-center gap-2 font-semibold text-sm transition-colors"
                                style={{ color: '#16a34a' }}
                            >
                                <ArrowLeft size={17} />
                                Vissza a sablonokhoz
                            </button>
                            <span className="text-xs font-medium" style={{ color: TEXT_LIGHT }}>
                                Sablon előnézet · Esküvői dekoráció
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
                        <a href="#hero" className="wf-h text-xl font-semibold tracking-wide flex items-center gap-2">
                            <Heart size={18} fill={PINK} stroke={PINK} />
                            <span>Aura <span className="italic" style={{ color: PINK }}>Wedding</span></span>
                        </a>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-7">
                            {navLinks.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    className="text-[13px] font-medium transition-colors hover:opacity-100"
                                    style={{ color: TEXT_LIGHT }}
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href="#kapcsolat"
                                className="ml-1 px-5 py-2 text-[13px] font-bold rounded-full text-white transition-all hover:shadow-lg hover:shadow-pink-200/50 hover:brightness-105"
                                style={{ background: `linear-gradient(135deg, ${PINK}, ${PEACH})` }}
                            >
                                Ajánlatkérés 💌
                            </a>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{ color: TEXT }}
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
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
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-sm font-medium py-1"
                                            style={{ color: TEXT_MED }}
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                    <a
                                        href="#kapcsolat"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-center py-2.5 text-sm font-bold rounded-full text-white mt-2"
                                        style={{ background: `linear-gradient(135deg, ${PINK}, ${PEACH})` }}
                                    >
                                        Ajánlatkérés 💌
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* ═══════ Hero ═══════ */}
                <section
                    id="hero"
                    className="relative overflow-hidden"
                    style={{ paddingTop: isEmbed ? 64 : 108 }}
                >
                    {/* Decorative blobs */}
                    <div className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{ background: PINK_LIGHT }} />
                    <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl" style={{ background: LAVENDER }} />

                    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left text */}
                            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                                <span
                                    className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-6"
                                    style={{ backgroundColor: PINK_PALE, color: PINK }}
                                >
                                    ✨ Esküvői dekoráció & Styling
                                </span>
                                <h1 className="wf-h text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.15] mb-6">
                                    Vannak az életben napok,
                                    <br />amelyek <span className="italic" style={{ color: PINK }}>örökre</span> velünk maradnak
                                </h1>
                                <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: TEXT_MED }}>
                                    Különleges emlékek, amelyeknek örökre érezzük az ízét, illatát.
                                    Egy házasságnak szerintünk pont egy ilyen varázslatos nappal kell indulnia.
                                    <strong className="font-semibold" style={{ color: TEXT }}> Ebben hiszünk és ezért dolgozunk.</strong>
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#kapcsolat"
                                        className="px-7 py-3 text-sm font-bold rounded-full text-white transition-all hover:shadow-lg hover:shadow-pink-200/50 hover:brightness-105"
                                        style={{ background: `linear-gradient(135deg, ${PINK}, ${PEACH})` }}
                                    >
                                        Ingyenes konzultáció
                                    </a>
                                    <a
                                        href="#portfolio"
                                        className="flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full border-2 transition-all hover:shadow-sm"
                                        style={{ borderColor: PINK_LIGHT, color: PINK }}
                                    >
                                        Portfólió <ArrowRight size={15} />
                                    </a>
                                </div>

                                {/* Mini stats */}
                                <div className="flex gap-8 mt-10">
                                    {[
                                        { num: '200+', label: 'Esküvő' },
                                        { num: '8+', label: 'Év tapasztalat' },
                                        { num: '100%', label: 'Szívvel' },
                                    ].map((s) => (
                                        <div key={s.label}>
                                            <span className="wf-h text-2xl font-bold" style={{ color: PINK }}>{s.num}</span>
                                            <span className="block text-[11px] font-medium uppercase tracking-wider mt-0.5" style={{ color: TEXT_LIGHT }}>
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right image collage */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                                            alt="Esküvői dekoráció"
                                            className="rounded-2xl w-full object-cover shadow-lg"
                                            style={{ height: 280 }}
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80"
                                            alt="Virágcsokor"
                                            className="rounded-2xl w-full object-cover shadow-md"
                                            style={{ height: 180 }}
                                        />
                                    </div>
                                    <div className="space-y-3 pt-8">
                                        <img
                                            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80"
                                            alt="Asztaldísz"
                                            className="rounded-2xl w-full object-cover shadow-md"
                                            style={{ height: 200 }}
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=600&q=80"
                                            alt="Esküvői boltív"
                                            className="rounded-2xl w-full object-cover shadow-lg"
                                            style={{ height: 260 }}
                                        />
                                    </div>
                                </div>
                                {/* Floating badge */}
                                <div
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3"
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <div className="flex -space-x-2">
                                        {['💍', '💐', '✨'].map((e, i) => (
                                            <span key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: PINK_PALE }}>
                                                {e}
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold" style={{ color: TEXT }}>2025/2026-os szezon</p>
                                        <p className="text-[10px]" style={{ color: TEXT_LIGHT }}>Foglalj időpontot! 🗓️</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Rólunk (About) ═══════ */}
                <section id="rolunk" className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Image */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=900&q=80"
                                        alt="Rólunk"
                                        className="rounded-3xl w-full object-cover shadow-xl"
                                        style={{ maxHeight: 500 }}
                                        loading="lazy"
                                    />
                                    {/* Floating quote card */}
                                    <div
                                        className="absolute -bottom-6 -right-4 md:right-6 max-w-[260px] p-5 rounded-2xl shadow-xl"
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <Quote size={20} style={{ color: PINK }} className="mb-2" />
                                        <p className="text-sm italic leading-relaxed" style={{ color: TEXT_MED }}>
                                            „Micsoda nap volt!" — ezt az érzést teremtjük meg minden esküvőn.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Text */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp}>
                                <SectionLabel>Rólunk</SectionLabel>
                                <h2 className="wf-h text-3xl md:text-[2.5rem] font-medium leading-tight mb-5">
                                    Ebben hiszünk
                                    <br />és ezért <span className="italic" style={{ color: PINK }}>dolgozunk</span>
                                </h2>
                                <p className="leading-relaxed mb-4" style={{ color: TEXT_MED }}>
                                    Vannak az életben napok, amelyek egész életünkre velünk maradnak. Különleges
                                    emlékek, amelyeknek örökre érezzük az ízét, illatát. Ha visszagondolunk rájuk,
                                    mámoros bizsergés tölt el.
                                </p>
                                <p className="leading-relaxed mb-6" style={{ color: TEXT_MED }}>
                                    Az alkotói folyamatunk origója mindig az a két ember, akikről ennek a napnak
                                    szólnia kell. Az ő személyiségük, rezgéseik, a kettejük kapcsolata a fő
                                    inspirációs forrásaink. Rendszerint nagyon színes, izgalmas karakterek találnak
                                    meg minket, akik gyakorlatilag egy <strong style={{ color: TEXT }}>kreatív lavinát</strong> indítanak el bennünk.
                                </p>
                                <a
                                    href="#kapcsolat"
                                    className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                                    style={{ color: PINK }}
                                >
                                    Ismerjük meg egymást <ArrowRight size={15} />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Szolgáltatások (Services) ═══════ */}
                <section id="szolgaltatasok" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <SectionLabel>Szolgáltatásaink</SectionLabel>
                            <h2 className="wf-h text-3xl md:text-[2.5rem] font-medium italic">
                                Amiben segítünk
                            </h2>
                            <p className="max-w-lg mx-auto mt-4 text-sm leading-relaxed" style={{ color: TEXT_LIGHT }}>
                                Legyen szó akár teljeskörű esküvői dekorációról, akár egyetlen virágcsokról —
                                a célunk mindig az, hogy olyan miliőt teremtsünk, amelyben mindenki jól érzi magát.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((s, i) => (
                                <motion.div
                                    key={s.title}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06}
                                    variants={fadeUp}
                                    className="rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1 group cursor-default"
                                    style={{ backgroundColor: 'white', borderColor: BORDER }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: `${s.color}15` }}
                                    >
                                        <s.icon size={22} style={{ color: s.color }} />
                                    </div>
                                    <h3 className="wf-h text-lg font-semibold mb-2" style={{ color: TEXT }}>
                                        {s.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: TEXT_LIGHT }}>
                                        {s.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Full-width inspirational divider ═══════ */}
                <div
                    className="py-16 lg:py-20 text-center"
                    style={{ background: `linear-gradient(135deg, ${PINK_PALE}, ${BG_WARM}, #F0E6FF)` }}
                >
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <Heart size={28} fill={PINK} stroke={PINK} className="mx-auto mb-4 opacity-60" />
                        <p className="wf-h text-2xl md:text-4xl font-medium italic max-w-3xl mx-auto px-6 leading-relaxed" style={{ color: TEXT }}>
                            „Bármilyen koncepció mentén induljunk el, mindig a
                            <span style={{ color: PINK }}> harmónia </span>
                            megteremtésére törekszünk."
                        </p>
                    </motion.div>
                </div>

                {/* ═══════ Portfólió (Portfolio) ═══════ */}
                <section id="portfolio" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <SectionLabel>Portfólió</SectionLabel>
                            <h2 className="wf-h text-3xl md:text-[2.5rem] font-medium italic">
                                Munkáinkból
                            </h2>
                            <p className="max-w-md mx-auto mt-4 text-sm leading-relaxed" style={{ color: TEXT_LIGHT }}>
                                Hogy a dekorációink személyre szabottak és ötletgazdagok legyenek, de
                                mégse legyen „túl sok" semmi — megmaradjon egy finom egyensúly.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {portfolioItems.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06}
                                    variants={fadeUp}
                                    className="group cursor-pointer"
                                >
                                    <div className="overflow-hidden rounded-2xl mb-3 aspect-[4/3] relative">
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-sm"
                                                style={{ backgroundColor: `${PINK}cc` }}>
                                                {item.style}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="wf-h text-lg font-semibold" style={{ color: TEXT }}>{item.title}</h3>
                                    <p className="text-sm mt-0.5" style={{ color: TEXT_LIGHT }}>📍 {item.location}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Vélemények (Testimonials) ═══════ */}
                <section id="velemenyek" className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-5xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <SectionLabel>Vélemények</SectionLabel>
                            <h2 className="wf-h text-3xl md:text-[2.5rem] font-medium italic">
                                Párok mondták 💕
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.couple}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                                    variants={fadeUp}
                                    className="rounded-2xl border p-6 transition-shadow hover:shadow-lg"
                                    style={{ backgroundColor: 'white', borderColor: BORDER }}
                                >
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: 5 }).map((_, si) => (
                                            <Star key={si} size={14} fill={PEACH} stroke="none" />
                                        ))}
                                    </div>
                                    <p className="text-sm leading-relaxed mb-5 italic" style={{ color: TEXT_MED }}>
                                        „{t.text}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                                            style={{ backgroundColor: PINK_PALE, color: PINK }}
                                        >
                                            {t.couple.split('&')[0].trim()[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold" style={{ color: TEXT }}>{t.couple}</p>
                                            <p className="text-[11px]" style={{ color: TEXT_LIGHT }}>{t.location}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ CTA Banner ═══════ */}
                <section
                    className="py-16 lg:py-20 text-center"
                    style={{ background: `linear-gradient(135deg, ${PINK}, ${PEACH})` }}
                >
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2 className="wf-h text-3xl md:text-4xl font-semibold text-white mb-4 italic">
                            Szeretnéd, hogy a te esküvőd legyen a következő? 💒
                        </h2>
                        <p className="text-white/80 text-sm max-w-md mx-auto mb-7 leading-relaxed">
                            Írj nekünk, és egyeztessünk egy ingyenes, kötelezettségmentes konzultációt.
                            Személyesen vagy online — ahogy neked kényelmes.
                        </p>
                        <a
                            href="#kapcsolat"
                            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-full transition-all hover:shadow-xl hover:brightness-105"
                            style={{ backgroundColor: 'white', color: PINK }}
                        >
                            Kapcsolatfelvétel <ArrowRight size={15} />
                        </a>
                    </motion.div>
                </section>

                {/* ═══════ Kapcsolat (Contact) ═══════ */}
                <section id="kapcsolat" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-14 items-start">
                            {/* Left */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <SectionLabel>Kapcsolat</SectionLabel>
                                <h2 className="wf-h text-3xl md:text-[2.5rem] font-medium leading-tight mb-4">
                                    Szeretnénk <span className="italic" style={{ color: PINK }}>megismerni</span>
                                    <br />a történeteteket
                                </h2>
                                <p className="leading-relaxed mb-8" style={{ color: TEXT_MED }}>
                                    Most, hogy ennyi mindent tudsz már rólunk, szeretnénk mi is kicsit közelebbről
                                    megismerni. Örülünk, ha írsz nekünk, és elmondod, miben segíthetünk. ✉️
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { icon: MapPin, label: '1052 Budapest, Váci utca 32.', color: PINK },
                                        { icon: Phone, label: '+36 30 987 6543', color: PEACH },
                                        { icon: Mail, label: 'hello@aurawedding.hu', color: LAVENDER },
                                        { icon: Instagram, label: '@aura.wedding', color: PINK },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: `${item.color}15` }}
                                            >
                                                <item.icon size={17} style={{ color: item.color }} />
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: TEXT_MED }}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Social buttons */}
                                <div className="flex gap-3 mt-8">
                                    {[
                                        { icon: Instagram, label: 'Instagram' },
                                        { icon: Facebook, label: 'Facebook' },
                                    ].map((s) => (
                                        <a
                                            key={s.label}
                                            href="#"
                                            className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all hover:shadow-sm"
                                            style={{ borderColor: BORDER, color: TEXT_MED }}
                                        >
                                            <s.icon size={14} />
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right — Form */}
                            <motion.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
                                variants={fadeUp}
                                className="rounded-2xl border p-7 md:p-8 shadow-sm"
                                style={{ backgroundColor: 'white', borderColor: BORDER }}
                            >
                                <h3 className="wf-h text-xl font-semibold mb-1" style={{ color: TEXT }}>
                                    Ajánlatkérés 💌
                                </h3>
                                <p className="text-xs mb-6" style={{ color: TEXT_LIGHT }}>
                                    Válaszolunk 24 órán belül!
                                </p>
                                <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                                Név
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Teljes név"
                                                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                                E-mail
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="pelda@email.hu"
                                                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                                Esküvő dátuma
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="2026. szeptember"
                                                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                                Létszám
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="~80 fő"
                                                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                            Stílus
                                        </label>
                                        <select
                                            className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all appearance-none"
                                            style={{ borderColor: BORDER, color: TEXT_LIGHT }}
                                        >
                                            <option value="">Válassz stílust...</option>
                                            <option>Romantikus / Klasszikus</option>
                                            <option>Boho / Rusztikus</option>
                                            <option>Modern / Minimál</option>
                                            <option>Vintage / Retro</option>
                                            <option>Extrém / Egyedi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                            Üzenet
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Meséljetek az álomesküvőtökről... 💭"
                                            className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all resize-none"
                                            style={{ borderColor: BORDER, color: TEXT }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-sm font-bold rounded-full text-white transition-all hover:shadow-lg hover:shadow-pink-200/50 hover:brightness-105"
                                        style={{ background: `linear-gradient(135deg, ${PINK}, ${PEACH})` }}
                                    >
                                        Küldés 💌
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Footer ═══════ */}
                <footer className="border-t" style={{ backgroundColor: BG_ALT, borderColor: BORDER }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 grid md:grid-cols-3 gap-10">
                        <div>
                            <span className="wf-h text-xl font-semibold flex items-center gap-2" style={{ color: TEXT }}>
                                <Heart size={16} fill={PINK} stroke={PINK} />
                                Aura <span className="italic" style={{ color: PINK }}>Wedding</span>
                            </span>
                            <p className="text-sm leading-relaxed mt-3" style={{ color: TEXT_LIGHT }}>
                                Egyedi esküvői dekorációk tervezése és megvalósítása
                                Budapesten és országszerte, 2018 óta.
                            </p>
                            <div className="flex gap-2.5 mt-4">
                                {[Instagram, Facebook].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                                        style={{ backgroundColor: PINK_PALE }}
                                    >
                                        <Icon size={15} style={{ color: PINK }} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: PINK }}>
                                Szolgáltatások
                            </h4>
                            <ul className="text-sm space-y-2" style={{ color: TEXT_LIGHT }}>
                                {services.slice(0, 4).map((s) => (
                                    <li key={s.title}>
                                        <a href="#szolgaltatasok" className="transition-colors hover:opacity-70">{s.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: PINK }}>
                                Elérhetőség
                            </h4>
                            <ul className="text-sm space-y-2" style={{ color: TEXT_LIGHT }}>
                                <li className="flex items-center gap-2">
                                    <MapPin size={13} style={{ color: PINK }} />
                                    1052 Budapest, Váci utca 32.
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={13} style={{ color: PINK }} />
                                    +36 30 987 6543
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={13} style={{ color: PINK }} />
                                    hello@aurawedding.hu
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center text-xs py-5 border-t" style={{ color: TEXT_LIGHT, borderColor: BORDER }}>
                        © 2026 Aura Wedding · Minden jog fenntartva 💕
                    </div>
                </footer>
            </div>
        </>
    );
};
