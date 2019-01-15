/*
 * PlanCRUD Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import moment from "moment";
import * as constants from "./constants";

// The initial state of the plan
const initialState = {
  formData: {
    hotspotTrackLink: [],
    infoTrackLink: [],
    launchTime: [[""]]
  },
  isEdit: false,
  whichStep: 1
};

function planCRUDReducer(state = initialState, action) {
  switch (action.type) {
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
    case constants.GET_AD_PLAN_BYID_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.GET_AD_PLAN_BYID_SUCCESS:
      const _payload = action.payload;
      _payload.launchDateStart = moment(_payload.launchDateStart);
      _payload.launchDateEnd = moment(_payload.launchDateEnd);
      return {
        ...state,
        formData: _payload,
        isLoading: action.isLoading
      };
    case constants.GET_AD_PLAN_BYID_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.QUERY_INTERACTION_INFO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.QUERY_INTERACTION_INFO_SUCCESS:
      return {
        ...state,
        monitorLinkInfo: action.payload,
        isLoading: false
      };
    case constants.QUERY_INTERACTION_INFO_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.ADD_PLAN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.ADD_PLAN_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_PLAN_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.UPDATE_PLAN_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SET_EDIT_STATE:
      return { ...state, isEdit: action.payload.isEdit };
    case constants.SET_WHICH_STEP:
      return { ...state, whichStep: action.payload.whichStep };
    default:
      return state;
  }
}

export default planCRUDReducer;
