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
  QUERY_ALL_ACCOUNTTYPES_REQUEST,
  QUERY_ALL_ACCOUNTTYPES_SUCCESS,
  QUERY_ALL_ACCOUNTTYPES_FAILURE,
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

      });
    case ADD_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        
      });
    case ADD_ACCOUNT_FAIL:
      return Object.assign({}, state, {
        addAccountResErr: action.payload.resMsg,
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
        shouldAddAccountModalOpen: action.shouldOpen,
      });
    default:
      return state;
  }  
}

export default aaAccountReducer;