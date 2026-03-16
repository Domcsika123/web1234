import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Scissors,
    Clock,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Star,
    ChevronDown,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA BARBER – Borbélyszalon landing page sablon
   Dark Mode • Bebas Neue + Inter • Amber/Whiskey akcentusok
   Retro-industrial barbershop stílus (Black Sheep / BSB inspired)
───────────────────────────────────────────────────────────── */

const services = [
    {
        name: 'Gépi hajvágás',
        desc: 'Precíz, egy hosszra nyírás géppel.',
        price: '4 500 Ft',
        duration: '30 perc',
    },
    {
        name: 'Klasszikus hajvágás',
        desc: 'Konzultáció, vágás, finiselés prémium termékekkel, nyakborotválás.',
        price: '7 500 Ft',
        duration: '45 perc',
    },
    {
        name: 'Ollós hajvágás',
        desc: 'Kizárólag ollóval, gép nélkül – a klasszikus elegancia kedvelőinek.',
        price: '9 800 Ft',
        duration: '50 perc',
    },
    {
        name: 'Szakáll igazítás',
        desc: 'Gépi és pengés igazítás, kontúrozás, forró törölközős kezelés.',
        price: '5 200 Ft',
        duration: '30 perc',
    },
    {
        name: 'Hajvágás + Szakáll',
        desc: 'Komplett csomag: hajvágás és szakálligazítás egy ülésben.',
        price: '11 500 Ft',
        duration: '60 perc',
        popular: true,
    },
    {
        name: 'Hot Towel borotválás',
        desc: 'Tradicionális borotválás forró törölközővel és borotvakéssel.',
        price: '8 500 Ft',
        duration: '40 perc',
    },
    {
        name: 'Barber Treatment',
        desc: 'A teljes élmény: hajvágás, forró törölközős borotválás, prémium finiselés.',
        price: '14 900 Ft',
        duration: '75 perc',
        popular: true,
    },
    {
        name: 'Apa-fia hajvágás',
        desc: 'Férfias program kettesben – két hajvágás kedvezményes áron.',
        price: '12 000 Ft',
        duration: '60 perc',
    },
];

const galleryImages = [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=600&q=80',
];

const reviews = [
    {
        name: 'Tamás',
        text: 'Évek óta ide járok. A hangulat, a precizitás és a kávé is mindig tökéletes.',
        stars: 5,
    },
    {
        name: 'Márk',
        text: 'Végre egy hely, ahol pontosan azt kapom, amit kértem. Ajánlom mindenkinek!',
        stars: 5,
    },
    {
        name: 'Dávid',
        text: 'Első alkalommal jártam, de már foglaltam is a következőt. Profi csapat.',
        stars: 5,
    },
];

const AMBER = '#D4952A';
const AMBER_LIGHT = '#E8B04A';

