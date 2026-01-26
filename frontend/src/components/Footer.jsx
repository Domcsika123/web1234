import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { contactInfo, slogans } from '../mockData';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="bg-card border-t border-border-medium">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <h3 className="heading-4 text-brand-primary mb-3 md:mb-4 text-lg md:text-xl">WebForge</h3>
            <p className="body-medium text-secondary mb-4 md:mb-6 text-sm md:text-base">
              {slogans[0]}
            </p>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-border-medium bg-page hover:bg-brand-primary hover:border-brand-primary transition-all group"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-text-inverse" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-border-medium bg-page hover:bg-brand-primary hover:border-brand-primary transition-all group"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-text-inverse" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-border-medium bg-page hover:bg-brand-primary hover:border-brand-primary transition-all group"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-text-inverse" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-6 text-primary mb-3 md:mb-4 text-sm md:text-base">Gyorsmenü</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="link-text hover:text-brand-hover transition-colors text-sm md:text-base"
                >
                  Kezdőlap
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                  className="link-text hover:text-brand-hover transition-colors text-sm md:text-base"
                >
                  Referenciák
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="link-text hover:text-brand-hover transition-colors text-sm md:text-base"
                >
                  Kapcsolat
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="heading-6 text-primary mb-3 md:mb-4 text-sm md:text-base">Elérhetőség</h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-3 w-3 md:h-4 md:w-4 text-brand-primary flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="body-small text-secondary hover:text-brand-primary transition-colors text-xs md:text-sm break-all">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3 w-3 md:h-4 md:w-4 text-brand-primary flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="body-small text-secondary hover:text-brand-primary transition-colors text-xs md:text-sm">
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-border-medium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="caption text-secondary text-xs md:text-sm">
              © {currentYear} WebForge. Minden jog fenntartva.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <button
                onClick={() => setShowPrivacy(true)}
                className="caption text-secondary hover:text-brand-primary transition-colors text-xs md:text-sm"
              >
                Adatvédelmi nyilatkozat
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="caption text-secondary hover:text-brand-primary transition-colors text-xs md:text-sm"
              >
                ÁSZF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal components */}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
    </footer>
  );
};

export default Footer;
