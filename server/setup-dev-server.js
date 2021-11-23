const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const serverConfig = require('./webpack.server.config');

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(serverConfig.output.path, file), 'utf-8');
  } catch (e) {}
};

module.exports = function setupDevServer(cb) {
  let bundle;

  let ready;
  const readyPromise = new Promise(r => {
    ready = r;
  });

  const update = () => {
    if (bundle) {
      ready();
      cb(bundle, {});
    }
  };

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();

    if (stats.errors.length) {
      return;
    }

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
    update();
  });

  return readyPromise;
};
