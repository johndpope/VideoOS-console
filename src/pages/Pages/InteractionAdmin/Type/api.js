import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export async function getIaTypes(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionType/queryByPage?${qs.stringify(params)}`,
    method: 'get',
  })  
};

export async function getIaTypeById(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionType/query?${qs.stringify(params)}`,
    method: 'get',
  })  
};

export async function deleteType(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionType/delete`,
    method: 'post',
    data: params,
  })
};

export async function addType(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionType/add`,
    method: 'post',
    data,
  })
};

export async function updateType(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionType/modify`,
    method: 'post',
    data: params,
  })
};