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
  SHOW_DELETE_MATERIAL_MODAL,
  HIDE_DELETE_MATERIAL_MODAL,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  DELETE_METERIAL_REQUEST,
  DELETE_METERIAL_SUCCESS,
  DELETE_METERIAL_FAILURE
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
    case SHOW_DELETE_MATERIAL_MODAL:
    case HIDE_DELETE_MATERIAL_MODAL:
      return Object.assign({}, state, {
        record: {
          creativeId: (action.payload && action.payload.creativeId) || ""
        },
        shouldDeleteMaterialOpen: action.shouldOpen
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
    default:
      return state;
  }
}

export default adMaterialReducer;
