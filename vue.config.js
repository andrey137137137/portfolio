const package = require("./package.json");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

function resolveSrc(dir) {
  return resolve(path.join("src", dir));
}

function resolveCommon(dir) {
  return resolveSrc(path.join("common", dir));
}

function resolveFront(dir) {
  return resolveSrc(path.join("frontend", dir));
}

function resolveBack(dir) {
  return resolveSrc(path.join("backend", dir));
}

module.exports = {
  // pages: {
  //   index: "src/frontend/main.js",
  //   admin: "src/backend/admin.js"
  // },
  // devServer: {
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /^\/index/, to: "/index.html" },
  //       { from: /^\/admin\//, to: "/admin.html" }
  //     ]
  //   },
  // },
  css: {
    // modules: true,
    loaderOptions: {
      sass: {
        data: `@import "@/common/styles/variables.scss"; @import "@/common/styles/mixins.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete("progress");
    config
      .plugin("simple-progress-webpack-plugin")
      .use(require.resolve("simple-progress-webpack-plugin"), [
        {
          format: "minimal",
        },
      ]);
    config.resolve.alias.set(
      "@config",
      resolve(package._moduleAliases["@config"])
    );
    config.resolve.alias.set("@common", resolveSrc("common"));
    config.resolve.alias.set("@frontend", resolveSrc("frontend"));
    config.resolve.alias.set("@backend", resolveSrc("backend"));

    config.resolve.alias.set("@styles", resolveCommon("styles"));
    config.resolve.alias.set("@components", resolveCommon("components"));

    config.resolve.alias.set("@backStyles", resolveBack("styles"));
    config.resolve.alias.set(
      "@backStylesCmp",
      resolveBack(path.join("styles", "cmp"))
    );
    config.resolve.alias.set(
      "@backStylesPgs",
      resolveBack(path.join("styles", "pages"))
    );
    config.resolve.alias.set("@backCmp", resolveBack("components"));
    config.resolve.alias.set("@backViews", resolveBack("views"));

    config.resolve.alias.set("@frontStyles", resolveFront("styles"));
    config.resolve.alias.set(
      "@frontStylesCmp",
      resolveFront(path.join("styles", "cmp"))
    );
    config.resolve.alias.set(
      "@frontStylesPgs",
      resolveFront(path.join("styles", "pages"))
    );
    config.resolve.alias.set("@frontCmp", resolveFront("components"));
    config.resolve.alias.set("@frontViews", resolveFront("views"));
  },
};
