/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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

          // 50: "#ebfef5",
          // 100: "#d0fbe4",
          // 200: "#a4f6ce",
          // 300: "#6aebb5",
          // 400: "#2fd896",
          // 500: "#0abf7f",
          // 600: "#009463",
          // 700: "#007c56",
          // 800: "#036245",
          // 900: "#04503a",
          // 950: "#012d22",
        },
      },
    },
  },
  plugins: [],
};
