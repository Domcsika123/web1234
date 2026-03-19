export const content = {
    hu: {
        meta: {
            title: "AuraCode | Weboldal Készítés Vállalkozásoknak",
        },
        navbar: {
            links: [
                { key: "services", name: "Szolgáltatások", href: "#services" },
                { key: "templates", name: "Sablonok", href: "#templates" },
                { key: "process", name: "Folyamat", href: "#process" },
                { key: "faq", name: "GYIK", href: "#faq" },
            ],
            cta: "Ingyenes konzultáció",
            languageLabel: "Nyelv",
            langHu: "Magyar",
            langEn: "Angol",
        },
        hero: {
            headlineStart: "Professzionális weboldal",
            headlineAccent: "vállalkozásod növekedéséhez",
            subtitle:
                "Prémium weboldalak kis- és középvállalkozások részére. Modern, SEO-optimalizált honlapok 1-4 hét alatt, fix áron.",
            primaryCta: "Ingyenes konzultáció",
            secondaryCta: "Szolgáltatások megtekintése",
            badges: ["30 napos garancia", "Fix áras projektek", "Ingyenes konzultáció"],
        },
        approach: {
            tag: "01 // A SZEMLÉLETÜNK",
            headlineStart: "A legtöbb weboldal elkészül... majd nem válik valódi",
            headlineAccent: "üzleti eszközzé.",
            paragraphs: [
                "Szép, de nem támogatja tudatosan az ügyfélszerzést.",
                "Modern, viszont nem felhasználóbarát.",
            ],
            painPointsTitle: "Mi is láttunk:",
            painPoints: [
                "digitális megoldásokat, amelyek nem illeszkednek a működéshez",
                "projekteket, ahol a célok nem voltak egyértelműek",
                "oldalakat, amelyek elkészültek, de nem kaptak irányt a fejlődéshez",
            ],
            strategyStart: "Ezért döntöttünk úgy, hogy",
            strategyAccent: "stratégiai szemlélettel",
            strategyEnd: "dolgozunk.",
            questionIntro: "Minden együttműködést egy egyszerű kérdéssel kezdünk:",
            question: "MIT SZERETNÉL ELÉRNI A DIGITÁLIS JELENLÉTEDDEL?",
            goals: [
                "Több megkeresést?",
                "Hatékonyabb értékesítést?",
                "Kevesebb manuális adminisztrációt?",
            ],
            answerLine: "A válasz határozza meg, mit és hogyan építünk.",
            partnerStart: "Nem klasszikus webfejlesztőként gondolkodunk.",
            partnerAccent: "Digitális partnerként dolgozunk",
            partnerEnd: ", a stratégiai tervezéstől a megvalósításon át a folyamatos fejlesztésig.",
        },
        stats: {
            tag: "02 // AMIT GARANTÁLUNK",
            items: [
                { value: 30, suffix: "", label: "Nap Garancia", description: "minden projektre" },
                { value: 3, suffix: "x", label: "Konverzió Növekedés", description: "átlagos eredmény" },
            ],
            tags: ["1-4 HÉT", "FIX ÁR", "EREDMÉNYGARANCIA"],
        },
        services: {
            tag: "03 // AMIT KAPSZ TŐLÜNK",
            headlineStart: "Nem csak egy weboldalt, hanem egy működő",
            headlineAccent: "ügyfélszerző rendszert",
            subtitle: "Minden fontos elemmel, ami a sikeres online jelenléthez kell",
            items: [
                {
                    title: "Gyors kivitelezés",
                    description: "Rövid átfutás, transzparens kivitelezés.",
                },
                {
                    title: "SEO-alapok beépítve",
                    description: "Technikai SEO és villámgyors betöltés.",
                },
                {
                    title: "Konverzió-fókusz",
                    description: "Minden elem az ügyfélszerzésért dolgozik.",
                },
                {
                    title: "Mérés beépítve",
                    description: "Precíz analitika a látogatók viselkedéséről.",
                },
                {
                    title: "Biztonság",
                    description: "Teljes körű adatvédelem.",
                },
                {
                    title: "Karbantartás",
                    description: "Támogatás az átadás után is.",
                },
            ],
        },
        templates: {
            tag: "04 // WEBOLDAL SABLONOK",
            headlineStart: "Választható",
            headlineAccent: "iparági sablonok",
            subtitle: "Ezek csak kiindulópontok. Bármilyen egyedi funkciót vagy designt megvalósítunk.",
            preview: "Előnézet",
            backToTemplates: "Vissza a sablonokhoz",
            list: [
                {
                    id: "gastro",
                    title: "Étterem",
                    description: "Modern asztalfoglalás fókuszú oldal.",
                    previewRoute: "/preview/gastro",
                    image:
                        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "fitness",
                    title: "Konditerem",
                    description: "Bérlet- és órarendközpontú landing oldal.",
                    previewRoute: "/preview/fitness",
                    image:
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "law",
                    title: "Ügyvédi iroda",
                    description: "Bizalmat építő vállalati megjelenés.",
                    previewRoute: "/preview/law",
                    image:
                        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "barber",
                    title: "Borbélyszalon",
                    description: "Időpontfoglalásra optimalizált sablon.",
                    previewRoute: "/preview/barber",
                    image:
                        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "wedding",
                    title: "Esküvői dekoráció",
                    description: "Portfólió- és ajánlatkérés-központú.",
                    previewRoute: "/preview/wedding",
                    image:
                        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "beauty",
                    title: "Szépségszalon",
                    description: "Prémium megjelenés online foglalással.",
                    previewRoute: "/preview/beauty",
                    image:
                        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
                },
            ],
        },
        process: {
            tag: "05 // HOGYAN DOLGOZUNK",
            headlineStart: "Átlátható, gyors,",
            headlineAccent: "kiszámítható folyamat",
            subtitle: "Mindig tudod, hol tartunk",
            steps: [
                {
                    number: "01",
                    title: "Brief & Igényfelmérés",
                    description: "Célok és versenytársak átbeszélése.",
                },
                {
                    number: "02",
                    title: "Tervezés & Wireframe",
                    description: "Struktúra és vizuális terv.",
                },
                {
                    number: "03",
                    title: "Fejlesztés",
                    description: "Modern technológia, biztonságos, skálázható.",
                },
                {
                    number: "04",
                    title: "Átadás & Élesítés",
                    description: "Technikai beállítások és betanítás.",
                },
                {
                    number: "05",
                    title: "Támogatás",
                    description: "30 nap garancia és karbantartás.",
                },
            ],
        },
        pricing: {
            tag: "06 // ÁRAZÁS",
            headlineStart: "Átlátható árazás, ",
            headlineAccent: "rejtett költségek nélkül",
            subtitle: "Az végösszeg egy becsült ár, a tényleges összeg lehet alacsonyabb és magasabb is egyéni igényektől függően.",
            labels: {
                type: "Weboldal típusa",
                design: "Design",
                pages: "Oldalak száma",
                urgency: "Sürgősség",
            },
            hints: {
                pages: "3 oldal felett minden további oldal +6.000 Ft.",
            },
            typeOptions: [
                { value: "landing", label: "Landing Page" },
                { value: "business", label: "Üzleti weboldal (többoldalas)" },
                { value: "webshop", label: "Webshop / E-kereskedelem" },
                { value: "booking", label: "Foglalási rendszerrel ellátott weboldal" },
            ],
            designOptions: [
                { value: "template", label: "Modern sablon alapú - 0 Ft" },
                { value: "custom", label: "Egyedi UI/UX tervezés - +65.000 Ft" },
            ],
            extras: {
                seo: "SEO optimalizálás (+29.000 Ft)",
                copywriting: "Profi szövegírás (+7.800 Ft / oldal)",
            },
            urgencyOptions: [
                { value: "normal", label: "Normál tempó (1.0x)" },
                { value: "urgent", label: "Sürgős, 1 héten belül (1.4x)" },
            ],
            summary: {
                title: "Árkalkuláció",
                base: "Alapár",
                design: "Design felár",
                extraPages: "További oldalak",
                seo: "SEO",
                copywriting: "Szövegírás",
                subtotal: "Részösszeg",
                multiplier: "Sürgősségi szorzó",
                total: "Végösszeg",
                eta: "Becsült elkészülési idő",
                days: "nap",
            },
            cta: "Ingyenes konzultáció",
        },
        faq: {
            tag: "07 // GYAKORI KÉRDÉSEK",
            headlineStart: "Minden, amit",
            headlineAccent: "tudnod kell",
            subtitle: "Az oldalkészítésről egyszerűen",
            items: [
                {
                    question: "Mennyi idő alatt készül el?",
                    answer: "A projektek általában 1-4 hét alatt készülnek el a komplexitástól függően.",
                },
                {
                    question: "Mennyibe fog kerülni?",
                    answer: "Fix áras rendszerben dolgozunk, így nem érhetnek meglepetések.",
                },
                {
                    question: "Nekem kell biztosítani a domaint és a tárhelyet?",
                    answer: "Nem feltétlenül. Segítünk a beállításokban is.",
                },
                {
                    question: "Szövegírást vállaltok?",
                    answer: "Igen, igény esetén segítünk a tartalom elkészítésében is.",
                },
                {
                    question: "Megtalálnak majd a Google-ben?",
                    answer: "Minden oldalt alap SEO beállításokkal adunk át.",
                },
                {
                    question: "Elérlek titeket átadás után is?",
                    answer: "Igen, 30 napos garancia és további támogatás is elérhető.",
                },
            ],
            missingAnswer: "Nem találtad meg a választ a kérdésedre?",
            contactLink: "Írj nekünk és válaszolunk!",
        },
        contact: {
            tag: "08 // KEZDJÜK EL",
            headlineStart: "Kérj",
            headlineAccent: "egyedi ajánlatot",
            subtitle: "Építsünk egy olyan oldalt, ami valóban a te cégedet képviseli.",
            title: "Írj nekünk",
            lead: "Ajánlatkérés kötelezettségek nélkül.",
            infoLabels: ["EMAIL", "TELEFON", "HELYSZÍN"],
            location: "Budapest, Magyarország",
            trust: ["Nincs kötelezettség", "24 órán belül válaszolunk"],
            form: {
                name: "NÉV *",
                email: "EMAIL *",
                phone: "TELEFON",
                message: "PROJEKT LEÍRÁSA *",
                namePlaceholder: "Teljes neved",
                emailPlaceholder: "email@pelda.hu",
                phonePlaceholder: "+36 XX XXX XXXX",
                messagePlaceholder: "Mesélj a projektedről...",
                privacyPrefix: "Elfogadom az",
                privacyLink: "adatvédelmi nyilatkozatot",
                privacyMiddle: "és az",
                termsLink: "ÁSZF-et",
                privacySuffix: ".",
                send: "Küldés",
                sending: "Küldés...",
                sent: "Elküldve!",
            },
        },
        footer: {
            description:
                "Prémium weboldalak kis- és középvállalkozások részére. Digitális partnerként dolgozunk a stratégiai tervezéstől a megvalósításon át a folyamatos fejlesztésig.",
            tags: ["30 nap garancia", "Fix árak", "Magyar csapat"],
            columns: [
                {
                    title: "Navigáció",
                    links: [
                        { name: "Szolgáltatások", href: "#services" },
                        { name: "Folyamat", href: "#process" },
                        { name: "Kapcsolat", href: "#contact" },
                    ],
                },
                {
                    title: "Szolgáltatások",
                    links: [
                        { name: "Weboldal készítés", href: "#services" },
                        { name: "Webshop fejlesztés", href: "#services" },
                        { name: "SEO", href: "#services" },
                        { name: "Karbantartás", href: "#services" },
                    ],
                },
            ],
            copyright: "Minden jog fenntartva.",
            privacy: "Adatvédelem",
            terms: "ÁSZF",
        },
    },

    // ANGOL VERZIO
    // ANGOL VERZIO
    // ANGOL VERZIO
    // ANGOL VERZIO



    en: {
        meta: {
            title: "AuraCode | Website Creation for Businesses",
        },
        navbar: {
            links: [
                { key: "services", name: "Services", href: "#services" },
                { key: "templates", name: "Templates", href: "#templates" },
                { key: "process", name: "Process", href: "#process" },
                { key: "faq", name: "FAQ", href: "#faq" },
            ],
            cta: "Free consultation",
            languageLabel: "Language",
            langHu: "Hungarian",
            langEn: "English",
        },
        hero: {
            headlineStart: "Professional website for your",
            headlineAccent: "business growth",
            subtitle:
                "Premium websites for small and medium-sized businesses. Modern, SEO-optimized websites in 1-4 weeks, at a fixed price.",
            primaryCta: "Free consultation",
            secondaryCta: "View services",
            badges: ["30-day guarantee", "Fixed-price projects", "Free consultation"],
        },
        approach: {
            tag: "01 // OUR APPROACH",
            headlineStart: "Most websites get built... then fail to become a real",
            headlineAccent: "business tool.",
            paragraphs: [
                "Its pretty, but it does not consciously support customer acquisition.",
                "Its modern, but not user-friendly.",
            ],
            painPointsTitle: "We have also seen:",
            painPoints: [
                "digital solutions that do not fit real operations",
                "projects where goals were never truly clear",
                "sites that got delivered but had no growth direction",
            ],
            strategyStart: "That is why we decided to work with a",
            strategyAccent: "strategic approach",
            strategyEnd: ".",
            questionIntro: "We start every collaboration with one simple question:",
            question: "WHAT DO YOU WANT TO ACHIEVE WITH YOUR DIGITAL PRESENCE?",
            goals: [
                "More inquiries?",
                "More efficient sales?",
                "Less manual administration?",
            ],
            answerLine: "The answer defines what we build and how we build it.",
            partnerStart: "We do not think like classic web developers.",
            partnerAccent: "We work as digital partners",
            partnerEnd: ", from strategic planning through delivery to continuous improvement.",
        },
        stats: {
            tag: "02 // WHAT WE GUARANTEE",
            items: [
                { value: 30, suffix: "", label: "Day Guarantee", description: "for every project" },
                { value: 3, suffix: "x", label: "Conversion Growth", description: "average result" },
            ],
            tags: ["1-4 WEEKS", "FIXED PRICE", "RESULT GUARANTEE"],
        },
        services: {
            tag: "03 // WHAT YOU GET FROM US",
            headlineStart: "Not just a website, but a working",
            headlineAccent: "customer acquisition system",
            subtitle: "With every key element required for successful online growth",
            items: [
                {
                    title: "Fast execution",
                    description: "Short turnaround, transparent implementation.",
                },
                {
                    title: "SEO basics included",
                    description: "Technical SEO and lightning-fast loading.",
                },
                {
                    title: "Conversion focus",
                    description: "Every element is built for customer acquisition.",
                },
                {
                    title: "Analytics included",
                    description: "Precise visitor behavior tracking and measurement.",
                },
                {
                    title: "Security",
                    description: "Full-scale data protection.",
                },
                {
                    title: "Maintenance",
                    description: "Support even after delivery.",
                },
            ],
        },
        templates: {
            tag: "04 // WEBSITE TEMPLATES",
            headlineStart: "Selectable",
            headlineAccent: "industry templates",
            subtitle: "These are starting points only. We can implement fully custom features and design.",
            preview: "Preview",
            backToTemplates: "Back to templates",
            list: [
                {
                    id: "gastro",
                    title: "Restaurant",
                    description: "Modern page focused on table reservations.",
                    previewRoute: "/preview/gastro",
                    image:
                        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "fitness",
                    title: "Gym",
                    description: "Pass and schedule-centered landing page.",
                    previewRoute: "/preview/fitness",
                    image:
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "law",
                    title: "Law Office",
                    description: "Trust-building corporate appearance.",
                    previewRoute: "/preview/law",
                    image:
                        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "barber",
                    title: "Barber Shop",
                    description: "Template optimized for appointment booking.",
                    previewRoute: "/preview/barber",
                    image:
                        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "wedding",
                    title: "Wedding Decoration",
                    description: "Portfolio and inquiry-centered structure.",
                    previewRoute: "/preview/wedding",
                    image:
                        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
                },
                {
                    id: "beauty",
                    title: "Beauty Salon",
                    description: "Premium look with online booking.",
                    previewRoute: "/preview/beauty",
                    image:
                        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
                },
            ],
        },
        process: {
            tag: "05 // HOW WE WORK",
            headlineStart: "Transparent, fast,",
            headlineAccent: "predictable process",
            subtitle: "You always know where we are in the process",
            steps: [
                {
                    number: "01",
                    title: "Brief & Needs Assessment",
                    description: "Discussing goals and competitors.",
                },
                {
                    number: "02",
                    title: "Design & Wireframe",
                    description: "Structure and visual concept.",
                },
                {
                    number: "03",
                    title: "Development",
                    description: "Modern technology, secure and scalable.",
                },
                {
                    number: "04",
                    title: "Delivery & Launch",
                    description: "Technical setup and training.",
                },
                {
                    number: "05",
                    title: "Support",
                    description: "30-day guarantee and maintenance.",
                },
            ],
        },
        pricing: {
            tag: "06 // PRICING",
            headlineStart: "Modern",
            headlineAccent: "website cost calculator",
            subtitle: "35% below market average with real-time estimation.",
            labels: {
                type: "Website type",
                design: "Design",
                pages: "Number of pages",
                urgency: "Urgency",
            },
            hints: {
                pages: "Above 3 pages, each additional page adds +6,000 HUF.",
            },
            typeOptions: [
                { value: "landing", label: "Landing Page" },
                { value: "business", label: "Business website (multi-page)" },
                { value: "webshop", label: "Webshop / E-commerce" },
                { value: "booking", label: "Landing page with integrated booking system" },
            ],
            designOptions: [
                { value: "template", label: "Modern template-based - 0 HUF" },
                { value: "custom", label: "Custom UI/UX design (Figma) - +65,000 HUF" },
            ],
            extras: {
                seo: "SEO optimization (+29,000 HUF)",
                copywriting: "Professional copywriting (+7,800 HUF / page)",
            },
            urgencyOptions: [
                { value: "normal", label: "Normal pace (1.0x)" },
                { value: "urgent", label: "Urgent, within 1 week (1.4x)" },
            ],
            summary: {
                title: "Price estimation",
                base: "Base price",
                design: "Design surcharge",
                extraPages: "Additional pages",
                seo: "SEO",
                copywriting: "Copywriting",
                subtotal: "Subtotal",
                multiplier: "Urgency multiplier",
                total: "Total",
                eta: "Estimated delivery time",
                days: "days",
            },
            cta: "Request free consultation",
        },
        faq: {
            tag: "07 // FREQUENTLY ASKED QUESTIONS",
            headlineStart: "Everything you",
            headlineAccent: "need to know",
            subtitle: "Website creation made simple",
            items: [
                {
                    question: "How long does it take to complete?",
                    answer: "Projects are usually completed in 1-4 weeks depending on complexity.",
                },
                {
                    question: "How much will it cost?",
                    answer: "We work with fixed pricing, so there are no surprises.",
                },
                {
                    question: "Do I need to provide the domain and hosting?",
                    answer: "Not necessarily. We can also help with setup and recommendations.",
                },
                {
                    question: "Do you offer copywriting?",
                    answer: "Yes, we can support content creation and optimization as needed.",
                },
                {
                    question: "Will I be found on Google?",
                    answer: "Every website includes foundational SEO settings.",
                },
                {
                    question: "Can I reach you after delivery?",
                    answer: "Yes, we provide a 30-day guarantee and optional ongoing support.",
                },
            ],
            missingAnswer: "Did not find your question?",
            contactLink: "Contact us and we will answer.",
        },
        contact: {
            tag: "08 // LETS GET STARTED",
            headlineStart: "Request a",
            headlineAccent: "custom quote",
            subtitle: "Lets build a website that truly represents your business.",
            title: "Get in touch",
            lead: "Request a quote without obligations.",
            infoLabels: ["EMAIL", "PHONE", "LOCATION"],
            location: "Budapest, Hungary",
            trust: ["No obligations", "We reply within 24 hours"],
            form: {
                name: "NAME *",
                email: "EMAIL *",
                phone: "PHONE",
                message: "PROJECT DESCRIPTION *",
                namePlaceholder: "Your full name",
                emailPlaceholder: "email@example.com",
                phonePlaceholder: "+36 XX XXX XXXX",
                messagePlaceholder: "Tell us about your project...",
                privacyPrefix: "I accept the",
                privacyLink: "Privacy Policy",
                privacyMiddle: "and the",
                termsLink: "T&C",
                privacySuffix: ".",
                send: "Send",
                sending: "Sending...",
                sent: "Sent!",
            },
        },
        footer: {
            description:
                "Premium websites for small and medium-sized businesses. We work as a digital partner from strategy to implementation and continuous growth.",
            tags: ["30-day guarantee", "Fixed pricing", "Hungarian team"],
            columns: [
                {
                    title: "Navigation",
                    links: [
                        { name: "Services", href: "#services" },
                        { name: "Process", href: "#process" },
                        { name: "Contact", href: "#contact" },
                    ],
                },
                {
                    title: "Services",
                    links: [
                        { name: "Website creation", href: "#services" },
                        { name: "Webshop development", href: "#services" },
                        { name: "SEO", href: "#services" },
                        { name: "Maintenance", href: "#services" },
                    ],
                },
            ],
            copyright: "All rights reserved.",
            privacy: "Privacy",
            terms: "T&C",
        },
    },
};
