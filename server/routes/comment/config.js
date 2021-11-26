const { IS_DEV } = require('@apiHelpers');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const DIST_FOLDER = 'mailTemplate';

const plugins = IS_DEV
  ? [new VueLoaderPlugin(), new FriendlyErrorsPlugin()]
  : [
      new VueLoaderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css',
      }),
    ];
plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    'process.env.VUE_ENV': '"server"',
  }),
);
plugins.push(new VueSSRServerPlugin());

module.exports = {
  // Укажите точку входа серверной части вашего приложения
  entry: './mailTemplate.js',

  // Это позволяет Webpack обрабатывать динамические импорты в Node-стиле,
  // а также сообщает `vue-loader` генерировать серверно-ориентированный код
  // при компиляции компонентов Vue.
  target: 'node',

  // Для поддержки source map в bundle renderer
  devtool: '#source-map',

  // Это сообщает что в серверной сборке следует использовать экспорты в стиле Node
  output: {
    path: path.resolve(__dirname, '../' + DIST_FOLDER),
    publicPath: '/' + DIST_FOLDER + '/',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Внешние зависимости приложения. Это значительно ускоряет процесс
  // сборки серверной части и уменьшает размер итогового файла сборки.
  externals: nodeExternals({
    // не выделяйте зависимости, которые должны обрабатываться Webpack.
    // здесь вы можете добавить больше типов файлов, например сырые *.vue файлы
    // нужно также указывать белый список зависимостей изменяющих `global` (например, полифилы)
    whitelist: /\.css$/,
  }),

  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.styl(us)?$/,
        use: IS_DEV
          ? ['vue-style-loader', 'css-loader', 'stylus-loader']
          : ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true },
                },
                'stylus-loader',
              ],
              fallback: 'vue-style-loader',
            }),
      },
    ],
  },
  performance: {
    hints: false,
  },

  // Этот плагин преобразует весь результат серверной сборки
  // в один JSON-файл. Имя по умолчанию будет
  // `vue-ssr-server-bundle.json`
  plugins,
};
