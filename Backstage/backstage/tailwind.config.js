/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bs-black": "#000000",
        "bs-white": "#ffffff",
        "bs-dark-gray": "#979797",
        "bs-light-gray": "#B3B3B3",
        "bs-gray": "#747474",
        "bs-silver-sand": "#C4C4C4",
        "bs-bg-color":"#0E0F11",
        "border-color":"#23292B",
        "blue":'#219FFF',
        "bs-gray-bg": "#0F0F0F",
      },
      fontFamily: {
        poppins400: ["Poppins_400Regular"],
        poppins600: ["Poppins_600SemiBold"],
        inter400: ["Inter_400Regular"],
        inter500: ["Inter_500Medium"],
        inter600: ["Inter_600SemiBold"],
        inter700: ["Inter_700Bold"],
        polaris: ["Polaris"],
      },
      aspectRatio: {
        square: '1 / 1',
        '9/16': '9 / 16',
        '16/9': '16 / 9',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '21/9': '21 / 9',
        '9/21': '9 / 21',
      },
    },
  },
  plugins: [],
}