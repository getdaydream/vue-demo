import axios from 'axios';
import { state } from '../store/index';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const http = axios.create({
  baseURL: 'http://192.168.0.104:3000',
  transformRequest: [
    (data) => {
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
      console.dir(data);
      const params = new URLSearchParams();
      Object.keys(data).forEach((k) => {
        params.append(k, data[k]);
      });
      return params;
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
  (config) => {
    if (state.token) {
      Object.assign(config, {
        headers: {
          Authorization: `token ${state.token}`
        }
      });
    }
    return config;
  }
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
