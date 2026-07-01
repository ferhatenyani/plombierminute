import type { Config } from 'tailwindcss';

// Bleu Médical palette — light/airy, trust-oriented.
// Single controlled red CTA, no gradients, semantic tokens.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // canvas
        bg: '#F6F8FB',          // page background
        surface: '#FFFFFF',     // cards, header bg
        surfaceMuted: '#EEF2F7',
        // text
        ink: '#0A2240',         // headings, max contrast
        body: '#2B3645',        // body text
        muted: '#5A6875',       // captions, helper text (WCAG AA on white)
        // brand
        brand: {
          50:  '#EAF1FA',
          100: '#D2E1F3',
          200: '#A4C2E6',
          300: '#5E94CC',
          400: '#2F75B8',
          500: '#1357A6',       // primary
          600: '#0E4380',       // hover / dark variant
          700: '#0A3361',
          800: '#072646',
          900: '#051A30',
        },
        urgent: {
          50:  '#FDECEA',
          100: '#FAD2CD',
          200: '#F1A097',
          300: '#E47265',
          400: '#DA5042',
          500: '#D33B2C',       // controlled red
          600: '#B12C20',
          700: '#8B2118',
        },
        success: {
          500: '#1F8D5A',
          600: '#187048',
        },
        border: {
          DEFAULT: '#E2E8EF',
          strong: '#CCD6E2',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Display maps to the same family; weight + tracking carry the voice.
        display: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      maxWidth: {
        prose: '65ch',
        '7xl': '80rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,34,64,0.04), 0 1px 3px rgba(10,34,64,0.06)',
        cardHover: '0 4px 8px rgba(10,34,64,0.06), 0 6px 16px rgba(10,34,64,0.08)',
        sticky: '0 1px 0 rgba(10,34,64,0.06)',
      },
      borderRadius: {
        xl2: '1rem',
      },
      fontSize: {
        // mobile-first scale, all >=16px body
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],   // 13px (captions only)
        sm: ['0.875rem',  { lineHeight: '1.375rem' }],  // 14px
        base: ['1rem',    { lineHeight: '1.625rem' }],  // 16px body
        lg: ['1.125rem',  { lineHeight: '1.75rem' }],   // 18px
        xl: ['1.25rem',   { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl': ['3rem',     { lineHeight: '1.05' }],
        '6xl': ['3.75rem',  { lineHeight: '1.02' }],
      },
    },
  },
  plugins: [],
};

export default config;
