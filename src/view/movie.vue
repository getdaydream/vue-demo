<template>
  <div>
    电视电影综艺
  </div>
</template>

<script>
import http from '../api/http';

export default {
  mounted() {
    http.get('/v1/movies?id=4920389')
      .then((res) => {
        console.log(res);
      });
  }
};
</script>

<style scoped>

</style>

