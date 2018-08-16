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
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAIL,
  SHOW_ADDACCOUNT_MODAL,
  HIDE_ADDACCOUNT_MODAL,
  ADD_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAIL,
  QUERY_ALL_ACCOUNTTYPES_REQUEST,
  QUERY_ALL_ACCOUNTTYPES_SUCCESS,
  QUERY_ALL_ACCOUNTTYPES_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  SHOW_DELETEACCOUNT_MODAL,
  HIDE_DELETEACCOUNT_MODAL,
} from './constants';

let addAccountModalSwitch = false;
let deleteAccountModalSwitch = false;

const getAccountsRequest = () => {
  return {
    type: GET_ACCOUNTS_REQUEST,
    isLoading: true,
  };
};

const getAccountsSuccess = (payload) => {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    payload,
    isLoading: false,
  };
};

const getAccountsFail = () => {
  return {
    type: GET_ACCOUNTS_FAIL,
    isLoading: false,
  };
};

const showAddAccountModal = () => {
  return {
    type: SHOW_ADDACCOUNT_MODAL,
    shouldOpen: true,
  };
};

const hideAddAccountModal = () => {
  return {
    type: HIDE_ADDACCOUNT_MODAL,
    shouldOpen: false,
  };
};

const showDeleteAccountModal = (payload) => {
  return {
    type: SHOW_DELETEACCOUNT_MODAL,
    payload,
    shouldOpen: true,
  };
};

const hideDeleteAccountModal = () => {
  return {
    type: HIDE_DELETEACCOUNT_MODAL,
    shouldOpen: false,
  };
};

const addAccountRequest = () => {
  return {
    type: ADD_ACCOUNT_REQUEST,
    isLoading: true,
  };
};

const addAccountSuccess = (payload) => {
  return {
    type: ADD_ACCOUNT_SUCCESS,
    payload,
    isLoading: false,
  };
};

const addAccountFail = (payload) => {
  return {
    type: ADD_ACCOUNT_FAIL,
    payload,
    isLoading: false,
  };
};

const deleteAccountRequest = () => {
  return {
    type: DELETE_ACCOUNT_REQUEST,
    isLoading: true,
  };
};

const deleteAccountSuccess = (payload) => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    payload,
    isLoading: false,
  };
};

const deleteAccountFail = (payload) => {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    payload,
    isLoading: false,
  };
};

const queryAllAccountTypesRequest = () => {
  return {
    type: QUERY_ALL_ACCOUNTTYPES_REQUEST,
    isLoading: true,
  };
};

const queryAllAccountTypesSuccess = (payload) => {
  return {
    type: QUERY_ALL_ACCOUNTTYPES_SUCCESS,
    payload,
    isLoading: true,
  };
};

const queryAllAccountTypesFailure = () => {
  return {
    type: QUERY_ALL_ACCOUNTTYPES_FAILURE,
    isLoading: true,
  };
};

export const getAccounts = (params = {
  currentPage: 1,
  pageSize: 20,
}) => {
  return async (dispatch) => {
    dispatch(getAccountsRequest());
    try {
      const response = await api.getAaAccounts(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(getAccountsSuccess(response.data));
      } else {
        dispatch(getAccountsFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(getAccountsFail(error));
    } 
  }  
};

export const addAccountModalToggle = () => {
  return (dispatch) => {
    addAccountModalSwitch = !addAccountModalSwitch;
    if (addAccountModalSwitch) {
      dispatch(showAddAccountModal());
    } else {
      dispatch(hideAddAccountModal());
    }
  };
};

export const deleteAccountModalToggle = (record) => {
  return (dispatch) => {
    deleteAccountModalSwitch = !deleteAccountModalSwitch;
    if (deleteAccountModalSwitch) {
      dispatch(showDeleteAccountModal(record));
    } else {
      dispatch(hideDeleteAccountModal());
    }
  };
};

export const addAccount = (params) => {
  return async (dispatch) => {
    dispatch(addAccountRequest());
    try {
      const response = await api.addAaAccount(params);

      if (response.status === 200 && response.data.resCode === '00') {
        dispatch(addAccountSuccess(response.data));
        dispatch(hideAddAccountModal());
        dispatch(getAccounts());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addAccountFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(addAccountFail(error));
    }
  }
};

export const deleteAccount = (params) => {
  return async (dispatch) => {
    dispatch(addAccountRequest());
    try {
      const response = await api.deleteAaAccount(params);

      if (response.status === 200 && response.data.resCode === '00') {
        dispatch(addAccountSuccess(response.data));
        dispatch(hideDeleteAccountModal());
        dispatch(getAccounts());
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addAccountFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(addAccountFail(error));
    }
  }
};

export const queryAllAccountTypes = (params) => {
  return async (dispatch) => {
    dispatch(queryAllAccountTypesRequest());
    try {
      const response = await api.queryAllAccountTypes(params);

      if (response.status === 200 && response.data.resCode === '00') {

        dispatch(queryAllAccountTypesSuccess(response.data && response.data.roleInfoList));
      } else {
        dispatch(queryAllAccountTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch(error) {
      dispatch(queryAllAccountTypesFailure(error));
    }
  }  
};