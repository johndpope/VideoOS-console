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
import * as constants from "./constants";
// The initial state of the plan
const initialState = {
  formData: {},
  isEdit: false,
  reLaunch: true
};

function adPlanReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SHOW_ADD_PLAN:
    case constants.HIDE_ADD_PLAN:
      return {
        ...state,
        record: action.payload,
        shouldAddPlanModalOpen: action.shouldOpen
      };
    case constants.SHOW_LAUNCH_PLAN:
    case constants.HIDE_LAUNCH_PLAN:
      return {
        ...state,
        record: action.payload,
        shouldLaunchPlanModalOpen: action.shouldOpen
      };
    case constants.SHOW_NEW_PLAN_DROPDOWN:
      return {
        ...state,
        shouldNewPlanDropDownOpen: action.shouldOpen
      };
    case constants.HIDE_NEW_PLAN_DROPDOWN:
      return {
        ...state,
        shouldNewPlanDropDownOpen: action.shouldOpen
      };
    case constants.GET_AD_PLANS_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_AD_PLANS_SUCCESS:
      return {
        ...state,
        total: action.payload.totalRecord || 0,
        planResult: action.payload.launchPlanList || [],
        isLoading: action.isLoading
      };
    case constants.GET_AD_PLANS_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_PLAN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.DELETE_PLAN_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.LAUNCH_PLAN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.LAUNCH_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        reLaunch: false
      };
    case constants.LAUNCH_PLAN_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
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
    case constants.SHOW_DELETE_PLAN:
    case constants.HIDE_DELETE_PLAN:
      return {
        ...state,
        record: action.payload,
        shouldDeletePlanModalOpen: action.shouldOpen
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
    case constants.GET_AD_METERIALS_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_AD_METERIALS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        materialTypes: action.payload.creativeInfoList || []
      };
    case constants.GET_AD_METERIALS_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case constants.SET_RELAUNCH:
      return { ...state, reLaunch: action.payload.reLaunch };
    default:
      return state;
  }
}

export default adPlanReducer;
