/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9e8',
          100: '#dcefca',
          200: '#bfe0a2',
          300: '#9fd078',
          400: '#7dc04f',
          500: '#5ca831',
          600: '#448926',
          700: '#366b22',
          800: '#2e5a1f',
          900: '#274a1c',
          950: '#122a0d',
        },
        accent: {
          50: '#fff8e8',
          100: '#ffedc4',
          200: '#ffe08c',
          300: '#ffcb49',
          400: '#ffb620',
          500: '#f99706',
          600: '#dd7802',
          700: '#b75805',
          800: '#94450c',
          900: '#79390e',
          950: '#461c04',
        },
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};