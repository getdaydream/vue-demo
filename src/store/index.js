import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as types from './mutation-types';
import post from './modules/post';
import movie from './modules/movie';
import http from '../api/http';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
export const state = {
  token: localStorage.getItem('token') || '',
  // login: 登陆页面
  // signup： 注册页面
  page: 'login',
  user: {
    userID: '',
    username: '',
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
  // payload : user
  [types.UPDATE_USER](state, user) {
    Object.assign(state.user, user);
  }
};

const actions = {
  // 修改用户信息
  updateUser({ commit }, user) {
    http.put('/v1/users', user)
      .then(({ data }) => {
        commit(types.UPDATE_USER, data.user);
      });
  }
};

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    post,
    movie
  },
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [createLogger()] : [],
  strict: debug
});
