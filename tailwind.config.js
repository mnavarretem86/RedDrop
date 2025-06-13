/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        drip: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(40px)', opacity: 0 },
        },
      },
      animation: {
        drip: 'drip 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
