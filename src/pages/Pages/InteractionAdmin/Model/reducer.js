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
    GET_IAMODEL_REQUEST,
    GET_IAMODEL_SUCCESS,
    GET_IAMODEL_FAILURE,
  } from './constants';
  
  // The initial state of the login
  const initialState = {};
  
  function iaModelReducer(state = initialState, action) {
    switch (action.type) {
      case GET_IAMODEL_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case GET_IAMODEL_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
          ModelResult: action.payload,
        });
      case GET_IAMODEL_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      default:
        return state;
    }
  }
  
  export default iaModelReducer;
  