import axios from 'axios';
import qs from 'querystring';

import config from 'config';
import { getAuthority } from 'utils/authority';

const { OS_API } = config;

export async function logout(params) {
  return axios({
    url: `${OS_API}/logout`,
    method: 'post',
    data: params,  
  })  
};

export async function resetPassword(params) {
  return axios({
    url: `${OS_API}/user/update`,
    headers: {
      token: getAuthority(),
    },
    method: 'post',
    data: params,  
  });
};

export async function isTokenValid(params) {
  return axios({
    url: `${OS_API}/token/isTokenValid?${qs.stringify(params)}`,
    method: 'post',
    data: params,  
  })  
};
