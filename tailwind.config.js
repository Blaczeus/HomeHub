/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./App.js",
    "./assets/styles/**/*.css",
    "./node_modules/nativewind/dist/**/*.js",
  ],
  presets: [ require( "nativewind/preset" ) ], 
  theme: {
    extend: {
      colors: {
        skyblue: "#3F85D7",
        sagegreen: "#A0C4B0",
        greymain: "#2E2E38",
      },
    },
  },
  plugins: [],
}

