import Vue from 'vue';
import VueRx from 'vue-rx';
import { IS_DEV } from '@apiHelpers';
import { axiosConfig } from '@common/helpers';
import store from '@common/store';
import App from './App.vue';
import router from '@/router';

Vue.use(VueRx);
Vue.config.productionTip = !IS_DEV;
axiosConfig();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
