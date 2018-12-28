/*
 * SelectTheme Reducer
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
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE
} from "./constants";

// The initial state of the material
const initialState = {};

function selectThemeReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_ALL_MODELTYPES_REQUEST:
      return { ...state, isLoading: false };
    case QUERY_ALL_MODELTYPES_SUCCESS:
      return {
        ...state,
        modelTypes: action.payload,
        isLoading: action.isLoading
      };
    case QUERY_ALL_MODELTYPES_FAILURE:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

export default selectThemeReducer;
