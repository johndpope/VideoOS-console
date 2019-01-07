import { Feedback } from "@icedesign/base";
import { goBack as _goBack, push } from "react-router-redux";
import * as api from "./api";
import {
  SET_FORM_DATA,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  SET_EDIT_STATE
} from "./constants";

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

export const setFormData = payload => {
  return {
    type: SET_FORM_DATA,
    payload
  };
};

export const goBack = () => {
  return dispatch => {
    dispatch(_goBack());
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

export const getAdMaterials = params => {
  return async dispatch => {
    dispatch(getAdMaterialsRequest());
    try {
      const response = await api.getAdMaterials(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(getAdMaterialsSuccess(response.data));
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

export const setEditState = payload => {
  return {
    type: SET_EDIT_STATE,
    payload
  };
};
