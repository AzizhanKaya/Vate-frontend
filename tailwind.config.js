/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        box: 'rgba(94, 207, 255, 0.3) 0px 0px 15px, rgba(94, 207, 255, 0.2) 0px 0px 5px 1px'
      }
    },
  },
  plugins: [],
}

