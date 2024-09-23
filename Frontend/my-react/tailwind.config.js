/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        colorShift: 'colorShift 3s infinite',
      },
      keyframes: {
        colorShift: {
          '0%, 100%': { color: '#00FFFF' }, // Starting and ending color
          '50%': { color: '#00D1FF' },      // Midpoint color
        },
      },
    },
  },
  plugins: [],
}
