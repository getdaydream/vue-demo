/**
 * 和电影页面相关的状态
 */
import * as types from '../mutation-types';
import http from '../../api/http';

const state = {
  moviesBasic: [],
  // id => movie
  movieDetailArray: []
};

const getters = {
};

const mutations = {
  [types.UPDATE_MOVIE_DETAIL_SET](state, movie) {
    const index = state.movieDetailArray.find(v => v.id === movie.id);
    if (index === -1) {
      state.movieDetailArray.push(movie);
    } else {
      state.movieDetailArray.splice(index, 1, movie);
    }
  }
};

const actions = {
  // 获取电影详情
  getMovieDetail({ commit }, { id }) {
    http.get(`/v1/movies?id=${id}`).then(({ data }) => {
      commit(types.UPDATE_MOVIE_DETAIL_SET, data.movies[0]);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
