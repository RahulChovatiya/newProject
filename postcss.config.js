module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 0,
    },
    // cssnano: {}
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
