import Vue from "vue";
import VueRouter from "vue-router";

import AdminCmp from "@backCmp/AdminCmp";
import About from "@backViews/About";
import Blog from "@backViews/Blog";
import Page from "@backViews/Page";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "admin",
      component: AdminCmp,
      children: [
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
    }
  ]
});
