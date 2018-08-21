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

import { Feedback } from '@icedesign/base';
import * as api from './api';
import {
  SHOW_ADD_PLAN,
  HIDE_ADD_PLAN,
  SHOW_NEW_PLAN_DROPDOWN,
  HIDE_NEW_PLAN_DROPDOWN,
  GET_AD_PLANS_REQUEST,
  GET_AD_PLANS_SUCCESS,
  GET_AD_PLANS_FAILURE,
  GET_AD_PLAN_BYID_REQUEST,
  GET_AD_PLAN_BYID_SUCCESS,
  GET_AD_PLAN_BYID_FAILURE,
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAILURE,
  UPDATE_PLAN_REQUEST,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
} from './constants';

let newPlanDropDownSwitch = false;
let addPlanSwitch = false;

const showNewPlanDropDown = () => {
  return {
    type: SHOW_NEW_PLAN_DROPDOWN,
    shouldOpen: true,
  }
};

const hideNewPlanDropDown = () => {
  return {
    type: HIDE_NEW_PLAN_DROPDOWN,
    shouldOpen: false,
  }
};

const showAddPlan = () => {
  return {
    type: SHOW_ADD_PLAN,
    shouldOpen: true,
  }
};

const hideAddPlan = () => {
  return {
    type: HIDE_ADD_PLAN,
    shouldOpen: false,
  }
};

const getAdPlansRequest = () => {
    return {
      type: GET_AD_PLANS_REQUEST,
      isLoading: true,
    };
  };
  
  const getAdPlansSuccess = () => {
    return {
      type: GET_AD_PLANS_SUCCESS,
      isLoading: false,
    };
  };
  
  const getAdPlansFailure = () => {
    return {
      type: GET_AD_PLANS_FAILURE,
      isLoading: false,
    };
  };
  
  const getAdPlanByIdRequest = () => {
    return {
      type: GET_AD_PLAN_BYID_REQUEST,
      isLoading: true,
    };
  };
  
  const getAdPlanByIdSuccess = () => {
    return {
      type: GET_AD_PLAN_BYID_SUCCESS,
      isLoading: false,
    };
  };
    
  const getAdPlanByIdFailure = () => {
    return {
      type: GET_AD_PLAN_BYID_FAILURE,
      isLoading: false,
    };
  };
  
  const addPlanRequest = () => {
    return {
      type: ADD_PLAN_REQUEST,
      isLoading: true,
    };
  };
  
  const addPlanSuccess = () => {
    return {
      type: ADD_PLAN_SUCCESS,
      isLoading: false,
    };
  };
  
  const addPlanFailure = () => {
    return {
      type: ADD_PLAN_FAILURE,
      isLoading: false,
    };
  };
  
  const updatePlanRequest = () => {
    return {
      type: UPDATE_PLAN_REQUEST,
      isLoading: true,
    };
  };
  
  const updatePlanSuccess = () => {
    return {
      type: UPDATE_PLAN_SUCCESS,
      isLoading: false,
    };
  };
  
  const updatePlanFailure = () => {
    return {
      type: UPDATE_PLAN_FAILURE,
      isLoading: false,
    };
  };
  
  const deletePlanRequest = () => {
    return {
      type: DELETE_PLAN_REQUEST,
      isLoading: true,
    };
  };
  
  const deletePlanSuccess = () => {
    return {
      type: DELETE_PLAN_SUCCESS,
      isLoading: false,
    };
  };
  
  const deletePlanFailure = () => {
    return {
      type: DELETE_PLAN_FAILURE,
      isLoading: false,
    };
  };

export const getAdPlans = (params = {
  currentPage: 1,
  pageSize: 20,
}) => {
  return async (dispatch) => {
    dispatch(getAdPlanByIdRequest());
    try {
      const response = await api.getAdPlans(params);

      if (response.status === 200 && response.data.resCode === '00') {

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

export const addPlan = (params) => {
  return async (dispatch) => {
    dispatch(addPlanRequest());
    try {
      const response = await api.addPlan(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(addPlanSuccess(response.data));
        // dispatch(hideAddModelModal());
        dispatch(getAdPlans());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addPlanFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(addPlanFailure());
    }
  };
};

export const updatePlan = (params) => {
  return async (dispatch) => {
    dispatch(updatePlanRequest());
    try {
      const response = await api.updatePlan(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(updatePlanSuccess(response.data));
        // dispatch(hideAddModelModal());
        dispatch(getAdPlans());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updatePlanFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(updatePlanFailure());
    }
  };
};

export const deletePlan = (params) => {
  return async (dispatch) => {
    dispatch(deletePlanRequest());
    try {
      const response = await api.deletePlan(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(deletePlanSuccess(response.data));
        // dispatch(hideAddModelModal());
        dispatch(getAdPlans());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deletePlanFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(deletePlanFailure());
    }
  };
};

export const addPlanToggle = () => {
  return (dispatch) => {
    addPlanSwitch = !addPlanSwitch;
    if (addPlanSwitch) {
      dispatch(showAddPlan());
    } else {
      dispatch(hideAddPlan());
    }
  };
};  

export const newPlanDropDownToggle = () => {
  return (dispatch) => {
    newPlanDropDownSwitch = !newPlanDropDownSwitch;
    if (newPlanDropDownSwitch) {
      dispatch(showNewPlanDropDown());
    } else {
      dispatch(hideNewPlanDropDown());
    }
  };
};
  