<template>
  <div class="dynamic-card">
    <!-- 用户头像 -->
    <router-link
      :to="{path : `/people/${dynamic.id}`}"
      :style="{background: user.avatar ? user.avatar : '#909399'}"
      class="user-avatar"/>
    <div class="main-content">
      <!-- 动态发布者 -->
      <p>
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
      <div class="button-bar"/>
    </div>
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

.user-avatar {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 24px;
  left: 24px;
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

.main-content p {
  margin: 0;
  padding: 0;
  text-align: start;
}

.content-publish-time {
  padding-top: 4px;
  color: #99a2aa;
}

.dynamic-content {
  margin-top: 10px;
  padding-right: 10px;
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

