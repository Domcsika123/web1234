import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Scale,
    Shield,
    Briefcase,
    Building2,
    Users,
    FileText,
    Phone,
    Mail,
    MapPin,
    Clock,
    ChevronRight,
    Landmark,
    Gavel,
    BadgeCheck,
    ArrowRight,
    Globe,
    Award,
    Menu,
    X,
    BookOpen,
    TrendingUp,
    Layers,
    Wifi,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA LEGAL – Ügyvédi iroda sablon
   Inspired by twobirds.com — bright, corporate, international
   Light theme · Deep Navy (#1B2A4A) + Warm Navy (#2D4A7A) accent
   DM Serif Display + DM Sans
───────────────────────────────────────────────────────────── */

const NAVY = '#1B2A4A';
const NAVY_LIGHT = '#2D4A7A';
const ACCENT = '#3B6CB5';
const ACCENT_LIGHT = '#EBF1FA';
const BG = '#FFFFFF';
const BG_ALT = '#F7F8FA';
const BG_WARM = '#FAFBFD';
const TEXT = '#1B2A4A';
const TEXT_LIGHT = '#6B7A94';
const TEXT_MUTED = '#9CA8BC';
const BORDER = '#E8ECF2';
const BORDER_LIGHT = '#F0F2F6';

const practiceAreas = [
    { icon: Building2, title: 'Társasági jog & M&A', desc: 'Cégalapítás, átalakulás, vállalatfelvásárlás, összeolvadás és tőkepiaci tranzakciók teljes körű jogi támogatása.' },
    { icon: Landmark, title: 'Banki & Pénzügyi jog', desc: 'Finanszírozási struktúrák, bankhitel-ügyletek, tőkepiaci szabályozás és pénzügyi megfelelőség.' },
    { icon: Scale, title: 'Peres képviselet', desc: 'Polgári és gazdasági perek, választottbírósági eljárások, alternatív vitarendezés.' },
    { icon: Shield, title: 'Adatvédelem & GDPR', desc: 'Adatkezelési szabályzatok, GDPR audit, hatósági eljárások, adatvédelmi hatásvizsgálat.' },
    { icon: FileText, title: 'Szellemi alkotások joga', desc: 'Védjegyek, szabadalmak, szerzői jogok védelme és érvényesítése hazai és nemzetközi szinten.' },
    { icon: Briefcase, title: 'Munkajog', desc: 'Munkaszerződések, munkaügyi viták, kollektív tárgyalások, felmondási tanácsadás.' },
    { icon: Gavel, title: 'Versenyjog', desc: 'Gazdasági versenyjogi tanácsadás, összefonódás-bejelentés, GVH eljárások.' },
    { icon: Globe, title: 'Ingatlan & Építési jog', desc: 'Ingatlantranzakciók, építési engedélyezés, bérleti jogviszonyok, projektfinanszírozás.' },
];

const sectors = [
    { icon: Wifi, label: 'Tech & Telekommunikáció' },
    { icon: TrendingUp, label: 'Pénzügyi szolgáltatások' },
    { icon: Layers, label: 'Energia & Közművek' },
    { icon: BookOpen, label: 'Média & Szórakoztatás' },
    { icon: Building2, label: 'Ingatlan' },
    { icon: Shield, label: 'Élettudomány & Gyógyszer' },
];

const teamMembers = [
    { name: 'Dr. Kertész Ákos', role: 'Ügyvezető partner', specialty: 'Társasági jog & M&A', lang: 'Magyar, Angol, Német' },
    { name: 'Dr. Pintér Lilla', role: 'Senior partner', specialty: 'Peres képviselet', lang: 'Magyar, Angol, Francia' },
    { name: 'Dr. Soós Márton', role: 'Partner', specialty: 'Banki & Pénzügyi jog', lang: 'Magyar, Angol' },
    { name: 'Dr. Hajdu Zsófia', role: 'Partner', specialty: 'Adatvédelem & GDPR', lang: 'Magyar, Angol, Német' },
    { name: 'Dr. Orosz Dániel', role: 'Partner', specialty: 'Szellemi alkotások joga', lang: 'Magyar, Angol' },
    { name: 'Dr. Bíró Réka', role: 'Of Counsel', specialty: 'Versenyjog', lang: 'Magyar, Angol, Német' },
];

const news = [
    { date: '2026. márc. 5.', tag: 'M&A', title: 'Az Aura Legal tanácsadóként részt vett egy jelentős technológiai akvizícióban', desc: 'Sikeresen támogattuk ügyfelünket egy stratégiai felvásárlás teljes jogi lebonyolításában.', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80' },
    { date: '2026. feb. 18.', tag: 'Díj', title: 'Az Aura Legal az Év Ügyvédi Irodája díjat nyerte el', desc: 'Irodánkat a Chambers Europe Awards keretében ismét a legjobb magyar ügyvédi irodák között díjazták.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80' },
    { date: '2026. jan. 22.', tag: 'Versenyjog', title: 'Új versenyjogi szabályozás lépett hatályba — mit jelent ez az Ön cégének?', desc: 'Összefoglaljuk a legfontosabb változásokat és a vállalkozásokra gyakorolt hatásukat.', image: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=600&q=80' },
];

const accolades = [
    { source: 'Chambers Europe', quote: 'Rendkívül profi csapat, akik minden helyzetben megtalálják az optimális jogi megoldást.' },
    { source: 'Legal 500 EMEA', quote: 'Kiváló stratégiai gondolkodás és ügyfélközpontú megközelítés jellemzi munkájukat.' },
];

const stats = [
    { value: '40+', label: 'Ügyvéd' },
    { value: '25+', label: 'Év tapasztalat' },
    { value: '4', label: 'Nyelven tanácsadás' },
    { value: '2 000+', label: 'Lezárt ügy' },
];

/* Faceless avatar SVG */
const AvatarPlaceholder = ({ bg = ACCENT_LIGHT, fg = '#C5D3E8' }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="120" height="120" fill={bg} />
        <circle cx="60" cy="44" r="18" fill={fg} />
        <ellipse cx="60" cy="100" rx="30" ry="26" fill={fg} />
    </svg>
);

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: d, ease: [0.22, 0.61, 0.36, 1] },
    }),
};

