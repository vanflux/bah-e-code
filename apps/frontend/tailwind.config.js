/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      primary: {
        50: "#E7F3FE",
        100: "#D3EAFD",
        200: "#A8D5FA",
        300: "#78BEF8",
        400: "#4CA9F5",
        500: "#2196F3",
        600: "#0B77D0",
        700: "#296AB7",
        800: "#063D6A",
        900: "#031F35",
        950: "#010E18"
      },
      gray: {
        200: '#EEEEEE',
        300: '#D9D9D9',
        400: '#ACACAC',
        500: '#737373',
        600: '#474747',
      },
      red: {
        500: "#F16767",
      },
      white: '#ffffff',
      black: '#000000',
      overlay: "#00000040"
    },
    boxShadow: {
      system: '0px 1px 2px 1px #00000040',
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    extend: {},
  },
  plugins: [],
}
