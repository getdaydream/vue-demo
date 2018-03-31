import axios from 'axios';
// import store from '../store';
// import { UPDATE_TOKEN } from '../store/mutation-types';
// import router from '../router';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const http = axios.create({
  baseURL: 'http://192.168.0.104:3000/api/',
  transformRequest: [
    (data) => {
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'

      if (data) {
        console.log(data);
      }
      if (data && !(data instanceof FormData)) {
        const params = new URLSearchParams();
        Object.keys(data).forEach((k) => {
          params.append(k, data[k]);
        });
        return params;
      }
      return data;
    }
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    (data) => {
      // Do whatever you want to transform the data
      const res = JSON.parse(data);
      console.log(res);
      return res;
    }
  ],
  timeout: 5000
});

// before request hook
http.interceptors.request.use(
  (config) => {
    console.log(config.url);
    if (localStorage.getItem('token')) {
      Object.assign(config, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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
    if (error) {
      // store.commit(UPDATE_TOKEN, { token: '' });
      // router.replace({
      //   // 跳转到登录页面
      //   path: '/login',
      //   query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // });
    }
    return Promise.reject(error.response);
  }
);

export default http;
