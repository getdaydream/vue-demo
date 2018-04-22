<template>
  <div v-if="movie">
    <resource-header
      :id="movie._id"
      :image="movie.image"
      :rating-value="movie.ratingValue"
      :rating-count="movie.ratingCount"
      :title="`${movie.title} ${movie.originalTitle ? movie.originalTitle : ''}（${movie.year}）`"/>
  </div>
</template>

<script>
// 电影详情页面
import store from '../store/index';
import ResourceHeader from '../components/resource-header';

export default {
  components: {
    'resource-header': ResourceHeader
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
