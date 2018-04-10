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
      <div
        v-if="movie.originalTitle"
        class="movie-original-title">
        {{ movie.originalTitle }}
      </div>

      <!-- 对电影进行标记 -->
      <div class="flex">
        <el-button @click="wish">想看</el-button>
        <el-button>看过</el-button>
      </div>
      <div/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['movie'], //eslint-disable-line
  methods: {
    ...mapActions(['markResource']),
    wish() {
      this.markResource({
        resourceID: this.movie._id,//eslint-disable-line
        project: 'movie'
      });
    }
  }
};
</script>

<style scoped>
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
  font-size: 35px;
  font-weight: 700;
  line-height: 1.3;
}

.movie-year {
  font-size: 30px;
  color: #909399;
}

.movie-original-title {
  font-size: 24px;
}
</style>
