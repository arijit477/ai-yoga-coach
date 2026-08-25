/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        wellness: {
          50: '#f4f7f6',
          100: '#e4ebe9',
          200: '#cbdad6',
          300: '#a7c1ba',
          400: '#7fa299',
          500: '#60867d',
          600: '#4a6a63',
          700: '#3f5651',
          800: '#344743',
          900: '#2e3c39',
        }
      }
    },
  },
  plugins: [],
}
