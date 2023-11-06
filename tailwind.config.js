/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing': "url('src/assets/background/section1_landing.svg')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}