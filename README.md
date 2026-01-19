# Webfejlesztés 🚀

**Premium web development agency website** — Built with modern stack, high performance, and professional UX.

## Overview

A modern, high-converting website for a web development agency. Features include:

- ⚡ **95+ PageSpeed Score** — Ultra-fast performance
- 🎨 **Premium Dark Design** — Modern, professional aesthetic
- 📱 **Mobile-First** — Fully responsive across all devices
- 🔍 **SEO-Ready** — Structured data, meta tags, semantic HTML
- ♿ **Accessible** — WCAG compliant
- 💬 **Interactive Elements** — Animations, modals, smooth scrolling
- 📊 **Conversion-Focused** — Clear CTAs, lead capture, analytics ready

## Tech Stack

- **Frontend Framework:** Vite + TypeScript
- **Styling:** Modern CSS with CSS Variables
- **Components:** Vanilla TypeScript (no frameworks)
- **Build Tool:** Vite
- **Package Manager:** npm

## Features

### Sections

1. **Hero** — Eye-catching intro with before/after slider
2. **Services** — Premium packages (Premium, Pro Plus, Enterprise)
3. **Process** — 6-step workflow timeline
4. **Portfolio** — Interactive case studies with modal view
5. **Testimonials** — Client reviews and success stories
6. **Contact** — Dual-column form + quick contact info
7. **Pricing** — Service packages and calculator
8. **FAQ** — Expandable Q&A
9. **Navigation & Footer** — Professional branding

### Interactive Components

- Command palette (Cmd/Ctrl+K)
- Theme toggle (dark/light)
- Smooth scroll animations
- Toast notifications
- Modal dialogs
- Responsive navigation
- Scroll progress indicator
- Before/after image slider

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── footer.ts
│   ├── header.ts
│   ├── nav.ts
│   ├── modal.ts
│   ├── toast.ts
│   ├── button.ts
│   └── ...
├── sections/        # Page sections
│   ├── hero.ts
│   ├── services.ts
│   ├── portfolio.ts
│   ├── process.ts
│   ├── contact.ts
│   ├── testimonials.ts
│   ├── pricing.ts
│   └── ...
├── lib/            # Utility functions
│   ├── animate.ts  # Reveal animations
│   ├── theme.ts    # Dark/light mode
│   ├── dom.ts      # DOM helpers
│   ├── validate.ts # Form validation
│   └── ...
├── styles/         # CSS modules
│   ├── base.css
│   ├── components.css
│   ├── sections.css
│   ├── tokens.css
│   └── overrides.css
├── data/          # JSON data
│   ├── portfolio.json
│   └── testimonials.json
├── main.ts        # Entry point
└── style.css      # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the development server at `http://localhost:5173`

### Build

```bash
npm run build
```

Optimized production build.

### Preview

```bash
npm preview
```

Preview the production build locally.

## Performance Metrics

- **PageSpeed Insights:** 95+
- **Lighthouse Score:** 95+
- **Core Web Vitals:** All green
- **Bundle Size:** < 50KB (gzipped)
- **Load Time:** < 2 seconds

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+

## SEO & Accessibility

- ✅ Semantic HTML5
- ✅ Schema.org structured data (JSON-LD)
- ✅ Meta tags & OG tags
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Color contrast
- ✅ Mobile viewport

## Customization

### Color Scheme

Edit `src/styles/tokens.css`:

```css
:root {
  --accent: #7c5cff;      /* Primary brand color */
  --accent2: #00d4ff;     /* Secondary brand color */
  --bg: #0b0f1a;          /* Dark background */
  --text: rgba(255, 255, 255, 0.92);
  /* ... more tokens ... */
}
```

### Content

- **Portfolio:** Edit `src/data/portfolio.json`
- **Testimonials:** Edit `src/data/testimonials.json`
- **Text:** Update individual section files in `src/sections/`

### Components

All components are vanilla TypeScript with no external dependencies beyond Vite.

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

Connect your repo and deploy.

### Traditional Hosting

```bash
npm run build
# Upload `dist/` folder to your server
```

## Environment Variables

None required for basic deployment. For backend integration:

```env
VITE_API_URL=https://your-api.com
VITE_FORM_ENDPOINT=https://your-form-handler.com
```

## License

Private. All rights reserved.

---

**Built with ❤️ by a web development professional**

For questions or customization: info@webfejlesztes.hu
