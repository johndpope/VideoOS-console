/*
 * Material Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { push } from "react-router-redux";
import { Feedback } from "@icedesign/base";
import querystring from "querystring";
import * as api from "./api";
import {
  SHOW_DELETE_MATERIAL_MODAL,
  HIDE_DELETE_MATERIAL_MODAL,
  SHOW_NEW_MATERIAL_DROPDOWN,
  HIDE_NEW_MATERIAL_DROPDOWN,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  DELETE_METERIAL_REQUEST,
  DELETE_METERIAL_SUCCESS,
  DELETE_METERIAL_FAILURE,
  SET_CURRENT_PAGE
} from "./constants";

let newMaterialDropDownSwitch = false;
let addMaterialSwitch = false;
let deleteMaterialModalSwitch = false;

const showNewMaterialDropDown = () => {
  return {
    type: SHOW_NEW_MATERIAL_DROPDOWN,
    shouldOpen: true
  };
};

const hideNewMaterialDropDown = () => {
  return {
    type: HIDE_NEW_MATERIAL_DROPDOWN,
    shouldOpen: false
  };
};

const showDeleteMaterialModal = payload => {
  return {
    type: SHOW_DELETE_MATERIAL_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideDeleteMaterialModal = () => {
  return {
    type: HIDE_DELETE_MATERIAL_MODAL,
    shouldOpen: false
  };
};

const getAdMaterialsRequest = () => {
  return {
    type: GET_AD_METERIALS_REQUEST,
    isLoading: true
  };
};

const getAdMaterialsSuccess = payload => {
  return {
    type: GET_AD_METERIALS_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdMaterialsFailure = () => {
  return {
    type: GET_AD_METERIALS_FAILURE,
    isLoading: false
  };
};

const queryAllModelTypesRequest = () => {
  return {
    type: QUERY_ALL_MODELTYPES_REQUEST,
    isLoading: true
  };
};

const queryAllModelTypesSuccess = payload => {
  return {
    type: QUERY_ALL_MODELTYPES_SUCCESS,
    payload,
    isLoading: false
  };
};

const queryAllModelTypesFailure = () => {
  return {
    type: QUERY_ALL_MODELTYPES_FAILURE,
    isLoading: false
  };
};

const deleteMaterialRequest = () => {
  return {
    type: DELETE_METERIAL_REQUEST,
    isLoading: true
  };
};

const deleteMaterialSuccess = () => {
  return {
    type: DELETE_METERIAL_SUCCESS,
    isLoading: false
  };
};

const deleteMaterialFailure = () => {
  return {
    type: DELETE_METERIAL_FAILURE,
    isLoading: false
  };
};

export const getAdMaterials = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getAdMaterialsRequest());
    try {
      const response = await api.getAdMaterials(params);

      if (response.status === 200 && response.data.resCode === "00") {
        const { totalPage } = response.data;
        if (totalPage <= 0) {
          dispatch(getAdMaterialsSuccess([]));
          return;
        }
        if (params.currentPage <= totalPage) {
          dispatch(getAdMaterialsSuccess(response.data));
        } else {
          params.currentPage = totalPage;
          dispatch(setCurrentPage({ currentPage: totalPage }));
          dispatch(getAdMaterials(params));
        }
      } else {
        dispatch(getAdMaterialsFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getAdMaterialsFailure(error));
    }
  };
};

export const queryAllModelTypes = params => {
  return async dispatch => {
    dispatch(queryAllModelTypesRequest());
    try {
      const response = await api.queryAllModelTypes(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(
          queryAllModelTypesSuccess(
            response.data && response.data.interactionInfoList
          )
        );
      } else {
        dispatch(queryAllModelTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(queryAllModelTypesFailure(error));
    }
  };
};

export const deleteMaterial = params => {
  return async dispatch => {
    dispatch(deleteMaterialRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.deleteMaterial(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(deleteMaterialSuccess(response.data));
        dispatch(deleteMaterialModalToggle());
        dispatch(
          getAdMaterials({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deleteMaterialFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(deleteMaterialFailure());
    }
  };
};

export const addMaterialToggle = payload => {
  return dispatch => {
    dispatch(
      push(
        `/sc/crud?id=${(payload && payload.interactionTypeId) ||
          payload.interactionId}&interactionTypeName=${encodeURIComponent(
          payload && payload.interactionTypeName
        )}&opType=${payload && payload.opType}&creativeId=${payload &&
          payload.creativeId}`
      )
    );
    // dispatch(push(`/sc/crud?${querystring.stringify(payload)}`));
  };
};

export const deleteMaterialModalToggle = payload => {
  return dispatch => {
    deleteMaterialModalSwitch = !deleteMaterialModalSwitch;
    if (deleteMaterialModalSwitch) {
      dispatch(showDeleteMaterialModal(payload));
    } else {
      dispatch(hideDeleteMaterialModal());
    }
  };
};

export const newMaterialDropDownToggle = () => {
  return dispatch => {
    newMaterialDropDownSwitch = !newMaterialDropDownSwitch;
    if (newMaterialDropDownSwitch) {
      dispatch(showNewMaterialDropDown());
    } else {
      dispatch(hideNewMaterialDropDown());
    }
  };
};

export const setCurrentPage = payload => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
};
