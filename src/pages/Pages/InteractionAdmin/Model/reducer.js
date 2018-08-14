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
    SHOW_ADDMODEL_MODAL,
    HIDE_ADDMODEL_MODAL,
  } from './constants';
  
// The initial state of the model
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
    case SHOW_ADDMODEL_MODAL:
    case HIDE_ADDMODEL_MODAL:
      return Object.assign({}, state, {
        shouldAddModelModalOpen: action.shouldOpen,
      })
    default:
      return state;
  }
}

export default iaModelReducer;
  