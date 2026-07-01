// Bleu Médical — semantic design tokens shared between Tailwind and runtime.
// Single source of truth for palette adjustments.
export const palette = {
  bg: '#F6F8FB',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2F7',
  ink: '#0A2240',
  body: '#2B3645',
  muted: '#6B7A8C',
  brand: '#1357A6',
  brandDark: '#0E4380',
  urgent: '#D33B2C',
  urgentDark: '#B12C20',
  success: '#1F8D5A',
  border: '#E2E8EF',
  borderStrong: '#CCD6E2',
};

// Solid overlay rgbas used over hero/photo backgrounds. Tuned so headline
// text always reaches WCAG AA on top of common photo luminances.
export const overlay = {
  ink70: 'rgba(10, 34, 64, 0.70)',
  ink50: 'rgba(10, 34, 64, 0.55)',
  ink35: 'rgba(10, 34, 64, 0.35)',
  white80: 'rgba(255, 255, 255, 0.85)',
};
