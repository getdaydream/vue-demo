<template>
  <mavon-editor
    :value="value"
    :toolbars="toolbars"
    class="md-editor"
    placeholder="输入正文"
    code-style="atom-one-dark"
    @imgAdd="imgAdd"
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

export default {
  name: 'Editor',
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  props: {
    value: {
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
    // 上传图片后的处理函数
    imgAdd() {

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
