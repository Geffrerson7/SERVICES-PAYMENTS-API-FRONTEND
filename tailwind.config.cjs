/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        sm: '8px',
        md: '19px',
        lg: '24px',
        xl: '48px',
        principal: '64px',
      },
    },
  },
  plugins: [require('tailwindcss-neumorphism')],
}
