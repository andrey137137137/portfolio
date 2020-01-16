import Vue from "vue";
import VueRouter from "vue-router";
import store from "@common/store";

Vue.use(VueRouter);

function setDbPage(dbPage) {
  store.dispatch("setPage", dbPage);
}

function pageConfig(config, dbPage = "") {
  if (dbPage) {
    setDbPage(dbPage);
    // store.dispatch("readData");
  }

  store.dispatch("frontView/setConfig", config);
  return {};
}

export default new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@frontend"),
      children: [
        {
          path: "/",
          name: "home",
          props: () => {
            pageConfig({ name: "Главная" });
          },
          component: () => import("@frontViews/Home.vue")
        },
        {
          path: "/works",
          name: "works",
          props: () => {
            pageConfig(
              {
                name: "Мои работы",
                isTopWrapTitle: true,
                isContent: true,
                sections: 3
              },
              "slide"
            );
          },
          component: () => import("@frontViews/Works.vue")
        },
        {
          path: "/about",
          name: "about",
          props: () => {
            pageConfig(
              {
                name: "Обо мне",
                isContent: true,
                sections: 4
              },
              "skill"
            );
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "@frontViews/About.vue")
        },
        {
          path: "/blog",
          name: "blog",
          props: () => {
            pageConfig(
              {
                name: "Блог",
                isBlog: true,
                isContent: true,
                sections: 2
              },
              "post"
            );
          },
          component: () => import("@frontViews/Blog.vue")
        }
      ]
    },
    {
      path: "/admin",
      component: () => import("@backend"),
      children: [
        {
          path: "about",
          props: () => {
            setDbPage("skill");
          },
          component: () => import("@backViews/About.vue")
        },
        {
          path: "blog",
          props: () => {
            setDbPage("post");
          },
          component: () => import("@backViews/Blog.vue")
        },
        {
          path: "user",
          props: () => {
            setDbPage("");
          },
          component: () => import("@backViews/User.vue")
        },
        {
          path: "works",
          props: () => {
            setDbPage("slide");
          },
          component: () => import("@backViews/Works.vue")
        }
      ]
    }
  ]
});
