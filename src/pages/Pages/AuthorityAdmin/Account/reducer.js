/*
 * IAModelReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import * as constants from "./constants";

// The initial state of the account
const initialState = {
  formData: {}
};

function aaAccountReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ACCOUNTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accountResult: action.payload.userInfoList || [],
        total: action.payload.totalRecord
      };
    case constants.GET_ACCOUNTS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case constants.ADD_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.ADD_ACCOUNT_FAIL:
      return {
        ...state,
        addAccountResErr: action.payload.resMsg,
        isLoading: false
      };
    case constants.UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.QUERY_ALL_ACCOUNTTYPES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.QUERY_ALL_ACCOUNTTYPES_SUCCESS:
      return {
        ...state,
        roleTypes: action.payload,
        isLoading: false
      };
    case constants.QUERY_ALL_ACCOUNTTYPES_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.SHOW_ADDACCOUNT_MODAL:
    case constants.HIDE_ADDACCOUNT_MODAL:
      return {
        ...state,
        record: action.payload,
        shouldAddAccountModalOpen: action.shouldOpen
      };
    case constants.SHOW_DELETEACCOUNT_MODAL:
    case constants.HIDE_DELETEACCOUNT_MODAL:
      return {
        ...state,
        record: { userId: (action.payload && action.payload.userId) || "" },
        shouldDeleteAccountModalOpen: action.shouldOpen
      };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case constants.SET_FORM_DATA:
      const payload = action.payload;
      if (typeof payload === "object") {
        if (Object.keys(payload).length === 0) {
          state.formData = payload;
        } else {
          Object.keys(payload).forEach(key => {
            state.formData[key] = payload[key];
          });
        }
      }
      return { ...state };
    default:
      return state;
  }
}

export default aaAccountReducer;
