// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Button, Message } from 'element-ui';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

/**
 * element ui
 * http://element-cn.eleme.io/#/zh-CN/component/installation
 */
Vue.use(Button);
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
