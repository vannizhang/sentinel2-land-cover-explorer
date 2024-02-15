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
          90: 'rgba(191,238,255, .9)',
          80: 'rgba(191,238,255, .8)',
          50: 'rgba(191,238,255, .5)',
          0: 'rgba(191,238,255, .0)'
        },
        'background': {
          DEFAULT: 'rgb(0,35,47)',
          95: 'rgba(0,35,47, .95)',
          90: 'rgba(0,35,47, .9)',
          85: 'rgba(0,35,47, .85)',
          70: 'rgba(0,35,47, .7)',
        }
      }
    },
    extend: {
      // height: {
      //   'control-panel': '210px'
      // },
      spacing: {
        'bottom-panel-height': '236px',
        'app-header-size': '40px',
        'app-header-position': '15px',
        'layer-toggle-top-position': '15px',
        'layer-toggle-top-position-mobile': '55px',
        'search-widget-top-position': '50px',
        'search-widget-top-position-mobile': '90px',
        'cloud-slider-height': '80px',
        'space-between-main-secondary-selectors': 'var(--space-between-main-secondary-selectors)',
        'analysis-tool-container-width': '255px',
        'search-widget-width': '270px',
        'map-action-button-size': '32px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
