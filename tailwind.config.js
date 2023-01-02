/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
