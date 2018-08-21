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

export const GET_IATYPE_BYID_REQUEST = 'OS/GET_IATYPE_BYID_REQUEST';
export const GET_IATYPE_BYID_FAILURE = 'OS/GET_IATYPE_BYID_FAILURE';
export const GET_IATYPE_BYID_SUCCESS = 'OS/GET_IATYPE_BYID_SUCCESS';

export const SHOW_ADDTYPE_MODAL = 'OS/SHOW_ADDTYPE_MODAL';
export const HIDDEN_ADDTYPE_MODAL = 'OS/SHOW_ADDTYPE_MODAL';

export const SHOW_DELETETYPE_MODAL = 'OS/SHOW_DELETETYPE_MODAL';
export const HIDE_DELETETYPE_MODAL = 'OS/HIDE_DELETETYPE_MODAL';

export const DELETE_TYPE_REQUEST = 'OS/DELETE_TYPE_REQUEST';
export const DELETE_TYPE_FAILURE = 'OS/DELETE_TYPE_FAILURE';
export const DELETE_TYPE_SUCCESS = 'OS/DELETE_TYPE_SUCCESS';

export const ADD_TYPE_REQUEST = 'OS/ADD_TYPE_REQUEST';
export const ADD_TYPE_FAILURE = 'OS/ADD_TYPE_FAILURE';
export const ADD_TYPE_SUCCESS = 'OS/ADD_TYPE_SUCCESS';

export const UPDATE_TYPE_REQUEST = 'OS/UPDATE_TYPE_REQUEST';
export const UPDATE_TYPE_FAILURE = 'OS/UPDATE_TYPE_FAILURE';
export const UPDATE_TYPE_SUCCESS = 'OS/UPDATE_TYPE_SUCCESS';
