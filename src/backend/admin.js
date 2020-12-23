import Vue from 'vue';
import VueRx from 'vue-rx';
import { axiosConfig } from '@common/helpers';
import { IS_DEV } from '@apiHelpers';
import store from '@common/store';
import Admin from './Admin.vue';
import router from '@/router';

Vue.use(VueRx);
Vue.config.productionTip = !IS_DEV;
axiosConfig();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Admin),
});
