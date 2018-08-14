// 菜单配置
// defaultMenuConfig：脚手架默认侧边栏配置
// asideMenuConfig：自定义侧边导航配置

const defaultMenuConfig = {
  items: [
    {
      name: '互动管理',
      path: 'hu',
      icon: 'icon-star',
      children: [
        {
          name: '类型管理',
          path: '/hd/type'
        }, {
          name: '模版管理',
          path: '/hd/model'
        }
      ]
    }, {
      name: '权限管理',
      path: 'qx',
      icon: 'icon-user',
      children: [
        {
          name: '账号管理',
          path: '/qx/account'
        }, {
          name: '角色管理',
          path: '/qx/role'
        },
      ]
    },
  ],
};

const asideMenuConfig = [];

/**
 * 转化 name 为 url
 * @param {Array} data
 */
function formatter(data) {
  return data.map((item) => {
    const result = {
      ...item,
      url: item.path,
    };
    if (item.children) {
      result.children = formatter(item.children);
    }
    return result;
  });
}

defaultMenuConfig.items = formatter(defaultMenuConfig.items).concat(
  asideMenuConfig
);

export default defaultMenuConfig;
