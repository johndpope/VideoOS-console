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
import * as constants from "./constants";

// The initial state of the login
const initialState = {
  currentPage: 1,
  formData: {}
};

function iaTypeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_IATYPE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_IATYPE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        typeResult: action.payload.interactionInfoList,
        total: action.payload.totalRecord
      };
    case constants.GET_IATYPE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_IATYPE_BYID_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_IATYPE_BYID_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        configInfo: action.payload && action.payload.configInfo,
        fileName: action.payload && action.payload.fileName
      };
    case constants.GET_IATYPE_BYID_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_TYPE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_TYPE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_TYPE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_TYPE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_TYPE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_TYPE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SHOW_ADDTYPE_MODAL:
    case constants.HIDDEN_ADDTYPE_MODAL:
      return {
        ...state,
        record: action.payload || {},
        shouldAddTypeModalOpen: action.shouldOpen
      };
    case constants.SHOW_DELETETYPE_MODAL:
    case constants.HIDE_DELETETYPE_MODAL:
      return {
        ...state,
        shouldDeleteTypeModalOpen: action.shouldOpen,
        record: action.payload || {}
      };
    case constants.SET_FORM_DATA:
      const payload = action.payload;
      if (typeof payload === "object") {
        if (Object.keys(payload).length === 0) {
          state.formData = payload;
        } else {
          Object.keys(payload).forEach(key => {
            state.formData[key] = payload[key];
          });
        }
      }
      return { ...state };
    case constants.SET_FILE_IPT_STATE:
      return { ...state, showFileIpt: action.payload.showFileIpt };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    default:
      return state;
  }
}

export default iaTypeReducer;
