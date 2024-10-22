const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({ filename: './assets/css/app.css' });

const config = (env) => {
  const prod = env ? env.production : false;

  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      app: ['whatwg-fetch', './index.js'],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './assets/js/[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                      browsers: ['> 0.5%', 'not dead'],
                    },
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
        {
          test: /\.s?css$/,
          use: extractPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './assets/media/',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({ template: 'index.html' }),
      extractPlugin,
    ],

    devServer: {
      contentBase: path.resolve(__dirname, './dist/assets/media'),
      compress: true,
      port: 2000,
      stats: 'errors-only',
      open: true,
    },

    devtool: !prod && 'inline-source-map',
  };
};

module.exports = config;
