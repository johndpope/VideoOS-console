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
  SHOW_DELETE_PLAN,
  HIDE_DELETE_PLAN,
  SHOW_NEW_PLAN_DROPDOWN,
  HIDE_NEW_PLAN_DROPDOWN,
  GET_AD_PLANS_REQUEST,
  GET_AD_PLANS_SUCCESS,
  GET_AD_PLANS_FAILURE,
  SHOW_LAUNCH_PLAN,
  HIDE_LAUNCH_PLAN,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
  LAUNCH_PLAN_REQUEST,
  LAUNCH_PLAN_SUCCESS,
  LAUNCH_PLAN_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  SET_FORM_DATA,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  SET_CURRENT_PAGE,
  SET_RELAUNCH
} from "./constants";
// The initial state of the plan
const initialState = {
  formData: {},
  isEdit: false,
  reLaunch: true
};

function adPlanReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_PLAN:
    case HIDE_ADD_PLAN:
      return Object.assign({}, state, {
        record: action.payload,
        shouldAddPlanModalOpen: action.shouldOpen
      });
    case SHOW_LAUNCH_PLAN:
    case HIDE_LAUNCH_PLAN:
      return Object.assign({}, state, {
        record: action.payload,
        shouldLaunchPlanModalOpen: action.shouldOpen
      });
    case SHOW_NEW_PLAN_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewPlanDropDownOpen: action.shouldOpen
      });
    case HIDE_NEW_PLAN_DROPDOWN:
      return Object.assign({}, state, {
        shouldNewPlanDropDownOpen: action.shouldOpen
      });
    case GET_AD_PLANS_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_AD_PLANS_SUCCESS:
      return Object.assign({}, state, {
        total: action.payload.totalRecord || 0,
        planResult: action.payload.launchPlanList || [],
        isLoading: action.isLoading
      });
    case GET_AD_PLANS_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case DELETE_PLAN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case DELETE_PLAN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case DELETE_PLAN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case LAUNCH_PLAN_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case LAUNCH_PLAN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        reLaunch: false
      });
    case LAUNCH_PLAN_FAILURE:
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
    case SHOW_DELETE_PLAN:
    case HIDE_DELETE_PLAN:
      return Object.assign({}, state, {
        record: action.payload,
        shouldDeletePlanModalOpen: action.shouldOpen
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
    case GET_AD_METERIALS_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case GET_AD_METERIALS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        materialTypes: action.payload.creativeInfoList || []
      });
    case GET_AD_METERIALS_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_RELAUNCH:
      return { ...state, reLaunch: action.payload.reLaunch };
    default:
      return state;
  }
}

export default adPlanReducer;
