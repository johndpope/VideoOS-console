/*
 * Log Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_LOGS_REQUEST = "OS/GET_LOGS_REQUEST";
export const GET_LOGS_SUCCESS = "OS/GET_LOGS_SUCCESS";
export const GET_LOGS_FAILURE = "OS/GET_LOGS_FAILURE";

export const SET_CURRENT_PAGE = "OS/LOG/SET_CURRENT_PAGE";
