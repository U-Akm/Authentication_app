/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/.{login.js,signup.js}", // Scan all JavaScript (including JSX) files in src and its subfolders
    "./public/index.html"  // Include the main HTML file in public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
