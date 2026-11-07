import { useRef, useState } from 'react';
import '../../styles/sections.css';
import { LegalDialog } from '../LegalModal';
import { Approach } from './Approach';
import { ChapterRail } from './ChapterRail';
import { Contact } from './Contact';
import { Faq } from './Faq';
import { Features } from './Features';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Metrics } from './Metrics';
import { Navbar } from './Navbar';
import { useActiveSection } from './primitives';
import { Process } from './Process';
import { Templates } from './Templates';

const SECTION_IDS = ['approach', 'results', 'services', 'templates', 'process', 'faq', 'contact'];

export function Landing({ copy, lang, setLang }) {
  const active = useActiveSection(SECTION_IDS);
  const [legal, setLegal] = useState(null);
  const legalOpener = useRef(null);
  const openLegal = (type) => {
    legalOpener.current = document.activeElement;
    setLegal(type);
  };
  const onLegalChange = (open) => !open && setLegal(null);

  return (
    <div className="aura-root">
      <a href="#main" className="skip-link">
        {copy.navbar.skip}
      </a>
      <div className="grain" aria-hidden="true" />

      <Navbar copy={copy.navbar} lang={lang} setLang={setLang} active={active} />
      <ChapterRail chapters={copy.chapters} active={active} label={copy.chaptersLabel} />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero copy={copy.hero} />
        <Approach copy={copy.approach} />
        <Metrics copy={copy.metrics} />
        <Features copy={copy.services} />
        <Templates copy={copy.templates} />
        <Process copy={copy.process} />
        <Faq copy={copy.faq} />
        <Contact copy={copy.contact} lang={lang} onOpenLegal={openLegal} />
      </main>

      <Footer copy={copy.footer} onOpenLegal={openLegal} />
      <LegalDialog type={legal} onOpenChange={onLegalChange} closeLabel={copy.legal.close} returnFocusRef={legalOpener} />
    </div>
  );
}
