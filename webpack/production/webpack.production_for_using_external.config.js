var webpack = require('webpack');
var config = require('./../webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const specificConfig = require('./../specificConfig');

// better to open source map
if (specificConfig.useSourceMapInProd) {
  config.devtool = 'source-map';
}

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),

  new ExtractTextPlugin('assets/styles/[name].css?[hash]-[chunkhash]-[contenthash]-[name]', {
    allChunks: true
  })
]);

config.module.loaders = config.module.loaders.concat(
  {
    test: /\.png|gif/, loader: 'url-loader?limit=1000&name=assets/images/[sha512:hash:base64:7].[ext]'
  },
  {
    test: /\.jpg/, loader: 'file-loader?name=assets/images/[sha512:hash:base64:7].[ext]'
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', specificConfig.useCssModules ?
        'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]--[local]!postcss-loader!sass-loader' :
        'css-loader?sourceMap!postcss-loader!sass-loader',
      {
        publicPath: '../../'
      }
    )
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      specificConfig.useCssModules ?
        'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]--[local]!postcss-loader!sass-loader' :
        'css-loader?sourceMap!postcss-loader!sass-loader',
      'postcss-loader',
      {
        publicPath: '../../'
      }
    )
  }
);

config.exteranl = [
  {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
]

delete config.output.publicPath;

module.exports = config;
