import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Templates } from "./components/Templates";
import { Process } from "./components/Process";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { GastroPreview } from "./components/previews/GastroPreview";
import { FitnessPreview } from "./components/previews/FitnessPreview";
import { LawPreview } from "./components/previews/LawPreview";
import { BarberPreview } from "./components/previews/BarberPreview";
import { WeddingPreview } from "./components/previews/WeddingPreview";
import { BeautyPreview } from "./components/previews/BeautyPreview";
import { content } from "./i18n/content";

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
  }, [copy.meta.title]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App bg-[#0A0A0A] min-h-screen">
              <Navbar lang={lang} setLang={setLang} content={copy.navbar} />
              <main>
                <div className="relative overflow-hidden noise-overlay">
                  <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none" />
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                      <span
                        key={i}
                        className="particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDuration: `${4 + Math.random() * 4}s`,
                          animationDelay: `${Math.random() * 4}s`,
                          opacity: 0.35 + Math.random() * 0.4,
                        }}
                      />
                    ))}
                  </div>
                  <Hero content={copy.hero} />
                  <Approach content={copy.approach} />
                </div>
                <Stats content={copy.stats} />
                <Services content={copy.services} />
                <Templates content={copy.templates} />
                <Process content={copy.process} />
                <Pricing content={copy.pricing} />
                <FAQ content={copy.faq} />
                <Contact content={copy.contact} />
              </main>
              <Footer content={copy.footer} />
            </div>
          }
        />
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
