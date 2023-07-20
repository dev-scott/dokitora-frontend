/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./screens/*.{js,jsx,ts,tsx}",
    "./screens/OnboardingScreen/OnboardingScreen1.js",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/UI/MainButton.{js,jsx,ts,tsx}",
    "./components/UI/MainInput.{js,jsx,ts,tsx}",
    "./navigations/AppStack.{js,jsx,ts,tsx}",
    "./screens/Root/HomeScreen.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#4B33E5",
      purple: "#7e5bef",
      black: "#000",
      white:"#FFF",
      pink: "#ff49db",
      indigo50:"#F0EEFD",
      indigo500:"#A599F2",
      indigo600:"#4B33E5 ",
      indigo1:"rgba(75, 51, 229, 0.26)",
      zin900:"#191919",
      zin800:"#494949",
      zin500:"#828282",
      neutral600:"#555655",
      pink600:"#FF006B",
      green600:"#1FB141 ",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      slate950:"#01001F",
      white600:"rgba(2, 0, 94, 0.1)",
      indigo950:"#02005E",
      white20:"rgba(2, 0, 94, 0.44)",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

