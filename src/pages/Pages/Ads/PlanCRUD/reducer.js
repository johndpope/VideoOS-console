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
import {
  SET_FORM_DATA,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  GET_AD_PLAN_BYID_REQUEST,
  GET_AD_PLAN_BYID_SUCCESS,
  GET_AD_PLAN_BYID_FAILURE,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  QUERY_INTERACTION_INFO_SUCCESS,
  QUERY_INTERACTION_INFO_REQUEST,
  QUERY_INTERACTION_INFO_FAILURE,
  SET_EDIT_STATE,
  SET_WHICH_STEP
} from "./constants";

// The initial state of the plan
const initialState = {
  formData: {},
  isEdit: false,
  whichStep: 1,
  hotspotTrackLink: [],
  infoTrackLink: []
};

function planCRUDReducer(state = initialState, action) {
  switch (action.type) {
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
      return { ...state };
    case QUERY_ALL_MODELTYPES_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case QUERY_ALL_MODELTYPES_SUCCESS:
      return {
        ...state,
        modelTypes: action.payload,
        isLoading: action.isLoading
      };
    case QUERY_ALL_MODELTYPES_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_AD_METERIALS_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_AD_METERIALS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        materialTypes: action.payload.creativeInfoList || []
      };
    case GET_AD_METERIALS_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_AD_PLAN_BYID_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_AD_PLAN_BYID_SUCCESS:
      const _payload = action.payload;
      _payload.launchDateStart = moment(_payload.launchDateStart);
      _payload.launchDateEnd = moment(_payload.launchDateEnd);
      return {
        ...state,
        formData: _payload,
        isLoading: action.isLoading
      };
    case GET_AD_PLAN_BYID_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case QUERY_INTERACTION_INFO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case QUERY_INTERACTION_INFO_SUCCESS:
      return {
        ...state,
        monitorLinkInfo: action.payload,
        isLoading: false
      };
    case QUERY_INTERACTION_INFO_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case SET_EDIT_STATE:
      return { ...state, isEdit: action.payload.isEdit };
    case SET_WHICH_STEP:
      return { ...state, whichStep: action.payload.whichStep };
    default:
      return state;
  }
}

export default planCRUDReducer;
