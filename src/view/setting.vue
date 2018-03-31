<template>
  <div class="setting flex">
    <!-- 设置导航 -->
    <div class="setting-nav">
      <el-menu
        :default-active="$route.name">
        <el-menu-item
          index="setting-basic"
          @click="$router.push({name: 'setting-basic'})">
          <span slot="title">基础设置</span>
        </el-menu-item>
        <el-menu-item
          index="setting-account"
          @click="$router.push({path: '/setting/account'})">
          <span slot="title">账号安全</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 设置主界面 -->
    <router-view class="setting-content-main"/>
  </div>
</template>

<script>
// 用户设置页面
export default {
};
</script>

<style scoped>
.setting {
  width: 960px;
  padding: 30px 0;
  margin: 0 auto;
}

.setting-nav {
  flex: 0 0 160px;
  margin-right: 45px;
  user-select: none;
  text-align: center;
}

.setting-content-main {
  flex: 1;
}
</style>
