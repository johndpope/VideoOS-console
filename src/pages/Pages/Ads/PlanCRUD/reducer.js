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
import {
  SET_FORM_DATA,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  SET_EDIT_STATE
} from "./constants";

// The initial state of the plan
const initialState = {
  formData: {},
  isEdit: false
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
    case SET_EDIT_STATE:
      return { ...state, isEdit: action.payload.isEdit };
    default:
      return state;
  }
}

export default planCRUDReducer;
