const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Slate is driven by CSS variables so the whole UI flips between dark and light themes.
        slate: {
          50: v('slate-50'),
          100: v('slate-100'),
          200: v('slate-200'),
          300: v('slate-300'),
          400: v('slate-400'),
          500: v('slate-500'),
          600: v('slate-600'),
          700: v('slate-700'),
          800: v('slate-800'),
          900: v('slate-900'),
          950: v('slate-950'),
        },
        canvas: v('canvas'),
        device: '#0B1120',
        primary: { DEFAULT: '#6366F1', hover: '#4F46E5', soft: v('primary-soft') },
        success: { DEFAULT: '#10B981', soft: v('success-soft') },
        warn: v('warn'),
        danger: v('danger'),
      },
    },
  },
};
