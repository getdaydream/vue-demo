<template>
  <div class="wrapper">
    <div class="cover">
      <img
        :src="movie.poster"
        class="img radius-5"
      >
    </div>
    <div class="info-wrapper">
      <div class="info">
        <div class="flex justify-space-around">
          <el-rate
            v-model="ratingValue"
            disabled/>
          <div class="rating">
            {{ movie.ratingValue }}
          </div>
        </div>
        <div class="title">{{ movie.title }}</div>
      </div>
    </div>
  </div>
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
  width: 160px;
  height: 304px;
}

.cover {
  overflow: hidden;
  border-radius: 5px;
  width: 160px;
}

.img {
  width: 160px;
  height: 214px;
  object-fit: cover;
}

.info-wrapper {
  display: block;
  width: 160px;
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
