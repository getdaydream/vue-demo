<template>
  <div class="movie-wrapper">
    <el-tabs
      tab-position="top"
      style="width:100%;">
      <el-tab-pane label="搜索">
        <movie-search/>
      </el-tab-pane>
      <el-tab-pane label="分类">
        <movie-search-tags/>
      </el-tab-pane>
      <el-tab-pane label="想看">配置管理</el-tab-pane>
      <el-tab-pane label="看过">角色管理</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import MovieSearchTags from '../components/movie-search-tags';
import MovieSearch from '../components/movie-search';

export default {
  components: {
    'movie-search-tags': MovieSearchTags,
    'movie-search': MovieSearch
  }
};
</script>

<style>
.el-tabs__item.is-active {
  color: rgb(255, 66, 95);
}

.el-tabs__item:hover {
  color: rgb(255, 66, 95);
  cursor: pointer;
}

.el-tabs__item {
  color: hsla(0, 0%, 100%, 0.5);
}

.el-tabs__active-bar {
  background-color: rgb(255, 66, 95);
}
</style>


<style scoped>
.movie-wrapper {
  width: 700px;
  padding: 30px 0;
  margin: 0 auto;
  display: flex;
}
</style>

