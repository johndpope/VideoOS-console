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
} from './constants';

// The initial state of the account
const initialState = {};

function aaAccountReducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;    
  }  
}

export default aaAccountReducer;