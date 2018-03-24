import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../view/user-login';
import Dashborad from '../view/dashboard';
import Movie from '../view/movie';
import Book from '../view/book';
import Bug from '../view/bug';
import Drafts from '../view/drafts';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashborad',
      component: Dashborad,
      redirect: '/bug',
      meta: {
        notRequireAuth: true
      },
      children: [{
        path: '/bug',
        name: 'bug',
        component: Bug
      }, {
        path: '/movie',
        name: 'movie',
        component: Movie
      }, {
        path: '/book',
        name: 'book',
        component: Book
      }, {
        path: '/drafts',
        name: 'drafts',
        component: Drafts
      }]
    },
    {
      path: '/login',
      name: 'user-login',
      component: UserLogin,
      meta: {
        notRequireAuth: true
      }
    }
  ]
});

// 注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   // 获取store里面的token
//   const token = state.token;
//   // 判断要去的路由是否不需要验证
//   if (to.meta.notRequireAuth) {
//     // 如果无需token,直接跳转
//     next();
//   } else if (token) {
//     next();
//   } else {
//     next({
//       path: '/login',
//       // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       query: { redirect: to.fullPath }
//     });
//   }
// });

export default router;
