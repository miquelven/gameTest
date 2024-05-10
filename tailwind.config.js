/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        "green-highligh": "#2bb478",
        "white-light-shadow": "#a9a9a9",
        "white-light": "#bababa",
        "white-xlight": "#ccc",
        "black-light": "#0c0c0c",
        "black-xlight": "#0a0a0a",
        "black-bold": "#040404",
        "black-half": "#0005",
        "gray-light": "#777",
      },
    },
  },
  plugins: [],
};
