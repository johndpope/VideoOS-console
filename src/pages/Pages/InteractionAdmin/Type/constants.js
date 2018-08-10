/*
 * IAType Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const GET_IATYPE_REQUEST = 'OS/GET_IATYPE_REQUEST';
export const GET_IATYPE_FAILURE = 'OS/GET_IATYPE_FAILURE';
export const GET_IATYPE_SUCCESS = 'OS/GET_IATYPE_SUCCESS';

export const SHOW_ADDTYPE_MODAL = 'OS/SHOW_ADDTYPE_MODAL';
export const HIDDEN_ADDTYPE_MODAL = 'OS/SHOW_ADDTYPE_MODAL';
