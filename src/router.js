import Vue from "vue";
import VueRouter from "vue-router";
import store from "@common/store";

Vue.use(VueRouter);

function setDbPage(dbPage) {
  store.dispatch("setPage", dbPage);
}

// function pageConfig(config, dbPage = "") {
function pageConfig(dbPage) {
  // if (dbPage) {
  setDbPage(dbPage);
  // }

  // store.dispatch("frontView/setTitle", config);
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
      // props: () => {
      //   pageConfig("Главная");
      // },
      meta: { title: "Главная" },
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
            // pageConfig("Мои работы", "work");
            pageConfig("work");
          },
          meta: { title: "Мои работы" },
          component: () => import("@frontViews/Works.vue")
        },
        {
          path: "about",
          name: "about",
          props: () => {
            // pageConfig("Обо мне", "skill");
            pageConfig("skill");
          },
          meta: { title: "Обо мне" },
          component: () => import("@frontViews/About.vue")
        },
        {
          path: "blog",
          name: "blog",
          props: () => {
            // pageConfig("Блог", "post");
            pageConfig("post");
          },
          meta: { title: "Блог" },
          component: () => import("@frontViews/Blog.vue")
        }
      ]
    },
    {
      path: "/admin",
      meta: { authStatus: false },
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
