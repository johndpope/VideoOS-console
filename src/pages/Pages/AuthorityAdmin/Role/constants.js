/*
 * AAARole Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_ROLES_REQUEST = "OS/GET_ROLES_REQUEST";
export const GET_ROLES_SUCCESS = "OS/GET_ROLES_SUCCESS";
export const GET_ROLES_FAILURE = "OS/GET_ROLES_FAILURE";

export const SHOW_ADDROLE_MODAL = "OS/SHOW_ADDROLE_MODAL";
export const HIDE_ADDROLE_MODAL = "OS/HIDE_ADDROLE_MODAL";

export const SHOW_DELETEROLE_MODAL = "OS/SHOW_DELETEROLE_MODAL";
export const HIDE_DELETEROLE_MODAL = "OS/HIDE_DELETEROLE_MODAL";

export const ADD_ROLE_REQUEST = "OS/ADD_ROLE_REQUEST";
export const ADD_ROLE_SUCCESS = "OS/ADD_ROLE_SUCCESS";
export const ADD_ROLE_FAILURE = "OS/ADD_ROLE_FAILURE";

export const UPDATE_ROLE_REQUEST = "OS/UPDATE_ROLE_REQUEST";
export const UPDATE_ROLE_SUCCESS = "OS/UPDATE_ROLE_SUCCESS";
export const UPDATE_ROLE_FAILURE = "OS/UPDATE_ROLE_FAILURE";

export const DELETE_ROLE_REQUEST = "OS/DELETE_ROLE_REQUEST";
export const DELETE_ROLE_SUCCESS = "OS/DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_FAILURE = "OS/DELETE_ROLE_FAILURE";

export const QUERY_ALL_ROLETYPES_REQUEST = "OS/QUERY_ALL_ROLETYPES_REQUEST";
export const QUERY_ALL_ROLETYPES_SUCCESS = "OS/QUERY_ALL_ROLETYPES_SUCCESS";
export const QUERY_ALL_ROLETYPES_FAILURE = "OS/QUERY_ALL_ROLETYPES_FAILURE";

export const SET_CURRENT_PAGE = "OS/SET_CURRENT_PAGE";

export const SET_FORM_DATA = "OS/SET_FORM_DATA";

export const SET_NODE_ID_LIST = "OS/SET_NODE_ID_LIST";

export const QUERY_USER_ROLE_REQUEST = "OS/QUERY_USER_ROLE_REQUEST";
export const QUERY_USER_ROLE_SUCCESS = "OS/QUERY_USER_ROLE_SUCCESS";
export const QUERY_USER_ROLE_FAILURE = "OS/QUERY_USER_ROLE_FAILURE";
