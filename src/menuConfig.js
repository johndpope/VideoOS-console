// 菜单配置
// defaultMenuConfig：脚手架默认侧边栏配置
// asideMenuConfig：自定义侧边导航配置

const defaultMenuConfig = {
  items: [
    {
      name: "首页",
      path: "/home",
      icon: "icon-home",
      external: true
    },
    {
      name: "互动管理",
      path: "/hu",
      icon: "icon-star",
      children: [
        {
          id: 11,
          name: "类型管理",
          path: "/hd/type"
        },
        {
          id: 13,
          name: "类型管理",
          path: "/hd/type",
          readOnly: true
        },
        {
          id: 12,
          name: "模版管理",
          path: "/hd/model"
        },
        {
          id: 14,
          name: "模版管理",
          path: "/hd/model",
          readOnly: true
        }
      ]
    },
    {
      name: "投放管理",
      path: "/tf",
      icon: "icon-list",
      children: [
        {
          id: 21,
          name: "投放计划管理",
          path: "/tf/plan"
        },
        {
          id: 24,
          name: "投放计划管理",
          path: "/tf/plan",
          readOnly: true
        },
        {
          id: 22,
          name: "投放素材管理",
          path: "/tf/material"
        },
        {
          id: 25,
          name: "投放素材管理",
          path: "/tf/material",
          readOnly: true
        }
      ]
    },
    {
      name: "license申请",
      path: "/zs",
      icon: "icon-map",
      external: true
    },
    {
      name: "权限管理",
      path: "/qx",
      icon: "icon-user",
      children: [
        {
          id: 61,
          name: "角色管理",
          path: "/qx/role"
        },
        {
          id: 63,
          name: "角色管理",
          path: "/qx/role",
          readOnly: true
        },
        {
          id: 62,
          name: "账号管理",
          path: "/qx/account"
        },
        {
          id: 64,
          name: "账号管理",
          path: "/qx/account",
          readOnly: true
        }
      ]
    }
  ]
};

const asideMenuConfig = [];

/**
 * 转化 name 为 url
 * @param {Array} data
 */
function formatter(data) {
  return data.map(item => {
    const result = {
      ...item,
      url: item.path
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
