<template>
  <mavon-editor
    :value="value"
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
  methods: {
    // 上传图片后的处理函数
    imgAdd() {

    }
  }
};
</script>

