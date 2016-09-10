var config = require('./config');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './src/main.js',
  output: {
    path: './',
    filename: 'build.js'
  },
  devServer: {
    inline: true,
    progress: true,
    historyApiFallback: true,
    hot: true,
    lazy: false,
    host: '0.0.0.0',
    port: 3333,
    quiet: false,
    noInfo: false,
    stats: {colors: true}
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(config.globals)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        query: {
          modules: true,
          importLoaders: true,
          localIdentName: '[name]__[local]'
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
