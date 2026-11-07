import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';

export function Footer({ copy, onOpenLegal }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex" aria-label={copy.backToTop}>
              <Logo size={40} />
            </a>
            <p className="type-body mt-6 max-w-sm">{copy.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {copy.tags.map((tag) => (
                <li key={tag} className="footer-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {copy.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="text-sm font-semibold text-hi">{col.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-hi">{copy.contactTitle}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href="mailto:info@auracode.hu" className="footer-link inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-volt" aria-hidden="true" /> info@auracode.hu
                </a>
              </li>
              <li>
                <a href="tel:+36306489678" className="footer-link inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-volt" aria-hidden="true" /> +36 30 648 9678
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-lo">
                <MapPin className="h-4 w-4 text-volt" aria-hidden="true" /> Budapest
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-lo md:flex-row md:items-center md:justify-between">
          <p>
            © {year} AuraCode. {copy.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" className="footer-link" onClick={() => onOpenLegal('privacy')}>
              {copy.privacy}
            </button>
            <button type="button" className="footer-link" onClick={() => onOpenLegal('aszf')}>
              {copy.terms}
            </button>
            <a href="#top" className="footer-link inline-flex items-center gap-2">
              {copy.backToTop}
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
