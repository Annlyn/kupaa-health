/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dad7cd',
        secondary: '#a3b18a',
        tertiary: '#588157',
        quaternary: '#3a5a40',
        quinary: '#344e41',
      },
    },
  },
  plugins: [],
}
