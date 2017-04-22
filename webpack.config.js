var webpack = require('webpack');

module.exports = {
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
