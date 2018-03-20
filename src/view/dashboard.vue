<template>
  <div>
    主页
  </div>
</template>

<script>
import { getQueryParams } from '../util';
import store, { state } from '../store/index';
import { UPDATE_TOKEN } from '../store/mutation-types';
import http from '../api/http';

export default {
  activated() {
    // 如果是github授权回调页面
    const code = getQueryParams('code');
    if (!state.token && code) {
      http.get(`/v1/oauth/github/callback?code=${code}`)
        .then((res) => {
          if (res.data.token) {
            store.commit(UPDATE_TOKEN, { token: res.data.token });
            window.location.replace(window.location.origin);
          }
          localStorage.setItem('token', res.data.token);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>

</style>
