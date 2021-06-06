import Vue from 'vue';
import VueRouter from 'vue-router';
import appFrame from '../views/app-frame.vue';
import store from '../store';

Vue.use(VueRouter);

const initRouter = () => {
  const routes = [
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/login/index.vue'], resolve)
    },
    {
      path: '/system-error',
      name: 'SystemError',
      component: resolve => require(['@/components/error-pages/500'], resolve),
      meta: { title: '服务器错误' }
    },
    {
      path: '/permission-error',
      name: 'PermissionError',
      component: resolve => require(['@/components/error-pages/403'], resolve),
      meta: { title: '无访问权限' }
    },
    {
      path: '/notfound-error',
      name: 'NotfoundError',
      component: resolve => require(['@/components/error-pages/404'], resolve),
      meta: { title: '页面不存在' }
    },
    {
      path: '/',
      component: appFrame,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '',
          name: 'Home',
          component: resolve => require(['@/components/dashboard/index'], resolve),
          meta: { title: '首页', icon: 'icon-monitor' }
        },
        {
          path: 'barrages',
          name: 'Barrages',
          component: resolve => require(['@/components/barrages'], resolve),
          meta: { title: '历史弹幕' }
        },
        {
          path: 'recent',
          name: 'Recent',
          component: resolve => require(['@/components/recent'], resolve),
          meta: { title: '全站发言' }
        },
        {
          path: 'users',
          name: 'Users',
          component: resolve => require(['@/components/users'], resolve),
          meta: { title: '用户管理' }
        }
      ]
    },
    {
      path: '*',
      name: 'CommonNotfoundError',
      component: resolve => require(['@/components/error-pages/404'], resolve),
      meta: { title: '页面不存在' }
    }
  ];

  let router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

  router.beforeEach(async (to, from, next) => {
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 弹幕助手';
    } else {
      document.title = '弹幕助手';
    }
    if (to.matched.some(record => record.meta.requireAuth)) {
      if (store.getters.token) {
        if (!store.getters.isAuthed) {
          try {
            await store.dispatch('updateUser');
            if (store.getters.isAuthed) {
              console.log('here');
              next();
            } else {
              next({ name: 'Login' });
            }
          } catch {
            next({ name: 'Login' });
          }
        } else {
          next();
        }
      } else {
        next({ name: 'Login' });
      }
    } else {
      next();
    }
  });

  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
  });
  return router;
};

export default initRouter;
