module.exports = {
    loader: 'postcss-loader',
    plugins: [
      require('cssnano')({
        preset: 'default',
      }),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-normalize')
    ]
}