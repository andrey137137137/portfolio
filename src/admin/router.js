import Vue from "vue";
import VueRouter from "vue-router";

import About from "./views/About";
import Blog from "./views/Blog";
import Page from "./views/Page";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "about",
      component: About
    },
    {
      path: "blog",
      component: Blog
    },
    {
      path: "page/:pageId",
      component: Page,
      props: true
    }
  ]
});
