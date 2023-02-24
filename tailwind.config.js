/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#5398DD",
          200: "#3B8AD9",
          300: "#1976D2",
        },
      },
    },
  },
  plugins: [],
};
