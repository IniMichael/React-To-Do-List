/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xxxxs': '1px',  // Extra small screens x4
        'xxxs': '320px',  // Extra small screens x3
        'xxs': '375px',  // Extra small screens x2
        'xs': '425px',  // Extra small screens
        'sm': '640px',  // Small screens
        'md': '768px',  // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra-large screens
        'xxl': '1440px', // Extra-large screens x2
        'xxxl': '2560px', // Extra-large screens x3
        'xxxxl': '2585px', // Extra-large screens x4
        'xxxxxl': '2687px', // Extra-large screens x5
      },
    },
  },
  plugins: [],
}

