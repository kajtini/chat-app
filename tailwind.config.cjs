/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#181920",
        secondary: "#28313E",
        accent: "#BE60FD",
        active: "#246BFD",
        gray: "#8d8ca3",
        "gray-light": "#FBF5FB",
      },

      fontFamily: {
        primary: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
