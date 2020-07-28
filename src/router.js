import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@common/store';
import {
  ROOT,
  HOME,
  WORKS,
  ABOUT,
  BLOG,
  ADMIN,
  ADMIN_ABOUT,
  ADMIN_BLOG,
  ADMIN_WORKS,
  ADMIN_PROFILE,
  ADMIN_AUTHCONFIG,
} from '@common/constants/router.js';

Vue.use(VueRouter);

function setDbPage(dbPage) {
  store.dispatch('setPage', dbPage);
}

function pageConfig(dbPage) {
  setDbPage(dbPage);
  store.dispatch('profile/set');
  return {};
}

function redirect(cb) {
  if (store.state.authStatus) {
    cb();
  } else {
    cb(ROOT);
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: HOME.path,
      name: HOME.name,
      props: () => {
        store.dispatch('profile/set');
      },
      meta: { title: 'Главная', isFront: true },
      component: () => import('@frontend'),
    },
    {
      path: ROOT,
      component: () => import('@frontViews'),
      children: [
        {
          path: WORKS,
          name: WORKS,
          props: () => {
            pageConfig('work');
          },
          meta: { title: 'Мои работы', isFront: true },
          component: () => import('@frontViews/Works.vue'),
        },
        {
          path: ABOUT,
          name: ABOUT,
          props: () => {
            pageConfig('skill');
          },
          meta: { title: 'Обо мне', isFront: true },
          component: () => import('@frontViews/About.vue'),
        },
        {
          path: BLOG,
          name: BLOG,
          props: () => {
            pageConfig('post');
          },
          meta: { title: 'Блог', isFront: true },
          component: () => import('@frontViews/Blog.vue'),
        },
      ],
    },
    {
      path: ADMIN,
      component: () => import('@backend'),
      children: [
        {
          path: ADMIN_ABOUT,
          props: () => {
            setDbPage('skill');
          },
          component: () => import('@backViews/About.vue'),
        },
        {
          path: ADMIN_BLOG,
          props: () => {
            setDbPage('post');
          },
          component: () => import('@backViews/Blog.vue'),
        },
        {
          path: ADMIN_WORKS,
          props: () => {
            setDbPage('work');
          },
          component: () => import('@backViews/Works.vue'),
        },
        {
          path: ADMIN_PROFILE,
          props: () => {
            setDbPage('user/profile');
          },
          component: () => import('@backViews/Profile.vue'),
        },
        {
          path: ADMIN_AUTHCONFIG,
          props: () => {
            setDbPage('user/config');
          },
          component: () => import('@backViews/AuthConfig.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith(ADMIN)) {
    store
      .dispatch('getAuthStatus')
      .then(() => {
        redirect(next);
      })
      .catch(() => {
        redirect(next);
      });
  } else {
    if (store.frontFormError.state.inputName) {
      store
        .dispatch('frontFormError/clearFormError')
        .then(() => {
          next();
        })
        .catch(() => {
          next();
        });
    }
  }
});

export default router;
