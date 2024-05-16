/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1E1E2D",
        "dark-lighter": "#2C2C38",
        eucalyptus: {
          50: "#eefff5",
          100: "#d8ffeb",
          200: "#b4fed7",
          300: "#79fcb9",
          400: "#38f092",
          500: "#0ed973",
          600: "#05b45b",
          700: "#088d4b",
          800: "#0c6f3f",
          900: "#0c5b35",
          950: "#003d21",
        },
      },
    },
  },
  plugins: [],
};
