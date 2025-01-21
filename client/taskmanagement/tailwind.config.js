const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo, // Replace with your brand color
        secondary: colors.teal,
        accent: colors.amber,
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Modern font
      },
    },
  },
};
