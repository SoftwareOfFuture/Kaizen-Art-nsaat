/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#405045', // Khaki Green
          light: '#5a6e60',
          dark: '#2d3830',
          contrast: '#c5d1c9', // High contrast sage green for dark backgrounds
        },
        secondary: {
          DEFAULT: '#232831', // Anthracite
          light: '#353c48',
          dark: '#12151a',
        },
        kaizen: {
          green: '#405045',
          dark: '#232831',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(64, 80, 69, 0.2), 0 0 10px rgba(64, 80, 69, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(64, 80, 69, 0.4), 0 0 30px rgba(64, 80, 69, 0.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
        'primary-glow': '0 0 20px rgba(64, 80, 69, 0.3)',
        'secondary-glow': '0 0 20px rgba(35, 40, 49, 0.3)',
      },
    },
  },
  plugins: [],
}
