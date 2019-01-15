/*
 * MaterialCRUD Reducer
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

// The initial state of the material
let tempFormData = null;
const initialState = {
  formData: {},
  fileData: {},
  creativeIdList: [],
  uiSchemaConf: {}
};

function materialCRUDReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SHOW_DELETE_MATERIAL_MODAL:
    case constants.HIDE_DELETE_MATERIAL_MODAL:
      return {
        ...state,
        record: {
          creativeId: (action.payload && action.payload.creativeId) || ""
        },
        shouldDeleteMaterialOpen: action.shouldOpen
      };
    case constants.GET_MATERIAL_INFO_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_MATERIAL_INFO_SUCCESS:
      state.formData = action.payload.creativeContent
        ? JSON.parse(action.payload.creativeContent)
        : {};
      return {
        ...state,
        creativeContent: action.payload.creativeContent || [],
        isLoading: action.isLoading
      };
    case constants.GET_MATERIAL_INFO_FAILURE:
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
        materialSchema: action.payload,
        isLoading: action.isLoading
      };
    case constants.GET_IATYPE_BYID_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_METERIAL_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_METERIAL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_METERIAL_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_METERIAL_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_METERIAL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_METERIAL_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_MATERIAL_FILE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_MATERIAL_FILE_SUCCESS:
      if (action && action.payload._type) {
        state.fileData[action.payload._type] = action.payload.fileUrl;
        state.fileData[`_${action.payload._type}`] = action.payload;
        if (state.fileData && Object.keys(state.fileData).length > 0) {
          for (let key in state.fileData) {
            state.formData[key] = state.fileData[key];
          }
        }
        if (
          Array.isArray(state.creativeIdList) &&
          state.creativeIdList.indexOf(action.payload.creativeFileId) === -1
        ) {
          state.creativeIdList.push(action.payload.creativeFileId);
        }
      }
      return { ...state };
    case constants.ADD_MATERIAL_FILE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SAVE_FORM_DATA:
      const _payload = action.payload;
      if (_payload === "refresh") {
        const { formData } = state;
        tempFormData = { ...formData };
        state.formData = {};
      }
      if (_payload === "recover") {
        state.formData = { ...tempFormData };
        tempFormData = null;
      }
      if (typeof _payload === "object") {
        if (Object.keys(_payload).length === 0) {
          state.formData = _payload;
        } else {
          Object.keys(_payload).forEach(key => {
            state.formData[key] = _payload[key];
          });
        }
      }
      // state.formData = action.payload;
      return { ...state };
    case constants.SET_FILE_DATA:
      state.fileData = action.payload;
      return { ...state };
    case constants.SET_SWITCHER:
      const payload = action.payload;
      if (payload === "refresh") {
        for (let key in state.uiSchemaConf) {
          state.uiSchemaConf[key] = false;
        }
      }
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
    case constants.SET_MATERIAL_SCHEMA:
      return { ...state, materialSchema: action.payload };
    default:
      return state;
  }
}

export default materialCRUDReducer;
