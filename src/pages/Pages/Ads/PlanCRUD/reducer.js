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
import {} from "./constants";

// The initial state of the material
const initialState = {};

function planCRUDReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default planCRUDReducer;
