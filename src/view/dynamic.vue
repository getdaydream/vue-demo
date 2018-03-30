<template>
  <div class="dynamic-main">
    <div class="dynamic-content">
      <dynamic-publish/>
      <div class="dynamic-list">
        <dynamic-card
          v-for="(dynamic, index) in dynamics"
          :id="dynamic.id"
          :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
// 动态主页面
import { mapState, mapActions } from 'vuex';
import DynamicPublish from '../components/dynamic-publish';
import DynamicCard from '../components/dynamic-card';

export default {
  components: {
    'dynamic-publish': DynamicPublish,
    'dynamic-card': DynamicCard
  },
  computed: {
    ...mapState({
      dynamics: state => state.post.dynamics
    })
  },
  mounted() {
    this.getPosts({ category: 'dynamic' });
  },
  methods: {
    ...mapActions(['getPosts'])

  }
};
</script>

<style scoped>
.dynamic-main {
  position: relative;
  z-index: 0;
  padding: 2rem 0 4rem;
}

.dynamic-content {
  width: 632px;
  margin: 0 auto;
}
</style>

