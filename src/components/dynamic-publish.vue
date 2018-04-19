<template>
  <div class="dynamic-publish">
    <!-- 文本内容 -->
    <el-input
      v-model="content"
      :rows="3"
      class="textarea"
      type="textarea"
      resize="none"
      placeholder="有什么想要记下的？"/>
    <div class="dynamic-publish-footer">
      <div>
        <el-popover
          ref="uploadPopover"
          v-model="showUploadPopover"
          :popper-options="{}"
          placement="bottom-start"
          width="358"
          trigger="manual"
        >
          <dynamic-image-upload
            @closePopover="showUploadPopover = false"
            @currentFilenameArray="updateImages"/>
        </el-popover>
        <!-- 上传图片 -->
        <i
          v-popover:uploadPopover
          class="el-icon-picture-outline upload-picture-icon"
          @click="showUploadPopover = !showUploadPopover"
        />
      </div>
      <div
        class="publish-button"
        @click="publishDynamic"
      >
        发布
      </div>
    </div>
  </div>
</template>

<script>
// 发布动态
import { mapActions } from 'vuex';
import DynamicImageUpload from '../components/dynamic-image-upload';
import { bus, BUS_EVENT } from '../util';

export default {
  components: {
    'dynamic-image-upload': DynamicImageUpload
  },
  data() {
    return {
      content: '',
      showUploadPopover: false,
      images: []
    };
  },
  methods: {
    ...mapActions(['publishPost']),
    // 发布动态
    publishDynamic() {
      if (!this.content.trim() && this.images.length === 0) {
        return;
      }
      this.publishPost({
        category: 'dynamic',
        content: this.content ? this.content : '分享图片',
        images: this.images })
        .then(() => {
          bus.$emit(BUS_EVENT.CLEAR_UPLOAD_IMAGES);
          this.content = '';
          this.images = [];
          this.showUploadPopover = false;
          this.$message({
            type: 'success',
            message: '发布成功'
          });
        });
    },
    updateImages(images) {
      this.images = images;
    }
  }
};
</script>

<style>
.el-textarea__inner {
  color: #bcc0cc;
  background: rgb(39, 40, 56);
  outline: 0;
}
</style>


<style scoped>
.dynamic-publish {
  padding: 15px;
  border-radius: 8px;
  background-color: #2c2c41;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
}

.publish-button {
  background: rgb(255, 66, 95);
  color: rgb(255, 255, 255);
  cursor: pointer;
  line-height: 30px;
  width: 65px;
  text-align: center;
  font-size: 12px;
  height: 30px;
  border-radius: 1px;
  border-radius: 3px;
  user-select: none;
}

.publish-button:hover {
  background: #eb5067;
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

