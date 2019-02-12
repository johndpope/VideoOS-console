import axios from "axios";
import { getAuthority } from "utils/authority";
import config from "config";
import qs from "querystring";
const { OS_API } = config;
export const getAllProgram = () => {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionType/queryAll `,
    method: "get"
  });
};

export const getStatistics = params => {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/statistics/selectUserBehavior?${qs.stringify(params)}`,
    method: "get"
  });
};
