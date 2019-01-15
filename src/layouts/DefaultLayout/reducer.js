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
import * as constants from "./constants";

// The initial state of the login
const initialState = {};

function logoutReducer(state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SHOW_PASSWORD_RESET_MODEL:
    case constants.HIDE_PASSWORD_RESET_MODEL:
      return {
        ...state,
        shouldPasswordResetModalOpen: action.shouldOpen
      };
    default:
      return state;
  }
}

export default logoutReducer;
