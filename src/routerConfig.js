// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容

import IAModel from "Pages/InteractionAdmin/Model";
import IAType from "Pages/InteractionAdmin/Type";
import AAAccount from "Pages/AuthorityAdmin/Account";
import AARole from "Pages/AuthorityAdmin/Role";
import AdMaterial from "Pages/Ads/Material";
import AdPlan from "Pages/Ads/Plan";
import MaterialCRUD from "Pages/Ads/MaterialCRUD/MaterialCRUD";
import SelectTheme from "Pages/Ads/SelectTheme/SelectTheme";
import License from "Pages/License";
import Log from "Pages/Log";
import PlanCRUD from "./pages/Pages/Ads/PlanCRUD/PlanCRUD";
import statis from "Pages/Ads/Statistics"; //数据统计
const routerConfig = [
  {
    path: "/hd",
    exact: true,
    name: "互动管理",
    component: IAModel
  },
  {
    path: "/hd/type",
    name: "应用管理",
    component: IAType
  },
  {
    path: "/hd/model",
    name: "主题管理",
    component: IAModel
  },
  {
    path: "/qx",
    exact: true,
    name: "权限管理",
    component: AAAccount
  },
  {
    path: "/qx/account",
    name: "账号管理",
    component: AAAccount
  },
  {
    path: "/qx/role",
    name: "角色管理",
    component: AARole
  },
  {
    path: "/tf",
    exact: true,
    name: "投放管理",
    component: AdPlan
  },
  {
    path: "/tf/plan",
    exact: true,
    name: "投放计划管理",
    component: AdPlan
  },
  {
    path: "/tf/plan/selT",
    exact: true,
    name: "选择互动应用",
    component: SelectTheme
  },
  {
    path: "/tf/plan/selT/crud",
    name: "新增投放计划",
    component: PlanCRUD
  },
  {
    path: "/tf/plan/read",
    name: "投放计划详情",
    component: PlanCRUD
  },
  {
    path: "/tf/material",
    exact: true,
    name: "投放素材管理",
    component: AdMaterial
  },
  {
    path: "/tf/material/selT",
    exact: true,
    name: "选择互动应用",
    component: SelectTheme
  },
  {
    path: "/tf/material/selT/crud/",
    name: "创建素材",
    component: MaterialCRUD
  },
  {
    path: "/tf/material/read/",
    name: "素材详情",
    component: MaterialCRUD
  },
  {
    path: "/tf/material/update/",
    name: "修改素材",
    component: MaterialCRUD
  },
  {
    path: "/zs",
    name: "license申请",
    component: License
  },
  {
    path: "/rz/log",
    name: "日志信息管理",
    component: Log
  },
  {
    path: "/tf/statisticsg",
    name: "数据统计",
    component: statis
  }
];

export default routerConfig;
