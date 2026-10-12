/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f141c',
          darker: '#0a0d13',
          card: '#161d27',
          border: '#263344',
          gold: '#c59b27',
          goldLight: '#e2ba49',
          goldDark: '#997312',
          silver: '#cbd5e1',
          silverLight: '#f1f5f9',
          accent: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
