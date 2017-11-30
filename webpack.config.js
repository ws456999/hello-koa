const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development'
// console.log(isDev)
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    resolve: {
      extensions: ['.js', '*', '.json'],
    },
    entry: './bin/www.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "server.bundle.js",
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        }
      ]
    },
    // externals: nodeModules,
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
}
