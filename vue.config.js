// const path = require("path");

module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule("scss")
  //     .use("sass-resources-loader")
  //     .loader("sass-resources-loader")
  //     .options({
  //       resources: [
  //         path.resolve("./src/styles/variables.scss"),
  //         path.resolve("./src/styles/mixins.scss")
  //       ]
  //     });
  // },
  css: {
    loaderOptions: {
      // передача настроек в sass-loader
      sass: {
        // @/ это псевдоним к каталогу src/ поэтому предполагается,
        // что у вас в проекте есть файл `src/variables.scss`
        data: `@import "@/styles/variables.scss";@import "@/styles/mixins.scss";`
      }
    }
  }
};
