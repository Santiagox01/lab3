/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F3EFE6',
          300: '#E8E1D3',
        },
        coral: {
          400: '#FF7A59',
          500: '#FF5C35',
          600: '#E04A26',
        },
        navy: {
          800: '#141E28',
          900: '#0B131B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 14px 40px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
