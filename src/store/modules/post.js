/**
 * 和帖子相关的状态
 */
import * as types from '../mutation-types';
import http from '../../api/http';
// import router from '../../router/index';

const state = {
  // 动态
  dynamics: [],
  currentDraftID: '',
  newDraftMessageSent: false,
  // 所有的草稿
  drafts: []
};

const mutations = {
  // payload:
  //  category 帖子类别
  //  posts 帖子
  [types.UPDATE_POSTS](state, payload) {
    const { category, posts, isNewPost } = payload;
    // 如果是新发布的帖子就放在数组第一位，否则就更新整个内容
    if (isNewPost) {
      state[`${category}s`].unshift(posts[0]);
    } else {
      state[`${category}s`] = posts;
    }
  },
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
    debugger;
    state[`${category}s`] = state[`${category}s`].filter(post => post.id !== id);
  }
};

const actions = {
  // 发布帖子
  publishPost({ commit }, { category, content }) {
    http.post('/v1/posts', {
      content,
      category
    }).then(({ data }) => {
      commit(types.UPDATE_POSTS, { isNewPost: true, posts: [data.post], category });
    });
  },
  // 请求帖子
  getPosts({ commit }, { category }) {
    http.get(`/v1/posts?category=${category}`).then(({ data }) => {
      commit(types.UPDATE_POSTS, { category, posts: data.posts });
    });
  },
  // 删除帖子
  deletePost({ commit }, payload) {
    debugger;
    const { category, id } = payload;
    http.delete(`/v1/posts?id=${id}`).then(() => {
      commit(types.DELETE_POST, { category, id });
    });
  },
  // 请求所有草稿
  getDrafts({ commit }) {
    http.get('/v1/posts?category=draft').then(({ data }) => {
      commit(types.UPDATE_ALL_DRAFTS, { drafts: data.posts });
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
  }
};

export default {
  state,
  mutations,
  actions
};
