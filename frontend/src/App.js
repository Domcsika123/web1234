import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Landing } from './components/site/Landing';
import { content } from './i18n/content';

// Template demos are separate pages: load them only when a preview route is opened
const named = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));
const GastroPreview = named(() => import('./components/previews/GastroPreview'), 'GastroPreview');
const FitnessPreview = named(() => import('./components/previews/FitnessPreview'), 'FitnessPreview');
const LawPreview = named(() => import('./components/previews/LawPreview'), 'LawPreview');
const BarberPreview = named(() => import('./components/previews/BarberPreview'), 'BarberPreview');
const WeddingPreview = named(() => import('./components/previews/WeddingPreview'), 'WeddingPreview');
const BeautyPreview = named(() => import('./components/previews/BeautyPreview'), 'BeautyPreview');

const LANG_KEY = 'auracode-lang';

const readLang = () => {
  try {
    return window.localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'hu';
  } catch {
    return 'hu';
  }
};

// The template demos keep the typography of the previous site
const Preview = ({ children }) => (
  <div className="tpl-preview">
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>{children}</Suspense>
  </div>
);

function App() {
  const [lang, setLangState] = useState(readLang);
  const copy = useMemo(() => content[lang], [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description);
  }, [lang, copy]);

  // Some hosting previews inject a badge; CSS hides it, this removes it once it shows up
  useEffect(() => {
    const remove = () => document.getElementById('emergent-badge')?.remove();
    remove();
    const timers = [1000, 3000].map((ms) => window.setTimeout(remove, ms));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing copy={copy} lang={lang} setLang={setLang} />} />
          <Route path="/preview/gastro" element={<Preview><GastroPreview /></Preview>} />
          <Route path="/preview/fitness" element={<Preview><FitnessPreview /></Preview>} />
          <Route path="/preview/law" element={<Preview><LawPreview /></Preview>} />
          <Route path="/preview/barber" element={<Preview><BarberPreview /></Preview>} />
          <Route path="/preview/wedding" element={<Preview><WeddingPreview /></Preview>} />
          <Route path="/preview/beauty" element={<Preview><BeautyPreview /></Preview>} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
