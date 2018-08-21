import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export const getAdPlans = (params) => {
  return axios({
    headers: {
        token: getAuthority(),
    },
    url: `${OS_API}/launchPlan/queryByPage?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  });  
};

export const getAdPlanInfo = (params) => {
  return axios({
    headers: {
        token: getAuthority(),
    },
    url: `${OS_API}/launchPlan/queryDetail?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  });  
};

export async function deletePlan(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/launchPlan/delete`,
    method: 'post',
    data: params,
  })
};
  
export async function addPlan(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/launchPlan/add`,
    method: 'post',
    data: params,
  })
};
  
export async function updatePlan(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/launchPlan/modify`,
    method: 'post',
    data: params,
  })
};