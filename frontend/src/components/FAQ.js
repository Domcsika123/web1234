import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const faqs = [
  {
    question: 'Mennyi idő alatt készül el?',
    answer: 'A projektek általában 1-4 hét alatt készülnek el a komplexitástól függően. Egyszerűbb landing page-ek akár 1 hét alatt is elkészülhetnek, míg összetettebb webshopok vagy egyedi funkciókkal rendelkező oldalak 3-4 hetet vehetnek igénybe. Az első konzultáción pontosan meghatározzuk a határidőt.',
  },
  {
    question: 'Mennyibe fog kerülni?',
    answer: 'Fix áras rendszerben dolgozunk, így nem érhetnek meglepetések. A pontos árat az igényfelmérés után adjuk meg, amely függ az oldal típusától, funkcióitól és a tartalomtól. Az ingyenes konzultáción részletes árajánlatot kapsz kötelezettségek nélkül.',
  },
  {
    question: 'Nekem kell biztosítanom a domaint és a tárhelyet?',
    answer: 'Nem feltétlenül. Ha van már domained és tárhelyed, azzal dolgozunk. Ha nincs, segítünk a beszerzésében és beállításában. A tárhely kiválasztásánál tanácsot adunk, hogy a weboldalad gyorsan és megbízhatóan működjön.',
  },
  {
    question: 'Szövegírást vállaltok?',
    answer: 'Igen, segítünk a tartalom elkészítésében. Alapból a te szövegeidet használjuk és optimalizáljuk SEO szempontból, de igény esetén teljes szövegírást is vállalunk, hogy a weboldalad tartalma is profi legyen.',
  },
  {
    question: 'Megtalálnak majd a Google-ben?',
    answer: 'Minden weboldalt alapvető SEO beállításokkal adunk át: technikai SEO, gyors betöltés, mobilbarát design, meta adatok. Ez biztosítja, hogy a Google indexelje az oldalt. Haladó SEO szolgáltatást is kérhetsz további díjért.',
  },
  {
    question: 'Elérlek titeket átadás után is?',
    answer: 'Természetesen! 30 napos garanciát adunk minden projektre, ami alatt bármilyen hibát ingyen javítunk. Ezen túl opcionális karbantartási csomagokat kínálunk, amelyek tartalmazzák a frissítéseket, biztonsági mentéseket és a folyamatos támogatást.',
  },
];

export const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]"
      data-testid="faq-section"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-base text-[#00FF00] tracking-wider">
            07 // GYAKORI KÉRDÉSEK
          </span>
          <h2 className="text-headline font-bold mt-4" data-testid="faq-headline">
            Minden, amit <span className="gradient-text">tudnod kell</span>
          </h2>
          <p className="text-[#A1A1AA] mt-4">
            Az oldalkészítésről egyszerűen
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item border-b border-[#ffffff10] pb-4"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="faq-trigger text-left text-lg font-semibold hover:no-underline py-4 [&[data-state=open]]:text-[#00FF00]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#A1A1AA] leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[#52525B] mb-4">
            Nem találtad meg a választ a kérdésedre?
          </p>
          <a
            href="#contact"
            className="text-[#00FF00] hover:underline font-medium"
            data-testid="faq-contact-link"
          >
            Írj nekünk és válaszolunk!
          </a>
        </motion.div>
      </div>
    </section>
  );
};
