/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.js',
    './src/app/**/*.js',
  ],
  theme: {
    colors: {
      madeMoiselleRed: '#ee0b13',
      red500: 'rgb(239 68 68)',
      pentagramBlue: '#203fa4',
      blueVariation: '#828db3',
      triadicDarkBlue: '#384956',
      bluishGray: '#c0b9b7',
      pureWhite: '#FFF'
    },
    fontFamily: {
      'custom': ['Instrument Sans', 'sans-serif'],
    },
    variants: {
      extend: {
        fontFamily: ['hover', 'focus'],
      },
      extend: {
        typography: (theme) => ({
          DEFAULT: {
            css: {
            }
          }
        })
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
    ],
  }
}

