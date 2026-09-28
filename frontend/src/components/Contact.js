import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Check, AlertCircle } from 'lucide-react';
import { LegalModal } from './LegalModal';
import { SectionHeader } from './fx';

const EMAIL = 'info@auracode.hu';

const Field = ({ multiline = false, label, ...props }) => (
  <div className="field">
    {multiline ? (
      <textarea {...props} placeholder=" " className="field-input resize-none" />
    ) : (
      <input {...props} placeholder=" " className="field-input" />
    )}
    <label className="field-label">{label}</label>
  </div>
);

export const Contact = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  });

  const [status, setStatus] = useState('idle'); // idle | loading | sent | error
  const [modal, setModal] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xojednlb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', message: '', privacy: false });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const contactInfo = [
    { icon: Mail, label: content.infoLabels[0], value: EMAIL, href: `mailto:${EMAIL}`, copy: true },
    { icon: Phone, label: content.infoLabels[1], value: '+36 30 648 9678', href: 'tel:+36306489678' },
    { icon: MapPin, label: content.infoLabels[2], value: content.location, href: null },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-36 overflow-hidden" data-testid="contact-section">
      <div className="aurora aurora-green w-[700px] h-[700px] left-1/2 -translate-x-1/2 top-40 opacity-25" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <SectionHeader
          tag={content.tag}
          start={content.headlineStart}
          accent={content.headlineAccent}
          subtitle={content.subtitle}
          inView={inView}
          testId="contact-headline"
          className="mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glow-frame"
        >
          <div className="glow-frame-inner grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Info side */}
            <div className="relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 p-7 lg:p-12">
              <div className="absolute inset-0 dot-bg opacity-40 fade-mask-radial" />
              <div className="relative">
                <h3 className="text-2xl lg:text-3xl font-bold">{content.title}</h3>
                <p className="mt-3 text-[#A1A1AA] leading-relaxed">{content.lead}</p>

                <div className="mt-10 space-y-3">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-black/30 p-4 transition-colors hover:border-[#00FF00]/30"
                      data-testid={`contact-info-${index}`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF00]/10 transition-colors group-hover:bg-[#00FF00] group-hover:text-black text-[#00FF00]">
                        <info.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] tracking-[0.2em] text-white/40">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="block truncate text-white hover:text-[#00FF00] transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white">{info.value}</p>
                        )}
                      </div>
                      {info.copy && (
                        <button
                          type="button"
                          onClick={copyEmail}
                          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-[#00FF00]/50 hover:text-[#00FF00]"
                          aria-label={content.copyEmail}
                          title={content.copyEmail}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span key={copied ? 'ok' : 'copy'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                              {copied ? <Check className="h-4 w-4 text-[#00FF00]" /> : <Copy className="h-4 w-4" />}
                            </motion.span>
                          </AnimatePresence>
                          <AnimatePresence>
                            {copied && (
                              <motion.span
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-8 right-0 whitespace-nowrap rounded-md bg-[#00FF00] px-2 py-1 text-[10px] font-bold text-black"
                              >
                                {content.copied}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {content.trust.map((t) => (
                    <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-[#A1A1AA]">
                      <CheckCircle className="h-4 w-4 text-[#00FF00]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form side */}
            <div className="p-7 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="name" type="text" required value={formData.name} onChange={handleChange} label={content.form.name} data-testid="contact-input-name" />
                  <Field name="email" type="email" required value={formData.email} onChange={handleChange} label={content.form.email} data-testid="contact-input-email" />
                </div>
                <Field name="phone" type="tel" value={formData.phone} onChange={handleChange} label={content.form.phone} data-testid="contact-input-phone" />
                <Field multiline name="message" rows={5} required value={formData.message} onChange={handleChange} label={content.form.message} data-testid="contact-input-message" />

                <label htmlFor="privacy" className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    name="privacy"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    required
                    className="peer sr-only"
                    data-testid="contact-checkbox-privacy"
                  />
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-white/20 transition-colors peer-checked:border-[#00FF00] peer-checked:bg-[#00FF00] peer-focus-visible:ring-2 peer-focus-visible:ring-[#00FF00]/50">
                    {formData.privacy && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
                  </span>
                  <span className="text-sm text-[#A1A1AA]">
                    {content.form.privacyPrefix}{' '}
                    <button type="button" onClick={() => setModal('privacy')} className="underline hover:text-[#00FF00] transition-colors">{content.form.privacyLink}</button>
                    {' '}{content.form.privacyMiddle}{' '}
                    <button type="button" onClick={() => setModal('aszf')} className="underline hover:text-[#00FF00] transition-colors">{content.form.termsLink}</button>
                    {content.form.privacySuffix}
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary !mt-6 w-full flex items-center justify-center gap-2 group disabled:opacity-60"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="contact-submit-btn"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      {status === 'sent' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          {content.form.sent}
                        </>
                      ) : status === 'loading' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                          {content.form.sending}
                        </>
                      ) : (
                        <>
                          {content.form.send}
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-sm text-[#ff6b6b]"
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {content.form.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </section>
  );
};
