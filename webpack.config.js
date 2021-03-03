const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'ui-colors-and-type': '@ui-kit/colors-and-type/colors-and-type.js',
    'ui-cards': '@ui-kit/cards/cards.js',
    'ui-headers-and-footers': '@ui-kit/headers-and-footers/headers-and-footers.js',
    'ui-form-elements': '@ui-kit/form-elements/form-elements.js',

    'landing-page': '@web-pages/landing-page/landing-page.js',
    'search-room': '@web-pages/search-room/search-room.js',
    'room-details': '@web-pages/room-details/room-details.js',
    'login-and-registration': '@web-pages/login-and-registration/login-and-registration.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    alias: {
      '@ui-kit': path.resolve(__dirname, 'src/pages/ui-kit'),
      '@web-pages': path.resolve(__dirname, 'src/pages/website-pages'),
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
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

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/ui-kit/colors-and-type/colors-and-type.pug',
      filename: 'colors-and-type.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/ui-kit/cards/cards.pug',
      filename: 'cards.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/ui-kit/headers-and-footers/headers-and-footers.pug',
      filename: 'headers-and-footers.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/ui-kit/form-elements/form-elements.pug',
      filename: 'form-elements.html',
    }),

    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/website-pages/landing-page/landing-page.pug',
      filename: 'landing-page.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/website-pages/search-room/search-room.pug',
      filename: 'search-room.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/website-pages/room-details/room-details.pug',
      filename: 'room-details.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/website-pages/login-and-registration/login-and-registration.pug',
      filename: 'login-and-registration.html',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
  },

  optimization: {
    minimize: false,
  },
};
