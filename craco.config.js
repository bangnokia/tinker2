module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}