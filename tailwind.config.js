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
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
