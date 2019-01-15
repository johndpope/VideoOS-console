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
import * as constants from "./constants";

// The initial state of the material
const initialState = {
  formData: {},
  fileData: {},
  creativeIdList: [],
  uiSchemaConf: {}
};

function adMaterialReducer(state = initialState, action) {
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
    case constants.GET_AD_METERIALS_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_AD_METERIALS_SUCCESS:
      return {
        ...state,
        total: action.payload.totalRecord || 0,
        materialResult: action.payload.creativeInfoList || [],
        isLoading: action.isLoading
      };
    case constants.GET_AD_METERIALS_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_METERIAL_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_METERIAL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_METERIAL_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

export default adMaterialReducer;
