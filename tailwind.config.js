/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c1: {
          50: "#f6f6f9",
          100: "#eeedf1",
          200: "#d8d7e0",
          300: "#b4b3c6",
          400: "#8c8aa6",
          500: "#6e6c8b",
          600: "#595673",
          700: "#49475d",
          800: "#3e3d4f",
          900: "#373644",
          950: "#1c1b22",
        },
      },
    },
  },
};
