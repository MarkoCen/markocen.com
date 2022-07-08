const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/aspect-ratio')],
  theme: {
    fontFamily: {
      ...fontFamily,
      sans: '"Quicksand", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
    },
    maxHeight: {
      '90vh': '90vh',
    },
    extend: {
      transitionTimingFunction: {
        pop: 'cubic-bezier(0, 0.8, 0.13, 1)',
      },
    },
  },
};
