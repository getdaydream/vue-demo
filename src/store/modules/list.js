import http from '../../api/http';
import * as types from '../mutation-types';

/**
 * 清单
 */
const state = {
  lists: []
};

const getters = {
  // 想看的电影列表
  wishMovieLists(state) {
    return state.lists
      .filter(l => l.project === 'movie' && l.state === 'todo');
  },
  // 在看的电影列表
  doMovieLists(state) {
    return state.lists.filter(
      l => l.project === 'movie' && l.state === 'processing',
    );
  },
  // 已看的电影列表
  collectMovieLists(state) {
    return state.lists.filter(
      l => l.project === 'movie' && l.state === 'complete',
    );
  }
};

const mutations = {
  [types.UPDATE_LISTS](state, lists) {
    state.lists = lists;
  },
  [types.UPDATE_LIST](state, list) {
    const index = state.lists.findIndex(l => l.id === list.id);
    if (index > -1) {
      state.lists.splice(index, 1, list);
    } else {
      state.lists.unshift(list);
    }
  }
};

const actions = {
  getAllLists({ commit }) {
    http.get('/v1/lists').then(({ data }) => {
      commit(types.UPDATE_LISTS, data.lists);
    });
  },
  // 标记一个资源加入清单
  markResource({ commit }, { resourceID, project }) {
    http.post('/v1/lists', { resourceID, project })
      .then(({ data }) => {
        commit(types.UPDATE_LIST, data.list);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
