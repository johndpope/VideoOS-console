/*
 * Plan Reducer
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
  SHOW_ADD_PLAN,
  HIDE_ADD_PLAN,
  SHOW_NEW_PLAN_DROPDOWN,
  HIDE_NEW_PLAN_DROPDOWN,
  GET_AD_PLANS_REQUEST,
  GET_AD_PLANS_SUCCESS,
  GET_AD_PLANS_FAILURE,
  GET_AD_PLAN_BYID_REQUEST,
  GET_AD_PLAN_BYID_SUCCESS,
  GET_AD_PLAN_BYID_FAILURE,
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAILURE,
  UPDATE_PLAN_REQUEST,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
} from './constants';
// The initial state of the plan
const initialState = {};

function adPlanReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_NEW_PLAN_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewPlanDropDownOpen: action.shouldOpen,
      });
    case HIDE_NEW_PLAN_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewPlanDropDownOpen: action.shouldOpen,
      });
    case GET_AD_PLANS_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_PLANS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_PLANS_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_PLAN_BYID_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_PLAN_BYID_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case GET_AD_PLAN_BYID_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_PLAN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_PLAN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case ADD_PLAN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_PLAN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_PLAN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case UPDATE_PLAN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case DELETE_PLAN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case DELETE_PLAN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    case DELETE_PLAN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,  
      });
    default:
      return state;  
  }
}

export default adPlanReducer;