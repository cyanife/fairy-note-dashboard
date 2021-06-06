// import users from './users';
const Mock = require('mockjs');

let Random = Mock.Random;
Random.natural();
Random.date();
Random.cname();
Random.name();
Random.csentence();
Random.datetime();
Random.cword();
Random.string();
Random.email();
Random.boolean();

Mock.setup({
  timeout: 500
});

Mock.mock('/api/auth/jwt/login', 'post', {
  access_token: 'token',
  token_type: 'bearer'
});

Mock.mock('/api/auth/jwt/refresh', 'post', {
  access_token: 'newToken',
  token_type: 'bearer'
});

Mock.mock('/api/auth/me', 'get', {
  id: 'user',
  email: 'user@foo.bar',
  is_active: true,
  is_superuser: true
});

Mock.mock('/api/dashboard', 'get', {
  trendData: {
    xAxis: { data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
    series: [
      {
        name: '弹幕数量',
        data: [
          '@natural(1000,9999)',
          '@natural(1000,9999)',
          '@natural(1000,9999)',
          '@natural(1000,9999)',
          '@natural(1000,9999)',
          '@natural(1000,9999)',
          '@natural(1000,9999)'
        ]
      }
    ],
    timestamp: '@natural'
  },
  stackedData: {
    xAxis: { data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
    series: [
      {
        name: '普通用户',
        data: [
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)'
        ]
      },
      {
        name: '粉丝团用户',
        data: [
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)'
        ]
      },
      {
        name: '贵族用户',
        data: [
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)',
          '@natural(1000,2000)'
        ]
      }
    ]
  },
  rankingData: {
    series: [
      {
        name: '发送弹幕数',
        data: [
          { name: '@cname', value: '@natural(1000,2000)' },
          { name: '@cname', value: '@natural(1000,2000)' },
          { name: '@cname', value: '@natural(1000,2000)' },
          { name: '@cname', value: '@natural(1000,2000)' },
          { name: '@cname', value: '@natural(1000,2000)' }
        ]
      }
    ]
  }
});

Mock.mock(/\/api\/barrages/, 'get', {
  'barrages|50-200': [
    {
      id: '@natural(1,10000)',
      userid: '@natural(1,10000)',
      nickname: '@string(5,20)',
      time: '@datetime',
      chatmsg: {
        ic: 'https://i.pravatar.cc/300',
        level: '@natural(1,120)',
        bnn: '@cword(0,3)',
        bl: '@natural(0,30)',
        txt: '@csentence(5,80)'
      }
    }
  ],
  messages: [{ type: 'warn', text: '符合条件的记录过多，显示最近的1000条弹幕。' }]
});

Mock.mock('/api/users', 'get', {
  'users|50-100': [
    {
      id: '@natural(1,200)',
      name: '@cname',
      email: '@email',
      is_active: '@boolean',
      is_superuser: '@boolean'
    }
  ]
});

Mock.mock(/\/api\/management\/\w+/, 'post', {
  message: '已添加。'
});

Mock.mock(/\/api\/management\/\w+\/\d+/, 'patch', {
  message: '已更新。'
});

Mock.mock(/\/api\/management\/\w+\/\d+\/\w+/, 'patch', {
  message: '已更新。'
});

Mock.mock(/\/api\/management\/\w+\/\d+/, 'delete', {
  message: '已删除。'
});

Mock.mock(/\/api\/user\/\d+\/password/, 'post', {
  ok: true
});
