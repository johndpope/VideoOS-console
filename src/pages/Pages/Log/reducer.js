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

import {
  GET_LOGS_REQUEST,
  GET_LOGS_SUCCESS,
  GET_LOGS_FAILURE,
  SET_CURRENT_PAGE
} from "./constants";

// The initial state of the login
const initialState = {
  currentPage: 1,
  formData: {}
};

function logReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGS_REQUEST:
      return { ...state, isLoading: action.isLoading };
    case GET_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logResult: action.payload.operationLogList,
        total: action.payload.totalRecord
      };
    case GET_LOGS_FAILURE:
      return { ...state, isLoading: false };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    default:
      return state;
  }
}

export default logReducer;
