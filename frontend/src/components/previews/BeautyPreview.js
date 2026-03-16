import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Scissors,
    Sparkles,
    Clock,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Star,
    ArrowRight,
    Menu,
    X,
    Heart,
    Gem,
    Eye,
    Hand,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA BEAUTY – Szépségszalon sablon
   Inspired by heaveninstyle.hu
   Light luxury theme · Poppins + Playfair Display
   Elegant, premium feel with gold accents on cream/white
───────────────────────────────────────────────────────────── */

const GOLD = '#C5A467';
const GOLD_LIGHT = '#E8D5AA';
const GOLD_PALE = '#FAF6ED';
const CHARCOAL = '#1A1A1A';
const BG = '#FDFCFA';
const BG_ALT = '#F9F7F3';
const BG_DARK = '#111111';
const TEXT = '#1A1A1A';
const TEXT_MED = '#555048';
const TEXT_LIGHT = '#9A9389';
const BORDER = '#EBE6DC';

const serviceCategories = [
    {
        icon: Scissors,
        title: 'Fodrászat',
        desc: 'Női és férfi vágás, festés, melírozás, balayage, tőfestés, szárítás — prémium termékekkel.',
        treatments: ['Női hajvágás', 'Férfi hajvágás', 'Festés', 'Melírozás / Balayage', 'Keratinos kezelés', 'Treat.Me hajkezelés'],
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    },
    {
        icon: Hand,
        title: 'Manikűr',
        desc: 'Alap manikűrtől az építésig — gél lakk, japán manikűr, műköröm, férfi manikűr.',
        treatments: ['Alap manikűr', 'Gél lakk', 'Japán manikűr', 'Műkörömépítés', 'Pótlás / Javítás', 'Eltávolítás'],
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
    },
    {
        icon: Gem,
        title: 'Pedikűr',
        desc: 'Alap pedikűrtől a gyógypedikűrig — CND Shellac, Callux szikementes pedikűr, szaktanácsadás.',
        treatments: ['Alap pedikűr', 'Gyógypedikűr', 'Shellac pedikűr', 'Callux kezelés', 'Férfi pedikűr', 'Diabetikus pedikűr'],
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80',
    },
    {
        icon: Eye,
        title: 'Kozmetika',
        desc: 'Arctisztítás, hidratálás, anti-aging kezelések, szemöldök- és szempilla szolgáltatások.',
        treatments: ['Arctisztítás', 'Hidratáló kezelés', 'Anti-aging', 'Szemöldökformázás', 'Szempilla lifting', 'Műszempilla'],
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    },
];

const testimonials = [
    {
        name: 'Lili',
        text: 'Nagyon jó szakemberek: alapos munkát végeznek, lelkiismeretesek. Mindent szívesen elmagyaráznak, hasznos tanácsokkal látnak el. Jó szívvel ajánlom mindenkinek!',
        source: 'Google',
        rating: 5,
    },
    {
        name: 'Zsófi',
        text: 'Nagyon szeretem a különleges átmenetet amit kaptam. A szalon igazán igényes, a fodrász nagyon kedves, figyelmes és precíz. Csak ajánlani tudom!',
        source: 'Google',
        rating: 5,
    },
    {
        name: 'Fanni',
        text: 'Nagyon igényes környezet, jól képzett szakemberek és remek lokáció. Prémium termékekkel dolgoznak, az eredmény mindig lenyűgöző. Mindenkinek ajánlom! 😊',
        source: 'Google',
        rating: 5,
    },
    {
        name: 'Beáta',
        text: 'Rendkívül segítőkész, alapos, pontos és precíz az egész csapat. Nagyon hálás vagyok a sok tanácsért, amiket egy-egy alkalommal kapok. Visszatérő vendég vagyok!',
        source: 'Google',
        rating: 5,
    },
];

const openingHours = [
    { day: 'Hétfő – Péntek', hours: '8:00 – 21:00' },
    { day: 'Szombat', hours: '10:00 – 20:00' },
    { day: 'Vasárnap', hours: 'Zárva' },
];

const partners = ['Kevin Murphy', 'Authentic Beauty Concept', 'OPI', 'CND Shellac', 'Vagheggi'];

const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] },
    }),
};

