import axios from 'axios';

import config from 'config';

const { OS_API } = config;

export async function login(params) {
  return axios({
    url: `http://10.66.88.157:18005/video/login`,
    method: 'post',
    data: params,  
  })  
}