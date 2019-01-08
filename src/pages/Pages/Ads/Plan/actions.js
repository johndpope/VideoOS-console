/*
 * Plan Actions
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

import { Feedback } from "@icedesign/base";
import { push } from "react-router-redux";
import qs from "querystring";
import * as api from "./api";
import {
  SHOW_ADD_PLAN,
  HIDE_ADD_PLAN,
  SHOW_DELETE_PLAN,
  HIDE_DELETE_PLAN,
  GET_AD_PLANS_REQUEST,
  GET_AD_PLANS_SUCCESS,
  GET_AD_PLANS_FAILURE,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  SET_FORM_DATA,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  SET_CURRENT_PAGE,
  SET_EDIT_STATE
} from "./constants";

let addPlanSwitch = false;
let deletePlanSwitch = false;

const showAddPlan = payload => {
  return {
    type: SHOW_ADD_PLAN,
    shouldOpen: true,
    payload
  };
};

const hideAddPlan = () => {
  return {
    type: HIDE_ADD_PLAN,
    shouldOpen: false
  };
};

const showDeletePlan = payload => {
  return {
    type: SHOW_DELETE_PLAN,
    shouldOpen: true,
    payload
  };
};

const hideDeletePlan = () => {
  return {
    type: HIDE_DELETE_PLAN,
    shouldOpen: false
  };
};

const getAdPlansRequest = () => {
  return {
    type: GET_AD_PLANS_REQUEST,
    isLoading: true
  };
};

const getAdPlansSuccess = payload => {
  return {
    type: GET_AD_PLANS_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdPlansFailure = () => {
  return {
    type: GET_AD_PLANS_FAILURE,
    isLoading: false
  };
};

const deletePlanRequest = () => {
  return {
    type: DELETE_PLAN_REQUEST,
    isLoading: true
  };
};

const deletePlanSuccess = () => {
  return {
    type: DELETE_PLAN_SUCCESS,
    isLoading: false
  };
};

const deletePlanFailure = () => {
  return {
    type: DELETE_PLAN_FAILURE,
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

export const getAdPlans = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getAdPlansRequest());
    try {
      const response = await api.getAdPlans(params);

      if (response.status === 200 && response.data.resCode === "00") {
        const { totalPage } = response.data;
        if (totalPage <= 0) {
          dispatch(getAdPlansSuccess([]));
          return;
        }
        if (params.currentPage <= totalPage) {
          dispatch(getAdPlansSuccess(response.data));
        } else {
          params.currentPage = totalPage;
          dispatch(setCurrentPage({ currentPage: totalPage }));
          dispatch(getAdPlans(params));
        }
      } else {
        dispatch(getAdPlansFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getAdPlansFailure(error));
    }
  };
};

export const deletePlan = params => {
  return async dispatch => {
    dispatch(deletePlanRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      const launchTimeType = params && params.launchTimeType;
      const interactionTypeId = params && params.interactionTypeId;
      delete params.currentPage;
      const response = await api.deletePlan(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(deletePlanSuccess(response.data));
        dispatch(deletePlanModalToggle());
        dispatch(
          getAdPlans({
            currentPage,
            pageSize: 20,
            interactionTypeId,
            launchTimeType
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deletePlanFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(deletePlanFailure());
    }
  };
};

export const addPlanModalToggle = payload => {
  return dispatch => {
    dispatch(
      push(
        `/tf/plan/read?${qs.stringify({
          launchPlanId: payload.launchPlanId,
          opType: payload.opType,
          interactionTypeName: payload.interactionTypeName
            ? payload.interactionTypeName
            : ""
        })}`
      )
    );
  };
};

export const deletePlanModalToggle = payload => {
  return dispatch => {
    deletePlanSwitch = !deletePlanSwitch;
    if (deletePlanSwitch) {
      dispatch(showDeletePlan(payload));
    } else {
      dispatch(hideDeletePlan());
    }
  };
};

export const newPlanDropDownToggle = () => {
  return dispatch => {
    dispatch(push(`/tf/plan/selT`));
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

export const setFormData = payload => {
  return {
    type: SET_FORM_DATA,
    payload
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

export const setCurrentPage = payload => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
};
