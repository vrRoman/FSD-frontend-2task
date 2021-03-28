const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const createSassRule = ({ isScss = false, isImportedFile = false } = {}) => {
  const importedFileRegExp = /src\/styles\/_colors\.sass$/;
  let test = /\.sass$/i;
  let importVarsString = '@import "@/styles/colors"';
  if (isScss) {
    test = /\.scss$/i;
    importVarsString += ';';
  }

  let sassLoader = {
    loader: 'sass-loader',
    options: {
      additionalData: importVarsString,
    },
  };

  if (isImportedFile) {
    test = importedFileRegExp;
    sassLoader = 'sass-loader';
  }

  return {
    test,
    exclude: isImportedFile ? undefined : importedFileRegExp,
    use: [
      'style-loader',
      'css-loader',
      'resolve-url-loader',
      sassLoader,
    ],
  };
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
      createSassRule({ isImportedFile: true }),
      createSassRule(),
      createSassRule({ isScss: true }),
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
    port: 9000,
    hot: true,
    index: 'landing-page.html',
  },
};
