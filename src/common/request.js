import Ajax from './ajax';

const Request = {
  Auth: {
    changePassword(params) {
      return Ajax.post('/reset-password', params);
    }
  },
  Dashboard: {
    get() {
      return Ajax.get('/dashboard');
    }
  },
  Barrages: {
    get(params) {
      return Ajax.get('/barrages', params);
    }
  },
  Recent: {
    get(params) {
      let url = 'https://dyapi.fz996.com/api/Wx/GetDataBarrage?keyword=' + params.keyword;
      return fetch(url, {
        method: 'GET',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(resp => resp.json());
    }
  },
  FullText: {
    get(params) {
      return Ajax.get('/fulltext', params);
    }
  },
  Users: {
    getAll(params) {
      return Ajax.get('/users', params);
    },
    get(id, params) {
      return Ajax.get('/users/' + id, params);
    },
    add(params) {
      return Ajax.post('/users', params);
    },
    update(id, params) {
      return Ajax.put('/users/' + id, params);
    },
    delete(id) {
      return Ajax.delete('/users/' + id);
    },
    getCurrentUser(params) {
      return Ajax.get('/users/me', params);
    }
  }
};

export default Request;
