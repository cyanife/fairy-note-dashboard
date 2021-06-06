import Vue from 'vue';
import App from './App.vue';
import routerConfig from './router';
import store from './store';

import './common/component-config';
import './common/filters';

require('./css/app.less');

// 使用mock文件， 自己开发的时候请删除
require('./mock/index');

Vue.config.productionTip = false;
Vue.use(HeyUI);

HeyUI.initDict({
  muteTime: {
    1: '1分钟',
    10: '10分钟',
    30: '30分钟',
    60: '1小时',
    480: '8小时',
    1440: '1天',
    4320: '3天',
    10080: '7天',
    43200: '30天',
    259200: '180天',
    518400: '360天'
  }
});

const router = routerConfig();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
