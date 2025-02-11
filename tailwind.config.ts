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
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "10.188rem",
        // "3xl": "10rem",
      },

      // default breakpoints
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
        "tw-primary": "#138B96",
      },
      boxShadow: {
        varShadow1: "0px 0px 3px 0px rgba(166, 175, 195, 0.50)",
      },
    },
  },
  plugins: [],
};
