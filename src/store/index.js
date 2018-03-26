import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import draft from './modules/draft';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
export const state = {
  token: localStorage.getItem('token') || '',
  // login: 登陆页面
  // signup： 注册页面
  page: 'login',
  user: {
    nickname: '',
    email: '',
    avatar: ''
  }
};

const getters = {
  isLogin(state) {
    return Boolean(state.token);
  }
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  [types.UPDATE_TOKEN](state, payload) {
    state.token = payload.token;
    localStorage.setItem('token', payload.token);
  },
  [types.SWITCH_PAGE](state, payload) {
    state.page = payload.page;
  },
  [types.UPDATE_USER](state, payload) {
    state.user = Object.assign(state.user, payload);
  }
};

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    draft
  },
  state,
  getters,
  mutations,
  strict: debug
});
