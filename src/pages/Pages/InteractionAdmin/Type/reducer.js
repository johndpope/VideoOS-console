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
    SHOW_ADDTYPE_MODAL,
    HIDDEN_ADDTYPE_MODAL,
    SHOW_DELETETYPE_MODAL,
    HIDE_DELETETYPE_MODAL,
    ADD_TYPE_REQUEST,
    ADD_TYPE_SUCCESS,
    ADD_TYPE_FAILURE,
    DELETE_TYPE_REQUEST,
    DELETE_TYPE_SUCCESS,
    DELETE_TYPE_FAILURE,
    UPDATE_TYPE_REQUEST,
    UPDATE_TYPE_SUCCESS,
    UPDATE_TYPE_FAILURE,
    GET_IATYPE_BYID_REQUEST,
    GET_IATYPE_BYID_SUCCESS,
    GET_IATYPE_BYID_FAILURE,
    SET_FORM_DATA,
  } from './constants';
  
  // The initial state of the login
  const initialState = {
    currentPage: 1,
    formData: {},
  };
  
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
      case GET_IATYPE_BYID_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case GET_IATYPE_BYID_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
          record: action.payload,
        });
      case GET_IATYPE_BYID_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case ADD_TYPE_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case ADD_TYPE_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case ADD_TYPE_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case DELETE_TYPE_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case DELETE_TYPE_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case DELETE_TYPE_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case UPDATE_TYPE_REQUEST:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case UPDATE_TYPE_SUCCESS:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case UPDATE_TYPE_FAILURE:
        return Object.assign({}, state, {
          isLoading: action.isLoading,
        });
      case SHOW_ADDTYPE_MODAL:
      case HIDDEN_ADDTYPE_MODAL:
        return Object.assign({}, state, {
          record: action.payload || {},
          shouldAddTypeModalOpen: action.shouldOpen
        });
      case SHOW_DELETETYPE_MODAL:
      case HIDE_DELETETYPE_MODAL:
        return Object.assign({}, state, {
          shouldDeleteTypeModalOpen: action.shouldOpen,
          record: action.payload || {},
        });
      case SET_FORM_DATA:
        const payload = action.payload;
        if (typeof payload === 'object') {
          Object.keys(payload).forEach(key => {
            state.formData[key] = payload[key];
          });
        }
        return Object.assign({}, state);  
      default:
        return state;
    }
  }
  
  export default iaTypeReducer;
  