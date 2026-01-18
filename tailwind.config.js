module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': {
          50: '#fdfcfb',
          100: '#f9f6f0',
          200: '#f0e9d2',
          300: '#e8dcc0',
          400: '#d4c298',
          500: '#c0a870',
          600: '#a88e58',
          700: '#8f7546',
          800: '#765e3d',
          900: '#5e4a33',
        },
        'brown': {
          50: '#f7f5f2',
          100: '#ede7df',
          200: '#d4c3b0',
          300: '#bb9f81',
          400: '#9b7a52',
          500: '#7b5a3b',
          600: '#63472f',
          700: '#4f3826',
          800: '#3f2d20',
          900: '#33251a',
        },
        'clay-orange': '#d2691e',
        'saffron': '#ff9933',
        'leaf-green': '#228b22',
        // RECLIX UX Colors
        'reclix-blue': '#3B82F6',
        'reclix-coral': '#FF7B54',
        'reclix-gradient': {
          'start': '#3B82F6',
          'end': '#FF7B54',
        },
        'reclix-soft': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-soft': 'bounce-soft 1s infinite',
        'fade-in': 'fade-in 0.5s ease-in',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'glow': {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
