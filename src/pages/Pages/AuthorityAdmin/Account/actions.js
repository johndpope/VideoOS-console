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
import * as constants from "./constants";

let addAccountModalSwitch = false;
let deleteAccountModalSwitch = false;

const getAccountsRequest = () => {
  return {
    type: constants.GET_ACCOUNTS_REQUEST,
    isLoading: true
  };
};

const getAccountsSuccess = payload => {
  return {
    type: constants.GET_ACCOUNTS_SUCCESS,
    payload,
    isLoading: false
  };
};

const getAccountsFail = () => {
  return {
    type: constants.GET_ACCOUNTS_FAIL,
    isLoading: false
  };
};

const showAddAccountModal = payload => {
  return {
    type: constants.SHOW_ADDACCOUNT_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideAddAccountModal = () => {
  return {
    type: constants.HIDE_ADDACCOUNT_MODAL,
    shouldOpen: false
  };
};

const showDeleteAccountModal = payload => {
  return {
    type: constants.SHOW_DELETEACCOUNT_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideDeleteAccountModal = () => {
  return {
    type: constants.HIDE_DELETEACCOUNT_MODAL,
    shouldOpen: false
  };
};

const addAccountRequest = () => {
  return {
    type: constants.ADD_ACCOUNT_REQUEST,
    isLoading: true
  };
};

const addAccountSuccess = payload => {
  return {
    type: constants.ADD_ACCOUNT_SUCCESS,
    payload,
    isLoading: false
  };
};

const addAccountFail = payload => {
  return {
    type: constants.ADD_ACCOUNT_FAIL,
    payload,
    isLoading: false
  };
};

const updateAccountRequest = () => {
  return {
    type: constants.UPDATE_ACCOUNT_REQUEST,
    isLoading: true
  };
};

const updateAccountSuccess = payload => {
  return {
    type: constants.UPDATE_ACCOUNT_SUCCESS,
    payload,
    isLoading: false
  };
};

const updateAccountFail = payload => {
  return {
    type: constants.UPDATE_ACCOUNT_FAILURE,
    payload,
    isLoading: false
  };
};

const deleteAccountRequest = () => {
  return {
    type: constants.DELETE_ACCOUNT_REQUEST,
    isLoading: true
  };
};

const deleteAccountSuccess = payload => {
  return {
    type: constants.DELETE_ACCOUNT_SUCCESS,
    payload,
    isLoading: false
  };
};

const deleteAccountFail = payload => {
  return {
    type: constants.DELETE_ACCOUNT_FAILURE,
    payload,
    isLoading: false
  };
};

const queryAllAccountTypesRequest = () => {
  return {
    type: constants.QUERY_ALL_ACCOUNTTYPES_REQUEST,
    isLoading: true
  };
};

const queryAllAccountTypesSuccess = payload => {
  return {
    type: constants.QUERY_ALL_ACCOUNTTYPES_SUCCESS,
    payload,
    isLoading: true
  };
};

const queryAllAccountTypesFailure = () => {
  return {
    type: constants.QUERY_ALL_ACCOUNTTYPES_FAILURE,
    isLoading: true
  };
};

export const getAccounts = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getAccountsRequest());
    try {
      const response = await api.getAaAccounts(params);

      if (response.status === 200 && response.data.resCode === "00") {
        const { totalPage } = response.data;
        if (totalPage <= 0) {
          dispatch(getAccountsSuccess([]));
          return;
        }
        if (params.currentPage <= totalPage) {
          dispatch(getAccountsSuccess(response.data));
        } else {
          params.currentPage = totalPage;
          dispatch(setCurrentPage({ currentPage: totalPage }));
          dispatch(getAccounts(params));
        }
      } else {
        dispatch(getAccountsFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getAccountsFail(error));
    }
  };
};

export const addAccountModalToggle = record => {
  return dispatch => {
    addAccountModalSwitch = !addAccountModalSwitch;
    if (addAccountModalSwitch) {
      if (record && record.userName) {
        dispatch(setFormData({ username: record.userName }));
      }
      dispatch(showAddAccountModal(record));
    } else {
      dispatch(setFormData({}));
      dispatch(hideAddAccountModal());
    }
  };
};

export const deleteAccountModalToggle = record => {
  return dispatch => {
    deleteAccountModalSwitch = !deleteAccountModalSwitch;
    if (deleteAccountModalSwitch) {
      dispatch(showDeleteAccountModal(record));
    } else {
      dispatch(hideDeleteAccountModal());
    }
  };
};

export const addAccount = params => {
  return async dispatch => {
    dispatch(addAccountRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.addAaAccount(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(addAccountSuccess(response.data));
        dispatch(addAccountModalToggle());
        dispatch(
          getAccounts({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addAccountFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(addAccountFail(error));
    }
  };
};

export const updateAccount = params => {
  return async dispatch => {
    dispatch(updateAccountRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.updateAaAccount(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(updateAccountSuccess(response.data));
        dispatch(addAccountModalToggle());
        dispatch(
          getAccounts({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updateAccountFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(updateAccountFail(error));
    }
  };
};

export const deleteAccount = params => {
  return async dispatch => {
    dispatch(deleteAccountRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.deleteAaAccount(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(deleteAccountSuccess(response.data));
        dispatch(deleteAccountModalToggle());
        dispatch(
          getAccounts({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deleteAccountFail(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(deleteAccountFail(error));
    }
  };
};

export const queryAllAccountTypes = params => {
  return async dispatch => {
    dispatch(queryAllAccountTypesRequest());
    try {
      const response = await api.queryAllAccountTypes(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(
          queryAllAccountTypesSuccess(
            response.data &&
              response.data.roleInfoList &&
              Array.isArray(response.data.roleInfoList) &&
              response.data.roleInfoList.filter((ril, idx) => !ril.isSuperRole)
          )
        );
      } else {
        dispatch(queryAllAccountTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(queryAllAccountTypesFailure(error));
    }
  };
};

export const setCurrentPage = payload => {
  return {
    type: constants.SET_CURRENT_PAGE,
    payload
  };
};

export const setFormData = payload => {
  return {
    type: constants.SET_FORM_DATA,
    payload
  };
};
