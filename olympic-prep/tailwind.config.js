/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#112550',
          600: '#1a3464',
        },
        gold: {
          400: '#f5c842',
          500: '#e8b800',
          600: '#c9a000',
        },
      },
    },
  },
  plugins: [],
}
