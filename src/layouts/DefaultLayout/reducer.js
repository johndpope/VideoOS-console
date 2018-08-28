/*
 * Layout Reducer
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
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    SHOW_PASSWORD_RESET_MODEL,
    HIDE_PASSWORD_RESET_MODEL,
  } from './constants';
  
  // The initial state of the login
  const initialState = {};
  
  function logoutReducer(state = initialState, action) {
    switch (action.type) {
      case USER_LOGOUT_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case USER_LOGOUT_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case USER_LOGOUT_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case SHOW_PASSWORD_RESET_MODEL:
      case HIDE_PASSWORD_RESET_MODEL:  
        return Object.assign({}, state, {
          shouldPasswordResetModalOpen: action.shouldOpen,
        });
      default:
        return state;
    }
  }
  
  export default logoutReducer;
  