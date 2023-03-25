/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideBottom: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '90%': {
            transform: 'translateY(5px)'
          }
        },
        wiggle: {
          '25%': {
            transform: 'scale(1.1) rotate(0.05turn)'
          },
          '50%': {
            transform: 'scale(1.0) rotate(0turn)'
          },
          '75%': {
            transform: 'scale(1.1) rotate(-0.05turn)'
          }
        }
      },
      animation: {
        slideBottom: 'slideBottom 300ms ease-in-out forwards',
        wiggle: 'wiggle 300ms ease-in-out forwards'
      }
    }
  },
  plugins: []
};
