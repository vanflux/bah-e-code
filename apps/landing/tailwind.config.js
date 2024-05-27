/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000'
    },
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}
