<template>
  <div class="dynamic-publish">
    <el-input
      v-model="content"
      :autosize="{ minRows: 3 }"
      class="textarea"
      type="textarea"
      resize="none"
      placeholder="有什么想要记下的？"/>
    <div class="dynamic-publish-footer">
      <div>
        <i
          class="el-icon-picture-outline upload-picture-icon"/>
      </div>
      <div>
        <el-button
          size="medium"
          type="primary"
          @click="publishDynamic">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 发布动态
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      content: ''
    };
  },
  methods: {
    ...mapActions(['publishPost']),
    // 发布动态
    publishDynamic() {
      if (!this.content.trim()) {
        return;
      }
      this.publishPost({ category: 'dynamic', content: this.content })
        .then(() => {
          this.content = '';
          this.$message({
            type: 'success',
            message: '发布成功'
          });
        });
    }
  }
};
</script>

<style scoped>
.dynamic-publish {
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
}

.dynamic-publish-footer {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upload-picture-icon {
  font-size: 24px;
}

.upload-picture-icon:hover {
  color: #409eff;
}
</style>

