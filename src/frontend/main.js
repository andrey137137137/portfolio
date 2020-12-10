import Vue from 'vue';
import VueRx from 'vue-rx';
import axiosConfig from '@common/helpers/axiosConfig';
import isDev from '@common/helpers/isDev';
import store from '@common/store';
import App from './App.vue';
import router from '@/router';

Vue.use(VueRx);
axiosConfig();
Vue.config.productionTip = !isDev();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
