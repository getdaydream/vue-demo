<template>
  <div class="editor-main">
    <textarea
      v-model="title"
      class="title-input"
      spellcheck="false"
      placeholder="输入标题..."
      maxlength="50"/>
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
  </div>
</template>

<script>
// 编辑文章界面
import 'mavon-editor/dist/css/index.css';
import * as mavonEditor from 'mavon-editor';
import { mapActions, mapState } from 'vuex';
import config from '../config';
import http from '../api/http';
import { CHANGE_CURRENT_DRAFT_ID } from '../store/mutation-types';

export default {
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  data() {
    return {
      toolbars: config.MARKDOWN_EDITOR.toolbars,
      title: '',
      content: ''
    };
  },
  computed: {
    ...mapState({
      currentDraftID: state => state.post.currentDraftID
    })
  },
  watch: {
    // 不应该使用箭头函数来定义 watcher 函数
    currentDraftID() {
      if (this.currentDraftID) {
        this.$router.replace({ path: `/draft/${this.currentDraftID}` });
      }
    }
  },
  methods: {
    ...mapActions(['newDraft', 'saveDraft']),
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
    // 用户点击保存或ctrl + s快键键时
    save(content) {
      if (this.currentDraftID || this.$route.params.id) {
        this.saveDraft({ id: this.currentDraftID, title: this.title, content: content.trim() });
      } else {
        this.newDraft({ content: content.trim(), title: this.title });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const id = vm.$route.params.id;
      if (id) {
        vm.$store.commit(CHANGE_CURRENT_DRAFT_ID, { id });
        http.get(`/v1/posts?id=${id}`).then((res) => {
          const [post] = res.data.posts;
          Object.assign(vm, { title: post.title, content: post.content });
        });
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.includes('/draft/new')) {
      this.content = '';
      this.title = '';
      this.$store.commit(CHANGE_CURRENT_DRAFT_ID, { id: '' });
    }
    next();
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
  overflow: hidden;
  background: inherit;
  margin-bottom: 20px;
}

.md-editor {
  position: relative;
  z-index: 0;
}
</style>

