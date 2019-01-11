/*
 * Login Actions
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
import { Feedback } from "@icedesign/base";
import { login } from "./api";
import { setAuthority, setUserInfoLocal } from "utils/authority";
// import { reloadAuthorized } from 'utils/Authorized';
import * as constants from "./constants";

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const userLoginRequest = () => {
  return {
    type: constants.USER_LOGIN_REQUEST,
    isLoading: true
  };
};

const userLoginSuccess = payload => {
  return {
    type: constants.USER_LOGIN_SUCCESS,
    payload,
    isLoading: false
  };
};

const userLoginFailure = payload => {
  return {
    type: constants.USER_LOGIN_FAILURE,
    payload,
    isLoading: false
  };
};

export const handleLoginForm = e => {
  e && e.preventDefault && e.preventDefault();
  debugger;
  console.log(e);
};

export const userLogin = params => {
  return async dispatch => {
    dispatch(userLoginRequest());
    try {
      const response = await login(params);

      if (response.status === 200 && response.data.resCode === "00") {
        const { data } = response;

        setUserInfoLocal({ ...data, username: params.username });
        setAuthority(response.data && response.data.token);
        dispatch(userLoginSuccess(response.data));
        dispatch(push("/"));
      } else {
        dispatch(userLoginFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};

export const passwordForgetTip = () => {
  return () => {
    Feedback.toast.show("请联系管理员");
  };
};

export const contactUsTip = () => {
  return () => {
    Feedback.toast.show("请拨打400-8089-578");
  };
};
