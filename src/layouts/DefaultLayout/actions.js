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
import { push } from "react-router-redux";
import { createHashHistory } from "history";
import { Feedback } from "@icedesign/base";
import * as api from "./api";
import { getAuthority, setAuthority, setUserInfoLocal } from "utils/authority";
// import { reloadAuthorized } from 'utils/Authorized';
import {
  // USER_LOGOUT_REQUEST,
  // USER_LOGOUT_SUCCESS,
  // USER_LOGOUT_FAILURE,
  SHOW_PASSWORD_RESET_MODEL,
  HIDE_PASSWORD_RESET_MODEL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from "./constants";

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

const history = createHashHistory();

let resetPasswordModalSwitch = false;

// const userLogoutRequest = () => {
//   return {
//     type: USER_LOGOUT_REQUEST,
//     isLoading: true,
//   };
// };

// const userLogoutSuccess = (payload) => {
//   return {
//     type: USER_LOGOUT_SUCCESS,
//     payload,
//     isLoading: false,
//   };
// };

// const userLogoutFailure = (payload) => {
//   return {
//     type: USER_LOGOUT_FAILURE,
//     payload,
//     isLoading: false,
//   };
// };

const showPasswordResetModal = () => {
  return {
    type: SHOW_PASSWORD_RESET_MODEL,
    shouldOpen: true
  };
};

const hidePasswordResetModal = () => {
  return {
    type: HIDE_PASSWORD_RESET_MODEL,
    shouldOpen: false
  };
};

const resetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
    isLoading: true
  };
};

const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    isLoading: true
  };
};

const resetPasswordFailure = () => {
  return {
    type: RESET_PASSWORD_FAILURE,
    isLoading: true
  };
};

export const userLogout = params => {
  return dispatch => {
    setAuthority("");
    setUserInfoLocal("");
    history.push("/login");
    api.logout(params);
    // Feedback.toast.show("登出成功");
  };
};

export const resetPasswordModalToggle = () => {
  return dispatch => {
    resetPasswordModalSwitch = !resetPasswordModalSwitch;
    if (resetPasswordModalSwitch) {
      dispatch(showPasswordResetModal());
    } else {
      dispatch(hidePasswordResetModal());
    }
  };
};

export const resetPassword = params => {
  return async dispatch => {
    try {
      dispatch(resetPasswordRequest());
      const response = await api.resetPassword(params);
      if (response.status === 200 && response.data.resCode === "00") {
        setAuthority("");
        setUserInfoLocal("");
        dispatch(resetPasswordSuccess());
        dispatch(resetPasswordModalToggle());
        Feedback.toast.show(response.data && response.data.resMsg);
        dispatch(push("/"));
      } else {
        dispatch(resetPasswordFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(resetPasswordFailure(error));
    }
  };
};

export const isTokenValid = () => {
  return async dispatch => {
    const response = await api.isTokenValid({ token: getAuthority() });
    if (response.status === 200 && response.data.resCode === "00") {
      if (!response.data.isValid) {
        setAuthority("");
        setUserInfoLocal("");
        dispatch(push("/login"));
      }
    }
  };
};
