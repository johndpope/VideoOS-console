import axios from "axios";
import qs from "querystring";

import config from "config";
import { getAuthority } from "utils/authority";

const { OS_API } = config;

export async function getLogs(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/operationLog/queryByPage?${qs.stringify(params)}`,
    method: "get"
  });
}
