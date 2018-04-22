<template>
  <router-link
    :to="`/${category}/${id}`"
    class="wrapper">
    <div class="poster-wrapper">
      <img
        v-show="image"
        :src="image">
    </div>
    <p class="movie-basic-info">
      {{ title }}
      <strong v-if="ratingValue">{{ Number(ratingValue).toFixed(1) }}</strong>
    </p>
  </router-link>
</template>

<script>
export default {
  props: ['category','image', 'title', 'ratingValue', 'id'], //eslint-disable-line
};
</script>

<style scoped>
.wrapper {
  width: 130px;
  margin: 0 12px;
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
  color: white;
}

.movie-basic-info strong {
  color: #fff280;
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
</style>
