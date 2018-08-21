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
  GET_AD_METERIAL_BYID_REQUEST,
  GET_AD_METERIAL_BYID_SUCCESS,
  GET_AD_METERIAL_BYID_FAILURE,
  ADD_METERIAL_REQUEST,
  ADD_METERIAL_SUCCESS,
  ADD_METERIAL_FAILURE,
  UPDATE_METERIAL_REQUEST,
  UPDATE_METERIAL_SUCCESS,
  UPDATE_METERIAL_FAILURE,
  DELETE_METERIAL_REQUEST,
  DELETE_METERIAL_SUCCESS,
  DELETE_METERIAL_FAILURE,
} from './constants';

// The initial state of the material
const initialState = {};

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
    default:
      return state;  
  }
}

export default adMaterialReducer;