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
    data: params,  
  })  
}