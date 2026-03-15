import { useState } from 'react';
import { motion } from 'framer-motion';
import { AuraCodeLogo } from './AuraCodeLogo';
import { LegalModal } from './LegalModal';

const footerLinks = [
  {
    title: 'Navigáció',
    links: [
      { name: 'Szolgáltatások', href: '#services' },
      { name: 'Folyamat', href: '#process' },
      { name: 'Kapcsolat', href: '#contact' },
    ],
  },
  {
    title: 'Szolgáltatások',
    links: [
      { name: 'Weboldal készítés', href: '#services' },
      { name: 'Webshop fejlesztés', href: '#services' },
      { name: 'SEO optimalizálás', href: '#services' },
      { name: 'Karbantartás', href: '#services' },
    ],
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modal, setModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#ffffff10] py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              data-testid="footer-logo"
            >
              <AuraCodeLogo className="h-10 w-10" />
              <span className="font-black text-xl tracking-tight" style={{ fontWeight: 900, WebkitTextStroke: '0.35px rgba(255,255,255,0.55)' }}>
                Aura<span className="gradient-text font-black" style={{ fontWeight: 900, WebkitTextStroke: '0.35px rgba(0,255,0,0.4)' }}>Code</span>
              </span>
            </motion.button>

            <p className="text-[#A1A1AA] leading-relaxed max-w-md mb-6">
              Prémium weboldalak kis- és középvállalkozások részére.
              Digitális partnerként dolgozunk a stratégiai tervezéstől
              a megvalósításon át a folyamatos fejlesztésig.
            </p>

            <div className="flex gap-4">
              {['30 nap garancia', 'Fix árak', 'Magyar csapat'].map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-[#52525B] border border-[#ffffff10] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h4 className="font-bold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-[#A1A1AA] hover:text-[#00FF00] transition-colors text-sm"
                      data-testid={`footer-link-${columnIndex}-${linkIndex}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#ffffff10] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#52525B] text-sm">
            © {currentYear} AuraCode. Minden jog fenntartva.
          </p>

          <div className="flex gap-6 text-sm text-[#52525B]">
            <button onClick={() => setModal('privacy')} className="hover:text-[#A1A1AA] transition-colors">
              Adatvédelem
            </button>
            <button onClick={() => setModal('aszf')} className="hover:text-[#A1A1AA] transition-colors">
              ÁSZF
            </button>
          </div>
        </div>
      </div>

      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </footer>
  );
};
