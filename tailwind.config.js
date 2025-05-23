module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.jsx',
    './resources/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        marine: '#1e3a8a',
        'marine-dark': '#1e40af',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};