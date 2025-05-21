/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colorMode: false,
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "10.188rem",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1240px",
        "2xl": "1496px",
      },
    },
    extend: {
      spacing: {
        section: "70px",
      },
      colors: {
        blue: {
          DEFAULT: "#138B96",
          50: "#E6F7F8",
          100: "#C2EBEC",
          200: "#8FDADC",
          300: "#5BC9CC",
          400: "#29B9BD",
          500: "#138B96",
          600: "#107B86",
          700: "#0C6B76",
          800: "#085B66",
          900: "#044B56",
          950: "#044B56",
        },

        light: {
          50: "#FFFFFF",
          100: "#FDFDFD",
          200: "#FAFAFA",
          300: "#F5F5F5",
          400: "#F0F0F0",
          500: "#EBEBEB",
          600: "#E6E6E6",
          700: "#E0E0E0",
          800: "#DADADA",
          900: "#D4D4D4",
          950: "#CFCFCF",
        },
        dark: "#111928",

      },
      boxShadow: {
        varShadow1: "0px 0px 3px 0px rgba(166, 175, 195, 0.50)",
      },
      fontFamily: {
        janna: ["Janna LT", "sans-serif"],
      },
    },
  },
  plugins: [],
};
