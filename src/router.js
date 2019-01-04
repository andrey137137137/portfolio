import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import Admin from "@/views/Admin";
import About from "@/views/Admin/About";
import Blog from "@/views/Admin/Blog";
import Page from "@/views/Admin/Page";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    {
      path: "/admin",
      component: Admin,
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
