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
import * as constants from "./constants";

// The initial state of the model
const initialState = {
  formData: {},
  pageSize: 20,
  showFileIpt: false
};

function iaModelReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_IAMODEL_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_IAMODEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        total: action.payload.totalRecord || 0,
        modelResult: action.payload.templateInfoList || []
      };
    case constants.GET_IAMODEL_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPLOAD_MODEL_FILE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPLOAD_MODEL_FILE_SUCCESS:
      return {
        ...state,
        uploadModelFileInfo: action.payload,
        isLoading: action.isLoading
      };
    case constants.UPLOAD_MODEL_FILE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.ADD_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.ADD_MODEL_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.UPDATE_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.UPDATE_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.UPDATE_MODEL_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.DELETE_MODEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.DELETE_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.DELETE_MODEL_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.QUERY_ALL_MODELTYPES_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.QUERY_ALL_MODELTYPES_SUCCESS:
      return {
        ...state,
        modelTypes: action.payload,
        isLoading: action.isLoading
      };
    case constants.QUERY_ALL_MODELTYPES_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SHOW_ADDMODEL_MODAL:
    case constants.HIDE_ADDMODEL_MODAL:
      return {
        ...state,
        record: action.payload,
        shouldAddModelModalOpen: action.shouldOpen
      };
    case constants.SHOW_DELETEMODEL_MODAL:
    case constants.HIDE_DELETEMODEL_MODAL:
      return {
        ...state,
        record: {
          interactionTemplateId:
            (action.payload && action.payload.templateId) || ""
        },
        shouldDeleteModelModalOpen: action.shouldOpen
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
    case constants.GET_MODEL_INFO_BYID_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_MODEL_INFO_BYID_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        modelInfo: action.payload
      };
    case constants.GET_MODEL_INFO_BYID_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_MODEL_FILE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_MODEL_FILE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        uploadModelFileInfo: action.payload
      };
    case constants.UPDATE_MODEL_FILE_FAILURE:
      return {
        ...state,
        uploadModelFileInfo: action.payload,
        isLoading: action.isLoading
      };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case constants.SET_FILE_IPT_STATE:
      return { ...state, showFileIpt: action.payload.showFileIpt };
    case constants.SET_UPLOAD_MODEL_FILE_INFO:
      state.uploadModelFileInfo = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export default iaModelReducer;
