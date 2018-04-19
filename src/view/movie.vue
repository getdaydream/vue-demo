<template>
  <div class="movie-wrapper">
    <!-- 筛选 -->
    <section>
      <!-- 形式 -->
      <div class="filter-row">
        <div
          :class="[conditions.subtype ? 'tag-normal': 'tag-selected' ]"
          class="fs-14 tag"
          @click="conditions.subtype = ''">全部形式</div>
        <div
          :class="[conditions.subtype === 'movie' ? 'tag-selected' :'tag-normal']"
          class="fs-14 tag"
          @click="conditions.subtype = 'movie'"
        >电影</div>
        <div
          :class="[conditions.subtype === 'tv' ? 'tag-selected' :'tag-normal']"
          class="fs-14 tag"
          @click="conditions.subtype = 'tv'">电视剧</div>
      </div>
      <!-- 国家/地区 -->
      <div class="filter-row">
        <div
          :class="[conditions.country ? 'tag-normal': 'tag-selected' ]"
          class="fs-14  tag"
          @click="conditions.country = ''"
        >全部地区</div>
        <div
          v-for="(country, index) in countries"
          :key="index"
          :class="[conditions.country === country ? 'tag-selected' :'tag-normal']"
          class="fs-14 tag"
          @click="conditions.country = country">
          {{ country }}
        </div>
      </div>
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
        subtype: '',
        country: '',
        genre: ''
      },
      subtypes: ['电影', '电视剧'],
      countries: ['中国大陆', '美国', '香港', '台湾', '日本', '韩国', '英国', '法国', '德国', '意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗', '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦'],
      genres: ['剧情', '喜剧', '动作', '爱情', '科幻', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠'],
      // 删选后的结果
      movies: []
    };
  },
  watch: {
    conditions() {
      const { subtype, country, genre } = this.conditions;
      http.get(`/v1/movies?subtype=${subtype}&country=${country}&genre=${genre}`)
        .then(({ data }) => {
          this.movies = data.movies;
        });
    }
  },
  mounted() {
    http.get('/v1/movies/')
      .then(({ data }) => {
        this.movies = data.movies;
      });
  }
};
</script>

<style scoped>
.movie-wrapper {
  width: 700px;
  padding: 30px 0;
  margin: 0 auto;
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

