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
import { Feedback } from '@icedesign/base';
import * as api from './api';
import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
  SHOW_ADDROLE_MODAL,
  HIDE_ADDROLE_MODAL,
} from './constants';

let addRoleModalSwitch = false;

const showAddRoleModal = () => {
  return {
    type: SHOW_ADDROLE_MODAL,
    shouldOpen: true,
  }
};

const hideAddRoleModal = () => {
  return {
    type: HIDE_ADDROLE_MODAL,
    shouldOpen: false,
  }
};

const getRolesRequest = () => {
  return {
    type: GET_ROLES_REQUEST,
    isLoading: true,
  }
};

const getRolesSuccess = () => {
  return {
    type: GET_ROLES_SUCCESS,
    isLoading: false,
  }
};

const getRolesFail = () => {
  return {
    type: GET_ROLES_FAIL,
    isLoading: false,
  }
};

export const getRoles = (params) => {
  return async (dispatch) => {
    dispatch(getRolesRequest());
    try {
      const response = await api.getAaRoles(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(getRolesSuccess(response.data));
      } else {
        dispatch(getRolesFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(getRolesFail(error));
    }
  }  
};

export const addRoleModalToggle = () => {
  return (dispatch) => {
    addRoleModalSwitch = !addRoleModalSwitch;
    if (addRoleModalSwitch) {
      dispatch(showAddRoleModal());
    } else {
      dispatch(hideAddRoleModal());
    }
  }
};