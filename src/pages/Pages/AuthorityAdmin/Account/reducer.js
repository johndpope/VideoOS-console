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
} from './constants';
import { stat } from 'fs';

// The initial state of the account
const initialState = {};

function aaAccountReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ACCOUNTS_REQUEST:
      return Object.assign({}, state, {

      });
    case GET_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        
      });
    case GET_ACCOUNTS_FAIL:
      return Object.assign({}, state, {
        
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