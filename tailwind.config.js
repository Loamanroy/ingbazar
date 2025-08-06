/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA',
        foreground: '#212529',
        card: '#ffffff',
        border: '#E9ECEF',
        muted: '#6C757D',
        
        'accent-red': '#E53935',
        'accent-red-hover': '#C62828',
        'accent-green': '#2E7D32',
        'accent-green-hover': '#1B5E20',
        
        'islamic-bg': '#E8F5E9',
        'islamic-light': '#F1F8E9',
        'islamic-dark': '#1B2E1B',
        
        'dark-background': '#121212',
        'dark-foreground': '#E0E0E0',
        'dark-card': '#1E1E1E',
        'dark-border': '#333333',
        'dark-muted': '#9E9E9E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'button': '0 10px 15px -3px rgba(229, 57, 53, 0.3)',
        'button-green': '0 10px 15px -3px rgba(46, 125, 50, 0.3)',
      },
      borderRadius: {
        'card': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'islamic-gradient': 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
        'islamic-gradient-dark': 'linear-gradient(135deg, #1B2E1B 0%, #2A3B2A 100%)',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
