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
import saveFile from 'utils/saveFile';
import * as api from './api';
import { setAuthority } from 'utils/authority';
// import { reloadAuthorized } from 'utils/Authorized';
import {
  GET_IAMODEL_REQUEST,
  GET_IAMODEL_SUCCESS,
  GET_IAMODEL_FAILURE,
  SHOW_ADDMODEL_MODAL,
  HIDE_ADDMODEL_MODAL,
  SHOW_DELETEMODEL_MODAL,
  HIDE_DELETEMODEL_MODAL,
  ADD_MODEL_REQUEST,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_REQUEST,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  UPDATE_MODEL_REQUEST,
  UPDATE_MODEL_SUCCESS,
  UPDATE_MODEL_FAILURE,
  UPLOAD_MODEL_FILE_REQUEST,
  UPLOAD_MODEL_FILE_SUCCESS,
  UPLOAD_MODEL_FILE_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  GET_MODEL_INFO_BYID_REQUEST,
  GET_MODEL_INFO_BYID_SUCCESS,
  GET_MODEL_INFO_BYID_FAILURE,
  SET_FORM_DATA,
  DOWNLOAD_MODEL_TEMPLATE_FILE_REQUEST,
  DOWNLOAD_MODEL_TEMPLATE_FILE_FAILURE,
  DOWNLOAD_MODEL_TEMPLATE_FILE_SUCCESS,
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

const showAddModelModal = (payload) => {
  return {
    type: SHOW_ADDMODEL_MODAL,
    payload,
    shouldOpen: true,
  }
};

const hideAddModelModal = () => {
  return {
    type: HIDE_ADDMODEL_MODAL,
    shouldOpen: false,
  }
};

const showDeleteModelModal = (payload) => {
  return {
    type: SHOW_DELETEMODEL_MODAL,
    payload,
    shouldOpen: true,
  }
};

const hideDeleteModelModal = () => {
  return {
    type: HIDE_DELETEMODEL_MODAL,
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

const getModelInfoByIdRequest = () => {
  return {
    type: GET_MODEL_INFO_BYID_REQUEST,
    isLoading: true,
  };
};

const getModelInfoByIdSuccess = (payload) => {
  return {
    type: GET_MODEL_INFO_BYID_SUCCESS,
    payload,
    isLoading: false,
  };
};

const getModelInfoByIdFailure = (payload) => {
  return {
    type: GET_MODEL_INFO_BYID_FAILURE,
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

const updateModelRequest = (payload) => {
  return {
    type: UPDATE_MODEL_REQUEST,
    payload,
    isLoading: true,
  };
};

const updateModelSuccess = (payload) => {
  return {
    type: UPDATE_MODEL_SUCCESS,
    payload,
    isLoading: false,
  };
};

const updateModelFailure = (payload) => {
  return {
    type: UPDATE_MODEL_FAILURE,
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

const downloadModelTemplateFileRequest = () => {
  return {
    type: DOWNLOAD_MODEL_TEMPLATE_FILE_REQUEST,
    isLoading: true,
  };
};

const downloadModelTemplateFileSuccess = (payload) => {
  return {
    type: DOWNLOAD_MODEL_TEMPLATE_FILE_SUCCESS,
    isLoading: true,
    payload,
  };
};

const downloadModelTemplateFileFailure = () => {
  return {
    type: DOWNLOAD_MODEL_TEMPLATE_FILE_FAILURE,
    isLoading: true,
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

export const addModelToggle = (record) => {
  return (dispatch) => {
    addModelSwitch = !addModelSwitch;
    if (addModelSwitch) {
      dispatch(getModelInfoById({templateId: record && record.templateId}));
      dispatch(setFormData(record));
      dispatch(showAddModelModal(record));
    } else {
      dispatch(setFormData({}));
      dispatch(hideAddModelModal());
    }
  }
};

export const deleteModelModalToggle = (record) => {
  return (dispatch) => {
    deleteModelSwitch = !deleteModelSwitch;
    if (deleteModelSwitch) {
      dispatch(showDeleteModelModal(record));
    } else {
      dispatch(hideDeleteModelModal());
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

export const updateModel = (params) => {
  return async (dispatch) => {
    dispatch(updateModelRequest());
    try {
      const response = await api.updateModel(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(updateModelSuccess(response.data));
        dispatch(hideAddModelModal());
        dispatch(getIaModels());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updateModelFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(updateModelFailure());
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
        dispatch(deleteModelModalToggle());
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

export const setFormData = (payload) => {
  return {
    type: SET_FORM_DATA,
    payload,
  }
};

export const getModelInfoById = (params) => {
  return async (dispatch) => {
    dispatch(getModelInfoByIdRequest());
    try {
      const response = await api.getModelInfoById(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(getModelInfoByIdSuccess(response.data));
      } else {
        dispatch(getModelInfoByIdFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getModelInfoByIdFailure(error));
    }
  };
};

export const downloadModelTemplateFile = (params) => {
  return async (dispatch) => {
    dispatch(downloadModelTemplateFileRequest());
    try {
      const response = await api.downloadModelTemplateFile(params);

      if (response.status === 200) {
        saveFile(response.data, 'text/latex', '模版文件.lua')
        dispatch(downloadModelTemplateFileSuccess(response.data));
      } else {
        dispatch(downloadModelTemplateFileFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(downloadModelTemplateFileFailure(error));
    }
  };
};
