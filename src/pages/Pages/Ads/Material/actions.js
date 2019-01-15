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
import * as api from "./api";
import * as constants from "./constants";

let deleteMaterialModalSwitch = false;

const showDeleteMaterialModal = payload => {
  return {
    type: constants.SHOW_DELETE_MATERIAL_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideDeleteMaterialModal = () => {
  return {
    type: constants.HIDE_DELETE_MATERIAL_MODAL,
    shouldOpen: false
  };
};

const getAdMaterialsRequest = () => {
  return {
    type: constants.GET_AD_METERIALS_REQUEST,
    isLoading: true
  };
};

const getAdMaterialsSuccess = payload => {
  return {
    type: constants.GET_AD_METERIALS_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdMaterialsFailure = () => {
  return {
    type: constants.GET_AD_METERIALS_FAILURE,
    isLoading: false
  };
};

const deleteMaterialRequest = () => {
  return {
    type: constants.DELETE_METERIAL_REQUEST,
    isLoading: true
  };
};

const deleteMaterialSuccess = () => {
  return {
    type: constants.DELETE_METERIAL_SUCCESS,
    isLoading: false
  };
};

const deleteMaterialFailure = () => {
  return {
    type: constants.DELETE_METERIAL_FAILURE,
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
        `/tf/material/${
          payload && payload.opType === "read" ? "read" : "update"
        }?id=${(payload && payload.interactionTypeId) ||
          payload.interactionId}&interactionTypeName=${encodeURIComponent(
          payload && payload.interactionTypeName
        )}&opType=${payload && payload.opType}&creativeId=${payload &&
          payload.creativeId}`
      )
    );
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
    dispatch(push(`/tf/material/selT`));
  };
};

export const setCurrentPage = payload => {
  return {
    type: constants.SET_CURRENT_PAGE,
    payload
  };
};
