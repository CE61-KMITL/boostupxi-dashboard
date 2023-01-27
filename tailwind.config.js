/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#8D72E1",
        "second-color": "#C0DEFF",
        "third-color": "#F5EDCE",
        "fouth-color": "#58287F",
        "navbar-color": "#1A0000",
      },
    },
  },
  plugins: [require("daisyui")],
};
