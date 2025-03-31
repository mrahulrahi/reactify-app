/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "rally-black": "#000000",
        "rally-white": "#ffffff",       
        "rally-bg-color":"#121418",
        "rally-blue": "#1E90FF",
        "rally-green": "#27A356",
        "rally-orange": "#FFD700",
        "modal-bg-color":"#1E2024",
        "rally-yellow":"#FFB200"
      },
      fontFamily: {
        lexend200: ["Lexend_200ExtraLight"],
        lexend300: ["Lexend_300Light"],
        lexend400: ["Lexend_400Regular"],
        lexend500: ["Lexend_500Medium"],    
        lexend600: ["Lexend_600SemiBold"],  
        
        Roboto400: ["Roboto_400Regular"],
        Roboto500: ["Roboto_500Medium"],
        Roboto600: ["Roboto_600SemiBold"],
        Roboto700: ["Roboto_700Bold"],
        Roboto800: ["Roboto_800ExtraBold"],
      },
      backgroundImage: {
        'orange-gradient-bg': 'linear-gradient(120deg, rgba(255,215,0,1) 0%, rgba(255,119,0,1) 100%);',
        // 'pink-gradient-bg': 'linear-gradient(140deg, rgba(255,26,97,1) 0%, rgba(153,16,58,1) 100%);'
      },
    },
  },
  plugins: [],
};