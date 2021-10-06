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
  ADMIN_COMMENTS,
  ADMIN_PARALLAX,
  ADMIN_PROFILE,
  ADMIN_AUTHCONFIG,
} from '@common/constants/router';

Vue.use(VueRouter);

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
          meta: { title: 'Мои работы', page: 'work', isFront: true },
          component: () => import('@frontViews/Works.vue'),
        },
        {
          path: ABOUT,
          name: ABOUT,
          meta: { title: 'Обо мне', page: 'skill', isFront: true },
          component: () => import('@frontViews/About.vue'),
        },
        {
          path: BLOG,
          name: BLOG,
          meta: { title: 'Блог', page: 'post', isFront: true },
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
          meta: { title: 'Обо мне', page: 'skill' },
          component: () => import('@backViews/About.vue'),
        },
        {
          path: ADMIN_BLOG,
          meta: { title: 'Блог', page: 'post' },
          component: () => import('@backViews/Blog.vue'),
        },
        {
          path: ADMIN_WORKS,
          meta: { title: 'Мои работы', page: 'work' },
          component: () => import('@backViews/Works.vue'),
        },
        {
          path: ADMIN_COMMENTS,
          meta: { title: 'Отзывы', page: 'comment' },
          component: () => import('@backViews/Comments.vue'),
        },
        {
          path: ADMIN_PARALLAX,
          meta: { title: 'Параллакс' },
          component: () => import('@backViews/Parallax.vue'),
        },
        {
          path: ADMIN_PROFILE,
          meta: {
            title: 'Личные данные',
            page: 'user/profile',
          },
          component: () => import('@backViews/Profile.vue'),
        },
        {
          path: ADMIN_AUTHCONFIG,
          meta: {
            title: 'Имя пользователя и email',
            page: 'user/config',
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
    next();
  }
});

export default router;
