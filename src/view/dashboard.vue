<template>
  <div>
    <!-- 全局顶部导航栏 -->
    <header
      role="header"
      class="app-header">
      <div class="app-header-inner">
        <!-- 导航图标 -->
        <nav
          role="navigation"
          class="app-header-nav">
          <router-link
            to="/movie">
            <img
              :src="`../../static/icon/movie${ $route.path.includes('/movie') ?
              '-active' : ''}.svg`"
              title="电影·电视·综艺">
          </router-link>
          <router-link
            to="/book">
            <img
              :src="`../../static/icon/book${ $route.path.includes('/book') ?
              '-active' : ''}.svg`"
              title="读书">
          </router-link>
          <router-link to="/bug">
            <img
              :src="`../../static/icon/bug${ $route.path.includes('/bug') ?
              '-active' : ''}.svg`"
              title="虫子">
          </router-link>
        </nav>
        <!-- 搜索框 -->
        <div class="input-search">
          <el-input
            size="medium"
            placeholder="搜索你感兴趣的内容"
            suffix-icon="el-icon-search"/>
        </div>
        <!-- 用户 -->
        <div class="user-info">
          <router-link to="/people"/>
          <el-button
            type="primary"
            icon="el-icon-edit">写文章</el-button>
        </div>
      </div>
    </header>
    <div class="sticky-holder"/>
    <main
      role="main"
      class="main-container">
      <router-view/>
    </main>
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
        });
    }
  }
};
</script>

<style scoped>
.app-header {
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  background-clip: content-box;
}

.app-header-inner {
  position: relative;
  display: flex;
  min-width: 768px;
  max-width: 1010px;
  height: 52px;
  padding: 0 16px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-header-nav {
  display: flex;
  justify-content: space-between;
  width: 220px;
  height: 30px;
}

.app-header-nav img {
  width: 25px;
}

.input-search {
  width: 500px;
}

.user-info {
  display: flex;
  justify-content: flex-end;
}

.sticky-holder {
  position: relative;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: block;
  float: none;
  margin: 0px;
  height: 52px;
}

.main-container {
  position: relative;
  width: 1000px;
  padding: 0 16px;
  margin: 10px auto;
}
</style>
