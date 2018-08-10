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
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
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

export const getIaModels = (params = {
  currentPage: 1,
  pageSize: 20,
  interactionTypeId: 0,
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
