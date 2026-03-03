import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch('https://formspree.io/f/xojednlb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(formData),
    });
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '', privacy: false });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'info@auracode.hu',
      href: 'mailto:info@auracode.hu',
    },
    {
      icon: Phone,
      label: 'TELEFON',
      value: '+36 30 648 9678',
      href: 'tel:+36306489678',
    },
    {
      icon: MapPin,
      label: 'HELYSZÍN',
      value: 'Budapest, Magyarország',
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#121212]"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-base text-[#00FF00] tracking-wider">
            08 // KEZDJÜK EL
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="contact-headline">
            Kérj egyedi ajánlatot
          </h2>
          <p className="text-[#A1A1AA] mt-4 max-w-xl mx-auto">
            Építsünk egy olyan oldalt, ami valóban a te cégedet képviseli
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8">Írj nekünk</h3>
            <p className="text-[#A1A1AA] mb-8 leading-relaxed">
              Ajánlatkérés kötelezettségek nélkül. Te döntesz.
            </p>

            <div className="divide-y divide-[#ffffff08] mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 py-5"
                  data-testid={`contact-info-${index}`}
                >
                  <div className="p-3 rounded-lg bg-[#00FF00]/10">
                    <info.icon className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#52525B] mb-1">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white hover:text-[#00FF00] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-[#52525B]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00FF00]" />
                <span>Nincs kötelezettség</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00FF00]" />
                <span>24 órán belül válaszolunk</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label className="block font-mono text-xs text-[#52525B] mb-2">
                  NÉV *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-underline"
                  placeholder="Teljes neved"
                  data-testid="contact-input-name"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#52525B] mb-2">
                  EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-underline"
                  placeholder="email@pelda.hu"
                  data-testid="contact-input-email"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#52525B] mb-2">
                  TELEFON
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-underline"
                  placeholder="+36 XX XXX XXXX"
                  data-testid="contact-input-phone"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#52525B] mb-2">
                  PROJEKT LEÍRÁSA *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-underline resize-none"
                  placeholder="Mesélj a projektedről..."
                  data-testid="contact-input-message"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacy"
                  id="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-[#ffffff20] bg-transparent checked:bg-[#00FF00] checked:border-[#00FF00] focus:ring-[#00FF00] focus:ring-offset-0"
                  data-testid="contact-checkbox-privacy"
                />
                <label htmlFor="privacy" className="text-sm text-[#A1A1AA]">
                  Elfogadom az{' '}
                  <button type="button" onClick={() => setModal('privacy')} className="underline hover:text-[#00FF00] transition-colors">adatvédelmi nyilatkozatot</button>
                  {' '}és az{' '}
                  <button type="button" onClick={() => setModal('aszf')} className="underline hover:text-[#00FF00] transition-colors">ÁSZF-et</button>.
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 group disabled:opacity-60"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="contact-submit-btn"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Elküldve!
                  </>
                ) : isLoading ? (
                  'Küldés...'
                ) : (
                  <>
                    Küldés
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </section>
  );
};
