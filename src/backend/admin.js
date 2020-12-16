import Vue from 'vue';
import VueRx from 'vue-rx';
import { axiosConfig } from '@common/helpers';
import { isDev } from '@apiHelpers';
import store from '@common/store';
import Admin from './Admin.vue';
import router from '@/router';

Vue.use(VueRx);
Vue.config.productionTip = !isDev();
axiosConfig();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Admin),
});
