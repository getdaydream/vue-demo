import * as types from '../mutation-types';
import http from '../../api/http';
// import router from '../../router/index';

// 文章的草稿
const state = {
  currentDraftID: '',
  newDraftMessageSent: false,
  // 所有的草稿
  drafts: []
};

const mutations = {
  [types.CHANGE_CURRENT_DRAFT_ID](state, payload) {
    state.currentDraftID = payload.id;
  },
  [types.SET_NEW_DRAFT_MESSAGE_SENT](state, payload) {
    state.newDraftMessageSent = payload.hasSent;
  },
  // payload: { drafts }
  [types.UPDATE_ALL_DRAFTS](state, payload) {
    state.drafts = payload.drafts;
  },
  // payload： { draft }
  [types.UPDATE_DRAFT](state, payload) {
    const index = state.drafts.findIndex(
      draft => draft.id === payload.draft.id
    );
    if (index > -1) {
      state.drafts[index] = payload.draft;
    } else {
      state.drafts.unshift(payload.draft);
    }
  },
  /**
   * payload
   *  category: 从哪个所属分类中删除
   *  id: 帖子的id
   */
  [types.DELETE_POST](state, payload) {
    const { category, id } = payload;
    state[`${category}s`] = state[`${category}s`].filter(post => post.id !== id);
  }
};

const actions = {
  // 请求所有草稿
  getDrafts({ commit }) {
    http.get('/v1/posts?category=draft').then((res) => {
      commit(types.UPDATE_ALL_DRAFTS, { drafts: res.data.posts });
    });
  },
  // 新创建一个草稿
  // draft: { content, title }
  newDraft({ commit, state }, draft) {
    if (state.currentDraftID || state.newDraftMessageSent) {
      return;
    }
    commit(types.SET_NEW_DRAFT_MESSAGE_SENT, { hasSent: true });
    http
      .post('/v1/posts', {
        content: draft.content,
        title: draft.title,
        category: 'draft'
      })
      .then((res) => {
        commit(types.CHANGE_CURRENT_DRAFT_ID, { id: res.data.id });
        commit(types.SET_NEW_DRAFT_MESSAGE_SENT, { hasSent: false });
      })
      .catch(() => {
        commit(types.SET_NEW_DRAFT_MESSAGE_SENT, { hasSent: false });
      });
  },
  // 保存草稿
  // draft: { id, title, content }
  saveDraft({ commit }, draft) {
    http.put('/v1/posts', draft).then((res) => {
      const draft = res.data.post;
      commit(types.UPDATE_DRAFT, { draft });
    });
  },
  // 删除帖子
  deletePost({ commit }, payload) {
    const { category, id } = payload;
    http.delete(`/v1/posts?id=${id}`).then(() => {
      commit(types.DELETE_POST, { category, id });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
