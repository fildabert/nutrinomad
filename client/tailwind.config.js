/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#e4f9ff',
        'bright-green': '#00b900',
        'pastel-green': '#ccffcc',
        'selected-blue': '#bdd5de',
        'protein-red': '#cc3366',
        'fat-yellow': '#ffe07d',
        'carbs-green': '#99cc66',
      },
    },
  },
  plugins: [],
};
