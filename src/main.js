import './scss/index.scss';
import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
