/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // support class-based dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae2fd',
          300: '#7cc8fc',
          400: '#38abfa',
          500: '#0e91eb',
          600: '#0273ca',
          700: '#035ca4',
          800: '#074f88',
          900: '#0c4270',
          950: '#082a4d',
        },
        dark: {
          bg: '#0B0F19',
          card: '#151B2C',
          border: '#1E293B',
          text: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
