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
  SHOW_DELETE_PLAN,
  HIDE_DELETE_PLAN,
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
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  SET_FORM_DATA,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  GET_PLAN_INFO_REQUEST,
  GET_PLAN_INFO_SUCCESS,
  GET_PLAN_INFO_FAILURE,
  SET_CURRENT_PAGE,
} from './constants';

let newPlanDropDownSwitch = false;
let addPlanSwitch = false;
let deletePlanSwitch = false;

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

const showAddPlan = (payload) => {
  return {
    type: SHOW_ADD_PLAN,
    shouldOpen: true,
    payload,
  }
};

const hideAddPlan = () => {
  return {
    type: HIDE_ADD_PLAN,
    shouldOpen: false,
  }
};

const showDeletePlan = (payload) => {
  return {
    type: SHOW_DELETE_PLAN,
    shouldOpen: true,
    payload,
  }
};

const hideDeletePlan = () => {
  return {
    type: HIDE_DELETE_PLAN,
    shouldOpen: false,
  }
};

const getAdPlansRequest = () => {
    return {
      type: GET_AD_PLANS_REQUEST,
      isLoading: true,
    };
  };
  
  const getAdPlansSuccess = (payload) => {
    return {
      type: GET_AD_PLANS_SUCCESS,
      isLoading: false,
      payload,
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
  
  const getAdPlanByIdSuccess = (payload) => {
    return {
      type: GET_AD_PLAN_BYID_SUCCESS,
      isLoading: false,
      payload,
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

  const queryAllModelTypesRequest = () => {
    return {
      type: QUERY_ALL_MODELTYPES_REQUEST,
      isLoading: true,
    };
  };
  
  const queryAllModelTypesSuccess = (payload) => {
    return {
      type: QUERY_ALL_MODELTYPES_SUCCESS,
      payload,
      isLoading: false,
    };
  };
  
  const queryAllModelTypesFailure = () => {
    return {
      type: QUERY_ALL_MODELTYPES_FAILURE,
      isLoading: false,
    };
  };

  const getAdMaterialsRequest = () => {
    return {
      type: GET_AD_METERIALS_REQUEST,
      isLoading: true,
    };
  };
  
  const getAdMaterialsSuccess = (payload) => {
    return {
      type: GET_AD_METERIALS_SUCCESS,
      isLoading: false,
      payload,
    };
  };
  
  const getAdMaterialsFailure = () => {
    return {
      type: GET_AD_METERIALS_FAILURE,
      isLoading: false,
    };
  };

export const getAdPlans = (params = {
  currentPage: 1,
  pageSize: 20,
}) => {
  return async (dispatch) => {
    dispatch(getAdPlansFailure());
    try {
      const response = await api.getAdPlans(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(getAdPlansSuccess(response.data));
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

export const addPlan = (params) => {
  return async (dispatch) => {
    dispatch(addPlanRequest());
    try {
      const _params = Object.assign({}, params);
      _params.launchDateStart = _params.launchDateStart.toString();
      _params.launchDateEnd = _params.launchDateEnd.toString();
      _params.launchTime = `${_params.launchTime.hour()}:${_params.launchTime.minutes() < 10 ? ('0' + _params.launchTime.minutes()) : _params.launchTime.minutes()}`
      const response = await api.addPlan(_params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(addPlanSuccess(response.data));
        dispatch(addPlanModalToggle());
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
        dispatch(addPlanModalToggle());
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
        dispatch(deletePlanModalToggle());
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

export const addPlanModalToggle = (payload) => {
  return (dispatch) => {
    addPlanSwitch = !addPlanSwitch;
    if (addPlanSwitch) {
      if (payload && payload.opType) {
        dispatch(getAdPlanInfo({launchPlan: payload && payload.launchPlanId}));
      }
      dispatch(getAdMaterials());
      dispatch(setFormData(payload));
      dispatch(showAddPlan(payload));
    } else {
      dispatch(setFormData({}));
      dispatch(hideAddPlan());
    }
  };
};  

export const deletePlanModalToggle = (payload) => {
  return (dispatch) => {
    deletePlanSwitch = !deletePlanSwitch;
    if (deletePlanSwitch) {
      dispatch(showDeletePlan(payload));
    } else {
      dispatch(hideDeletePlan());
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

export const queryAllModelTypes = (params) => {
  return async (dispatch) => {
    dispatch(queryAllModelTypesRequest());
    try {
      const response = await api.queryAllModelTypes(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(queryAllModelTypesSuccess(response.data && response.data.interactionInfoList));
      } else {
        dispatch(queryAllModelTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(queryAllModelTypesFailure(error));
    }
  };
};

export const setFormData = (payload) => {
  return {
    type: SET_FORM_DATA,
    payload,
  }
};

export const getAdMaterials = (params = {
  currentPage: 1,
  pageSize: 20,
}) => {
  return async (dispatch) => {
    dispatch(getAdMaterialsRequest());
    try {
      const response = await api.getAdMaterials(params);

      if (response.status === 200 && response.data.resCode === '00') {

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

export const getAdPlanInfo = (params) => {
  return async (dispatch) => {
    dispatch(getAdPlanByIdRequest());
    try {
      const response = await api.getAdPlanInfo(params);

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

export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  }
};
  