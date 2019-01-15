/*
 * Log Reducer
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
const initialState = {
  currentPage: 1,
  formData: {}
};

function logReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_LOGS_REQUEST:
      return { ...state, isLoading: action.isLoading };
    case constants.GET_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logResult: action.payload.operationLogList,
        total: action.payload.totalRecord
      };
    case constants.GET_LOGS_FAILURE:
      return { ...state, isLoading: false };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    default:
      return state;
  }
}

export default logReducer;
