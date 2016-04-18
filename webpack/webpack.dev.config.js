var config = require('./webpack.base.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const specificConfig = require('./specificConfig');


config.entry = {
  index: ['webpack/hot/dev-server', path.resolve(__dirname, '../src/index.js')]
};

config.devtool = 'eval-source-map';
config.debug = true;

config.module.loaders = config.module.loaders.concat(
  {
    test: /\.png|gif/, loader: 'url-loader'
  },
  {
    test: /\.jpg/, loader: 'url-loader'
  },
  {
    test: /\.css$/,
    loader: !specificConfig.useCssModules ?
      'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]--[local]!postcss-loader' :
      'style-loader!css-loader!postcss-loader'
  },
  {
    test: /\.scss$/,
    loader: specificConfig.useCssModules ?
      'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]--[local]!postcss-loader!sass-loader' :
      'style-loader!css-loader!postcss-loader!sass-loader'
  }
);

config.module.preLoaders = [
  {
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  }
];

config.plugins = config.plugins.concat(
  new HtmlWebpackPlugin({
    title: 'Zhihao\'s app',
    template: 'indexTemplate.html',
    filename: 'index.html',
    inject: true,
  })
);

module.exports = config;
