/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      kanit: ['Kanit', 'sans-serif', 'auto', 'normal']
    },
    extend: {
      colors: {
        gray_01: 'rgba(37,37,37,0.5)',
        purple_01: '#6C63FF'
      }
    }
  },
  plugins: []
}
