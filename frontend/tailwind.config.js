/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			// AuraCode "Óceán és korall" brand tokens (defined in src/index.css :root)
  			primary: {
  				DEFAULT: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
  				dark: 'rgb(var(--color-primary-dark-rgb) / <alpha-value>)',
  				foreground: 'rgb(var(--color-text-on-dark-rgb) / <alpha-value>)'
  			},
  			secondary: {
  				DEFAULT: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
  				soft: 'rgb(var(--color-secondary-soft-rgb) / <alpha-value>)',
  				foreground: 'rgb(var(--color-text-on-dark-rgb) / <alpha-value>)'
  			},
  			accent: {
  				DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
  				hover: 'var(--color-accent-hover)',
  				foreground: 'rgb(var(--color-primary-rgb) / <alpha-value>)'
  			},
  			bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
  			'on-dark': 'rgb(var(--color-text-on-dark-rgb) / <alpha-value>)',
  			'muted-on-dark': 'rgb(var(--color-muted-on-dark-rgb) / <alpha-value>)',
  			// Section-theme roles (.theme-dark / .theme-light set these)
  			canvas: 'rgb(var(--bg-base-rgb) / <alpha-value>)',
  			surface: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
  			panel: 'rgb(var(--bg-card-rgb) / <alpha-value>)',
  			fg: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
  			'fg-2': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
  			'fg-3': 'rgb(var(--text-muted-rgb) / <alpha-value>)',
  			tone: 'rgb(var(--tone-rgb) / <alpha-value>)',
  			line: 'rgb(var(--line-rgb) / <alpha-value>)',
  			link: 'var(--link)',
  			'link-hover': 'var(--link-hover)',
  			hot: 'rgb(var(--hot-rgb) / <alpha-value>)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};