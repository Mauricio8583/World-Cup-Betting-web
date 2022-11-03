/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      }
    },
    colors: {
      gray: {
        100: "#E1E1E6",
        300: "#8D8D99",
        600: "#323238",
        800: "#202024",
        900: "#121214",
      },
      violet:{
        500: "lightblue",
      },
      white:{
        700: "white"
      },
      ignite: {
        500: "#129E57"
      },
      yellow: {
        500: "#F7DD43",
        700: "#E5CD3D"
      }
    },
  },
  plugins: [],
}
