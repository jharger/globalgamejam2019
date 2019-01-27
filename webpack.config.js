const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = path.resolve(__dirname, './src');

module.exports = (env, argv) => {
  const PRODUCTION = argv && argv.mode !== 'development';

  const plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ];
  return {
    target: 'web',
    entry: {
      neverEnoughTime: path.resolve(srcFolder, 'index.tsx'),
    },
    output: {
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          use: [
            {
              loader: 'tslint-loader',
              options: {
                emitErrors: PRODUCTION,
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
      ],
    },
    devServer: {},
    devtool: PRODUCTION ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    plugins,
  };
};
