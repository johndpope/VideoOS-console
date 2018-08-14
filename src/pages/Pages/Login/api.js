import axios from 'axios';

import config from 'config';

const { OS_API } = config;

export async function login(params) {
  return axios({
    url: `${OS_API}/login`,
    method: 'post',
    data: params,  
  })  
};