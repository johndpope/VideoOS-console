// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容

import IAModel from 'Pages/InteractionAdmin/Model';
import IAType from 'Pages/InteractionAdmin/Type';

const routerConfig = [
  {
    path: '/hd',
    exact: true,
    name: '互动管理',
    component: IAModel
  },
  {
    path: '/hd/type',
    name: '类型管理',
    component: IAType
  },
  {
    path: '/hd/model',
    name: '模版管理',
    component: IAModel
  },
];

export default routerConfig;
