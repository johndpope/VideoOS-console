import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export async function getAaAccounts(params = {
  currentPage: 1,
  pageSize: 20,
}) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/user/queryByPage?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  })  
};

export async function deleteAaAccount(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/user/delete`,
    method: 'post',
    data: params,  
  })  
};

export async function addAaAccount(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/user/add`,
    method: 'post',
    data: params,  
  })  
};

export async function updateAaAccount(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/user/update`,
    method: 'post',
    data: params,  
  })  
};

export async function queryAllAccountTypes() {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/role/queryAll `,
    method: 'get',
  })
};