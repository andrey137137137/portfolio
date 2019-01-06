module.exports = {
  pages: {
    index: "src/index/main.js",
    admin: "src/admin/admin.js"
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: "/index.html" },
        { from: /\/admin/, to: "/admin.html" }
      ]
    }
  },
  css: {
    modules: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss"; @import "@/styles/mixins.scss";`
      }
    }
  }
};
