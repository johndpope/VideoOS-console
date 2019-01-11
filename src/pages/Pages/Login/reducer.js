/*
 * LoginReducer
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

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        loginResult: action.payload
      };
    case constants.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

export default loginReducer;
