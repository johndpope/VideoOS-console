/*
 * Layout Actions
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
import { createHashHistory } from 'history';
import { Feedback } from '@icedesign/base';
import { login } from './api';
import { setAuthority } from 'utils/authority';
// import { reloadAuthorized } from 'utils/Authorized';
import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

const history = createHashHistory();

const userLogoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST,
    isLoading: true,
  };
};

const userLogoutSuccess = (payload) => {
  return {
    type: USER_LOGOUT_SUCCESS,
    payload,
    isLoading: false,
  };
};

const userLogoutFailure = (payload) => {
  return {
    type: USER_LOGOUT_FAILURE,
    payload,
    isLoading: false,
  };
};

export const userLogout = (params) => {
  return (dispatch) => {
    setAuthority('');
    history.push('/login');
    Feedback.toast.show('登出成功');

  };
};
