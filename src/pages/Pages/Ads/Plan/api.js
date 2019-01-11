import axios from "axios";
import qs from "querystring";

import config from "config";
import { getAuthority } from "utils/authority";

const { OS_API } = config;

export const getAdPlans = params => {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/launchplan/queryByPage?${qs.stringify(params)}`,
    method: "get",
    data: params
  });
};

export async function deletePlan(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/launchplan/offline`,
    method: "post",
    data: params
  });
}

export async function launchPlan(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/launchplan/launch`,
    method: "post",
    data: params
  });
}

export async function queryAllModelTypes() {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionType/queryAll `,
    method: "get"
  });
}

export const getAdMaterials = params => {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/creative/queryAll?${qs.stringify(params)}`,
    method: "get"
  });
};
