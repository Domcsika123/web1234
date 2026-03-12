import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Templates } from "./components/Templates";
import { Process } from "./components/Process";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { GastroPreview } from "./components/previews/GastroPreview";
import { FitnessPreview } from "./components/previews/FitnessPreview";
import { LawPreview } from "./components/previews/LawPreview";
import { BarberPreview } from "./components/previews/BarberPreview";
import { WeddingPreview } from "./components/previews/WeddingPreview";
import { BeautyPreview } from "./components/previews/BeautyPreview";

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App bg-[#0A0A0A] min-h-screen">
              <Navbar />
              <main>
                <Hero />
                <Approach />
                <Stats />
                <Services />
                <Templates />
                <Process />
                <FAQ />
                <Contact />
              </main>
              <Footer />
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
