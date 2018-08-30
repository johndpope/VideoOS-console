/*
 * Layout Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SHOW_PASSWORD_RESET_MODEL = 'OS/SHOW_PASSWORD_RESET_MODEL';
export const HIDE_PASSWORD_RESET_MODEL = 'OS/HIDE_PASSWORD_RESET_MODEL';

export const USER_LOGOUT_REQUEST = 'OS/USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'OS/USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'OS/USER_LOGOUT_FAILURE';

export const RESET_PASSWORD_REQUEST = 'OS/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'OS/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'OS/RESET_PASSWORD_FAILURE';