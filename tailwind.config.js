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
            primary: "#0C1014",
            darker: "#0A0A0C",
            lighter: "#1C2024"
        },
        ...colors
    },
    extend: {},
  },
  plugins: [],
}

