/** @type {import('tailwindcss').Config} */

// AuraCode tokens live as CSS variables in src/index.css (":root").
// Colors are stored as "R G B" triplets so Tailwind's opacity modifiers work (bg-volt/10).
// Only new keys are added here: the template previews in src/components/previews
// rely on Tailwind's default scale, so defaults must stay untouched.
const rgb = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: rgb('ink'), raised: rgb('ink-raised') },
        surface: { DEFAULT: rgb('surface'), hi: rgb('surface-hi') },
        line: { DEFAULT: rgb('line'), strong: rgb('line-strong') },
        hi: rgb('text-hi'),
        mid: rgb('text-mid'),
        lo: rgb('text-lo'),
        faint: rgb('text-faint'),
        volt: rgb('volt'),
        ion: rgb('ion'),
        danger: rgb('danger'),

        // shadcn/ui primitives in src/components/ui still read these
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        aura: ['"Mona Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        code: ['"Martian Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        fine: ['0.8125rem', { lineHeight: '1.45' }], // 13px
        lead: ['1.3125rem', { lineHeight: '1.5' }], // 21px
      },
      borderRadius: {
        ctl: 'var(--r-ctl)',
        tile: 'var(--r-tile)',
        card: 'var(--r-card)',
        panel: 'var(--r-panel)',
        pill: 'var(--r-pill)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      maxWidth: {
        shell: '77.5rem', // 1240px content width
        measure: '36rem',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 220ms cubic-bezier(0.23, 1, 0.32, 1)',
        'accordion-up': 'accordion-up 180ms cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
