import Vue from "vue";
import VueRouter from "vue-router";
import store from "@common/store";
import axios from "axios";

Vue.use(VueRouter);

function setDbPage(dbPage) {
  store.dispatch("setPage", dbPage);
}

function pageConfig(dbPage) {
  setDbPage(dbPage);
  store.dispatch("profile/set");
  return {};
}

function setSuccessAuth(status) {
  if (store.state.authStatus) return true;

  if (store.dispatch("setAuthStatus", status)) return true;

  return store.state.authStatus;
}

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      props: () => {
        store.dispatch("profile/set");
      },
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
            pageConfig("work");
          },
          meta: { title: "Мои работы" },
          component: () => import("@frontViews/Works.vue")
        },
        {
          path: "about",
          name: "about",
          props: () => {
            pageConfig("skill");
          },
          meta: { title: "Обо мне" },
          component: () => import("@frontViews/About.vue")
        },
        {
          path: "blog",
          name: "blog",
          props: () => {
            pageConfig("post");
          },
          meta: { title: "Блог" },
          component: () => import("@frontViews/Blog.vue")
        }
      ]
    },
    {
      path: "/admin",
      component: () => import("@backend"),
      beforeEnter(to, from, next) {
        const redirectPage = "/";
        axios
          .get("user/auth")
          .then(res => {
            if (res.data.success) {
              if (setSuccessAuth(res.data.success)) {
                next();
              } else {
                next(redirectPage);
              }
            } else {
              next(redirectPage);
            }
          })
          .catch(() => {
            next(redirectPage);
          });
      },
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
