// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容

import IAModel from 'Pages/InteractionAdmin/Model';
import IAType from 'Pages/InteractionAdmin/Type';
import AAAccount from 'Pages/AuthorityAdmin/Account';
import AARole from 'Pages/AuthorityAdmin/Role';

const routerConfig = [
  {
    path: '/hd',
    exact: true,
    name: '互动管理',
    component: IAModel
  }, {
    path: '/hd/type',
    name: '类型管理',
    component: IAType
  }, {
    path: '/hd/model',
    name: '模版管理',
    component: IAModel
  }, {
    path: '/qx',
    exact: true,
    name: '权限管理',
    component: AAAccount
  }, {
    path: '/qx/account',
    name: '账号管理',
    component: AAAccount
  }, {
    path: '/qx/role',
    name: '角色管理',
    component: AARole
  },
];

export default routerConfig;
