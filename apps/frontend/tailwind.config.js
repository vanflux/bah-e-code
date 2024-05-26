/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      primary: {
        50: "#efe5fd",
        100: "#d4bff9",
        200: "#b794f6",
        300: "#9965f4",
        400: "#7e3ff2",
        500: "#296AB7",
        600: "#5300e8",
        700: "#3d00e0",
        800: "#1c00db",
        900: "#0000d6"
      },
      gray: {
        200: '#EEEEEE',
        300: '#D9D9D9',
        400: '#ACACAC',
        500: '#787878',
        600: '#474747',
      },
      red: {
        500: "#EA0B0B",
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
