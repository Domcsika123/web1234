import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Instagram } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AURA GASTRONOMY – Prémium étterem landing page sablon
   Dark Mode • Playfair Display + DM Sans • Gold akcentusok
───────────────────────────────────────────────────────────── */

const menuLeft = [
    { name: 'Wagyu Tataki', desc: 'A5 wagyu, ponzu, fokhagyma chips', price: '14 900 Ft', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80' },
    { name: 'Truffle Risotto', desc: 'Carnaroli, mascarpone, fekete szarvasgomba', price: '9 800 Ft', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=200&q=80' },
    { name: 'Foie Gras Terrine', desc: 'Libamáj, brioche, karamell körte', price: '11 500 Ft', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80' },
];

const menuRight = [
    { name: 'Tomahawk Steak', desc: '1.2 kg dry-aged marha, vörösbor jus', price: '32 000 Ft', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=200&q=80' },
    { name: 'Languszta', desc: 'Maine languszta, citrusos hollandaise', price: '28 900 Ft', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=200&q=80' },
    { name: 'Chocolate Sphere', desc: 'Valrhona, arany, passionfruit', price: '5 900 Ft', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=200&q=80' },
];

export const GastroPreview = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmbed = searchParams.get('embed') === 'true';

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <>
            {/* ══════════ Google Fonts ══════════ */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

            <div className="min-h-screen bg-[#0a0a0a] text-white font-body">

                {/* ══════════ Preview Top Bar (csak standalone módban) ══════════ */}
                {!isEmbed && (
                    <motion.div
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-[#00FF00]/20"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                            <button
                                onClick={() => { navigate('/'); setTimeout(() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                                className="flex items-center gap-2 text-[#00FF00] font-semibold hover:text-white transition-colors"
                            >
                                <ArrowLeft size={18} />
                                <span>Vissza a sablonokhoz</span>
                            </button>
                            <span className="text-[#A1A1AA] text-sm font-medium">Sablon előnézet • Étterem</span>
                        </div>
                    </motion.div>
                )}

                {/* ══════════ Navbar ══════════ */}
                <nav className={`fixed left-0 right-0 z-40 bg-[#0a0a0a]/70 backdrop-blur-lg ${isEmbed ? 'top-0' : 'top-[52px]'}`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
                        <a href="#hero" className="font-playfair text-2xl tracking-wide">
                            <span className="text-[#D4AF37]">Aura</span>
                            <span className="text-white/90 ml-1 font-normal">Gastronomy</span>
                        </a>
                        <div className="hidden md:flex items-center gap-10">
                            {[
                                { label: 'Étlap', href: '#menu' },
                                { label: 'Galéria', href: '#experience' },
                                { label: 'Foglalás', href: '#reservation' },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm tracking-widest text-white/60 hover:text-[#D4AF37] transition-colors uppercase"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                        <a
                            href="#reservation"
                            className="hidden md:inline-flex px-6 py-3 bg-[#D4AF37] text-[#0a0a0a] text-xs font-bold tracking-widest rounded hover:brightness-110 transition"
                        >
                            ASZTALFOGLALÁS
                        </a>
                    </div>
                </nav>

                {/* ══════════ Hero Section ══════════ */}
                <section
                    id="hero"
                    className="relative h-screen flex items-center justify-center overflow-hidden pt-[52px]"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/50" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_80%)]" />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative z-10 text-center px-6 max-w-4xl"
                    >
                        <p className="text-[#D4AF37] tracking-[0.4em] text-xs mb-6 uppercase">Budapest • Fine Dining</p>
                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] mb-8">
                            Aura <span className="text-[#D4AF37]">Gastronomy</span>
                        </h1>
                        <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                            A modern magyar konyha művészete – ahol az ízek, illatok és vizuális élmény összefonódnak.
                        </p>
                        <a
                            href="#reservation"
                            className="inline-flex px-10 py-4 bg-[#D4AF37] text-[#0a0a0a] text-sm font-bold tracking-widest rounded hover:brightness-110 transition"
                        >
                            ASZTALFOGLALÁS
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                    </motion.div>
                </section>

                {/* ══════════ Experience Section ══════════ */}
                <section id="experience" className="py-24 lg:py-32 bg-[#0f0f0f]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-[#D4AF37] tracking-[0.3em] text-xs mb-4 uppercase">Az élmény</p>
                            <h2 className="font-playfair text-4xl md:text-5xl font-semibold leading-tight mb-6">
                                Gasztronómia, <br />
                                <span className="text-[#D4AF37]">ahol az élet ünnep</span>
                            </h2>
                            <p className="text-white/50 leading-relaxed mb-6">
                                Az Aura Gastronomy konyhája a legjobb hazai és nemzetközi alapanyagokra épít. Séfünk minden fogásba a tökéletességre törekvést és a szenvedélyt sűríti. A hangulatot a meleg fények, a kellemes jazz és az elegáns terek teszik felejthetetlenné.
                            </p>
                            <p className="text-white/50 leading-relaxed">
                                Nálunk az étkezés nem csupán táplálkozás – hanem egy utazás az érzékeken keresztül.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-[3/4] w-full max-w-md mx-auto rounded-lg overflow-hidden border border-[#D4AF37]/20">
                                <img
                                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
                                    alt="Aura Gastronomy belső tér"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#D4AF37]/40 rounded-lg" />
                        </motion.div>
                    </div>
                </section>

                {/* ══════════ Menu Preview Section ══════════ */}
                <section id="menu" className="py-24 lg:py-32 bg-[#0a0a0a]">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <p className="text-[#D4AF37] tracking-[0.3em] text-xs mb-4 uppercase">Étlapunk</p>
                            <h2 className="font-playfair text-4xl md:text-5xl font-semibold">Signature Fogások</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
                            {/* Left column */}
                            <div className="border-t border-[#D4AF37]/20">
                                {menuLeft.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="flex items-center gap-4 py-5 border-b border-[#D4AF37]/20 group"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[#D4AF37] font-semibold text-lg group-hover:text-white transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-white/40 text-sm mt-0.5">{item.desc}</p>
                                        </div>
                                        <span className="text-white/70 font-medium ml-2 whitespace-nowrap">{item.price}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right column */}
                            <div className="border-t border-[#D4AF37]/20 md:border-t-[#D4AF37]/20">
                                {menuRight.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 + 0.15 }}
                                        className="flex items-center gap-4 py-5 border-b border-[#D4AF37]/20 group"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[#D4AF37] font-semibold text-lg group-hover:text-white transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-white/40 text-sm mt-0.5">{item.desc}</p>
                                        </div>
                                        <span className="text-white/70 font-medium ml-2 whitespace-nowrap">{item.price}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ Reservation Section ══════════ */}
                <section
                    id="reservation"
                    className="py-24 lg:py-32 relative"
                    style={{ background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)' }}
                >
                    <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-[#D4AF37] tracking-[0.3em] text-xs mb-4 uppercase">Foglalás</p>
                            <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
                                Foglalj asztalt
                            </h2>
                            <p className="text-white/50 mb-10 max-w-md mx-auto">
                                Élvezd a gasztronómiai utazást – foglalj előre, hogy biztosítsd a helyed.
                            </p>
                            <a
                                href="tel:+3612345678"
                                className="inline-flex px-12 py-5 bg-[#D4AF37] text-[#0a0a0a] text-sm font-bold tracking-widest rounded transition-all duration-300 hover:bg-[#e8c84b] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                            >
                                ASZTALFOGLALÁS
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════ Footer ══════════ */}
                <footer className="bg-[#0a0a0a] border-t border-[#D4AF37]/10">
                    {/* Google Maps placeholder */}
                    <div className="w-full h-64 bg-[#1a1a1a] flex items-center justify-center text-white/30 text-sm">
                        [ Google Maps integráció helye ]
                    </div>

                    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 grid md:grid-cols-3 gap-10">
                        <div>
                            <h4 className="font-playfair text-xl text-[#D4AF37] mb-4">Aura Gastronomy</h4>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Budapest szívében, az Andrássy út 112. szám alatt – ahol minden este ünnep.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[#D4AF37] text-sm tracking-widest mb-4 uppercase">Nyitvatartás</h4>
                            <ul className="text-white/50 text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <Clock size={14} className="text-[#D4AF37]" />
                                    K–Cs: 18:00 – 23:00
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={14} className="text-[#D4AF37]" />
                                    P–Szo: 18:00 – 24:00
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin size={14} className="text-[#D4AF37]" />
                                    Budapest, Andrássy út 112.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[#D4AF37] text-sm tracking-widest mb-4 uppercase">Kövess minket</h4>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors"
                            >
                                <Instagram size={20} />
                                <span className="text-sm">@aura.gastronomy</span>
                            </a>
                        </div>
                    </div>

                    <div className="text-center text-white/20 text-xs py-6 border-t border-white/5">
                        © 2026 Aura Gastronomy. Minden jog fenntartva.
                    </div>
                </footer>
            </div>
        </>
    );
};
