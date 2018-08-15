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
    GET_ROLES_FAILURE,  
    SHOW_ADDROLE_MODAL,
    HIDE_ADDROLE_MODAL,
    QUERY_ALL_ROLETYPES_REQUEST,
    QUERY_ALL_ROLETYPES_SUCCESS,
    QUERY_ALL_ROLETYPES_FAILURE,
  } from './constants';
  
  // The initial state of the account
  const initialState = {};
  
  function aaRoleReducer(state = initialState, action) {
    switch(action.type) {
      case GET_ROLES_REQUEST:
        return Object.assign({}, state, {
          isLoading: true,
        });
      case GET_ROLES_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          roleResult: action.payload.roleInfoList || [],
          total: action.payload.totalRecord
        });
      case GET_ROLES_FAILURE:
        return Object.assign({}, state, {
          isLoading: false,
        });
      case QUERY_ALL_ROLETYPES_REQUEST:
        return Object.assign({}, state, {
          isLoading: true,
        });
      case QUERY_ALL_ROLETYPES_SUCCESS:
        return Object.assign({}, state, {
          roleTypes: action.payload,
          isLoading: false,
        });
      case QUERY_ALL_ROLETYPES_FAILURE:
        return Object.assign({}, state, {
          isLoading: false,
        });
      case SHOW_ADDROLE_MODAL:
      case HIDE_ADDROLE_MODAL:
        return Object.assign({}, state, {
          shouldAddRoleModalOpen: action.shouldOpen,
        });
      default:
        return state;    
    }  
  }
  
  export default aaRoleReducer;