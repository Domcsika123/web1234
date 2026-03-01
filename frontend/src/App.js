import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Approach } from "./components/Approach";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Approach />
        <Stats />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
