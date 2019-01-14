import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "./views/Home";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@frontViews/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@frontViews/About.vue")
    },
    {
      path: "/works",
      name: "works",
      component: () => import("@frontViews/Works.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@frontViews/Blog.vue")
    }
  ]
});
