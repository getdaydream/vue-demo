<template>
  <div class="wrapper">
    <!-- 筛选 -->
    <section>
      <!-- 类型 -->
      <div class="filter-row">
        <div
          :class="[conditions.genre ? 'tag-normal': 'tag-selected' ]"
          class="fs-14  tag"
          @click="conditions.genre = ''">全部类型</div>
        <div
          v-for="(genre, index) in genres"
          :key="index"
          :class="[conditions.genre === genre ? 'tag-selected' :'tag-normal']"
          class="fs-14 tag"
          @click="conditions.genre = genre">
          {{ genre }}
        </div>
      </div>
    </section>

    <!-- 筛选后得到的结果 -->
    <div class="filter-result">
      <resource-card-basic
        v-for="movie in movies "
        :key="movie.id"
        :image="movie.image"
        :title="movie.title"
        :rating-value="movie.ratingValue"
        :id="movie.id"
        category="movie"
      />
    </div>
    <div/>
  </div>
</template>

<script>
import ResourceCardBasic from '../components/resource-card-basic';
import http from '../api/http';

export default {
  components: {
    'resource-card-basic': ResourceCardBasic
  },
  data() {
    return {
      // 筛选条件
      conditions: {
        genre: ''
      },
      genres: ['剧情', '喜剧', '动作', '爱情', '科幻', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠'],
      // 删选后的结果
      movies: []
    };
  },
  watch: {
    'conditions.genre': function search() {
      this.search();
    }
  },
  mounted() {
    http.get('/v1/movies/')
      .then(({ data }) => {
        this.movies = data.movies;
      });
  },
  methods: {
    search() {
      const { genre } = this.conditions;
      http.get(`/v1/movies?genre=${genre}`)
        .then(({ data }) => {
          this.movies = data.movies;
        });
    }
  }
};
</script>

<style scoped>
.wrapper {
 padding-top: 30px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 17px;
}

.tag {
  cursor: pointer;
  padding: 2px 10px;
  line-height: 20px;
  border-radius: 2px;
  user-select: none;
}

.tag-normal {
  color: hsla(0, 0%, 100%, 0.5);
}

.tag-selected {
  color: white;
  background: #fc425f;
}

.filter-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
