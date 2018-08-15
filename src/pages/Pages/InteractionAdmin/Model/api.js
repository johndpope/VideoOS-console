import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export async function getIaModels(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionTemplate/queryByPage?${qs.stringify(params)}`,
    method: 'get',
    data: params,  
  })  
};

export async function deleteModel(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionTemplate/delete`,
    method: 'post',
    data: params,
  })
};

export async function addModel(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionTemplate/confirmAdd`,
    method: 'post',
    data: params,
  })
};

export async function updateModel(params) {
  return axios({
    headers: {
      token: getAuthority(),
    },
    url: `${OS_API}/interactionTemplate/confirmUpdate`,
    method: 'post',
    data: params,
  })
};

export async function uploadModelFile(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
      contentType: 'multipart/form',
    },
    url: `${OS_API}/interactionTemplate/addUpload`,
    method: 'post',
    data,
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

