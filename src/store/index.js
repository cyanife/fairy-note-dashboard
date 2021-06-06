import Vue from 'vue';
import Vuex from 'vuex';
import Utils from 'hey-utils';

import Qs from 'qs';
import axios from 'axios';
import axiosConfig from '../common/axios-config';

import { SET_USER, CLEAR_USER, UPDATE_TOKEN, REMOVE_TOKEN, UPDATE_SIDERCOLLAPSE } from './mutation-types';
import Requests from '../common/request';

Vue.use(Vuex);

const ajax = axios.create({
  ...axiosConfig,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [data => Qs.stringify(data, { arrayFormat: 'repeat' })]
});

export default new Vuex.Store({
  state: {
    user: {},
    token: Utils.getLocal(process.env.VUE_APP_ACCESS_TOKEN),
    siderCollapsed: false,
    endpoints: {
      login: 'token'
    }
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [CLEAR_USER](state) {
      state.user = {};
    },
    [UPDATE_TOKEN](state, newToken) {
      Utils.saveLocal(process.env.VUE_APP_ACCESS_TOKEN, newToken);
      state.token = newToken;
    },
    [REMOVE_TOKEN](state) {
      Utils.removeLocal(process.env.VUE_APP_ACCESS_TOKEN);
      state.token = null;
    },
    [UPDATE_SIDERCOLLAPSE](state, isShow) {
      setTimeout(() => {
        G.trigger('page_resize');
      }, 600);
      state.siderCollapsed = isShow;
    }
  },
  actions: {
    updateUser({ commit }) {
      return Requests.Users.getCurrentUser()
        .then(res => {
          commit(SET_USER, res);
        })
        .catch(() => {
          console.log('clear');
          commit(CLEAR_USER);
        });
    },
    login({ commit, state }, payload) {
      return ajax.post(state.endpoints.login, payload).then(res => {
        commit(UPDATE_TOKEN, res.data.access_token);
      });
    },
    logout({ commit }) {
      commit(CLEAR_USER);
      commit(REMOVE_TOKEN);
    },
    updateSiderCollapse({ commit }, collapse) {
      commit(UPDATE_SIDERCOLLAPSE, collapse);
    }
  },
  getters: {
    token: state => {
      return state.token;
    },
    user: state => {
      return state.user;
    },
    isAuthed: state => {
      return state.user && state.user.is_active;
    },
    siderCollapsed: state => {
      return state.siderCollapsed;
    }
  }
});
