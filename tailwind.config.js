/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["OpenSans", "sans-serif"],
      mono: ["Source Code Pro", "monospace"],
    },
    extend: {
      animation: {
        pulseOnce: "pulseOnce 0.15s ease-in-out",
        pulseQuick: "pulse 0.75s ease-in-out infinite",
      },
      keyframes: {
        pulseOnce: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
    plugins: [],
  },
};
