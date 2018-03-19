<template>
  <div>
    主页
  </div>
</template>

<script>
import { getQueryParams } from '../util';
import { state } from '../store/index';
import http from '../api/http';

export default {
  activated() {
    // 如果是github授权回调页面
    const code = getQueryParams('code');
    if (!state.token && code) {
      http.get(`/oauth/github/callback?code=${code}`)
        .then((res) => {
          console.log(res);
          // HACK
          if (res.data.token) {
            state.token = res.data.token;
          }
          localStorage.setItem('token', state.token);
        });
    }
  }
};
</script>

<style scoped>

</style>
