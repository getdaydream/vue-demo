<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
  font-size: 14px;
  background: #f4f5f5;
  min-height: 100vh;
}

*,
:after,
:before {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  outline: none;
}

img {
  display: block;
}

a {
  display: block;
  cursor: pointer;
  text-decoration: none;
}

h4,
h5,
h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1.1;
}

h4 {
  font-size: 18px;
}

textarea {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

/* 辅助文字 */
.fs-12 {
  font-size: 12px;
}

/* 正文 */
.fs-14 {
  font-size: 14px;
}

/* 小标题 */
.fs-16 {
  font-size: 16px;
}

/* 标题 */
.fs-18 {
  font-size: 18px;
}

/* 主标题 */
.fs-20 {
  font-size: 20px;
}

.flex {
  display: flex;
}

.fit-content {
  width: fit-content;
}
</style>
