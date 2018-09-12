/*
 * AARole Actions
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
import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  SHOW_ADDROLE_MODAL,
  HIDE_ADDROLE_MODAL,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  QUERY_ALL_ROLETYPES_REQUEST,
  QUERY_ALL_ROLETYPES_SUCCESS,
  QUERY_ALL_ROLETYPES_FAILURE,
  SHOW_DELETEROLE_MODAL,
  HIDE_DELETEROLE_MODAL,
  SET_CURRENT_PAGE,
  SET_FORM_DATA,
  QUERY_USER_ROLE_REQUEST,
  QUERY_USER_ROLE_SUCCESS,
  QUERY_USER_ROLE_FAILURE,
  SET_NODE_ID_LIST
} from "./constants";

let addRoleModalSwitch = false;
let deleteRoleModalSwitch = false;

const showAddRoleModal = payload => {
  return {
    type: SHOW_ADDROLE_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideAddRoleModal = () => {
  return {
    type: HIDE_ADDROLE_MODAL,
    shouldOpen: false
  };
};

const showDeleteRoleModal = payload => {
  return {
    type: SHOW_DELETEROLE_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideDeleteRoleModal = () => {
  return {
    type: HIDE_DELETEROLE_MODAL,
    shouldOpen: false
  };
};

const getRolesRequest = () => {
  return {
    type: GET_ROLES_REQUEST,
    isLoading: true
  };
};

const getRolesSuccess = payload => {
  return {
    type: GET_ROLES_SUCCESS,
    payload,
    isLoading: false
  };
};

const getRolesFail = () => {
  return {
    type: GET_ROLES_FAILURE,
    isLoading: false
  };
};

const addRoleRequest = () => {
  return {
    type: ADD_ROLE_REQUEST,
    isLoading: true
  };
};

const addRoleSuccess = payload => {
  return {
    type: ADD_ROLE_SUCCESS,
    payload,
    isLoading: false
  };
};

const addRoleFailure = () => {
  return {
    type: ADD_ROLE_FAILURE,
    isLoading: false
  };
};

const updateRoleRequest = () => {
  return {
    type: UPDATE_ROLE_REQUEST,
    isLoading: true
  };
};

const updateRoleSuccess = payload => {
  return {
    type: UPDATE_ROLE_SUCCESS,
    payload,
    isLoading: false
  };
};

const updateRoleFailure = () => {
  return {
    type: UPDATE_ROLE_FAILURE,
    isLoading: false
  };
};

const deleteRoleRequest = () => {
  return {
    type: DELETE_ROLE_REQUEST,
    isLoading: true
  };
};

const deleteRoleSuccess = payload => {
  return {
    type: DELETE_ROLE_SUCCESS,
    payload,
    isLoading: false
  };
};

const deleteRoleFailure = () => {
  return {
    type: DELETE_ROLE_FAILURE,
    isLoading: false
  };
};

const queryAllRoleTypesRequest = () => {
  return {
    type: QUERY_ALL_ROLETYPES_REQUEST,
    isLoading: true
  };
};

const queryAllRoleTypesSuccess = payload => {
  return {
    type: QUERY_ALL_ROLETYPES_SUCCESS,
    payload,
    isLoading: true
  };
};

const queryAllRoleTypesFailure = () => {
  return {
    type: QUERY_ALL_ROLETYPES_FAILURE,
    isLoading: true
  };
};

const queryUserRoleRequest = () => {
  return {
    type: QUERY_USER_ROLE_REQUEST,
    isLoading: true
  };
};

const queryUserRoleSuccess = payload => {
  return {
    type: QUERY_USER_ROLE_SUCCESS,
    isLoading: false,
    payload
  };
};

const queryUserRoleFailure = () => {
  return {
    type: QUERY_USER_ROLE_FAILURE,
    isLoading: false
  };
};

export const getRoles = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getRolesRequest());
    try {
      const response = await api.getAaRoles(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(getRolesSuccess(response.data));
      } else {
        dispatch(getRolesFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getRolesFail(error));
    }
  };
};

export const addRoleModalToggle = record => {
  return dispatch => {
    addRoleModalSwitch = !addRoleModalSwitch;
    if (addRoleModalSwitch) {
      if (record && record.opType) {
        dispatch(queryUserRole({ roleId: record.roleId }));
      }
      dispatch(showAddRoleModal(record));
    } else {
      // dispatch(setNodeIdList({}));
      dispatch(setFormData({}));
      dispatch(hideAddRoleModal());
    }
  };
};

export const deleteRoleModalToggle = record => {
  return dispatch => {
    deleteRoleModalSwitch = !deleteRoleModalSwitch;
    if (deleteRoleModalSwitch) {
      dispatch(showDeleteRoleModal(record));
    } else {
      dispatch(hideDeleteRoleModal());
    }
  };
};

export const addRole = params => {
  return async dispatch => {
    dispatch(addRoleRequest());
    try {
      const response = await api.addAaRole(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(addRoleSuccess(response.data));
        dispatch(addRoleModalToggle());
        dispatch(getRoles());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addRoleFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(addRoleFailure(error));
    }
  };
};

export const updateRole = params => {
  return async dispatch => {
    dispatch(updateRoleRequest());
    try {
      const response = await api.updateAaRole(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(updateRoleSuccess(response.data));
        dispatch(addRoleModalToggle());
        dispatch(getRoles());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updateRoleFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(updateRoleFailure(error));
    }
  };
};

export const deleteRole = params => {
  return async dispatch => {
    dispatch(deleteRoleRequest());
    try {
      const response = await api.deleteAaRole(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(deleteRoleSuccess(response.data));
        dispatch(deleteRoleModalToggle());
        dispatch(getRoles());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deleteRoleFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(deleteRoleFailure(error));
    }
  };
};

export const queryAllRoleTypes = params => {
  return async dispatch => {
    dispatch(queryAllRoleTypesRequest());
    try {
      const response = await api.queryAllRoleTypes(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(
          queryAllRoleTypesSuccess(response.data && response.data.roleInfoList)
        );
      } else {
        dispatch(queryAllRoleTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(queryAllRoleTypesFailure(error));
    }
  };
};

export const setCurrentPage = payload => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
};

export const setFormData = payload => {
  return {
    type: SET_FORM_DATA,
    payload
  };
};

export const setNodeIdList = payload => {
  return {
    type: SET_NODE_ID_LIST,
    payload
  };
};

export const queryUserRole = params => {
  return async dispatch => {
    dispatch(queryUserRoleRequest());
    try {
      const response = await api.queryUserRole(params);
      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(queryUserRoleSuccess(response.data));
      } else {
        dispatch(queryUserRoleFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(queryUserRoleFailure(error));
    }
  };
};
