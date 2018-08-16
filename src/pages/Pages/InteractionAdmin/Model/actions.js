/*
 * IAModel Actions
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
import { setAuthority } from 'utils/authority';
// import { reloadAuthorized } from 'utils/Authorized';
import {
  GET_IAMODEL_REQUEST,
  GET_IAMODEL_SUCCESS,
  GET_IAMODEL_FAILURE,
  SHOW_ADDMODEL_MODAL,
  HIDE_ADDMODEL_MODAL,
  ADD_MODEL_REQUEST,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_REQUEST,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  UPLOAD_MODEL_FILE_REQUEST,
  UPLOAD_MODEL_FILE_SUCCESS,
  UPLOAD_MODEL_FILE_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
} from './constants';

let addModelSwitch = false;
let deleteModelSwitch = false;
/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

const showAddModelModal = () => {
  return {
    type: SHOW_ADDMODEL_MODAL,
    shouldOpen: true,
  }
};

const hideAddModelModal = () => {
  return {
    type: HIDE_ADDMODEL_MODAL,
    shouldOpen: false,
  }
};
const getIaModelsRequest = () => {
  return {
    type: GET_IAMODEL_REQUEST,
    isLoading: true,
  };
};

const getIaModelsSuccess = (payload) => {
  return {
    type: GET_IAMODEL_SUCCESS,
    payload,
    isLoading: false,
  };
};

const getIaModelsFailure = (payload) => {
  return {
    type: GET_IAMODEL_FAILURE,
    payload,
    isLoading: false,
  };
};

const addModelRequest = (payload) => {
  return {
    type: ADD_MODEL_REQUEST,
    payload,
    isLoading: true,
  };
};

const addModelSuccess = (payload) => {
  return {
    type: ADD_MODEL_SUCCESS,
    payload,
    isLoading: false,
  };
};

const addModelFailure = (payload) => {
  return {
    type: ADD_MODEL_FAILURE,
    payload,
    isLoading: false,
  };
};

const deleteModelRequest = (payload) => {
  return {
    type: DELETE_MODEL_REQUEST,
    payload,
    isLoading: true,
  };
};

const deleteModelSuccess = (payload) => {
  return {
    type: DELETE_MODEL_SUCCESS,
    payload,
    isLoading: false,
  };
};

const deleteModelFailure = (payload) => {
  return {
    type: DELETE_MODEL_FAILURE,
    payload,
    isLoading: false,
  };
};

const uploadModelFileRequest = () => {
  return {
    type: UPLOAD_MODEL_FILE_REQUEST,
    isLoading: true,
  }
};

const uploadModelFileSuccess = (payload) => {
  return {
    type: UPLOAD_MODEL_FILE_SUCCESS,
    payload,
    isLoading: false,
  }
};

const uploadModelFileFailure = () => {
  return {
    type: UPLOAD_MODEL_FILE_FAILURE,
    isLoading: false,
  }
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

export const getIaModels = (params = {
  currentPage: 1,
  pageSize: 20,
  // interactionTypeId: 0,
}) => {
  return async (dispatch) => {
    dispatch(getIaModelsRequest());
    try {
      const response = await api.getIaModels(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(getIaModelsSuccess(response.data));
      } else {
        dispatch(getIaModelsFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getIaModelsFailure(error));
    }
  };
};

export const addModelToggle = () => {
  return (dispatch) => {
    addModelSwitch = !addModelSwitch;
    if (addModelSwitch) {
      dispatch(showAddModelModal());
    } else {
      dispatch(hideAddModelModal());
    }
  }
};

export const deleteModelModalToggle = () => {
  return (dispatch) => {
    deleteModelSwitch = !deleteModelSwitch;
    if (deleteModelSwitch) {
    } else {
    }
  }
};

export const addModel = (params) => {
  return async (dispatch) => {
    dispatch(addModelRequest());
    try {
      const response = await api.addModel(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(addModelSuccess(response.data));
        dispatch(hideAddModelModal());
        dispatch(getIaModels());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addModelFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(addModelFailure());
    }
  };
};

export const deleteModel = (params) => {
  return async (dispatch) => {
    dispatch(deleteModelRequest());
    try {
      const response = await api.deleteModel(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(deleteModelSuccess(response.data));
        dispatch(hideAddModelModal());
        dispatch(getIaModels());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deleteModelFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(deleteModelFailure());
    }
  };
};

export const uploadModelFile = (params) => {
  return async (dispatch) => {
    dispatch(uploadModelFileRequest());
    try {
      const response = await api.uploadModelFile(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(uploadModelFileSuccess(response.data));
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(uploadModelFileFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(uploadModelFileFailure(error));
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
