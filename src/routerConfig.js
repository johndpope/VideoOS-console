// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容

import IAModel from 'Pages/InteractionAdmin/Model';
import IAType from 'Pages/InteractionAdmin/Type';
import AAAccount from 'Pages/AuthorityAdmin/Account';
import AARole from 'Pages/AuthorityAdmin/Role';
import AdMaterial from 'Pages/Ads/Material';
import AdPlan from 'Pages/Ads/Plan';
import License from 'Pages/License';

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
  }, {
    path: '/tf',
    exact: true,
    name: '投放管理',
    component: AdPlan
  }, {
    path: '/tf/plan',
    name: '投放计划管理',
    component: AdPlan
  }, {
    path: '/tf/material',
    name: '投放素材管理',
    component: AdMaterial,
  }, {
    path: '/zs',
    name: 'license申请',
    component: License,
  }
];

export default routerConfig;
