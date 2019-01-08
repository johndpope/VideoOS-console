import axios from "axios";
import qs from "querystring";

import config from "config";
import { getAuthority } from "utils/authority";

const { OS_API } = config;

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

export const queryInteractionInfo = params => {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionType/queryInteractionInfo?${qs.stringify(
      params
    )}`,
    method: "get"
  });
};

export const getAdPlanInfo = params => {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/launchplan/queryDetail?${qs.stringify(params)}`,
    method: "get",
    data: params
  });
};

export async function addPlan(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/launchplan/add`,
    method: "post",
    data: params
  });
}

export async function updatePlan(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/launchplan/modify`,
    method: "post",
    data: params
  });
}
