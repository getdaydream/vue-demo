<template>
  <router-link
    :to="{path: `/movie/${movie.id}`}"
    class="wrapper">
    <div class="poster-wrapper">
      <img
        v-show="movie.poster"
        :src="movie.poster">
    </div>
    <p class="movie-basic-info">
      {{ movie.title }}
      <strong>{{ movie.ratingValue }}</strong>
    </p>
  </router-link>
</template>

<script>
export default {
  props: ['movie'], //eslint-disable-line
  computed: {
    ratingValue() {
      return this.movie && this.movie.ratingValue
        ? this.movie.ratingValue / 2
        : 0;
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 130px;
  margin-right: 25px;
  margin-bottom: 10px;
}

.poster-wrapper {
  width: 130px;
  height: 182px;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
}

.poster-wrapper img {
  width: 130px;
  height: 182px;
}

.movie-basic-info {
  margin: 5px 0 0;
  height: 44px;
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.movie-basic-info strong {
  color: #e09015;
}

.info-wrapper {
  display: block;
  width: 115;
  height: 90px;
  overflow: hidden;
}

.info {
  margin-top: 10px;
}

.title {
  line-height: 22px;
  max-height: 44px;
  word-break: break-all;
  word-wrap: break-word;
  color: #222;
  font-size: 14px;
  overflow: hidden;
  cursor: pointer;
}

.rating {
  font-size: 18px;
  color: #ff9900;
}
</style>
