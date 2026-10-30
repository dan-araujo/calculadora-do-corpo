/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        madeMoiselleRed: '#d72735', red500: '#b91c2a',
        pentagramBlue: '#203fa4', blueVariation: '#556581',
        triadicDarkBlue: '#25394c', bluishGray: '#c0b9b7', pureWhite: '#fff',
      },
      fontFamily: { custom: ['Instrument Sans', 'Arial', 'sans-serif'] },
    },
  },
  plugins: [],
};
