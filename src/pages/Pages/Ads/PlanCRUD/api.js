import axios from "axios";
import qs from "querystring";

import config from "config";
import { getAuthority } from "utils/authority";

const { OS_API } = config;

export async function queryAllModelTypes() {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionType/queryAll `,
    method: "get"
  });
}
