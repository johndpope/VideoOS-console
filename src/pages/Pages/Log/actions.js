/*
 * Log Actions
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
  GET_LOGS_REQUEST,
  GET_LOGS_SUCCESS,
  GET_LOGS_FAILURE,
  SET_CURRENT_PAGE
} from "./constants";

const getLogsRequest = () => {
  return {
    type: GET_LOGS_REQUEST,
    isLoading: true
  };
};

const getLogsSuccess = payload => {
  return {
    type: GET_LOGS_SUCCESS,
    isLoading: false,
    payload
  };
};

const getLogsFailure = () => {
  return {
    type: GET_LOGS_FAILURE,
    isLoading: false
  };
};

export const getLogs = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getLogsRequest());
    try {
      const response = await api.getLogs(params);
      if (response.status === 200 && response.data.resCode === "00") {
        const { totalPage } = response.data;
        if (params.currentPage <= totalPage) {
          dispatch(getLogsSuccess(response.data));
        } else {
          params.currentPage = totalPage;
          dispatch(setCurrentPage({ currentPage: totalPage }));
          dispatch(getLogs(params));
        }
      } else {
        dispatch(getLogsFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }
      return response.data;
    } catch (error) {
      dispatch(getLogsFailure(error));
    }
  };
};

export const setCurrentPage = payload => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
};
