<template>
  <div class="dynamic-image-upload">
    <i
      class="el-icon-close close-icon"
      @click="close"/>
    <div class="title">
      <span>图片上传
        <span class="count-hint"> {{ imageCount }} / 9</span>
      </span>
    </div>
    <el-upload
      ref="upload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :headers="headers"
      :limit="9"
      class="upload-center"
      accept="image/*"
      action="http://192.168.0.104:3000/api/v1/images?directory=dynamic"
      list-type="picture-card">
      <i class="el-icon-plus"/>
    </el-upload>
  </div>
</template>

<script>
// 发布动态时可上传9张图片
import http from '../api/http';
import { bus, BUS_EVENT } from '../util';

export default {
  data() {
    return {
      imageCount: 0
    };
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };
    }
  },
  created() {
    bus.$on(BUS_EVENT.CLEAR_UPLOAD_IMAGES, () => {
      this.$refs.upload.clearFiles();
    });
  },
  methods: {
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log('文件列表移除文件时的钩子');
      const filename = file.response.images[0].split('/').pop();
      http.delete(`/v1/images?filename=${filename}&directory=dynamic`);
      this.imageCount = fileList.length;
      this.$emit('currentFilenameArray', this.fileList2FilenameArray(fileList));
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.imageCount = fileList.length;
      this.$emit('currentFilenameArray', this.fileList2FilenameArray(fileList));
    },
    fileList2FilenameArray(fileList) {
      return fileList.map(f => f.response.images[0].split('/').pop());
    },
    close() {
      this.$emit('closePopover');
    }
  }
};
</script>

<style>
.el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  margin: 0 8px 8px 0;
  display: inline-block;
}

.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  line-height: 98px;
  vertical-align: center;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>


<style scoped>
.dynamic-image-upload {
  position: relative;
  max-height: 360px;
  overflow: hidden;
}

.close-icon {
  position: absolute;
  font-size: 20px;
  top: 0;
  right: 0;
  cursor: pointer;
}

.title {
  padding-bottom: 15px;
  font-size: 14px;
  color: #222;
  text-align: left;
}

.count-hint {
  margin-left: 10px;
  font-size: 12px;
  color: #c0c0c0;
}

.upload-center {
  margin-left: 8px;
}
</style>

