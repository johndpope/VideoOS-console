import axios from 'axios';

import config from 'config';

const { OS_API } = config;

export async function logout(params) {
  return axios({
    url: `${OS_API}/logout`,
    method: 'post',
    data: params,  
  })  
};