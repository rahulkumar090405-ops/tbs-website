/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF4FC',
          100: '#F4E5F8',
          200: '#E9CEF2',
          300: '#D8AEE6',
          400: '#BE7FD5',
          500: '#9C4DBB',
          600: '#8134A0',
          700: '#6E2489', // Main official purple
          800: '#5A1C70',
          900: '#48165A',
          950: '#2E0A3C',
        },
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F3ECE0',
          300: '#E5DACB',
        },
        gold: {
          400: '#E5C453',
          500: '#D4AF37',
          600: '#B89223',
        },
        charcoal: {
          900: '#1C1521',
          800: '#2C2234',
          700: '#44384E',
          600: '#62566D',
          500: '#84798F',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(110, 36, 137, 0.08)',
        'luxury-hover': '0 20px 50px -12px rgba(110, 36, 137, 0.16)',
        'card': '0 4px 24px 0 rgba(44, 34, 52, 0.04)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(216, 174, 230, 0.15) 0%, rgba(253, 251, 247, 0) 70%)',
      }
    },
  },
  plugins: [],
}
