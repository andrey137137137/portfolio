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
  }

  // store.dispatch("frontView/setConfig", config);
  store.dispatch("frontView/setTitle", config);
  store.dispatch("frontView/setProfile");

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
        // pageConfig({ title: "Главная" });
        pageConfig("Главная");
      },
      component: () => import("@frontend")
    },
    {
      path: "/",
      component: () => import("@frontViews"),
      children: [
        {
          path: "works",
          name: "works",
          props: () => {
            pageConfig(
              // {
              //   title:
              "Мои работы",
              //   isTopWrapTitle: true,
              //   isContent: true,
              //   sections: 3
              // },
              "work"
            );
          },
          component: () => import("@frontViews/Works.vue")
        },
        {
          path: "about",
          name: "about",
          props: () => {
            pageConfig(
              // {
              //   title:
              "Обо мне",
              //   isContent: true,
              //   sections: 4
              // },
              "skill"
            );
          },
          component: () => import("@frontViews/About.vue")
        },
        {
          path: "blog",
          name: "blog",
          props: () => {
            pageConfig(
              // {
              //   title:
              "Блог",
              //   isBlog: true,
              //   isContent: true,
              //   sections: 2
              // },
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
