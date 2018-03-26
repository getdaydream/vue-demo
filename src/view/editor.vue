<template>
  <div class="editor-main">
    <textarea
      class="title-input"
      spellcheck="false"
      placeholder="输入标题..."
      maxlength="50"/>
    <markdown-editor/>
  </div>
</template>

<script>
// 编辑文章界面
import MarkdownEditor from '../components/markdown-editor';

export default {
  components: {
    'markdown-editor': MarkdownEditor
  }
};
</script>

<style scoped>
.editor-main {
  padding: 3rem calc(50% - 27.834rem) 50vh;
  overflow: hidden;
}

.title-input {
  height: 44px;
  min-height: 44px;
  display: block;
  width: 100%;
  border: 0;
  font-size: 32px;
  line-height: 1.4;
  font-weight: 600;
  outline: none;
  box-shadow: none;
  overflow: auto;
  flex: 1;
  padding: 0;
  resize: none;
  background: inherit;
  margin-bottom: 20px;
}
</style>

