import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import AdminCmp from "@/components/AdminCmp";
import AboutCmp from "@/components/AdminCmp/AboutCmp";
import BlogCmp from "@/components/AdminCmp/BlogCmp";
import PageCmp from "@/components/AdminCmp/PageCmp.vue";

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
      component: AdminCmp,
      children: [
        {
          path: "about",
          component: AboutCmp
        },
        {
          path: "blog",
          component: BlogCmp
        },
        {
          path: "page/:pageId",
          component: PageCmp,
          props: true
        }
      ]
    }
  ]
});
