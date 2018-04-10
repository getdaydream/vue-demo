<template>
  <div class="movie">
    <!-- 导航 -->
    <el-menu
      default-active="explore"
      class="movie-nav"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="explore">发现</el-menu-item>
      <el-menu-item index="wish">想看</el-menu-item>
      <el-menu-item index="do">在看</el-menu-item>
      <el-menu-item index="collect">看过</el-menu-item>
      <el-menu-item index="5">短评</el-menu-item>
      <el-menu-item index="6">影评</el-menu-item>
    </el-menu>
    <div
      v-if="activeNav === 'explore'"
      class="main-content">
      <movie-card-basic
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"/>
    </div>
    <div v-if="activeNav === 'wish'">
      <movie-card-basic
        v-for="wishMovieList in wishMovieLists"
        :movie="wishMovieList.resource"
        :key="wishMovieList._id"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import http from '../api/http';
import MovieCardBasic from '../components/movie-card-basic';

export default {
  components: {
    'movie-card-basic': MovieCardBasic
  },
  data() {
    return {
      activeNav: 'explore',
      movies: []
    };
  },
  computed: {
    ...mapGetters(['wishMovieLists'])
  },
  mounted() {
    http.get('/v1/movies')
      .then(({ data }) => {
        this.movies = data.movies;
      });
    this.getAllLists();
  },
  methods: {
    ...mapActions(['getAllLists']),
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
  justify-content: flex-start;
}
</style>

