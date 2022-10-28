const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ["lifecycle/index", "cancellation/index","cold_hot_observables/index", "introduction/index", "creation_functions/of/index","creation_functions/from/index"];

module.exports = {
  devtool: 'eval-source-map',
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.ts`;
    return config;
  }, {}),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  plugins:[].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    hot: false
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'public')
  }
};
