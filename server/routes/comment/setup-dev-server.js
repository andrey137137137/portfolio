const path = require('path');
const { waterfall } = require('async');
const MFS = require('memory-fs');
const webpack = require('webpack');
const config = require('./config');

module.exports = function setupDevServer(context, highCB) {
  const mfs = new MFS();
  waterfall(
    [
      cb => {
        // watch and update server renderer
        const serverCompiler = webpack(config);
        serverCompiler.outputFileSystem = mfs;
        serverCompiler.watch({}, cb);
      },
      (stats, cb) => {
        try {
          stats = stats.toJson();
        } catch (e) {
          cb(e, null);
        }

        if (stats.errors.length) {
          cb(stats.errors, null);
        }

        // read bundle generated by vue-ssr-webpack-plugin
        try {
          const file = mfs.readFileSync(
            path.join(config.output.path, 'vue-ssr-server-bundle.json'),
            'utf-8',
          );
          const bundle = JSON.parse(file);
          cb(null, bundle);
        } catch (e) {
          cb(e, null);
        }
      },
      (bundle, cb) => {
        if (bundle) {
          cb(null, {
            context,
            bundle,
            options: {},
          });
        }
      },
    ],
    (err, info) => {
      return highCB(err, info);
    },
  );
};
