/*
 * Material Reducer
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
  SHOW_ADD_MATERIAL,
  HIDE_ADD_MATERIAL,
  SHOW_DELETE_MATERIAL_MODAL,
  HIDE_DELETE_MATERIAL_MODAL,
  SHOW_NEW_MATERIAL_DROPDOWN,
  HIDE_NEW_MATERIAL_DROPDOWN,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  GET_IATYPE_BYID_REQUEST,
  GET_IATYPE_BYID_SUCCESS,
  GET_IATYPE_BYID_FAILURE,
  GET_AD_METERIAL_BYID_REQUEST,
  GET_AD_METERIAL_BYID_SUCCESS,
  GET_AD_METERIAL_BYID_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  ADD_METERIAL_REQUEST,
  ADD_METERIAL_SUCCESS,
  ADD_METERIAL_FAILURE,
  UPDATE_METERIAL_REQUEST,
  UPDATE_METERIAL_SUCCESS,
  UPDATE_METERIAL_FAILURE,
  DELETE_METERIAL_REQUEST,
  DELETE_METERIAL_SUCCESS,
  DELETE_METERIAL_FAILURE,
  ADD_MATERIAL_FILE_REQUEST,
  ADD_MATERIAL_FILE_SUCCESS,
  ADD_MATERIAL_FILE_FAILURE,
  SAVE_FORM_DATA,
  GET_MATERIAL_INFO_REQUEST,
  GET_MATERIAL_INFO_SUCCESS,
  GET_MATERIAL_INFO_FAILURE,
  SET_CURRENT_PAGE,
  SET_FILE_DATA,
  SET_SWITCHER
} from "./constants";

// The initial state of the material
const initialState = {
  formData: {},
  fileData: {},
  creativeIdList: [],
  uiSchemaConf: {}
};

function adMaterialReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_MATERIAL:
    case HIDE_ADD_MATERIAL:
      return Object.assign({}, state, {
        shouldAddMaterialOpen: action.shouldOpen,
        record: action.payload
      });
    case SHOW_DELETE_MATERIAL_MODAL:
    case HIDE_DELETE_MATERIAL_MODAL:
      return Object.assign({}, state, {
        record: {
          creativeId: (action.payload && action.payload.creativeId) || ""
        },
        shouldDeleteMaterialOpen: action.shouldOpen
      });
    case SHOW_NEW_MATERIAL_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewMaterialDropDownOpen: action.shouldOpen
      });
    case HIDE_NEW_MATERIAL_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewMaterialDropDownOpen: action.shouldOpen
      });
    case GET_AD_METERIALS_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_AD_METERIALS_SUCCESS:
      return Object.assign({}, state, {
        total: action.payload.totalRecord || 0,
        materialResult: action.payload.creativeInfoList || [],
        isLoading: action.isLoading
      });
    case GET_AD_METERIALS_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_MATERIAL_INFO_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_MATERIAL_INFO_SUCCESS:
      state.formData = action.payload || {};
      return Object.assign({}, state, {
        creativeContent: action.payload.creativeContent || [],
        isLoading: action.isLoading
      });
    case GET_MATERIAL_INFO_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_AD_METERIAL_BYID_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_AD_METERIAL_BYID_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_AD_METERIAL_BYID_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_IATYPE_BYID_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_IATYPE_BYID_SUCCESS:
      return Object.assign({}, state, {
        materialSchema: action.payload,
        isLoading: action.isLoading
      });
    case GET_IATYPE_BYID_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
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
    case ADD_METERIAL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case ADD_METERIAL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case ADD_METERIAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPDATE_METERIAL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPDATE_METERIAL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPDATE_METERIAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case DELETE_METERIAL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case DELETE_METERIAL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case DELETE_METERIAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case ADD_MATERIAL_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case ADD_MATERIAL_FILE_SUCCESS:
      if (action && action.payload._type) {
        state.fileData[action.payload._type] = action.payload.fileUrl;
        if (
          Array.isArray(state.creativeIdList) &&
          state.creativeIdList.indexOf(action.payload.creativeFileId) === -1
        ) {
          state.creativeIdList.push(action.payload.creativeFileId);
        }
      }
      return Object.assign({}, state);
    case ADD_MATERIAL_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case SAVE_FORM_DATA:
      state.formData = action.payload;
      return Object.assign({}, state);
    case SET_FILE_DATA:
      state.fileData = action.payload;
      return { ...state };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_SWITCHER:
      const payload = action.payload;
      if (typeof payload === "object") {
        if (Object.keys(payload).length === 0) {
          state.uiSchemaConf = payload;
        } else {
          Object.keys(payload).forEach(key => {
            state.uiSchemaConf[key] = payload[key];
          });
        }
      }
      return { ...state };
    default:
      return state;
  }
}

export default adMaterialReducer;
