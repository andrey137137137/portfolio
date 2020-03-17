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
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      props: () => {
        pageConfig({ name: "Главная" });
      },
      component: () => import("@frontend")
    },
    {
      path: "/",
      // props: () => {
      //   setDbPage("user");
      // },
      component: () => import("@frontViews"),
      children: [
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
              "work"
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
          component: () => import("@frontViews/About.vue")
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
          path: "works",
          props: () => {
            setDbPage("work");
          },
          component: () => import("@backViews/Works.vue")
        },
        {
          path: "profile",
          props: () => {
            setDbPage("user/profile");
          },
          component: () => import("@backViews/Profile.vue")
        },
        {
          path: "authConfig",
          props: () => {
            setDbPage("user/config");
          },
          component: () => import("@backViews/AuthConfig.vue")
        }
      ]
    }
  ]
});
