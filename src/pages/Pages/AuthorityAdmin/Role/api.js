import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export async function getAaRoles(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/role/queryByPage?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  })  
};

export async function deleteAaRole(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/role/delete`,
    method: 'post',
    data: params,  
  })  
};

export async function addAaRole(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/role/add`,
    method: 'post',
    data: params,  
  })  
};

export async function updateAaRole(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/role/update`,
    method: 'post',
    data: params,  
  })  
};