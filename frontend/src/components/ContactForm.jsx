import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { contactInfo } from '../mockData';
import { toast } from 'sonner';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import { useInView } from '../hooks/useInView';

// Formspree endpoint - nincs szükség backendre vagy adatbázisra!
const FORMSPREE_URL = 'https://formspree.io/f/xojednlb';

const ContactForm = () => {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Sikeres küldés!', {
          description: 'Köszönjük megkeresésedet! Hamarosan felvesszük veled a kapcsolatot.',
        });

        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setIsSubmitted(false);
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Hiba történt', {
        description: 'Hiba történt az üzenet küldése során. Kérjük, próbáld újra később.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-4 md:px-8 bg-page">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-20" ref={ref}>
          <h2 className="heading-2 mb-4 md:mb-6 text-primary">Kezdjük el!</h2>
          <p className="body-large text-secondary max-w-3xl mx-auto px-2">
            Kérj egyedi ajánlatot, és építsünk egy olyan oldalt, ami valóban a te cégedet képviseli.
          </p>
          <div className={`section-divider ${isInView ? 'section-divider-visible' : ''}`}></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div>
            <div className="mb-8 md:mb-12">
              <h3 className="heading-4 mb-4 md:mb-6 text-primary text-lg md:text-xl">Írj nekünk</h3>
              <p className="body-large text-secondary mb-6 md:mb-8 text-base md:text-lg">
                Ajánlatkérés kötelezettségek nélkül. Te döntesz.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl border border-border-medium bg-card hover:bg-border-medium transition-colors">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-brand-primary/10">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-brand-primary" />
                </div>
                <div>
                  <p className="caption text-secondary mb-1 text-xs">EMAIL</p>
                  <p className="body-medium text-primary text-sm md:text-base">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl border border-border-medium bg-card hover:bg-border-medium transition-colors">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-brand-primary/10">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-brand-primary" />
                </div>
                <div>
                  <p className="caption text-secondary mb-1 text-xs">TELEFON</p>
                  <p className="body-medium text-primary text-sm md:text-base">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl border border-border-medium bg-card hover:bg-border-medium transition-colors">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-brand-primary/10">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-brand-primary" />
                </div>
                <div>
                  <p className="caption text-secondary mb-1 text-xs">HELYSZÍN</p>
                  <p className="body-medium text-primary text-sm md:text-base">{contactInfo.address}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
              <p className="body-small text-primary text-sm">
                <Check className="inline h-4 w-4 md:h-5 md:w-5 mr-2 text-brand-primary" />
                Nincs kötelezettség
              </p>
              <p className="body-small text-primary mt-2 text-sm">
                <Check className="inline h-4 w-4 md:h-5 md:w-5 mr-2 text-brand-primary" />
                24 órán belül válaszolunk
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 md:p-8 rounded-xl border border-border-medium bg-card">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="name" className="body-small text-primary mb-2 block text-sm">
                  Név *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-page border-border-medium text-primary text-sm md:text-base"
                  placeholder="Teljes neved"
                />
              </div>
              <div>
                <Label htmlFor="email" className="body-small text-primary mb-2 block text-sm">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-page border-border-medium text-primary text-sm md:text-base"
                  placeholder="pelda@email.hu"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="body-small text-primary mb-2 block text-sm">
                  Telefon
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-page border-border-medium text-primary text-sm md:text-base"
                  placeholder="+36 30 123 4567"
                />
              </div>
              <div>
                <Label htmlFor="message" className="body-small text-primary mb-2 block text-sm">
                  Projekt leírása *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-page border-border-medium text-primary text-sm md:text-base"
                  placeholder="Írj néhány mondatot a projektedről..."
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border-medium text-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
                <label htmlFor="terms" className="body-small text-secondary text-sm">
                  Elfogadom az{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacy(true);
                    }}
                    className="text-brand-primary hover:text-brand-hover underline"
                  >
                    adatvédelmi nyilatkozatot
                  </button>
                  {' '}és az{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTerms(true);
                    }}
                    className="text-brand-primary hover:text-brand-hover underline"
                  >
                    ÁSZF-et
                  </button>
                  .
                </label>
              </div>
              <Button
                type="submit"
                className="btn-primary w-full"
                size="lg"
                disabled={isSubmitted || isLoading || !acceptedTerms}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    Küldés...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Elküldve!
                  </>
                ) : (
                  <>
                    Küldés
                    <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal components */}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
    </section>
  );
};

export default ContactForm;
