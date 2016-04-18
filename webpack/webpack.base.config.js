var path = require('path');

var config = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  externals: [],
  eslint: {
    configFile: '.eslintrc'
  },
  resolve: {
    alias: {'commonStyle': path.resolve(__dirname, '../src/common/style')}
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel?cacheDirectory']
      }
    ]
  },
  plugins: [],
  sassLoader: {
    includePaths: [path.resolve(__dirname, '../src/common/style')]
  },
  postcss: function () {
    return [require('autoprefixer'), require('precss')];
  }
};


module.exports = config;
