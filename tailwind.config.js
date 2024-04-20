/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["OpenSans", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "custom-bg": "url(../src/assets/backgrounds/cloudy_sky.jpg)",
      },
    },
  },
  plugins: [],
};
