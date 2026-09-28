import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import "@/fx.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MarqueeBand } from "./components/MarqueeBand";
import { Approach } from "./components/Approach";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Templates } from "./components/Templates";
import { Process } from "./components/Process";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Intro } from "./components/Intro";
import { CursorGlow, ScrollProgress } from "./components/fx";
import { GastroPreview } from "./components/previews/GastroPreview";
import { FitnessPreview } from "./components/previews/FitnessPreview";
import { LawPreview } from "./components/previews/LawPreview";
import { BarberPreview } from "./components/previews/BarberPreview";
import { WeddingPreview } from "./components/previews/WeddingPreview";
import { BeautyPreview } from "./components/previews/BeautyPreview";
import { content } from "./i18n/content";

const Home = ({ lang, setLang, copy }) => {
  const [ready, setReady] = useState(false);
  const handleIntroDone = useCallback(() => setReady(true), []);

  return (
    <div className="App relative bg-[#050505] min-h-screen">
      <Intro onDone={handleIntroDone} lines={copy.intro} />
      <ScrollProgress />
      <CursorGlow />
      <Navbar lang={lang} setLang={setLang} content={copy.navbar} ready={ready} />
      <main className="relative z-[2]">
        <Hero content={copy.hero} ready={ready} />
        <MarqueeBand content={copy.marquee} />
        <Approach content={copy.approach} />
        <Stats content={copy.stats} />
        <Services content={copy.services} />
        <Templates content={copy.templates} />
        <Process content={copy.process} />
        <FAQ content={copy.faq} />
        <Contact content={copy.contact} />
      </main>
      <Footer content={copy.footer} />
    </div>
  );
};

function App() {
  const [lang, setLang] = useState("hu");
  const copy = useMemo(() => content[lang], [lang]);

  useEffect(() => {
    const remove = () => {
      const badge = document.getElementById("emergent-badge");
      if (badge) badge.remove();
    };
    remove();
    const observer = new MutationObserver(remove);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = copy.meta.title;
    document.documentElement.lang = lang;
  }, [copy.meta.title, lang]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} copy={copy} />} />
        <Route path="/preview/gastro" element={<GastroPreview />} />
        <Route path="/preview/fitness" element={<FitnessPreview />} />
        <Route path="/preview/law" element={<LawPreview />} />
        <Route path="/preview/barber" element={<BarberPreview />} />
        <Route path="/preview/wedding" element={<WeddingPreview />} />
        <Route path="/preview/beauty" element={<BeautyPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
