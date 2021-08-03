const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { readdirSync, statSync } = require('fs');

const getHtmlWebpackPluginInstances = () => {
  const pagesDirectory = path.resolve(__dirname, 'src/pages');
  const pugFilePaths = [];

  const pushPugFilePaths = (directory) => {
    readdirSync(directory).forEach((fileName) => {
      const filePath = path.join(directory, fileName);
      if (statSync(filePath).isDirectory()) {
        pushPugFilePaths(filePath);
      } else if (path.extname(fileName) === '.pug') {
        pugFilePaths.push(filePath);
      }
    });
  };

  pushPugFilePaths(pagesDirectory);

  return pugFilePaths.map((filePath) => new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: filePath,
    filename: `${path.basename(filePath, path.extname(filePath))}.html`,
  }));
};

module.exports = {
  entry: {
    bundle: '@/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              hmr: true,
              reloadAll: true,
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /favicons/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /favicons\//,
        loader: 'file-loader',
        options: {
          name: 'favicons/[name].[ext]',
        },
      },
      {
        test: /browserconfig\.xml$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /site\.webmanifest$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    ...getHtmlWebpackPluginInstances(),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true,
  },
};
