import { useEffect } from "react";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

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
    <div className="App bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Approach />
        <Stats />
        <Services />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
