const colors = require('tailwindcss/colors')

module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      custom: {
        'light-blue': {
          DEFAULT: '#BFEEFF',
          900: 'rgba(191,238,255, .9)'

        },
        'background': {
          DEFAULT: 'rgb(0,35,47)',
          900: 'rgba(0,35,47, .9)',
          850: 'rgba(0,35,47, .85)'
        }
      }
    },
    extend: {
      // height: {
      //   'control-panel': '210px'
      // },
      spacing: {
        'control-panel-height': '210px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
