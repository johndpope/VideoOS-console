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

import {
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAIL,
  SHOW_ADDACCOUNT_MODAL,
  HIDE_ADDACCOUNT_MODAL,
  ADD_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  QUERY_ALL_ACCOUNTTYPES_REQUEST,
  QUERY_ALL_ACCOUNTTYPES_SUCCESS,
  QUERY_ALL_ACCOUNTTYPES_FAILURE,
  SHOW_DELETEACCOUNT_MODAL,
  HIDE_DELETEACCOUNT_MODAL,
} from './constants';
import { stat } from 'fs';

// The initial state of the account
const initialState = {};

function aaAccountReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ACCOUNTS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GET_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        accountResult: action.payload.userInfoList || [],
        total: action.payload.totalRecord,
      });
    case GET_ACCOUNTS_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case ADD_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ADD_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case ADD_ACCOUNT_FAIL:
      return Object.assign({}, state, {
        addAccountResErr: action.payload.resMsg,
        isLoading: false,
      });
    case UPDATE_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case UPDATE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case UPDATE_ACCOUNT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case DELETE_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case DELETE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case DELETE_ACCOUNT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case QUERY_ALL_ACCOUNTTYPES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case QUERY_ALL_ACCOUNTTYPES_SUCCESS:
      return Object.assign({}, state, {
        roleTypes: action.payload,
        isLoading: false,
      });
    case QUERY_ALL_ACCOUNTTYPES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case SHOW_ADDACCOUNT_MODAL:
    case HIDE_ADDACCOUNT_MODAL:
      return Object.assign({}, state, {
        record: action.payload,
        shouldAddAccountModalOpen: action.shouldOpen,
      });
    case SHOW_DELETEACCOUNT_MODAL:
    case HIDE_DELETEACCOUNT_MODAL:
      return Object.assign({}, state, {
        record: {roleId: action.payload && action.payload.roleId || ''},
        shouldDeleteAccountModalOpen: action.shouldOpen,
      });
    default:
      return state;
  }  
}

export default aaAccountReducer;