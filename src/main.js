import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '../node_modules/noty/lib/noty.css';
import '../node_modules/noty/lib/themes/bootstrap-v4.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
