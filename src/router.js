import Vue from "vue";
import VueRouter from "vue-router";

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
    },
    {
      path: "/admin",
      component: () => import("@backend"),
      children: [
        {
          path: "about",
          component: () => import("@backViews/About.vue")
        },
        {
          path: "blog",
          component: () => import("@backViews/Blog.vue")
        },
        {
          path: "page/:pageId",
          component: () => import("@backViews/Page.vue"),
          props: true
        }
      ]
    }
  ]
});
