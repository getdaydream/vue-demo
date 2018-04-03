<template>
  <div class="dynamic-card">
    <!-- 用户头像 -->
    <router-link
      :to="{path : `/people/${dynamic.id}`}"
      class="user-avatar-link">
      <img
        v-if="user.avatar"
        :src="user.avatar"
        class="user-avatar">
    </router-link>
    <div class="main-content">
      <!-- 动态发布者 -->
      <p class="fs-16">
        {{ user.username }}
      </p>
      <!-- 动态发布时间 -->
      <p class="fs-12 content-publish-time">
        {{ timeAgo }}
      </p>
      <!-- 动态内容 -->
      <div class="dynamic-content">
        {{ dynamic.content }}
      </div>
      <!-- 图片 -->
      <div
        v-viewer="{title: false}"
        v-if="dynamic.images && dynamic.images.length"
        class="image-container"
      >
        <img
          v-for="(src,index) in dynamic.images"
          :src="src"
          :key="index">
      </div>

      <div class="button-bar"/>
    </div>

    <!-- 更多操作 ： 删除 -->
    <el-dropdown
      class="dropdown"
      trigger="click">
      <i class="el-icon-more"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="isDeleteDynamic">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 显示动态的卡片
import { mapState, mapActions } from 'vuex';
import { formatTimeAgo } from '../util';

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['user']),
    dynamic() {
      return this.$store.state.post.dynamics.find(d => d.id === this.id);
    },
    timeAgo() {
      return formatTimeAgo(this.dynamic.update_at);
    }
  },
  methods: {
    ...mapActions(['deletePost']),
    // 是否删除动态
    isDeleteDynamic() {
      this.$confirm('此操作将永久删除该动态, 是否继续?', '删除动态', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'message'
      }).then(() => {
        this.deletePost({ id: this.dynamic.id, category: 'dynamic' })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped>
.dynamic-card {
  position: relative;
  margin-top: 8px;
  padding: 0 10px;
  border-radius: 8px;
  width: 632px;
  background: #fff;
}

.user-avatar-link {
  position: absolute;
  top: 24px;
  left: 24px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 50%;
}

.main-content {
  width: 534px;
  padding-top: 27px;
  margin-left: 88px;
}

.content-publish-time {
  padding-top: 4px;
  color: #99a2aa;
}

.main-content p {
  margin: 0;
  padding: 0;
  text-align: start;
}

.dynamic-content {
  margin-top: 10px;
  padding-right: 10px;
}

.image-container {
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  max-width: 330px;
  user-select: none;
}

.image-container img {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  margin: 0 4px 4px 0;
  object-fit: cover;
  cursor:zoom-in;
}

.button-bar {
  width: 100%;
  height: 44px;
  line-height: 44px;
}

.dropdown {
  position: absolute;
  top: 20px;
  right: 15px;
  user-select: none;
  font-size: 16px;
  color: #ccd0d7;
  cursor: pointer;
  width: 25px;
  height: 25px;
  transform: rotate(90deg);
}
</style>

