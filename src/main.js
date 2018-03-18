// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Message, Checkbox } from 'element-ui';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

/**
 * element ui
*/
Vue.use(Checkbox);
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
