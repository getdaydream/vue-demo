import axios from 'axios';

const http = axios.create({
  baseURL: `http://${process.env.HOST}:3000`,
  transformRequest: [
    (data) => {
      // Do whatever you want to transform the data
      console.dir(data);
      return data;
    }
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    (data) => {
      // Do whatever you want to transform the data
      const res = JSON.parse(data);
      return res;
    }
  ],
  timeout: 5000
});

// before request hook
http.interceptors.request.use(
  config =>
    // if (store.token) {
    //   config.headers.Authorization = `token ${store.token}`;
    // }
    config
  ,
  err => Promise.reject(err)
);
// receive response hook
http.interceptors.response.use(
  response => response,
  (error) => {
    // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 可能是token失效，清除它
          // store.token = '';
          // router.replace({
          //   // 跳转到登录页面
          //   path: 'login',
          //   query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          // });
          break;
        default:
      }
    }
    return Promise.reject(error.response);
  }
);

export default http;
