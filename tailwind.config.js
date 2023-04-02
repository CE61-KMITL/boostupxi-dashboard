/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '10%': {
            width: '120%',
            transform: 'rotate(10deg)'
          },
          '20%': {
            width: '120%',
            transform: 'rotate(-10deg)'
          },
          '30%': {
            width: '120%',
            transform: 'rotate(10deg)'
          },
          '40%': {
            width: '120%',
            transform: 'rotate(-10deg)'
          }
        }
      },
      colors: {
        'main-color': '#8D72E1',
        'second-color': '#C0DEFF',
        'third-color': '#F5EDCE',
        'fouth-color': '#58287F',
        'navbar-color': '#1A0000',
      },
      backgroundImage: {
        'gradient-radial':
          'backgroung: radial-gradient(ellipse at bottom , main-color 0%, third-color 100%)',
      },
    },
  },
  plugins: [],
};
