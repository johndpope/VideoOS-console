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
    SHOW_DELETEMODEL_MODAL,
    HIDE_DELETEMODEL_MODAL,
    UPLOAD_MODEL_FILE_REQUEST,
    UPLOAD_MODEL_FILE_SUCCESS,
    UPLOAD_MODEL_FILE_FAILURE,
    QUERY_ALL_MODELTYPES_REQUEST,
    QUERY_ALL_MODELTYPES_SUCCESS,
    QUERY_ALL_MODELTYPES_FAILURE,
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
        modelResult: action.payload.templateInfoList || [],
      });
    case GET_IAMODEL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case UPLOAD_MODEL_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case UPLOAD_MODEL_FILE_SUCCESS:
      return Object.assign({}, state, {
        uploadModelFileInfo: action.payload,
        isLoading: action.isLoading,
      });
    case UPLOAD_MODEL_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case QUERY_ALL_MODELTYPES_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case QUERY_ALL_MODELTYPES_SUCCESS:
      return Object.assign({}, state, {
        modelTypes: action.payload,
        isLoading: action.isLoading,
      });
    case QUERY_ALL_MODELTYPES_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case SHOW_ADDMODEL_MODAL:
    case HIDE_ADDMODEL_MODAL:
      return Object.assign({}, state, {
        record: action.payload,
        shouldAddModelModalOpen: action.shouldOpen,
      });
    case SHOW_DELETEMODEL_MODAL:
    case HIDE_DELETEMODEL_MODAL:
      return Object.assign({}, state, {
        record: {interactionTemplateId: action.payload && action.payload.templateId || ''},
        shouldDeleteModelModalOpen: action.shouldOpen,
      });
    default:
      return state;
  }
}

export default iaModelReducer;
  