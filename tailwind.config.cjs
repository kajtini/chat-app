/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        secondary: "#FFFFFF",
        accent: "#703EFE",
        gray: "#9E9E9E",
        "gray-light": "#C6C4CE",
      },

      fontFamily: {
        primary: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
