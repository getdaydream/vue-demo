<template>
  <mavon-editor
    :value="content"
    :toolbars="toolbars"
    class="md-editor"
    placeholder="输入正文"
    code-style="atom-one-dark"
    @imgAdd="imgAdd"
    @imgDel="imgDel"
    @save="save"
    @change="change"
  />
</template>

<script>
/**
 * https://github.com/hinesboy/mavonEditor
 * A markdown editor based on Vue that supports a variety of personalized features.
 */
import 'mavon-editor/dist/css/index.css';
import * as mavonEditor from 'mavon-editor';
import config from '../config';
import http from '../api/http';

export default {
  name: 'Editor',
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      toolbars: config.MARKDOWN_EDITOR.toolbars
    };
  },
  methods: {
    // 图片文件添加回调事件(filename: 写在md中的文件名, File: File Object)
    imgAdd(filename, file) {
      const formdata = new FormData();
      formdata.append('image', file);
      http({
        url: '/v1/images/',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    // 图片文件删除回调事件(filename: 写在md中的文件名)
    imgDel() {

    },
    // 编辑区发生变化的回调事件(render: value 经过markdown解析后的结果)
    change() {
    },
    save(value) {
      this.$emit('save', value);
    }
  }
};
</script>

<style scoped>
.md-editor {
  position: relative;
  z-index: 0;
}
</style>
