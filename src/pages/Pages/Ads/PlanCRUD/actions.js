import { Feedback } from "@icedesign/base";
import { goBack as _goBack, push } from "react-router-redux";
import * as api from "./api";
import {
  SET_FORM_DATA,
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAILURE,
  UPDATE_PLAN_REQUEST,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  GET_AD_PLAN_BYID_REQUEST,
  GET_AD_PLAN_BYID_SUCCESS,
  GET_AD_PLAN_BYID_FAILURE,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  SET_WHICH_STEP,
  SET_EDIT_STATE,
  QUERY_INTERACTION_INFO_SUCCESS,
  QUERY_INTERACTION_INFO_REQUEST,
  QUERY_INTERACTION_INFO_FAILURE
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

const queryInteractiveInfoRequest = () => {
  return {
    type: QUERY_INTERACTION_INFO_REQUEST,
    isLoading: true
  };
};

const queryInteractiveInfoSuccess = payload => {
  return {
    type: QUERY_INTERACTION_INFO_SUCCESS,
    isLoading: false,
    payload
  };
};

const queryInteractiveInfoFailure = () => {
  return {
    type: QUERY_INTERACTION_INFO_FAILURE,
    isLoading: false
  };
};

const getAdPlanByIdRequest = () => {
  return {
    type: GET_AD_PLAN_BYID_REQUEST,
    isLoading: true
  };
};

const getAdPlanByIdSuccess = payload => {
  return {
    type: GET_AD_PLAN_BYID_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdPlanByIdFailure = () => {
  return {
    type: GET_AD_PLAN_BYID_FAILURE,
    isLoading: false
  };
};

const addPlanRequest = () => {
  return {
    type: ADD_PLAN_REQUEST,
    isLoading: true
  };
};

const addPlanSuccess = () => {
  return {
    type: ADD_PLAN_SUCCESS,
    isLoading: false
  };
};

const addPlanFailure = () => {
  return {
    type: ADD_PLAN_FAILURE,
    isLoading: false
  };
};

const updatePlanRequest = () => {
  return {
    type: UPDATE_PLAN_REQUEST,
    isLoading: true
  };
};

const updatePlanSuccess = () => {
  return {
    type: UPDATE_PLAN_SUCCESS,
    isLoading: false
  };
};

const updatePlanFailure = () => {
  return {
    type: UPDATE_PLAN_FAILURE,
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

export const queryInteractionInfo = params => {
  return async dispatch => {
    dispatch(queryInteractiveInfoRequest());
    try {
      const response = await api.queryInteractionInfo(params);
      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(queryInteractiveInfoSuccess(response.data));
      } else {
        dispatch(queryInteractiveInfoFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(queryInteractiveInfoFailure(error));
    }
  };
};

export const getAdPlanInfo = params => {
  return async dispatch => {
    dispatch(getAdPlanByIdRequest());
    try {
      const response = await api.getAdPlanInfo(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(getAdPlanByIdSuccess(response.data));
      } else {
        dispatch(getAdPlanByIdFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getAdPlanByIdFailure(error));
    }
  };
};

export const addPlan = params => {
  return async dispatch => {
    dispatch(addPlanRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const _params = { ...params };
      if (_params.launchTimeType === "0" || _params.launchTimeType === "2") {
        _params.launchDateStart = `${_params.launchDateStart.years()}-${
          _params.launchDateStart.months() > 8
            ? _params.launchDateStart.months() + 1
            : "0" + (_params.launchDateStart.months() + 1)
        }-${
          _params.launchDateStart.date() > 9
            ? _params.launchDateStart.date()
            : "0" + _params.launchDateStart.date()
        }`;
        _params.launchDateEnd = `${_params.launchDateEnd.years()}-${
          _params.launchDateEnd.months() > 8
            ? _params.launchDateEnd.months() + 1
            : "0" + (_params.launchDateEnd.months() + 1)
        }-${
          _params.launchDateEnd.date() > 9
            ? _params.launchDateEnd.date()
            : "0" + _params.launchDateEnd.date()
        }`;
      }

      const response = await api.addPlan(_params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(addPlanSuccess(response.data));
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addPlanFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(addPlanFailure());
    }
  };
};

export const updatePlan = params => {
  return async dispatch => {
    dispatch(updatePlanRequest());
    try {
      const response = await api.updatePlan(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(updatePlanSuccess(response.data));
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updatePlanFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(updatePlanFailure());
    }
  };
};

export const setEditState = payload => {
  return {
    type: SET_EDIT_STATE,
    payload
  };
};

export const setWhichStep = payload => {
  return {
    type: SET_WHICH_STEP,
    payload
  };
};

export const gotoNext = params => {
  return async dispatch => {
    dispatch(setWhichStep({ whichStep: 2 }));
    dispatch(queryInteractionInfo(params));
  };
};
