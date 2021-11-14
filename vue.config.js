const path = require('path');
const packageJson = require('./package.json');

const apiHelpersPath = resolve(packageJson._moduleAliases['@apiHelpers']);
const { CLIENT_PATH, CLIENT_PORT } = require(apiHelpersPath);
const ASSETS_PATH = 'assets';
const DEV_PATH = 'src';

function resolve(dir) {
  return path.join(__dirname, dir);
}

function resolveSrc(dir) {
  return resolve(path.join(DEV_PATH, dir));
}

function resolveCommon(dir) {
  return resolveSrc(path.join('common', dir));
}

function resolveFront(dir) {
  return resolveSrc(path.join('frontend', dir));
}

function resolveBack(dir) {
  return resolveSrc(path.join('backend', dir));
}

module.exports = {
  publicPath: '/',
  outputDir: CLIENT_PATH,
  devServer: {
    port: CLIENT_PORT,
  },
  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: `${DEV_PATH}/${ASSETS_PATH}/svg`,
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: ASSETS_PATH + '/icons.[hash:8].svg', // or 'assets/icons.svg' if filenameHashing == false
        // publicPath: "/"
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/common/styles/variables.scss"; @import "@/common/styles/mixins.scss";`,
      },
    },
  },
  chainWebpack: config => {
    config.plugins.delete('progress');
    config
      .plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [
        { format: 'minimal' },
      ]);

    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');

    config.resolve.alias.set(
      '@httpSt',
      resolve(packageJson._moduleAliases['@httpSt']),
    );
    config.resolve.alias.set(
      '@apiHelpers',
      resolve(packageJson._moduleAliases['@apiHelpers']),
    );

    config.resolve.alias.set('@assets', resolveSrc(ASSETS_PATH));
    config.resolve.alias.set('@common', resolveSrc('common'));
    config.resolve.alias.set('@frontend', resolveSrc('frontend'));
    config.resolve.alias.set('@backend', resolveSrc('backend'));

    config.resolve.alias.set('@styles', resolveCommon('styles'));
    config.resolve.alias.set('@components', resolveCommon('components'));

    config.resolve.alias.set('@backStyles', resolveBack('styles'));
    config.resolve.alias.set(
      '@backStylesCmp',
      resolveBack(path.join('styles', 'cmp')),
    );
    config.resolve.alias.set(
      '@backStylesPgs',
      resolveBack(path.join('styles', 'pages')),
    );
    config.resolve.alias.set('@backCmp', resolveBack('components'));
    config.resolve.alias.set('@backViews', resolveBack('views'));

    config.resolve.alias.set('@frontStyles', resolveFront('styles'));
    config.resolve.alias.set(
      '@frontStylesCmp',
      resolveFront(path.join('styles', 'cmp')),
    );
    config.resolve.alias.set(
      '@frontStylesPgs',
      resolveFront(path.join('styles', 'pages')),
    );
    config.resolve.alias.set('@frontCmp', resolveFront('components'));
    config.resolve.alias.set('@frontViews', resolveFront('views'));
  },
  pages: {
    index: {
      entry: DEV_PATH + '/frontend/main.js',
      template: 'public/index.html',
      filename: 'index.html', // когда используется опция title, то <title> в шаблоне
      // должен быть <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
    },
    admin: {
      entry: DEV_PATH + '/backend/admin.js',
      template: 'public/index.html',
      filename: 'admin.html',
      // когда используется опция title, то <title> в шаблоне
      // должен быть <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Admin Page',
    },
  },
};
