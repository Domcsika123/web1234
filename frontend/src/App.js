import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Toaster } from 'sonner';

function App() {
  const handleCtaClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Header onCtaClick={handleCtaClick} />
      <main>
        <Hero onCtaClick={handleCtaClick} />
        <Features />
        <Process />
        <CaseStudies />
        <Testimonials />
        <WhyUs />
        <FAQ />
        <CTASection onCtaClick={handleCtaClick} />
        <ContactForm />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
