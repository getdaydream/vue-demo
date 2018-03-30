<template>
  <div
    class="drafts-main"
    @click="changeMenuIndex(-1)">
    <div class="draft-list">
      <div class="list-header">
        <div class="list-header-content">
          草稿 {{ drafts.length }} 篇
        </div>
      </div>
      <ul class="list">
        <li
          v-for="(draft, index) of drafts"
          :key="index"
          class="list-item"
        >
          <div class="draft">
            <router-link
              :to="{path: `/draft/${draft.id}`}"
              class="title">
              {{ draft.title ? draft.title : '无标题' }}
            </router-link>
            <div class="info-box">
              <div class="word-count">
                {{ draft.content.length }}  字
              </div>
              <div class="dot">
                ·
              </div>
              <div class="date">
                {{ new Date(draft.update_at).toLocaleString() }}
              </div>
              <!-- @click.stop事件停止冒泡，点击外层时隐藏menu -->
              <div
                class="menu">
                <i
                  class="el-icon-more icon-more"
                  @click.stop.self="changeMenuIndex(index)"/>
                <ul
                  v-show="index === menuIndex"
                  class="menu-list">
                  <li
                    class="item"
                    @click="editDraft">编辑</li>
                  <li
                    class="item"
                    @click="isDeleteDraft">删除</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 文章的草稿页面
import { mapState, mapActions } from 'vuex';
import { CHANGE_CURRENT_DRAFT_ID } from '../store/mutation-types';

export default {
  data() {
    return {
      menuIndex: -1
    };
  },
  computed: {
    ...mapState({
      drafts: state => state.post.drafts
    })
  },
  mounted() {
    this.getDrafts();
  },
  methods: {
    ...mapActions(['getDrafts', 'deletePost']),
    // 当前显示的菜单index
    changeMenuIndex(index) {
      this.menuIndex = index;
    },
    // 编辑草稿
    editDraft() {
      const index = this.menuIndex;
      this.menuIndex = -1;
      const { id } = this.drafts[index];
      this.$store.commit(CHANGE_CURRENT_DRAFT_ID, { id });
      this.$router.push({ path: `/draft/${id}` });
    },
    // 是否删除草稿
    isDeleteDraft() {
      const index = this.menuIndex;
      this.menuIndex = -1;
      this.$confirm('此操作将永久删除该草稿, 是否继续?', '删除草稿', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'message'
      }).then(() => {
        this.deletePost(this.drafts[index])
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
.drafts-main {
  position: relative;
  z-index: 0;
  padding: 2rem 0 4rem;
  font-size: 15px;
}

.draft-list {
  padding: 0 1rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  width: 53.334rem;
  max-width: 100%;
}

.list-header {
  padding: 1rem;
  font-weight: 700;
  line-height: 2;
  color: #333;
  user-select: none;
  cursor: default;
}

.list-header-content {
  font-size: 20px;
  font-weight: 600;
}

.list {
  /* li前面的标识符为none */
  list-style: none;
  /* 去掉ul自带的margin和padding */
  margin: 0;
  padding: 0;
}

.list-item {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.draft {
  padding: 2rem 1rem;
}

.draft .title {
  /* 宽度适应文字内容 */
  width: fit-content;
  font-size: 16px;
  font-weight: 700;
  line-height: 2;
  text-decoration: none;
  text-align: left;
  color: #333;
}

.draft .title:hover {
  color: #409eff;
}

.draft .info-box {
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  color: #909090;
}

.draft .dot {
  margin: 0 14px;
  font-weight: 600;
}

.draft .date {
  margin-right: 28px;
}

.menu {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.menu-list {
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 7px 0;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  box-shadow: 0 1px 2px 1px hsla(0, 0%, 95%, 0.5);
  list-style: none;
}

.menu .menu-list .item {
  padding: 7px 25px;
  font-size: 12px;
}

.menu .menu-list .item:hover {
  background-color: #f8f9fa;
}
</style>

