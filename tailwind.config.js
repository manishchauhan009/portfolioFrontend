module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-colour': '#2d2d2d',  // Black or Charcoal Gray
        'main-colour': '#ffffff', // White
        'accent-colour': '#d3d3d3', // Light Gray
      },
      screens: {
        'min410': '410px', // Custom breakpoint
      }
    },
  },
  plugins: [],
};
