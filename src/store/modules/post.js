import * as types from '../mutation-types';

// 文章的草稿
const state = {
  currentDraft: null,
  // 所有的草稿
  drafts: []
};

const mutations = {
  [types.DELETE_DRAFT](state, payload) {
    state.drafts = state.drafts.filter(draft => draft !== payload.draft.id);
  },
  [types.NEW_DRAFT]() {

  }
};

const actions = {

};


export default {
  state,
  mutations,
  actions
};
