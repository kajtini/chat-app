/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#FAFAFA",
        // secondary: "#FFFFFF",
        // accent: "#703EFE",
        // gray: "#9E9E9E",
        // "gray-light": "#C6C4CE",
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
