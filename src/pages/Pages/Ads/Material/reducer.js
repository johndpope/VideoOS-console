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
  UPDATE_FORM_SCHEMA,
} from './constants';

// The initial state of the material
const initialState = {
  formData: {},
};

function adMaterialReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_ADD_MATERIAL:
      return Object.assign({}, state, {
        shouldAddMaterialOpen: action.shouldOpen,
      });
    case HIDE_ADD_MATERIAL:
      return Object.assign({}, state, {
        shouldAddMaterialOpen: action.shouldOpen,
      });
    case SHOW_NEW_MATERIAL_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewMaterialDropDownOpen: action.shouldOpen,
      });
    case HIDE_NEW_MATERIAL_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewMaterialDropDownOpen: action.shouldOpen,
      });
    case GET_AD_METERIALS_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_METERIALS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_METERIALS_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_METERIAL_BYID_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_METERIAL_BYID_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_METERIAL_BYID_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_IATYPE_BYID_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_IATYPE_BYID_SUCCESS:
      return Object.assign({}, state, {
        materialSchema: action.payload,
        isLoading: action.isLoading,  
      });
    case GET_IATYPE_BYID_FAILURE:
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
    case ADD_METERIAL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_METERIAL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_METERIAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_METERIAL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_METERIAL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_METERIAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case DELETE_METERIAL_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case DELETE_METERIAL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case DELETE_METERIAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_MATERIAL_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_MATERIAL_FILE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
        addMaterialFileInfo: action.payload,
      });
    case ADD_MATERIAL_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_FORM_SCHEMA:
      if (state && state.materialSchema) {
        delete state.materialSchema.properties.interactionTypeId.enum;
        delete state.materialSchema.properties.interactionTypeId.enumNames;
        state.materialSchema.properties.interactionTypeId.anyOf = [
          {
            type: 'number',
            title: action.payload.interactionTypeName,
            enum: [
              action.payload.interactionTypeId,
            ]
          }
        ];
      }
      return Object.assign({}, state);
    default:
      return state;
  }
}

export default adMaterialReducer;