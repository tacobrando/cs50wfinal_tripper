/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./tripper/frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dark-grey': '#2F3336'
      }
    },
  },
  plugins: [],
}