export const BarberPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <>
            {/* ══════════ Fonts ══════════ */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
                body { overflow-x: hidden; }
                .font-display { font-family: 'Bebas Neue', sans-serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                .stripe-pattern {
                    background-image: repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 8px,
                        rgba(212, 149, 42, 0.03) 8px,
                        rgba(212, 149, 42, 0.03) 16px
                    );
                }
            `}</style>

            <div className="min-h-screen bg-[#111111] text-white font-body">

                {/* ═══════ Preview Top Bar ═══════ */}
                {!isEmbed && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-[#00FF00]/20"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                            <button
                                onClick={() => { navigate('/'); setTimeout(() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                                className="flex items-center gap-2 text-[#00FF00] font-semibold hover:text-white transition-colors"
                            >
                                <ArrowLeft size={18} />
                                <span>Vissza a sablonokhoz</span>
                            </button>
                            <span className="text-[#A1A1AA] text-sm font-medium">
                                Sablon előnézet • Borbélyszalon
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* ═══════ Navbar ═══════ */}
                <nav
                    className={`fixed left-0 right-0 z-40 bg-[#111111]/90 backdrop-blur-lg ${isEmbed ? 'top-0' : 'top-[52px]'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[70px]">
                        <a href="#hero" className="flex items-center gap-2">
                            <Scissors size={22} style={{ color: AMBER }} className="rotate-[-30deg]" />
                            <span className="font-display text-2xl tracking-wider">
                                AURA <span style={{ color: AMBER }}>BARBER</span>
                            </span>
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            {[
                                { label: 'Szolgáltatások', href: '#services' },
                                { label: 'Galéria', href: '#gallery' },
                                { label: 'Vélemények', href: '#reviews' },
                                { label: 'Kapcsolat', href: '#contact' },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-[13px] text-white/40 hover:text-white transition-colors font-medium uppercase tracking-wider"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="#booking"
                                className="ml-2 px-6 py-2.5 font-display text-base tracking-widest rounded"
                                style={{ backgroundColor: AMBER, color: '#111111' }}
                            >
                                IDŐPONTFOGLALÁS
                            </a>
                        </div>
                    </div>
                </nav>

                {/* ═══════ Hero Section ═══════ */}
                <section
                    id="hero"
                    className="relative min-h-screen flex items-center overflow-hidden"
                    style={{ paddingTop: isEmbed ? '70px' : '122px' }}
                >
                    {/* BG image with heavy overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111]/85 to-[#111111]" />

                    {/* Decorative barber pole lines */}
                    <div
                        className="absolute top-0 right-0 w-2 h-full"
                        style={{
                            background: `repeating-linear-gradient(0deg, ${AMBER}, ${AMBER} 30px, #cc3333 30px, #cc3333 60px, #fff 60px, #fff 90px)`,
                            opacity: 0.12,
                        }}
                    />

                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <p
                                className="text-sm font-medium tracking-[0.4em] uppercase mb-6"
                                style={{ color: AMBER }}
                            >
                                Budapest • Est. 2018
                            </p>
                            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] mb-4 tracking-wide">
                                AURA <span style={{ color: AMBER }}>BARBER</span>
                            </h1>
                            <p className="text-white/40 text-lg max-w-xl mx-auto mt-6 mb-10 leading-relaxed">
                                Klasszikus borbélyszalon a belváros szívében. Prémium hajvágás,
                                szakálligazítás és forró törölközős borotválás — oldschool stílusban.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="#booking"
                                    className="px-10 py-4 font-display text-lg tracking-widest rounded"
                                    style={{ backgroundColor: AMBER, color: '#111111' }}
                                >
                                    IDŐPONT FOGLALÁS
                                </a>
                                <a
                                    href="#services"
                                    className="px-10 py-4 font-display text-lg tracking-widest rounded border border-white/15 text-white/60 hover:border-white/30 hover:text-white transition-all"
                                >
                                    ÁRLISTA
                                </a>
                            </div>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        >
                            <ChevronDown size={24} className="text-white/20 animate-bounce" />
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ Quick Info Bar ═══════ */}
                <section className="border-y border-white/[0.06] bg-[#161616]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-white/40">
                        <div className="flex items-center gap-2">
                            <Clock size={15} style={{ color: AMBER }} />
                            <span>Minden nap: 8:00–21:00</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={15} style={{ color: AMBER }} />
                            <span>1075 Budapest, Károly krt. 7.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={15} style={{ color: AMBER }} />
                            <span>+36 30 123 4567</span>
                        </div>
                    </div>
                </section>

                {/* ═══════ Services / Árlista ═══════ */}
                <section id="services" className="py-24 lg:py-32 bg-[#111111] stripe-pattern">
                    <div className="max-w-4xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <p
                                className="text-sm font-medium tracking-[0.3em] uppercase mb-3"
                                style={{ color: AMBER }}
                            >
                                Szolgáltatások
                            </p>
                            <h2 className="font-display text-5xl md:text-6xl tracking-wider">
                                ÁRLISTA
                            </h2>
                        </motion.div>

                        <div className="space-y-0 border-t border-white/[0.06]">
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: i * 0.05 }}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/[0.06] hover:bg-white/[0.02] px-4 -mx-4 rounded transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                                                {service.name}
                                            </h3>
                                            {service.popular && (
                                                <span
                                                    className="text-[10px] font-bold tracking-wider uppercase px-2 py-[2px] rounded-full"
                                                    style={{
                                                        backgroundColor: `${AMBER}20`,
                                                        color: AMBER,
                                                    }}
                                                >
                                                    Népszerű
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white/30 text-sm mt-1">{service.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-6 mt-3 sm:mt-0 sm:ml-6 flex-shrink-0">
                                        <span className="text-white/25 text-xs">{service.duration}</span>
                                        <span
                                            className="font-display text-xl tracking-wider"
                                            style={{ color: AMBER }}
                                        >
                                            {service.price}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-center text-white/20 text-xs mt-8">
                            Az árak forintban értendők és az ÁFA-t tartalmazzák.
                        </p>
                    </div>
                </section>

                {/* ═══════ Gallery ═══════ */}
                <section id="gallery" className="py-24 lg:py-32 bg-[#0e0e0e]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-14"
                        >
                            <p
                                className="text-sm font-medium tracking-[0.3em] uppercase mb-3"
                                style={{ color: AMBER }}
                            >
                                Stílusok
                            </p>
                            <h2 className="font-display text-5xl md:text-6xl tracking-wider">
                                GALÉRIA
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {galleryImages.map((url, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                    className="aspect-square overflow-hidden rounded-lg group"
                                >
                                    <img
                                        src={url}
                                        alt={`Galéria ${i + 1}`}
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Reviews ═══════ */}
                <section id="reviews" className="py-24 lg:py-32 bg-[#111111]">
                    <div className="max-w-5xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-14"
                        >
                            <p
                                className="text-sm font-medium tracking-[0.3em] uppercase mb-3"
                                style={{ color: AMBER }}
                            >
                                Vendégeink mondták
                            </p>
                            <h2 className="font-display text-5xl md:text-6xl tracking-wider">
                                VÉLEMÉNYEK
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {reviews.map((review, i) => (
                                <motion.div
                                    key={review.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="rounded-xl border border-white/[0.06] bg-[#161616] p-6"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: review.stars }).map((_, si) => (
                                            <Star
                                                key={si}
                                                size={14}
                                                fill={AMBER}
                                                stroke="none"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                                        „{review.text}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        {/* Simple initial avatar */}
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{
                                                backgroundColor: `${AMBER}20`,
                                                color: AMBER,
                                            }}
                                        >
                                            {review.name[0]}
                                        </div>
                                        <span className="text-white/60 text-sm font-medium">
                                            {review.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════ Booking CTA ═══════ */}
                <section id="booking" className="py-24 lg:py-32 bg-[#0e0e0e] relative overflow-hidden">
                    {/* Subtle barber pole stripe across the bg */}
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage: `repeating-linear-gradient(-45deg, ${AMBER}, ${AMBER} 12px, transparent 12px, transparent 24px)`,
                        }}
                    />
                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Scissors
                                size={40}
                                style={{ color: AMBER }}
                                className="mx-auto mb-6 rotate-[-30deg]"
                            />
                            <h2 className="font-display text-5xl md:text-7xl tracking-wider mb-4">
                                FOGLALJ <span style={{ color: AMBER }}>IDŐPONTOT</span>
                            </h2>
                            <p className="text-white/40 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                                Ne várakozz feleslegesen — foglalj online, és légy biztos benne,
                                hogy a borbélyod pont akkor vár, amikor neked jó.
                            </p>
                            <a
                                href="#"
                                className="inline-block px-12 py-5 font-display text-xl tracking-[0.2em] rounded transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                                style={{ backgroundColor: AMBER, color: '#111111' }}
                            >
                                ONLINE IDŐPONTFOGLALÁS
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ Contact / Footer ═══════ */}
                <section id="contact" className="bg-[#111111] border-t border-white/[0.06]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-3 gap-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Scissors size={18} style={{ color: AMBER }} className="rotate-[-30deg]" />
                                <span className="font-display text-xl tracking-wider">
                                    AURA <span style={{ color: AMBER }}>BARBER</span>
                                </span>
                            </div>
                            <p className="text-white/30 text-sm leading-relaxed">
                                Klasszikus borbélyszalon Budapesten. Retro stílus, precíz munka,
                                igazi férfias élmény — nálunk a minőség az első.
                            </p>
                            <div className="flex gap-3 mt-5">
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.06] hover:border-white/15 transition-colors"
                                >
                                    <Instagram size={16} className="text-white/40" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4
                                className="font-display text-base tracking-[0.2em] mb-4"
                                style={{ color: AMBER }}
                            >
                                NYITVATARTÁS
                            </h4>
                            <ul className="text-white/30 text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <Clock size={13} style={{ color: `${AMBER}88` }} />
                                    Hétfő – Péntek: 8:00 – 21:00
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={13} style={{ color: `${AMBER}88` }} />
                                    Szombat: 9:00 – 18:00
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={13} style={{ color: `${AMBER}88` }} />
                                    Vasárnap: 10:00 – 16:00
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4
                                className="font-display text-base tracking-[0.2em] mb-4"
                                style={{ color: AMBER }}
                            >
                                ELÉRHETŐSÉG
                            </h4>
                            <ul className="text-white/30 text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <MapPin size={13} style={{ color: `${AMBER}88` }} />
                                    1075 Budapest, Károly krt. 7.
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={13} style={{ color: `${AMBER}88` }} />
                                    +36 30 123 4567
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={13} style={{ color: `${AMBER}88` }} />
                                    info@aurabarber.hu
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center text-white/15 text-xs py-6 border-t border-white/[0.04]">
                        © 2026 Aura Barber. Minden jog fenntartva.
                    </div>
                </section>
            </div>
        </>
    );
};
