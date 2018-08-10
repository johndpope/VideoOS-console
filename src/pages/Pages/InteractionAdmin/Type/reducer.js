/*
 * IAType Reducer
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
    GET_IATYPE_REQUEST,
    GET_IATYPE_SUCCESS,
    GET_IATYPE_FAILURE,
  } from './constants';
  
  // The initial state of the login
  const initialState = {};
  
  function iaTypeReducer(state = initialState, action) {
    switch (action.type) {
      case GET_IATYPE_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case GET_IATYPE_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
          typeResult: action.payload.interactionInfoList,
          total: action.payload.totalRecord
        });
      case GET_IATYPE_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      default:
        return state;
    }
  }
  
  export default iaTypeReducer;
  