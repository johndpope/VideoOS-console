import axios from "axios";
import qs from "querystring";

import config from "config";
import { getAuthority } from "utils/authority";

const { OS_API } = config;

export async function getIaModels(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionTemplate/queryByPage?${qs.stringify(params)}`,
    method: "get"
  });
}

export async function deleteModel(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionTemplate/delete`,
    method: "post",
    data: params
  });
}

export async function addModel(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
      "Content-Type": "multipart/form"
    },
    // url: `${OS_API}/interactionTemplate/confirmAdd`,
    url: `${OS_API}/template/add`,
    method: "post",
    data
  });
}

export async function updateModel(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
      "Content-Type": "multipart/form"
    },
    // url: `${OS_API}/interactionTemplate/confirmUpdate`,
    url: `${OS_API}/template/update`,
    method: "post",
    data
  });
}

export async function uploadModelFile(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
      "Content-Type": "multipart/form"
    },
    url: `${OS_API}/interactionTemplate/addUpload`,
    method: "post",
    data
  });
}

export async function queryAllModelTypes() {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/interactionType/queryAll `,
    method: "get"
  });
}

export async function getModelInfoById(params) {
  return axios({
    headers: {
      token: getAuthority()
    },
    url: `${OS_API}/template/queryDetail?${qs.stringify(params)}`,
    method: "get"
  });
}

export function downloadModelTemplateFile(params) {
  // return axios({
  //   headers: {
  //     token: getAuthority()
  //   },
  //   url: `${OS_API}/template/download`,
  //   method: "post",
  //   data: params
  // });
  let anchor = document.createElement("a");
  let href = `${OS_API}/template/getdown?templateId=${
    params.templateId
  }&token=${getAuthority()}`;
  anchor.style.visibility = "hidden";
  anchor.href = href;
  if ("download" in anchor) {
    anchor.target = "_blank";
  }
  anchor.download = "模版文件.zip";
  document.body.appendChild(anchor);
  let evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  anchor.dispatchEvent(evt);
  document.body.removeChild(anchor);
}

export async function updateModelFile(params) {
  let data = new FormData();
  for (let key in params) {
    data.append(key, params[key]);
  }
  return axios({
    headers: {
      token: getAuthority(),
      "Content-Type": "multipart/form"
    },
    url: `${OS_API}/interactionTemplate/updateUpload`,
    method: "post",
    data
  });
}
