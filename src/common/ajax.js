import axios from 'axios';

import axiosConfig from './axios-config';
import store from '../store';

const instance = axios.create(axiosConfig);

instance.interceptors.request.use(request => {
  if (store.getters.token) {
    request.headers.authorization = 'Bearer ' + store.getters.token;
  }
  return request;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err && err.response) {
      const { status, config } = err.response;
      if (status === 401) {
        return refreshToken(config);
      } else {
        switch (status) {
          case 400:
            err.message = '错误请求';
            break;
          case 403:
            err.message = '拒绝访问';
            break;
          case 404:
            err.message = '未找到该资源';
            break;
          case 405:
            err.message = '请求方法未允许';
            break;
          case 408:
            err.message = '请求超时';
            break;
          case 500:
            err.message = '服务器端错误';
            break;
          case 501:
            err.message = '网络未实现';
            break;
          case 502:
            err.message = '网络错误';
            break;
          case 503:
            err.message = '服务不可用';
            break;
          case 504:
            err.message = '网络超时';
            break;
          case 505:
            err.message = 'http版本不支持该请求';
            break;
          default:
            err.message = `连接错误${err.response.status}`;
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

function refreshToken(config) {
  return store.dispatch('refreshToken').then(newToken => {
    config.headers.authorization = 'Bearer ' + newToken;
    return instance(config);
  });
}

const ajax = {
  get: function(url, param) {
    let params = {
      url,
      method: 'GET'
    };
    if (param) {
      params.params = param;
    }
    return this.request(params);
  },
  post: function(url, param) {
    return this.request({
      url,
      method: 'POST',
      data: param
    });
  },
  put: function(url, param) {
    return this.request({
      url,
      method: 'PUT',
      data: param
    });
  },
  patch: function(url, param) {
    return this.request({
      url,
      method: 'PATCH',
      data: param
    });
  },
  delete: function(url) {
    return this.request({
      url: url,
      method: 'DELETE'
    });
  },
  request: function(params) {
    return new Promise((resolve, reject) => {
      return instance
        .request(params)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          if (err && err.message) {
            HeyUI.$Message.error(err.message);
          }
          reject(err);
        });
    });
  }
};
export default ajax;
