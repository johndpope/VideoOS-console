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

import { Feedback } from "@icedesign/base";
import * as api from "./api";
// import { reloadAuthorized } from 'utils/Authorized';
import * as constants from "./constants";

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
let addTypeSwitch = false;
let deleteTypeSwitch = false;

const showAddTypeModal = payload => {
  return {
    type: constants.SHOW_ADDTYPE_MODAL,
    shouldOpen: true,
    payload
  };
};

const hideAddTypeModal = () => {
  return {
    type: constants.HIDDEN_ADDTYPE_MODAL,
    shouldOpen: false
  };
};

const showDeleteTypeModal = payload => {
  return {
    type: constants.SHOW_DELETETYPE_MODAL,
    shouldOpen: true,
    payload
  };
};

const hideDeleteTypeModal = () => {
  return {
    type: constants.HIDE_DELETETYPE_MODAL,
    shouldOpen: false
  };
};

const getIaTypesRequest = () => {
  return {
    type: constants.GET_IATYPE_REQUEST,
    isLoading: true
  };
};

const getIaTypesSuccess = payload => {
  return {
    type: constants.GET_IATYPE_SUCCESS,
    payload,
    isLoading: false
  };
};

const getIaTypesFailure = payload => {
  return {
    type: constants.GET_IATYPE_FAILURE,
    payload,
    isLoading: false
  };
};

const getIaTypeByIdRequest = () => {
  return {
    type: constants.GET_IATYPE_BYID_REQUEST,
    isLoading: true
  };
};

const getIaTypeByIdSuccess = payload => {
  return {
    type: constants.GET_IATYPE_BYID_SUCCESS,
    payload,
    isLoading: false
  };
};

const getIaTypeByIdFailure = payload => {
  return {
    type: constants.GET_IATYPE_BYID_FAILURE,
    payload,
    isLoading: false
  };
};

const deleteTypeRequest = () => {
  return {
    type: constants.DELETE_TYPE_REQUEST,
    isLoading: true
  };
};

const deleteTypeSuccess = () => {
  return {
    type: constants.DELETE_TYPE_SUCCESS,
    isLoading: false
  };
};

const deleteTypeFailure = () => {
  return {
    type: constants.DELETE_TYPE_FAILURE,
    isLoading: false
  };
};

const addTypeRequest = () => {
  return {
    type: constants.ADD_TYPE_REQUEST,
    isLoading: true
  };
};

const addTypeSuccess = () => {
  return {
    type: constants.ADD_TYPE_SUCCESS,
    isLoading: false
  };
};

const addTypeFailure = () => {
  return {
    type: constants.ADD_TYPE_FAILURE,
    isLoading: false
  };
};

const updateTypeRequest = () => {
  return {
    type: constants.UPDATE_TYPE_REQUEST,
    isLoading: true
  };
};

const updateTypeSuccess = () => {
  return {
    type: constants.UPDATE_TYPE_SUCCESS,
    isLoading: false
  };
};

const updateTypeFailure = () => {
  return {
    type: constants.UPDATE_TYPE_FAILURE,
    isLoading: false
  };
};

export const getIaTypes = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getIaTypesRequest());
    try {
      const response = await api.getIaTypes(params);
      if (response.status === 200 && response.data.resCode === "00") {
        const { totalPage } = response.data;
        if (totalPage <= 0) {
          dispatch(getIaTypesSuccess([]));
          return;
        }
        if (params.currentPage <= totalPage) {
          dispatch(getIaTypesSuccess(response.data));
        } else {
          params.currentPage = totalPage;
          dispatch(setCurrentPage({ currentPage: totalPage }));
          dispatch(getIaTypes(params));
        }
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

export const getIaTypeById = params => {
  return async dispatch => {
    dispatch(getIaTypeByIdRequest());
    try {
      const response = await api.getIaTypeById(params);
      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(getIaTypeByIdSuccess(response.data));
      } else {
        dispatch(getIaTypeByIdFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getIaTypeByIdFailure(error));
    }
  };
};

export const addTypeToggle = payload => {
  return dispatch => {
    addTypeSwitch = !addTypeSwitch;
    if (addTypeSwitch) {
      if (payload && payload.opType) {
        dispatch(getIaTypeById({ interactionId: payload.interactionTypeId }));
      }
      dispatch(setFormData(payload));
      dispatch(showAddTypeModal(payload));
    } else {
      dispatch(setFileIptState({ showFileIpt: false }));
      dispatch(setFormData({}));
      dispatch(hideAddTypeModal());
    }
  };
};

export const deleteTypeToggle = record => {
  return dispatch => {
    deleteTypeSwitch = !deleteTypeSwitch;
    if (deleteTypeSwitch) {
      dispatch(showDeleteTypeModal(record));
    } else {
      dispatch(hideDeleteTypeModal());
    }
  };
};

export const addType = params => {
  return async dispatch => {
    dispatch(addTypeRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.addType(params);
      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(addTypeSuccess(response.data));
        dispatch(addTypeToggle());
        dispatch(
          getIaTypes({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addTypeFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(addTypeFailure(error));
    }
  };
};

export const deleteType = params => {
  return async dispatch => {
    dispatch(deleteTypeRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.deleteType(params);
      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(deleteTypeSuccess(response.data));
        dispatch(deleteTypeToggle());
        dispatch(
          getIaTypes({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deleteTypeFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(deleteTypeFailure(error));
    }
  };
};

export const updateType = params => {
  return async dispatch => {
    dispatch(updateTypeRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.updateType(params);
      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(updateTypeSuccess(response.data));
        dispatch(addTypeToggle());
        dispatch(
          getIaTypes({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updateTypeFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(updateTypeFailure(error));
    }
  };
};

export const setFormData = payload => {
  return {
    type: constants.SET_FORM_DATA,
    payload
  };
};

export const setFileIptState = payload => {
  return {
    type: constants.SET_FILE_IPT_STATE,
    payload
  };
};

export const setCurrentPage = payload => {
  return {
    type: constants.SET_CURRENT_PAGE,
    payload
  };
};
