<template>
  <div v-if="movie">
    <movie-card-detail :movie="movie"/>
  </div>
</template>

<script>
// 电影详情页面
import store from '../store/index';
import MovieCardDetail from '../components/movie-card-detail';

export default {
  components: {
    'movie-card-detail': MovieCardDetail
  },
  computed: {
    movie() {
      const { id } = this.$route.params;
      return this.$store.state.movie.movieDetailArray.find(m => m.id === id);
    }
  },
  methods: {
  },
  beforeRouteEnter(to, from, next) {
    const { id } = to.params;
    store.dispatch('getMovieDetail', { id });
    next();
  }
};
</script>

<style scoped>
.blur-bg-wrapper {
  height: 430px;
  width: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
}
</style>
