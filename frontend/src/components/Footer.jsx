import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { contactInfo, slogans } from '../mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border-medium">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="heading-4 text-brand-primary mb-4">WebForge</h3>
            <p className="body-medium text-secondary mb-6">
              {slogans[0]}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-medium bg-page hover:bg-brand-primary hover:border-brand-primary transition-all group"
              >
                <Facebook className="h-5 w-5 text-primary group-hover:text-text-inverse" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-medium bg-page hover:bg-brand-primary hover:border-brand-primary transition-all group"
              >
                <Instagram className="h-5 w-5 text-primary group-hover:text-text-inverse" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-medium bg-page hover:bg-brand-primary hover:border-brand-primary transition-all group"
              >
                <Linkedin className="h-5 w-5 text-primary group-hover:text-text-inverse" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-6 text-primary mb-4">Gyorsmenü</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="link-text hover:text-brand-hover transition-colors"
                >
                  Főlap
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                  className="link-text hover:text-brand-hover transition-colors"
                >
                  Referenciák
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="link-text hover:text-brand-hover transition-colors"
                >
                  Kapcsolat
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="heading-6 text-primary mb-4">Elérhetőség</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-primary" />
                <a href={`mailto:${contactInfo.email}`} className="body-small text-secondary hover:text-brand-primary transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-primary" />
                <a href={`tel:${contactInfo.phone}`} className="body-small text-secondary hover:text-brand-primary transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-medium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="caption text-secondary">
              © {currentYear} WebForge. Minden jog fenntartva.
            </p>
            <div className="flex gap-6">
              <button className="caption text-secondary hover:text-brand-primary transition-colors">
                Adatvédelmi nyilatkozat
              </button>
              <button className="caption text-secondary hover:text-brand-primary transition-colors">
                Általános Szerződési Feltételek
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
