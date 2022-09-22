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
        'light-blue': '#BFEEFF',
        'background': '#00232F',
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
