const fullMenus = [
  {
    title: 'Dashboard',
    key: 'Home',
    icon: 'icon-monitor'
  },
  {
    title: '弹幕查询',
    key: 'Search',
    icon: 'icon-search',
    children: [
      {
        title: '历史弹幕',
        key: 'Barrages'
      },
      {
        title: '全站发言',
        key: 'Recent'
      }
    ]
  },
  {
    title: '系统管理',
    key: 'Manage',
    icon: 'icon-cog',
    children: [
      {
        title: '用户管理',
        key: 'Users'
      }
    ]
  }
];

export default fullMenus;
