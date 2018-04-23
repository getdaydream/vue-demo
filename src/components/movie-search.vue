<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="wrapper">
    <!-- 搜索框 -->
    <el-input
      v-model="text"
      placeholder="请输入电影名称"
      class="input-with-select"
      @keyup.enter.native="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      />
    </el-input>
    <!-- 结果 -->
    <div class="search-result">
      <div v-if="error">
        {{ error }}
      </div>
      <div v-if="results.length">
        <resource-header
          v-for="movie in results"
          :key="movie.id"
          :id="movie._id"
          :image="movie.image"
          :rating-value="movie.ratingValue"
          :rating-count="movie.ratingCount"
          :title="`${movie.title} ${movie.originalTitle
          ? movie.originalTitle : ''}（${movie.year}）`"/>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../api/http';
import ResourceHeader from '../components/resource-header';

export default {
  components: {
    'resource-header': ResourceHeader
  },
  data() {
    return {
      text: '',
      error: '',
      results: [],
      loading: false
    };
  },
  methods: {
    search() {
      if (!this.text) {
        return;
      }
      this.loading = true;
      http.get(`/v1/movies/search?text=${this.text}`)
        .then(({ data }) => {
          this.error = '';
          this.results = data.movies;
          this.loading = false;
        })
        .catch(() => {
          this.error = '搜索超时';
          this.results = [];
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.el-input__inner {
  background: rgba(0, 0, 0, 0.2);
}
</style>


<style scoped>
.wrapper {
  padding-top: 30px;
}
</style>
