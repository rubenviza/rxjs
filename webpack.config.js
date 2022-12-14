const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 let pages = ["lifecycle", "cancellation","cold_hot_observables", "introduction", "creation_functions/of","creation_functions/from","creation_functions/fromEvent","creation_functions/timer","creation_functions/interval","creation_functions/forkJoin","creation_functions/combineLatest","pipeable_operators/filter","pipeable_operators/map","pipeable_operators/tap","pipeable_operators/debounceTime","pipeable_operators/catchError","flattening_operators","subject","behaviorsubject"];

pages = pages.map(item => `${item}/index`);

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
