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
  ADD_MODEL_REQUEST,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_REQUEST,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  UPDATE_MODEL_REQUEST,
  UPDATE_MODEL_SUCCESS,
  UPDATE_MODEL_FAILURE,
  UPLOAD_MODEL_FILE_REQUEST,
  UPLOAD_MODEL_FILE_SUCCESS,
  UPLOAD_MODEL_FILE_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  SET_FORM_DATA,
  GET_MODEL_INFO_BYID_REQUEST,
  GET_MODEL_INFO_BYID_SUCCESS,
  GET_MODEL_INFO_BYID_FAILURE,
  UPDATE_MODEL_FILE_REQUEST,
  UPDATE_MODEL_FILE_SUCCESS,
  UPDATE_MODEL_FILE_FAILURE,
  SET_CURRENT_PAGE,
  SET_FILE_IPT_STATE,
  SET_UPLOAD_MODEL_FILE_INFO
} from "./constants";

// The initial state of the model
const initialState = {
  formData: {},
  pageSize: 20,
  showFileIpt: false
};

function iaModelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_IAMODEL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_IAMODEL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        total: action.payload.totalRecord || 0,
        modelResult: action.payload.templateInfoList || []
      });
    case GET_IAMODEL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPLOAD_MODEL_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPLOAD_MODEL_FILE_SUCCESS:
      return Object.assign({}, state, {
        uploadModelFileInfo: action.payload,
        isLoading: action.isLoading
      });
    case UPLOAD_MODEL_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case ADD_MODEL_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case ADD_MODEL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });
    case ADD_MODEL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false
      });
    case UPDATE_MODEL_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case UPDATE_MODEL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });
    case UPDATE_MODEL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false
      });
    case DELETE_MODEL_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case DELETE_MODEL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });
    case DELETE_MODEL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false
      });
    case QUERY_ALL_MODELTYPES_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case QUERY_ALL_MODELTYPES_SUCCESS:
      return Object.assign({}, state, {
        modelTypes: action.payload,
        isLoading: action.isLoading
      });
    case QUERY_ALL_MODELTYPES_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case SHOW_ADDMODEL_MODAL:
    case HIDE_ADDMODEL_MODAL:
      return Object.assign({}, state, {
        record: action.payload,
        shouldAddModelModalOpen: action.shouldOpen
      });
    case SHOW_DELETEMODEL_MODAL:
    case HIDE_DELETEMODEL_MODAL:
      return Object.assign({}, state, {
        record: {
          interactionTemplateId:
            (action.payload && action.payload.templateId) || ""
        },
        shouldDeleteModelModalOpen: action.shouldOpen
      });
    case SET_FORM_DATA:
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
      return Object.assign({}, state);
    case GET_MODEL_INFO_BYID_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_MODEL_INFO_BYID_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        modelInfo: action.payload
      });
    case GET_MODEL_INFO_BYID_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPDATE_MODEL_FILE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case UPDATE_MODEL_FILE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        uploadModelFileInfo: action.payload
      };
    case UPDATE_MODEL_FILE_FAILURE:
      return {
        ...state,
        uploadModelFileInfo: action.payload,
        isLoading: action.isLoading
      };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_FILE_IPT_STATE:
      return { ...state, showFileIpt: action.payload.showFileIpt };
    case SET_UPLOAD_MODEL_FILE_INFO:
      state.uploadModelFileInfo = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export default iaModelReducer;
