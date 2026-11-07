// All landing-page copy, Hungarian first. Claims (1–4 weeks, fixed price,
// 30-day guarantee, 3× average conversion growth, 24h reply) come from the
// previous site; keep them in sync with what AuraCode actually offers.

const templateImages = (id) => ({
  src: `/media/tpl-${id}-1024.webp`,
  srcSet: `/media/tpl-${id}-640.webp 640w, /media/tpl-${id}-1024.webp 1024w`,
});

export const content = {
  hu: {
    meta: {
      title: 'AuraCode | Prémium weboldalak KKV-knak – 1–4 hét, fix áron',
      description:
        'Konverzióra és keresőoptimalizálásra tervezett weboldalak kis- és középvállalkozásoknak. 1–4 hét alatt, fix áron, 30 napos garanciával. 100% magyar csapat.',
    },

    navbar: {
      skip: 'Ugrás a tartalomra',
      home: 'AuraCode – vissza az oldal tetejére',
      primary: 'Fő navigáció',
      links: [
        { id: 'services', name: 'Szolgáltatások' },
        { id: 'templates', name: 'Sablonok' },
        { id: 'process', name: 'Folyamat' },
        { id: 'faq', name: 'GYIK' },
      ],
      cta: 'Ingyenes konzultáció',
      language: 'Nyelv',
      langNames: { hu: 'Magyar', en: 'English' },
      menuOpen: 'Menü megnyitása',
      menuClose: 'Menü bezárása',
      menuTitle: 'Menü',
      contactTitle: 'Elérhetőség',
    },

    // Chapter rail (desktop) — order matches the page
    chapters: [
      { id: 'approach', index: '01', label: 'Szemléletünk' },
      { id: 'results', index: '02', label: 'Eredmények' },
      { id: 'services', index: '03', label: 'Értékajánlat' },
      { id: 'templates', index: '04', label: 'Sablonok' },
      { id: 'process', index: '05', label: 'Folyamatunk' },
      { id: 'faq', index: '06', label: 'GYIK' },
      { id: 'contact', index: '07', label: 'Ajánlatkérés' },
    ],
    chaptersLabel: 'Fejezetek',

    hero: {
      headline: 'A weboldalad legyen a',
      headlineAccent: 'legjobb értékesítőd.',
      subtitle:
        'Konverzióra és keresőoptimalizálásra (SEO) tervezett honlapok kis- és középvállalkozásoknak. 1–4 hét alatt átadva, fix áron.',
      primaryCta: 'Ingyenes konzultáció',
      secondaryCta: 'Sablonok böngészése',
      trustLabel: 'Amit vállalunk',
      trust: ['30 napos garancia', 'Fix áras projektek', '100% magyar csapat'],
    },

    approach: {
      index: '01',
      label: 'Szemléletünk',
      intro: 'Minden együttműködést egy kérdéssel kezdünk:',
      title: 'Mit szeretnél elérni a digitális jelenléteddel?',
      lead: 'Válassz egy célt, és megmutatjuk, mit építünk hozzá. A válasz határozza meg, mit és hogyan készítünk el.',
      weBuild: 'Ezt építjük hozzá',
      example: 'példa',
      goals: [
        {
          key: 'leads',
          label: 'Több megkeresés',
          hint: 'Az oldal ajánlatkérést hoz, nem csak látogatót.',
          title: 'Oldal, ami megkeresést hoz',
          points: [
            'Egyértelmű ajánlatkérő pontok minden szekcióban',
            'Gyors betöltés, hogy senki ne lépjen le várakozás miatt',
            'Bizalomépítő elemek: garancia, folyamat, válaszidő',
          ],
          vignette: {
            title: 'Beérkezett megkeresések',
            badge: '3 új',
            items: [
              { initials: 'KB', name: 'Kovács Bt.', subject: 'Ajánlatkérés: weboldal + SEO', time: 'most' },
              { initials: 'SA', name: 'Szabó Anna', subject: 'Visszahívást kér', time: '4 perce' },
              { initials: 'FS', name: 'Fitt Stúdió', subject: 'Időpont-egyeztetés', time: '12 perce' },
            ],
          },
        },
        {
          key: 'sales',
          label: 'Hatékonyabb értékesítés',
          hint: 'Rövidebb út a döntéstől a vásárlásig.',
          title: 'Értékesítést támogató felület',
          points: [
            'Átlátható termék- és szolgáltatásbemutatás',
            'Egyszerű vásárlási vagy foglalási útvonal',
            'Mérés, hogy lásd, mi működik és mi nem',
          ],
          vignette: {
            title: 'Online rendelések a héten',
            days: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'],
            values: [34, 42, 39, 55, 63, 78, 71],
            caption: 'Rendelés leadva',
          },
        },
        {
          key: 'admin',
          label: 'Kevesebb adminisztráció',
          hint: 'A rutinfeladatokat elvégzi helyetted a rendszer.',
          title: 'Automatizált, időt spóroló rendszer',
          points: [
            'Online időpontfoglalás telefonálgatás helyett',
            'Automatikus visszaigazolások és értesítések',
            'Kevesebb kézi adminisztráció a mindennapokban',
          ],
          vignette: {
            title: 'Foglalási naptár',
            days: ['H', 'K', 'Sze', 'Cs', 'P'],
            toast: 'Visszaigazolás automatikusan elküldve',
          },
        },
      ],
      partner:
        'Nem klasszikus webfejlesztőként gondolkodunk. Digitális partnerként dolgozunk, a stratégiai tervezéstől a megvalósításon át a folyamatos fejlesztésig.',
    },

    metrics: {
      index: '02',
      label: 'Eredmények',
      title: 'Kiszámítható projekt, mérhető eredmény.',
      items: [
        {
          key: 'weeks',
          value: '1–4',
          unit: 'hét',
          label: 'átfutás',
          description: 'az első egyeztetéstől az élesítésig',
          weekLabel: (n) => `${n}. hét`,
          done: 'élesítés',
        },
        {
          key: 'guarantee',
          value: 30,
          unit: 'nap',
          label: 'garancia',
          description: 'minden projektre, az átadás után',
        },
        {
          key: 'conversion',
          value: 3,
          unit: '×',
          label: 'átlagos konverzió-növekedés',
          description: 'átlagos eredmény ügyfeleinknél',
        },
      ],
    },

    services: {
      index: '03',
      label: 'Értékajánlat',
      title: 'Nem csak weboldalt kapsz, hanem működő ügyfélszerző rendszert.',
      lead: 'Minden elem, ami a sikeres online jelenléthez kell, egy csomagban.',
      items: [
        {
          key: 'speed',
          title: 'Gyors kivitelezés',
          description: 'Rövid átfutás, átlátható ütemezés. Hetek alatt élesben, nem hónapok alatt.',
          viz: { weeks: ['1. hét', '2. hét', '3. hét', '4. hét'], done: 'Élesítve' },
        },
        {
          key: 'seo',
          title: 'Technikai SEO',
          description: 'Tiszta kódszerkezet, villámgyors betöltés és helyes metaadatok, hogy a Google is megtaláljon.',
          viz: { metrics: ['LCP', 'INP', 'CLS'], good: 'Jó' },
        },
        {
          key: 'conversion',
          title: 'Konverzió-fókusz',
          description: 'Minden szekció egy célt szolgál: hogy a látogatóból érdeklődő legyen.',
          viz: { button: 'Ajánlatot kérek' },
        },
        {
          key: 'analytics',
          title: 'Beépített mérés',
          description: 'Analitika és eseménykövetés, hogy lásd, honnan érkeznek az ügyfeleid.',
          viz: { label: 'Látogatók', period: 'elmúlt 30 nap' },
        },
        {
          key: 'security',
          title: 'Maximális biztonság',
          description: 'SSL-tanúsítvány, naprakész rendszer és GDPR-kompatibilis űrlapok.',
          viz: { url: 'ceged.hu', secure: 'Biztonságos kapcsolat' },
        },
        {
          key: 'care',
          title: 'Karbantartás',
          description: 'Az átadás után sem maradsz egyedül: 30 nap garancia, utána igény szerinti támogatás.',
          viz: { status: 'Minden rendszer működik', days: '30 nap' },
        },
      ],
    },

    templates: {
      index: '04',
      label: 'Weboldal sablonok',
      title: 'Kezdj az iparágadra szabott sablonnal.',
      lead: 'Kiindulópontok, nem korlátok: bármilyen egyedi funkciót és dizájnt megvalósítunk.',
      preview: 'Élő előnézet',
      openPreview: (title) => `${title} sablon élő előnézetének megnyitása`,
      close: 'Vissza a sablonokhoz',
      loading: 'Előnézet betöltése…',
      sheetTitle: (title) => `${title} – élő előnézet`,
      sheetDescription: 'A sablon interaktív előnézete. Az Escape billentyűvel vagy a gombbal zárhatod be.',
      slideLabel: (n, total) => `${n}. sablon a ${total}-ból`,
      domain: 'auracode.hu',
      list: [
        { id: 'gastro', slug: 'etterem', title: 'Étterem', description: 'Asztalfoglalás-központú oldal étlappal és galériával.', previewRoute: '/preview/gastro', ...templateImages('gastro') },
        { id: 'fitness', slug: 'konditerem', title: 'Konditerem', description: 'Bérletek, órarend és online jelentkezés.', previewRoute: '/preview/fitness', ...templateImages('fitness') },
        { id: 'law', slug: 'ugyvedi-iroda', title: 'Ügyvédi iroda', description: 'Bizalmat építő, letisztult szakmai megjelenés.', previewRoute: '/preview/law', ...templateImages('law') },
        { id: 'barber', slug: 'borbely', title: 'Borbélyszalon', description: 'Időpontfoglalásra optimalizált sablon.', previewRoute: '/preview/barber', ...templateImages('barber') },
        { id: 'wedding', slug: 'eskuvo', title: 'Esküvői dekoráció', description: 'Portfólió- és ajánlatkérés-központú felépítés.', previewRoute: '/preview/wedding', ...templateImages('wedding') },
        { id: 'beauty', slug: 'szepsegszalon', title: 'Szépségszalon', description: 'Prémium megjelenés online foglalással.', previewRoute: '/preview/beauty', ...templateImages('beauty') },
      ],
    },

    process: {
      index: '05',
      label: 'Folyamatunk',
      title: 'Átlátható folyamat, öt lépésben.',
      lead: 'Mindig tudod, hol tartunk, és mi következik.',
      progress: (n, total) => `${n}. lépés / ${total}`,
      steps: [
        { phase: 'Brief', title: 'Brief és igényfelmérés', description: 'Átbeszéljük a céljaidat, a célközönséget és a versenytársakat. Ez lesz a projekt iránytűje.' },
        { phase: 'Tervezés', title: 'Tervezés és wireframe', description: 'Megtervezzük az oldal szerkezetét és vizuális irányát, mielőtt egy sor kód is születne.' },
        { phase: 'Fejlesztés', title: 'Fejlesztés', description: 'Modern technológiával, biztonságosan és gyorsan építjük meg, mobilra optimalizálva.' },
        { phase: 'Élesítés', title: 'Átadás és élesítés', description: 'Beállítjuk a domaint, a mérést és a keresőoptimalizálást, és megmutatjuk, hogyan kezeld az oldalt.' },
        { phase: 'Támogatás', title: 'Támogatás', description: '30 napos garancia, utána igény szerinti karbantartás és továbbfejlesztés.' },
      ],
    },

    faq: {
      index: '06',
      label: 'Gyakori kérdések',
      title: 'Minden, amit tudnod kell az indulás előtt.',
      items: [
        { question: 'Mennyi idő alatt készül el a weboldalam?', answer: 'A projektek általában 1–4 hét alatt készülnek el, a terjedelemtől és a funkcióktól függően.' },
        { question: 'Mennyibe fog kerülni?', answer: 'Fix áras rendszerben dolgozunk: az ajánlatban rögzített ár menet közben nem változik, így nem érhetnek meglepetések.' },
        { question: 'Nekem kell biztosítanom a domaint és a tárhelyet?', answer: 'Nem feltétlenül. Segítünk a domain és a tárhely kiválasztásában és beállításában is.' },
        { question: 'Vállaltok szövegírást is?', answer: 'Igen. Igény esetén segítünk a tartalom elkészítésében és a meglévő szövegek optimalizálásában.' },
        { question: 'Megtalálnak majd a Google-ben?', answer: 'Minden oldalt technikai SEO-alapokkal adunk át: gyors betöltés, helyes metaadatok és mobilbarát felépítés.' },
        { question: 'Elérlek titeket az átadás után is?', answer: 'Igen. 30 napos garanciát vállalunk, utána pedig igény szerinti támogatást és karbantartást biztosítunk.' },
      ],
      missingTitle: 'Nem találod a választ?',
      missingText: 'Írj nekünk, és 24 órán belül válaszolunk.',
      missingCta: 'Kérdezz tőlünk',
    },

    contact: {
      index: '07',
      label: 'Ajánlatkérés',
      title: 'Kérj',
      titleAccent: 'ingyenes konzultációt.',
      lead: 'Írd le röviden, mit szeretnél elérni. Ajánlatkérés kötelezettségek nélkül.',
      info: [
        { key: 'email', label: 'E-mail', value: 'info@auracode.hu', href: 'mailto:info@auracode.hu' },
        { key: 'phone', label: 'Telefon', value: '+36 30 648 9678', href: 'tel:+36306489678' },
        { key: 'location', label: 'Helyszín', value: 'Budapest, Magyarország', href: null },
      ],
      trust: ['Nincs kötelezettség', '24 órán belül válaszolunk', '30 napos garancia'],
      form: {
        title: 'Mesélj a projektedről',
        name: 'Név',
        email: 'E-mail-cím',
        phone: 'Telefonszám (nem kötelező)',
        interestsLabel: 'Miben segíthetünk? (nem kötelező)',
        interests: ['Új weboldal', 'Webshop', 'SEO', 'Karbantartás'],
        message: 'Projekt leírása',
        privacyPrefix: 'Elfogadom az',
        privacyLink: 'adatvédelmi nyilatkozatot',
        privacyMiddle: 'és az',
        termsLink: 'ÁSZF-et',
        privacySuffix: '.',
        submit: 'Konzultációt kérek',
        sending: 'Küldés…',
        errors: {
          name: 'Add meg a neved.',
          email: 'Adj meg egy érvényes e-mail-címet, például nev@ceged.hu.',
          message: 'Írj pár mondatot a projektedről.',
          privacy: 'Az elküldéshez fogadd el az adatvédelmi nyilatkozatot és az ÁSZF-et.',
          network: 'Nem sikerült elküldeni az üzenetet. Próbáld újra, vagy írj közvetlenül:',
        },
        successTitle: 'Megkaptuk az üzeneted.',
        successText: '24 órán belül jelentkezünk a megadott e-mail-címen.',
        again: 'Új üzenet írása',
      },
    },

    footer: {
      description:
        'Prémium weboldalak kis- és középvállalkozásoknak. Digitális partnerként dolgozunk, a stratégiától a megvalósításon át a folyamatos fejlesztésig.',
      tags: ['30 nap garancia', 'Fix árak', 'Magyar csapat'],
      columns: [
        {
          title: 'Navigáció',
          links: [
            { name: 'Szolgáltatások', href: '#services' },
            { name: 'Sablonok', href: '#templates' },
            { name: 'Folyamat', href: '#process' },
            { name: 'GYIK', href: '#faq' },
            { name: 'Kapcsolat', href: '#contact' },
          ],
        },
        {
          title: 'Szolgáltatások',
          links: [
            { name: 'Weboldal készítés', href: '#services' },
            { name: 'Webshop fejlesztés', href: '#services' },
            { name: 'SEO', href: '#services' },
            { name: 'Karbantartás', href: '#services' },
          ],
        },
      ],
      contactTitle: 'Kapcsolat',
      copyright: 'Minden jog fenntartva.',
      privacy: 'Adatvédelem',
      terms: 'ÁSZF',
      backToTop: 'Vissza az oldal tetejére',
    },

    legal: { close: 'Bezárás' },
  },

  en: {
    meta: {
      title: 'AuraCode | Premium websites for SMBs – 1–4 weeks, fixed price',
      description:
        'Conversion- and SEO-optimised websites for small and medium-sized businesses. Delivered in 1–4 weeks at a fixed price, with a 30-day guarantee.',
    },

    navbar: {
      skip: 'Skip to content',
      home: 'AuraCode – back to top',
      primary: 'Main navigation',
      links: [
        { id: 'services', name: 'Services' },
        { id: 'templates', name: 'Templates' },
        { id: 'process', name: 'Process' },
        { id: 'faq', name: 'FAQ' },
      ],
      cta: 'Free consultation',
      language: 'Language',
      langNames: { hu: 'Magyar', en: 'English' },
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      menuTitle: 'Menu',
      contactTitle: 'Contact',
    },

    chapters: [
      { id: 'approach', index: '01', label: 'Our approach' },
      { id: 'results', index: '02', label: 'Results' },
      { id: 'services', index: '03', label: 'What you get' },
      { id: 'templates', index: '04', label: 'Templates' },
      { id: 'process', index: '05', label: 'Our process' },
      { id: 'faq', index: '06', label: 'FAQ' },
      { id: 'contact', index: '07', label: 'Get a quote' },
    ],
    chaptersLabel: 'Chapters',

    hero: {
      headline: 'Make your website your',
      headlineAccent: 'best salesperson.',
      subtitle:
        'Websites built for conversion and search (SEO), for small and medium-sized businesses. Delivered in 1–4 weeks, at a fixed price.',
      primaryCta: 'Free consultation',
      secondaryCta: 'Browse templates',
      trustLabel: 'What we commit to',
      trust: ['30-day guarantee', 'Fixed-price projects', '100% Hungarian team'],
    },

    approach: {
      index: '01',
      label: 'Our approach',
      intro: 'Every project starts with one question:',
      title: 'What do you want your online presence to achieve?',
      lead: 'Pick a goal and we will show you what we build for it. Your answer decides what we build and how.',
      weBuild: 'What we build for it',
      example: 'example',
      goals: [
        {
          key: 'leads',
          label: 'More inquiries',
          hint: 'A site that brings requests, not just visitors.',
          title: 'A site that generates inquiries',
          points: [
            'Clear quote-request points in every section',
            'Fast loading, so nobody leaves while waiting',
            'Trust builders: guarantee, process, response time',
          ],
          vignette: {
            title: 'New inquiries',
            badge: '3 new',
            items: [
              { initials: 'KB', name: 'Kovács Ltd.', subject: 'Quote request: website + SEO', time: 'now' },
              { initials: 'SA', name: 'Anna Szabó', subject: 'Asked for a call back', time: '4 min ago' },
              { initials: 'FS', name: 'Fitt Studio', subject: 'Booking a meeting', time: '12 min ago' },
            ],
          },
        },
        {
          key: 'sales',
          label: 'More efficient sales',
          hint: 'A shorter path from decision to purchase.',
          title: 'A sales-supporting experience',
          points: [
            'Clear presentation of products and services',
            'A simple purchase or booking path',
            'Tracking, so you see what works and what does not',
          ],
          vignette: {
            title: 'Online orders this week',
            days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            values: [34, 42, 39, 55, 63, 78, 71],
            caption: 'Order placed',
          },
        },
        {
          key: 'admin',
          label: 'Less admin work',
          hint: 'The system handles the routine tasks for you.',
          title: 'An automated, time-saving system',
          points: [
            'Online booking instead of phone tag',
            'Automatic confirmations and notifications',
            'Less manual admin in your day-to-day',
          ],
          vignette: {
            title: 'Booking calendar',
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            toast: 'Confirmation sent automatically',
          },
        },
      ],
      partner:
        'We do not think like classic web developers. We work as your digital partner, from strategic planning through delivery to continuous improvement.',
    },

    metrics: {
      index: '02',
      label: 'Results',
      title: 'A predictable project with measurable results.',
      items: [
        {
          key: 'weeks',
          value: '1–4',
          unit: 'weeks',
          label: 'turnaround',
          description: 'from the first call to launch',
          weekLabel: (n) => `Week ${n}`,
          done: 'launch',
        },
        {
          key: 'guarantee',
          value: 30,
          unit: 'days',
          label: 'guarantee',
          description: 'on every project, after delivery',
        },
        {
          key: 'conversion',
          value: 3,
          unit: '×',
          label: 'average conversion growth',
          description: 'average result across our clients',
        },
      ],
    },

    services: {
      index: '03',
      label: 'What you get',
      title: 'Not just a website, but a working client-acquisition system.',
      lead: 'Everything a successful online presence needs, in one package.',
      items: [
        {
          key: 'speed',
          title: 'Fast delivery',
          description: 'Short turnaround and a transparent schedule. Live in weeks, not months.',
          viz: { weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], done: 'Live' },
        },
        {
          key: 'seo',
          title: 'Technical SEO',
          description: 'Clean code, fast loading and correct metadata, so Google can find you too.',
          viz: { metrics: ['LCP', 'INP', 'CLS'], good: 'Good' },
        },
        {
          key: 'conversion',
          title: 'Conversion focus',
          description: 'Every section has one job: turning a visitor into an inquiry.',
          viz: { button: 'Request a quote' },
        },
        {
          key: 'analytics',
          title: 'Built-in analytics',
          description: 'Analytics and event tracking, so you see where your clients come from.',
          viz: { label: 'Visitors', period: 'last 30 days' },
        },
        {
          key: 'security',
          title: 'Maximum security',
          description: 'SSL certificate, an up-to-date stack and GDPR-compliant forms.',
          viz: { url: 'yourcompany.com', secure: 'Secure connection' },
        },
        {
          key: 'care',
          title: 'Maintenance',
          description: 'You are not on your own after launch: a 30-day guarantee, then support as needed.',
          viz: { status: 'All systems operational', days: '30 days' },
        },
      ],
    },

    templates: {
      index: '04',
      label: 'Website templates',
      title: 'Start with a template built for your industry.',
      lead: 'Starting points, not limits: we can build any custom feature and design.',
      preview: 'Live preview',
      openPreview: (title) => `Open the live preview of the ${title} template`,
      close: 'Back to templates',
      loading: 'Loading preview…',
      sheetTitle: (title) => `${title} – live preview`,
      sheetDescription: 'Interactive preview of the template. Press Escape or use the button to close it.',
      slideLabel: (n, total) => `Template ${n} of ${total}`,
      domain: 'auracode.hu',
      list: [
        { id: 'gastro', slug: 'restaurant', title: 'Restaurant', description: 'Built around table reservations, with menu and gallery.', previewRoute: '/preview/gastro', ...templateImages('gastro') },
        { id: 'fitness', slug: 'gym', title: 'Gym', description: 'Memberships, class schedule and online sign-up.', previewRoute: '/preview/fitness', ...templateImages('fitness') },
        { id: 'law', slug: 'law-office', title: 'Law office', description: 'A clean, trust-building professional presence.', previewRoute: '/preview/law', ...templateImages('law') },
        { id: 'barber', slug: 'barber', title: 'Barber shop', description: 'Optimised for appointment booking.', previewRoute: '/preview/barber', ...templateImages('barber') },
        { id: 'wedding', slug: 'wedding', title: 'Wedding decor', description: 'Portfolio first, with an inquiry-focused structure.', previewRoute: '/preview/wedding', ...templateImages('wedding') },
        { id: 'beauty', slug: 'beauty-salon', title: 'Beauty salon', description: 'A premium look with online booking.', previewRoute: '/preview/beauty', ...templateImages('beauty') },
      ],
    },

    process: {
      index: '05',
      label: 'Our process',
      title: 'A transparent process in five steps.',
      lead: 'You always know where we are and what comes next.',
      progress: (n, total) => `Step ${n} of ${total}`,
      steps: [
        { phase: 'Brief', title: 'Brief and discovery', description: 'We discuss your goals, audience and competitors. This becomes the compass for the project.' },
        { phase: 'Design', title: 'Design and wireframe', description: 'We plan the structure and visual direction before a single line of code is written.' },
        { phase: 'Build', title: 'Development', description: 'Built with modern technology, securely and quickly, optimised for mobile.' },
        { phase: 'Launch', title: 'Handover and launch', description: 'We set up the domain, analytics and SEO, then show you how to manage the site.' },
        { phase: 'Support', title: 'Support', description: 'A 30-day guarantee, then maintenance and improvements as you need them.' },
      ],
    },

    faq: {
      index: '06',
      label: 'FAQ',
      title: 'Everything you need to know before we start.',
      items: [
        { question: 'How long will my website take?', answer: 'Projects usually take 1–4 weeks, depending on scope and features.' },
        { question: 'How much will it cost?', answer: 'We work at fixed prices: the price in your quote does not change along the way, so there are no surprises.' },
        { question: 'Do I need to provide the domain and hosting?', answer: 'Not necessarily. We help you choose and set up the domain and hosting too.' },
        { question: 'Do you write the copy as well?', answer: 'Yes. If needed, we help create the content and optimise your existing texts.' },
        { question: 'Will people find me on Google?', answer: 'Every site ships with technical SEO foundations: fast loading, correct metadata and a mobile-friendly build.' },
        { question: 'Can I reach you after launch?', answer: 'Yes. We give a 30-day guarantee, followed by support and maintenance as you need it.' },
      ],
      missingTitle: 'Did not find your answer?',
      missingText: 'Write to us and we will reply within 24 hours.',
      missingCta: 'Ask us',
    },

    contact: {
      index: '07',
      label: 'Get a quote',
      title: 'Book a',
      titleAccent: 'free consultation.',
      lead: 'Tell us briefly what you want to achieve. No obligation.',
      info: [
        { key: 'email', label: 'Email', value: 'info@auracode.hu', href: 'mailto:info@auracode.hu' },
        { key: 'phone', label: 'Phone', value: '+36 30 648 9678', href: 'tel:+36306489678' },
        { key: 'location', label: 'Location', value: 'Budapest, Hungary', href: null },
      ],
      trust: ['No obligation', 'Reply within 24 hours', '30-day guarantee'],
      form: {
        title: 'Tell us about your project',
        name: 'Name',
        email: 'Email address',
        phone: 'Phone (optional)',
        interestsLabel: 'What can we help with? (optional)',
        interests: ['New website', 'Webshop', 'SEO', 'Maintenance'],
        message: 'Project description',
        privacyPrefix: 'I accept the',
        privacyLink: 'Privacy Policy',
        privacyMiddle: 'and the',
        termsLink: 'Terms',
        privacySuffix: '.',
        submit: 'Request a consultation',
        sending: 'Sending…',
        errors: {
          name: 'Enter your name.',
          email: 'Enter a valid email address, for example name@company.com.',
          message: 'Write a few sentences about your project.',
          privacy: 'Accept the Privacy Policy and the Terms to send your message.',
          network: 'Your message could not be sent. Try again, or email us directly:',
        },
        successTitle: 'We have received your message.',
        successText: 'We will reply to the email address you gave within 24 hours.',
        again: 'Write another message',
      },
    },

    footer: {
      description:
        'Premium websites for small and medium-sized businesses. We work as your digital partner, from strategy through delivery to continuous improvement.',
      tags: ['30-day guarantee', 'Fixed pricing', 'Hungarian team'],
      columns: [
        {
          title: 'Navigation',
          links: [
            { name: 'Services', href: '#services' },
            { name: 'Templates', href: '#templates' },
            { name: 'Process', href: '#process' },
            { name: 'FAQ', href: '#faq' },
            { name: 'Contact', href: '#contact' },
          ],
        },
        {
          title: 'Services',
          links: [
            { name: 'Website design', href: '#services' },
            { name: 'Webshop development', href: '#services' },
            { name: 'SEO', href: '#services' },
            { name: 'Maintenance', href: '#services' },
          ],
        },
      ],
      contactTitle: 'Contact',
      copyright: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      backToTop: 'Back to top',
    },

    legal: { close: 'Close' },
  },
};
