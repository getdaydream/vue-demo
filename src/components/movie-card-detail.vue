<template>
  <div class="wrapper">
    <!-- 左边为海报 -->
    <img
      :src="movie.poster"
      class="poster">
    <!-- 右边为电影详情 -->
    <div class="info-content">
      <!-- 电影名 -->
      <div class="movie-title">
        {{ movie.title }}
        <span class="movie-year">{{ `(${movie.year})` }}</span>
      </div>

      <!-- 对电影进行标记 -->
      <div/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'] //eslint-disable-line
};
</script>

<style>
.wrapper {
  width: 980px;
  margin: 40px auto;
  display: flex;
  justify-content: flex-start;
}

.poster {
  width: 225px;
  height: 300px;
  overflow: hidden;
  border-radius: 5px;
  user-select: none;
}

.info-content {
  margin-left: 20px;
}

.movie-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
}

.movie-year {
  margin: 0;
  padding: 0;
  color: #909399;
}
</style>