export const LawPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const navLinks = [
        { label: 'Szakterületek', href: '#practice' },
        { label: 'Rólunk', href: '#about' },
        { label: 'Csapat', href: '#team' },
        { label: 'Hírek', href: '#news' },
        { label: 'Kapcsolat', href: '#contact' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
                .lf-h { font-family: 'Playfair Display', serif; }
                .lf-b { font-family: 'Source Sans 3', sans-serif; }
            `}</style>

            <div className="min-h-screen lf-b" style={{ backgroundColor: BG, color: TEXT }}>

                {/* ═══════ Preview Top Bar ═══════ */}
                {!isEmbed && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
                        style={{ backgroundColor: `${BG}ee`, borderColor: '#00FF0033' }}
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
                            <span className="text-xs font-medium" style={{ color: TEXT_MUTED }}>
                                Sablon előnézet · Ügyvédi iroda
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* ═══════ Navbar ═══════ */}
                <nav
                    className={`fixed left-0 right-0 z-40 backdrop-blur-xl border-b ${isEmbed ? 'top-0' : 'top-[44px]'}`}
                    style={{ backgroundColor: `${BG}ee`, borderColor: BORDER }}
                >
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16">
                        <a href="#hero" className="flex items-center gap-2.5">
                            <div
                                className="w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: NAVY }}
                            >
                                <Scale size={15} className="text-white" />
                            </div>
                            <span className="lf-h text-xl" style={{ color: NAVY }}>
                                Aura Legal
                            </span>
                        </a>

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
                                href="#contact"
                                className="ml-1 px-5 py-2 text-[13px] font-semibold text-white rounded-md transition-all hover:brightness-110"
                                style={{ backgroundColor: NAVY }}
                            >
                                Konzultáció
                            </a>
                        </div>

                        <button className="md:hidden p-2" style={{ color: NAVY }} onClick={() => setMobileMenu(!mobileMenu)}>
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
                                            className="block text-sm font-medium py-1"
                                            style={{ color: TEXT_LIGHT }}
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                    <a
                                        href="#contact"
                                        onClick={() => setMobileMenu(false)}
                                        className="block text-center py-2.5 text-sm font-semibold text-white rounded-md mt-2"
                                        style={{ backgroundColor: NAVY }}
                                    >
                                        Konzultáció
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
                    {/* Budapest background */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&w=2000&q=80"
                            alt="Budapest"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${BG}e0 0%, ${BG}cc 45%, ${BG}88 100%)` }} />

                    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
                        <div className="grid lg:grid-cols-2 gap-14 items-center">
                            {/* Left */}
                            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-7"
                                    style={{ borderColor: BORDER, backgroundColor: BG }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                                    <span className="text-xs font-medium tracking-wider uppercase" style={{ color: ACCENT }}>
                                        Budapest · Ügyvédi Iroda
                                    </span>
                                </div>

                                <h1 className="lf-h text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.12] mb-6" style={{ color: NAVY }}>
                                    Jogi megoldások, amelyekre{' '}
                                    <span className="italic" style={{ color: ACCENT }}>építhet</span>
                                </h1>

                                <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: TEXT_LIGHT }}>
                                    Több mint 40 ügyvédünk magyar, angol, német és francia
                                    nyelven nyújt teljes körű jogi tanácsadást hazai és nemzetközi
                                    ügyfeleknek budapesti irodánkból.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-12">
                                    <a
                                        href="#contact"
                                        className="px-6 py-3 text-sm font-semibold text-white rounded-md transition-all hover:brightness-110"
                                        style={{ backgroundColor: NAVY }}
                                    >
                                        Ingyenes konzultáció
                                    </a>
                                    <a
                                        href="#practice"
                                        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md border transition-all hover:border-gray-300"
                                        style={{ borderColor: BORDER, color: TEXT_LIGHT }}
                                    >
                                        Szakterületek <ChevronRight size={15} />
                                    </a>
                                </div>

                                {/* Stats row */}
                                <div className="flex flex-wrap gap-8 pt-8 border-t" style={{ borderColor: BORDER }}>
                                    {stats.map((s) => (
                                        <div key={s.label}>
                                            <span className="lf-h text-2xl" style={{ color: NAVY }}>{s.value}</span>
                                            <span className="block text-[11px] font-medium uppercase tracking-wider mt-0.5" style={{ color: TEXT_MUTED }}>
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right — Budapest / Legal imagery */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.25 }}
                                className="hidden lg:block space-y-4"
                            >
                                {/* Hero image — Budapest Parlament */}
                                <div className="rounded-xl overflow-hidden relative h-64">
                                    <img
                                        src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=800&q=80"
                                        alt="Budapest Parlament"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}cc 0%, transparent 60%)` }} />
                                    <div className="absolute bottom-0 left-0 p-5">
                                        <Award size={20} className="text-white/80 mb-2" />
                                        <h3 className="lf-h text-lg text-white">Az Év Ügyvédi Irodája</h3>
                                        <p className="text-white/50 text-xs">Chambers Europe Awards</p>
                                    </div>
                                </div>

                                {/* Sectors grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    {sectors.map((s) => (
                                        <div
                                            key={s.label}
                                            className="rounded-lg p-4 border text-center transition-all hover:shadow-sm"
                                            style={{ backgroundColor: BG, borderColor: BORDER }}
                                        >
                                            <s.icon size={18} className="mx-auto mb-2" style={{ color: ACCENT }} />
                                            <span className="text-[10px] font-medium leading-tight block" style={{ color: TEXT_LIGHT }}>
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Practice Areas ═══════ */}
                <section id="practice" className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="mb-12"
                        >
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
                                Szakterületek
                            </span>
                            <h2 className="lf-h text-3xl md:text-4xl mt-2" style={{ color: NAVY }}>
                                Miben segíthetünk?
                            </h2>
                            <p className="text-sm mt-3 max-w-xl leading-relaxed" style={{ color: TEXT_LIGHT }}>
                                Ügyfeleink a technológia, pénzügy, energia, média és ingatlan szektorból
                                keresik partneri tanácsadásunkat az alábbi területeken.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {practiceAreas.map((area, i) => (
                                <motion.div
                                    key={area.title}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.05}
                                    variants={fadeUp}
                                    className="group flex gap-5 p-5 rounded-xl border bg-white transition-all hover:shadow-md hover:border-gray-200 cursor-default"
                                    style={{ borderColor: BORDER_LIGHT }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                                        style={{ backgroundColor: ACCENT_LIGHT }}
                                    >
                                        <area.icon size={20} style={{ color: ACCENT }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className="text-[15px] font-semibold mb-1 group-hover:text-blue-700 transition-colors"
                                            style={{ color: NAVY }}
                                        >
                                            {area.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
                                            {area.desc}
                                        </p>
                                    </div>
                                    <ChevronRight size={16} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: TEXT_MUTED }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ About ═══════ */}
                <section id="about" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-5 gap-14 items-start">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="lg:col-span-3"
                        >
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
                                Rólunk
                            </span>
                            <h2 className="lf-h text-3xl md:text-4xl mt-2 mb-6" style={{ color: NAVY }}>
                                Nem csupán jogi tanácsadók —{' '}
                                <span className="italic" style={{ color: ACCENT }}>stratégiai partnerek</span>
                            </h2>
                            <div className="space-y-4 text-sm leading-relaxed" style={{ color: TEXT_LIGHT }}>
                                <p>
                                    Az Aura Legal irodát a szakmai kiválóság, az innovatív gondolkodás és az
                                    ügyfélközpontú szemlélet határozza meg. Tradicionális tranzakciós jogi
                                    szolgáltatásokat nyújtunk – beleértve az M&A-t, a magántőke-befektetéseket,
                                    a finanszírozást, a tőkepiacot és a vitarendezést –, illetve szellemi
                                    tulajdon, adatvédelem, szabályozási és adójogi ügyeket kezelünk.
                                </p>
                                <p>
                                    Szorosan együttműködünk közép-európai partnerirodáinkkal, hogy integrált
                                    szolgáltatást nyújtsunk ügyfeleinknek a határokon átívelő ügyekben is.
                                    A magyar mellett angol, német és francia nyelven is tanácsot adunk.
                                </p>
                            </div>

                            {/* Office / legal image */}
                            <div className="mt-6 rounded-xl overflow-hidden h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?auto=format&fit=crop&w=800&q=80"
                                    alt="Modern tárgyaló"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
                            variants={fadeUp}
                            className="lg:col-span-2 space-y-3"
                        >
                            {[
                                { icon: Award, text: 'Chambers Europe – Az Év Irodája' },
                                { icon: BadgeCheck, text: 'Legal 500 – Top-Tier Minősítés' },
                                { icon: Users, text: 'Személyre szabott megközelítés' },
                                { icon: Globe, text: '4 nyelven nyújtunk tanácsadást' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.text}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15 + i * 0.06}
                                    variants={fadeUp}
                                    className="flex items-center gap-3.5 p-4 rounded-xl border"
                                    style={{ borderColor: BORDER_LIGHT, backgroundColor: BG_WARM }}
                                >
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT_LIGHT }}>
                                        <item.icon size={17} style={{ color: ACCENT }} />
                                    </div>
                                    <span className="text-sm font-medium" style={{ color: TEXT }}>{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ Accolades Banner ═══════ */}
                <section className="py-14 border-y" style={{ backgroundColor: NAVY, borderColor: 'transparent' }}>
                    <div className="max-w-5xl mx-auto px-5 lg:px-10">
                        <div className="grid md:grid-cols-2 gap-10">
                            {accolades.map((a) => (
                                <motion.div
                                    key={a.source}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={fadeUp}
                                >
                                    <p className="text-white/70 text-base leading-relaxed italic lf-h mb-3">
                                        „{a.quote}"
                                    </p>
                                    <span className="text-white/30 text-xs font-semibold tracking-wider uppercase">
                                        — {a.source}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Team ═══════ */}
                <section id="team" className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="mb-12"
                        >
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
                                Csapatunk
                            </span>
                            <h2 className="lf-h text-3xl md:text-4xl mt-2" style={{ color: NAVY }}>
                                Tapasztalt ügyvédeink
                            </h2>
                            <p className="text-sm mt-3" style={{ color: TEXT_LIGHT }}>
                                Irodánkat elismert szaktekintélyek vezetik, számos szakterületi elismeréssel.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                            {teamMembers.map((m, i) => (
                                <motion.div
                                    key={m.name}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06}
                                    variants={fadeUp}
                                    className="group rounded-xl border bg-white p-5 text-center transition-all hover:shadow-md"
                                    style={{ borderColor: BORDER_LIGHT }}
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 transition-colors" style={{ borderColor: BORDER }}>
                                        <AvatarPlaceholder />
                                    </div>
                                    <h3 className="text-sm font-semibold" style={{ color: NAVY }}>{m.name}</h3>
                                    <p className="text-xs font-medium mt-0.5" style={{ color: ACCENT }}>{m.role}</p>
                                    <p className="text-[11px] mt-1" style={{ color: TEXT_MUTED }}>{m.specialty}</p>
                                    <div className="flex items-center justify-center gap-1 mt-2">
                                        <Globe size={10} style={{ color: TEXT_MUTED }} />
                                        <span className="text-[10px]" style={{ color: TEXT_MUTED }}>{m.lang}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
                            variants={fadeUp}
                            className="text-center mt-8"
                        >
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                                style={{ color: ACCENT }}
                            >
                                Teljes csapat megtekintése <ArrowRight size={15} />
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ News / Insights ═══════ */}
                <section id="news" className="py-20 lg:py-28" style={{ backgroundColor: BG }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
                        >
                            <div>
                                <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
                                    Hírek & Publikációk
                                </span>
                                <h2 className="lf-h text-3xl md:text-4xl mt-2" style={{ color: NAVY }}>
                                    Legfrissebb híreink
                                </h2>
                            </div>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                                style={{ color: ACCENT }}
                            >
                                Minden hír <ArrowRight size={15} />
                            </a>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {news.map((n, i) => (
                                <motion.div
                                    key={n.title}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06}
                                    variants={fadeUp}
                                    className="group rounded-xl border bg-white overflow-hidden flex flex-col transition-all hover:shadow-md cursor-default"
                                    style={{ borderColor: BORDER_LIGHT }}
                                >
                                    {/* News image */}
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={n.image}
                                            alt={n.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span
                                                className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded"
                                                style={{ backgroundColor: ACCENT_LIGHT, color: ACCENT }}
                                            >
                                                {n.tag}
                                            </span>
                                            <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{n.date}</span>
                                        </div>
                                        <h3
                                            className="text-[15px] font-semibold leading-snug mb-2 group-hover:text-blue-700 transition-colors"
                                            style={{ color: NAVY }}
                                        >
                                            {n.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed flex-1" style={{ color: TEXT_MUTED }}>
                                            {n.desc}
                                        </p>
                                        <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color: ACCENT }}>
                                            Tovább olvasom <ChevronRight size={12} />
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Contact ═══════ */}
                <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: BG_ALT }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-14 items-start">
                            {/* Left */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
                                    Kapcsolat
                                </span>
                                <h2 className="lf-h text-3xl md:text-4xl mt-2 mb-4" style={{ color: NAVY }}>
                                    Kérjen ingyenes{' '}
                                    <span className="italic" style={{ color: ACCENT }}>konzultációt</span>
                                </h2>
                                <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: TEXT_LIGHT }}>
                                    Vegye fel velünk a kapcsolatot kötelezettségmentes egyeztetésre —
                                    ügyvédeink készséggel segítenek Önnek.
                                </p>

                                <div className="space-y-3 mb-8">
                                    {[
                                        { icon: MapPin, label: '1051 Budapest, Bajcsy-Zsilinszky út 42.' },
                                        { icon: Phone, label: '+36 1 234 5678' },
                                        { icon: Mail, label: 'info@auralegal.hu' },
                                        { icon: Clock, label: 'H–P: 08:00 – 18:00' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <div
                                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: ACCENT_LIGHT }}
                                            >
                                                <item.icon size={15} style={{ color: ACCENT }} />
                                            </div>
                                            <span className="text-sm" style={{ color: TEXT_LIGHT }}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Map placeholder */}
                                <div
                                    className="h-44 rounded-xl flex items-center justify-center border"
                                    style={{ borderColor: BORDER, backgroundColor: BG }}
                                >
                                    <div className="text-center">
                                        <MapPin size={24} className="mx-auto mb-2" style={{ color: ACCENT }} />
                                        <p className="text-xs" style={{ color: TEXT_MUTED }}>Budapest, V. kerület · Belváros</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right — Form */}
                            <motion.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
                                variants={fadeUp}
                                className="rounded-xl border bg-white p-7 md:p-8"
                                style={{ borderColor: BORDER_LIGHT }}
                            >
                                <h3 className="lf-h text-xl mb-1" style={{ color: NAVY }}>Üzenet küldése</h3>
                                <p className="text-xs mb-6" style={{ color: TEXT_MUTED }}>
                                    Adatait bizalmasan kezeljük, válaszunkat 24 órán belül megküldjük.
                                </p>
                                <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_MUTED }}>Név</label>
                                            <input
                                                type="text"
                                                placeholder="Teljes név"
                                                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                                style={{ borderColor: BORDER, color: TEXT, '--tw-ring-color': `${ACCENT}33` }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_MUTED }}>Telefon</label>
                                            <input
                                                type="tel"
                                                placeholder="+36 ..."
                                                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                                style={{ borderColor: BORDER, color: TEXT }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_MUTED }}>E-mail</label>
                                        <input
                                            type="email"
                                            placeholder="pelda@email.hu"
                                            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                            style={{ borderColor: BORDER, color: TEXT }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_MUTED }}>Szakterület</label>
                                        <select
                                            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all appearance-none"
                                            style={{ borderColor: BORDER, color: TEXT_LIGHT }}
                                        >
                                            <option value="">Válasszon szakterületet...</option>
                                            {practiceAreas.map((a) => (
                                                <option key={a.title} value={a.title}>{a.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_MUTED }}>Üzenet</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Írja le röviden, miben segíthetünk..."
                                            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                                            style={{ borderColor: BORDER, color: TEXT }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-all hover:brightness-110"
                                        style={{ backgroundColor: NAVY }}
                                    >
                                        Üzenet küldése
                                    </button>
                                    <p className="text-center text-[11px]" style={{ color: TEXT_MUTED }}>
                                        Adatait bizalmasan kezeljük.{' '}
                                        <a href="#" className="underline">Adatkezelési tájékoztató</a>
                                    </p>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════ Footer ═══════ */}
                <footer className="border-t" style={{ backgroundColor: NAVY, borderColor: 'transparent' }}>
                    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 grid md:grid-cols-4 gap-10">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <Scale size={16} className="text-white/80" />
                                <span className="lf-h text-lg text-white">Aura Legal</span>
                            </div>
                            <p className="text-white/30 text-sm leading-relaxed">
                                Budapest szívében — több mint 25 éve
                                a jogi szakma élvonalában.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                                Szakterületek
                            </h4>
                            <ul className="text-white/30 text-sm space-y-1.5">
                                {practiceAreas.slice(0, 5).map((a) => (
                                    <li key={a.title}>
                                        <a href="#practice" className="transition-colors hover:text-white/50">{a.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                                Navigáció
                            </h4>
                            <ul className="text-white/30 text-sm space-y-1.5">
                                {navLinks.map((l) => (
                                    <li key={l.label}>
                                        <a href={l.href} className="transition-colors hover:text-white/50">{l.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white/50 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                                Elérhetőség
                            </h4>
                            <ul className="text-white/30 text-sm space-y-1.5">
                                <li className="flex items-center gap-2">
                                    <MapPin size={13} className="text-white/20" />
                                    1051 Budapest, Bajcsy-Zsilinszky út 42.
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={13} className="text-white/20" />
                                    +36 1 234 5678
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={13} className="text-white/20" />
                                    info@auralegal.hu
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={13} className="text-white/20" />
                                    H–P: 08:00 – 18:00
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/[0.06]">
                        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <span className="text-white/15 text-xs">© 2026 Aura Legal. Minden jog fenntartva.</span>
                            <div className="flex gap-5 text-white/20 text-[11px]">
                                <a href="#" className="hover:text-white/40 transition-colors">Adatkezelés</a>
                                <a href="#" className="hover:text-white/40 transition-colors">Impresszum</a>
                                <a href="#" className="hover:text-white/40 transition-colors">Cookie szabályzat</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};
