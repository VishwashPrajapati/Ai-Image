/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        mainBG: "url('./assets/aboutBG02.jpg')",
      },
    },
  },
  plugins: [],
};
