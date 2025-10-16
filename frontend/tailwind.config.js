/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#84994F',
        'brand-yellow': '#FFE797',
        'brand-orange': '#FCB53B',
        'brand-red': '#B45253',
      }
    },
  },
  plugins: [],
}

