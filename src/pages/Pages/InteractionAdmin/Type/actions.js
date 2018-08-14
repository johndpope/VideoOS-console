/*
 * IAType Actions
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

import { push } from 'react-router-redux';
import { Feedback } from '@icedesign/base';
import * as api from './api';
// import { reloadAuthorized } from 'utils/Authorized';
import {
  GET_IATYPE_REQUEST,
  GET_IATYPE_SUCCESS,
  GET_IATYPE_FAILURE,
  SHOW_ADDTYPE_MODAL,
  HIDDEN_ADDTYPE_MODAL,
  SHOW_DELETETYPE_MODAL,
  HIDE_DELETETYPE_MODAL,
  ADD_TYPE_REQUEST,
  ADD_TYPE_SUCCESS,
  ADD_TYPE_FAILURE,
  DELETE_TYPE_REQUEST,
  DELETE_TYPE_SUCCESS,
  DELETE_TYPE_FAILURE,
  UPDATE_TYPE_REQUEST,
  UPDATE_TYPE_SUCCESS,
  UPDATE_TYPE_FAILURE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
let addTypeSwitch = false;
let deleteTypeSwitch = false;

const showAddTypeModal = () => {
  return {
    type: SHOW_ADDTYPE_MODAL,
    shouldOpen: true,
  }
};

const hideAddTypeModal = () => {
  return {
    type: HIDDEN_ADDTYPE_MODAL,
    shouldOpen: false,
  }
};

const showDeleteTypeModal = () => {
  return {
    type: SHOW_DELETETYPE_MODAL,
    shouldOpen: true,
  }
};

const hideDeleteTypeModal = () => {
  return {
    type: HIDE_DELETETYPE_MODAL,
    shouldOpen: false,
  }
};

const getIaTypesRequest = () => {
  return {
    type: GET_IATYPE_REQUEST,
    isLoading: true,
  };
};

const getIaTypesSuccess = (payload) => {
  return {
    type: GET_IATYPE_SUCCESS,
    payload,
    isLoading: false,
  };
};

const getIaTypesFailure = (payload) => {
  return {
    type: GET_IATYPE_FAILURE,
    payload,
    isLoading: false,
  };
};

const deleteTypeRequest = () => {
  return {
    type: DELETE_TYPE_REQUEST,
    isLoading: true,
  }
};

const deleteTypeSuccess = () => {
  return {
    type: DELETE_TYPE_SUCCESS,
    isLoading: false,
  }
};

const deleteTypeFailure = () => {
  return {
    type: DELETE_TYPE_FAILURE,
    isLoading: false,
  }
};

const addTypeRequest = () => {
  return {
    type: ADD_TYPE_REQUEST,
    isLoading: true,
  }
};

const addTypeSuccess = () => {
  return {
    type: ADD_TYPE_SUCCESS,
    isLoading: false,
  }
};

const addTypeFailure = () => {
  return {
    type: ADD_TYPE_FAILURE,
    isLoading: false,
  }
};

const updateTypeRequest = () => {
  return {
    type: UPDATE_TYPE_REQUEST,
    isLoading: true,
  }
};

const updateTypeSuccess = () => {
  return {
    type: UPDATE_TYPE_SUCCESS,
    isLoading: false,
  }
};

const updateTypeFailure = () => {
  return {
    type: UPDATE_TYPE_FAILURE,
    isLoading: false,
  }
};

export const getIaTypes = (params = {
  currentPage: 1,
  pageSize: 20,
}) => {
  return async (dispatch) => {
    dispatch(getIaTypesRequest());
    try {
      const response = await api.getIaTypes(params);
      if (response.status === 200 && response.data.resCode === '00') {
        dispatch(getIaTypesSuccess(response.data));
      } else {
        dispatch(getIaTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getIaTypesFailure(error));
    }
  };
};

export const addTypeToggle = () => {
  return (dispatch) => {
    addTypeSwitch = !addTypeSwitch;
    if (addTypeSwitch) {
      dispatch(showAddTypeModal());
    } else {
      dispatch(hideAddTypeModal());
    }
  }
};

export const deleteTypeToggle = () => {
  return (dispatch) => {
    deleteTypeSwitch = !deleteTypeSwitch;
    if (deleteTypeSwitch) {
      dispatch(showDeleteTypeModal());
    } else {
      dispatch(hideDeleteTypeModal());
    }
  }
};

export const addType = (params) => {
  return async (dispatch) => {
    dispatch(addTypeRequest());
    try {
      const response = await api.addType(params);
      if (response.status === 200 && response.data.resCode === '00') {
        dispatch(addTypeSuccess(response.data));
      } else {
        dispatch(addTypeFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(addTypeFailure(error));
    }
  }
};

export const deleteType = (params) => {
  return async (dispatch) => {
    dispatch(deleteTypeRequest());
    try {
      const response = await api.deleteType(params);
      if (response.status === 200 && response.data.resCode === '00') {
        dispatch(deleteTypeSuccess(response.data));
      } else {
        dispatch(deleteTypeFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(deleteTypeFailure(error));
    }
  }
};

export const updateType = (params) => {
  return async (dispatch) => {
    dispatch(updateTypeRequest());
    try {
      const response = await api.updateType(params);
      if (response.status === 200 && response.data.resCode === '00') {
        dispatch(updateTypeSuccess(response.data));
      } else {
        dispatch(updateTypeFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(updateTypeFailure(error));
    }
  }
};
