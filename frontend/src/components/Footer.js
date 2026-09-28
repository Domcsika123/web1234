import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUp } from 'lucide-react';
import { AuraCodeLogo } from './AuraCodeLogo';
import { LegalModal } from './LegalModal';
import { Magnetic, scrollToId } from './fx';

export const Footer = ({ content }) => {
  const currentYear = new Date().getFullYear();
  const [modal, setModal] = useState(null);
  const [markRef, markInView] = useInView({ threshold: 0.6 });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20" data-testid="footer">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00FF00]/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto] gap-12 mb-16">
          <div>
            <button onClick={scrollToTop} className="flex items-center gap-3 mb-6" data-testid="footer-logo">
              <AuraCodeLogo className="h-[56px] w-[56px]" />
              <span className="font-black text-xl tracking-tight" style={{ fontWeight: 900 }}>
                Aura<span className="gradient-text font-black">Code</span>
              </span>
            </button>
            <p className="text-[#A1A1AA] leading-relaxed max-w-md mb-6">{content.description}</p>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#A1A1AA] border border-white/10 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {content.columns.map((column, columnIndex) => (
            <div key={column.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-5">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(link.href);
                      }}
                      className="group inline-flex items-center gap-2 text-[#D4D4D8] hover:text-[#00FF00] transition-colors"
                      data-testid={`footer-link-${columnIndex}-${linkIndex}`}
                    >
                      <span className="h-px w-0 bg-[#00FF00] transition-all duration-300 group-hover:w-4" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex md:justify-end">
            <Magnetic>
              <button
                onClick={scrollToTop}
                aria-label={content.backToTop}
                className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#00FF00] hover:bg-[#00FF00]"
              >
                <ArrowUp className="h-6 w-6 text-white transition-all group-hover:-translate-y-1 group-hover:text-black" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#71717A] text-sm">
            © {currentYear} AuraCode. {content.copyright}
          </p>
          <div className="flex gap-6 text-sm text-[#71717A]">
            <button onClick={() => setModal('privacy')} className="hover:text-white transition-colors">
              {content.privacy}
            </button>
            <button onClick={() => setModal('aszf')} className="hover:text-white transition-colors">
              {content.terms}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        ref={markRef}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 select-none text-center overflow-hidden"
        aria-hidden="true"
      >
        <span className={`wordmark block translate-y-[12%] ${markInView ? 'is-filled' : ''}`}>AURACODE</span>
      </motion.div>

      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </footer>
  );
};
