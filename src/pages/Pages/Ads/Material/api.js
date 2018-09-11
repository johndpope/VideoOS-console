import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export const getAdMaterials = (params) => {
  return axios({
    headers: {
        token: getAuthority(),
    },
    url: `${OS_API}/creative/queryByPage?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  });  
};

export const getAdMaterialInfo = (params) => {
  return axios({
    headers: {
        token: getAuthority(),
    },
    url: `${OS_API}/creative/queryDetail?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  });  
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

export async function queryAllModelTypes() {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionType/queryAll `,
    method: 'get',
  })
};

export async function deleteMaterial(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/creative/delete`,
    method: 'post',
    data: params,
  })
};
  
export async function addMaterial(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/creative/add`,
    method: 'post',
    data: params,
  })
};
  
export async function updateMaterial(params) {
  return axios({
    headers: {
    token: getAuthority(),
    },
    url: `${OS_API}/creative/modify`,
    method: 'post',
    data: params,
  })
};

export async function addMaterialFile(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
      'Content-Type': 'multipart/form',
    },
    url: `${OS_API}/creative/addUpload`,
    method: 'post',
    data,
  });
};

export async function getIaModels(params = {
  currentPage: 1,
  pageSize: 20,
}) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionTemplate/queryByPage?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  })  
};