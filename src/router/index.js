import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../view/user-login';
import Dashborad from '../view/dashboard';
import { state } from '../store/index';
import Setting from '../view/setting';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashborad',
      component: Dashborad,
      meta: {
        notRequireAuth: true
      }
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin,
      meta: {
        notRequireAuth: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    }
  ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  const token = state.token;
  // 判断要去的路由是否不需要验证
  if (to.meta.notRequireAuth) {
    // 如果无需token,直接跳转
    next();
  } else if (token) {
    next();
  } else {
    next({
      path: '/login',
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      query: { redirect: to.fullPath }
    });
  }
});

export default router;
