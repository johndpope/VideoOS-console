/*
 * AARole reducer
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
    GET_ROLES_REQUEST,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAIL,  
    SHOW_ADDROLE_MODAL,
    HIDE_ADDROLE_MODAL,
  } from './constants';
  
  // The initial state of the account
  const initialState = {};
  
  function aaRoleReducer(state = initialState, action) {
    switch(action.type) {
      default:
        return state;    
    }  
  }
  
  export default aaRoleReducer;