export const BeautyPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const navLinks = [
        { label: 'Rólunk', href: '#rolunk' },
        { label: 'Szolgáltatások', href: '#szolgaltatasok' },
        { label: 'Vélemények', href: '#velemenyek' },
        { label: 'Kapcsolat', href: '#kapcsolat' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600;700&display=swap');
                body { overflow-x: hidden; }
                .bf-h { font-family: 'Playfair Display', serif; }
                .bf-b { font-family: 'Poppins', sans-serif; }
            `}</style>

            <div className="min-h-screen bf-b" style={{ backgroundColor: BG, color: TEXT }}>

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
                                Sablon előnézet · Szépségszalon
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
                        <a href="#hero" className="bf-h text-xl font-semibold tracking-wider uppercase" style={{ color: TEXT }}>
                            Aura <span style={{ color: GOLD }}>Beauty</span>
                        </a>

                        <div className="hidden md:flex items-center gap-7">
                            {navLinks.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    className="text-[13px] font-medium tracking-wide uppercase transition-colors hover:opacity-100"
                                    style={{ color: TEXT_LIGHT }}
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href="#kapcsolat"
                                className="ml-1 px-5 py-2 text-[12px] font-semibold tracking-wider uppercase rounded-none text-white transition-all hover:brightness-110"
                                style={{ backgroundColor: CHARCOAL }}
                            >
                                Időpontfoglalás
                            </a>
                        </div>

                        <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)} style={{ color: TEXT }}>
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
                                            className="block text-sm font-medium py-1 uppercase tracking-wide"
                                            style={{ color: TEXT_MED }}
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                    <a
                                        href="#kapcsolat"
                                        onClick={() => setMobileMenu(false)}
                                        className="block text-center py-2.5 text-sm font-semibold uppercase tracking-wider text-white mt-2"
                                        style={{ backgroundColor: CHARCOAL }}
                                    >
                                        Időpontfoglalás
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
                    <div className="relative min-h-[85vh] flex items-center">
                        {/* BG image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80')",
                            }}
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.6) 50%, rgba(26,26,26,0.2) 100%)' }} />

                        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full">
                            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-px" style={{ backgroundColor: GOLD }} />
                                    <span className="text-xs font-semibold tracking-[0.4em] uppercase" style={{ color: GOLD }}>
                                        Szépség & Luxus
                                    </span>
                                </div>
                                <h1 className="bf-h text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.15] text-white mb-5">
                                    Ahol te vagy
                                    <br />a <span className="italic" style={{ color: GOLD }}>mennyekben</span>
                                </h1>
                                <p className="text-sm leading-relaxed text-white/60 mb-8 max-w-md">
                                    Trendkövető és trendújító szalon, ahol mind a konzervatívabb, mind pedig az
                                    újdonságra vágyó hölgyek és urak egyaránt megtalálhatják a nekik tetsző stílust.
                                    Szakképzett kollégáink prémium kategóriás, minőségi alapanyagokkal dolgoznak.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#kapcsolat"
                                        className="px-7 py-3 text-[12px] font-semibold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                        style={{ backgroundColor: GOLD }}
                                    >
                                        Online bejelentkezés
                                    </a>
                                    <a
                                        href="#szolgaltatasok"
                                        className="flex items-center gap-2 px-7 py-3 text-[12px] font-semibold tracking-wider uppercase border text-white/70 transition-all hover:text-white hover:border-white/40"
                                        style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                                    >
                                        Szolgáltatások
                                    </a>
                                </div>

                                {/* Opening hours badge */}
                                <div className="mt-10 flex items-center gap-3 text-white/50">
                                    <Clock size={15} style={{ color: GOLD }} />
                                    <span className="text-xs font-medium">H–P: 8:00–21:00 · Szo: 10:00–20:00</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Rólunk (About) ═══════ */}
                <section id="rolunk" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Images */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="grid grid-cols-2 gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=500&q=80"
                                        alt="Szalon belső"
                                        className="w-full object-cover shadow-md col-span-2"
                                        style={{ height: 280 }}
                                        loading="lazy"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80"
                                        alt="Manikűr"
                                        className="w-full object-cover shadow-md"
                                        style={{ height: 200 }}
                                        loading="lazy"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80"
                                        alt="Kozmetika"
                                        className="w-full object-cover shadow-md"
                                        style={{ height: 200 }}
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>

                            {/* Text */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                                    <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD }}>Rólunk</span>
                                </div>
                                <h2 className="bf-h text-3xl md:text-[2.4rem] font-medium leading-tight mb-5">
                                    Szépség és <span className="italic" style={{ color: GOLD }}>luxus</span>,
                                    <br />Budapest belvárosában
                                </h2>
                                <p className="leading-relaxed mb-4" style={{ color: TEXT_MED }}>
                                    Szalonunkban megtalálható a férfi és női fodrászat, kozmetika, manikűr,
                                    pedikűr–gyógypedikűr és műkörömépítés. Szakképzett kollégáink prémium
                                    kategóriás, minőségi alapanyagokkal dolgoznak.
                                </p>
                                <p className="leading-relaxed mb-6" style={{ color: TEXT_MED }}>
                                    Pontosan tudjuk, hogy a szalonon túl is van élet. A tökéletes otthoni ápoláshoz
                                    szükséges teljes körű tanácsadást is kapsz tőlünk, amelyeket követve
                                    fenntarthatod az elért eredményeket, hogy a következő találkozásunkig ragyogj.
                                </p>

                                {/* Partner brands */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {partners.map((p) => (
                                        <span
                                            key={p}
                                            className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase"
                                            style={{ backgroundColor: GOLD_PALE, color: GOLD }}
                                        >
                                            {p}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href="#szolgaltatasok"
                                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-all hover:gap-3"
                                    style={{ color: GOLD }}
                                >
                                    Szolgáltatásaink <ArrowRight size={15} />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Szolgáltatások (Services) ═══════ */}
                <section id="szolgaltatasok" className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                                <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD }}>Szolgáltatásaink</span>
                                <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                            </div>
                            <h2 className="bf-h text-3xl md:text-[2.4rem] font-medium italic">
                                Amiben segítünk
                            </h2>
                            <p className="max-w-lg mx-auto mt-3 text-sm leading-relaxed" style={{ color: TEXT_LIGHT }}>
                                Szalonunkban csak luxus termékekkel dolgozunk, amelyek nem csak a minőséget,
                                de az elégedettséget is biztosítják.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {serviceCategories.map((cat, i) => (
                                <motion.div
                                    key={cat.title}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                                    variants={fadeUp}
                                    className="group overflow-hidden border transition-shadow hover:shadow-lg"
                                    style={{ backgroundColor: 'white', borderColor: BORDER }}
                                >
                                    <div className="grid sm:grid-cols-2">
                                        {/* Image side */}
                                        <div className="overflow-hidden h-64 sm:h-auto">
                                            <img
                                                src={cat.image}
                                                alt={cat.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                        {/* Content side */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <cat.icon size={18} style={{ color: GOLD }} />
                                                <h3 className="bf-h text-xl font-semibold" style={{ color: TEXT }}>
                                                    {cat.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT_LIGHT }}>
                                                {cat.desc}
                                            </p>
                                            <ul className="space-y-1.5">
                                                {cat.treatments.map((t) => (
                                                    <li key={t} className="flex items-center gap-2 text-sm" style={{ color: TEXT_MED }}>
                                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }} />
                                                        {t}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Full-width CTA Banner ═══════ */}
                <section className="relative overflow-hidden" style={{ backgroundColor: CHARCOAL }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2000&q=80')",
                        }}
                    />
                    <div className="relative z-10 max-w-4xl mx-auto px-5 py-16 lg:py-20 text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <span className="text-xs font-semibold tracking-[0.4em] uppercase" style={{ color: GOLD }}>
                                Új kezelés
                            </span>
                            <h2 className="bf-h text-2xl md:text-4xl font-medium text-white mt-3 mb-4 italic">
                                Kevin Murphy — Treat.Me hajkezelés
                            </h2>
                            <p className="text-white/50 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                                A kezelések pótolják az elvesztett nedvességet és erőt, garantálva a puha tapintású
                                és csillogó hajat. A szalonkezelések összeállítása egyénre szabottan történik a
                                fejbőr és a haj aktuális igényei és állapota alapján.
                            </p>
                            <a
                                href="#kapcsolat"
                                className="inline-block px-7 py-3 text-[12px] font-semibold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                style={{ backgroundColor: GOLD }}
                            >
                                Időpont foglalása
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ Vélemények (Testimonials) ═══════ */}
                <section id="velemenyek" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-6xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                                <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD }}>Vélemények</span>
                                <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                            </div>
                            <h2 className="bf-h text-3xl md:text-[2.4rem] font-medium italic">
                                Vendégeink mondták
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06}
                                    variants={fadeUp}
                                    className="border p-5 transition-shadow hover:shadow-md"
                                    style={{ backgroundColor: 'white', borderColor: BORDER }}
                                >
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: t.rating }).map((_, si) => (
                                            <Star key={si} size={13} fill={GOLD} stroke="none" />
                                        ))}
                                    </div>
                                    <p className="text-[13px] leading-relaxed mb-4 italic" style={{ color: TEXT_MED }}>
                                        „{t.text}"
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold" style={{ color: TEXT }}>{t.name}</span>
                                        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: TEXT_LIGHT }}>
                                            {t.source}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Nyitvatartás + Galéria ═══════ */}
                <section className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Opening hours */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                                    <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD }}>Nyitvatartás</span>
                                </div>
                                <h2 className="bf-h text-3xl md:text-[2.4rem] font-medium leading-tight mb-6">
                                    Várunk <span className="italic" style={{ color: GOLD }}>szeretettel</span>
                                </h2>
                                <div className="space-y-3 mb-8">
                                    {openingHours.map((oh) => (
                                        <div
                                            key={oh.day}
                                            className="flex items-center justify-between py-3 border-b"
                                            style={{ borderColor: BORDER }}
                                        >
                                            <span className="text-sm font-medium" style={{ color: TEXT }}>{oh.day}</span>
                                            <span className="text-sm font-semibold" style={{ color: oh.hours === 'Zárva' ? TEXT_LIGHT : GOLD }}>
                                                {oh.hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href="#kapcsolat"
                                    className="inline-block px-7 py-3 text-[12px] font-semibold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                    style={{ backgroundColor: CHARCOAL }}
                                >
                                    Online bejelentkezés
                                </a>
                            </motion.div>

                            {/* Instagram-style gallery */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12} variants={fadeUp}>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
                                        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80',
                                        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
                                        'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80',
                                        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=400&q=80',
                                        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80',
                                    ].map((src, i) => (
                                        <div key={i} className="aspect-square overflow-hidden group cursor-pointer">
                                            <img
                                                src={src}
                                                alt={`Galéria ${i + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    <Instagram size={16} style={{ color: GOLD }} />
                                    <span className="text-sm font-medium" style={{ color: TEXT_MED }}>@aura.beauty</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Kapcsolat (Contact) ═══════ */}
                <section id="kapcsolat" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-14 items-start">
                            {/* Left — Info */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />
                                    <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: GOLD }}>Kapcsolat</span>
                                </div>
                                <h2 className="bf-h text-3xl md:text-[2.4rem] font-medium leading-tight mb-4">
                                    Foglalj <span className="italic" style={{ color: GOLD }}>időpontot</span>
                                    <br />online vagy telefonon
                                </h2>
                                <p className="leading-relaxed mb-8" style={{ color: TEXT_MED }}>
                                    Szalonunkba online is bejelentkezhetsz az alábbi elérhetőségeken.
                                    Ha kérdésed van, keress minket bátran telefonon vagy e-mailben!
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { icon: MapPin, label: '1052 Budapest, Váci utca 12.' },
                                        { icon: Phone, label: '+36 70 670 1067' },
                                        { icon: Mail, label: 'hello@aurabeauty.hu' },
                                        { icon: Clock, label: 'H–P: 8:00–21:00 · Szo: 10:00–20:00' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: GOLD_PALE }}
                                            >
                                                <item.icon size={16} style={{ color: GOLD }} />
                                            </div>
                                            <span className="text-sm" style={{ color: TEXT_MED }}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {[Instagram, Facebook].map((Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="w-10 h-10 flex items-center justify-center border transition-all hover:shadow-sm"
                                            style={{ borderColor: BORDER }}
                                        >
                                            <Icon size={16} style={{ color: TEXT_LIGHT }} />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right — Form */}
                            <motion.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
                                variants={fadeUp}
                                className="border p-7 md:p-8 shadow-sm"
                                style={{ backgroundColor: 'white', borderColor: BORDER }}
                            >
                                <h3 className="bf-h text-xl font-semibold mb-1" style={{ color: TEXT }}>
                                    Online bejelentkezés
                                </h3>
                                <p className="text-xs mb-6" style={{ color: TEXT_LIGHT }}>
                                    Válaszolunk 24 órán belül
                                </p>
                                <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                                Név
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Teljes név"
                                                className="w-full border px-4 py-2.5 text-sm focus:outline-none transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+36 ..."
                                                className="w-full border px-4 py-2.5 text-sm focus:outline-none transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="pelda@email.hu"
                                            className="w-full border px-4 py-2.5 text-sm focus:outline-none transition-all"
                                            style={{ borderColor: BORDER, color: TEXT }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                            Szolgáltatás
                                        </label>
                                        <select
                                            className="w-full border px-4 py-2.5 text-sm focus:outline-none transition-all appearance-none"
                                            style={{ borderColor: BORDER, color: TEXT_LIGHT }}
                                        >
                                            <option value="">Válassz szolgáltatást...</option>
                                            <option>Fodrászat</option>
                                            <option>Manikűr</option>
                                            <option>Pedikűr</option>
                                            <option>Kozmetika</option>
                                            <option>Egyéb</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT }}>
                                            Üzenet
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Megjegyzés, preferált időpont..."
                                            className="w-full border px-4 py-2.5 text-sm focus:outline-none transition-all resize-none"
                                            style={{ borderColor: BORDER, color: TEXT }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-[12px] font-semibold tracking-wider uppercase text-white transition-all hover:brightness-110"
                                        style={{ backgroundColor: CHARCOAL }}
                                    >
                                        Bejelentkezés küldése
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Map placeholder ═══════ */}
                <div
                    className="h-[300px] flex items-center justify-center"
                    style={{ backgroundColor: BG_ALT }}
                >
                    <div className="text-center">
                        <MapPin size={32} className="mx-auto mb-2" style={{ color: GOLD }} />
                        <p className="text-sm font-medium" style={{ color: TEXT_MED }}>1052 Budapest, Váci utca 12.</p>
                        <p className="text-xs mt-1" style={{ color: TEXT_LIGHT }}>Budapest belvárosában, a Váci utca szívében</p>
                    </div>
                </div>

                {/* ═══════ Footer ═══════ */}
                <footer style={{ backgroundColor: CHARCOAL }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 grid md:grid-cols-3 gap-10">
                        <div>
                            <span className="bf-h text-xl font-semibold tracking-wider uppercase text-white">
                                Aura <span style={{ color: GOLD }}>Beauty</span>
                            </span>
                            <p className="text-sm leading-relaxed mt-3 text-white/40">
                                Szépség és luxus Budapest belvárosában.
                                Prémium szolgáltatások, szakképzett csapat, minőségi alapanyagok.
                            </p>
                            <div className="flex gap-3 mt-5">
                                {[Instagram, Facebook].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-9 h-9 flex items-center justify-center border border-white/10 transition-all hover:border-white/25"
                                    >
                                        <Icon size={15} className="text-white/50" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>
                                Szolgáltatások
                            </h4>
                            <ul className="text-sm space-y-2 text-white/40">
                                {serviceCategories.map((s) => (
                                    <li key={s.title}>
                                        <a href="#szolgaltatasok" className="transition-colors hover:text-white/60">{s.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>
                                Elérhetőség
                            </h4>
                            <ul className="text-sm space-y-2 text-white/40">
                                <li className="flex items-center gap-2">
                                    <MapPin size={13} style={{ color: `${GOLD}88` }} />
                                    1052 Budapest, Váci utca 12.
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={13} style={{ color: `${GOLD}88` }} />
                                    +36 70 670 1067
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={13} style={{ color: `${GOLD}88` }} />
                                    hello@aurabeauty.hu
                                </li>
                            </ul>
                            <div className="mt-4 space-y-1 text-sm text-white/40">
                                {openingHours.map((oh) => (
                                    <div key={oh.day} className="flex justify-between">
                                        <span>{oh.day}</span>
                                        <span style={{ color: oh.hours === 'Zárva' ? 'inherit' : GOLD }}>{oh.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-white/15 text-xs py-5 border-t border-white/5">
                        © 2026 Aura Beauty. Minden jog fenntartva.
                    </div>
                </footer>
            </div>
        </>
    );
};
