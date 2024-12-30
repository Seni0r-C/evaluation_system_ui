/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Apunta a tus archivos de React
  ],
  theme: {
    extend: {
      colors: {
        primary: '[#f8cf12]',
      }
    },
  },
  plugins: [],
}

