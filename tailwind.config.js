/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cursive: ['Great Vibes', 'cursive'],
      },
      colors: {
        soft: { white: '#F9F8F6', beige: '#EDE9E3' },
        warm: { gray: '#D8D4CE', dark: '#4A4845' },
        olive: { gray: '#8E927F', dark: '#5C614E' },
      }
    },
  },
  plugins: [],
}