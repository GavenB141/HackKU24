import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
        "coinblue": {
            primary: "#11a9BC",
            secondary: "#33BBC7",
            tertiary: "#84D6D7"
        },
        "coingrey": {
            primary: "rgb(12, 16, 20)",
            darker: "rgb(10, 10, 12)",
            lighter: "rgb(28, 32, 36)"
        },
        ...colors
    },
    extend: {},
  },
  plugins: [],
}

