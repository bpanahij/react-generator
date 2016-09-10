var config = require('./config');
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'build-[hash].js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(config.globals),
    function () {
      this.plugin("done", function (statsData) {
        var stats = statsData.toJson();
        if (!stats.errors.length) {
          var htmlFileName = "index.html";
          var html = fs.readFileSync(path.join(__dirname, htmlFileName), "utf8");
          var htmlOutput = html.replace(
            /<script src="build\.js/i,
            "<script src=\"./" + stats.assetsByChunkName.main[0]);
          fs.writeFileSync(path.join(__dirname, "dist", htmlFileName), htmlOutput);
        }
      });
    }
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
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
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
