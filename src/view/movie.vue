<template>
  <div class="movie">
    <!-- 导航 -->
    <el-menu
      default-active="all"
      class="movie-nav"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="all">全部</el-menu-item>
      <el-menu-item index="2">想看</el-menu-item>
      <el-menu-item index="3">在看</el-menu-item>
      <el-menu-item index="4">看过</el-menu-item>
      <el-menu-item index="5">影评</el-menu-item>
    </el-menu>
    <div
      v-if="activeNav === 'all'"
      class="main-content">
      <movie-card-basic
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"/>
    </div>
  </div>
</template>

<script>
import http from '../api/http';
import MovieCardBasic from '../components/movie-card-basic';

export default {
  components: {
    'movie-card-basic': MovieCardBasic
  },
  data() {
    return {
      activeNav: 'all',
      movies: []
    };
  },
  mounted() {
    http.get('/v1/movies')
      .then(({ data }) => {
        this.movies = data.movies;
      });
  },
  methods: {
    handleSelect(key, [activeNav]) {
      this.activeNav = activeNav;
    }
  }
};
</script>

<style scoped>
.movie {
  width: 632px;
  padding: 30px 0;
  margin: 0 auto;
}

.movie-nav {
  width: 100%;
  border-radius: 8px;
  padding: 0 30px;
  user-select: none;
}

.main-content {
  width: 100%;
  padding: 20px 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

